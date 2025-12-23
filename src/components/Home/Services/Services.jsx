import ServiceCard from "./ServiceCard";

export default function Services() {
  const services = [
    {
      title: "Baby Care",
      description:
        "Professional baby sitting services ensuring your child’s safety, comfort, and happiness at home.",
      image: "https://i.ibb.co.com/vvqR3hWr/baby-care.jpg",
      link: "/service/baby-care",
    },
    {
      title: "Elderly Service",
      description:
        "Compassionate elderly care services focused on comfort, health, and emotional support.",
      image: "https://i.ibb.co.com/q33PZ9Wz/elderly-care.jpg",
      link: "/service/elderly-care",
    },
    {
      title: "Sick People Service",
      description:
        "Dedicated care for sick and recovering individuals with medical and daily support.",
      image: "https://i.ibb.co.com/ZR9nzQg6/sick-care.jpg",
      link: "/service/sick-care",
    },
  ];

  https: return (
    <section className="bg-base-100 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-bold">
            Our Care <span className="text-secondary">Services</span>
          </h2>
          <p className="mt-4 font-body text-gray-600">
            Choose from our wide range of professional caregiving services
            tailored to meet your family’s needs.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
