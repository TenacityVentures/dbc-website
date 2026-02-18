"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Save, Loader2, Info } from "lucide-react"
import Link from "next/link"
import { parseMarkdown } from "@/lib/markdown"
import type { BlogPost } from "@/lib/data"

const CATEGORIES = ["News", "Impact", "Education", "Health", "Community", "Events", "Stories"]

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  const [post, setPost] = useState<BlogPost | null>(null)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("")
  const [author, setAuthor] = useState("")
  const [category, setCategory] = useState("News")
  const [tagsInput, setTagsInput] = useState("")
  const [published, setPublished] = useState(false)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then((r) => r.json())
      .then((data: BlogPost) => {
        setPost(data)
        setTitle(data.title)
        setExcerpt(data.excerpt)
        setContent(data.content)
        setFeaturedImage(data.featuredImage)
        setAuthor(data.author)
        setCategory(data.category)
        setTagsInput(data.tags.join(", "))
        setPublished(data.published)
        setLoading(false)
      })
  }, [id])

  async function handleSave() {
    if (!title.trim()) { setError("Title is required."); return }
    if (!content.trim()) { setError("Content is required."); return }
    setError("")
    setSaving(true)

    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean)

    const res = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, featuredImage, author, category, tags, published }),
    })

    if (res.ok) {
      router.push("/admin/blog")
      router.refresh()
    } else {
      setError("Failed to save changes. Please try again.")
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-32">
        <Loader2 className="w-8 h-8 text-secondary animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="text-slate-400 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-primary">Edit Post</h1>
            <p className="text-slate-500 text-sm truncate max-w-xs">{post?.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            {preview ? <><EyeOff className="w-4 h-4" /> Edit</> : <><Eye className="w-4 h-4" /> Preview</>}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 shadow-md"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Post Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-extrabold text-primary border-none outline-none"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full text-slate-600 border-none outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Content *</label>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">**bold**</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">*italic*</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded"># H1</span>
              </div>
            </div>
            {preview ? (
              <div
                className="prose p-6 min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
              />
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={24}
                className="w-full p-6 font-mono text-sm text-slate-700 border-none outline-none resize-none leading-loose"
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-primary text-sm mb-4">Publish Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setPublished(!published)}
                className={`relative rounded-full transition-colors cursor-pointer flex-shrink-0 ${
                  published ? "bg-secondary" : "bg-slate-300"
                }`}
                style={{ width: "40px", height: "22px" }}
              >
                <div
                  className={`absolute top-0.5 bg-white rounded-full shadow-sm transition-transform`}
                  style={{
                    width: "18px",
                    height: "18px",
                    transform: published ? "translateX(20px)" : "translateX(2px)",
                  }}
                />
              </div>
              <span className="text-sm font-bold text-primary">
                {published ? "Published (Live)" : "Draft (Hidden)"}
              </span>
            </label>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Featured Image</label>
            {featuredImage && (
              <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
              </div>
            )}
            <input
              type="text"
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Author */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Tags</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="education, children, impact"
              className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <p className="text-xs text-slate-400 mt-2">Separate tags with commas</p>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
