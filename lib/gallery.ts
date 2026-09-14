export type GallerySectionId = "community" | "education" | "agriculture" | "health" | "empowerment"

export type GallerySectionMeta = {
  id: GallerySectionId
  title: string
  footnote: string
}

/** Single source of truth for gallery sections — used by the public gallery page and the admin uploader. */
export const GALLERY_SECTIONS: GallerySectionMeta[] = [
  {
    id: "community",
    title: "Community Engagement",
    footnote:
      "Community outreach sessions with families and local leaders in Bagbo and Tikonko chiefdoms to identify needs and coordinate support.",
  },
  {
    id: "education",
    title: "Quality Education",
    footnote:
      "School support through learning materials, classroom engagement, and child-focused activities that improve attendance and confidence.",
  },
  {
    id: "agriculture",
    title: "Agriculture and Food Security",
    footnote:
      "Seed distribution and farming guidance to improve household food production, strengthen nutrition, and increase self-reliance.",
  },
  {
    id: "health",
    title: "Health and Wellbeing",
    footnote: "Health education, hygiene awareness, and wellbeing support for children, youth, and families.",
  },
  {
    id: "empowerment",
    title: "Collaboration and Child Safety Dialogues",
    footnote:
      "Community meetings and partnership sessions focused on child safety, collaboration, and local development planning.",
  },
]

export const GALLERY_BUCKET = "gallery"
