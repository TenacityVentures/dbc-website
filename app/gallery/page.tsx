import type { Metadata } from "next"
import { GalleryPageClient } from "@/components/gallery-page"

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
  return <GalleryPageClient />
}
