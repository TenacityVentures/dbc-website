"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { GALLERY_BUCKET, type GallerySectionMeta } from "@/lib/gallery"

type GalleryImageRow = {
  id: string
  section: string
  storagePath: string
  alt: string
  caption: string | null
  location: string | null
  createdAt: string
  url: string
}

type GalleryManagerProps = {
  sections: GallerySectionMeta[]
  initialImages: GalleryImageRow[]
}

function sanitizeFileName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")
}

export function GalleryManager({ sections, initialImages }: GalleryManagerProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState(initialImages)
  const [sectionId, setSectionId] = useState<string>(sections[0]?.id ?? "")
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault()
    const files = fileInputRef.current?.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)
    const supabase = createClient()

    try {
      for (const file of Array.from(files)) {
        const storagePath = `${sectionId}/${crypto.randomUUID()}-${sanitizeFileName(file.name)}`

        const { error: uploadError } = await supabase.storage.from(GALLERY_BUCKET).upload(storagePath, file)
        if (uploadError) throw uploadError

        const alt = `Dream Big for Children activity photo — ${sections.find((s) => s.id === sectionId)?.title}`

        const { data: row, error: insertError } = await supabase
          .from("gallery_images")
          .insert({
            section: sectionId,
            storage_path: storagePath,
            alt,
            caption: caption || null,
            location: location || null,
          })
          .select("id, section, storage_path, alt, caption, location, created_at")
          .single()
        if (insertError) throw insertError

        const url = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(storagePath).data.publicUrl

        setImages((current) => [
          {
            id: row.id,
            section: row.section,
            storagePath: row.storage_path,
            alt: row.alt,
            caption: row.caption,
            location: row.location,
            createdAt: row.created_at,
            url,
          },
          ...current,
        ])
      }

      if (fileInputRef.current) fileInputRef.current.value = ""
      setCaption("")
      setLocation("")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete(image: GalleryImageRow) {
    if (!confirm("Delete this image? This can't be undone.")) return

    setDeletingId(image.id)
    setError(null)
    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase.from("gallery_images").delete().eq("id", image.id)
      if (deleteError) throw deleteError

      await supabase.storage.from(GALLERY_BUCKET).remove([image.storagePath])

      setImages((current) => current.filter((img) => img.id !== image.id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleUpload} className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-[15px] font-medium text-ink">Upload photos</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[13px] font-medium text-ink-soft">Section</label>
            <select
              value={sectionId}
              onChange={(event) => setSectionId(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13px] font-medium text-ink-soft">Photos</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              required
              className="mt-1.5 w-full text-[14px] text-ink-soft"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-ink-soft">Caption (optional, applies to all)</label>
            <input
              type="text"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-ink-soft">Location (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Bo District"
              className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
            />
          </div>
        </div>

        {error && <p className="mt-3 text-[13px] text-red-600">{error}</p>}

        <button type="submit" disabled={uploading} className="btn btn-dark mt-5">
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-xl border border-line bg-mist">
            <img src={image.url} alt={image.alt} className="aspect-[4/5] w-full object-cover" />
            <div className="p-2.5">
              <p className="truncate text-[12px] text-ink-faint">
                {sections.find((s) => s.id === image.section)?.title ?? image.section}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(image)}
                disabled={deletingId === image.id}
                className="mt-1.5 text-[12px] font-medium text-red-600 hover:underline disabled:opacity-50"
              >
                {deletingId === image.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <p className="col-span-full text-[14px] text-ink-faint">No uploaded images yet.</p>
        )}
      </div>
    </div>
  )
}
