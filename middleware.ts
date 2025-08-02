
import { NextResponse, NextRequest } from 'next/server';
import { withAuth } from "next-auth/middleware"

export const config = {
    matcher: [
        // dashboard pages
        "/dashboard/(user|admin)/:path*",
        // API routes you want protected
        "/api/(user|admin)/:path*",
    ]
}

export default withAuth(
    async function middleware(request) {
        const url = request.nextUrl.pathname;
        const token = request.nextauth.token;
        const userRole = token?.user?.role;
        if (url.includes("/admin") && userRole !== "admin")
            return NextResponse.redirect(new URL("/", request.url));
        if (url.includes("/user") && userRole !== "user")
            return NextResponse.redirect(new URL("/", request.url));
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)