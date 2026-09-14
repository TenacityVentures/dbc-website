import type { Metadata } from "next"
import { ProgramPage } from "@/components/program-page"
import { PROGRAMS } from "@/lib/programs"

const program = PROGRAMS.health

export const metadata: Metadata = {
  title: `${program.title} | Dream Big for Children`,
  description: program.lede,
}

export default function Page() {
  return <ProgramPage program={program} />
}
