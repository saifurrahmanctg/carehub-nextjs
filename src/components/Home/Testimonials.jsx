"use client";

import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Working Mother",
    content: "CareHub has been a lifesaver for me. The baby sitter they provided is professional, kind, and punctuality is amazing. I can focus on my work knowing my child is in safe hands.",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 2,
    name: "Karim Hassan",
    role: "Software Engineer",
    content: "I booked elderly care for my father. The caregiver was extremely patient and well-trained in medical assistance. Truly a premium service in Bangladesh.",
    image: "https://i.pravatar.cc/150?u=karim",
  },
  {
    id: 3,
    name: "Dr. Sumaiya Khan",
    role: "Physician",
    content: "The special care service is exceptional. Their attention to detail and personalized approach to sick patient care is highly commendable.",
    image: "https://i.pravatar.cc/150?u=sumaiya",
  },
];

export default function Testimonials() {
  return (
    <div className="bg-primary/5 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
          We take pride in providing the best care for your families. Here is what some of our happy users have to say about their experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-primary/5 relative"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image 
                      src={t.image} 
                      alt={t.name} 
                      width={64} 
                      height={64} 
                      className="rounded-full"
                    />

                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-gray-600 italic mb-6">
                  &quot;{t.content}&quot;
                </p>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-xs text-secondary font-medium uppercase tracking-widest">{t.role}</p>
              </div>
              <div className="flex justify-center gap-1 mt-4 text-warning">
                {"★".repeat(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
