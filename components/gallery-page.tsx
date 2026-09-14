"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"

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

/**
 * Thumbnail that fades in once decoded. The `complete` check on mount matters:
 * server-rendered images often finish loading before React attaches onLoad,
 * which would otherwise leave them stuck at opacity 0.
 */
function Thumb({
  image,
  priority,
  onOpen,
}: {
  image: GalleryImage
  priority: boolean
  onOpen: () => void
}) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-mist focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
      aria-label={`Open image: ${image.alt}`}
    >
      {!loaded && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-mist">
          <span className="brand-mark h-10 w-10 animate-pulse text-ink/15" aria-hidden />
        </div>
      )}
      <img
        ref={imgRef}
        src={image.src}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </button>
  )
}

type GalleryPageClientProps = {
  sections: GallerySection[]
}

export function GalleryPageClient({ sections }: GalleryPageClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [visibleBySection, setVisibleBySection] = useState<Record<string, number>>({})

  const allImages = useMemo(() => sections.flatMap((section) => section.images), [sections])
  const totalImages = allImages.length
  const priorityImageCount = Math.min(2, totalImages)
  const activeImage = activeImageIndex !== null ? (allImages[activeImageIndex] ?? null) : null

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
        setActiveImageIndex(null)
      }

      if (activeImageIndex !== null && allImages.length > 0) {
        if (event.key === "ArrowRight") {
          setActiveImageIndex((activeImageIndex + 1) % allImages.length)
        }
        if (event.key === "ArrowLeft") {
          setActiveImageIndex((activeImageIndex - 1 + allImages.length) % allImages.length)
        }
      }
    }

    if (activeImageIndex !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKeyDown)
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeImageIndex, allImages.length])

  function step(direction: 1 | -1) {
    if (allImages.length === 0 || activeImageIndex === null) return
    setActiveImageIndex((activeImageIndex + direction + allImages.length) % allImages.length)
  }

  return (
    <>
      <SiteHeader />

      <main>
        {/* Page header */}
        <section className="bg-mist py-16 lg:py-24">
          <div className="shell">
            <Reveal>
              <p className="accent text-ink-faint">Our gallery</p>
              <h1 className="display-xl mt-2 max-w-[16ch] text-ink text-balance">Stories in pictures.</h1>
              <p className="lede mt-5 max-w-[58ch] text-pretty">
                A glimpse into our programmes, partners, and the communities we serve across Bo District, Sierra
                Leone.
              </p>
              <p className="eyebrow mt-7 text-ink-faint">
                {totalImages} images &middot; {sections.length} programme areas
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="shell">
            {sections.map((section, sectionIndex) => {
              const visibleCount = visibleBySection[section.id] ?? PAGE_SIZE
              const visibleImages = section.images.slice(0, visibleCount)
              const canLoadMore = visibleCount < section.images.length

              return (
                <section key={section.id} className={sectionIndex === 0 ? "" : "mt-20 lg:mt-24"}>
                  <Reveal>
                    <h2 className="display-md text-ink">{section.title}</h2>
                    <p className="body-copy mt-3 max-w-[68ch]">{section.footnote}</p>
                  </Reveal>

                  <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
                    {visibleImages.map((image, i) => {
                      const globalIndex = allImages.indexOf(image)
                      const imageKey = `${image.src}-${globalIndex}`
                      return (
                        <Reveal key={imageKey} delay={(i % 8) * 0.05} y={20}>
                          <Thumb
                            image={image}
                            priority={globalIndex < priorityImageCount}
                            onOpen={() => setActiveImageIndex(globalIndex)}
                          />
                        </Reveal>
                      )
                    })}
                  </div>

                  {canLoadMore && (
                    <div className="mt-8">
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleBySection((current) => ({
                            ...current,
                            [section.id]: Math.min(
                              (current[section.id] ?? PAGE_SIZE) + PAGE_SIZE,
                              section.images.length,
                            ),
                          }))
                        }
                        className="btn border border-line text-ink hover:bg-mist"
                      >
                        Load more
                      </button>
                    </div>
                  )}
                </section>
              )
            })}

            {totalImages === 0 && (
              <div className="rounded-2xl border border-dashed border-line bg-mist p-10 text-center">
                <p className="body-copy">No images found in the gallery folders yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-zoom-out"
            aria-label="Close image viewer"
            onClick={() => setActiveImageIndex(null)}
          />

          <button
            type="button"
            onClick={() => setActiveImageIndex(null)}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink transition hover:bg-white sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => step(-1)}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink transition hover:bg-white sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => step(1)}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink transition hover:bg-white sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <figure className="relative z-10 flex max-h-full flex-col items-center justify-center px-4 py-16">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              loading="eager"
              decoding="async"
              className="max-h-[76vh] max-w-full object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center font-[family-name:var(--font-accent)] text-[14px] italic text-white/70">
              {activeImage.caption ?? activeImage.alt}
              {activeImage.location ? ` — ${activeImage.location}` : ""}
            </figcaption>
          </figure>
        </div>
      )}

      <SiteFooter />
    </>
  )
}
