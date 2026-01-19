"use client";

import ServiceCard from "@/components/Home/Services/ServiceCard";
import { useEffect, useState } from "react";

export default function ServicesPageContent() {
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
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="py-20 bg-base-200 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
                        Our Professional Care Services
                    </h2>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        We provide a wide range of specialized care services tailored to meet the unique needs of your loved ones. Choose the service that fits your requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <ServiceCard key={service.id || service._id.toString()} service={service} />
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No services found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
