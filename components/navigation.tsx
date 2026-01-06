"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const navLinks = [
    { href: isHomePage ? "#about" : "/#about", label: "Who We Are" },
    { href: isHomePage ? "#focus" : "/#focus", label: "Focus Areas" },
    { href: isHomePage ? "#gallery" : "/#gallery", label: "Our Work" },
    { href: isHomePage ? "#contact" : "/#contact", label: "Contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-secondary font-bold text-xl shadow-lg">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl leading-none text-primary tracking-tight">
                DBC <span className="text-blue-600">Sierra Leone</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
                Empowering Young Lives
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="hover:text-primary transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild className="bg-secondary text-primary hover:bg-secondary/90 rounded-full shadow-md">
              <a href={isHomePage ? "#donate" : "/#donate"}>Donate</a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-primary text-2xl">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b shadow-xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4 font-bold">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={isHomePage ? "#donate" : "/#donate"}
                onClick={() => setMobileMenuOpen(false)}
                className="bg-secondary text-primary text-center py-3 rounded-xl hover:bg-secondary/90 transition-colors"
              >
                Donate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
