import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import TopNav from "@/components/layouts/TopNav";
import GoToTop from "@/components/layouts/GoToTop";

export default function MainLayout({ children }) {
    return (
        <>
            <header className="sticky top-0 z-50">
                <TopNav />
                <Navbar />
            </header>
            <main className="min-h-screen">{children}</main>
            <footer>
                <Footer />
            </footer>
            <GoToTop />
        </>
    );
}
