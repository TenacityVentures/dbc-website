import { NextResponse } from "next/server"
import { getAllImages, getGalleryData, saveGalleryData, type GalleryImage } from "@/lib/data"

// GET /api/gallery — all images (admin uses this)
export async function GET() {
  const images = getAllImages()
  return NextResponse.json(images)
}

// POST /api/gallery — add image entry (used after upload)
export async function POST(request: Request) {
  const body = await request.json()

  const newImage: GalleryImage = {
    id: `img_${Date.now()}`,
    src: body.src,
    alt: body.alt || body.caption || "Gallery image",
    caption: body.caption || "",
    subcaption: body.subcaption || "",
    category: body.category || "community",
    visible: true,
    uploadedAt: new Date().toISOString(),
  }

  const data = getGalleryData()
  data.images.push(newImage)
  saveGalleryData(data)

  return NextResponse.json(newImage, { status: 201 })
}
