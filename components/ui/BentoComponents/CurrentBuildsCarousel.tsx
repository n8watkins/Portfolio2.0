'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FaMicrophone, FaYoutube, FaTrophy } from 'react-icons/fa6'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'

/**
 * "Currently building" — a living feed of the projects I'm shipping in public
 * (see n8builds.dev), adapted into the bento style. The header stays fixed
 * top-left while the build cycles underneath, with a timer bar showing progress
 * through each one.
 */
const BUILDS = [
  {
    name: 'Scribe',
    tag: 'Rust · whisper.cpp',
    desc: 'Hold a hotkey, talk, release — transcribed on-device and dropped right at your cursor. No cloud, no account, no audio leaves your machine.',
    Icon: FaMicrophone,
    gradient: 'from-orange-500/25 via-amber-500/10 to-transparent',
    accent: 'text-orange-300',
  },
  {
    name: 'TLDW',
    tag: 'Chrome extension',
    desc: 'Too Long; Didn’t Watch — summarizes long videos so you get the point without sitting through the whole thing.',
    Icon: FaYoutube,
    gradient: 'from-rose-500/25 via-red-500/10 to-transparent',
    accent: 'text-rose-300',
  },
  {
    name: 'Portfolio Ranker',
    tag: 'Web app',
    desc: 'Scores and ranks developer portfolios against each other, so you can see exactly how yours stacks up.',
    Icon: FaTrophy,
    gradient: 'from-sky-500/25 via-blue-500/10 to-transparent',
    accent: 'text-sky-300',
  },
]

const INTERVAL_MS = 5000

export default function CurrentBuildsCarousel() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % BUILDS.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [prefersReducedMotion])

  const build = BUILDS[index]
  const Icon = build.Icon

  return (
    <div className="absolute inset-0 z-30 flex flex-col p-5 md:p-7 lg:p-8 select-none">
      {/* Fixed header — stays put while the build below cycles */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
            Currently building
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/n8watkins"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="My GitHub"
            className="text-slate-300 hover:text-sky-400 transition-colors">
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://n8builds.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors">
            n8builds.dev
            <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Timer bar — fills over each build's turn */}
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
        {prefersReducedMotion ? (
          <div className="h-full w-full bg-sky-400/60" />
        ) : (
          <motion.div
            key={index}
            className="h-full bg-sky-400"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>

      {/* Cycling build — visual + details */}
      <div className="relative flex-1 mt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full items-center gap-4 md:gap-6">
            {/* Visual */}
            <div
              className={`relative hidden sm:flex h-24 w-36 md:h-28 md:w-48 lg:h-32 lg:w-56 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${build.gradient}`}>
              <Icon className={`h-8 w-8 md:h-10 md:w-10 ${build.accent}`} aria-hidden="true" />
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-2xl font-bold text-slate-100 lg:text-3xl">{build.name}</h3>
                <span className={`rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${build.accent}`}>
                  {build.tag}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm text-slate-200/90 md:text-base">{build.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-3 flex items-center gap-1.5">
        {BUILDS.map((b, i) => (
          <button
            key={b.name}
            type="button"
            aria-label={`Show ${b.name}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              i === index ? 'w-6 bg-sky-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
