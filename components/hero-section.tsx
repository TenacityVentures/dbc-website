"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    "/landing.jpg",
    "/kids.jpg",
    "/team.jpg",
    "/community.jpg",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 6000) // Change image every 6 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <header className="relative h-screen flex items-center overflow-hidden gradient-primary">
      {/* Background Image with Sophisticated Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex]}
              className="w-full h-full object-cover object-center"
              alt="Dream Big for Children - Empowering communities"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated gradient overlay */}
        <div className="absolute inset-0 gradient-overlay" />

        {/* Additional subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto container-padding relative z-10">
        <div className="max-w-3xl">
          {/* Refined badge - less animation, more subtle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5"
          >
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">Empowering Young Lives Since 2008</span>
          </motion.div>

          {/* Professional headline with better typography */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-display text-white mb-6 leading-[1.05]"
          >
            Dream Big for{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-secondary via-teal-300 to-secondary bg-clip-text text-transparent">
                Children
              </span>
            </span>
          </motion.h1>

          {/* Subtitle with better spacing */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-subtitle text-white/90 mb-12 leading-relaxed max-w-2xl"
          >
            We work with vulnerable children, families, women, and youth to improve child well-being and strengthen
            families through education, child protection, and sustainable community development.
          </motion.p>

          {/* Professional button group */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden gradient-secondary text-white hover:shadow-glow px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 shadow-strong"
            >
              <a href="#about" className="flex items-center justify-center gap-2">
                <span>Learn About Our Mission</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group bg-white/95 backdrop-blur-sm text-primary border-white/30 hover:bg-white hover:shadow-medium px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300"
            >
              <a href="#donate" className="flex items-center justify-center gap-2">
                <span>Partner With Us</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center gap-8 mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">15+</span>
              <span className="text-sm text-white/70">Years Impact</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">10,000+</span>
              <span className="text-sm text-white/70">Children Served</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">50+</span>
              <span className="text-sm text-white/70">Communities</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/60 uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
