"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import BookingForm from "@/components/Booking/BookingForm";

export default function BookingPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = use(params);
  const [service, setService] = useState(null);
  const [loadingService, setLoadingService] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services?id=${id}`); // Use the new API route
        if (res.ok) {
          const data = await res.json();
          setService(data.service);
        } else {
          router.push("/services");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        router.push("/services");
      } finally {
        setLoadingService(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(`/login?callbackUrl=/booking/${id}`);
    }
  }, [status, router, id]);

  if (status === "loading" || loadingService || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="py-20 bg-base-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif text-primary mb-2">Book {service.title}</h1>
          <p className="text-gray-600">Complete the form below to schedule your care service</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <BookingForm service={service} />
        </div>
      </div>
    </div>
  );
}
