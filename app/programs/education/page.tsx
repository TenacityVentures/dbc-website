"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Programs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-balance">Education & Learning Support</h1>
            <p className="text-xl text-white/90 max-w-3xl text-pretty leading-relaxed">
              Ensuring every child has access to quality education and the resources they need to succeed in school and
              beyond.
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
              <h2 className="text-4xl font-extrabold text-primary mb-6">Breaking Barriers to Education</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Education is a fundamental right, yet many vulnerable children in Bo District face significant barriers
                to accessing quality learning opportunities. Our education program addresses these challenges through
                comprehensive support.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We provide school materials, uniforms, and learning resources to ensure children can attend school with
                dignity and participate fully in their education. Our holistic approach creates an environment where
                every child can thrive academically.
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
                src="/kids.jpg"
                alt="Children learning in classroom"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold text-primary mb-4">What We Provide</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive support to ensure no child is left behind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "School Materials",
                description:
                  "Books, notebooks, pens, pencils, and other essential learning materials for academic success",
                icon: BookOpen,
              },
              {
                title: "School Uniforms",
                description: "Proper school attire to ensure children can attend school with dignity and confidence",
                icon: Users,
              },
              {
                title: "Learning Resources",
                description:
                  "Additional educational resources including bags, calculators, and other tools for effective learning",
                icon: Award,
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
                <h2 className="text-4xl font-extrabold mb-6">Our Impact in Education</h2>
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  Since our inception, we have supported dozens of vulnerable children to access quality education. Our
                  comprehensive approach ensures children not only attend school but thrive in their learning journey.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-extrabold text-secondary mb-2">40+</div>
                    <div className="text-sm text-white/80">Children Supported Annually</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <div className="text-4xl font-extrabold text-secondary mb-2">5</div>
                    <div className="text-sm text-white/80">Communities Reached</div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/kids.jpg"
                  alt="Children receiving school materials"
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
            <h2 className="text-4xl font-extrabold text-primary mb-6">Help Us Empower More Children</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Your support can help provide education materials and resources to vulnerable children in Sierra Leone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#donate">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-xl"
                >
                  Support Education
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
