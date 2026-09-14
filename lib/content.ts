export type FieldType = "text" | "textarea" | "image"

export type FieldDef = {
  key: string
  label: string
  type: FieldType
}

export type ListFieldDef = {
  key: string
  label: string
  type: "list"
  itemLabel: string
  itemFields: FieldDef[]
}

export type BlockFieldDef = FieldDef | ListFieldDef

export type BlockDef = {
  page: string
  blockKey: string
  label: string
  fields: BlockFieldDef[]
}

export const SITE_CONTENT_BUCKET = "site-content"

export const CONTENT_BLOCKS: BlockDef[] = [
  {
    page: "home",
    blockKey: "hero",
    label: "Hero",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "headline", label: "Headline", type: "textarea" },
      { key: "ctaPrimaryLabel", label: "Primary button label", type: "text" },
      { key: "ctaPrimaryHref", label: "Primary button link", type: "text" },
      { key: "ctaSecondaryLabel", label: "Secondary button label", type: "text" },
      { key: "ctaSecondaryHref", label: "Secondary button link", type: "text" },
      {
        key: "slides",
        label: "Background photos",
        type: "list",
        itemLabel: "Photo",
        itemFields: [
          { key: "src", label: "Image", type: "image" },
          { key: "credit", label: "Caption", type: "text" },
        ],
      },
    ],
  },
  {
    page: "home",
    blockKey: "quote",
    label: "Founder quote",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "name", label: "Name", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "image", label: "Portrait image", type: "image" },
      { key: "imageCaption", label: "Image caption", type: "text" },
    ],
  },
  {
    page: "home",
    blockKey: "about",
    label: "About",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "body", label: "Body paragraph", type: "textarea" },
      { key: "visionTitle", label: "Vision heading", type: "text" },
      { key: "vision", label: "Vision text", type: "textarea" },
      { key: "missionTitle", label: "Mission heading", type: "text" },
      { key: "mission", label: "Mission text", type: "textarea" },
    ],
  },
  {
    page: "home",
    blockKey: "impact",
    label: "Impact numbers",
    fields: [
      { key: "title", label: "Section title", type: "text" },
      {
        key: "stats",
        label: "Stats",
        type: "list",
        itemLabel: "Stat",
        itemFields: [
          { key: "value", label: "Number", type: "text" },
          { key: "suffix", label: "Suffix (e.g. +)", type: "text" },
          { key: "label", label: "Label", type: "text" },
        ],
      },
      { key: "storyEyebrow", label: "Featured story eyebrow", type: "text" },
      { key: "storyTitle", label: "Featured story title", type: "text" },
      { key: "storyBody", label: "Featured story body", type: "textarea" },
      { key: "storyImage", label: "Featured story image", type: "image" },
    ],
  },
  {
    page: "home",
    blockKey: "where-we-work",
    label: "Where we work",
    fields: [
      { key: "title", label: "Title", type: "text" },
      {
        key: "items",
        label: "Photos",
        type: "list",
        itemLabel: "Photo",
        itemFields: [
          { key: "src", label: "Image", type: "image" },
          { key: "caption", label: "Caption", type: "text" },
          { key: "place", label: "Place", type: "text" },
        ],
      },
    ],
  },
  {
    page: "home",
    blockKey: "ways-to-give",
    label: "Ways to give",
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      {
        key: "partners",
        label: "Partner cards",
        type: "list",
        itemLabel: "Card",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea" },
        ],
      },
    ],
  },
]

export function findBlockDef(page: string, blockKey: string) {
  return CONTENT_BLOCKS.find((block) => block.page === page && block.blockKey === blockKey)
}
