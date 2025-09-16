'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { workExperience } from '@/data'
import { Button } from './ui/MovingBorders'
import { cn } from '@/lib/utils'
import { fadeInUpVariants, staggerContainerVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'

// COMMENTED OUT: Loading component no longer needed with scroll animations
// const ExperienceLoading = ({ currentTheme }: { currentTheme: string | undefined }) => {
//   return (
//     <div className="py-20 xl:max-w-5xl m-auto text-slate-200 select-none ">
//       <h1 className="heading text-slate-800 dark:text-slate-200">
//         My work <span className="text-purple-500"> experience</span>
//       </h1>

//       <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
//         {workExperience.map((card) => (
//           <div
//             key={card.id}
//             className={cn(
//               'flex-1 rounded-[1.75rem] overflow-hidden dark:bg-[#020621] hover:scale-105 duration-200 bg-[#3B82F6] border border-neutral-200 dark:border-slate-800  '
//             )}>
//             <div className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
//               <div className="flex flex-row">
//                 <Image
//                   src={card.thumbnail}
//                   alt={card.title}
//                   width={128}
//                   height={128}
//                   className="z-20 lg:w-32 md:w-20 w-16"
//                 />
//                 <h1 className="flex items-center ml-5 text-start text-3xl  font-bold text-black dark:text-white ">
//                   {card.title}
//                 </h1>
//               </div>
//               <p
//                 className={cn(
//                   'text-start mt-3 text-base',
//                   currentTheme === 'dark' ? 'text-white' : 'text-white'
//                 )}>
//                 {card.desc}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

const Experience = () => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // COMMENTED OUT: Loading states no longer needed with scroll animations
  // const [isLoading, setIsLoading] = useState(true)
  // const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    setMounted(true)
    // COMMENTED OUT: Artificial loading delay no longer needed
    // const timer = setTimeout(() => {
    //   setIsLoading(false)
    //   setTimeout(() => setShowContent(true), 50)
    // }, 1000)
    // return () => clearTimeout(timer)
  }, [])

  const currentTheme = theme === 'system' ? resolvedTheme : theme

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <div className="relative py-20 xl:max-w-6xl 2xl:max-w-7xl m-auto text-slate-200 select-none">
      {/* COMMENTED OUT: Loading skeleton overlay no longer needed */}
      {/* <div
        className={`absolute inset-0 transition-opacity duration-500 ease-out ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ExperienceLoading currentTheme={currentTheme} />
      </div> */}

      {/* Main content - now uses scroll animations instead of loading fade */}
      {/* <div
        className={`transition-opacity duration-500 ease-in ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      > */}
        <motion.h1
          variants={fadeInUpVariants}
          {...defaultAnimationConfig}
          className="heading text-slate-800 dark:text-slate-200">
          My work <span className="text-purple-500"> experience</span>
        </motion.h1>

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
                    <h1 className="ml-5 text-center text-2xl lg:text-3xl xl:text-4xl font-bold flex-1">
                      {card.title}
                    </h1>
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
      {/* </div> */}
    </div>
  )
}

export default Experience
