"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Users, MapPin, Calendar } from "lucide-react"

const stats = [
  {
    value: "40+",
    label: "Children Supported Annually",
    icon: Users,
    color: "secondary"
  },
  {
    value: "5",
    label: "Communities Engaged",
    icon: MapPin,
    color: "gold"
  },
  {
    value: "300+",
    label: "Community Members Impacted",
    icon: TrendingUp,
    color: "accent"
  },
  {
    value: "2022",
    label: "Year Established",
    icon: Calendar,
    color: "secondary"
  },
]

export function ImpactStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impact" className="section-padding gradient-primary relative overflow-hidden" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-label text-white/90">Our Impact</span>
          </div>
          <h2 className="text-headline text-white mb-6">Creating Measurable Change</h2>
          <p className="text-subtitle text-white/80">
            Real numbers representing real lives transformed across Sierra Leone.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-secondary" />
                  </div>
                </div>

                {/* Value */}
                <div className="text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-xs lg:text-sm text-white/70 font-medium leading-tight">
                  {stat.label}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-12 border-t border-white/10"
        >
          <p className="text-white/80 text-lg mb-6">
            Join us in creating lasting impact for children and families across Sierra Leone.
          </p>
          <a
            href="#donate"
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all shadow-strong hover:shadow-glow font-semibold"
          >
            <span>Support Our Work</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
