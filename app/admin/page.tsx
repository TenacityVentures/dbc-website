import { supabaseAdmin } from "@/lib/supabase"
import { Images, BookOpen, Eye, EyeOff, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [{ data: images }, { data: posts }] = await Promise.all([
    supabaseAdmin.from("gallery_images").select("id, visible"),
    supabaseAdmin
      .from("blog_posts")
      .select("id, title, category, author, published, created_at")
      .order("created_at", { ascending: false }),
  ])

  const imageList = images ?? []
  const postList = posts ?? []

  const visibleImages = imageList.filter((i) => i.visible).length
  const hiddenImages = imageList.length - visibleImages
  const publishedPosts = postList.filter((p) => p.published).length
  const draftPosts = postList.length - publishedPosts

  const stats = [
    {
      label: "Total Images",
      value: imageList.length,
      sub: `${visibleImages} visible · ${hiddenImages} hidden`,
      icon: Images,
      color: "text-secondary",
      bg: "bg-secondary/10",
      href: "/admin/gallery",
    },
    {
      label: "Blog Posts",
      value: postList.length,
      sub: `${publishedPosts} published · ${draftPosts} drafts`,
      icon: BookOpen,
      color: "text-coral",
      bg: "bg-accent/10",
      href: "/admin/blog",
    },
    {
      label: "Visible Gallery",
      value: visibleImages,
      sub: "Images shown to visitors",
      icon: Eye,
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/admin/gallery",
    },
    {
      label: "Published Posts",
      value: publishedPosts,
      sub: "Live on the website",
      icon: BarChart3,
      color: "text-secondary",
      bg: "bg-secondary/10",
      href: "/admin/blog",
    },
  ]

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-primary mb-1">Dashboard</h1>
        <p className="text-slate-500">Manage your website content — gallery, blog, and more.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className={`inline-flex p-2.5 rounded-xl ${stat.bg} mb-4`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-primary flex items-center gap-2">
              <Images className="w-4 h-4 text-secondary" />
              Gallery
            </h2>
            <Link href="/admin/gallery" className="text-xs text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-sm text-slate-500 mb-5">
            You have <strong className="text-primary">{imageList.length}</strong> images in total.{" "}
            <strong className="text-secondary">{visibleImages}</strong> are visible to visitors.
          </p>
          <Link
            href="/admin/gallery"
            className="block w-full text-center bg-primary text-white py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
          >
            Manage Gallery
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              Blog
            </h2>
            <Link href="/admin/blog" className="text-xs text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Manage <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-sm text-slate-500 mb-5">
            <strong className="text-primary">{publishedPosts}</strong> published posts and{" "}
            <strong className="text-primary">{draftPosts}</strong> drafts.
          </p>
          <Link
            href="/admin/blog/new"
            className="block w-full text-center bg-secondary text-primary py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors"
          >
            Write New Post
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      {postList.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-primary">Recent Posts</h2>
            <Link href="/admin/blog" className="text-xs text-secondary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              All Posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {postList.slice(0, 4).map((post) => (
              <div key={post.id} className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary text-sm truncate">{post.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{post.category} · {post.author}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {post.published ? (
                    <span className="flex items-center gap-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      <Eye className="w-3 h-3" /> Live
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                      <EyeOff className="w-3 h-3" /> Draft
                    </span>
                  )}
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="text-xs text-secondary font-bold hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
