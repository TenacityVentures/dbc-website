"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { STORIES_BUCKET, slugify, type Story } from "@/lib/stories"
import { RichTextEditor } from "@/components/admin/rich-text-editor"

type StoryEditorProps = {
  initialStory?: Story
}

export function StoryEditor({ initialStory }: StoryEditorProps) {
  const router = useRouter()
  const [id, setId] = useState(initialStory?.id ?? null)
  const [title, setTitle] = useState(initialStory?.title ?? "")
  const [slug, setSlug] = useState(initialStory?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(initialStory))
  const [excerpt, setExcerpt] = useState(initialStory?.excerpt ?? "")
  const [author, setAuthor] = useState(initialStory?.author ?? "")
  const [coverPath, setCoverPath] = useState(initialStory?.cover_storage_path ?? null)
  const [contentHtml, setContentHtml] = useState(initialStory?.content_html ?? "")
  const [status, setStatus] = useState(initialStory?.status ?? "draft")
  const [publishedAt, setPublishedAt] = useState(initialStory?.published_at ?? null)
  const [mode, setMode] = useState<"edit" | "preview">("edit")
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()
  const coverUrl = coverPath ? supabase.storage.from(STORIES_BUCKET).getPublicUrl(coverPath).data.publicUrl : null

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  async function handleCoverChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    setUploadingCover(true)
    setError(null)
    try {
      const path = `cover/${crypto.randomUUID()}-${file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-")}`
      const { error: uploadError } = await supabase.storage.from(STORIES_BUCKET).upload(path, file)
      if (uploadError) throw uploadError
      setCoverPath(path)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover upload failed")
    } finally {
      setUploadingCover(false)
    }
  }

  async function handleSave(nextStatus: "draft" | "published") {
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.")
      return
    }

    setSaving(true)
    setError(null)

    const nextPublishedAt = nextStatus === "published" ? (publishedAt ?? new Date().toISOString()) : publishedAt

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      author: author.trim() || null,
      cover_storage_path: coverPath,
      content_html: contentHtml,
      status: nextStatus,
      published_at: nextPublishedAt,
    }

    try {
      if (id) {
        const { error: updateError } = await supabase.from("stories").update(payload).eq("id", id)
        if (updateError) throw updateError
      } else {
        const { data, error: insertError } = await supabase
          .from("stories")
          .insert(payload)
          .select("id")
          .single()
        if (insertError) throw insertError
        setId(data.id)
        router.replace(`/admin/stories/${data.id}`)
      }

      setStatus(nextStatus)
      setPublishedAt(nextPublishedAt)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!id || !confirm("Delete this story? This can't be undone.")) return
    setSaving(true)
    const { error: deleteError } = await supabase.from("stories").delete().eq("id", id)
    setSaving(false)
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    router.push("/admin/stories")
    router.refresh()
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/admin/stories" className="text-[13px] text-ink-faint hover:text-ink">
            ← All stories
          </Link>
          <h1 className="display-md mt-2 text-ink">{id ? "Edit story" : "New story"}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-line p-1">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                mode === "edit" ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                mode === "preview" ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              Preview
            </button>
          </div>
          {status === "published" && (
            <Link
              href={`/stories/${slug}`}
              target="_blank"
              className="btn border border-line text-ink hover:bg-mist"
            >
              View live
            </Link>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-[13px] text-red-600">{error}</p>}

      {mode === "edit" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-ink-soft">Title</label>
              <input
                type="text"
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[17px] text-ink outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-ink-soft">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(event) => {
                  setSlug(slugify(event.target.value))
                  setSlugTouched(true)
                }}
                className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 font-mono text-[14px] text-ink outline-none focus:border-ink"
              />
              <p className="mt-1 text-[12px] text-ink-faint">dreambigforchildren.org/stories/{slug || "…"}</p>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-ink-soft">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(event) => setExcerpt(event.target.value)}
                rows={2}
                className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-ink-soft">Content</label>
              <div className="mt-1.5">
                <RichTextEditor content={contentHtml} onChange={setContentHtml} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-line bg-white p-4">
              <label className="block text-[13px] font-medium text-ink-soft">Cover image</label>
              {coverUrl && (
                <img src={coverUrl} alt="" className="mt-3 aspect-[4/3] w-full rounded-lg object-cover" />
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleCoverChange}
                disabled={uploadingCover}
                className="mt-3 w-full text-[13px] text-ink-soft"
              />
            </div>

            <div className="rounded-xl border border-line bg-white p-4">
              <label className="block text-[13px] font-medium text-ink-soft">Author</label>
              <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Mohamed Gbenga"
                className="mt-1.5 w-full rounded-lg border border-line px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-ink"
              />
            </div>

            <div className="rounded-xl border border-line bg-white p-4">
              <p className="text-[13px] font-medium text-ink-soft">
                Status: <span className="text-ink">{status}</span>
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleSave("draft")}
                  disabled={saving}
                  className="btn border border-line text-ink hover:bg-mist"
                >
                  {saving ? "Saving…" : "Save draft"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSave("published")}
                  disabled={saving}
                  className="btn btn-dark"
                >
                  {saving ? "Publishing…" : status === "published" ? "Update & republish" : "Publish"}
                </button>
                {id && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="mt-2 text-[13px] font-medium text-red-600 hover:underline"
                  >
                    Delete story
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <article className="mt-8 max-w-[680px]">
          {coverUrl && <img src={coverUrl} alt="" className="aspect-[16/9] w-full rounded-2xl object-cover" />}
          <p className="eyebrow mt-6 text-ink-faint">Story</p>
          <h1 className="display-lg mt-2 text-ink text-balance">{title || "Untitled story"}</h1>
          {(author || publishedAt) && (
            <p className="mt-3 text-[14px] text-ink-faint">
              {author}
              {author && publishedAt ? " · " : ""}
              {publishedAt ? new Date(publishedAt).toLocaleDateString(undefined, { dateStyle: "long" }) : ""}
            </p>
          )}
          <div
            className="prose-story mt-8"
            dangerouslySetInnerHTML={{ __html: contentHtml || "<p>Nothing written yet.</p>" }}
          />
        </article>
      )}
    </div>
  )
}
