export type NavChild = { label: string; href: string }
export type NavItem = { label: string; href: string; children?: NavChild[] }

export const NAV: NavItem[] = [
  {
    label: "What We Do",
    href: "/#what-we-do",
    children: [
      { label: "Education", href: "/programs/education" },
      { label: "Child Protection", href: "/programs/protection" },
      { label: "Health & Well-being", href: "/programs/health" },
      { label: "Empowerment", href: "/programs/empowerment" },
    ],
  },
  {
    label: "Where We Work",
    href: "/#where-we-work",
    children: [
      { label: "Bo District", href: "/#where-we-work" },
      { label: "Our Communities", href: "/#where-we-work" },
    ],
  },
  {
    label: "Impact",
    href: "/#impact",
    children: [
      { label: "Numbers", href: "/#impact" },
      { label: "Stories", href: "/stories" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "About",
    href: "/#about",
    children: [
      { label: "Mission & Vision", href: "/#about" },
      { label: "Our Story", href: "/#about" },
      { label: "Values & Beliefs", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    label: "Get Involved",
    href: "/#get-involved",
    children: [
      { label: "Ways to Give", href: "/#get-involved" },
      { label: "Partner With Us", href: "/#get-involved" },
      { label: "Volunteer", href: "/#contact" },
    ],
  },
]

export const CONTACT = {
  address: "Simbaru-2, Hanci Road, Bo, Sierra Leone",
  phone: "+232 76 762965",
  phoneHref: "tel:+23276762965",
  email: "dreambigforchildren@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61560313693954",
  mailto:
    "https://mail.google.com/mail/?view=cm&fs=1&to=dreambigforchildren@gmail.com&su=Partnership%20Inquiry",
}

export const FOOTER_COLUMNS: { heading: string; links: NavChild[] }[] = [
  {
    heading: "What We Do",
    links: [
      { label: "Education", href: "/programs/education" },
      { label: "Child Protection", href: "/programs/protection" },
      { label: "Health & Well-being", href: "/programs/health" },
      { label: "Empowerment", href: "/programs/empowerment" },
    ],
  },
  {
    heading: "Impact",
    links: [
      { label: "Numbers", href: "/#impact" },
      { label: "Stories", href: "/stories" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Mission & Vision", href: "/#about" },
      { label: "Our Story", href: "/#about" },
      { label: "Values & Beliefs", href: "/#about" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Ways to Give", href: "/#get-involved" },
      { label: "Partner With Us", href: "/#get-involved" },
      { label: "Volunteer", href: "/#contact" },
    ],
  },
]
