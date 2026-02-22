import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth"

// POST /api/upload — upload image to Supabase Storage
export async function POST(request: Request) {
  const deny = await requireAdmin()
  if (deny) return deny

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 })
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "File must be an image" }, { status: 400 })
  if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "File must be under 10MB" }, { status: 400 })

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from("gallery-images")
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage
    .from("gallery-images")
    .getPublicUrl(filename)

  return NextResponse.json({ src: publicUrl }, { status: 201 })
}
