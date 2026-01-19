"use client";

import Link from "next/link";
import { IoCallSharp, IoMail, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io5";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaChevronDown, FaLock, FaUser } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function TopNav() {
  const { data: session } = useSession();

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
    })
  };

  return (
    <div className="bg-secondary text-white text-[10px] sm:text-xs font-poppins relative z-[70]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex justify-between items-center">

        {/* Left: Contact Info */}
        <div className="flex items-center gap-4 sm:gap-8">
          <a href="tel:+8801234567890" className="hidden sm:flex items-center gap-2 hover:text-primary transition-colors">
            <IoCallSharp className="text-primary text-sm" />
            <span className="font-medium">+880 1234 567 890</span>
          </a>
          <a href="mailto:info@carehub.com" className="flex items-center gap-2 hover:text-primary transition-colors">
            <IoMail className="text-primary text-sm" />
            <span className="truncate max-w-[150px] sm:max-w-none font-medium uppercase tracking-wider">info@carehub.com</span>
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Desktop: Social Icons */}
          <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6 h-4">
            <a href="#" className="hover:text-primary transition-all hover:scale-110"><IoLogoFacebook /></a>
            <a href="#" className="hover:text-primary transition-all hover:scale-110"><IoLogoTwitter /></a>
            <a href="#" className="hover:text-primary transition-all hover:scale-110"><IoLogoInstagram /></a>
          </div>

          {/* Account Dropdown (Small Devices Only) */}
          <div className="flex md:hidden items-center h-10 border-l border-white/10 pl-4 ml-2">
            {session ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="flex items-center gap-3 hover:text-primary transition-colors group">
                  <span className="hidden sm:inline-block font-bold text-[9px] uppercase tracking-[2px] opacity-80 group-hover:opacity-100 transition-opacity">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full border-2 border-white/20 overflow-hidden shadow-sm group-hover:border-primary/50 transition-all">
                    <img
                      src={session.user?.image || "https://i.ibb.co.com/mrg7mMTJ/user-placeholder.png"}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <FaChevronDown className="text-[8px] opacity-40 group-hover:text-primary" />
                </div>
                <ul tabIndex={0} className="dropdown-content z-[100] mt-3 p-2 shadow-2xl bg-white rounded-2xl w-52 text-gray-800 border border-gray-100 animate-in fade-in zoom-in duration-200">
                  <li className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-xs font-bold truncate text-primary">{session.user?.email}</p>
                  </li>
                  <li>
                    <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-widest">
                      <FaTachometerAlt className="text-sm opacity-50" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 hover:text-primary transition-colors font-bold text-[10px] uppercase tracking-widest">
                      <FaUserCircle className="text-sm opacity-50" /> Profile
                    </Link>
                  </li>
                  <li className="mt-1 pt-1 border-t border-gray-50">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-500 transition-colors font-bold text-[10px] uppercase tracking-widest"
                    >
                      <FaSignOutAlt className="text-sm opacity-50" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-primary transition-colors font-bold uppercase tracking-widest text-[9px] group">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <FaUser className="text-[10px]" />
                </div>
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>

          {/* Support Indicator (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-white/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-white/50 tracking-[2px] uppercase">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
