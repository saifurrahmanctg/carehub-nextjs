"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaEye, FaCheckCircle, FaTimesCircle, FaTrash, FaSearch, FaUser, FaHistory } from "react-icons/fa";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function BookingsManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await fetch("/api/admin/bookings/all");
            const data = await res.json();
            if (res.ok) {
                setBookings(data.bookings);
            } else if (res.status === 403) {
                toast.error("Unauthorized access to bookings.");
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Failed to fetch bookings");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await fetch(`/api/admin/bookings/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                toast.success(`Booking ${status}`);
                fetchBookings();
            }
        } catch (error) {
            toast.error("Status update failed");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this booking record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/admin/bookings/all?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    toast.success("Booking record deleted");
                    fetchBookings();
                }
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const showDetails = (booking) => {
        Swal.fire({
            title: `<h3 class="text-2xl font-black text-primary font-serif">${booking.serviceName}</h3>`,
            html: `
        <div class="text-left space-y-4 p-4 bg-gray-50 rounded-[2rem] border border-gray-100">
           <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="bg-white p-4 rounded-2xl shadow-sm">
                 <p class="text-[10px] text-gray-400 font-black uppercase tracking-[2px] mb-1">Customer</p>
                 <p class="font-bold text-gray-800">${booking.userName}</p>
                 <p class="text-xs text-gray-500">${booking.userEmail}</p>
              </div>
              <div class="bg-white p-4 rounded-2xl shadow-sm">
                 <p class="text-[10px] text-gray-400 font-black uppercase tracking-[2px] mb-1">Booking Info</p>
                 <p class="font-bold text-primary">#${booking._id.slice(-6).toUpperCase()}</p>
                 <p class="text-xs text-gray-500">${format(new Date(booking.createdAt), "PPP")}</p>
              </div>
           </div>
           
           <div class="bg-white p-6 rounded-2xl shadow-sm">
              <p class="text-[10px] text-gray-400 font-black uppercase tracking-[2px] mb-3">Service Details</p>
              <div class="flex justify-between items-center mb-2">
                 <span class="text-gray-600">Duration</span>
                 <span class="font-bold">${booking.duration} ${booking.durationType}</span>
              </div>
              <div class="flex justify-between items-center mb-2">
                 <span class="text-gray-600">Daily Rate</span>
                 <span class="font-bold">৳${booking.totalCost / booking.duration}</span>
              </div>
              <div class="divider my-2"></div>
              <div class="flex justify-between items-center">
                 <span class="font-black text-primary">Total Paid</span>
                 <span class="text-2xl font-black text-primary">৳${booking.totalCost}</span>
              </div>
           </div>

           <div class="bg-white p-6 rounded-2xl shadow-sm">
              <p class="text-[10px] text-gray-400 font-black uppercase tracking-[2px] mb-2">Location</p>
              <p class="text-sm text-gray-600">${booking.location.address}, <br/> ${booking.location.district}, ${booking.location.division}</p>
           </div>
        </div>
      `,
            showCloseButton: true,
            confirmButtonText: 'Done',
            confirmButtonColor: '#662c91',
        });
    };

    const filteredBookings = bookings.filter(b =>
        b.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b._id?.includes(searchTerm)
    );

    const statsSummary = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === "Pending").length,
        confirmed: bookings.filter(b => b.status === "Confirmed").length,
        revenue: bookings.filter(b => b.paymentStatus === "Paid").reduce((sum, b) => sum + (b.totalCost || 0), 0)
    };

    return (
        <div className="animate-in fade-in duration-700">
            <Toaster />
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800 font-serif">Bookings Management</h1>
                    <p className="text-gray-500 mt-2">Manage customer appointments and service delivery.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search bookings..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Stats Summary Area */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                    { label: "Total Bookings", value: statsSummary.total, color: "text-blue-600 bg-blue-50" },
                    { label: "Pending Approval", value: statsSummary.pending, color: "text-orange-600 bg-orange-50" },
                    { label: "Confirmed Plan", value: statsSummary.confirmed, color: "text-green-600 bg-green-50" },
                    { label: "Total Revenue", value: `৳${statsSummary.revenue}`, color: "text-purple-600 bg-purple-50" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color.split(' ')[0]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-primary/5">
                            <tr>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Booking ID</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Customer / Service</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black text-center">Payment</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black text-center">Status</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-6 px-8 font-mono text-xs font-bold text-gray-400">
                                        #{booking._id.slice(-6).toUpperCase()}
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800">{booking.userName}</span>
                                            <span className="text-xs text-primary font-medium">{booking.serviceName}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-center text-sm">
                                        <div className="flex flex-col items-center">
                                            <span className="font-black text-gray-800 uppercase tracking-tighter">৳{booking.totalCost}</span>
                                            <span className={`text-[10px] font-bold ${booking.paymentStatus === "Paid" ? "text-green-500" : "text-orange-400"}`}>
                                                {booking.paymentStatus === "Paid" ? "CONFIRMED" : "PENDING"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === "Pending" ? "bg-orange-100 text-orange-600" :
                                            booking.status === "Confirmed" ? "bg-green-100 text-green-600" :
                                                booking.status === "Cancelled" ? "bg-red-100 text-red-600" :
                                                    "bg-blue-100 text-blue-600"
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => showDetails(booking)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                title="View Receipt"
                                            >
                                                <FaEye />
                                            </button>

                                            {booking.status === "Pending" ? (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking._id, "Confirmed")}
                                                    className="p-3 bg-gray-50 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-xl transition-all"
                                                    title="Approve"
                                                >
                                                    <FaCheckCircle />
                                                </button>
                                            ) : booking.status === "Confirmed" ? (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking._id, "Pending")}
                                                    className="p-3 bg-gray-50 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all"
                                                    title="Mark Pending"
                                                >
                                                    <FaHistory />
                                                </button>
                                            ) : null}

                                            {booking.status !== "Cancelled" && (
                                                <button
                                                    onClick={() => handleStatusUpdate(booking._id, "Cancelled")}
                                                    className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Cancel"
                                                >
                                                    <FaTimesCircle />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(booking._id)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all"
                                                title="Delete Permanently"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredBookings.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-gray-400 font-medium">No bookings found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
