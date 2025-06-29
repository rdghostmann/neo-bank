// middleware.js
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true, // ✅ get raw JWT so we decode it ourselves
  })

  const { pathname } = req.nextUrl

  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/pending"]
  const isPublic = publicPaths.some((path) => pathname.startsWith(path))

  if (isPublic) return NextResponse.next()

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  )

  const status = payload?.status
  const role = payload?.role

  console.log("JWT Payload in middleware:", payload)

  // ✅ Redirect inactive users to /pending
  if (status === "inactive" && pathname !== "/pending") {
    return NextResponse.redirect(new URL("/pending", req.url))
  }

  // ✅ Role-based protection
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (pathname.startsWith("/dashboard") && role !== "user") {
    return NextResponse.redirect(new URL("/admin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
}
