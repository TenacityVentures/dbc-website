"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

type Pillar = { label: string; href: string; body: string }

type WhatWeDoProps = {
  eyebrow?: string
  title?: string
  intro?: string
  pillars?: Pillar[]
}

const DEFAULTS = CONTENT_DEFAULTS.home["what-we-do"]

export function WhatWeDo({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  intro = DEFAULTS.intro,
  pillars = DEFAULTS.pillars,
}: WhatWeDoProps) {
  return (
    <section id="what-we-do" className="bg-white py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading sticky eyebrow={eyebrow} title={title} intro={intro} />

        <div className="lg:pt-2">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.label} delay={i * 0.06}>
              <Link
                href={pillar.href}
                className="group flex items-start justify-between gap-8 border-t border-line py-8 transition-colors hover:border-ink last:border-b"
              >
                <div>
                  <h3 className="display-md text-ink">{pillar.label}</h3>
                  <p className="body-copy mt-2 max-w-[46ch]">{pillar.body}</p>
                </div>
                <ArrowUpRight
                  className="mt-1.5 h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
