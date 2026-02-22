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

const galleryImages: GalleryImage[] = [
  {
    src: "/team.jpg",
    alt: "School materials distribution",
    caption: "School Materials Distribution",
    location: "Bo District",
  },
  {
    src: "/img2.jpg",
    alt: "Child protection session",
    caption: "Child Protection and Care",
  },
  {
    src: "/img3.jpg",
    alt: "Empowering children through education",
    caption: "Empowering Children Through Education",
  },
  {
    src: "/community.jpg",
    alt: "Community development meeting",
    caption: "Community Development Meetings",
    location: "Bo District",
  },
  {
    src: "/kids.jpg",
    alt: "Students in class",
    caption: "Quality Education",
  },
  {
    src: "/img1.jpg",
    alt: "Children playing",
    caption: "Health and Recreation",
  },
  {
    src: "/outside-school.jpg",
    alt: "Outdoor learning session",
    caption: "Outdoor Learning Session",
  },
  {
    src: "/communityhappyhandsup.jpg",
    alt: "Community celebration",
    caption: "Community Celebration",
  },
]

const PAGE_SIZE = 16

export function GalleryPageClient() {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const visibleImages = useMemo(() => galleryImages.slice(0, visibleCount), [visibleCount])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null)
      }

      if (activeImage) {
        const currentIndex = galleryImages.findIndex((image) => image.src === activeImage.src)
        if (event.key === "ArrowRight") {
          const nextIndex = (currentIndex + 1) % galleryImages.length
          setActiveImage(galleryImages[nextIndex])
        }
        if (event.key === "ArrowLeft") {
          const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
          setActiveImage(galleryImages[prevIndex])
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
  }, [activeImage])

  const totalImages = galleryImages.length
  const canLoadMore = visibleCount < totalImages

  return (
    <main className="min-h-screen bg-slate-50">
      <Navigation />

      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-secondary">Our Gallery</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-primary">Stories in Pictures</h1>
            <p className="mt-4 text-slate-600">
              Add new images by updating the <span className="font-semibold text-primary">galleryImages</span> array in
              this page and dropping files into the <span className="font-semibold text-primary">public/</span> folder.
            </p>
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Showing {Math.min(visibleCount, totalImages)} of {totalImages} images
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {visibleImages.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={() => setActiveImage(image)}
                className="group relative overflow-hidden rounded-3xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-52 lg:h-56"
                />
                {(image.caption || image.location) && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-left opacity-0 transition group-hover:opacity-100">
                    {image.caption && <p className="text-sm font-semibold text-white">{image.caption}</p>}
                    {image.location && <p className="text-xs text-white/80">{image.location}</p>}
                  </div>
                )}
              </button>
            ))}
          </div>

          {canLoadMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, totalImages))}
                className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary shadow-md transition hover:bg-secondary/90"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {activeImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6">
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
              const currentIndex = galleryImages.findIndex((image) => image.src === activeImage.src)
              const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
              setActiveImage(galleryImages[prevIndex])
            }}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white sm:inline-flex"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              const currentIndex = galleryImages.findIndex((image) => image.src === activeImage.src)
              const nextIndex = (currentIndex + 1) % galleryImages.length
              setActiveImage(galleryImages[nextIndex])
            }}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-white sm:inline-flex"
          >
            Next
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-3 sm:hidden">
            <button
              type="button"
              onClick={() => {
                const currentIndex = galleryImages.findIndex((image) => image.src === activeImage.src)
                const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
                setActiveImage(galleryImages[prevIndex])
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                const currentIndex = galleryImages.findIndex((image) => image.src === activeImage.src)
                const nextIndex = (currentIndex + 1) % galleryImages.length
                setActiveImage(galleryImages[nextIndex])
              }}
              className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white"
            >
              Next
            </button>
          </div>

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="relative z-10 max-h-[80vh] max-w-full rounded-3xl object-contain shadow-2xl sm:max-h-full"
          />
        </div>
      )}

      <Footer />
    </main>
  )
}
