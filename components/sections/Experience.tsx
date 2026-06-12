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
        <div className="absolute left-[9px] md:left-[11px] top-2 bottom-4 w-px bg-gradient-to-b from-purple-500 via-purple-400/40 to-transparent" />

        <div className="space-y-10">
          {workExperience.map((item, index) => {
            const isFirst = index === 0
            const showDivider = item.additional && workExperience[index - 1] && !workExperience[index - 1].additional

            return (
              <React.Fragment key={item.id}>
                {showDivider && (
                  <div className="relative pl-10 md:pl-12">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Additional Experience
                    </p>
                  </div>
                )}

                <motion.div
                  variants={staggerItemVariants}
                  className="relative pl-10 md:pl-12">

                  {/* Timeline dot */}
                  <div className="absolute left-0 top-[7px] w-[19px] h-[19px] rounded-full bg-purple-500 border-[3px] border-blue-400 dark:border-slate-900 shadow-lg shadow-purple-500/30" />

                  {/* Period + location */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                    <span className="text-xs font-semibold tracking-wider uppercase text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                      {item.period}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{item.location}</span>
                  </div>

                  {/* Role */}
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-snug">
                    {item.role}
                  </h3>

                  {/* Company */}
                  <p className="text-base font-semibold mt-0.5 mb-4">
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors">
                        {item.company}
                      </a>
                    ) : (
                      <span className="text-purple-400">{item.company}</span>
                    )}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5">
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="mt-[9px] flex-shrink-0 w-[5px] h-[5px] rounded-full bg-purple-400/60" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
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
