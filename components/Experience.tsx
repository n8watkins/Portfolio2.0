'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { workExperience } from '@/data'
import { Button } from './ui/MovingBorders'
import { cn } from '@/lib/utils'
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'

const Experience = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="relative py-20 xl:max-w-6xl 2xl:max-w-7xl m-auto text-slate-200 select-none">
        <motion.h2
          variants={fadeInUpVariants}
          {...defaultAnimationConfig}
          className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200 select-none">
          Work <span className="text-purple-500">Experience</span>
        </motion.h2>

        <motion.div
          variants={staggerContainerVariants}
          {...defaultAnimationConfig}
          className="w-full mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {workExperience.map((card) => (
            <motion.div
              key={card.id}
              variants={staggerItemVariants}
            >
              <Button
                duration={Math.floor(Math.random() * 10000) + 10000}
                borderRadius="1rem"
                style={{
                  background: currentTheme === 'dark' ? '#020621' : '#3B82F6',
                  backgroundColor:
                    currentTheme === 'dark'
                      ? 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)'
                      : 'linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)',
                  borderRadius: `calc(1rem * 0.96)`,
                }}
                className={cn(
                  'flex-1 border-neutral-200 dark:border-slate-800 cursor-default h-full',
                  currentTheme === 'dark' ? 'text-white' : 'text-black'
                )}>
                <div className="flex flex-col p-3 py-4 md:p-5 md:py-6 lg:p-8 lg:py-8 xl:p-10 xl:py-8 hover:scale-105 duration-200 z-20 h-full">
                  <div className="flex flex-row items-center mb-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={card.thumbnail}
                        alt={card.title}
                        width={128}
                        height={128}
                        className="z-20 lg:w-32 md:w-20 w-16 lg:h-32 md:h-20 h-16 xl:w-40 xl:h-40 object-contain"
                      />
                    </div>
                    <h3 className="ml-5 text-center text-2xl lg:text-3xl xl:text-4xl font-bold flex-1">
                      {card.title}
                    </h3>
                  </div>
                  <p
                    className={cn(
                      'text-start text-base xl:text-lg flex-1',
                      currentTheme === 'dark' ? 'text-white-100' : 'text-white'
                    )}>
                    {card.desc}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>
    </div>
  )
}

export default Experience
