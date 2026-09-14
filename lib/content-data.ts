import { createClient } from "@/lib/supabase/server"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

/**
 * Returns every block for `page`, with each block's saved `data` shallow-merged
 * over its hardcoded defaults — so an unedited or partially-edited block still
 * renders correctly.
 */
export async function getPageContent(page: string): Promise<Record<string, any>> {
  const defaults = CONTENT_DEFAULTS[page] ?? {}
  const supabase = await createClient()
  const { data: rows } = await supabase.from("site_content").select("block_key, data").eq("page", page)

  const savedByBlock = new Map((rows ?? []).map((row) => [row.block_key, row.data]))

  const merged: Record<string, any> = {}
  for (const blockKey of Object.keys(defaults)) {
    merged[blockKey] = { ...defaults[blockKey], ...(savedByBlock.get(blockKey) ?? {}) }
  }
  return merged
}

export async function getBlockContent(page: string, blockKey: string): Promise<Record<string, any>> {
  const defaults = CONTENT_DEFAULTS[page]?.[blockKey] ?? {}
  const supabase = await createClient()
  const { data: row } = await supabase
    .from("site_content")
    .select("data")
    .eq("page", page)
    .eq("block_key", blockKey)
    .maybeSingle()

  return { ...defaults, ...(row?.data ?? {}) }
}
