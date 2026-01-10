"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Eye, Target, Check } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <motion.h3
              variants={itemVariants}
              className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 text-center lg:text-left"
            >
              About the Organization
            </motion.h3>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-extrabold text-primary mb-8 text-center lg:text-left"
            >
              Who We Are
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 mb-8 leading-relaxed italic border-l-4 border-secondary pl-6"
            >
              "Dream Big for Children Organization (DBC) is a community-based, non-profit organization established in
              2022 in Sierra Leone."
            </motion.p>
            <motion.p variants={itemVariants} className="text-slate-600 mb-10 leading-relaxed">
              Guided by our Constitution and aligned with internationally accepted best practices in child care and
              development, we are committed to protecting the most vulnerable children and empowering families to become
              self-reliant. We believe that children thrive best when families are strengthened and communities are
              supported to care for them.
            </motion.p>

            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <Eye className="text-secondary w-5 h-5" /> Our Vision
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  A Sierra Leone where every child has the opportunity to thrive, learn, and reach their full potential.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                  <Target className="text-blue-600 w-5 h-5" /> Our Mission
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  To improve the lives of deprived and vulnerable children and families through education support, child
                  protection, economic empowerment, and sustainable community development.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 grid grid-cols-2 gap-4"
          >
            <img
              src="/community2.jpg"
              className="rounded-3xl shadow-xl mt-12 h-64 w-full object-cover"
              alt="Focus"
              loading="lazy"
            />
            <img
              src="/img1.jpg"
              className="rounded-3xl shadow-xl h-64 w-full object-cover"
              alt="Education"
              loading="lazy"
            />
            <div className="col-span-2 bg-primary p-8 rounded-3xl text-white shadow-2xl">
              <h4 className="font-bold mb-4 text-secondary tracking-widest uppercase text-xs">Our Core Values</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                {[
                  "Child-centred Care",
                  "Accountability & Transparency",
                  "Community Participation",
                  "Equity & Inclusion",
                  "Sustainability",
                ].map((value) => (
                  <li key={value} className="flex items-center gap-2">
                    <Check className="text-secondary w-4 h-4" /> {value}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
