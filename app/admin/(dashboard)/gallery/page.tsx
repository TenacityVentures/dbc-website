import { createClient } from "@/lib/supabase/server"
import { GALLERY_BUCKET, GALLERY_SECTIONS } from "@/lib/gallery"
import { GalleryManager } from "@/components/admin/gallery-manager"

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from("gallery_images")
    .select("id, section, storage_path, alt, caption, location, created_at")
    .order("created_at", { ascending: false })

  const images = (rows ?? []).map((row) => ({
    id: row.id as string,
    section: row.section as string,
    storagePath: row.storage_path as string,
    alt: row.alt as string,
    caption: row.caption as string | null,
    location: row.location as string | null,
    createdAt: row.created_at as string,
    url: supabase.storage.from(GALLERY_BUCKET).getPublicUrl(row.storage_path as string).data.publicUrl,
  }))

  return (
    <div>
      <h1 className="display-md text-ink">Gallery</h1>
      <p className="body-copy mt-2 text-ink-soft">
        New uploads appear first within their section on the public gallery page.
      </p>

      <GalleryManager sections={GALLERY_SECTIONS} initialImages={images} />
    </div>
  )
}
