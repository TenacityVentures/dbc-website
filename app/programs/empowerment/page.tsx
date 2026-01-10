"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Lightbulb, Target } from "lucide-react"
import Link from "next/link"

export default function EmpowermentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Programs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-balance">Economic Empowerment</h1>
            <p className="text-xl text-white/90 max-w-3xl text-pretty leading-relaxed">
              Breaking the cycle of poverty through economic opportunities and skills development for families and
              youth.
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
              <h2 className="text-4xl font-extrabold text-primary mb-6">Building Financial Resilience</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Economic stability is crucial for families to provide for their children's needs. Our empowerment
                program equips parents and guardians with the skills and resources they need to generate sustainable
                income.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We also work with youth to develop vocational skills and entrepreneurial abilities, preparing them for
                successful futures and breaking cycles of poverty in their communities.
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
                src="/outdoor-community-engagement.jpg"
                alt="Economic empowerment training"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-primary mb-4">Our Empowerment Initiatives</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Creating pathways to economic independence and prosperity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Skills Training",
                description:
                  "Vocational training programs teaching marketable skills like tailoring, carpentry, agriculture, and small business management",
                icon: Lightbulb,
              },
              {
                title: "Youth Development",
                description:
                  "Preparing young people for employment through mentorship, career guidance, and practical skills development",
                icon: Users,
              },
              {
                title: "Business Support",
                description:
                  "Helping families start and grow small businesses through training, resources, and ongoing mentorship",
                icon: Target,
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
                <h2 className="text-4xl font-extrabold mb-6">Creating Lasting Change</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  By empowering families economically, we create lasting positive change for children. When parents can
                  provide for their families, children stay in school, have better nutrition, and grow up with hope for
                  their future.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-4xl font-extrabold text-secondary mb-2">5</div>
                  <div className="text-sm text-white/80">Communities with Empowerment Programs</div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/team.jpg"
                  alt="Empowered families and children"
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
            <h2 className="text-4xl font-extrabold text-primary mb-6">Empower Families, Transform Lives</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Support economic empowerment programs that create lasting change for vulnerable families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#donate">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-xl"
                >
                  Support Empowerment
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
