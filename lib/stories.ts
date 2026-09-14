export const STORIES_BUCKET = "stories"

export type StoryStatus = "draft" | "published"

export type Story = {
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover_storage_path: string | null
  content_html: string
  status: StoryStatus
  author: string | null
  published_at: string | null
  created_at: string
  updated_at: string
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
