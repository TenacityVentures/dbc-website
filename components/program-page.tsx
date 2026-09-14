"use client"

import Link from "next/link"
import {
  Activity,
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  Heart,
  Home,
  Lightbulb,
  type LucideIcon,
  Pill,
  Shield,
  Stethoscope,
  Target,
  Users,
} from "lucide-react"
import type { IconName, Program } from "@/lib/programs"
import { CONTACT } from "@/lib/site"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal, SectionHeading } from "@/components/reveal"

const ICONS: Record<IconName, LucideIcon> = {
  activity: Activity,
  award: Award,
  bookOpen: BookOpen,
  heart: Heart,
  home: Home,
  lightbulb: Lightbulb,
  pill: Pill,
  shield: Shield,
  stethoscope: Stethoscope,
  target: Target,
  users: Users,
}

export function ProgramPage({ program }: { program: Program }) {
  return (
    <>
      <SiteHeader />

      <main>
        {/* Hero: photo with a compact frosted panel */}
        <section className="relative h-[56svh] min-h-[380px] w-full overflow-hidden">
          <img src={program.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-ink/20" />

          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-8 lg:pb-10">
              <div className="glass max-w-[600px] rounded-2xl px-7 py-7 lg:px-9">
                <p className="accent text-white/85">{program.eyebrow}</p>
                <h1 className="mt-1.5 text-[clamp(1.7rem,1.2rem+1.7vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white text-balance">
                  {program.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="bg-white py-24 lg:py-32">
          <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <SectionHeading sticky title={program.overviewTitle} intro={program.lede} />
            <div className="lg:pt-2">
              <Reveal>
                <div className="space-y-5">
                  {program.overview.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="body-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <figure className="mt-10 aspect-[3/2] overflow-hidden rounded-2xl bg-mist">
                  <img
                    src={program.overviewImage}
                    alt={program.overviewTitle}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* What we provide */}
        <section className="bg-mist py-24 lg:py-32">
          <div className="shell">
            <SectionHeading title={program.offerTitle} intro={program.offerSubtitle} className="max-w-[40ch]" />
            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {program.offers.map((offer, i) => {
                const Icon = ICONS[offer.icon]
                return (
                  <Reveal key={offer.title} delay={i * 0.07}>
                    <div className="rule-top pt-6">
                      <Icon className="h-6 w-6 text-ink" strokeWidth={1.5} aria-hidden />
                      <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-ink">{offer.title}</h3>
                      <p className="body-copy mt-2">{offer.description}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="bg-white py-24 lg:py-32">
          <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <p className="eyebrow text-ink-faint">Impact</p>
              <h2 className="display-lg mt-3 text-ink text-balance">{program.impactTitle}</h2>
              <p className="body-copy mt-5 max-w-[48ch]">{program.impact}</p>
              <div className="mt-10 grid grid-cols-2 gap-8">
                {program.stats.map((stat) => (
                  <div key={stat.label} className="rule-top pt-5">
                    <p className="display-stat text-ink">{stat.value}</p>
                    <p className="mt-3 max-w-[22ch] text-[14px] leading-snug text-ink-soft">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
                <img
                  src={program.impactImage}
                  alt={program.impactTitle}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-mist py-24 lg:py-28">
          <div className="shell text-center">
            <Reveal>
              <h2 className="display-lg mx-auto max-w-[24ch] text-ink text-balance">{program.ctaTitle}</h2>
              <p className="lede mx-auto mt-5 max-w-[56ch] text-pretty">{program.ctaBody}</p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a href={CONTACT.mailto} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  Support this programme
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <Link
                  href="/#what-we-do"
                  className="inline-flex items-center gap-2 text-[15px] text-ink-soft transition-colors hover:text-ink"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  All programmes
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
