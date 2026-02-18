import { NextResponse } from "next/server"
import { getAllPosts, getPostsData, savePostsData, type BlogPost } from "@/lib/data"

// GET /api/blog — all posts (admin)
export async function GET() {
  const posts = getAllPosts()
  return NextResponse.json(posts)
}

// POST /api/blog — create post
export async function POST(request: Request) {
  const body = await request.json()

  const now = new Date().toISOString()
  const newPost: BlogPost = {
    id: `post_${Date.now()}`,
    slug: generateSlug(body.title),
    title: body.title,
    excerpt: body.excerpt || "",
    content: body.content || "",
    featuredImage: body.featuredImage || "/landing.jpg",
    author: body.author || "DBC Team",
    category: body.category || "News",
    tags: body.tags || [],
    published: body.published || false,
    createdAt: now,
    publishedAt: body.published ? now : null,
  }

  const data = getPostsData()
  data.posts.push(newPost)
  savePostsData(data)

  return NextResponse.json(newPost, { status: 201 })
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
}
