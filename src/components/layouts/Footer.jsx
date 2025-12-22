import Link from "next/link";
import Logo from "./Logo";
import { IoCallSharp, IoLocation } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { FaPinterestSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-300 text-green-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 md:flex gap-8">
        {/* Brand Info */}
        <div className="flex-1">
          <Logo />
          <p className="mt-3 text-sm text-gray-700 text-justify">
            <span className="font-serif text-primary">
              Care<span className="text-secondary">Hub</span>
            </span>{" "}
            provides trusted baby sitting, elderly care and special care
            services to make your family life easier and safer.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mt-3 flex-1">
          <h3 className="text-xl text-black mb-3 font-serif">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link
                href="/"
                className="hover:text-secondary hover:font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-secondary hover:font-semibold"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-secondary hover:font-semibold"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-secondary hover:font-semibold"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mt-3 flex-1">
          <h3 className="text-xl text-black mb-3 font-serif">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <span>Address:</span>
            <li className="flex items-center gap-1 text-gray-700">
              <IoLocation /> Chittagong, Bangladesh
            </li>
            <span>Phone:</span>
            <li className="flex items-center gap-1 text-gray-700">
              <IoCallSharp /> +880 1234 567 890
            </li>
            <span>Email:</span>
            <li className="flex items-center gap-1 text-gray-700">
              <IoMdMail /> info@carehub.com
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="mt-3 flex-1">
          <h3 className="text-xl text-black mb-3 font-serif">Newsletter</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <form action="submit">
                <label htmlFor="Subscribe">Subscribe Now</label>
                <input
                  type="email"
                  name="email"
                  id=""
                  placeholder="Your email"
                  className="input input-accent block"
                />
              </form>
            </li>
            <span>Follow Us</span>
            <div className="flex items-center gap-2">
              <li>
                <FaSquareFacebook size={30} />
              </li>
              <li>
                <FaSquareXTwitter size={30} />
              </li>
              <li>
                <FaPinterestSquare size={30} />
              </li>
            </div>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700/40 py-4 text-center text-sm text-green-700/80">
        © {new Date().getFullYear()} CareHub. All rights reserved.
      </div>
    </footer>
  );
}
