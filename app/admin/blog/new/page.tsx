"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Save, Loader2, ImagePlus, Info } from "lucide-react"
import Link from "next/link"
import { parseMarkdown } from "@/lib/markdown"

const CATEGORIES = ["News", "Impact", "Education", "Health", "Community", "Events", "Stories"]

export default function NewBlogPostPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [featuredImage, setFeaturedImage] = useState("/landing.jpg")
  const [author, setAuthor] = useState("DBC Team")
  const [category, setCategory] = useState("News")
  const [tagsInput, setTagsInput] = useState("")
  const [published, setPublished] = useState(false)
  const [preview, setPreview] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function handleSave() {
    if (!title.trim()) { setError("Title is required."); return }
    if (!content.trim()) { setError("Content is required."); return }
    setError("")
    setSaving(true)

    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean)

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, featuredImage, author, category, tags, published }),
    })

    if (res.ok) {
      router.push("/admin/blog")
      router.refresh()
    } else {
      setError("Failed to save post. Please try again.")
      setSaving(false)
    }
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
            <h1 className="text-2xl font-extrabold text-primary">New Blog Post</h1>
            <p className="text-slate-500 text-sm">Write and publish a new story</p>
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
            {saving ? "Saving..." : "Save Post"}
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
              placeholder="Enter a compelling headline..."
              className="w-full text-2xl font-extrabold text-primary border-none outline-none placeholder:text-slate-300 placeholder:font-normal"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary of the post (shown in listing pages)..."
              rows={3}
              className="w-full text-slate-600 border-none outline-none resize-none leading-relaxed placeholder:text-slate-300"
            />
          </div>

          {/* Content editor */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Content *</label>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">**bold**</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">*italic*</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded"># H1</span>
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">- list</span>
              </div>
            </div>

            {preview ? (
              <div
                className="prose p-6 min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(content) || "<p class='text-slate-300'>Nothing to preview yet...</p>" }}
              />
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`Write your blog post in Markdown...

# Start with a heading

Write compelling paragraphs with **bold** and *italic* text.

## Section headings break up content

- Bullet points work great
- For lists of items

> Blockquotes highlight important messages

Share your story of impact!`}
                rows={24}
                className="w-full p-6 font-mono text-sm text-slate-700 border-none outline-none resize-none leading-loose placeholder:text-slate-300"
              />
            )}
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-5">
          {/* Publish toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-primary text-sm mb-4">Publish Settings</h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setPublished(!published)}
                className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer ${
                  published ? "bg-secondary" : "bg-slate-300"
                }`}
                style={{ height: "22px" }}
              >
                <div
                  className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${
                    published ? "translate-x-5" : "translate-x-0.5"
                  }`}
                  style={{ width: "18px", height: "18px" }}
                />
              </div>
              <span className="text-sm font-bold text-primary">
                {published ? "Published (Live)" : "Draft (Hidden)"}
              </span>
            </label>
            <p className="text-xs text-slate-400 mt-2">
              {published ? "Visitors can see this post." : "Only admins can see this post."}
            </p>
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
              placeholder="/path/to/image.jpg"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <p className="text-xs text-slate-400 mt-2">Enter path to an image in /public</p>
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
            {saving ? "Saving..." : published ? "Save & Publish" : "Save as Draft"}
          </button>
        </div>
      </div>
    </div>
  )
}
