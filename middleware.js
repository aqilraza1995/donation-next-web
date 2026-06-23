import { NextResponse } from "next/server";

const authRoutes = ["/login", "/sign-up", "/forgot-password", "/reset-password"];

const protectedRoutes = ["/dashboard", "/donation", "/users"];

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && token) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/donation/:path*",
    "/users/:path*",
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
};
