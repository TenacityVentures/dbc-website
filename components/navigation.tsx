"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: isHomePage ? "#about" : "/#about", label: "About" },
    { href: isHomePage ? "#focus" : "/#focus", label: "Programs" },
    { href: isHomePage ? "#gallery" : "/#gallery", label: "Gallery" },
    { href: isHomePage ? "#contact" : "/#contact", label: "Contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-medium border-b border-slate-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto container-padding h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <img
                src="/logoIcon.jpg"
                alt="DBC Logo"
                className="w-12 h-12 object-contain rounded-xl shadow-soft"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-primary tracking-tight">
                DREAM BIG
              </span>
              <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold mt-0.5">
                For every child
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary transition-all rounded-lg hover:bg-slate-50"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              asChild
              className="gradient-secondary text-white hover:shadow-glow rounded-xl font-semibold shadow-soft ml-2"
            >
              <a href={isHomePage ? "#donate" : "/#donate"}>Partner With Us</a>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-primary hover:bg-slate-50 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden bg-white/95 backdrop-blur-md border-b shadow-strong overflow-hidden"
          >
            <div className="container-padding py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    setTimeout(() => setMobileMenuOpen(false), 100)
                  }}
                  className="px-4 py-3 font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 transition-all rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={isHomePage ? "#donate" : "/#donate"}
                onClick={(e) => {
                  setTimeout(() => setMobileMenuOpen(false), 100)
                }}
                className="gradient-secondary text-white text-center py-3 px-4 rounded-xl font-semibold shadow-medium mt-2"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
