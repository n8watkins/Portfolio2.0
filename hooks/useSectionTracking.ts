import { useEffect } from 'react'
import { trackSectionView } from '@/lib/analytics'

/**
 * Hook to track section views using Intersection Observer
 */
export const useSectionTracking = () => {
  useEffect(() => {
    const observedSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const sectionId = entry.target.id

            // Only track each section once per page load
            if (!observedSections.has(sectionId)) {
              observedSections.add(sectionId)
              trackSectionView(sectionId)
            }
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-10% 0px -10% 0px', // Add some margin for better UX
      }
    )

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section[id], div[id]')
    sections.forEach((section) => {
      if (section.id && section.id !== 'main-content') {
        observer.observe(section)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])
}