"use client"

import { useState, useEffect, useRef } from "react"
import { Eye, EyeOff, Trash2, Upload, Plus, X, Check, ImagePlus, AlertCircle, Loader2 } from "lucide-react"
import type { GalleryImage } from "@/lib/supabase"

const CATEGORIES = ["community", "education", "children", "health", "field-work"]

function ImageCard({
  image,
  onToggle,
  onDelete,
  onUpdate,
}: {
  image: GalleryImage
  onToggle: (id: string, visible: boolean) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<GalleryImage>) => void
}) {
  const [editing, setEditing] = useState(false)
  const [caption, setCaption] = useState(image.caption)
  const [category, setCategory] = useState(image.category)

  async function saveEdits() {
    onUpdate(image.id, { caption, category })
    setEditing(false)
  }

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm transition-all ${
      image.visible ? "border-slate-200" : "border-slate-100 opacity-60"
    }`}>
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
        {!image.visible && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-black/60 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <EyeOff className="w-3.5 h-3.5" /> Hidden
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {editing ? (
          <div className="space-y-3">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c.replace("-", " ")}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={saveEdits}
                className="flex-1 bg-secondary text-primary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-secondary/90 transition-colors"
              >
                <Check className="w-3.5 h-3.5" /> Save
              </button>
              <button
                onClick={() => { setCaption(image.caption); setCategory(image.category); setEditing(false) }}
                className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="font-bold text-primary text-sm truncate">{image.caption || "Untitled"}</p>
            <span className="inline-block bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1">
              {image.category.replace("-", " ")}
            </span>
          </>
        )}

        {/* Actions */}
        {!editing && (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => onToggle(image.id, !image.visible)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                image.visible
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  : "bg-secondary/10 text-secondary hover:bg-secondary/20"
              }`}
            >
              {image.visible ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Show</>}
            </button>
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-2 rounded-lg text-xs font-bold bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Remove this image from the gallery?")) onDelete(image.id)
              }}
              className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState("all")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCaption, setNewCaption] = useState("")
  const [newCategory, setNewCategory] = useState("community")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/gallery?all=true")
      .then((r) => r.json())
      .then((data) => { setImages(Array.isArray(data) ? data : []); setLoading(false) })
  }, [])

  const filtered = filterCategory === "all" ? images : images.filter((i) => i.category === filterCategory)

  async function handleToggle(id: string, visible: boolean) {
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible }),
    })
    if (res.ok) {
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, visible } : img)))
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id))
    }
  }

  async function handleUpdate(id: string, updates: Partial<GalleryImage>) {
    const res = await fetch(`/api/gallery/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (res.ok) {
      setImages((prev) => prev.map((img) => (img.id === id ? { ...img, ...updates } : img)))
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setUploadError("")
  }

  async function handleUpload() {
    if (!selectedFile) return
    setUploading(true)
    setUploadError("")

    // Upload image file
    const formData = new FormData()
    formData.append("file", selectedFile)
    const uploadRes = await fetch("/api/upload", { method: "POST", body: formData })

    if (!uploadRes.ok) {
      const err = await uploadRes.json()
      setUploadError(err.error || "Upload failed")
      setUploading(false)
      return
    }

    const { src } = await uploadRes.json()

    // Add to gallery
    const galleryRes = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ src, caption: newCaption, category: newCategory, alt: newCaption }),
    })

    if (galleryRes.ok) {
      const newImage = await galleryRes.json()
      setImages((prev) => [newImage, ...prev])
      setShowAddModal(false)
      setSelectedFile(null)
      setPreviewUrl("")
      setNewCaption("")
      setNewCategory("community")
    } else {
      setUploadError("Failed to save image.")
    }

    setUploading(false)
  }

  const visibleCount = images.filter((i) => i.visible).length

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-primary mb-1">Gallery Manager</h1>
          <p className="text-slate-500 text-sm">
            {images.length} total images · {visibleCount} visible to visitors
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" /> Upload Image
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {["all", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterCategory === cat
                ? "bg-primary text-white shadow"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {cat === "all" ? "All" : cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-secondary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-primary">Upload New Image</h2>
              <button onClick={() => { setShowAddModal(false); setPreviewUrl(""); setSelectedFile(null) }} className="text-slate-400 hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* File drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl cursor-pointer mb-5 transition-colors ${
                previewUrl ? "border-secondary/40 p-2" : "border-slate-300 hover:border-secondary p-10 text-center"
              }`}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full rounded-xl max-h-48 object-cover" />
              ) : (
                <>
                  <ImagePlus className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-500">Click to select image</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP · max 10MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Caption</label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Community Meeting"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-secondary"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.replace("-", " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            {uploadError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {uploadError}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddModal(false); setPreviewUrl(""); setSelectedFile(null) }}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex-1 py-3 rounded-xl bg-secondary text-primary font-bold text-sm hover:bg-secondary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-4 h-4" /> Upload</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
