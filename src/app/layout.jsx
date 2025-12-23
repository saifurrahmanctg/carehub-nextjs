import { DM_Serif_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import TopNav from "@/components/layouts/TopNav";
import GoToTop from "@/components/layouts/GoToTop";

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
      <body className={`${poppins.variable} ${serif.variable} antialiased`}>
        <header className="sticky top-0 z-50">
          <TopNav />
          <Navbar />
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        <GoToTop/>
      </body>
    </html>
  );
}
