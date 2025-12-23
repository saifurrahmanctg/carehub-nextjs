"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow-lg font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={300}
              height={100}
              className="w-32"
            />
          </Link>

          {/* Middle: Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </div>

          {/* Right: Book Service Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/services"
              className="bg-white text-primary font-medium border-2 px-5 py-2 rounded-full hover:bg-primary hover:text-white transition"
            >
              Book Service
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl text-gray-100 cursor-pointer btn btn-secondary p-2  hover:btn-primary  transition-all duration-300 ">
            <label className="swap swap-rotate transition-all ">
              <input type="checkbox" onClick={() => setIsOpen(!isOpen)} />
              <span className="swap-off fill-current">
                <IoMenu />
              </span>
              <span className="swap-on fill-current">
                <RxCross2 />
              </span>
            </label>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="nav-link"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="nav-link"
            >
              Services
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="nav-link"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="nav-link"
            >
              Contact
            </Link>

            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className="bg-[#8bc53e] hover:bg-[#532270] text-white text-center py-2 rounded-full"
            >
              Book Service
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
