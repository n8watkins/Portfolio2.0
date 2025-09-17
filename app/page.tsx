'use client'
import React from 'react'
import Hero from '@/components/Hero'
import { navItems } from '@/data'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { useScrollTracking } from '@/hooks/useScrollTracking'
import dynamic from 'next/dynamic'

// Lazy load navigation and below-the-fold components
const FloatingNav = dynamic(() => import('@/components/FloatingNav').then(mod => ({ default: mod.FloatingNav })), { ssr: false })
const Grid = dynamic(() => import('@/components/Grid'), { ssr: false })
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false })
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false })
const Clients = dynamic(() => import('@/components/Clients'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
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
          <section id="projects" aria-label="My projects">
            <Projects />
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
