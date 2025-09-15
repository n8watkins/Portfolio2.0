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

export default function Home() {
  return (
    <main id="main-content" className="relative w-full bg-blue-400 dark:bg-darkBlue flex overflow-hidden">
      <div className="w-full m-auto">
        <Hero />
        <FloatingNav navItems={navItems} />
        <div className="m-auto max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <section aria-label="About me">
            <Grid />
          </section>
          <section aria-label="My projects">
            <Projects />
          </section>
          <section aria-label="Work experience">
            <Experience />
          </section>
          <section aria-label="Client testimonials">
            <Clients />
          </section>
          <Footer />
          {/* <BreakpointDisplay /> */}
        </div>
        <ScrollToTop />
      </div>
    </main>
  )
}
