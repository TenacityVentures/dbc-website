import { NextResponse } from "next/server"
import { getPostsData, savePostsData } from "@/lib/data"

// GET /api/blog/[id]
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const data = getPostsData()
  const post = data.posts.find((p) => p.id === params.id)
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(post)
}

// PUT /api/blog/[id] — update post
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const data = getPostsData()

  const idx = data.posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const existing = data.posts[idx]

  // Set publishedAt only when publishing for the first time
  const publishedAt =
    body.published && !existing.publishedAt ? new Date().toISOString() : existing.publishedAt

  data.posts[idx] = { ...existing, ...body, publishedAt }
  savePostsData(data)

  return NextResponse.json(data.posts[idx])
}

// DELETE /api/blog/[id]
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const data = getPostsData()
  const idx = data.posts.findIndex((p) => p.id === params.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })

  data.posts.splice(idx, 1)
  savePostsData(data)

  return NextResponse.json({ success: true })
}
