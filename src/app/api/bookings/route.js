import clientPromise, { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { sendBookingEmail } from "@/lib/emailService";

export async function POST(request) {
  try {
    await clientPromise;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookingData = await request.json();
    const {
      bookingId,
      serviceId,
      serviceName,
      duration,
      durationType,
      division,
      district,
      city,
      area,
      address,
      totalCost,
      paymentInfo
    } = bookingData;

    const bookingsCollection = dbConnect("bookings");

    if (bookingId) {
      // Find and update existing booking
      const result = await bookingsCollection.updateOne(
        { _id: new ObjectId(bookingId), userId: session.user.id },
        {
          $set: {
            paymentStatus: paymentInfo?.status || "Paid",
            transactionId: paymentInfo?.transactionId || null,
            status: "Confirmed", // Automatically confirm on payment
            updatedAt: new Date(),
          },
        }
      );

      if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "Payment updated successfully" },
        { status: 200 }
      );
    }

    // Validation for new booking
    if (
      !serviceId ||
      !serviceName ||
      !duration ||
      !durationType ||
      !division ||
      !district ||
      !totalCost
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const booking = {
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      serviceName,
      duration: parseInt(duration),
      durationType,
      location: {
        division,
        district,
        city: city || "",
        area: area || "",
        address: address || "",
      },
      totalCost: parseFloat(totalCost),
      status: paymentInfo?.status === "Paid" ? "Confirmed" : "Pending",
      paymentStatus: paymentInfo?.status || "Unpaid",
      transactionId: paymentInfo?.transactionId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookingsCollection.insertOne(booking);

    // Send email notification (non-blocking)
    sendBookingEmail({
      to: session.user.email,
      userName: session.user.name,
      booking: {
        ...booking,
        bookingId: result.insertedId.toString(),
      },
    }).catch(err => console.error("Email notification failed:", err));

    return NextResponse.json(
      {
        message: "Booking created successfully",
        bookingId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await clientPromise;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookingsCollection = dbConnect("bookings");
    const bookings = await bookingsCollection
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings. Please try again later." },
      { status: 500 }
    );
  }
}

