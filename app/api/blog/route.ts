import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { requireAdmin } from "@/lib/auth"

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}

// GET /api/blog — all posts for admin
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/blog — create new post
export async function POST(request: Request) {
  const deny = await requireAdmin()
  if (deny) return deny

  const body = await request.json()
  const now = new Date().toISOString()

  const { data, error } = await supabaseAdmin
    .from("blog_posts")
    .insert({
      slug: generateSlug(body.title),
      title: body.title,
      excerpt: body.excerpt || "",
      content: body.content || "",
      featured_image: body.featured_image || "/landing.jpg",
      author: body.author || "DBC Team",
      category: body.category || "News",
      tags: body.tags || [],
      published: body.published || false,
      published_at: body.published ? now : null,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
