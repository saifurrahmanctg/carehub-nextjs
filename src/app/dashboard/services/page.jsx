"use client";

import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ServicesManagement() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState(null);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/admin/services");
            const data = await res.json();
            if (res.ok) {
                setServices(data.services);
            } else if (res.status === 403) {
                toast.error("Access denied. Admin only area.");
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Failed to fetch services");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This will permanently remove this service!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`/api/admin/services?id=${id}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    toast.success("Service deleted");
                    fetchServices();
                }
            } catch (error) {
                toast.error("Failed to delete service");
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Normalize data types
        const serviceData = {
            ...data,
            ratePerDay: parseFloat(data.ratePerDay),
            ratePerHour: parseFloat(data.ratePerHour),
            status: data.status || "Active",
            features: ["Trusted & Verified", "24/7 Availability", "Experienced Professionals"]
        };

        try {
            const method = currentService ? "PATCH" : "POST";
            const payload = currentService ? { ...serviceData, id: currentService._id } : serviceData;

            const res = await fetch("/api/admin/services", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success(currentService ? "Service updated" : "Service created");
                setIsModalOpen(false);
                fetchServices();
            } else {
                toast.error("Failed to save service");
            }
        } catch (error) {
            toast.error("An error occurred while saving");
        }
    };

    const openModal = (service = null) => {
        setCurrentService(service);
        setIsModalOpen(true);
    };

    const filteredServices = services.filter(s =>
        s.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-700">
            <Toaster />
            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-800 font-serif">Services Management</h1>
                    <p className="text-gray-500 mt-2">Create, modify, or remove care services.</p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20 flex gap-2"
                    >
                        <FaPlus /> New Service
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-primary/5">
                            <tr>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Service</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Daily Rate</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black">Status</th>
                                <th className="py-6 px-8 text-primary uppercase tracking-widest text-xs font-black text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredServices.map((service) => (
                                <tr key={service._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 rounded-xl bg-gray-100 relative overflow-hidden">
                                                {service.image ? (
                                                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-gray-400"><FaImage /></div>
                                                )}
                                            </div>
                                            <span className="font-bold text-gray-800">{service.title}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className="font-bold text-primary">৳{service.ratePerDay}</span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${service.status === 'Inactive' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                            {service.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="py-6 px-8">
                                        <div className="flex justify-end gap-3">
                                            <a
                                                href={`/service/${service.id}`}
                                                target="_blank"
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                title="View Details"
                                                rel="noreferrer"
                                            >
                                                <FaEye />
                                            </a>
                                            <button
                                                onClick={() => openModal(service)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all"
                                                title="Edit Service"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service._id)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:text-error hover:bg-error/10 rounded-xl transition-all"
                                                title="Delete Service"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-primary/5">
                            <h3 className="text-2xl font-bold text-primary font-serif">
                                {currentService ? "Edit Service" : "Add New Service"}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-full transition-colors text-gray-400">
                                <FaPlus className="rotate-45" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-10 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Service Title</label>
                                    <input
                                        name="title"
                                        required
                                        defaultValue={currentService?.title}
                                        placeholder="e.g. Baby Care"
                                        className="input bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 h-14"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Image URL</label>
                                    <input
                                        name="image"
                                        required
                                        defaultValue={currentService?.image}
                                        placeholder="https://..."
                                        className="input bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 h-14"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Charge Per Day (৳)</label>
                                    <input
                                        name="ratePerDay"
                                        type="number"
                                        step="0.01"
                                        required
                                        defaultValue={currentService?.ratePerDay}
                                        className="input bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 h-14"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Charge Per Hour (৳)</label>
                                    <input
                                        name="ratePerHour"
                                        type="number"
                                        step="0.01"
                                        required
                                        defaultValue={currentService?.ratePerHour}
                                        className="input bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 h-14"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Status</label>
                                    <select
                                        name="status"
                                        defaultValue={currentService?.status || "Active"}
                                        className="select bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 h-14"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    defaultValue={currentService?.description}
                                    rows="4"
                                    className="textarea bg-gray-50 border-none rounded-3xl focus:ring-2 focus:ring-primary/20 p-4"
                                ></textarea>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="submit" className="btn btn-primary flex-1 rounded-2xl h-14 text-white font-bold">
                                    {currentService ? "Update Service" : "Create Service"}
                                </button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost rounded-2xl h-14 font-bold border-gray-100">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
