"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const heroImages = [
    "/communityhappyhandsup.jpg",
    "/img1.jpg",
    "/img3.jpg",
    "/community2.jpg",
    "/kidswithballon.jpg",
    "/community.jpg",
    "/schooldevotion.jpg",
    "/outdoor-community-engagement.jpg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <header className="relative h-screen flex items-center pt-24 overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5
             }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full object-cover object-center opacity-60 md:opacity-80 absolute inset-0"
            alt="Children in Sierra Leone"
            loading="eager"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/50 to-transparent md:from-transparent md:via-primary/30 md:to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 relative z-10">
        <div className="max-w-7xl py-0 w-100%">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-1"
          >
            <span className="h-px w-8 bg-secondary" />
            <span className="text-secondary text-xs font-bold uppercase tracking-widest">Empowering Young Lives</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-[1.1]"
          >
            Dream Big for <br />
            <span className="text-secondary">Children </span>
            <span className="text-secondary">Organization</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-slate-300 mb-10 leading-relaxed max-w-xl"
          >
            We work with vulnerable children, families, women, and youth to improve child well-being and strengthen
            families through education, child protection, and sustainable community development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-row gap-3 sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-bold rounded-2xl shadow-xl flex-1 sm:flex-none"
            >
              <a href="#about" className="flex items-center justify-center gap-2">
                <span className="hidden sm:inline">Read Our Mission</span>
                <span className="sm:hidden">Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-bold rounded-2xl hover:bg-white/20 flex-1 sm:flex-none"
            >
              <a href="#donate" className="flex items-center justify-center">Support a Child</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
