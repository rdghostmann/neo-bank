// middleware.js
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = req.nextUrl

  // List of public routes
  const publicPaths = ["/", "/login", "/register", "/onboarding"]
  const isPublic = publicPaths.includes(pathname)

  // Allow public pages without check
  if (isPublic) return NextResponse.next()

  // If not authenticated, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const status = token?.status
  const role = token?.role

  // Prevent admins from accessing /pending
  if (pathname === "/pending" && role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // Handle admin routes first
  if (pathname.startsWith("/admin")) {
    if (role === "admin") {
      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // Handle user routes
  if (role === "user") {
    if (status === "inactive" && pathname !== "/pending") {
      return NextResponse.redirect(new URL("/pending", req.url))
    }
    if (status === "active" && !pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  // If user tries to access dashboard but is admin
  if (pathname.startsWith("/dashboard") && role === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  // If user tries to access admin but is not admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
}