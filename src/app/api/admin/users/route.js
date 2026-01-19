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

        const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();

        return NextResponse.json({ users });
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

        const { userId, role } = await request.json();

        if (!userId || !role) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role, updatedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Role updated successfully" });
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

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
