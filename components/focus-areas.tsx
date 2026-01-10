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
      "Supporting vulnerable children with school materials, follow-up, and encouragement to ensure they stay in school and succeed.",
    gradient: "from-secondary/10 to-secondary/5",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    link: "/programs/education",
  },
  {
    icon: Shield,
    title: "Child Protection",
    description:
      "Working with families and communities to protect children, prevent abuse, and promote family-based care.",
    gradient: "from-accent/10 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    link: "/programs/protection",
  },
  {
    icon: Heart,
    title: "Health & Well-being",
    description:
      "Promoting child nutrition, psychosocial well-being, and healthy development through community support.",
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    link: "/programs/health",
  },
  {
    icon: Users,
    title: "Empowerment & Collaboration",
    description:
      "Empowering vulnerable families through skills training and livelihoods support in partnership with communities.",
    gradient: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    link: "/programs/empowerment",
  },
]

export function FocusAreas() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="focus" className="section-padding bg-gradient-to-b from-slate-50 to-white" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-label text-secondary">Our Focus Areas</span>
          </div>
          <h2 className="text-headline text-primary mb-6">Creating Lasting Impact</h2>
          <p className="text-subtitle">
            Comprehensive strategies designed for sustainable community transformation and child empowerment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <Link key={area.title} href={area.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className={`
                  relative bg-white p-8 rounded-3xl shadow-soft hover:shadow-strong
                  transition-all duration-300 h-full flex flex-col
                  border border-slate-100 hover:border-secondary/20
                  overflow-hidden
                `}>
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`
                      w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                      ${area.iconBg} group-hover:scale-110 transition-transform duration-300
                    `}>
                      <area.icon className={`w-8 h-8 ${area.iconColor}`} />
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                      {area.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                      {area.description}
                    </p>

                    <div className="flex items-center gap-2 text-secondary font-semibold text-sm">
                      <span>Explore Program</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 pt-12 border-t border-slate-200"
        >
          <p className="text-slate-600 mb-6">
            Each program is designed to create sustainable change and empower communities for generations to come.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-medium hover:shadow-strong font-semibold"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
