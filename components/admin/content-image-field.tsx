"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { SITE_CONTENT_BUCKET } from "@/lib/content"

export function ContentImageField({
  label,
  value,
  pathPrefix,
  onChange,
}: {
  label: string
  value: string
  pathPrefix: string
  onChange: (url: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    setUploading(true)
    setError(null)
    try {
      const supabase = createClient()
      const path = `${pathPrefix}/${crypto.randomUUID()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`
      const { error: uploadError } = await supabase.storage.from(SITE_CONTENT_BUCKET).upload(path, file)
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from(SITE_CONTENT_BUCKET).getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-[13px] font-medium text-ink-soft">{label}</label>
      {value && <img src={value} alt="" className="mt-2 aspect-video w-full rounded-lg object-cover" />}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        disabled={uploading}
        className="mt-2 w-full text-[13px] text-ink-soft"
      />
      {uploading && <p className="mt-1 text-[12px] text-ink-faint">Uploading…</p>}
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  )
}
