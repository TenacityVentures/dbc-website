import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Star, Users, Award, Quote, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Our Founder | Dream Big for Children",
  description:
    "Meet the visionary behind Dream Big for Children — the person who turned a dream into a movement that transforms children's lives across Sierra Leone.",
}

const milestones = [
  {
    year: "2020",
    title: "The Vision Begins",
    description:
      "Witnessing firsthand the struggles of vulnerable children in Bo District, the seed for a community-driven solution was planted.",
  },
  {
    year: "2022",
    title: "DBC is Founded",
    description:
      "Dream Big for Children Organization was formally established — legally constituted, non-political, and laser-focused on child wellbeing.",
  },
  {
    year: "2023",
    title: "First 5 Communities",
    description:
      "DBC expanded its reach to 5 communities in Bo District, launching education support, child protection, and health programs simultaneously.",
  },
  {
    year: "2024",
    title: "40+ Children Supported",
    description:
      "The annual school materials distribution program reached over 40 children, with health and nutrition programs running in parallel.",
  },
  {
    year: "2025",
    title: "Growing the Movement",
    description:
      "New partnerships formed with international supporters, deepening DBC's capacity to protect and empower children and their families.",
  },
  {
    year: "2026",
    title: "Expanding Impact",
    description:
      "With a clear vision for growth, DBC continues to expand its programs and reach more of Sierra Leone's most vulnerable children.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Deep Compassion",
    description: "A genuine love for children and a belief that every single life has immeasurable value.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Rooted in the belief that lasting change comes from within — led by community, for community.",
  },
  {
    icon: Star,
    title: "Visionary Leadership",
    description: "The courage to dream beyond circumstances and inspire others to do the same.",
  },
  {
    icon: Award,
    title: "Accountability",
    description: "A commitment to transparency, integrity, and responsible stewardship of every resource entrusted to DBC.",
  },
]

export default function FounderPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* ── Hero ── */}
      <section className="pt-40 pb-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                top: `${(i * 13) % 100}%`,
                left: `${(i * 31) % 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-secondary w-5 h-5" />
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em]">Meet the Founder</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-3xl">
            The Heart Behind<br />
            <span className="text-secondary">Dream Big for Children</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
            Every great movement begins with one person who refuses to accept the world as it is — and dares
            to build the world as it should be.
          </p>
        </div>
      </section>

      {/* ── Founder Profile ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Photo column */}
            <div className="space-y-6">
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-200">
                  <img
                    src="/placeholder-user.jpg"
                    alt="DBC Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative accent */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-3xl -z-10" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-3xl -z-10" />

                {/* Quote badge */}
                <div className="absolute bottom-8 left-8 right-8 bg-primary/90 backdrop-blur-sm p-5 rounded-2xl">
                  <Quote className="text-secondary w-6 h-6 mb-2" />
                  <p className="text-white text-sm font-medium leading-relaxed italic">
                    "Every child in Sierra Leone deserves the chance to dream — and the support to make those dreams real."
                  </p>
                </div>
              </div>

              {/* Name card */}
              <div className="bg-muted rounded-3xl p-6">
                <h2 className="text-2xl font-extrabold text-primary">
                  {/* Client to update with actual founder name */}
                  Mohamed [Full Name]
                </h2>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest mt-1">
                  Founder & Executive Director
                </p>
                <p className="text-slate-500 text-sm mt-3">
                  Dream Big for Children Organization (DBC)<br />
                  Bo District, Sierra Leone
                </p>
              </div>
            </div>

            {/* Bio column */}
            <div className="space-y-8 pt-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">His Story</h3>
                <h2 className="text-4xl font-extrabold text-primary mb-6 leading-tight">
                  A Dream Born from <span className="text-secondary">Witness</span>
                </h2>
                <div className="space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    Growing up in Sierra Leone, the founder of Dream Big for Children witnessed what many chose to look away from:
                    children robbed of childhood, families without the tools to protect them, and communities carrying burdens
                    too heavy to bear alone.
                  </p>
                  <p>
                    Rather than becoming numb to it, he was moved by it. He began asking hard questions — not
                    just about what was wrong, but about what could be done. The answer became DBC.
                  </p>
                  <p>
                    Established in 2022 in Bo District, Dream Big for Children was built on a simple but radical idea:
                    <span className="font-bold text-primary"> every child thrives when every family is supported, and every community is engaged.</span>
                  </p>
                  <p>
                    Today, DBC operates across 5 communities, running integrated programs in education, child
                    protection, health & nutrition, and economic empowerment. The work is hard. The need is great.
                    But the commitment is unwavering.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200" />

              {/* Mission statement */}
              <div className="bg-primary rounded-3xl p-8">
                <h4 className="text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-3">His Mission</h4>
                <p className="text-white text-lg leading-relaxed font-medium">
                  "To improve the lives of deprived and vulnerable children and families through education support,
                  child protection, economic empowerment, and sustainable community development — one community
                  at a time."
                </p>
              </div>

              {/* Values */}
              <div className="grid sm:grid-cols-2 gap-4">
                {values.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="bg-muted rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-secondary" />
                      <h4 className="font-bold text-primary text-sm">{title}</h4>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-secondary text-xs font-bold uppercase tracking-[0.2em] block mb-3">The Journey</span>
            <h2 className="text-4xl font-extrabold text-primary">Key Milestones</h2>
          </div>

          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex gap-8 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-white shadow-md -translate-x-1/2 mt-1.5" />

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <span className="text-secondary font-extrabold text-2xl">{milestone.year}</span>
                      <h3 className="font-bold text-primary mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Join the Movement</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            The founder's dream is only possible with the support of people who believe in it.
            Partner with us to transform more children's lives across Sierra Leone.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/#donate"
              className="bg-secondary text-primary px-8 py-3 rounded-full font-bold hover:bg-secondary/90 transition-colors"
            >
              Donate Now
            </a>
            <Link
              href="/blog"
              className="bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Read Our Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
