"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type StoryRow = {
  id: string
  title: string
  slug: string
  status: "draft" | "published"
  updated_at: string
}

export function StoriesList({ initialStories }: { initialStories: StoryRow[] }) {
  const [stories, setStories] = useState(initialStories)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm("Delete this story? This can't be undone.")) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await supabase.from("stories").delete().eq("id", id)
    setDeletingId(null)
    if (error) {
      alert(error.message)
      return
    }
    setStories((current) => current.filter((story) => story.id !== id))
  }

  if (stories.length === 0) {
    return <p className="mt-8 text-[14px] text-ink-faint">No stories yet — create your first one.</p>
  }

  return (
    <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
      {stories.map((story) => (
        <div key={story.id} className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="min-w-0">
            <Link href={`/admin/stories/${story.id}`} className="truncate text-[15px] font-medium text-ink hover:underline">
              {story.title || "Untitled story"}
            </Link>
            <p className="mt-0.5 text-[12px] text-ink-faint">
              <span
                className={`mr-2 rounded-full px-2 py-0.5 ${
                  story.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-mist text-ink-soft"
                }`}
              >
                {story.status}
              </span>
              Updated {new Date(story.updated_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Link href={`/admin/stories/${story.id}`} className="text-[13px] font-medium text-ink hover:underline">
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(story.id)}
              disabled={deletingId === story.id}
              className="text-[13px] font-medium text-red-600 hover:underline disabled:opacity-50"
            >
              {deletingId === story.id ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
