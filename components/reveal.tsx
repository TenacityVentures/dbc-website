"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Section heading. In two-column sections it sticks to the top of the viewport
 * while the adjacent content scrolls past it.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  sticky = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string
  title: string
  intro?: string
  sticky?: boolean
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div className={`${sticky ? "sticky-col" : ""} ${className}`}>
      <Reveal>
        <div className={align === "center" ? "mx-auto max-w-[52ch] text-center" : ""}>
          {eyebrow && <p className="accent mb-2 text-ink-faint">{eyebrow}</p>}
          <h2 className="display-lg text-ink text-balance">{title}</h2>
          {intro && <p className="lede mt-4 max-w-[44ch] text-pretty">{intro}</p>}
        </div>
      </Reveal>
    </div>
  )
}
