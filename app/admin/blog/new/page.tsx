"use client"

import dynamic from "next/dynamic"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Loader2, Info, Upload, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const RichTextEditor = dynamic(() => import("@/components/editor/RichTextEditor"), { ssr: false })

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
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [imgUploading, setImgUploading] = useState(false)
  const imgInputRef = useRef<HTMLInputElement>(null)

  async function handleFeaturedImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImgUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: formData })
    if (res.ok) {
      const { src } = await res.json()
      setFeaturedImage(src)
    }
    setImgUploading(false)
    if (imgInputRef.current) imgInputRef.current.value = ""
  }

  async function handleSave() {
    if (!title.trim()) { setError("Title is required."); return }
    if (!content || content === "<p></p>") { setError("Content cannot be empty."); return }
    setError("")
    setSaving(true)

    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, featured_image: featuredImage, author, category, tags, published }),
    })

    if (res.ok) {
      router.push("/admin/blog")
      router.refresh()
    } else {
      const err = await res.json()
      setError(err.error || "Failed to save post.")
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
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-secondary text-primary px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 shadow-md"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : published ? "Publish Post" : "Save Draft"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-xl px-4 py-3 mb-6 flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />{error}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* ── Editor area ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Post Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a compelling headline..."
              className="w-full text-2xl font-extrabold text-primary border-none outline-none placeholder:text-slate-300 placeholder:font-normal w-full"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A short summary shown in blog listings..."
              rows={2}
              className="w-full text-slate-600 border-none outline-none resize-none leading-relaxed placeholder:text-slate-300 text-sm"
            />
          </div>

          {/* Rich text editor */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">Content *</label>
            <RichTextEditor content={content} onChange={setContent} placeholder="Write your story here — use the toolbar to format text, add images, and create engaging content..." />
          </div>
        </div>

        {/* ── Sidebar settings ── */}
        <div className="space-y-5">
          {/* Publish toggle */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-primary text-sm mb-4">Status</h3>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all font-bold text-sm ${
                published
                  ? "border-secondary bg-secondary/5 text-primary"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <span className="flex items-center gap-2">
                {published ? <Eye className="w-4 h-4 text-secondary" /> : <EyeOff className="w-4 h-4" />}
                {published ? "Published — Live" : "Draft — Hidden"}
              </span>
              <div className={`w-10 h-5 rounded-full transition-colors flex items-center ${published ? "bg-secondary" : "bg-slate-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${published ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </button>
            <p className="text-xs text-slate-400 mt-2">
              {published ? "Visitors can read this post." : "Only you can see this post."}
            </p>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Featured Image</label>
            {featuredImage && (
              <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                <img src={featuredImage} alt="Featured" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="/path/to/image.jpg"
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs text-primary focus:outline-none focus:ring-2 focus:ring-secondary min-w-0"
              />
              <button
                type="button"
                onClick={() => imgInputRef.current?.click()}
                disabled={imgUploading}
                className="flex-shrink-0 bg-slate-100 text-slate-600 px-3 py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {imgUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              </button>
            </div>
            <input ref={imgInputRef} type="file" accept="image/*" onChange={handleFeaturedImageUpload} className="hidden" />
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Author */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary" />
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Tags</label>
            <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="education, children, impact" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary" />
            <p className="text-xs text-slate-400 mt-1.5">Separate with commas</p>
          </div>

          {/* Save button */}
          <button onClick={handleSave} disabled={saving} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : published ? "Save & Publish" : "Save as Draft"}
          </button>
        </div>
      </div>
    </div>
  )
}
