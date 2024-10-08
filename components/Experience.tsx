'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { workExperience } from '@/data'
import { Button } from './ui/MovingBorders'
import { cn } from '@/lib/utils'

const ExperienceLoading = ({ currentTheme }: { currentTheme: string | undefined }) => {
  return (
    <div className="py-20 xl:max-w-5xl m-auto text-slate-200">
      <h1 className="heading text-slate-800 dark:text-slate-200">
        My work <span className="text-purple-500"> experience</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {workExperience.map((card) => (
          <div
            key={card.id}
            className={cn(
              'flex-1 rounded-[1.75rem] overflow-hidden dark:bg-[#020621]  bg-[#3B82F6] border border-neutral-200 dark:border-slate-800  '
            )}>
            <div className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
              <div className="flex flex-row">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  width={128}
                  height={128}
                  className="z-20 lg:w-32 md:w-20 w-16"
                />
                <h1 className="flex items-center ml-5 text-start text-3xl  font-bold text-black dark:text-white ">
                  {card.title}
                </h1>
              </div>
              <p
                className={cn(
                  'text-start mt-3 text-base',
                  currentTheme === 'dark' ? 'text-white' : 'text-white'
                )}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Experience = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Adjust this time as needed

    return () => clearTimeout(timer)
  }, [])

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  if (!mounted || isLoading) {
    return <ExperienceLoading currentTheme={currentTheme} />
  }

  return (
    <div className="py-20 xl:max-w-5xl m-auto text-slate-200 ">
      <h1 className="heading text-slate-800 dark:text-slate-200">
        My work <span className="text-purple-500"> experience</span>
      </h1>

      <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-4 gap-10">
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
            <div className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
              <div className="flex flex-row ">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  width={128}
                  height={128}
                  className="z-20 lg:w-32 md:w-20 w-16"
                />
                <h1 className="flex items-center ml-5 text-start text-3xl font-bold">
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
