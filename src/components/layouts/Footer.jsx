import Link from "next/link";
import { IoCallSharp, IoLocation } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#1a1a1a] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href={"/"}>
            <Image
              src={"/logo-dark.png"}
              alt="Logo"
              width={200}
              height={60}
              className="w-40 brightness-200"
            />
          </Link>
          <p className="text-gray-400 leading-relaxed text-sm text-justify">
            CareHub is Bangladesh&apos;s most trusted platform for connecting families with professional caregivers. We provide specialized services for babies, seniors, and patients, ensuring safety, comfort, and peace of mind.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-primary transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-primary pl-4">Quick Links</h3>
          <ul className="space-y-4 text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-xs">→</span> Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-xs">→</span> Our Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-xs">→</span> About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-xs">→</span> Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-xs">→</span> Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-primary pl-4">Contact Info</h3>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="bg-primary/20 p-3 rounded-xl text-primary h-fit">
                <IoLocation size={20} />
              </div>
              <div className="text-sm">
                <p className="font-bold mb-1">Our Location</p>
                <p className="text-gray-400">123 Care Street, Dhaka, Bangladesh</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary/20 p-3 rounded-xl text-primary h-fit">
                <IoCallSharp size={20} />
              </div>
              <div className="text-sm">
                <p className="font-bold mb-1">Phone Number</p>
                <p className="text-gray-400">+880 1234 567 890</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-primary/20 p-3 rounded-xl text-primary h-fit">
                <IoMdMail size={20} />
              </div>
              <div className="text-sm">
                <p className="font-bold mb-1">Email Address</p>
                <p className="text-gray-400">info@carehub.com</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold font-serif mb-8 border-l-4 border-primary pl-4">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-6">Subscribe to our newsletter for the latest updates and health tips.</p>
          <form className="relative group">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-primary transition-colors"
              suppressHydrationWarning
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-secondary text-white px-6 rounded-full transition-colors text-xs font-bold">
              GO
            </button>
          </form>
          <p className="text-[10px] text-gray-500 mt-4 leading-normal">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-primary font-bold">CareHub</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  );
}
