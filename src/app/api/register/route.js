import clientPromise, { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Ensure database is connected
    await clientPromise;

    const body = await request.json();
    const { nid, name, email, contact, password } = body;

    // Validation
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 6 characters with 1 uppercase and 1 lowercase letter",
        },
        { status: 400 }
      );
    }

    const usersCollection = dbConnect("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await usersCollection.insertOne({
      nid,
      name,
      email,
      contact,
      password: hashedPassword,
      provider: "credentials",
      role: "user",
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Registration failed. Please try again later." },
      { status: 500 }
    );
  }
}

