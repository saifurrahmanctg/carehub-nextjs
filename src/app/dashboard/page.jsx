"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaUsers, FaConciergeBell, FaCalendarCheck, FaCheckCircle, FaMoneyBillWave, FaClock, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function DashboardHome() {
    const { data: session } = useSession();
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, activityRes] = await Promise.all([
                    fetch("/api/dashboard/stats"),
                    session?.user?.role?.toLowerCase() === "admin" ? fetch("/api/admin/activity") : Promise.resolve(null)
                ]);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);

                    // If we just got stats, and it confirmed admin, fetch activity if not already fetched
                    if (statsData.role?.toLowerCase() === "admin" && !activityRes) {
                        const actRes = await fetch("/api/admin/activity");
                        if (actRes.ok) setActivity(await actRes.json());
                    }
                }

                if (activityRes && activityRes.ok) {
                    setActivity(await activityRes.json());
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchData();
        }
    }, [session]);

    if (loading) {
        return (
            <div className="animate-pulse flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 bg-white rounded-[2.5rem]"></div>
                    ))}
                </div>
                <div className="h-[400px] bg-white rounded-[3rem]"></div>
            </div>
        );
    }

    const isAdmin = stats?.role ? stats.role.toLowerCase() === "admin" : session?.user?.role?.toLowerCase() === "admin";

    const StatCard = ({ title, value, icon, color, prefix = "" }) => (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-4xl font-black text-gray-800">{prefix}{value}</h3>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 font-serif leading-tight">
                        {isAdmin ? "Admin " : "User "}
                        <span className="text-primary italic">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg font-medium">
                        Welcome back, <span className="text-secondary font-bold">{session?.user?.name}</span>. Here&apos;s your overview.
                    </p>
                </div>
                <div className="bg-white px-6 py-4 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary text-xl">
                        <FaClock className="animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Date</p>
                        <p className="font-bold text-gray-800">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {isAdmin ? (
                    <>
                        <StatCard
                            title="Total Users"
                            value={stats?.totalUsers || 0}
                            icon={<FaUsers />}
                            color="text-indigo-600 bg-indigo-600"
                        />
                        <StatCard
                            title="Total Services"
                            value={stats?.totalServices || 0}
                            icon={<FaConciergeBell />}
                            color="text-purple-600 bg-purple-600"
                        />
                        <StatCard
                            title="Total Bookings"
                            value={stats?.totalBookings || 0}
                            icon={<FaCalendarCheck />}
                            color="text-pink-600 bg-pink-600"
                        />
                        <StatCard
                            title="Total Revenue"
                            value={stats?.totalRevenue || 0}
                            icon={<FaMoneyBillWave />}
                            color="text-emerald-600 bg-emerald-600"
                            prefix="৳"
                        />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="My Bookings"
                            value={stats?.totalBookings || 0}
                            icon={<FaCalendarCheck />}
                            color="text-primary bg-primary"
                        />
                        <StatCard
                            title="Paid Services"
                            value={stats?.totalPaid || 0}
                            icon={<FaCheckCircle />}
                            color="text-green-600 bg-green-600"
                        />
                        <StatCard
                            title="Total Spent"
                            value={stats?.totalSpent || 0}
                            icon={<FaMoneyBillWave />}
                            color="text-orange-600 bg-orange-600"
                            prefix="৳"
                        />
                        <StatCard
                            title="Pending Care"
                            value={stats?.pendingBookings || 0}
                            icon={<FaClock />}
                            color="text-blue-600 bg-blue-600"
                        />
                    </>
                )}
            </div>

            {/* Main Content Area */}
            <div className="mt-12 space-y-12">
                {/* Admin Specific Activity Area */}
                {isAdmin && activity && (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Recent Bookings */}
                        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                                    Recent Bookings
                                </h3>
                                <Link href="/dashboard/bookings" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">View All</Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className="hidden">
                                        <tr><th>User</th><th>Service</th><th>Amount</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-sm">
                                        {activity.recentBookings.map((b) => (
                                            <tr key={b._id} className="group">
                                                <td className="py-4 pl-0">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-gray-800">{b.userName}</span>
                                                        <span className="text-[10px] text-gray-400 font-medium">#{b._id.slice(-6).toUpperCase()}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 font-medium text-gray-500">{b.serviceName}</td>
                                                <td className="py-4 text-right pr-0">
                                                    <span className="font-black text-primary">৳{b.totalCost}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Users */}
                        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                                    Newly Joined
                                </h3>
                                <Link href="/dashboard/users" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">Manage Users</Link>
                            </div>
                            <div className="space-y-6">
                                {activity.recentUsers.map((u) => (
                                    <div key={u._id} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-indigo-500 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                                {u.image ? <img src={u.image} alt={u.name} className="w-full h-full rounded-full object-cover" /> : u.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{u.name}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {u.role || 'user'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Common / Shared Layout Components */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 space-y-8">
                        {/* Welcome Banner */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-secondary to-primary rounded-[3rem] p-10 text-white shadow-2xl shadow-primary/20">
                            <div className="relative z-10 max-w-lg">
                                <h2 className="text-3xl font-black mb-4 font-serif">
                                    {isAdmin ? "Elevate Your Care Network" : "Quality Care for Your Loved Ones"}
                                </h2>
                                <p className="text-white/80 leading-relaxed font-medium mb-8">
                                    {isAdmin
                                        ? "Manage your care community, oversee service delivery, and track your platform's growth with ease. Your leadership ensures better care for everyone."
                                        : "We simplify finding and managing the best care for your family. View your upcoming appointments or explore new specialized care services today."}
                                </p>
                                <Link
                                    href={isAdmin ? "/dashboard/bookings" : "/services"}
                                    className="bg-white text-secondary px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all shadow-xl shadow-black/10 inline-block"
                                >
                                    {isAdmin ? "Manage All Bookings" : "Find New Service"}
                                </Link>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                Latest Updates
                            </h3>
                            <div className="space-y-6">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <FaConciergeBell />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                                                {i === 1 ? "New Senior Care Service" : "Mobile App Launching Soon"}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {i === 1
                                                    ? "We've added specialized neuro-care for seniors. Professionals with 5+ years experience now available."
                                                    : "Our dedicated mobile app for tracking care in real-time is in final beta testing phase."}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Support Card */}
                        <div className="bg-secondary/5 rounded-[3rem] p-10 border border-secondary/10 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-white text-3xl mb-6 shadow-lg shadow-secondary/30">
                                <FaUser />
                            </div>
                            <h3 className="text-2xl font-black text-secondary mb-2 font-serif">Need Help?</h3>
                            <p className="text-gray-500 mb-8 font-medium leading-relaxed">Our premium support team is available 24/7 to assist with any queries.</p>
                            <Link href="/contact" className="w-full py-4 bg-white text-secondary border border-secondary/20 rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all shadow-sm">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
