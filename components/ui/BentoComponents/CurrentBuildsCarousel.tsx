'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import LinkButton from './LinkButton'

/**
 * The things I'm currently building in public (see n8builds.dev). Auto-cycles
 * through them so the bento card reads as a living "currently building" feed
 * instead of a single static blurb.
 */
const BUILDS = [
  {
    name: 'Scribe',
    tag: 'Rust · whisper.cpp',
    desc: 'Hold a hotkey, talk, release — your words get transcribed on-device and dropped right at your cursor. No cloud, no account, no audio leaves your machine.',
  },
  {
    name: 'TLDW',
    tag: 'Chrome extension',
    desc: 'Too Long; Didn’t Watch — summarizes long videos so you get the point without sitting through the whole thing.',
  },
  {
    name: 'Portfolio Ranker',
    tag: 'Web app',
    desc: 'Scores and ranks developer portfolios against each other, so you can see exactly how yours stacks up.',
  },
]

const INTERVAL_MS = 3800

export default function CurrentBuildsCarousel() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % BUILDS.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion])

  const build = BUILDS[index]

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end select-none">
      {/* Bottom gradient for legibility over the code background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 rounded-b-3xl bg-gradient-to-t from-blue-500 via-blue-500/90 to-transparent dark:from-[#0d304c] dark:via-[#0d304c]/90 dark:to-transparent" />

      <div className="relative px-5 pb-5 md:px-8 lg:pb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-300">
          Currently building
        </p>

        <div className="min-h-[5.5rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-bold text-slate-100 lg:text-3xl">{build.name}</h3>
                <span className="rounded-full border border-sky-400/25 bg-sky-500/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-sky-300">
                  {build.tag}
                </span>
              </div>
              <p className="mt-1.5 max-w-xl text-sm text-slate-200/90 md:text-base">{build.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <LinkButton
            href="https://n8builds.dev"
            className="lg:h-12 w-fit whitespace-nowrap"
            text="Follow the build"
          />
          <div className="flex items-center gap-1.5">
            {BUILDS.map((b, i) => (
              <button
                key={b.name}
                type="button"
                aria-label={`Show ${b.name}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  i === index ? 'w-5 bg-sky-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
