"use client";

import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-secondary text-white text-sm font-poppins">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-10">
        {/* Left: Contact Info */}
        <div className="md:flex items-center gap-6 cursor-pointer">
          <p className="hidden md:block">📞 +880 1234 567 890</p>
          <p>✉️ info@carehub.com</p>
        </div>

        {/* Right: Login/Register */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="w-full px-3 py-1 rounded-full font-medium text-center border border-white hover:bg-white hover:text-[#662c91] hover:border-[#662c91] transition duration-500"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#662c91] w-full px-3 py-1 rounded-full font-medium text-center border hover:bg-white hover:text-[#662c91] hover:border-[#662c91] transition duration-500"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl cursor-pointer hover:text-[#662c91]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaUserCircle />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary text-white px-4 py-1 flex  gap-2">
          <Link
            href="/dashboard"
            className="w-full px-3 py-1 rounded-full font-medium text-center border border-white hover:bg-white hover:text-[#662c91] hover:border-[#662c91] transition duration-500"
          >
            Dashboard
          </Link>
          <Link
            href={""}
            className="bg-secondary w-full px-3 py-1 rounded-full font-medium text-center border hover:bg-white hover:text-secondary hover:border-secondary transition duration-500"
          >
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}
