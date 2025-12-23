import Image from "next/image";

export default function About() {
  const about = [
    {
      image: "/childcare.png",
      title: "Trusted Baby Care Services",
      details: "Professional caregivers for your child’s safety and happiness.",
    },
    {
      image: "/home-care.png",
      title: "Reliable Elderly Care at Home",
      details: "Compassionate care to help seniors live comfortably.",
    },
    {
      image: "/medical-care.png",
      title: "Special Care for Your Loved Ones",
      details: "Personalized caregiving tailored to your family’s needs.",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <div>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-center">
          We offer you the <span className="text-secondary">best support</span>
        </h2>
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {about.map((a, i) => (
            <div
              key={i}
              className="bg-base-100 hover:bg-secondary cursor-pointer p-5 text-center rounded-md shadow-md border-t-4 border-b-4 border-primary transition-all duration-500"
            >
              <Image
                src={a.image}
                alt={a.title}
                width={100}
                height={100}
                className="w-20 mx-auto bg-white p-2 rounded-md"
              />
              <h3 className="my-3 font-serif text-2xl text-primary">
                {a.title}
              </h3>
              <p className="text-gray-700">{a.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Image */}
    </div>
  );
}
