import { PROGRAMS } from "@/lib/programs"

/** Current hardcoded copy, used as the fallback when a block has no row in `site_content` yet. */
export const CONTENT_DEFAULTS: Record<string, Record<string, any>> = {
  home: {
    hero: {
      eyebrow: "Our mission",
      headline: "To protect, educate, and empower Sierra Leone’s children.",
      ctaPrimaryLabel: "Give today",
      ctaPrimaryHref: "/#get-involved",
      ctaSecondaryLabel: "Our work",
      ctaSecondaryHref: "/#what-we-do",
      slides: [
        { src: "/communityhappyhandsup.jpg", credit: "Community outreach — Bo District" },
        { src: "/schooldevotion.jpg", credit: "Morning devotion — Bo District" },
        { src: "/kidswithballon.jpg", credit: "After-school play — Simbaru" },
        { src: "/community-discussion3.jpg", credit: "Family dialogue — Bo District" },
      ],
    },
    quote: {
      eyebrow: "A word from our founder",
      quote: "No child in Bo District should have to choose between school and survival. That's why we exist.",
      name: "Mohamed Gbenga",
      title: "Founder & Executive Director",
      image: "/img2.jpg",
      imageCaption: "Bo District, Sierra Leone",
    },
    about: {
      eyebrow: "Who we are",
      title: "Mission & vision.",
      intro:
        "A community-based non-profit established in Sierra Leone in 2022 — legally constituted, non-political, non-sectarian.",
      body: "Children thrive best when their families are strengthened and their communities are supported to care for them. Guided by our constitution and by internationally accepted best practice in child care, we protect the most vulnerable children and help families become self-reliant.",
      visionTitle: "Our vision",
      vision: "A Sierra Leone where every child has the opportunity to thrive, learn, and reach their full potential.",
      missionTitle: "Our mission",
      mission:
        "To improve the lives of deprived and vulnerable children through education, protection, empowerment, and community development.",
    },
    impact: {
      title: "Numbers and stories.",
      stats: [
        { value: "300", suffix: "+", label: "Community members reached" },
        { value: "40", suffix: "+", label: "Children supported each year" },
        { value: "5", suffix: "", label: "Communities in Bo District" },
        { value: "2022", suffix: "", label: "Founded in Sierra Leone" },
      ],
      storyEyebrow: "Story",
      storyTitle: "Simbaru",
      storyBody:
        "When school fees and materials were out of reach, families had to choose which child would keep learning. Today every supported child in Simbaru is enrolled and followed up through the school year.",
      storyImage: "/community2.jpg",
    },
    "where-we-work": {
      title: "Five communities in Bo District.",
      items: [
        { src: "/team.jpg", caption: "School materials distribution", place: "Simbaru" },
        { src: "/community.jpg", caption: "Community development meeting", place: "Bagbo" },
        { src: "/outside-school.jpg", caption: "Outdoor learning session", place: "Tikonko" },
      ],
    },
    "ways-to-give": {
      title: "Ways to give.",
      intro: "Your contribution keeps a child in school and helps a family become stronger.",
      partners: [
        {
          title: "Organisations & institutions",
          body: "Fund a school year, a protection programme, or a livelihood cohort in one of our five communities.",
        },
        {
          title: "Individual benefactors",
          body: "Support a child through the school year with materials, follow-up, and encouragement to keep learning.",
        },
        {
          title: "Skills training partners",
          body: "Bring vocational training to parents and youth so families can earn and care for their children.",
        },
      ],
    },
    "what-we-do": {
      eyebrow: "What we do",
      title: "Sustainable transformation.",
      intro: "We work alongside families, schools, and community leaders across Bo District, Sierra Leone.",
      pillars: [
        {
          label: "Education",
          href: "/programs/education",
          body: "School materials, uniforms, and follow-up so children stay enrolled and keep learning.",
        },
        {
          label: "Child protection",
          href: "/programs/protection",
          body: "Prevention, counselling, and family strengthening that keep children safe from harm.",
        },
        {
          label: "Health & well-being",
          href: "/programs/health",
          body: "Nutrition, basic healthcare, and hygiene education for healthy growth.",
        },
        {
          label: "Empowerment",
          href: "/programs/empowerment",
          body: "Skills training and livelihoods so parents can provide for their families.",
        },
      ],
    },
    "story-cta": {
      title: "You can be part of the story.",
      primaryLabel: "Get involved",
      primaryHref: "/#get-involved",
      secondaryLabel: "See our work",
      secondaryHref: "/gallery",
    },
  },
}

// Programme pages reuse lib/programs.ts as their defaults, so there's one
// source of truth instead of the copy being retyped here.
for (const program of Object.values(PROGRAMS)) {
  CONTENT_DEFAULTS[`program-${program.slug}`] = {
    content: {
      eyebrow: program.eyebrow,
      title: program.title,
      lede: program.lede,
      heroImage: program.heroImage,
      heroCaption: program.heroCaption,
      overviewTitle: program.overviewTitle,
      overview: program.overview.map((text) => ({ text })),
      overviewImage: program.overviewImage,
      offerTitle: program.offerTitle,
      offerSubtitle: program.offerSubtitle,
      offers: program.offers,
      impactTitle: program.impactTitle,
      impact: program.impact,
      impactImage: program.impactImage,
      stats: program.stats,
      ctaTitle: program.ctaTitle,
      ctaBody: program.ctaBody,
    },
  }
}
