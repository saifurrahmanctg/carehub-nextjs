"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

import divisionsData from "@/data/division.json";
import districtsData from "@/data/districts.json";

export default function BookingForm({ service }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    duration: 1,
    durationType: "days",
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });

  const [districts, setDistricts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const dailyRate = service.ratePerDay || 0;
    const hourlyRate = service.ratePerHour || Math.max(1, Math.round(dailyRate / 8));
    const cost =
      formData.durationType === "days"
        ? formData.duration * dailyRate
        : formData.duration * hourlyRate;
    setTotalCost(cost);
  }, [formData.duration, formData.durationType, service.ratePerDay, service.ratePerHour]);

  useEffect(() => {
    if (formData.division) {
      const filteredDistricts = districtsData.filter(
        (d) => d.region === formData.division
      );
      setDistricts(filteredDistricts);
      setFormData((prev) => ({ ...prev, district: "" }));
    } else {
      setDistricts([]);
    }
  }, [formData.division]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingPayload = {
      ...formData,
      serviceId: service.id,
      serviceName: service.title,
      totalCost,
    };

    try {
      // Store booking data in session storage to use on checkout page
      sessionStorage.setItem("pendingBooking", JSON.stringify(bookingPayload));
      router.push("/checkout");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
      <Toaster />

      {/* Service Summary */}
      <div className="flex items-center gap-6 p-6 bg-primary/5 rounded-2xl border border-primary/10">
        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md">
          <Image
            src={service.image}
            alt={service.title}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />

        </div>
        <div>
          <h3 className="text-xl font-bold text-primary">{service.title}</h3>
          <p className="text-sm text-gray-500">Professional care service tailored for you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1: Duration */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
            Select Duration
          </h4>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="label text-sm font-medium">Value</label>
              <input
                type="number"
                name="duration"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
            <div className="flex-1">
              <label className="label text-sm font-medium">Type</label>
              <select
                name="durationType"
                value={formData.durationType}
                onChange={handleChange}
                className="select select-bordered w-full focus:select-primary"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Cost Display */}
        <div className="bg-secondary/10 p-6 rounded-2xl flex flex-col justify-center items-center border border-secondary/20">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Estimated Total</span>
          <div className="text-4xl font-bold text-primary mt-1">
            ৳{totalCost}
          </div>
          <span className="text-xs text-secondary font-medium mt-1">
            {formData.durationType === "days"
              ? `৳${service.ratePerDay}/day`
              : `৳${service.ratePerHour}/hour`}
          </span>
        </div>
      </div>

      {/* Step 2: Location */}
      <div className="space-y-4">
        <h4 className="font-bold text-lg flex items-center gap-2">
          <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Select Location
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label text-sm font-medium">Division</label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="select select-bordered w-full focus:select-primary"
              required
            >
              <option value="">Choose Division</option>
              {divisionsData.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label text-sm font-medium">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="select select-bordered w-full focus:select-primary"
              required
              disabled={!formData.division}
            >
              <option value="">Choose District</option>
              {districts.map((d) => (
                <option key={d.district} value={d.district}>{d.district}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label text-sm font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Dhaka North"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>
          <div className="form-control">
            <label className="label text-sm font-medium">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g. Dhanmondi, Mirpur"
              className="input input-bordered w-full focus:input-primary"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label text-sm font-medium">Full Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street name, House no, etc."
            className="input input-bordered w-full focus:input-primary"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`btn btn-primary btn-block rounded-full py-4 h-auto text-lg text-white shadow-xl hover:shadow-2xl transition-all ${loading ? "opacity-70" : ""}`}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Confirm & Book Now"
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          By clicking &quot;Confirm & Book Now&quot;, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  );
}
