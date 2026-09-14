import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { createClient } from "@/lib/supabase/server"
import { STORIES_BUCKET } from "@/lib/stories"

export const revalidate = 0

async function getStory(slug: string) {
  const supabase = await createClient()
  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!story) return null

  const coverUrl = story.cover_storage_path
    ? supabase.storage.from(STORIES_BUCKET).getPublicUrl(story.cover_storage_path).data.publicUrl
    : null

  return { ...story, coverUrl }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) return {}

  return {
    title: `${story.title} | Dream Big for Children (DBC)`,
    description: story.excerpt ?? undefined,
    alternates: {
      canonical: `https://dreambigforchildren.org/stories/${story.slug}`,
    },
    openGraph: {
      title: story.title,
      description: story.excerpt ?? undefined,
      type: "article",
      images: story.coverUrl ? [{ url: story.coverUrl }] : undefined,
    },
  }
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) notFound()

  return (
    <>
      <SiteHeader />

      <main className="bg-white py-16 lg:py-24">
        <article className="shell max-w-[720px]">
          <Reveal>
            <p className="accent text-ink-faint">Story</p>
            <h1 className="display-lg mt-2 text-ink text-balance">{story.title}</h1>
            <p className="mt-4 text-[14px] text-ink-faint">
              {story.author}
              {story.author && story.published_at ? " · " : ""}
              {story.published_at
                ? new Date(story.published_at).toLocaleDateString(undefined, { dateStyle: "long" })
                : ""}
            </p>
          </Reveal>

          {story.coverUrl && (
            <Reveal delay={0.05}>
              <img
                src={story.coverUrl}
                alt=""
                className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="prose-story mt-10" dangerouslySetInnerHTML={{ __html: story.content_html }} />
          </Reveal>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
