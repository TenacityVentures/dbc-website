"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-primary">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/landing.jpg"
          className="w-full h-full mt-20 pl-0 object-cover opacity-30"
          alt="Children in Sierra Leone"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
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
            <span className="text-secondary">Children Organization</span>
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
            className="flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 px-8 py-6 text-base font-bold rounded-2xl shadow-xl"
            >
              <a href="#about" className="flex items-center gap-2">
                Read Our Mission <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-8 py-6 text-base font-bold rounded-2xl hover:bg-white/20"
            >
              <a href="#donate">Support a Child</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
