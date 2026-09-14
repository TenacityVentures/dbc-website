import Link from "next/link"

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="display-md text-ink">Dashboard</h1>
      <p className="body-copy mt-2 text-ink-soft">Manage the site's content from here.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link
          href="/admin/gallery"
          className="rounded-2xl border border-line bg-white p-6 transition hover:border-ink/30"
        >
          <h2 className="text-[17px] font-medium text-ink">Gallery</h2>
          <p className="body-copy mt-1.5 text-ink-soft">Upload new photos — they appear first in their section.</p>
        </Link>
      </div>
    </div>
  )
}
