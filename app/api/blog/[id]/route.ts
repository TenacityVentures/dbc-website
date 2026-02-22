import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth"

// GET /api/blog/[id]
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(data)
}

// PUT /api/blog/[id] — update post
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { id } = await params
  const body = await request.json()

  // Fetch existing to preserve published_at
  const { data: existing } = await supabaseAdmin
    .from("blog_posts")
    .select("published, published_at")
    .eq("id", id)
    .single()

  const published_at =
    body.published && !existing?.published_at
      ? new Date().toISOString()
      : existing?.published_at ?? null

  const allowed = ["title", "excerpt", "content", "featured_image", "author", "category", "tags", "published"]
  const updates: Record<string, unknown> = { published_at }
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// DELETE /api/blog/[id]
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const deny = await requireAdmin()
  if (deny) return deny

  const { id } = await params
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
