import type { Metadata } from "next"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { createClient } from "@/lib/supabase/server"
import { STORIES_BUCKET } from "@/lib/stories"

export const metadata: Metadata = {
  title: "Stories | Dream Big for Children (DBC)",
  description:
    "Updates and stories from Dream Big for Children's programmes in Bo District, Sierra Leone.",
  alternates: {
    canonical: "https://dreambigforchildren.org/stories",
  },
}

export const revalidate = 0

export default async function StoriesPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from("stories")
    .select("id, slug, title, excerpt, cover_storage_path, author, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  const stories = (rows ?? []).map((row) => ({
    ...row,
    coverUrl: row.cover_storage_path
      ? supabase.storage.from(STORIES_BUCKET).getPublicUrl(row.cover_storage_path).data.publicUrl
      : null,
  }))

  return (
    <>
      <SiteHeader />

      <main>
        <section className="bg-mist py-16 lg:py-24">
          <div className="shell">
            <Reveal>
              <p className="accent text-ink-faint">Stories</p>
              <h1 className="display-xl mt-2 max-w-[16ch] text-ink text-balance">Updates from the field.</h1>
              <p className="lede mt-5 max-w-[58ch] text-pretty">
                News, reflections, and moments from our work with children and families across Bo District.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="shell">
            {stories.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {stories.map((story, i) => (
                  <Reveal key={story.id} delay={(i % 6) * 0.05}>
                    <Link href={`/stories/${story.slug}`} className="group block">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-mist">
                        {story.coverUrl && (
                          <img
                            src={story.coverUrl}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <p className="mt-4 text-[12px] text-ink-faint">
                        {story.published_at
                          ? new Date(story.published_at).toLocaleDateString(undefined, { dateStyle: "long" })
                          : ""}
                        {story.author ? ` · ${story.author}` : ""}
                      </p>
                      <h2 className="mt-1.5 text-[19px] font-medium leading-snug text-ink text-balance">
                        {story.title}
                      </h2>
                      {story.excerpt && (
                        <p className="body-copy mt-2 line-clamp-2 text-ink-soft">{story.excerpt}</p>
                      )}
                    </Link>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-line bg-mist p-10 text-center">
                <p className="body-copy">No stories published yet — check back soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
