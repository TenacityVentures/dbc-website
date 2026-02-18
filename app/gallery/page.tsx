"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X, ChevronLeft, ChevronRight, Images, ZoomIn } from "lucide-react"
import type { GalleryImage } from "@/lib/data"

const CATEGORIES = [
  { key: "all", label: "All Photos" },
  { key: "community", label: "Community" },
  { key: "education", label: "Education" },
  { key: "children", label: "Children" },
  { key: "health", label: "Health" },
  { key: "field-work", label: "Field Work" },
]

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: GalleryImage[]) => {
        setImages(data.filter((img) => img.visible))
        setLoading(false)
      })
  }, [])

  const filtered = activeCategory === "all" ? images : images.filter((img) => img.category === activeCategory)

  // Keyboard navigation for lightbox
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i! + 1) % filtered.length)
      if (e.key === "ArrowLeft") setLightboxIndex((i) => ((i! - 1) + filtered.length) % filtered.length)
      if (e.key === "Escape") setLightboxIndex(null)
    },
    [lightboxIndex, filtered.length]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [handleKey])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  const activeLightboxImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 bg-primary relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                top: `${(i * 17) % 100}%`,
                left: `${(i * 23) % 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Images className="text-secondary w-5 h-5" />
              <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Our Gallery</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Witnessing Change<br />
              <span className="text-secondary">in Every Frame</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
              Every photograph tells the story of a child supported, a family strengthened, and a community transformed.
              Explore the real impact of Dream Big for Children across Bo District, Sierra Leone.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/10"
          >
            {[
              { value: "47+", label: "Photos" },
              { value: "5", label: "Communities" },
              { value: "4", label: "Programs" },
              { value: "2022", label: "Est." },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-secondary">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="sticky top-20 z-30 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.key
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
                {activeCategory === cat.key && (
                  <span className="ml-2 text-xs text-secondary font-bold">{filtered.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry Grid ── */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid mb-4 rounded-3xl bg-slate-200 animate-pulse"
                  style={{ height: `${200 + (i % 3) * 80}px` }}
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <Images className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-bold">No images in this category yet.</p>
            </div>
          ) : (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4"
            >
              {filtered.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.6) }}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white font-bold text-sm leading-tight">{image.caption}</p>
                        {image.subcaption && (
                          <p className="text-white/70 text-xs mt-1">{image.subcaption}</p>
                        )}
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 flex-shrink-0">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="inline-block bg-secondary/80 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {image.category.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && activeLightboxImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-white/60 text-sm font-bold">
              {lightboxIndex + 1} / {filtered.length}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => ((i! - 1) + filtered.length) % filtered.length)
              }}
              className="absolute left-4 md:left-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[85vh] mx-16 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeLightboxImage.src}
                alt={activeLightboxImage.alt}
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-white font-bold text-lg">{activeLightboxImage.caption}</p>
                {activeLightboxImage.subcaption && (
                  <p className="text-white/60 text-sm mt-1">{activeLightboxImage.subcaption}</p>
                )}
                <span className="inline-block mt-2 bg-secondary/30 text-secondary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {activeLightboxImage.category.replace("-", " ")}
                </span>
              </div>
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex((i) => (i! + 1) % filtered.length)
              }}
              className="absolute right-4 md:right-8 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
