"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    FaHome,
    FaUsers,
    FaConciergeBell,
    FaCalendarCheck,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    const [dbRole, setDbRole] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut({ callbackUrl: '/login' });
                toast.success("Logged out successfully");
            }
        });
    };

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await fetch("/api/dashboard/stats");
                if (res.ok) {
                    const data = await res.json();
                    setDbRole(data.role);
                } else {
                    // Fallback to session role if API fails
                    setDbRole(session?.user?.role || "user");
                }
            } catch (error) {
                console.error("Failed to fetch role", error);
                setDbRole(session?.user?.role || "user");
            }
        };

        if (session) {
            fetchRole();
        }
    }, [session]);

    if (status === "loading" || (session && dbRole === null)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!session) return null;

    const isAdmin = dbRole ? dbRole.toLowerCase() === "admin" : session?.user?.role?.toLowerCase() === "admin";

    const adminLinks = [
        { label: "Dashboard", href: "/dashboard", icon: <FaHome /> },
        { label: "User Management", href: "/dashboard/users", icon: <FaUsers /> },
        { label: "Services", href: "/dashboard/services", icon: <FaConciergeBell /> },
        { label: "Bookings", href: "/dashboard/bookings", icon: <FaCalendarCheck /> },
    ];

    const userLinks = [
        { label: "Dashboard", href: "/dashboard", icon: <FaHome /> },
        { label: "My Bookings", href: "/dashboard/my-bookings", icon: <FaCalendarCheck /> },
    ];

    const bottomLinks = [
        { label: "Profile", href: "/dashboard/profile", icon: <FaUserCircle /> },
        { label: "Settings", href: "/dashboard/settings", icon: <FaCog /> },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    const SidebarItem = ({ link }) => {
        const isActive = pathname === link.href;
        return (
            <li>
                <Link
                    href={link.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${isActive
                        ? "bg-primary text-white shadow-xl shadow-primary/30 translate-x-1"
                        : "text-gray-500 hover:bg-primary/5 hover:text-primary hover:translate-x-1"
                        }`}
                >
                    <span className={`text-xl transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>{link.icon}</span>
                    <span className="tracking-tight">{link.label}</span>
                </Link>
            </li>
        );
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc] font-poppins">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-6 z-50 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="CareHub Logo"
                        width={120}
                        height={40}
                        className="w-28 h-auto"
                        style={{ height: 'auto' }}
                    />
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-[60] w-80 bg-white border-r border-gray-100 transition-all duration-500 ease-in-out transform 
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
            `}>
                <div className="h-full flex flex-col p-8">
                    {/* Brand */}
                    <Link href="/" className="hidden lg:flex items-center gap-3 mb-12 px-2 hover:opacity-80 transition-opacity">
                        <Image
                            src="/logo.png"
                            alt="CareHub Logo"
                            width={160}
                            height={50}
                            className="w-40 h-auto"
                            style={{ height: 'auto' }}
                            priority
                        />
                    </Link>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto -mx-2 px-2 custom-scrollbar">
                        <div className="mb-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-6 mb-6">Main Menu</p>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <SidebarItem key={link.href} link={link} />
                                ))}
                            </ul>
                        </div>

                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-6 mb-6">Settings & Profile</p>
                            <ul className="space-y-2">
                                {bottomLinks.map((link) => (
                                    <SidebarItem key={link.href} link={link} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-8 pt-8 border-t border-gray-50">
                        <button
                            onClick={handleLogout}
                            className="group w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-red-500 hover:bg-red-50 font-bold text-sm"
                        >
                            <FaSignOutAlt className="text-xl group-hover:rotate-12 transition-transform" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <div className="flex-1 p-6 lg:p-12 mt-20 lg:mt-0 overflow-y-auto">
                    <Toaster />
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>

                {/* Dashboard Footer */}
                <footer className="px-12 py-8 border-t border-gray-100 bg-white/50">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-[11px] font-medium tracking-wide">
                            © {new Date().getFullYear()} <span className="font-bold text-primary">CAREHUB MANAGEMENT SYSTEM</span>. VERSION 2.0.1
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Privacy Policy</a>
                            <a href="#" className="text-[11px] font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Terms of Use</a>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}
