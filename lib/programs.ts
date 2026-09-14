/** Keys resolved to lucide components inside the client component. */
export type IconName =
  | "activity"
  | "award"
  | "bookOpen"
  | "heart"
  | "home"
  | "lightbulb"
  | "pill"
  | "shield"
  | "stethoscope"
  | "target"
  | "users"

export type Program = {
  slug: string
  eyebrow: string
  title: string
  lede: string
  heroImage: string
  heroCaption: string
  overviewTitle: string
  overview: string[]
  overviewImage: string
  offerTitle: string
  offerSubtitle: string
  offers: { title: string; description: string; icon: IconName }[]
  impactTitle: string
  impact: string
  impactImage: string
  impactCaption: string
  stats: { value: string; label: string }[]
  ctaTitle: string
  ctaBody: string
}

export const PROGRAMS: Record<string, Program> = {
  education: {
    slug: "education",
    eyebrow: "What We Do",
    title: "Education & Learning Support",
    lede: "Ensuring every child has access to quality education and the resources they need to succeed in school and beyond.",
    heroImage: "/kidsinUniformSelfie.jpg",
    heroCaption: "Pupils supported with school materials — Bo District",
    overviewTitle: "Breaking Barriers to Education",
    overview: [
      "Education is a fundamental right, yet many vulnerable children in Bo District face significant barriers to accessing quality learning opportunities. Our education programme addresses these challenges through comprehensive support.",
      "We provide school materials, uniforms, and learning resources so children can attend school with dignity and participate fully in their education. Our holistic approach creates an environment where every child can thrive academically.",
    ],
    overviewImage: "/kids.jpg",
    offerTitle: "What We Provide",
    offerSubtitle: "Comprehensive support to ensure no child is left behind",
    offers: [
      {
        title: "School Materials",
        description:
          "Books, notebooks, pens, pencils, and other essential learning materials for academic success.",
        icon: "bookOpen",
      },
      {
        title: "School Uniforms",
        description: "Proper school attire so children can attend school with dignity and confidence.",
        icon: "users",
      },
      {
        title: "Learning Resources",
        description:
          "Additional educational resources including bags, calculators, and other tools for effective learning.",
        icon: "award",
      },
    ],
    impactTitle: "Our Impact in Education",
    impact:
      "Since our inception we have supported dozens of vulnerable children to access quality education. Our comprehensive approach ensures children not only attend school but thrive in their learning journey.",
    impactImage: "/img3.jpg",
    impactCaption: "School materials distribution — Bo District",
    stats: [
      { value: "40+", label: "Children supported annually" },
      { value: "5", label: "Communities reached" },
    ],
    ctaTitle: "Help Us Empower More Children",
    ctaBody:
      "Your support can help provide education materials and resources to vulnerable children in Sierra Leone.",
  },

  protection: {
    slug: "protection",
    eyebrow: "What We Do",
    title: "Child Protection & Safety",
    lede: "Creating safe, nurturing environments where children are protected from harm and can develop with dignity and security.",
    heroImage: "/smile.jpg",
    heroCaption: "Children playing safely — Bo District",
    overviewTitle: "Safeguarding Children's Rights",
    overview: [
      "Every child deserves to grow up in a safe, protective environment free from abuse, neglect, and exploitation. Our child protection programme works to ensure children's rights are upheld and their well-being is prioritised.",
      "We collaborate with families, communities, and local authorities to create comprehensive protection systems that identify risks early and provide appropriate interventions to keep children safe.",
    ],
    overviewImage: "/smile.jpg",
    offerTitle: "Our Protection Approach",
    offerSubtitle: "Multi-faceted strategies to ensure comprehensive child safety",
    offers: [
      {
        title: "Prevention Programmes",
        description:
          "Community education and awareness campaigns to prevent child abuse, neglect, and exploitation before they occur.",
        icon: "shield",
      },
      {
        title: "Support Services",
        description:
          "Counselling, psychosocial support, and care for children who have experienced trauma or abuse.",
        icon: "heart",
      },
      {
        title: "Family Strengthening",
        description:
          "Working with families to build protective, nurturing home environments through parenting support and resources.",
        icon: "home",
      },
    ],
    impactTitle: "Creating Safer Communities",
    impact:
      "Through our child protection initiatives we are building awareness and creating systems that keep children safe. We work closely with community leaders, parents, and local authorities to strengthen protective environments.",
    impactImage: "/community-discussion2.jpg",
    impactCaption: "Community protection dialogue — Bo District",
    stats: [{ value: "5", label: "Communities with active protection programmes" }],
    ctaTitle: "Join Us in Protecting Children",
    ctaBody: "Your support helps us create safer environments for vulnerable children in Sierra Leone.",
  },

  health: {
    slug: "health",
    eyebrow: "What We Do",
    title: "Health & Well-being",
    lede: "Ensuring children have access to essential healthcare and nutrition services for healthy growth and development.",
    heroImage: "/eating.jpg",
    heroCaption: "Nutrition support — Bo District",
    overviewTitle: "Building Healthier Futures",
    overview: [
      "Good health is fundamental to a child's ability to learn, grow, and reach their full potential. Our health programme ensures vulnerable children have access to essential healthcare services and proper nutrition.",
      "We address both immediate health needs and long-term wellness through preventive care, health education, and access to medical services that many families cannot afford.",
    ],
    overviewImage: "/eating.jpg",
    offerTitle: "Health Services We Provide",
    offerSubtitle: "Comprehensive healthcare support for vulnerable children",
    offers: [
      {
        title: "Medical Care",
        description:
          "Access to basic healthcare services including check-ups, treatment for common illnesses, and emergency care.",
        icon: "stethoscope",
      },
      {
        title: "Nutrition Support",
        description:
          "Ensuring children receive adequate nutrition through food assistance and nutrition education programmes.",
        icon: "activity",
      },
      {
        title: "Preventive Care",
        description: "Immunisations, health screenings, and education on hygiene and disease prevention.",
        icon: "pill",
      },
    ],
    impactTitle: "Healthier Children, Stronger Communities",
    impact:
      "By ensuring children have access to healthcare and proper nutrition we help them grow into healthy, productive members of their communities. Healthy children attend school regularly and participate fully in life.",
    impactImage: "/plant.jpg",
    impactCaption: "Nutrition and hygiene follow-up — Bo District",
    stats: [{ value: "40+", label: "Children receiving health support" }],
    ctaTitle: "Support Children's Health",
    ctaBody: "Your contribution helps provide essential healthcare and nutrition to vulnerable children.",
  },

  empowerment: {
    slug: "empowerment",
    eyebrow: "What We Do",
    title: "Economic Empowerment",
    lede: "Breaking the cycle of poverty through economic opportunities and skills development for families and youth.",
    heroImage: "/outdoor-community-engagement.jpg",
    heroCaption: "Livelihood training — Bo District",
    overviewTitle: "Building Financial Resilience",
    overview: [
      "Economic stability is crucial for families to provide for their children's needs. Our empowerment programme equips parents and guardians with the skills and resources they need to generate sustainable income.",
      "We also work with youth to develop vocational skills and entrepreneurial abilities, preparing them for successful futures and breaking cycles of poverty in their communities.",
    ],
    overviewImage: "/outdoor-community-engagement.jpg",
    offerTitle: "Our Empowerment Initiatives",
    offerSubtitle: "Creating pathways to economic independence and prosperity",
    offers: [
      {
        title: "Skills Training",
        description:
          "Vocational training teaching marketable skills like tailoring, carpentry, agriculture, and small business management.",
        icon: "lightbulb",
      },
      {
        title: "Youth Development",
        description:
          "Preparing young people for employment through mentorship, career guidance, and practical skills development.",
        icon: "users",
      },
      {
        title: "Business Support",
        description:
          "Helping families start and grow small businesses through training, resources, and ongoing mentorship.",
        icon: "target",
      },
    ],
    impactTitle: "Creating Lasting Change",
    impact:
      "By empowering families economically we create lasting positive change for children. When parents can provide for their families, children stay in school, have better nutrition, and grow up with hope for their future.",
    impactImage: "/plant.jpg",
    impactCaption: "Agricultural livelihoods training — Bo District",
    stats: [{ value: "5", label: "Communities with empowerment programmes" }],
    ctaTitle: "Empower Families, Transform Lives",
    ctaBody: "Support economic empowerment programmes that create lasting change for vulnerable families.",
  },
}
