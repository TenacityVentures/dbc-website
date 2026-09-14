import Link from "next/link"
import { CONTACT } from "@/lib/site"

const LINKS = [
  { label: "What we do", href: "/#what-we-do" },
  { label: "Who we are", href: "/#about" },
  { label: "Impact", href: "/#impact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Stories", href: "/stories" },
  { label: "Get involved", href: "/#get-involved" },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line bg-white">
      <div className="shell py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-[34ch]">
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <span className="brand-mark h-8 w-8" aria-hidden />
              <span className="text-[17px] font-normal tracking-[-0.02em] text-ink">Dream Big</span>
            </Link>
            <p className="body-copy mt-5 text-[15px]">
              A community-based non-profit protecting and educating vulnerable children in Bo District, Sierra Leone.
              Established 2022.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 sm:gap-x-16" aria-label="Footer">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <address className="not-italic">
            <p className="text-[15px] leading-relaxed text-ink-soft">
              {CONTACT.address}
              <br />
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-ink">
                {CONTACT.phone}
              </a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-ink">
                {CONTACT.email}
              </a>
            </p>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              Facebook
            </a>
          </address>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-ink-faint">
            &copy; {new Date().getFullYear()} Dream Big for Children. All rights reserved.
          </p>
          <p className="text-[13px] text-ink-faint">Registered non-profit — Sierra Leone</p>
        </div>
      </div>
    </footer>
  )
}
