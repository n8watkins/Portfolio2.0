'use client'
import Clients from '@/components/Clients'
import Experience from '@/components/Experience'
import { FloatingNav } from '@/components/FloatingNav'
import Footer from '@/components/Footer'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import ScrollToTop from '@/components/ui/ScrollToTop'
import BreakpointDisplay from '@/lib/breakpoint'
import { navItems } from '@/data'
import { useSectionTracking } from '@/hooks/useSectionTracking'
import { useScrollTracking } from '@/hooks/useScrollTracking'

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
