import clientPromise, { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await clientPromise;
        const usersCollection = dbConnect("users");
        const dbUser = await usersCollection.findOne({ email: session.user.email });

        if (dbUser?.role?.toLowerCase() !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const servicesCollection = dbConnect("services");
        const services = await servicesCollection.find().toArray();
        return NextResponse.json({ services });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const usersCollection = dbConnect("users");
        const dbUser = await usersCollection.findOne({ email: session.user.email });

        if (dbUser?.role?.toLowerCase() !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const serviceData = await request.json();
        const servicesCollection = dbConnect("services");

        // Simple ID generation from title
        const id = serviceData.title.toLowerCase().replace(/ /g, "-");

        const newService = {
            ...serviceData,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await servicesCollection.insertOne(newService);
        return NextResponse.json({ message: "Service created", id: result.insertedId }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PATCH(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const usersCollection = dbConnect("users");
        const dbUser = await usersCollection.findOne({ email: session.user.email });

        if (dbUser?.role?.toLowerCase() !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id, ...updateData } = await request.json();
        const servicesCollection = dbConnect("services");

        const result = await servicesCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...updateData, updatedAt: new Date() } }
        );

        return NextResponse.json({ message: "Service updated" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const usersCollection = dbConnect("users");
        const dbUser = await usersCollection.findOne({ email: session.user.email });

        if (dbUser?.role?.toLowerCase() !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        const servicesCollection = dbConnect("services");
        await servicesCollection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: "Service deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
