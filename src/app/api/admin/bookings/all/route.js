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

        const bookingsCollection = dbConnect("bookings");
        const bookings = await bookingsCollection.find().sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ bookings });
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

        const bookingsCollection = dbConnect("bookings");
        await bookingsCollection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: "Booking deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
