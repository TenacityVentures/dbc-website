"use client"

import { useEffect, useMemo, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

type GalleryImage = {
  src: string
  alt: string
  caption?: string
  location?: string
}

type GallerySection = {
  id: string
  title: string
  footnote: string
  images: GalleryImage[]
}

const PAGE_SIZE = 8

type GalleryPageClientProps = {
  sections: GallerySection[]
}

export function GalleryPageClient({ sections }: GalleryPageClientProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)
  const [visibleBySection, setVisibleBySection] = useState<Record<string, number>>({})
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  const allImages = useMemo(() => sections.flatMap((section) => section.images), [sections])
  const totalImages = allImages.length
  const priorityImageCount = Math.min(2, totalImages)

  useEffect(() => {
    setVisibleBySection((current) => {
      const next = { ...current }
      for (const section of sections) {
        if (!next[section.id]) {
          next[section.id] = PAGE_SIZE
        }
      }
      return next
    })
  }, [sections])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null)
      }

      if (activeImage && allImages.length > 0) {
        const currentIndex = allImages.findIndex((image) => image.src === activeImage.src)
        if (currentIndex === -1) {
          return
        }
        if (event.key === "ArrowRight") {
          const nextIndex = (currentIndex + 1) % allImages.length
          setActiveImage(allImages[nextIndex])
        }
        if (event.key === "ArrowLeft") {
          const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
          setActiveImage(allImages[prevIndex])
        }
      }
    }

    if (activeImage) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKeyDown)
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeImage, allImages])

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">Our Gallery</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-primary">Stories in Pictures</h1>
            <p className="mt-4 text-slate-600">
              A glimpse into our programs, partners, and the communities we serve.
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Showing {totalImages} images across {sections.length} program areas
            </p>
          </div>

          {sections.map((section, sectionIndex) => {
            const visibleCount = visibleBySection[section.id] ?? PAGE_SIZE
            const visibleImages = section.images.slice(0, visibleCount)
            const canLoadMore = visibleCount < section.images.length

            return (
              <section key={section.id} className={sectionIndex === 0 ? "mt-12" : "mt-16"}>
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary">{section.title}</h2>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {visibleImages.map((image) => {
                    const globalIndex = allImages.findIndex((item) => item.src === image.src)
                    return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className="group relative overflow-hidden rounded-3xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        {!loadedImages[image.src] && (
                          <div className="absolute inset-0 animate-pulse bg-slate-200" />
                        )}
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading={globalIndex < priorityImageCount ? "eager" : "lazy"}
                          decoding="async"
                          fetchPriority={globalIndex < priorityImageCount ? "high" : "auto"}
                          className={`h-44 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-52 lg:h-56 ${
                            loadedImages[image.src] ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => setLoadedImages((prev) => ({ ...prev, [image.src]: true }))}
                        />
                      </button>
                    )
                  })}
                </div>
                <p className="mt-4 text-sm text-slate-600 italic">{section.footnote}</p>
                {canLoadMore && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleBySection((current) => ({
                          ...current,
                          [section.id]: Math.min((current[section.id] ?? PAGE_SIZE) + PAGE_SIZE, section.images.length),
                        }))
                      }
                      className="rounded-full bg-secondary px-5 py-2 text-xs font-bold uppercase tracking-wide text-primary shadow-md transition hover:bg-secondary/90"
                    >
                      Load More {section.title}
                    </button>
                  </div>
                )}
              </section>
            )
          })}

          {totalImages === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No images found in <span className="font-semibold text-primary">public/DBC/</span>.
            </div>
          )}
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 relative">
          <div
            className="absolute inset-0 z-0 cursor-zoom-out"
            aria-hidden="true"
            onClick={() => setActiveImage(null)}
          />
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 z-20 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white sm:right-6 sm:top-6 sm:text-sm"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              if (allImages.length === 0) {
                return
              }
              const currentIndex = allImages.findIndex((image) => image.src === activeImage.src)
              if (currentIndex === -1) {
                return
              }
              const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
              setActiveImage(allImages[prevIndex])
            }}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white sm:inline-flex"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              if (allImages.length === 0) {
                return
              }
              const currentIndex = allImages.findIndex((image) => image.src === activeImage.src)
              if (currentIndex === -1) {
                return
              }
              const nextIndex = (currentIndex + 1) % allImages.length
              setActiveImage(allImages[nextIndex])
            }}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white sm:inline-flex"
          >
            Next
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => {
                if (allImages.length === 0) {
                  return
                }
                const currentIndex = allImages.findIndex((image) => image.src === activeImage.src)
                if (currentIndex === -1) {
                  return
                }
                const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length
                setActiveImage(allImages[prevIndex])
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                if (allImages.length === 0) {
                  return
                }
                const currentIndex = allImages.findIndex((image) => image.src === activeImage.src)
                if (currentIndex === -1) {
                  return
                }
                const nextIndex = (currentIndex + 1) % allImages.length
                setActiveImage(allImages[nextIndex])
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white"
            >
              Next
            </button>
          </div>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            loading="eager"
            decoding="async"
            className="relative z-10 max-h-[70vh] max-w-full rounded-3xl object-contain shadow-2xl sm:max-h-[85vh]"
          />
        </div>
      )}

      <Footer />
    </main>
  )
}
