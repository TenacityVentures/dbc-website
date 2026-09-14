import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { StoriesList } from "@/components/admin/stories-list"

export default async function AdminStoriesPage() {
  const supabase = await createClient()
  const { data: stories } = await supabase
    .from("stories")
    .select("id, title, slug, status, updated_at")
    .order("updated_at", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-md text-ink">Stories</h1>
          <p className="body-copy mt-2 text-ink-soft">Write and publish updates from the field.</p>
        </div>
        <Link href="/admin/stories/new" className="btn btn-dark">
          New story
        </Link>
      </div>

      <StoriesList initialStories={stories ?? []} />
    </div>
  )
}
