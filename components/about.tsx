"use client"

import { Reveal, SectionHeading } from "@/components/reveal"

const VALUES = [
  "Child-centred care",
  "Accountability & transparency",
  "Community participation",
  "Equity & inclusion",
  "Sustainability",
]

export function About() {
  return (
    <section id="about" className="bg-mist py-24 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeading
          sticky
          eyebrow="Who we are"
          title="Mission & vision."
          intro="A community-based non-profit established in Sierra Leone in 2022 — legally constituted, non-political, non-sectarian."
        />

        <div className="lg:pt-2">
          <Reveal>
            <p className="body-copy text-[1.15rem] leading-[1.62] text-ink">
              Children thrive best when their families are strengthened and their communities are supported to care
              for them. Guided by our constitution and by internationally accepted best practice in child care, we
              protect the most vulnerable children and help families become self-reliant.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="rule-top pt-5">
                <h3 className="eyebrow text-ink-faint">Our vision</h3>
                <p className="body-copy mt-3">
                  A Sierra Leone where every child has the opportunity to thrive, learn, and reach their full
                  potential.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="rule-top pt-5">
                <h3 className="eyebrow text-ink-faint">Our mission</h3>
                <p className="body-copy mt-3">
                  To improve the lives of deprived and vulnerable children through education, protection, empowerment,
                  and community development.
                </p>
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
