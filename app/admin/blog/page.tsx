"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Eye, EyeOff, Pencil, Trash2, BookOpen, Calendar, Loader2, ExternalLink } from "lucide-react"
import { format } from "date-fns"
import type { BlogPost } from "@/lib/supabase"

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false) })
  }, [])

  async function togglePublish(post: BlogPost) {
    const res = await fetch(`/api/blog/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    })
    if (res.ok) {
      const updated = await res.json()
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)))
    }
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post permanently? This cannot be undone.")) return
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" })
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  const published = posts.filter((p) => p.published).length
  const drafts = posts.length - published

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-primary mb-1">Blog Posts</h1>
          <p className="text-slate-500 text-sm">
            {posts.length} total · <span className="text-green-600 font-bold">{published} published</span> · <span className="text-slate-400">{drafts} drafts</span>
          </p>
        </div>
        <Link href="/admin/blog/new" className="flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors shadow-md">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 text-secondary animate-spin" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-bold text-lg">No posts yet.</p>
          <Link href="/admin/blog/new" className="inline-flex items-center gap-2 mt-6 bg-secondary text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors">
            <Plus className="w-4 h-4" /> Create First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className={`bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-center ${post.published ? "border-slate-200" : "border-slate-100"}`}>
              {/* Thumbnail */}
              <div className="w-20 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 hidden sm:block">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {post.published ? (
                    <span className="flex items-center gap-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" /> Live
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      <EyeOff className="w-3 h-3" /> Draft
                    </span>
                  )}
                  <span className="bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">{post.category}</span>
                </div>
                <h3 className="font-extrabold text-primary text-sm leading-snug truncate">{post.title}</h3>
                <p className="text-slate-400 text-xs mt-0.5 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(post.created_at), "MMM d, yyyy")} · {post.author}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
                <Link href={`/admin/blog/${post.id}/edit`} className="flex items-center gap-1 bg-primary/5 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary/10 transition-colors">
                  <Pencil className="w-3 h-3" /> Edit
                </Link>
                <button
                  onClick={() => togglePublish(post)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${post.published ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                >
                  {post.published ? <><EyeOff className="w-3 h-3" /> Unpublish</> : <><Eye className="w-3 h-3" /> Publish</>}
                </button>
                {post.published && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-secondary/20 transition-colors">
                    <ExternalLink className="w-3 h-3" /> View
                  </a>
                )}
                <button onClick={() => deletePost(post.id)} className="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
