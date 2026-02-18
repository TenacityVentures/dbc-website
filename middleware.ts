import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_SECRET = process.env.ADMIN_SECRET || "dbc@admin2026"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (but not /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("dbc_admin")?.value

    if (token !== ADMIN_SECRET) {
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
