import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const AuthRoutes = ["/login", "/register"];

// Routes accessible to all authenticated users
const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/cart",
];

// Role-based private routes (regex for flexibility)
const roleBasedPrivateRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
} as const;

type Role = keyof typeof roleBasedPrivateRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Use await here
  const accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  console.log(refreshToken, "refresh token from middleware");

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as any;
  }

  const role = decodedData?.role;

  if (role && roleBasedPrivateRoutes[role as Role]) {
    const routes = roleBasedPrivateRoutes[role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// Matcher (update as needed)
export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*"],
};
