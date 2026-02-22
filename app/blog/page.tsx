import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { supabaseAdmin } from "@/lib/supabase"
import { BookOpen, Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Blog | Dream Big for Children",
  description: "Latest news, stories and updates from Dream Big for Children organization in Sierra Leone.",
}

export default async function BlogPage() {
  const { data: posts = [] } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false })

  const [featured, ...rest] = posts ?? []

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${60 + i * 40}px`,
                height: `${60 + i * 40}px`,
                top: `${(i * 19) % 100}%`,
                left: `${(i * 29) % 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-secondary w-5 h-5" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Our Blog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Stories of Impact,<br />
            <span className="text-secondary">Hope &amp; Change</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Read the latest updates, field stories, and news from Dream Big for Children — where every word carries
            the weight of a child&apos;s dream.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-bold text-lg">No posts published yet.</p>
              <p className="text-sm mt-2">Check back soon for stories from the field.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {/* Featured post */}
              {featured && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Featured Story</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <Link href={`/blog/${featured.slug}`} className="group block">
                    <div className="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border border-slate-100">
                      <div className="relative h-72 lg:h-full min-h-[360px] overflow-hidden">
                        <img
                          src={featured.featured_image}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-secondary text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {featured.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-10">
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-widest mb-5">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {format(new Date(featured.published_at || featured.created_at), "MMMM d, yyyy")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            {featured.author}
                          </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-primary mb-4 leading-tight group-hover:text-secondary transition-colors duration-300">
                          {featured.title}
                        </h2>
                        <p className="text-slate-500 leading-relaxed mb-8">{featured.excerpt}</p>
                        <div className="flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-4 transition-all duration-300">
                          Read Full Story <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">More Stories</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((post) => (
                      <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                        <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-400 border border-slate-100 h-full flex flex-col">
                          <div className="relative h-52 overflow-hidden">
                            <img
                              src={post.featured_image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-secondary text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                                {post.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                              </span>
                            </div>
                            <h3 className="text-lg font-extrabold text-primary mb-3 leading-snug group-hover:text-secondary transition-colors duration-300 flex-1">
                              {post.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-5">{post.excerpt}</p>
                            <div className="flex items-center gap-1.5 text-secondary font-bold text-sm group-hover:gap-3 transition-all duration-300 mt-auto">
                              Read More <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
