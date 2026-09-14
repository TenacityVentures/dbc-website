"use client"

import { ArrowUpRight } from "lucide-react"
import { CONTACT } from "@/lib/site"
import { Reveal, SectionHeading } from "@/components/reveal"

const PARTNERS = [
  {
    title: "Organisations & institutions",
    body: "Fund a school year, a protection programme, or a livelihood cohort in one of our five communities.",
  },
  {
    title: "Individual benefactors",
    body: "Support a child through the school year with materials, follow-up, and encouragement to keep learning.",
  },
  {
    title: "Skills training partners",
    body: "Bring vocational training to parents and youth so families can earn and care for their children.",
  },
]

export function WaysToGive() {
  return (
    <section id="get-involved" className="bg-mist py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading
          sticky
          eyebrow="Get involved"
          title="Ways to give."
          intro="Your contribution keeps a child in school and helps a family become stronger."
        />

        <div className="lg:pt-2">
          {PARTNERS.map((partner, i) => (
            <Reveal key={partner.title} delay={i * 0.06}>
              <div className="border-t border-line py-8 last:border-b">
                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{partner.title}</h3>
                <p className="body-copy mt-2 max-w-[48ch]">{partner.body}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href={CONTACT.mailto} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Send a partnership inquiry
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a href={CONTACT.phoneHref} className="text-[15px] text-ink-soft transition-colors hover:text-ink">
                or call {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
