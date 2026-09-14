// One-time seed: writes the current hardcoded copy (lib/content-defaults.ts,
// which for programme pages is itself derived from lib/programs.ts) into the
// site_content table, so every block shows up as an already-saved row in
// /admin/content instead of only existing as a fallback default.
//
// Usage: npx tsx --env-file=.env.local scripts/seed-content.ts
// Safe to re-run — uses upsert, so it never overwrites an edit you've since
// made in admin unless you pass --force.

import { createClient } from "@supabase/supabase-js"
import { CONTENT_DEFAULTS } from "../lib/content-defaults"

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (run with --env-file=.env.local)")
    process.exit(1)
  }

  const supabase = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  const force = process.argv.includes("--force")

  const { data: existingRows, error: existingError } = await supabase.from("site_content").select("page, block_key")
  if (existingError) {
    console.error("Failed to read existing site_content:", existingError.message)
    process.exit(1)
  }
  const existingKeys = new Set((existingRows ?? []).map((row) => `${row.page}:${row.block_key}`))

  let seeded = 0
  let skipped = 0

  for (const [page, blocks] of Object.entries(CONTENT_DEFAULTS)) {
    for (const [blockKey, data] of Object.entries(blocks)) {
      const key = `${page}:${blockKey}`
      if (!force && existingKeys.has(key)) {
        skipped += 1
        continue
      }

      const { error } = await supabase
        .from("site_content")
        .upsert({ page, block_key: blockKey, data }, { onConflict: "page,block_key" })
      if (error) {
        console.error(`Failed to seed ${key}:`, error.message)
        continue
      }
      seeded += 1
      console.log(`Seeded ${key}`)
    }
  }

  console.log(`\nDone. Seeded ${seeded}, skipped ${skipped} (already present — pass --force to overwrite).`)
}

main()
