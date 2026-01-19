"use client";

import { useSession } from "next-auth/react";
import { FaUserCircle, FaEnvelope, FaShieldAlt, FaCalendarPlus } from "react-icons/fa";
import { format } from "date-fns";

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session) return null;

    const { user } = session;

    return (
        <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-800 font-serif">My Profile</h1>
                <p className="text-gray-500 mt-2">Manage your personal information and account security.</p>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-primary h-32 relative">
                    <div className="absolute -bottom-16 left-12 w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-5xl text-gray-300">
                        {user.image ? (
                            <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <FaUserCircle />
                        )}
                    </div>
                </div>

                <div className="pt-24 pb-12 px-12">
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-gray-800">{user.name}</h2>
                        <p className="text-primary font-bold uppercase tracking-widest text-xs mt-1">{user.role || "User"}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="p-4 bg-gray-50 rounded-2xl text-primary text-xl"><FaEnvelope /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="font-bold">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="p-4 bg-gray-50 rounded-2xl text-secondary text-xl"><FaShieldAlt /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Account Status</p>
                                    <p className="font-bold text-green-500">Verified & Secure</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="p-4 bg-gray-50 rounded-2xl text-orange-500 text-xl"><FaCalendarPlus /></div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member Since</p>
                                    <p className="font-bold">January 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
