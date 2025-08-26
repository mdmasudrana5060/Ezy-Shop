import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes
const AuthRoutes = ["/login", "/register"];

// Common private routes
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/cart",
];

// Role-based private routes
const roleBasedPrivateRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
} as const;

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // Allow public routes
  if (AuthRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // User has accessToken → validate roles and private routes
  if (accessToken) {
    if (
      commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.next();
    }

    const decodedData = jwtDecode(accessToken) as any;
    const role = decodedData?.role;

    if (role && roleBasedPrivateRoutes[role as Role]) {
      const routes = roleBasedPrivateRoutes[role as Role];
      if (routes.some((route) => pathname.match(route))) {
        return NextResponse.next();
      }
    }
  }

  // If no accessToken but refreshToken exists → allow request to reach server
  if (!accessToken && refreshToken) {
    return NextResponse.next();
  }

  // If no tokens → redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*"],
};
