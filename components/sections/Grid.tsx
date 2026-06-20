'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data/grid'
import { fadeInUpVariants, staggerContainerVariants, defaultAnimationConfig } from '@/lib/animations'

const Grid = () => {
  return (
    <section className="mb-10">
      {/* About intro — prose above the bento grid */}
      <motion.div
        variants={fadeInUpVariants}
        {...defaultAnimationConfig}
        className="max-w-3xl mx-auto text-center px-4 pt-28 md:pt-36 pb-14 select-none">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
          Get to know me
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 select-none">
          About me
        </h2>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
          I&apos;m Nathan — an AI-focused full-stack developer based in Los Angeles. After years
          of shipping production web apps for small businesses, I&apos;m all-in on what generative
          AI unlocks: streaming interfaces, agents that use tools, retrieval over vector search,
          and the engineering that makes intelligent products actually feel good to use. I work
          across the whole stack — React and TypeScript up front, Node and Python on the back, and
          whichever model API fits the problem.
        </p>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mt-5">
          When I&apos;m not consulting through{' '}
          <a
            href="https://appturnity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-sky-500 dark:text-sky-400 underline decoration-sky-400/40 underline-offset-4 hover:text-sky-300 hover:decoration-sky-300 transition-colors duration-200">
            Appturnity
          </a>
          , I&apos;m building in public at{' '}
          <a
            href="https://n8builds.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-colors duration-200">
            n8builds.dev
          </a>{' '}
          — shipping small, sharp projects and sometimes streaming the process live on{' '}
          <a
            href="https://twitch.tv/n8builds"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-purple-500 dark:text-purple-400 underline decoration-purple-400/40 underline-offset-4 hover:text-purple-300 hover:decoration-purple-300 transition-colors duration-200">
            Twitch
          </a>
          .
        </p>
      </motion.div>

      <motion.div variants={staggerContainerVariants} {...defaultAnimationConfig}>
        <BentoGrid className=" ">
          {gridItems.map((item) => (
            <BentoGridItem key={item.id} {...item} />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  )
}

export default Grid
