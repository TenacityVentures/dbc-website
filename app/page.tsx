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
import { getPageContent } from "@/lib/content-data"

export const revalidate = 0

export default async function Home() {
  const content = await getPageContent("home")

  return (
    <>
      <SiteHeader />
      <main>
        <Hero {...content.hero} />
        <WhatWeDo {...content["what-we-do"]} />
        <About {...content.about} />
        <QuoteBand {...content.quote} />
        <Impact {...content.impact} />
        <WhereWeWork {...content["where-we-work"]} />
        <WaysToGive {...content["ways-to-give"]} />
        <StoryCta {...content["story-cta"]} />
      </main>
      <SiteFooter />
    </>
  )
}
