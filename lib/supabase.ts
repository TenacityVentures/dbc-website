import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

// ── Public client (anon, used in browser for read-only queries if needed)
export const supabase = createClient(url, anonKey)

// ── Admin client (service role — bypasses RLS, server-side only)
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Type definitions mirroring DB columns
export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption: string
  subcaption: string | null
  category: string
  visible: boolean
  uploaded_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // HTML from Tiptap
  featured_image: string
  author: string
  category: string
  tags: string[]
  published: boolean
  created_at: string
  published_at: string | null
}
