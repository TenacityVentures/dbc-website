"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Site content" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/stories", label: "Stories" },
]

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
    router.refresh()
  }

  function isActive(href: string) {
    return href === "/admin" ? pathname === href : pathname.startsWith(href)
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="eyebrow text-ink-faint">DBC Admin</span>
          <nav className="hidden items-center gap-6 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] ${
                  isActive(link.href) ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <span className="text-[13px] text-ink-faint">{email}</span>
          <button type="button" onClick={handleSignOut} className="btn border border-line text-ink hover:bg-mist">
            Sign out
          </button>
        </div>

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

      {mobileOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <div className="shell flex flex-col py-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`border-b border-line py-3 text-[15px] last:border-0 ${
                  isActive(link.href) ? "font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <span className="truncate text-[13px] text-ink-faint">{email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn shrink-0 border border-line text-ink hover:bg-mist"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
