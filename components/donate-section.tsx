"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, Mail, Phone, Heart, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonateSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="donate" className="section-padding-lg bg-gradient-to-b from-slate-50 to-white relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-accent" />
            <span className="text-label text-accent">Partnership Opportunities</span>
          </div>
          <h2 className="text-headline text-primary mb-6">Join Us in Creating Impact</h2>
          <p className="text-subtitle">
            Together, we can create lasting change for children and families across Sierra Leone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          {/* Left side - Partnership info */}
          <div className="gradient-primary rounded-3xl p-8 lg:p-12 text-white shadow-strong relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6">
                <Handshake className="w-8 h-8 text-secondary" />
              </div>

              <h3 className="text-title text-white mb-6">Partnership Opportunities</h3>
              <p className="text-white/80 mb-10 leading-relaxed">
                We seek partnerships that support family strengthening, education, and economic empowerment in our communities.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Organizations & Institutions", desc: "Corporate partnerships and foundations" },
                  { title: "Individual Benefactors", desc: "Personal contributions and sponsorships" },
                  { title: "Skills Training Partners", desc: "Vocational training and capacity building" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-white/70 mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Contact CTA */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-strong border border-slate-100 flex flex-col justify-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-accent" />
            </div>

            <h3 className="text-title text-primary mb-4">Support Our Mission</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your contribution—big or small—helps a child stay in school and a family become stronger. Every partnership makes a lasting difference.
            </p>

            <div className="space-y-4">
              <Button
                asChild
                size="lg"
                className="w-full gradient-secondary text-white hover:shadow-glow py-6 rounded-xl font-semibold text-base shadow-medium"
              >
                <a href="mailto:mohamedskillz32@gmail.com" className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send Partnership Inquiry
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-6 rounded-xl font-semibold text-base"
              >
                <a href="tel:+23276762965" className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Us: +232 76 762965
                </a>
              </Button>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 text-center">
                <span className="font-semibold text-primary">Online donation options</span> are coming soon. For now, please reach out directly to discuss partnership opportunities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
