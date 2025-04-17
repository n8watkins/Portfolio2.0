import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './provider'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nathan Watkins Portfolio',
  description: 'Modern web design and full-stack development by Nathan Watkins.',
  keywords: ['Web Developer', 'Portfolio', 'Next.js', 'React', 'Nathan Watkins'],
  robots: 'index, follow',
  openGraph: {
    title: 'Nathan Watkins Portfolio',
    description: 'Modern web design and full-stack development by Nathan Watkins.',
    url: 'https://nathansportfolio.vercel.app',
    siteName: 'Nathan Watkins Portfolio',
    images: [
      {
        url: 'https://nathansportfolio.vercel.app/preview.png', // make this image
        width: 1200,
        height: 630,
        alt: 'Nathan Watkins Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nathan Watkins Portfolio',
    description: 'Nathan Watkins Next.js Portfolio Page.',
    images: ['https://nathansportfolio.vercel.app/preview.png'],
    creator: '@n8watkins', // your twitter handle
  },
  icons: {
    icon: '/headerLogo.png',
  },
  metadataBase: new URL('https://nathansportfolio.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="UaCoLg9YeNobXjRaOb59YzQxzc8RDb1yiOZEKdmNECU" />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
