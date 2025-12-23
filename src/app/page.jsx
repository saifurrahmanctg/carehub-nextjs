import About from "@/components/Home/About";
import Banner from "@/components/Home/Banner";
import Services from "@/components/Home/Services/Services";

export default function Home() {
  return (
    <div>
      <section className="bg-base-200">
        <Banner />
      </section>
      <section className="bg-base-200">
        <About />
      </section>
      <section>
        <Services />
      </section>
    </div>
  );
}
