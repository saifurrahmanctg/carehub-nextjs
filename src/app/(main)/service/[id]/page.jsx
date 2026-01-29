import { dbConnect } from "@/lib/dbConnect";
import clientPromise from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaCalendarCheck, FaMoneyBillWave, FaClock, FaShieldAlt } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    await clientPromise;
    const servicesCollection = dbConnect("services");
    const service = await servicesCollection.findOne({ id: id });

    if (!service) {
      return {
        title: "Service Not Found | CareHub",
      };
    }

    return {
      title: `${service.title} | CareHub`,
      description: service.description,
    };
  } catch (error) {
    return {
      title: "Service Details | CareHub",
    };
  }
}

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  
  await clientPromise;
  const servicesCollection = dbConnect("services");
  const service = await servicesCollection.findOne({ id: id });

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FDFCFE] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Top: Back Navigation */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary font-bold text-sm uppercase tracking-widest transition-all mb-12 group"
        >
          <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
            <FaArrowLeft />
          </div>
          Back to Services
        </Link>

        {/* Top Section: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-stretch">

          {/* Left: Image Container */}
          <div className="lg:col-span-7">
            <div className="relative h-[400px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>

          {/* Right: Info & Actions Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[3px] mb-6">
                Premium Care Service
              </span>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-8 font-serif">
                {service.title}
              </h1>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary text-xl">
                    <FaMoneyBillWave />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Daily Rate</p>
                    <p className="text-2xl font-black text-gray-900">৳{service.ratePerDay}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-secondary text-xl">
                    <FaClock />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Hourly Rate</p>
                    <p className="text-2xl font-black text-gray-900">৳{service.ratePerHour}</p>
                  </div>
                </div>
              </div>

              <Link
                href={`/booking/${id}`}
                className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-secondary text-white py-5 rounded-2xl font-black uppercase tracking-[2px] text-sm shadow-xl shadow-primary/20 hover:shadow-secondary/20 transition-all transform hover:-translate-y-1"
              >
                <FaCalendarCheck />
                Book This Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section: Content & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-4 font-serif">
              About This Service
              <div className="flex-1 h-[1px] bg-gray-100"></div>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              {service.description} Our {service.title} is designed to provide the highest quality of care and support.
              We understand the importance of trust and safety when it comes to your loved ones.
              Our professionals are highly trained, background-checked, and compassionate individuals
              who are dedicated to making a positive difference in the lives of those they care for.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-black text-gray-900 mb-8 font-serif">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(service.features && service.features.length > 0 ? service.features : [
                "Trusted & Verified Caregivers",
                "24/7 Support Available",
                "Personalized Care Plans",
                "Emergency Preparedness",
                "Compassionate Approach",
                "Medical Record Monitoring"
              ]).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 text-secondary">
                    <FaCheckCircle className="text-xl" />
                  </div>
                  <span className="font-bold text-gray-700 text-sm leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
