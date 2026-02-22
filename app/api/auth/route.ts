import { NextResponse } from "next/server"
import { getAdminSecret } from "@/lib/auth"

export async function POST(request: Request) {
  const { password } = await request.json()
  const secret = getAdminSecret()

  if (!secret) {
    return NextResponse.json({ error: "ADMIN_SECRET env variable is not set on this server." }, { status: 500 })
  }
  if (password !== secret) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set("dbc_admin", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ success: true })
  response.cookies.set("dbc_admin", "", { maxAge: 0, path: "/" })
  return response
}
