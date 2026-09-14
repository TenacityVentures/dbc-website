"use client"

import { Reveal, SectionHeading } from "@/components/reveal"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

const VALUES = [
  "Child-centred care",
  "Accountability & transparency",
  "Community participation",
  "Equity & inclusion",
  "Sustainability",
]

type AboutProps = {
  eyebrow?: string
  title?: string
  intro?: string
  body?: string
  visionTitle?: string
  vision?: string
  missionTitle?: string
  mission?: string
}

const DEFAULTS = CONTENT_DEFAULTS.home.about

export function About({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  intro = DEFAULTS.intro,
  body = DEFAULTS.body,
  visionTitle = DEFAULTS.visionTitle,
  vision = DEFAULTS.vision,
  missionTitle = DEFAULTS.missionTitle,
  mission = DEFAULTS.mission,
}: AboutProps) {
  return (
    <section id="about" className="bg-mist py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading sticky eyebrow={eyebrow} title={title} intro={intro} />

        <div className="lg:pt-2">
          <Reveal>
            <p className="body-copy text-[1.15rem] leading-[1.62] text-ink">{body}</p>
          </Reveal>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="rule-top pt-5">
                <h3 className="eyebrow text-ink-faint">{visionTitle}</h3>
                <p className="body-copy mt-3">{vision}</p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rule-top pt-5">
                <h3 className="eyebrow text-ink-faint">{missionTitle}</h3>
                <p className="body-copy mt-3">{mission}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="rule-top mt-10 pt-5">
              <h3 className="eyebrow text-ink-faint">Our values</h3>
              <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                {VALUES.map((value) => (
                  <li
                    key={value}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[14px] text-ink-soft"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
