import About from "@/components/Home/About";
import Banner from "@/components/Home/Banner";
import Services from "@/components/Home/Services/Services";
import Testimonials from "@/components/Home/Testimonials";
import SuccessMetrics from "@/components/Home/SuccessMetrics";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "CareHub | Baby Sitting & Elderly Care Platform",
  description:
    "CareHub makes caregiving easy, safe, and accessible. Book trusted baby care, elderly support, or sick care professionals across Bangladesh with transparent pricing.",
};

export default function Home() {
  return (
    <div>
      <section className="bg-base-200">
        <Banner />
      </section>
      <section>
        <SuccessMetrics />
      </section>
      <section className="bg-base-200">
        <About />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Testimonials />
      </section>
    </div>
  );
}
