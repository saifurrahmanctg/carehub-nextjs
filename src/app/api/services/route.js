import { dbConnect } from "@/lib/dbConnect";
import clientPromise from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await clientPromise;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const servicesCollection = dbConnect("services");

    if (id) {
      const service = await servicesCollection.findOne({ id: id });
      if (service) {
        return NextResponse.json({ service }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Service not found" }, { status: 404 });
      }
    } else {
      const services = await servicesCollection.find({}).toArray();
      return NextResponse.json({ services }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  return NextResponse.json(
    { message: "POST method not allowed for services list" },
    { status: 405 }
  );
}