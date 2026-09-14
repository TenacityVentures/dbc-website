"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal, SectionHeading } from "@/components/reveal"

const PILLARS = [
  {
    label: "Education",
    href: "/programs/education",
    body: "School materials, uniforms, and follow-up so children stay enrolled and keep learning.",
  },
  {
    label: "Child protection",
    href: "/programs/protection",
    body: "Prevention, counselling, and family strengthening that keep children safe from harm.",
  },
  {
    label: "Health & well-being",
    href: "/programs/health",
    body: "Nutrition, basic healthcare, and hygiene education for healthy growth.",
  },
  {
    label: "Empowerment",
    href: "/programs/empowerment",
    body: "Skills training and livelihoods so parents can provide for their families.",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading
          sticky
          eyebrow="What we do"
          title="Sustainable transformation."
          intro="We work alongside families, schools, and community leaders across Bo District, Sierra Leone."
        />

        <div className="lg:pt-2">
          {PILLARS.map((pillar, i) => (
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
