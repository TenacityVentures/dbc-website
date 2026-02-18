import { readFileSync, writeFileSync, existsSync } from "fs"
import path from "path"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  subcaption?: string
  category: string
  visible: boolean
  uploadedAt: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: string
  category: string
  tags: string[]
  published: boolean
  createdAt: string
  publishedAt: string | null
}

// ─── File Paths ───────────────────────────────────────────────────────────────

const GALLERY_FILE = path.join(process.cwd(), "data", "gallery.json")
const POSTS_FILE = path.join(process.cwd(), "data", "posts.json")

// ─── Gallery ──────────────────────────────────────────────────────────────────

export function getGalleryData(): { images: GalleryImage[] } {
  if (!existsSync(GALLERY_FILE)) return { images: [] }
  const raw = readFileSync(GALLERY_FILE, "utf-8")
  return JSON.parse(raw)
}

export function saveGalleryData(data: { images: GalleryImage[] }) {
  writeFileSync(GALLERY_FILE, JSON.stringify(data, null, 2))
}

export function getVisibleImages(): GalleryImage[] {
  const { images } = getGalleryData()
  return images.filter((img) => img.visible)
}

export function getAllImages(): GalleryImage[] {
  const { images } = getGalleryData()
  return images
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function getPostsData(): { posts: BlogPost[] } {
  if (!existsSync(POSTS_FILE)) return { posts: [] }
  const raw = readFileSync(POSTS_FILE, "utf-8")
  return JSON.parse(raw)
}

export function savePostsData(data: { posts: BlogPost[] }) {
  writeFileSync(POSTS_FILE, JSON.stringify(data, null, 2))
}

export function getPublishedPosts(): BlogPost[] {
  const { posts } = getPostsData()
  return posts
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
}

export function getAllPosts(): BlogPost[] {
  const { posts } = getPostsData()
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const { posts } = getPostsData()
  return posts.find((p) => p.slug === slug) ?? null
}

export function getPostById(id: string): BlogPost | null {
  const { posts } = getPostsData()
  return posts.find((p) => p.id === id) ?? null
}
