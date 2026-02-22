import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth"

// GET /api/gallery — fetch all images (public uses visible=true, admin fetches all)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const adminOnly = searchParams.get("all") === "true"

  let query = supabaseAdmin.from("gallery_images").select("*").order("uploaded_at", { ascending: false })
  if (!adminOnly) query = query.eq("visible", true)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/gallery — add image entry (admin)
export async function POST(request: Request) {
  const deny = await requireAdmin()
  if (deny) return deny

  const body = await request.json()
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .insert({
      src: body.src,
      alt: body.alt || body.caption || "Gallery image",
      caption: body.caption || "",
      subcaption: body.subcaption || null,
      category: body.category || "community",
      visible: true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
