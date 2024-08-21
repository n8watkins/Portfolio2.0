'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { workExperience } from '@/data'
import { Button } from './ui/MovingBorders'
import { cn } from '@/lib/utils'

const Experience = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <div className="py-20 xl:max-w-5xl m-auto text-slate-200 ">
      <h1 className="heading text-slate-800 dark:text-slate-200">
        My work <span className="text-purple-500"> experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: currentTheme === 'dark' ? '#020621' : '#3B82F6',
              backgroundColor:
                currentTheme === 'dark'
                  ? 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)'
                  : 'linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 100%)',
              borderRadius: `calc(1.75rem * 0.96)`,
            }}
            className={cn(
              'flex-1 border-neutral-200 dark:border-slate-800',
              currentTheme === 'dark' ? 'text-white' : 'text-black'
            )}>
            <div className="flex  flex-col  p-3 py-6 md:p-5 lg:p-10 gap-2">
              <div className="flex flex-row ">
                <img
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="z-20 lg:w-32 md:w-20 w-16 "
                />
                <h1 className="flex items-center ml-5 text-start text-2xl md:text-2xl font-bold">
                  {card.title}
                </h1>
              </div>
              <p
                className={cn(
                  'text-start mt-3  text-base ',
                  currentTheme === 'dark' ? 'text-white-100' : 'text-white'
                )}>
                {card.desc}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Experience
