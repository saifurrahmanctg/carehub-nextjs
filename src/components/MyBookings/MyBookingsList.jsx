"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillAlt, FaTag, FaCheckCircle, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function MyBookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (res.ok) {
        setBookings(data.bookings);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`/api/bookings/${id}`, {
          method: "PATCH",
        });

        if (res.ok) {
          toast.success("Booking cancelled successfully");
          fetchBookings();
        } else {
          const data = await res.json();
          toast.error(data.error || "Failed to cancel booking");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  const showDetails = (booking) => {
    Swal.fire({
      title: `<h3 class="text-2xl font-bold text-primary">${booking.serviceName}</h3>`,
      html: `
        <div class="text-left space-y-3 p-2">
          <div class="flex justify-between border-b pb-2">
            <span class="font-semibold">Booking ID:</span>
            <span class="text-gray-600">#${booking._id.slice(-6)}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
             <span class="font-semibold">Duration:</span>
             <span class="text-gray-600">${booking.duration} ${booking.durationType}</span>
          </div>
          <div class="border-b pb-2">
            <span class="font-semibold block mb-1">Location:</span>
            <span class="text-gray-600 text-sm">
              ${booking.location.address}, <br/>
              ${booking.location.area ? booking.location.area + ', ' : ''}${booking.location.city ? booking.location.city + ', ' : ''} <br/>
              ${booking.location.district}, ${booking.location.division}
            </span>
          </div>
          <div class="flex justify-between border-b pb-2">
             <span class="font-semibold">Status:</span>
             <span class="badge ${booking.status === "Pending" ? "badge-warning" :
          booking.status === "Confirmed" ? "badge-success" :
            booking.status === "Cancelled" ? "badge-error" : "badge-info"
        } p-3">${booking.status}</span>
          </div>
          <div class="flex justify-between border-b pb-2">
             <span class="font-semibold">Payment Status:</span>
             <span class="badge ${booking.paymentStatus === "Paid" ? "badge-success" : "badge-warning"} p-3">${booking.paymentStatus || "Unpaid"}</span>
          </div>
          <div class="flex justify-between bg-primary/10 p-3 rounded-lg">
             <span class="font-bold text-primary">Total Cost:</span>
             <span class="font-bold text-primary text-xl">৳${booking.totalCost}</span>
          </div>
        </div>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Close',
      confirmButtonColor: '#662c91',
    });
  };

  const handlePay = (booking) => {
    const pendingBooking = {
      bookingId: booking._id,
      serviceId: booking.serviceId,
      serviceName: booking.serviceName,
      duration: booking.duration,
      durationType: booking.durationType,
      totalCost: booking.totalCost,
      division: booking.location.division,
      district: booking.location.district,
      city: booking.location.city,
      area: booking.location.area,
      address: booking.location.address,
    };
    sessionStorage.setItem("pendingBooking", JSON.stringify(pendingBooking));
    router.push("/checkout");
  };

  const showPaymentDetails = (booking) => {
    Swal.fire({
      title: `<h3 class="text-2xl font-bold text-success flex items-center justify-center gap-2"><FaCheckCircle /> Payment Receipt</h3>`,
      html: `
        <div class="text-left space-y-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="space-y-2">
            <p class="text-xs text-gray-400 uppercase tracking-widest font-bold">Service Details</p>
            <div class="flex justify-between">
              <span class="text-gray-600">${booking.serviceName}</span>
              <span class="font-bold">৳${booking.totalCost}</span>
            </div>
          </div>
          
          <div class="divider my-2"></div>
          
          <div class="space-y-3">
            <p class="text-xs text-gray-400 uppercase tracking-widest font-bold">Transaction Info</p>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Status</span>
              <span class="badge badge-success text-white badge-sm">Paid Success</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Transaction ID</span>
              <span class="font-mono text-xs bg-gray-200 px-2 py-1 rounded">${booking.transactionId || "N/A"}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Paid Amount</span>
              <span class="font-bold text-success">৳${booking.totalCost}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Payment Date</span>
              <span class="text-gray-600">${booking.updatedAt ? format(new Date(booking.updatedAt), "PPP p") : format(new Date(booking.createdAt), "PPP p")}</span>
            </div>
          </div>
        </div>
      `,
      confirmButtonText: 'Done',
      confirmButtonColor: '#10b981',
      showCloseButton: true,
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      Pending: "badge-warning",
      Confirmed: "badge-success",
      Completed: "badge-info",
      Cancelled: "badge-error",
    };
    return `badge ${badges[status] || "badge-ghost"} p-3 font-medium`;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 w-full bg-white rounded-3xl animate-pulse shadow-sm"></div>
        ))}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white p-20 rounded-3xl text-center shadow-xl">
        <div className="text-6xl mb-6">📅</div>
        <h3 className="text-2xl font-bold text-gray-800">No Bookings Yet</h3>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          You haven&apos;t booked any services yet. Explore our services and book one that fits your needs.
        </p>
        <a href="/services" className="btn btn-primary mt-8 rounded-full px-8">Browse Services</a>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <Toaster />
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow group"
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Status Bar */}
            <div className={`w-2 md:w-3 ${booking.status === "Pending" ? "bg-warning" :
              booking.status === "Confirmed" ? "bg-success" :
                booking.status === "Cancelled" ? "bg-error" : "bg-info"
              }`}></div>

            <div className="flex-1 p-6 md:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-primary">{booking.serviceName}</h3>
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-secondary" />
                      <span>{format(new Date(booking.createdAt), "PPP")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-secondary" />
                      <span>{booking.duration} {booking.durationType}</span>
                    </div>
                    <div className="flex items-center gap-2 md:col-span-2">
                      <FaMapMarkerAlt className="text-secondary" />
                      <span>{booking.location.address}, {booking.location.district}, {booking.location.division}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                  <div className="text-right">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest block">Total Cost</span>
                    <span className="text-3xl font-black text-primary">৳{booking.totalCost}</span>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() => showDetails(booking)}
                      className="btn btn-sm btn-primary text-white hover:bg-primary/5 hover:text-primary rounded-full flex-1 md:flex-none"
                    >
                      View Details
                    </button>
                    {booking.paymentStatus === "Paid" ? (
                      <button
                        onClick={() => showPaymentDetails(booking)}
                        className="btn btn-sm btn-success text-white hover:bg-success/10 hover:text-success border-none rounded-full flex-1 md:flex-none gap-2"
                      >
                        <FaCheckCircle /> Paid
                      </button>
                    ) : booking.status !== "Cancelled" && (
                      <button
                        onClick={() => handlePay(booking)}
                        className="btn btn-sm btn-secondary text-white hover:bg-secondary/10 hover:text-secondary border-none rounded-full flex-1 md:flex-none gap-2"
                      >
                        <FaCreditCard /> Pay Now
                      </button>
                    )}
                    {booking.status === "Pending" && booking.paymentStatus !== "Paid" && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="btn btn-sm btn-outline btn-error hover:text-white rounded-full flex-1 md:flex-none"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
