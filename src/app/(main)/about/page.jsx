export const metadata = {
  title: "About Us | CareHub",
  description: "Learn more about CareHub's mission and our commitment to providing the best care services.",
};

export default function AboutPage() {
  return (
    <div className="py-20 bg-base-100">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-5xl font-bold font-serif text-primary mb-8 text-center">Our Mission</h1>
        <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
          <p>
            At CareHub, we believe that everyone deserves high-quality, compassionate care. Our platform was designed to bridge the gap between families in need and professional caregivers who are passionate about their work.
          </p>
          <p>
            Founded in 2024, CareHub has quickly become a leading platform for baby sitting, elderly care, and specialized medical support in Bangladesh. We prioritize safety above all else, which is why every caregiver on our platform undergoes a multi-step verification process, including NID checks and background interviews.
          </p>
          <h2 className="text-3xl font-bold text-primary mt-12 mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong>Trust:</strong> We build long-lasting relationships based on honesty and transparency.</li>
            <li><strong>Empathy:</strong> We treat every client like family, ensuring their comfort and happiness.</li>
            <li><strong>Professionalism:</strong> Our caregivers are trained to provide the highest standard of service.</li>
            <li><strong>Accessibility:</strong> We make it easy for anyone to find and book reliable care services.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
