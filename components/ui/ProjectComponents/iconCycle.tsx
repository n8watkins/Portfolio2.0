import React, { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { TechnologiesType, TechnologyItem } from '@/lib/types'
import { projectIconSkeleton } from '@/data'

interface IconCycleProps {
  technologies: TechnologiesType
  isIconsLoading: boolean
  autoCycleInterval?: number // in milliseconds
}

const MAX_ICONS_PER_VIEW = 4
const ANIMATION_DURATION = 500 // ms

const IconGenerationSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-start ">
      <div className="flex items-center space-x-4 mb-4">
        <div className="px-3 py-1 text-sm bg-white text-blue-500 rounded-full">Front-end</div>
        <div className=" px-3 py-1 text-sm bg-blue-500 text-white rounded-full">Back-end</div>
      </div>
      <div className="flex items-center space-x-4">
        <ChevronLeft size={20} />
        <div className="flex h-12 items-center overflow-hidden">
          {projectIconSkeleton.map((_, index) => (
            <div
              key={index}
              className={`relative w-12 h-12 rounded-full border-2 bg-darkBlue ${
                index !== 0 ? '-ml-3' : ''
              }`}>
              <Image src={_.icon} alt={_.name} className="p-3" fill />
            </div>
          ))}
        </div>
        <ChevronRight size={20} />
      </div>
    </div>
  )
}

const IconCycle: React.FC<IconCycleProps> = ({
  technologies,
  isIconsLoading,
  autoCycleInterval = 3000,
}) => {
  const categories = Object.keys(technologies)
  const [currentCategory, setCurrentCategory] = useState<string>(categories[0])
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const autoCycleTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (categories.length > 0) {
      setCurrentCategory(categories[0])
      setCurrentSetIndex(0)
    }
  }, [technologies])

  const getCurrentTechs = useCallback((): TechnologyItem[] => {
    if (!technologies[currentCategory]) {
      console.error(`Category ${currentCategory} not found in technologies`)
      return []
    }
    const techs = technologies[currentCategory]
    const startIndex = currentSetIndex * MAX_ICONS_PER_VIEW
    return techs.slice(startIndex, startIndex + MAX_ICONS_PER_VIEW)
  }, [technologies, currentCategory, currentSetIndex])

  const getTotalSets = useCallback(
    (category: string): number => {
      const techs = technologies[category]
      return Math.ceil(techs.length / MAX_ICONS_PER_VIEW)
    },
    [technologies]
  )

  const handleNavigate = useCallback(
    (newDirection: number) => {
      if (isAnimating) return
      setDirection(newDirection)
      setCurrentSetIndex((prevIndex) => {
        const currentTotalSets = getTotalSets(currentCategory)
        let newIndex = prevIndex + newDirection

        if (newIndex >= currentTotalSets || newIndex < 0) {
          // Switch to the next/previous category
          const currentCategoryIndex = categories.indexOf(currentCategory)
          let newCategoryIndex =
            (currentCategoryIndex + newDirection + categories.length) % categories.length
          const newCategory = categories[newCategoryIndex]
          setCurrentCategory(newCategory)

          // Set the index based on the direction
          newIndex = newDirection > 0 ? 0 : getTotalSets(newCategory) - 1
        }

        return newIndex
      })
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION)
    },
    [isAnimating, currentCategory, categories, getTotalSets]
  )

  const handleCategoryJump = useCallback(
    (category: string) => {
      if (isAnimating || category === currentCategory) return
      setDirection(categories.indexOf(category) > categories.indexOf(currentCategory) ? 1 : -1)
      setCurrentCategory(category)
      setCurrentSetIndex(0)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), ANIMATION_DURATION)
    },
    [isAnimating, currentCategory, categories]
  )

  const startAutoCycle = useCallback(() => {
    if (autoCycleTimeoutRef.current) {
      clearTimeout(autoCycleTimeoutRef.current)
    }
    autoCycleTimeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        handleNavigate(1)
      }
      startAutoCycle()
    }, autoCycleInterval)
  }, [handleNavigate, isHovering, autoCycleInterval])

  useEffect(() => {
    startAutoCycle()
    return () => {
      if (autoCycleTimeoutRef.current) {
        clearTimeout(autoCycleTimeoutRef.current)
      }
    }
  }, [startAutoCycle])

  const getTechName = (tech: TechnologyItem): string => {
    if (typeof tech === 'string') {
      return tech.split('/').pop()?.split('.')[0] || 'Unknown'
    }
    return tech.name
  }

  const getTechIcon = (tech: TechnologyItem): string => {
    if (typeof tech === 'string') {
      return tech
    }
    return tech.icon
  }

  return (
    <div className="flex flex-col items-start">
      {isIconsLoading ? (
        <IconGenerationSkeleton />
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryJump(category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  currentCategory === category
                    ? 'bg-white text-blue-500'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } transition-colors`}>
                {category}
              </button>
            ))}
          </div>
          <div
            className="flex items-center space-x-4"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            <button
              onClick={() => handleNavigate(-1)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              disabled={isAnimating}
              aria-label="Previous technologies">
              <ChevronLeft size={20} />
            </button>
            <div className="relative w-48 h-12 overflow-hidden">
              <AnimatePresence custom={direction} mode="wait" initial={false}>
                <motion.div
                  key={`${currentCategory}-${currentSetIndex}`}
                  custom={direction}
                  variants={{
                    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%' }),
                    center: { x: 0 },
                    exit: (direction: number) => ({ x: direction > 0 ? '-100%' : '100%' }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'tween', duration: ANIMATION_DURATION / 1000 },
                  }}
                  className="flex absolute left-0 top-0">
                  {getCurrentTechs().map((tech, index) => {
                    const techName = getTechName(tech)
                    const techIcon = getTechIcon(tech)
                    return (
                      <div
                        key={`${currentCategory}-${techName}-${index}`}
                        className={`relative w-12 h-12 rounded-full border-2 bg-gradient-to-l from-slate-900 to-darkBlue ${
                          index !== 0 ? '-ml-3' : ''
                        } transition-all duration-300 hover:z-10 hover:scale-110`}>
                        <Image src={techIcon} alt={techName} className="p-3" fill />
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                          {techName}
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              onClick={() => handleNavigate(1)}
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
              disabled={isAnimating}
              aria-label="Next technologies">
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default IconCycle
