import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import Head from "next/head"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>MetaSnap - Gerador de Thumbnails Profissionais</title>
        <meta
          name="description"
          content="Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais. Ferramenta gratuita e fácil de usar."
        />
        <meta name="keywords" content="thumbnail, meta tags, open graph, twitter cards, seo, screenshot, preview, social media " />
        <meta name="author" content="Dirrocha MetaSnap Team" />
        <meta name="google-site-verification" content="Yqy1hbdtgtqSuT5iFxBatWM0qzkTSa6NYWZvCN_SAj4" />

        <meta property="og:title" content="MetaSnap - Gerador de Thumbnails Profissionais" />
        <meta
          property="og:description"
          content="Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais. Ferramenta gratuita e fácil de usar."
        />
        <meta property="og:image" content="https://metasnap.dirrocha.com/screenshot?url=https%3A%2F%2Fweb-metasnap.dirrocha.com%2F" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Preview do Dirrocha MetaSnap" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https%3A%2F%2Fweb-metasnap.dirrocha.com%2F" />
        <meta property="og:site_name" content="Dirrocha MetaSnap" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MetaSnap - Gerador de Thumbnails Profissionais" />
        <meta
          name="twitter:description"
          content="Gere thumbnails profissionais de qualquer site para suas meta tags e redes sociais. Ferramenta gratuita e fácil de usar."
        />
        <meta name="twitter:image" content="https://metasnap.dirrocha.com/screenshot?url=https%3A%2F%2Fweb-metasnap.dirrocha.com%2F" />
        <meta name="twitter:site" content="@MetaSnap" />

        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K8SYT52DKW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K8SYT52DKW');
          `}
        </Script>
      </Head>  
      <body className={inter.className}>{children}</body>
    </html>
  )
}
