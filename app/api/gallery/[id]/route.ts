import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth"

// PUT /api/gallery/[id] — update image (visibility, caption, category)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { id } = await params
  const body = await request.json()
  const allowed = ["visible", "caption", "subcaption", "category", "alt"]
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/gallery/[id] — remove image (and from Supabase Storage if applicable)
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { id } = await params

  // Fetch image first to get storage path
  const { data: img } = await supabaseAdmin
    .from("gallery_images")
    .select("src")
    .eq("id", id)
    .single()

  // If the src is a Supabase Storage path, delete the file too
  if (img?.src && img.src.includes("gallery-images")) {
    const path = img.src.split("/gallery-images/")[1]
    if (path) await supabaseAdmin.storage.from("gallery-images").remove([path])
  }

  const { error } = await supabaseAdmin.from("gallery_images").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
