'use client'
import Clients from '@/components/Clients'
import Experience from '@/components/Experience'
import { FloatingNav } from '@/components/FloatingNav'
import Footer from '@/components/Footer'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import BreakpointDisplay from '@/lib/breakpoint'
import { navItems } from '@/data'

export default function Home() {
  return (
    <main className="relative w-full bg-blue-400 dark:bg-darkBlue flex  overflow-hidden  ">
      <div className="w-full   m-auto">
        <Hero />
        <FloatingNav navItems={navItems} />
        <div className=" m-auto max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <Grid />
          <Projects />
          <Experience />
          <Clients />
          <Footer />
          <BreakpointDisplay />
        </div>
      </div>
    </main>
  )
}
