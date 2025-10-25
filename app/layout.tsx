import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './provider'
import Script from 'next/script'
import ErrorBoundary from '@/components/ErrorBoundary'
import { WebVitals } from './web-vitals'
import { WebVitalsHUD } from '@/components/WebVitalsHUD'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600', '700'],
  fallback: ['system-ui', 'arial']
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nathansportfolio.vercel.app'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Nathan Watkins Portfolio'

export const metadata: Metadata = {
  title: siteName,
  description: 'Modern web design and full-stack development by Nathan Watkins.',
  keywords: ['Web Developer', 'Portfolio', 'Next.js', 'React', 'Nathan Watkins'],
  robots: 'index, follow',
  openGraph: {
    title: siteName,
    description: 'Modern web design and full-stack development by Nathan Watkins.',
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: `${siteUrl}/tab/preview.png`,
        width: 1200,
        height: 630,
        alt: 'Nathan Watkins Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: 'Nathan Watkins Next.js Portfolio Page.',
    images: [`${siteUrl}/tab/preview.png`],
    creator: '@n8watkins',
  },
  icons: {
    icon: '/tab/headerLogo.png',
  },
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="UaCoLg9YeNobXjRaOb59YzQxzc8RDb1yiOZEKdmNECU" />

        {/* Preconnect and DNS prefetching for external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Project external links */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//web.app" />
        <link rel="dns-prefetch" href="//vercel.app" />
        <link rel="dns-prefetch" href="//firebase.google.com" />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] bg-purple-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <WebVitals />
          <WebVitalsHUD />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
