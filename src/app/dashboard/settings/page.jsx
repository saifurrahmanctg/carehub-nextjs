"use client";

import { FaRegBell, FaLock, FaPalette, FaHistory } from "react-icons/fa";

export default function SettingsPage() {
    const SettingItem = ({ icon, title, desc, color }) => (
        <div className="flex items-center justify-between p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all cursor-pointer group">
            <div className="flex items-center gap-6">
                <div className={`p-5 rounded-2xl ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{desc}</p>
                </div>
            </div>
            <div className="text-primary font-black text-sm uppercase tracking-widest">Change</div>
        </div>
    );

    return (
        <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-800 font-serif">Settings</h1>
                <p className="text-gray-500 mt-2">Adjust your preferences and account settings.</p>
            </div>

            <div className="space-y-6">
                <SettingItem
                    icon={<FaRegBell />}
                    title="Notifications"
                    desc="Manage email and SMS notification alerts"
                    color="text-primary bg-primary"
                />
                <SettingItem
                    icon={<FaLock />}
                    title="Security"
                    desc="Update password and two-factor authentication"
                    color="text-secondary bg-secondary"
                />
                <SettingItem
                    icon={<FaPalette />}
                    title="Appearance"
                    desc="Switch between light and dark mode themes"
                    color="text-orange-500 bg-orange-500"
                />
                <SettingItem
                    icon={<FaHistory />}
                    title="Activity Log"
                    desc="View recent login activity and account changes"
                    color="text-blue-500 bg-blue-500"
                />
            </div>
        </div>
    );
}
