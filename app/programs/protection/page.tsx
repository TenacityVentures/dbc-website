import type { Metadata } from "next"
import { ProgramPage, type ProgramPageContent } from "@/components/program-page"
import { getBlockContent } from "@/lib/content-data"

export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBlockContent("program-protection", "content")
  return {
    title: `${content.title} | Dream Big for Children`,
    description: content.lede,
  }
}

export default async function Page() {
  const content = await getBlockContent("program-protection", "content")
  return <ProgramPage program={content as ProgramPageContent} />
}
