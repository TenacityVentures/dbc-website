"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Shield, Heart, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

const focusAreas = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "We support most vulnerable children with school materials, follow-up, and encouragement to ensure they stay in school and succeed.",
    color: "blue",
    link: "/programs/education",
  },
  {
    icon: Shield,
    title: "Child Protection",
    description:
      "We work with families and communities to protect children, prevent abuse, and promote family-based care.",
    color: "red",
    link: "/programs/protection",
  },
  {
    icon: Heart,
    title: "Health & Well-being",
    description:
      "We promote child nutrition, psychosocial well-being, and healthy development through community support.",
    color: "green",
    link: "/programs/health",
  },
  {
    icon: Users,
    title: "Empowerment & Collaboration",
    description:
      "We empower the most vulnerable families through skills training and livelihoods support and collaborate with partners to create sustainable impact.",
    color: "yellow",
    link: "/programs/empowerment",
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
            <Link key={area.title} href={area.link}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-transparent hover:border-secondary group cursor-pointer h-full"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${colorClasses[area.color as keyof typeof colorClasses]}`}
                >
                  <area.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {area.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{area.description}</p>
                <div className="flex items-center gap-2 text-primary group-hover:text-secondary transition-colors font-semibold text-sm mt-4">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
