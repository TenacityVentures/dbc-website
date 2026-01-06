import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sans",
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
        url: "/happy-african-children-smiling-sierra-leone-educat.jpg",
        width: 1200,
        height: 630,
        alt: "Dream Big for Children - Empowering young lives in Sierra Leone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Big for Children (DBC) | Empowering Young Lives in Sierra Leone",
    description:
      "Supporting vulnerable children in Sierra Leone through education, child protection, health, and economic empowerment programs.",
    images: ["/happy-african-children-smiling-sierra-leone-educat.jpg"],
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
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
      </head>
      <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
