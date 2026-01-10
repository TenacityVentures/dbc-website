"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Camera } from "lucide-react"

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
      src: "/kids.jpg",
      alt: "Happy children",
      caption: "Empowered Children",
      subcaption: "Creating lasting impact",
      size: "medium",
    },
  ]

  return (
    <section id="gallery" className="section-padding bg-gradient-to-b from-white to-slate-50 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-4 py-2 mb-6">
            <Camera className="w-4 h-4 text-accent" />
            <span className="text-label text-accent">Our Impact Gallery</span>
          </div>
          <h2 className="text-headline text-primary mb-6">Stories from the Field</h2>
          <p className="text-subtitle">
            Witness the transformation happening across communities in Bo, Sierra Leone.
          </p>
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
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`${sizeClasses[image.size as keyof typeof sizeClasses]} relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-pointer`}
              >
                {/* Image container with overlay */}
                <div className="w-full h-full relative">
                  <img
                    src={image.src || "/placeholder.svg"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={image.alt}
                  />

                  {/* Gradient overlay - always visible but subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Border accent */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/50 rounded-2xl md:rounded-3xl transition-colors duration-500" />
                </div>

                {/* Caption - improved visibility */}
                {image.caption && (
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-strong opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="font-bold text-primary text-sm md:text-base">{image.caption}</p>
                        {image.subcaption && (
                          <p className="text-xs md:text-sm text-slate-600 mt-1">{image.subcaption}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 pt-8 border-t border-slate-200"
        >
          <p className="text-slate-600 text-sm">
            Every image tells a story of hope, transformation, and lasting community impact.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
