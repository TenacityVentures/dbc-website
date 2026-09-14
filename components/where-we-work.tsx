"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

const FIELD = [
  { src: "/team.jpg", caption: "School materials distribution", place: "Simbaru" },
  { src: "/community.jpg", caption: "Community development meeting", place: "Bagbo" },
  { src: "/outside-school.jpg", caption: "Outdoor learning session", place: "Tikonko" },
]

export function WhereWeWork() {
  return (
    <section id="where-we-work" className="bg-white pb-24 lg:pb-32">
      <div className="shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <Reveal>
            <p className="accent mb-2 text-ink-faint">Where we work</p>
            <h2 className="display-lg text-ink">Five communities in Bo District.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/gallery" className="link-arrow">
              View the full gallery
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 lg:gap-8">
          {FIELD.map((item, i) => (
            <Reveal key={item.src} delay={i * 0.08}>
              <figure className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-[15px] text-ink">{item.caption}</span>
                  <span className="font-[family-name:var(--font-accent)] text-[14px] italic text-ink-faint">
                    {item.place}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
