"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Plus, X } from "lucide-react"
import { NAV } from "@/lib/site"

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-xl transition-colors duration-300 ${scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="shell flex h-[var(--header-h)] items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-ink"
          aria-label="Dream Big for Children — home"
        >
          <img
            src="/brand/logo.png"
            alt=""
            className="h-8 w-8 object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            aria-hidden
          />
          <span className="text-[17px] font-normal tracking-[-0.02em] text-ink">Dream Big</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onFocus={() => setOpenMenu(item.label)}
            >
              <Link
                href={item.href}
                className="block px-3.5 py-7 text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </Link>

              <AnimatePresence>
                {item.children && openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-full min-w-[214px] rounded-xl border border-line bg-white p-2 shadow-[0_16px_40px_-20px_rgba(20,24,27,0.35)]"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpenMenu(null)}
                        className="block rounded-lg px-3.5 py-2.5 text-[15px] text-ink-soft transition-colors hover:bg-mist hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <Link href="/#get-involved" className="btn btn-gold btn-give ml-3 px-5 py-2.5 text-[14px]">
            <span className="brand-mark h-[0.95rem] shrink-0" aria-hidden />
            Give
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="text-ink lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <div className="shell flex max-h-[calc(100vh-var(--header-h)-8px)] flex-col overflow-y-auto py-4">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-line last:border-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 py-3.5 text-[16px] font-medium text-ink"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        onClick={() => setMobileSection(mobileSection === item.label ? null : item.label)}
                        className="p-3 text-ink-faint"
                        aria-label={`Toggle ${item.label} submenu`}
                        aria-expanded={mobileSection === item.label}
                      >
                        <Plus
                          className={`h-4 w-4 transition-transform duration-300 ${mobileSection === item.label ? "rotate-45" : ""
                            }`}
                        />
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {item.children && mobileSection === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col pb-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-2.5 text-[15px] text-ink-soft"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/#get-involved"
                onClick={() => setMobileOpen(false)}
                className="btn btn-gold mt-5 w-full"
              >
                Give
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
