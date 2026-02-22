-- ============================================================
-- DBC Website — Supabase Database Setup
-- Run this SQL in your Supabase project → SQL Editor
-- ============================================================

-- ── 1. Gallery Images ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  src         text NOT NULL,
  alt         text NOT NULL DEFAULT '',
  caption     text NOT NULL DEFAULT '',
  subcaption  text,
  category    text NOT NULL DEFAULT 'community',
  visible     boolean NOT NULL DEFAULT true,
  uploaded_at timestamptz NOT NULL DEFAULT now()
);

-- Public read for visible images; admin writes via service role key (bypasses RLS)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible images"
  ON gallery_images FOR SELECT
  USING (visible = true);

-- ── 2. Blog Posts ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  excerpt       text NOT NULL DEFAULT '',
  content       text NOT NULL DEFAULT '',       -- Stored as HTML (Tiptap output)
  featured_image text NOT NULL DEFAULT '/landing.jpg',
  author        text NOT NULL DEFAULT 'DBC Team',
  category      text NOT NULL DEFAULT 'News',
  tags          text[] NOT NULL DEFAULT '{}',
  published     boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  published_at  timestamptz
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- ── 3. Storage Bucket ────────────────────────────────────────
-- Run this in Supabase Dashboard → Storage → New Bucket
-- Name: gallery-images
-- Public bucket: YES (so uploaded images have public URLs)

-- Or via SQL (Supabase storage schema):
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to read files from the bucket
CREATE POLICY "Public read gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

-- Allow service role (admin API) to upload/delete — handled via service role key,
-- which bypasses RLS automatically. No extra policy needed.

-- ── 4. Indexes (optional, for performance) ───────────────────
CREATE INDEX IF NOT EXISTS idx_gallery_images_visible ON gallery_images (visible);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC);
