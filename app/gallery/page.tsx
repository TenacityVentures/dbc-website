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

export default function GalleryPage() {
  const galleryDir = path.join(process.cwd(), "public")
  const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"])

  const sections: GallerySection[] = [
    {
      id: "community",
      title: "Community Engagement",
      footnote:
        "Footnote: Community outreach sessions with families and local leaders in Bagbo and Tikonko chiefdoms to identify needs and coordinate support.",
      images: [],
    },
    {
      id: "education",
      title: "Quality Education",
      footnote:
        "Footnote: School support through learning materials, classroom engagement, and child-focused activities that improve attendance and confidence.",
      images: [],
    },
    {
      id: "agriculture",
      title: "Agriculture and Food Security",
      footnote:
        "Footnote: Seed distribution and farming guidance to improve household food production, strengthen nutrition, and increase self-reliance.",
      images: [],
    },
    {
      id: "health",
      title: "Health and Wellbeing",
      footnote:
        "Footnote: Health education, hygiene awareness, and wellbeing support for children, youth, and families.",
      images: [],
    },
    {
      id: "empowerment",
      title: "Women and Youth Empowerment",
      footnote:
        "Footnote: Practical livelihood support, mentoring, and small-scale enterprise initiatives that help women and youth build income opportunities.",
      images: [],
    },
  ]

  const explicitMap: Record<string, GallerySection["id"]> = {
    "IMG-20260202-WA0009.jpg": "education",
    "IMG-20260202-WA0012.jpg": "education",
    "IMG-20260202-WA0014.jpg": "community",
    "IMG-20260202-WA0031.jpg": "agriculture",
    "IMG-20260202-WA0048.jpg": "education",
    "IMG-20260222-WA0012.jpg": "education",
  }

  const determineSection = (fileName: string): GallerySection["id"] => {
    if (explicitMap[fileName]) {
      return explicitMap[fileName]
    }

    if (fileName.startsWith("IMG-20260222-")) {
      return "education"
    }

    const waMatch = fileName.match(/WA(\d+)/)
    const waNumber = waMatch ? Number.parseInt(waMatch[1], 10) : NaN

    if (!Number.isNaN(waNumber)) {
      if (waNumber === 31 || waNumber === 29) {
        return "agriculture"
      }
      if (waNumber >= 9 && waNumber <= 19) {
        return "community"
      }
      if (waNumber >= 20 && waNumber <= 28) {
        return "education"
      }
      if (waNumber >= 44 && waNumber <= 51) {
        return "education"
      }
    }

    return "empowerment"
  }

  const sectionById = new Map(sections.map((section) => [section.id, section]))

  const folderToSectionId: Record<string, GallerySection["id"]> = {
    Agriculture: "agriculture",
    agriculture: "agriculture",
    agriculture_img: "agriculture",
    Community: "community",
    education: "education",
    Education: "education",
    youth_img: "education",
    Health: "health",
    health: "health",
    health_wellbeing: "health",
    health_wellbeing_img: "health",
    HealthAndWellbeing: "health",
    community: "community",
    Collaboration: "empowerment",
    collaboration: "empowerment",
    womanEmpowerment_img: "empowerment",
    empowerment: "empowerment",
  }

  const subFolders = fs.existsSync(galleryDir)
    ? fs
        .readdirSync(galleryDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
    : []

  let hasFolderBasedImages = false
  let imageCounter = 0
  subFolders.forEach((folderName) => {
    const sectionId = folderToSectionId[folderName]
    const section = sectionId ? sectionById.get(sectionId) : undefined
    if (!section) {
      return
    }

    const folderPath = path.join(galleryDir, folderName)
    const fileNames = fs
      .readdirSync(folderPath)
      .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b))

    if (fileNames.length > 0) {
      hasFolderBasedImages = true
    }

    fileNames.forEach((fileName) => {
      imageCounter += 1
      section.images.push({
        src: `/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`,
        alt: `Dream Big for Children activity photo ${imageCounter}`,
      })
    })
  })

  if (!hasFolderBasedImages) {
    const legacyGalleryDir = path.join(process.cwd(), "public", "DBC")
    const rootFileNames = fs.existsSync(legacyGalleryDir)
      ? fs
          .readdirSync(legacyGalleryDir)
          .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
          .sort((a, b) => a.localeCompare(b))
      : []

    rootFileNames.forEach((fileName) => {
      imageCounter += 1
      const sectionId = determineSection(fileName)
      const section = sectionById.get(sectionId)
      if (!section) {
        return
      }

      section.images.push({
        src: `/DBC/${encodeURIComponent(fileName)}`,
        alt: `Dream Big for Children activity photo ${imageCounter}`,
      })
    })
  }

  const nonEmptySections = sections.filter((section) => section.images.length > 0)

  return <GalleryPageClient sections={nonEmptySections} />
}
