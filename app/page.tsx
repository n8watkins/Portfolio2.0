'use client'
import Experience from '@/components/Experience'
import { FloatingNav } from '@/components/FloatingNav'
import Footer from '@/components/Footer'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import { TechStack } from '@/components/TechStack'
import MapAnimation from '@/components/ui/BentoComponents/MapAnimations'
import { navItems } from '@/data'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="relative w-full bg-blue-400 dark:bg-darkBlue flex  overflow-hidden  ">
      <div className="w-full   m-auto">
        <Hero />
        <div className=" m-auto max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          <FloatingNav navItems={navItems} />
          <Grid />
          <Projects />
          <Experience />
          <Footer />
        </div>
      </div>
    </main>
  )
}
