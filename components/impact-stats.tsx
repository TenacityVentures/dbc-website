"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "40+", label: "Children Annually" },
  { value: "5", label: "Communities" },
  { value: "300+", label: "Indirect Impact" },
  { value: "2022", label: "Year Established" },
]

export function ImpactStats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impact" className="py-24 bg-primary text-white relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-6xl font-extrabold text-secondary mb-4 tracking-tighter">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
