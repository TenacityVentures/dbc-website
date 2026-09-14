"use client"

import { motion } from "framer-motion"
import { CONTENT_DEFAULTS } from "@/lib/content-defaults"

type QuoteBandProps = {
  eyebrow?: string
  quote?: string
  name?: string
  title?: string
  image?: string
  imageCaption?: string
}

const DEFAULTS = CONTENT_DEFAULTS.home.quote

export function QuoteBand({
  eyebrow = DEFAULTS.eyebrow,
  quote = DEFAULTS.quote,
  name = DEFAULTS.name,
  title = DEFAULTS.title,
  image = DEFAULTS.image,
  imageCaption = DEFAULTS.imageCaption,
}: QuoteBandProps) {
  return (
    <section className="bg-ink text-white">
      <div className="grid lg:grid-cols-2">
        {/* Quote */}
        <div className="flex items-center px-6 py-20 sm:px-10 lg:justify-end lg:py-28 lg:pr-16">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[500px]"
          >
            <p className="eyebrow text-white/45">{eyebrow}</p>
            <blockquote className="mt-7 text-[clamp(1.6rem,1.15rem+1.8vw,2.4rem)] font-normal leading-[1.22] tracking-[-0.028em] text-white text-balance">
              {quote}
            </blockquote>
            <footer className="mt-8 flex items-center gap-3">
              <span className="h-px w-8 bg-white/25" aria-hidden />
              <span className="text-[14px] text-white/60">
                {name}, {title}
              </span>
            </footer>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative min-h-[440px] lg:min-h-[640px]"
        >
          <img
            src={image}
            alt="A child in Bo District being cared for through the programme"
            className="absolute inset-0 h-full w-full object-cover object-[58%_28%] object-top"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute top-5 right-5 font-[family-name:var(--font-accent)] text-[13px] italic text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
            {imageCaption}
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
