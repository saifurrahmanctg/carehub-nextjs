"use client";
import ServiceCard from "./ServiceCard";
// import { dbConnect } from "@/lib/dbConnect"; // No longer directly connecting to DB
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data.services);
        } else {
          console.error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="bg-base-200 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </section>
    );
  }


  return (
    <section className="bg-base-200 py-24 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
            Our Professional <span className="text-secondary tracking-tight">Care Services</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed">
            From playful childhood moments to the golden years of life, our expert caregivers provide the support your loved ones deserve with dignity and love.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard key={service.id || service._id.toString()} service={service} />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No services found.</p>
          </div>
        )}

        <div className="mt-20 text-center">
          <button className="btn btn-outline btn-primary rounded-full px-12 group">
            View All Specialized Services
            <span className="group-hover:translate-x-2 transition-transform ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
