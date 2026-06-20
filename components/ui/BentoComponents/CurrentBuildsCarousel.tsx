'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { FiGithub, FiArrowUpRight } from 'react-icons/fi'

/**
 * "Currently building" — a living feed of the projects I'm shipping in public
 * (see n8builds.dev), adapted into the bento style. The header stays fixed
 * top-left while the build cycles underneath: each slide carries the project's
 * own icon, a status, a one-line pitch, its stack, and direct links out.
 */
type BuildLink = { github: string; live?: string }

interface Build {
  name: string
  tag: string
  status: 'Shipped' | 'Active'
  statusDot: string
  desc: string
  image: string
  gradient: string
  accent: string
  stack: string[]
  links: BuildLink
}

const BUILDS: Build[] = [
  {
    name: 'LocalDictate',
    tag: 'Desktop · Rust + Whisper',
    status: 'Shipped',
    statusDot: 'bg-emerald-400',
    desc: 'Hold a hotkey, talk, release — transcribed on-device by whisper.cpp and dropped right at your cursor. No cloud, no account, no audio leaves your machine.',
    image: '/builds/localdictate.png',
    gradient: 'from-slate-500/25 via-blue-600/15 to-transparent',
    accent: 'text-sky-300',
    stack: ['Tauri', 'Rust', 'whisper.cpp', 'SQLite'],
    links: { github: 'https://github.com/n8watkins/localdictate' },
  },
  {
    name: 'TL;DW',
    tag: 'Chrome extension · Gemini',
    status: 'Shipped',
    statusDot: 'bg-emerald-400',
    desc: 'Too Long; Didn’t Watch — press Alt+G on any YouTube video and it opens Gemini with your saved prompt and the video URL already filled in.',
    image: '/builds/tldw.png',
    gradient: 'from-orange-500/25 via-amber-500/12 to-transparent',
    accent: 'text-orange-300',
    stack: ['Chrome MV3', 'TypeScript', 'Vite'],
    links: { github: 'https://github.com/n8watkins/tl-dw' },
  },
  {
    name: 'Portfolio Rank',
    tag: 'Web app · AI scoring',
    status: 'Active',
    statusDot: 'bg-amber-400',
    desc: '1,700+ developer portfolios, browsable and searchable — soon ranked by head-to-head votes and AI scoring instead of alphabetically.',
    image: '/builds/portfolio-rank.png',
    gradient: 'from-sky-500/25 via-blue-500/12 to-transparent',
    accent: 'text-sky-300',
    stack: ['Next.js', 'TypeScript', 'Vercel'],
    links: { github: 'https://github.com/n8watkins/portfolio-rank', live: 'https://portfoliorank.vercel.app' },
  },
]

const INTERVAL_MS = 6000

export default function CurrentBuildsCarousel() {
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % BUILDS.length), INTERVAL_MS)
    return () => clearInterval(id)
    // Re-arm on index change too (e.g. dot click) so the timer bar stays in sync.
  }, [prefersReducedMotion, index])

  const build = BUILDS[index]

  return (
    <div className="absolute inset-0 z-30 flex flex-col p-5 md:p-6 lg:p-7 select-none">
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
        <a
          href="https://n8builds.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-sky-300 hover:text-sky-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded">
          n8builds.dev
          <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
        </a>
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

      {/* Cycling build — icon + details */}
      <div className="relative flex-1 mt-4 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full items-start gap-5 md:gap-6">
            {/* Project icon */}
            <div
              className={`relative hidden sm:block h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 flex-shrink-0 rounded-2xl border border-white/10 bg-gradient-to-br ${build.gradient}`}>
              <div className="absolute inset-[18%]">
                <Image
                  src={build.image}
                  alt={`${build.name} icon`}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-col">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <h3 className="text-2xl font-bold text-slate-100 lg:text-3xl">{build.name}</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slate-200">
                  <span className={`h-1.5 w-1.5 rounded-full ${build.statusDot}`} aria-hidden="true" />
                  {build.status}
                </span>
              </div>
              <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${build.accent}`}>
                {build.tag}
              </p>
              <p className="mt-2.5 max-w-2xl text-sm text-slate-200/90 md:text-base leading-relaxed">
                {build.desc}
              </p>

              {/* Stack */}
              <div className="mt-3 hidden flex-wrap gap-1.5 md:flex">
                {build.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                    {s}
                  </span>
                ))}
              </div>

              {/* Per-build redirects */}
              <div className="mt-3 flex items-center gap-2.5">
                <a
                  href={build.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${build.name} source on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                  <FiGithub className="w-4 h-4" aria-hidden="true" />
                  Code
                </a>
                {build.links.live && (
                  <a
                    href={build.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${build.name} live demo`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-sky-400/30 bg-sky-500/15 px-3 py-1.5 text-sm font-medium text-sky-200 hover:bg-sky-500/25 hover:text-sky-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
                    Live
                    <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>
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
