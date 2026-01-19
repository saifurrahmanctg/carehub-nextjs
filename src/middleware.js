import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Define protected routes
    const isProtectedRoute = pathname.startsWith("/booking") ||
        pathname.startsWith("/checkout") ||
        pathname.startsWith("/dashboard");

    if (isProtectedRoute) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token) {
            const url = new URL("/login", request.url);
            url.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(url);
        }

        // Admin specific dashboard routes
        const isAdminRoute = pathname.startsWith("/dashboard/users") ||
            pathname.startsWith("/dashboard/services") ||
            pathname.startsWith("/dashboard/bookings");

        if (isAdminRoute && token.role !== "admin") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/booking/:path*",
        "/checkout/:path*",
        "/dashboard/:path*",
    ],
};
