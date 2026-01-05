import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FocusAreas } from "@/components/focus-areas"
import { GallerySection } from "@/components/gallery-section"
import { ImpactStats } from "@/components/impact-stats"
import { DonateSection } from "@/components/donate-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FocusAreas />
      <GallerySection />
      <ImpactStats />
      <DonateSection />
      <Footer />
    </main>
  )
}
