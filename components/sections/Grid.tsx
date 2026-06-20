'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data/grid'
import { useTheme } from 'next-themes'
import { fadeInUpVariants, staggerContainerVariants, defaultAnimationConfig } from '@/lib/animations'

const introSnapshots = [
  {
    src: '/hero/portrait-watercolor.jpg',
    alt: 'Watercolor portrait of Nathan',
    caption: 'me 👋',
    rotate: '-rotate-3',
    href: null,
  },
  {
    src: '/bento/laptop.jpeg',
    alt: 'The laptop where it all started',
    caption: 'where it started',
    rotate: 'rotate-2',
    href: null,
  },
  {
    src: '/brand/appturnity-site.webp',
    alt: 'The Appturnity website',
    caption: 'appturnity.com',
    rotate: '-rotate-2',
    href: 'https://appturnity.com',
  },
]

const Grid = () => {
  const { theme } = useTheme()
  return (
    <section className="mb-10">
      {/* About intro — prose above the bento grid */}
      <motion.div
        variants={fadeInUpVariants}
        {...defaultAnimationConfig}
        className="max-w-3xl mx-auto text-center px-4 pt-20 pb-12 select-none">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">
          Get to know me
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6 select-none">
          About me
        </h2>
        <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
          I&apos;m Nathan — an AI-focused full-stack developer in Los Angeles 📍. After years
          of shipping web apps for small businesses, I&apos;m now all-in on what generative
          AI unlocks: smarter products, faster builds, and tools that feel like magic ✨.
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
          — sometimes live on{' '}
          <a
            href="https://twitch.tv/n8builds"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-purple-500 dark:text-purple-400 underline decoration-purple-400/40 underline-offset-4 hover:text-purple-300 hover:decoration-purple-300 transition-colors duration-200">
            Twitch
          </a>{' '}
          🎥.
        </p>

        {/* Snapshot strip — polaroid-style photos that straighten on hover */}
        <div className="flex items-center justify-center gap-3 md:gap-4 pt-8">
          {introSnapshots.map((shot) => {
            const card = (
              <figure
                className={`group/snap ${shot.rotate} hover:rotate-0 hover:scale-105 hover:z-10 relative transition-transform duration-300 rounded-xl border border-white/10 bg-slate-900/50 p-1.5 pb-5 shadow-lg shadow-black/30`}>
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 768px) 6rem, 8rem"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="absolute bottom-1 inset-x-0 text-[10px] md:text-xs text-slate-500 dark:text-slate-400 group-hover/snap:text-sky-400 transition-colors duration-200">
                  {shot.caption}
                </figcaption>
              </figure>
            )
            return shot.href ? (
              <a
                key={shot.src}
                href={shot.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={shot.alt}>
                {card}
              </a>
            ) : (
              <div key={shot.src}>{card}</div>
            )
          })}
        </div>
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
