// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/cart"];
const publicRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check refreshToken cookie
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // No refreshToken → redirect to login
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // RefreshToken exists → allow page to load
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/cart/:path*"],
};
