'use client'
import React from 'react'
import Hero from '@/components/sections/Hero'
import Grid from '@/components/sections/Grid'
import { FloatingNav } from '@/components/layout/FloatingNav'
import { navItems } from '@/data/navigation'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { useScrollTracking } from '@/hooks/useScrollTracking'
import dynamic from 'next/dynamic'

// Only lazy load truly below-the-fold components
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Clients = dynamic(() => import('@/components/sections/Clients'))
const Footer = dynamic(() => import('@/components/layout/Footer'))
const ScrollToTop = dynamic(() => import('@/components/ui/ScrollToTop'), { ssr: false })

export default function Home() {
  // Track section views as user scrolls
  useSectionTracking()

  // Track scroll depth milestones
  useScrollTracking()

  return (
    <main id="main-content" className="relative w-full bg-blue-400 dark:bg-darkBlue flex overflow-hidden">
      <div className="w-full m-auto">
        <Hero />
        <FloatingNav navItems={navItems} />
        <div className="m-auto max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <section id="about" aria-label="About me">
            <Grid />
          </section>
          <section id="experience" aria-label="Work experience">
            <Experience />
          </section>
          <section id="testimonials" aria-label="Client testimonials">
            <Clients />
          </section>
          <section id="contact">
            <Footer />
          </section>
        </div>
        <ScrollToTop />
      </div>
    </main>
  )
}
