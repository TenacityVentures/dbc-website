// One-time migration: uploads the filesystem-based gallery images (public/<Folder>/*)
// into Supabase Storage + the gallery_images table, so they show up in /admin/gallery
// and the public gallery page can drop the filesystem-scanning code path.
//
// Usage: node --env-file=.env.local scripts/backfill-gallery.mjs
// Safe to re-run — already-migrated files (same storage path) are skipped.

import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"

const BUCKET = "gallery"
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"])

// Same mapping app/gallery/page.tsx used for its filesystem scan.
const FOLDER_TO_SECTION = {
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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (run with --env-file=.env.local)")
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })

const publicDir = path.join(process.cwd(), "public")
const subFolders = fs
  .readdirSync(publicDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => FOLDER_TO_SECTION[name])
  .sort((a, b) => a.localeCompare(b))

/** @type {{ section: string, fileName: string, filePath: string }[]} */
const candidates = []
for (const folderName of subFolders) {
  const sectionId = FOLDER_TO_SECTION[folderName]
  const folderPath = path.join(publicDir, folderName)
  const fileNames = fs
    .readdirSync(folderPath)
    .filter((file) => ALLOWED_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))

  for (const fileName of fileNames) {
    candidates.push({ section: sectionId, fileName, filePath: path.join(folderPath, fileName) })
  }
}

console.log(`Found ${candidates.length} images across ${subFolders.length} folders.`)

const { data: existingRows, error: existingError } = await supabase.from("gallery_images").select("storage_path")
if (existingError) {
  console.error("Failed to read existing gallery_images:", existingError.message)
  process.exit(1)
}
const existingPaths = new Set((existingRows ?? []).map((row) => row.storage_path))

const contentTypeFor = (ext) =>
  ({ ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" })[ext] ??
  "application/octet-stream"

// Descending timestamps so `order by created_at desc` reproduces the original
// folder/alphabetical order (first candidate = most recent = shows first).
const baseTime = Date.now() - 60_000
let migrated = 0
let skipped = 0

for (const [index, candidate] of candidates.entries()) {
  const ext = path.extname(candidate.fileName).toLowerCase()
  const storagePath = `${candidate.section}/backfill-${candidate.fileName.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`

  if (existingPaths.has(storagePath)) {
    skipped += 1
    continue
  }

  const fileBuffer = fs.readFileSync(candidate.filePath)
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType: contentTypeFor(ext), upsert: true })
  if (uploadError) {
    console.error(`Upload failed for ${candidate.filePath}:`, uploadError.message)
    continue
  }

  const createdAt = new Date(baseTime - index * 1000).toISOString()
  const { error: insertError } = await supabase.from("gallery_images").insert({
    section: candidate.section,
    storage_path: storagePath,
    alt: `Dream Big for Children activity photo ${index + 1}`,
    created_at: createdAt,
  })
  if (insertError) {
    console.error(`Insert failed for ${storagePath}:`, insertError.message)
    continue
  }

  migrated += 1
  console.log(`Migrated ${candidate.section}/${candidate.fileName}`)
}

console.log(`\nDone. Migrated ${migrated}, skipped ${skipped} (already present).`)
