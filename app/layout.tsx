import type React from "react"
import type { Metadata } from "next"
import { Instrument_Sans, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { IntroReveal } from "@/components/intro-reveal"
import "./globals.css"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

// Used sparingly, for italic accents only.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dream Big for Children (DBC) | Empowering Young Lives in Sierra Leone",
  description:
    "We support vulnerable children within their families and communities so they can grow in safe, caring, and supportive environments. Operating in 5 communities in Bo District, Sierra Leone.",
  keywords: [
    "Dream Big for Children",
    "DBC Sierra Leone",
    "child protection",
    "education Sierra Leone",
    "vulnerable children",
    "Bo District",
    "community development",
    "child welfare",
    "non-profit Sierra Leone",
  ],
  authors: [{ name: "Dream Big for Children (DBC)" }],
  creator: "Dream Big for Children (DBC)",
  publisher: "Dream Big for Children (DBC)",
  metadataBase: new URL("https://dreambigforchildren.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreambigforchildren.org",
    title: "Dream Big for Children (DBC) | Empowering Young Lives in Sierra Leone",
    description:
      "Supporting vulnerable children in Sierra Leone through education, child protection, health, and economic empowerment programs.",
    siteName: "Dream Big for Children (DBC)",
    images: [
      {
        url: "/brand/og.jpg",
        width: 1200,
        height: 630,
        alt: "Dream Big for Children — protecting, educating, and empowering vulnerable children in Sierra Leone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Big for Children (DBC) | Empowering Young Lives in Sierra Leone",
    description:
      "Supporting vulnerable children in Sierra Leone through education, child protection, health, and economic empowerment programs.",
    images: ["/brand/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/icon-180.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        {/* The overlay is dismissed by script, so hide it when there is none. */}
        <noscript>
          <style>{`.intro-overlay{display:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} antialiased`}>
        <IntroReveal />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
