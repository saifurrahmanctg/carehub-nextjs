"use client";

import { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Payment/CheckoutForm";
import { useRouter } from "next/navigation";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
    const [bookingData, setBookingData] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const data = sessionStorage.getItem("pendingBooking");
        if (!data) {
            router.push("/services");
            return;
        }

        const parsedData = JSON.parse(data);
        setBookingData(parsedData);

        // Create PaymentIntent
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: parsedData.totalCost }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("Failed to create payment intent");
                }
            })
            .catch((err) => console.error("Error creating payment intent:", err))
            .finally(() => setLoading(false));
    }, [router]);

    const options = useMemo(() => ({
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#662c91',
            },
        },
    }), [clientSecret]);

    if (loading || !bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="py-20 bg-base-200 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-serif text-primary mb-2">Complete Your Payment</h1>
                    <p className="text-gray-600">Secure payment via Stripe</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl h-fit">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Service</span>
                                <span className="font-semibold text-primary">{bookingData.serviceName}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Duration</span>
                                <span>{bookingData.duration} {bookingData.durationType}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-600">
                                <span>Location</span>
                                <span className="text-right text-sm">{bookingData.address}, {bookingData.district}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="flex justify-between items-center text-xl font-bold text-primary">
                                <span>Total Amount</span>
                                <span>৳{bookingData.totalCost}</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-4">
                            <div className="text-2xl text-primary">🔒</div>
                            <p className="text-xs text-gray-500">Your payment information is encrypted and securely processed by Stripe. We do not store your card details.</p>
                        </div>
                    </div>

                    {/* Stripe Elements */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl">
                        {clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm bookingData={bookingData} amount={bookingData.totalCost} />
                            </Elements>
                        ) : (
                            <div className="flex items-center justify-center p-12">
                                <span className="loading loading-spinner loading-md text-primary"></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
