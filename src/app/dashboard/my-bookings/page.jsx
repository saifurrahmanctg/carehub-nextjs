"use client";

import MyBookingsList from "@/components/MyBookings/MyBookingsList";

export default function UserBookingsPage() {
    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-800 font-serif">My Bookings</h1>
                <p className="text-gray-500 mt-2">Track and manage your care service appointments.</p>
            </div>

            <MyBookingsList />
        </div>
    );
}
