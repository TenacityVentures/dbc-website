"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Shield, Heart, Users } from "lucide-react"

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Providing materials and mentorship to ensure success in school for vulnerable children.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Child Protection",
    description: "Working with communities to prevent abuse and promote family-based care.",
    color: "red",
  },
  {
    icon: Heart,
    title: "Health",
    description: "Supporting psychosocial well-being and nutrition for healthy child development.",
    color: "green",
  },
  {
    icon: Users,
    title: "Empowerment",
    description: "Skills training and livelihoods for families to reach economic self-reliance.",
    color: "yellow",
  },
]

const colorClasses = {
  blue: "bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-secondary",
  red: "bg-red-50 text-red-600 group-hover:bg-primary group-hover:text-secondary",
  green: "bg-green-50 text-green-600 group-hover:bg-primary group-hover:text-secondary",
  yellow: "bg-yellow-50 text-yellow-600 group-hover:bg-primary group-hover:text-secondary",
}

export function FocusAreas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="focus" className="py-24 bg-slate-100" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-extrabold text-primary mb-4">How We Help</h2>
          <p className="text-slate-600 font-medium">Focused strategies for long-term community transformation.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-secondary group cursor-pointer"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${colorClasses[area.color as keyof typeof colorClasses]}`}
              >
                <area.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{area.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
