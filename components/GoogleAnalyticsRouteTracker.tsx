'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

/**
 * Fires a GA4 `page_view` on client-side route changes. Next's App Router does
 * NOT re-run the gtag `config` snippet on soft navigations, so without this a
 * visitor moving from `/` to `/projects/echo` is never counted as a second
 * page view. The initial/hard load is already counted by the gtag('config')
 * call in app/layout.tsx, so we skip the first render here.
 *
 * IMPORTANT: turn OFF GA4 Enhanced Measurement → "Page changes based on browser
 * history events" in the data stream, otherwise SPA navigations get counted
 * twice (once by this, once by Enhanced Measurement).
 */
export default function GoogleAnalyticsRouteTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isInitialLoad = useRef(true)

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false
      return
    }
    if (typeof window === 'undefined' || !window.gtag || !process.env.NEXT_PUBLIC_GA_ID) return

    const query = searchParams?.toString()
    const path = query ? `${pathname}?${query}` : pathname
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [pathname, searchParams])

  return null
}
