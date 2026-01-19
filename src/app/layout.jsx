import { DM_Serif_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import TopNav from "@/components/layouts/TopNav";
import GoToTop from "@/components/layouts/GoToTop";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "CareHub | Trusted Care Services",
  description: "Baby Care & Elderly Care Service Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${serif.variable} antialiased font-poppins`}>
        <AuthProvider>
          <div className="min-h-screen">
            {children}
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '14px',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
