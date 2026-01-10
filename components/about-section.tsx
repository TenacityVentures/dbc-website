"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Target, Check, Sparkles } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="section-padding-lg bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden" ref={ref}>
      {/* Subtle background decoration */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto container-padding relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-label text-primary">About Our Organization</span>
          </div>
          <h2 className="text-headline text-primary mb-6">Who We Are</h2>
          <p className="text-subtitle">
            A community-driven organization committed to transforming the lives of Sierra Leone's most vulnerable children.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Content - asymmetrical layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-8"
          >
            {/* Main story */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 shadow-soft border border-slate-100"
            >
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                <span className="text-2xl font-bold text-secondary">Dream Big for Children Organization (DBC)</span> is a
                community-based, non-profit organization established in 2022 in Sierra Leone, dedicated to creating lasting
                change in the lives of vulnerable children and families.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Guided by our Constitution and aligned with internationally accepted best practices in child care and
                development, we are committed to protecting the most vulnerable children and empowering families to become
                self-reliant. We believe that children thrive best when families are strengthened and communities are
                supported to care for them.
              </p>
            </motion.div>

            {/* Vision and Mission cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4">
                  <Eye className="text-secondary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Our Vision</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  A Sierra Leone where every child has the opportunity to thrive, learn, and reach their full potential.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                  <Target className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Our Mission</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  To improve the lives of deprived and vulnerable children and families through education support, child
                  protection, economic empowerment, and sustainable community development.
                </p>
              </motion.div>
            </div>

            {/* Core Values */}
            <motion.div
              variants={itemVariants}
              className="gradient-primary rounded-3xl p-8 shadow-strong text-white"
            >
              <h3 className="text-xl font-bold mb-6 text-secondary">Our Core Values</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Child-centred Care",
                  "Accountability & Transparency",
                  "Community Participation",
                  "Equity & Inclusion",
                  "Sustainability",
                ].map((value) => (
                  <div key={value} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-6 h-6 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="text-secondary w-4 h-4" />
                    </div>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Images Grid - asymmetrical */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative">
              <img
                src="/kids.jpg"
                className="rounded-3xl shadow-strong w-full h-80 object-cover border-4 border-white"
                alt="Children learning and growing together"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-medium">
                <div className="text-3xl font-bold text-primary">2022</div>
                <div className="text-xs text-slate-600 font-medium">Established</div>
              </div>
            </div>

            <img
              src="/img1.jpg"
              className="rounded-3xl shadow-strong w-full h-64 object-cover border-4 border-white"
              alt="Community empowerment programs"
              loading="lazy"
            />

            {/* Stats card */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
              <h4 className="text-sm font-bold text-primary mb-4 uppercase tracking-wider">Making a Difference</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Communities Reached</span>
                  <span className="text-xl font-bold text-accent">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Children Impacted</span>
                  <span className="text-xl font-bold text-accent">10,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Programs</span>
                  <span className="text-xl font-bold text-accent">4</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
