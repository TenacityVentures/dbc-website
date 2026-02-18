import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_SECRET = process.env.ADMIN_SECRET || "dbc@admin2026"

// POST /api/auth — Login
export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("dbc_admin", ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  return response
}

// DELETE /api/auth — Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set("dbc_admin", "", {
    maxAge: 0,
    path: "/",
  })
  return response
}
