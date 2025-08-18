import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const AUTH_ROUTES = ["/login", "/register"];

// Routes accessible to all authenticated users
const COMMON_PRIVATE_ROUTES = [
  "/dashboard",
  "/dashboard/change-password",
  "/cart",
];

// Role-based private routes (regex for flexibility)
const ROLE_BASED_ROUTES = {
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super_admin/],
} as const;

type UserRole = keyof typeof ROLE_BASED_ROUTES;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = (await cookies()).get("accessToken")?.value;
  console.log(accessToken, "accessToken from middleware page 28 line");

  // 1. If no token
  if (!accessToken) {
    // Allow only auth routes (login, register)
    if (AUTH_ROUTES.includes(pathname)) {
      return NextResponse.next();
    }
    // Otherwise redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. Common authenticated routes (available to all roles)
  if (
    COMMON_PRIVATE_ROUTES.includes(pathname) ||
    COMMON_PRIVATE_ROUTES.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // 3. Decode JWT and check role
  let decoded: any;
  try {
    decoded = jwtDecode(accessToken);
  } catch {
    // Invalid token → redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole: UserRole | undefined = decoded?.data as UserRole;

  if (userRole && ROLE_BASED_ROUTES[userRole]) {
    const allowedRoutes = ROLE_BASED_ROUTES[userRole];
    if (allowedRoutes.some((pattern) => pathname.match(pattern))) {
      return NextResponse.next();
    }
  }

  // 4. Default: block and redirect home
  return NextResponse.redirect(new URL("/", request.url));
}

// Matcher (update as needed)
export const config = {
  matcher: ["/dashboard/:path*", "/cart/:path*"],
};
