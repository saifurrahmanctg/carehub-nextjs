import Image from "next/image";
import { FaHeart, FaShieldAlt, FaUserClock } from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaHeart className="text-4xl" />,
      title: "Compassionate Care",
      details: "Our caregivers are chosen not just for their skills, but for their empathy and heart.",
      color: "bg-red-50 text-red-500",
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Safety First",
      details: "All caregivers undergo rigorous background checks and NID verification for your peace of mind.",
      color: "bg-blue-50 text-blue-500",
    },
    {
      icon: <FaUserClock className="text-4xl" />,
      title: "24/7 Availability",
      details: "Whether it's day or night, urgent or planned, we are here to support your family.",
      color: "bg-green-50 text-green-500",
    },
  ];

  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src={"/care-giving.png"}
                alt="Our Mission"
                width={600}
                height={600}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl hidden md:block border-b-4 border-primary">
              <div className="text-4xl font-black text-primary">10+</div>
              <div className="text-gray-500 font-medium">Years of Experience</div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-secondary font-bold uppercase tracking-widest text-sm mb-4">About CareHub</h2>
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-primary leading-tight">
                Empowering Families with <span className="italic">Trusted</span> Caregiving
              </h3>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              CareHub was born out of a simple need: to make professional caregiving accessible, safe, and reliable for every household in Bangladesh. We understand that finding a trustworthy person to care for your child, elderly parents, or sick family members is one of life&apos;s most sensitive tasks.
            </p>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className={`p-4 rounded-2xl ${f.color} group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{f.title}</h4>
                    <p className="text-gray-500">{f.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button className="btn btn-primary btn-wide rounded-full text-white shadow-lg shadow-primary/30">
                Learn More About Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
