"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

/** Counts up to `value` once scrolled into view. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    let ctx: { revert: () => void } | undefined
    let cancelled = false

    ;(async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        const counter = { n: 0 }
        gsap.to(counter, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onUpdate: () => setDisplay(Math.round(counter.n)),
        })
      })
    })()

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [value])

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

type Stat = { value: string; suffix: string; label: string }

type ImpactProps = {
  title?: string
  stats?: Stat[]
  storyEyebrow?: string
  storyTitle?: string
  storyBody?: string
  storyImage?: string
}

const DEFAULTS = CONTENT_DEFAULTS.home.impact

export function Impact({
  title = DEFAULTS.title,
  stats = DEFAULTS.stats,
  storyEyebrow = DEFAULTS.storyEyebrow,
  storyTitle = DEFAULTS.storyTitle,
  storyBody = DEFAULTS.storyBody,
  storyImage = DEFAULTS.storyImage,
}: ImpactProps) {
  return (
    <section id="impact" className="bg-white py-24 lg:py-32">
      <div className="shell">
        <SectionHeading eyebrow="Impact" title={title} className="max-w-[34ch]" />

        {/* Figures on hairline rules — no boxes */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((stat, i) => {
            const numericValue = Number.parseInt(stat.value, 10)
            const isNumeric = !Number.isNaN(numericValue) && String(numericValue) === stat.value.trim()
            return (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="rule-top pt-5">
                  <p className="display-stat text-ink">
                    {isNumeric ? <Counter value={numericValue} suffix={stat.suffix} /> : stat.value}
                  </p>
                  <p className="mt-3 max-w-[20ch] text-[14px] leading-snug text-ink-soft">{stat.label}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Featured story */}
        <Reveal delay={0.1}>
          <article className="mt-20 grid items-center gap-10 lg:mt-24 lg:grid-cols-2 lg:gap-16">
            <figure className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
              <img src={storyImage} alt={storyTitle} className="h-full w-full object-cover" loading="lazy" />
            </figure>

            <div className="order-2 lg:order-1">
              <p className="eyebrow text-ink-faint">{storyEyebrow}</p>
              <h3 className="display-lg mt-3 text-ink text-balance">{storyTitle}</h3>
              <p className="body-copy mt-5 max-w-[48ch]">{storyBody}</p>
              <Link href="/gallery" className="link-arrow mt-8">
                See their story
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
