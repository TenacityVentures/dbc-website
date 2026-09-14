"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

type HeroProps = {
  eyebrow?: string
  headline?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
  slides?: { src: string; credit: string }[]
}

const DEFAULTS = CONTENT_DEFAULTS.home.hero

export function Hero({
  eyebrow = DEFAULTS.eyebrow,
  headline = DEFAULTS.headline,
  ctaPrimaryLabel = DEFAULTS.ctaPrimaryLabel,
  ctaPrimaryHref = DEFAULTS.ctaPrimaryHref,
  ctaSecondaryLabel = DEFAULTS.ctaSecondaryLabel,
  ctaSecondaryHref = DEFAULTS.ctaSecondaryHref,
  slides = DEFAULTS.slides,
}: HeroProps) {
  const [index, setIndex] = useState(0)
  const imageLayer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000)
    return () => clearInterval(id)
  }, [slides.length])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let ctx: { revert: () => void } | undefined
    let cancelled = false

      ; (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ])
        if (cancelled || !imageLayer.current) return
        gsap.registerPlugin(ScrollTrigger)
        ctx = gsap.context(() => {
          gsap.to(imageLayer.current, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: imageLayer.current, start: "top top", end: "bottom top", scrub: true },
          })
        })
      })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section className="relative h-[calc(100svh-var(--header-h))] min-h-[520px] w-full overflow-hidden">
      <div ref={imageLayer} className="absolute inset-0 -bottom-[12%]">
        <AnimatePresence mode="sync">
          <motion.img
            key={slides[index].src}
            src={slides[index].src}
            alt=""
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.5 }, scale: { duration: 8, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority={index === 0 ? "high" : "auto"}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-ink/20" />
      </div>

      {/* Compact frosted panel */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="shell pb-8 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="glass max-w-[620px] rounded-2xl px-7 py-7 lg:px-9 lg:py-8"
          >
            <p className="accent text-white/85">{eyebrow}</p>
            <h1 className="mt-1.5 text-[clamp(1.7rem,1.15rem+1.9vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white text-balance">
              {headline}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href={ctaPrimaryHref} className="btn btn-gold">
                {ctaPrimaryLabel}
              </Link>
              <Link href={ctaSecondaryHref} className="btn btn-ghost">
                {ctaSecondaryLabel}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  )
}
