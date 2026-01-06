"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const galleryImages = [
    {
      src: "/team.jpg",
      alt: "School Materials Distribution",
      caption: "School Materials Distribution",
      subcaption: "Empowering 40+ children annually",
      size: "large",
    },
    {
      src: "/img2.jpg",
      alt: "Education Program",
      caption: "Classroom Learning",
      size: "small",
    },
    {
      src: "/img3.jpg",
      alt: "Community Support",
      caption: "Child Protection Activities",
      size: "small",
    },
    {
      src: "/community.jpg",
      alt: "Community Development",
      caption: "Community Development Meetings",
      subcaption: "Building stronger families",
      size: "medium",
    },
    {
      src: "/kids.jpg",
      alt: "Students in class",
      caption: "Quality Education",
      size: "small",
    },
    {
      src: "/img1.jpg",
      alt: "Children playing",
      caption: "Health & Recreation",
      size: "small",
    },
    {
      src: "/happy-african-children-smiling-sierra-leone-educat.jpg",
      alt: "Happy children",
      caption: "Empowered Children",
      subcaption: "Creating lasting impact",
      size: "medium",
    },
  ]

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryImages.map((image, index) => {
            const sizeClasses = {
              large: "col-span-2 row-span-2 h-[400px] md:h-[600px]",
              medium: "col-span-2 h-[200px] md:h-[280px]",
              small: "col-span-1 h-[200px] md:h-[280px]",
            }

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${sizeClasses[image.size as keyof typeof sizeClasses]} relative overflow-hidden rounded-3xl md:rounded-[2.5rem] shadow-lg group cursor-pointer`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={image.alt}
                />
                {image.caption && (
                  <div className="absolute bottom-0 p-4 md:p-8 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="font-bold text-sm md:text-lg">{image.caption}</p>
                    {image.subcaption && <p className="text-xs md:text-sm opacity-80 mt-1">{image.subcaption}</p>}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
