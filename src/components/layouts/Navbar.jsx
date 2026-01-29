"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt, FaLock, FaUserPlus } from "react-icons/fa";

import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 font-poppins transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo */}
          <Link href={"/"} className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={160}
              height={50}
              className="w-32 sm:w-40"
              style={{ height: 'auto' }}
              priority
            />
          </Link>

          {/* Middle: Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-8">
            <Link href="/" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            {session && (
              <Link href="/dashboard" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            )}
            <Link href="/about" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right: Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-3 p-1 pr-3 hover:bg-gray-50 rounded-full transition-all border border-transparent hover:border-gray-200"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-primary p-0.5 shadow-sm overflow-hidden bg-primary/5">
                    <img
                      alt="User Avatar"
                      src={session.user?.image || "https://i.ibb.co/mrg7mMTJ/user-placeholder.png"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-gray-900 leading-none mb-1">{session.user?.name?.split(' ')[0]}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Account Settings</p>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="mt-4 z-[100] p-2 shadow-2xl dropdown-content bg-white rounded-2xl w-60 border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 bg-gray-50/50 rounded-xl mb-2 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      {session.user?.name?.charAt(0)}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-sm text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group">
                        <FaTachometerAlt className="text-primary/60 group-hover:text-primary" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors group">
                        <FaUserCircle className="text-primary/60 group-hover:text-primary" />
                        My Profile
                      </Link>
                    </li>
                    <li className="pt-2 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors group"
                      >
                        <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-sm font-bold text-gray-700 hover:text-primary flex items-center gap-2 transition-colors"
                >
                  <FaLock className="text-xs" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary hover:bg-secondary text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <FaUserPlus className="text-xs" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-gray-900 hover:bg-primary hover:text-white transition-all">
            <label className="swap swap-rotate transition-all cursor-pointer">
              <input type="checkbox" onChange={() => setIsOpen(!isOpen)} checked={isOpen} />
              <span className="swap-off"><IoMenu size={24} /></span>
              <span className="swap-on"><RxCross2 size={24} /></span>
            </label>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2 p-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all">
              Home
            </Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all">
              Services
            </Link>
            {session && (
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all">
                Dashboard
              </Link>
            )}
            <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-primary/5 hover:text-primary transition-all">
              Contact
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
              {session ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-red-50 text-red-500 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 text-center rounded-xl text-base font-bold bg-primary text-white shadow-lg shadow-primary/20"
                  >
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
