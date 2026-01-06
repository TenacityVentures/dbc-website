"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonateSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="donate" className="py-24 px-6 bg-white" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto grid lg:grid-cols-2 bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl"
      >
        <div className="p-12 lg:p-20 bg-primary text-white">
          <h2 className="text-4xl font-extrabold mb-8">Partner With Us</h2>
          <p className="text-slate-300 mb-10 text-lg leading-relaxed">
            Together, we can create lasting change. We seek partnerships that support family strengthening, education,
            and economic empowerment.
          </p>
          <div className="space-y-4 font-bold text-sm">
            {["Organizations & Institutions", "Individual Benefactors", "Skills Training Partners"].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2 className="text-secondary w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-12 lg:p-20 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-primary mb-6">Support a Future</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Your contribution—big or small—helps a child stay in school and a family become stronger. Online donation
            options are coming soon.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-secondary text-primary hover:bg-secondary/90 py-6 rounded-2xl font-bold text-lg shadow-xl"
          >
            <a href="mailto:mohamedskillz32@gmail.com" className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Send a Partnership Inquiry
            </a>
          </Button>
          <p className="text-center mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" />
            Contact us at +232 76 762965
          </p>
        </div>
      </motion.div>
    </section>
  )
}
