"use client"

import Link from "next/link"
import { Reveal } from "@/components/reveal"

export function StoryCta() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      {/* Oversized mark, barely there, tying the closing section to the brand */}
      <span
        aria-hidden
        className="brand-mark pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 text-ink opacity-[0.04] lg:h-[680px] lg:w-[680px]"
      />

      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-[46ch] text-center">
            <h2 className="display-xl text-ink text-balance">You can be part of the story.</h2>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/#get-involved" className="btn btn-dark">
                Get involved
              </Link>
              <Link href="/gallery" className="btn border border-line text-ink hover:bg-mist">
                See our work
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
