import { NextResponse } from "next/server"
import { getGalleryData, saveGalleryData } from "@/lib/data"

// PUT /api/gallery/[id] — update image (toggle visibility, edit caption, etc.)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json()
  const data = getGalleryData()

  const idx = data.images.findIndex((img) => img.id === params.id)
  if (idx === -1) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 })
  }

  data.images[idx] = { ...data.images[idx], ...body }
  saveGalleryData(data)

  return NextResponse.json(data.images[idx])
}

// DELETE /api/gallery/[id] — remove image entry
export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const data = getGalleryData()

  const idx = data.images.findIndex((img) => img.id === params.id)
  if (idx === -1) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 })
  }

  data.images.splice(idx, 1)
  saveGalleryData(data)

  return NextResponse.json({ success: true })
}
