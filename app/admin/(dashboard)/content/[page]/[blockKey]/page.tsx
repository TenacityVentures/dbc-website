import { notFound } from "next/navigation"
import { findBlockDef } from "@/lib/content"
import { getBlockContent } from "@/lib/content-data"
import { ContentEditor } from "@/components/admin/content-editor"

export default async function AdminContentBlockPage({
  params,
}: {
  params: Promise<{ page: string; blockKey: string }>
}) {
  const { page, blockKey } = await params
  const def = findBlockDef(page, blockKey)
  if (!def) notFound()

  const data = await getBlockContent(page, blockKey)

  return <ContentEditor def={def} initialData={data} />
}
