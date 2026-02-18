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
    { href: isHomePage ? "#about" : "/#about", label: "Who We Are", isAnchor: true },
    { href: isHomePage ? "#focus" : "/#focus", label: "Focus Areas", isAnchor: true },
    { href: "/gallery", label: "Gallery", isAnchor: false },
    { href: "/blog", label: "Blog", isAnchor: false },
    { href: "/founder", label: "Our Founder", isAnchor: false },
    { href: isHomePage ? "#contact" : "/#contact", label: "Contact", isAnchor: true },
  ]

  function isActive(href: string) {
    if (href.startsWith("#") || href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

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
            <img
              src="/logoIcon.jpg"
              alt="DBC Logo"
              className="w-12 h-12 object-contain rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-xl leading-none text-primary tracking-tight">
                DREAM BIG
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
                For every child
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          {navLinks.map((link, index) =>
            link.isAnchor ? (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </motion.a>
            ) : (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className={`whitespace-nowrap transition-colors ${
                    isActive(link.href) ? "text-primary border-b-2 border-secondary pb-0.5" : "hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            )
          )}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
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
            <div className="p-6 flex flex-col gap-1 font-bold">
              {navLinks.map((link) =>
                link.isAnchor ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
                    className="hover:text-primary transition-colors text-slate-600 py-2.5 px-3 rounded-xl hover:bg-slate-50"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2.5 px-3 rounded-xl transition-colors ${
                      isActive(link.href)
                        ? "text-primary bg-secondary/10"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <a
                href={isHomePage ? "#donate" : "/#donate"}
                onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
                className="bg-secondary text-primary text-center py-3 rounded-xl hover:bg-secondary/90 transition-colors mt-2"
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
