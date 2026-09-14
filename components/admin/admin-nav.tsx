"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="shell flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="eyebrow text-ink-faint">DBC Admin</span>
          <nav className="flex items-center gap-6">
            {LINKS.map((link) => {
              const active = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href)
              return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14px] ${
                  active ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
              )
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] text-ink-faint">{email}</span>
          <button type="button" onClick={handleSignOut} className="btn border border-line text-ink hover:bg-mist">
            Sign out
          </button>
        </div>
      </div>
    </header>
  )
}
