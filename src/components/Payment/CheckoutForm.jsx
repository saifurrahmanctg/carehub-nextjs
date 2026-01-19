"use client";

import { useState, useEffect } from "react";
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ bookingData, amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Return URL is not strictly needed if we handle successes manually,
                // but Stripe requires one for some payment methods.
                return_url: `${window.location.origin}/my-bookings`,
            },
            redirect: "if_required",
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
                toast.error(error.message);
            } else {
                setMessage("An unexpected error occurred.");
                toast.error("An unexpected error occurred.");
            }
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // Payment Successful! Now create the booking.
            try {
                const bookingPayload = {
                    ...bookingData,
                    paymentInfo: {
                        transactionId: paymentIntent.id,
                        amount: paymentIntent.amount / 100,
                        status: "Paid",
                    },
                };

                const res = await fetch("/api/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingPayload),
                });

                if (res.ok) {
                    toast.success("Payment successful and booking confirmed!");
                    router.push("/dashboard/my-bookings");
                } else {
                    const data = await res.json();
                    toast.error(data.error || "Failed to save booking details");
                }
            } catch (err) {
                console.error("Booking Creation Error:", err);
                toast.error("Failed to finalize booking");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={`btn btn-primary btn-block rounded-full py-4 h-auto text-lg text-white shadow-xl hover:shadow-2xl transition-all ${isLoading ? "opacity-70" : ""
                    }`}
            >
                <span id="button-text">
                    {isLoading ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        `Pay ৳${amount} & Confirm`
                    )}
                </span>
            </button>
            {message && (
                <div id="payment-message" className="text-center text-error font-medium">
                    {message}
                </div>
            )}
        </form>
    );
}
