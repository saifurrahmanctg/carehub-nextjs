"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaUserShield, FaUserEdit, FaTrash, FaSearch, FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
            } else if (res.status === 403) {
                toast.error("You do not have permission to view this page.");
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Failed to fetch users");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === "admin" ? "user" : "admin";

        const result = await Swal.fire({
            title: 'Change Role?',
            text: `Are you sure you want to change this user's role to ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#662c91',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch("/api/admin/users", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, role: newRole }),
                });

                if (res.ok) {
                    toast.success("User role updated successfully");
                    fetchUsers();
                } else {
                    toast.error("Failed to update role");
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const handleDelete = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete user!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/admin/users?id=${userId}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    toast.success("User deleted successfully");
                    fetchUsers();
                } else {
                    toast.error("Failed to delete user");
                }
            } catch (error) {
                toast.error("Something went wrong");
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="animate-pulse">
                <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>
                <div className="h-[500px] bg-white rounded-3xl"></div>
            </div>
        );
    }

    const userStats = {
        total: users.length,
        admins: users.filter(u => u.role?.toLowerCase() === "admin").length,
        regularUsers: users.filter(u => u.role?.toLowerCase() !== "admin").length,
    };

    return (
        <div className="animate-in fade-in duration-700">
            <Toaster />
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800 font-serif">User Management</h1>
                    <p className="text-gray-500 mt-2">View and manage all registered users and their roles.</p>
                </div>

                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {[
                    { label: "Platform Users", value: userStats.total, color: "text-blue-600 bg-blue-50" },
                    { label: "Administrators", value: userStats.admins, color: "text-purple-600 bg-purple-50" },
                    { label: "Regular Accounts", value: userStats.regularUsers, color: "text-emerald-600 bg-emerald-50" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color.split(' ')[0]}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-primary/5">
                            <tr>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">User</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Email</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Role</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold">
                                                {user.image ? (
                                                    <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    user.name?.charAt(0) || <FaUserCircle />
                                                )}
                                            </div>
                                            <span className="font-bold text-gray-800">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-gray-500">{user.email}</td>
                                    <td className="py-6 px-8">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${user.role === "admin"
                                            ? "bg-purple-100 text-purple-600"
                                            : "bg-blue-100 text-blue-600"
                                            }`}>
                                            {user.role || "user"}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => handleRoleChange(user._id, user.role)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                title="Change Role"
                                            >
                                                <FaUserShield />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-error hover:bg-error/10 rounded-xl transition-all"
                                                title="Delete User"
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

                {filteredUsers.length === 0 && (
                    <div className="p-20 text-center">
                        <p className="text-gray-400 font-medium">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
