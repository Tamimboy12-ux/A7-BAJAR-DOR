
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Better Auth session cookie check
  const sessionCookie = getSessionCookie(request);

  // Login required pages
  const protectedRoutes = [
    "/product",
    "/profile",
  ];

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  // Login না থাকলে Sign In page-এ পাঠানো
  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL("/signin", request.url);

    // Login করার পরে আগের পেজে ফেরার URL
    signInUrl.searchParams.set(
      "callbackURL",
      `${pathname}${search}`
    );

    signInUrl.searchParams.set("reason", "login-required");

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
    "/profile/:path*",
  ],
};