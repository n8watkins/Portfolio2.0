'use client'

import { useReportWebVitals } from 'next/web-vitals'
import { reportWebVitals } from '@/lib/performance'

export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric as any)

    // Dispatch custom event for HUD component
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('web-vital', {
          detail: {
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            id: metric.id,
          },
        })
      )
    }
  })

  return null
}