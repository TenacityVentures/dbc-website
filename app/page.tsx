import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { WhatWeDo } from "@/components/what-we-do"
import { About } from "@/components/about"
import { QuoteBand } from "@/components/quote-band"
import { Impact } from "@/components/impact"
import { WhereWeWork } from "@/components/where-we-work"
import { WaysToGive } from "@/components/ways-to-give"
import { StoryCta } from "@/components/story-cta"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WhatWeDo />
        <About />
        <QuoteBand />
        <Impact />
        <WhereWeWork />
        <WaysToGive />
        <StoryCta />
      </main>
      <SiteFooter />
    </>
  )
}
