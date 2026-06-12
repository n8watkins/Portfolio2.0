'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data/grid'
import { useTheme } from 'next-themes'
import { fadeInUpVariants, staggerContainerVariants, defaultAnimationConfig } from '@/lib/animations'

const Grid = () => {
  const { theme } = useTheme()
  return (
    <section className="mb-10">
      {/* About intro — prose above the bento grid */}
      <motion.div
        variants={fadeInUpVariants}
        {...defaultAnimationConfig}
        className="max-w-2xl mx-auto text-center px-4 pt-16 pb-12 select-none">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
          About me
        </p>
        <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
          I&apos;m Nathan — an AI-focused full-stack developer in Los Angeles. After years of
          shipping web apps for small businesses, I&apos;m now all-in on what generative AI
          unlocks: smarter products, faster builds, and tools that feel like magic. When
          I&apos;m not consulting through Appturnity, I&apos;m building in public at
          n8builds.dev.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        {...defaultAnimationConfig}
      >
        <BentoGrid className=" ">
          {gridItems.map((item, i) => (
            <BentoGridItem key={item.id} {...item} />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  )
}

export default Grid
