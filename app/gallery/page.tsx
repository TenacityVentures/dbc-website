import type { Metadata } from "next"
import { GalleryPageClient } from "@/components/gallery-page"
import fs from "node:fs"
import path from "node:path"

type GalleryImage = {
  src: string
  alt: string
  caption?: string
  location?: string
}

export const metadata: Metadata = {
  title: "Gallery | Dream Big for Children (DBC)",
  description:
    "Explore photos from Dream Big for Children programs in Sierra Leone, including education, child protection, health, and community development.",
  keywords: [
    "DBC gallery",
    "Dream Big for Children photos",
    "Sierra Leone nonprofit gallery",
    "education program photos",
    "child protection in Sierra Leone",
    "community development",
  ],
  openGraph: {
    title: "Gallery | Dream Big for Children (DBC)",
    description:
      "Explore photos from Dream Big for Children programs in Sierra Leone, including education, child protection, health, and community development.",
    url: "https://dreambigforchildren.org/gallery",
    type: "website",
    images: [
      {
        url: "/landing.jpg",
        width: 1200,
        height: 630,
        alt: "Dream Big for Children gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | Dream Big for Children (DBC)",
    description:
      "Explore photos from Dream Big for Children programs in Sierra Leone, including education, child protection, health, and community development.",
    images: ["/landing.jpg"],
  },
  alternates: {
    canonical: "https://dreambigforchildren.org/gallery",
  },
}

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public", "DBC")
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"])
  const fileNames = fs.existsSync(galleryDir)
    ? fs
        .readdirSync(galleryDir)
        .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b))
    : []

  const images: GalleryImage[] = fileNames.map((fileName, index) => ({
    src: `/DBC/${encodeURIComponent(fileName)}`,
    alt: `Dream Big for Children activity photo ${index + 1}`,
  }))

  return <GalleryPageClient images={images} />
}
