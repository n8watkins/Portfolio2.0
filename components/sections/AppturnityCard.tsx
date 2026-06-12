'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { FaTwitch, FaYoutube, FaXTwitter } from 'react-icons/fa6'
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'
import { requestSubjectPrefill } from '@/lib/contactPrefill'

const followLinks = [
  {
    label: 'Twitch',
    href: 'https://twitch.tv/n8builds',
    icon: <FaTwitch className="w-full h-full p-3" aria-hidden="true" />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@n8builds',
    icon: <FaYoutube className="w-full h-full p-3" aria-hidden="true" />,
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/n8watkins',
    icon: <FaXTwitter className="w-full h-full p-3" aria-hidden="true" />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/n8watkins',
    icon: <FiGithub className="w-full h-full p-3" aria-hidden="true" />,
  },
]

/**
 * Brand / "digital card" section: introduces Appturnity (consulting) and
 * points visitors at n8builds.dev and the live-build socials.
 */
const AppturnityCard = () => {
  return (
    <div className="relative pb-10 px-4 xl:max-w-6xl 2xl:max-w-7xl m-auto select-none">
      <motion.div
        variants={staggerContainerVariants}
        {...defaultAnimationConfig}
        className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Consulting card */}
        <motion.div
          variants={staggerItemVariants}
          className="rounded-xl p-6 md:p-8 bg-slate-900/30 border border-white/5 shadow-xl shadow-black/30 hover:border-white/10 transition-all duration-300 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            Consulting
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">Appturnity</h3>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed mt-2 mb-6 flex-1">
            My consulting company — custom apps and AI automation for small businesses.
            If you have a project in mind, I&apos;d love to hear about it.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://appturnity.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 hover:text-sky-400 hover:border-sky-400/60 transition-colors duration-200">
              appturnity.web.app
              <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              to="contact"
              smooth={true}
              offset={-80}
              duration={300}
              onClick={() => requestSubjectPrefill('consulting')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500/15 border border-sky-500/30 text-sm text-sky-300 hover:bg-sky-500/25 hover:border-sky-400/60 cursor-pointer transition-colors duration-200">
              Need something built?
            </Link>
          </div>
        </motion.div>

        {/* Follow card */}
        <motion.div
          variants={staggerItemVariants}
          className="rounded-xl p-6 md:p-8 bg-slate-900/30 border border-white/5 shadow-xl shadow-black/30 hover:border-white/10 transition-all duration-300 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            Follow the work
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">n8builds.dev</h3>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed mt-2 mb-6 flex-1">
            Everything I&apos;m building lives on my main site — and I sometimes build live
            on Twitch and YouTube.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://n8builds.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-700 text-sm text-slate-300 hover:text-sky-400 hover:border-sky-400/60 transition-colors duration-200 mr-1">
              n8builds.dev
              <FiArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            {followLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow Nathan on ${social.label}`}
                className="w-11 h-11 rounded-full text-slate-300 hover:text-sky-400 hover:bg-slate-700/70 transition-colors duration-200">
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AppturnityCard
