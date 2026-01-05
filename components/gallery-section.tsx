"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="gallery" className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-4xl font-extrabold text-primary mb-4">Our Work in the Field</h2>
            <p className="text-slate-600">Real impact across 5 communities in Bo, Sierra Leone.</p>
          </div>
          <div className="text-primary font-bold flex items-center gap-2 border-b-2 border-secondary pb-2 uppercase text-xs tracking-widest">
            Witness the Change
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-2 row-span-2 relative overflow-hidden rounded-[2.5rem] shadow-lg group"
          >
            <img
              src="/african-children-receiving-school-materials-books-.jpg"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="School Materials Distribution"
            />
            <div className="absolute bottom-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
              <p className="font-bold text-lg">School Materials Distribution</p>
              <p className="text-sm opacity-80">Empowering 40+ children annually</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-[2.5rem] shadow-lg"
          >
            <img
              src="/african-children-learning-reading-books-classroom-.jpg"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              alt="Education Program"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative overflow-hidden rounded-[2.5rem] shadow-lg"
          >
            <img
              src="/happy-african-children-playing-smiling-sierra-leon.jpg"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              alt="Community Support"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-2 relative overflow-hidden rounded-[2.5rem] shadow-lg group"
          >
            <img
              src="/community-meeting-village-sierra-leone-families-to.jpg"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Community Development"
            />
            <div className="absolute bottom-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
              <p className="font-bold text-lg">Community Development Meetings</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
