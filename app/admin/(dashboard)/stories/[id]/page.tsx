import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { StoryEditor } from "@/components/admin/story-editor"
import type { Story } from "@/lib/stories"

export default async function EditStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: story } = await supabase.from("stories").select("*").eq("id", id).single()

  if (!story) notFound()

  return <StoryEditor initialStory={story as Story} />
}
