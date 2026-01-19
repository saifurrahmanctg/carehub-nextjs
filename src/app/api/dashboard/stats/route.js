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

        const { email } = session.user;

        await clientPromise;
        const bookingsCollection = dbConnect("bookings");
        const usersCollection = dbConnect("users");
        const servicesCollection = dbConnect("services");

        // Fetch fresh user data from DB to get latest role
        const dbUser = await usersCollection.findOne({ email });
        const currentRole = dbUser?.role?.toLowerCase() || "user";

        if (currentRole === "admin") {
            const stats = {
                totalUsers: await usersCollection.countDocuments(),
                totalServices: await servicesCollection.countDocuments(),
                totalBookings: await bookingsCollection.countDocuments(),
                totalApproved: await bookingsCollection.countDocuments({ status: "Confirmed" }),
                totalRevenue: await bookingsCollection.aggregate([
                    { $match: { paymentStatus: "Paid" } },
                    { $group: { _id: null, total: { $sum: "$totalCost" } } }
                ]).toArray(),
            };

            return NextResponse.json({
                role: currentRole,
                totalUsers: stats.totalUsers,
                totalServices: stats.totalServices,
                totalBookings: stats.totalBookings,
                totalApproved: stats.totalApproved,
                totalRevenue: stats.totalRevenue[0]?.total || 0,
            });
        } else {
            // User stats
            const userId = dbUser._id.toString();
            const stats = {
                totalBookings: await bookingsCollection.countDocuments({ userId }),
                totalPaid: await bookingsCollection.countDocuments({ userId, paymentStatus: "Paid" }),
                totalSpent: await bookingsCollection.aggregate([
                    { $match: { userId, paymentStatus: "Paid" } },
                    { $group: { _id: null, total: { $sum: "$totalCost" } } }
                ]).toArray(),
                pendingBookings: await bookingsCollection.countDocuments({ userId, status: "Pending" }),
            };

            return NextResponse.json({
                role: currentRole,
                totalBookings: stats.totalBookings,
                totalPaid: stats.totalPaid,
                totalSpent: stats.totalSpent[0]?.total || 0,
                pendingBookings: stats.pendingBookings,
            });
        }

    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
