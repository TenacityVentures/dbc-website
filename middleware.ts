import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const secret = process.env.ADMIN_SECRET
    const token = request.cookies.get("dbc_admin")?.value

    // Redirect to login if secret not configured, cookie missing, or mismatched
    if (!secret || token !== secret) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
