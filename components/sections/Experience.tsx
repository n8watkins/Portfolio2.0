'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { workExperience } from '@/data/experience'
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'

const Experience = () => {
  return (
    <div className="relative py-20 xl:max-w-6xl 2xl:max-w-7xl m-auto select-none">
      <motion.h2
        variants={fadeInUpVariants}
        {...defaultAnimationConfig}
        className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200">
        Work <span className="text-purple-500">Experience</span>
      </motion.h2>

      <motion.div
        variants={staggerContainerVariants}
        {...defaultAnimationConfig}
        className="relative mt-4 px-2 md:px-4">

        {/* Vertical timeline line */}
        <div className="absolute left-[9px] md:left-[11px] top-2 bottom-4 w-px bg-gradient-to-b from-cyan-500 via-cyan-400/40 to-transparent" />

        <div className="space-y-6">
          {workExperience.map((item, index) => {
            const showDivider = item.additional && workExperience[index - 1] && !workExperience[index - 1].additional

            return (
              <React.Fragment key={item.id}>
                {showDivider && (
                  <div className="relative pl-10 md:pl-12 pt-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Additional Experience
                    </p>
                  </div>
                )}

                <motion.div
                  variants={staggerItemVariants}
                  className="relative pl-10 md:pl-12">

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-[14px] w-[19px] h-[19px] rounded-full bg-cyan-500 border-[3px] border-slate-900 shadow-lg shadow-cyan-500/40" />

                  {/* Card */}
                  <div className="rounded-xl p-5 md:p-6 bg-slate-900/30 border border-white/5 shadow-xl shadow-black/30 hover:shadow-black/50 hover:border-white/10 transition-all duration-300">

                    {/* Period + location */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                      <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                        {item.period}
                      </span>
                      <span className="text-xs text-slate-400">{item.location}</span>
                    </div>

                    {/* Role */}
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 leading-snug">
                      {item.role}
                    </h3>

                    {/* Company */}
                    <p className="text-base font-semibold mt-0.5 mb-4">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors">
                          {item.company}
                        </a>
                      ) : (
                        <span className="text-cyan-400">{item.company}</span>
                      )}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5">
                      {item.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm md:text-base text-slate-400 leading-relaxed">
                          <span className="mt-[9px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-cyan-400/60" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </React.Fragment>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

export default Experience
