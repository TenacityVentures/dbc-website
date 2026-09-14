import type { Metadata } from "next"
import { GalleryPageClient } from "@/components/gallery-page"
import { GALLERY_BUCKET, GALLERY_SECTIONS } from "@/lib/gallery"
import { createClient } from "@/lib/supabase/server"

type GalleryImage = {
  src: string
  alt: string
  caption?: string
  location?: string
}

type GallerySection = {
  id: string
  title: string
  footnote: string
  images: GalleryImage[]
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

export const revalidate = 0

export default async function GalleryPage() {
  const sections: GallerySection[] = GALLERY_SECTIONS.map((section) => ({ ...section, images: [] }))
  const sectionById = new Map(sections.map((section) => [section.id, section]))

  const supabase = await createClient()
  const { data: rows } = await supabase
    .from("gallery_images")
    .select("section, storage_path, alt, caption, location")
    .order("created_at", { ascending: false })

  for (const row of rows ?? []) {
    const section = sectionById.get(row.section)
    if (!section) continue
    const { data: publicUrl } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(row.storage_path)
    section.images.push({
      src: publicUrl.publicUrl,
      alt: row.alt,
      caption: row.caption ?? undefined,
      location: row.location ?? undefined,
    })
  }

  const nonEmptySections = sections.filter((section) => section.images.length > 0)

  return <GalleryPageClient sections={nonEmptySections} />
}
