import Link from "next/link"
import { CONTENT_BLOCKS } from "@/lib/content"

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="display-md text-ink">Site content</h1>
      <p className="body-copy mt-2 text-ink-soft">Edit the text and images shown across the site.</p>

      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-white">
        {CONTENT_BLOCKS.map((block) => (
          <Link
            key={`${block.page}-${block.blockKey}`}
            href={`/admin/content/${block.page}/${block.blockKey}`}
            className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-5 py-4 hover:bg-mist"
          >
            <span className="text-[15px] font-medium text-ink">{block.label}</span>
            <span className="shrink-0 text-[12px] uppercase tracking-wide text-ink-faint">{block.page}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
