"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Activity, Pill, Stethoscope } from "lucide-react"
import Link from "next/link"

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Programs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-balance">Health & Wellness</h1>
            <p className="text-xl text-white/90 max-w-3xl text-pretty leading-relaxed">
              Ensuring children have access to essential healthcare and nutrition services for healthy growth and
              development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-extrabold text-primary mb-6">Building Healthier Futures</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Good health is fundamental to a child's ability to learn, grow, and reach their full potential. Our
                health program ensures vulnerable children have access to essential healthcare services and proper
                nutrition.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We work to address both immediate health needs and long-term wellness through preventive care, health
                education, and access to medical services that many families cannot afford.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="/eating.jpg"
                alt="Healthy children playing"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-primary mb-4">Health Services We Provide</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare support for vulnerable children
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Medical Care",
                description:
                  "Access to basic healthcare services including check-ups, treatment for common illnesses, and emergency care",
                icon: Stethoscope,
              },
              {
                title: "Nutrition Support",
                description:
                  "Ensuring children receive adequate nutrition through food assistance and nutrition education programs",
                icon: Activity,
              },
              {
                title: "Preventive Care",
                description: "Immunizations, health screenings, and education on hygiene and disease prevention",
                icon: Pill,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary to-primary/90 rounded-[3rem] p-12 md:p-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-extrabold mb-6">Healthier Children, Stronger Communities</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  By ensuring children have access to healthcare and proper nutrition, we're helping them grow into
                  healthy, productive members of their communities. Healthy children can attend school regularly and
                  participate fully in life.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-extrabold text-secondary mb-2">40+</div>
                  <div className="text-sm text-white/80">Children Receiving Health Support</div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/community.jpg"
                  alt="Healthy happy children"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-extrabold text-primary mb-6">Support Children's Health</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Your contribution helps provide essential healthcare and nutrition to vulnerable children.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#donate">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-xl"
                >
                  Support Health Programs
                </Button>
              </Link>
              <Link href="/#focus">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-xl bg-transparent"
                >
                  View All Programs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
