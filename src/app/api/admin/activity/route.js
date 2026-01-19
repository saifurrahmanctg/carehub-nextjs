import clientPromise, { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

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

        // Fetch recent bookings
        const recentBookings = await bookingsCollection
            .find()
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        // Fetch recent users
        const recentUsers = await usersCollection
            .find({}, { projection: { password: 0 } })
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        return NextResponse.json({
            recentBookings,
            recentUsers
        });

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
