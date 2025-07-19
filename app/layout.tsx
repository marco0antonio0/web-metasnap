import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MetaSnap - Gerador de Thumbnails Profissionais",
  description:
    "Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais. Ferramenta gratuita e fácil de usar.",
  keywords: "thumbnail, meta tags, open graph, twitter cards, seo, screenshot, preview, social media",
  authors: [{ name: "MetaSnap Team" }],
  creator: "MetaSnap",
  publisher: "MetaSnap",
  metadataBase: new URL("https://web-metasnap.dirrocha.com"),

  // Open Graph
  openGraph: {
    title: "MetaSnap - Gerador de Thumbnails Profissionais",
    description:
      "Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais de forma gratuita e instantânea.",
    url: "https://web-metasnap.dirrocha.com",
    siteName: "MetaSnap",
    images: [
      {
        url: "https://metasnap.dirrocha.com/screenshot?url=web-metasnap.dirrocha.com",
        width: 1200,
        height: 630,
        alt: "MetaSnap - Gerador de Thumbnails Profissionais",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "MetaSnap - Gerador de Thumbnails Profissionais",
    description:
      "Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais de forma gratuita.",
    images: ["https://metasnap.dirrocha.com/screenshot?url=web-metasnap.dirrocha.com"],
    creator: "@metasnap",
  },

  // Additional meta tags
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

  // Verification and other
  verification: {
    google: "your-google-verification-code",
  },

  // Canonical
  alternates: {
    canonical: "https://web-metasnap.dirrocha.com",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
