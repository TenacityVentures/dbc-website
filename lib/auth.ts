import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || ""
}

/**
 * Call at the top of any write API route.
 * Returns a 401 response if the request is not authenticated.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("dbc_admin")?.value
  const secret = getAdminSecret()

  if (!secret) {
    return NextResponse.json({ error: "Server not configured" }, { status: 500 })
  }
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}
