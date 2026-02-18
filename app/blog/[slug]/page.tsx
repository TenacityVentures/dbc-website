import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPublishedPosts, getPostBySlug } from "@/lib/data"
import { parseMarkdown } from "@/lib/markdown"
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | DBC Blog`,
    description: post.excerpt,
    openGraph: {
      images: [post.featuredImage],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.published) notFound()

  const allPosts = getPublishedPosts()
  const currentIdx = allPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null

  const htmlContent = parseMarkdown(post.content)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* ── Featured Image Hero ── */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden mt-20">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-secondary text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {post.category}
            </span>
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ── Article ── */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-wider mb-10 pb-10 border-b border-slate-200">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-secondary" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            {format(new Date(post.publishedAt || post.createdAt), "MMMM d, yyyy")}
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-xl text-slate-500 leading-relaxed italic border-l-4 border-secondary pl-6 mb-12">
          {post.excerpt}
        </p>

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-slate-200">
            <Tag className="w-4 h-4 text-slate-400 mt-0.5" />
            {post.tags.map((tag) => (
              <span key={tag} className="bg-muted text-slate-500 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* ── Post Navigation ── */}
      {(prevPost || nextPost) && (
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <ArrowLeft className="w-5 h-5 text-secondary flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Previous</div>
                  <div className="text-sm font-bold text-primary truncate">{prevPost.title}</div>
                </div>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3 text-right col-start-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Next</div>
                  <div className="text-sm font-bold text-primary truncate">{nextPost.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-secondary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <section className="bg-primary py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Support Our Mission</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Every contribution helps us reach more children and families across Sierra Leone.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/#donate"
              className="bg-secondary text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors"
            >
              Donate Now
            </a>
            <Link
              href="/blog"
              className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
            >
              More Stories
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
