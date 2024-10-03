import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

import { techNameMapping } from '@/data'
import { Technologies, TechNameMappingInterface } from '@/lib/types'

interface IconCycleProps {
  technologies: Technologies
}

const HOVER_INTERVAL = 3000 // 3 seconds per icon

const IconCycle: React.FC<IconCycleProps> = ({ technologies }) => {
  const categories = Object.keys(technologies) as (keyof Technologies)[]
  const [currentCategory, setCurrentCategory] = useState<keyof Technologies>(categories[0])
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([])
  const [cycledIconIndex, setCycledIconIndex] = useState(0)
  const [highlightedDescriptionIndex, setHighlightedDescriptionIndex] = useState<number>(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isManualHoverRef = useRef(false)
  const allIconsRef = useRef<
    { icon: string; category: keyof Technologies; descriptionIndex: number }[]
  >([])
  const currentCategoryRef = useRef(currentCategory)

  useLayoutEffect(() => {
    allIconsRef.current = categories.flatMap((category) =>
      technologies[category].descriptionParts.flatMap((part, descriptionIndex) =>
        part.icons.map((tech) => ({ icon: tech.icon, category, descriptionIndex }))
      )
    )
  }, [technologies, categories])

  useLayoutEffect(() => {
    currentCategoryRef.current = currentCategory
  }, [currentCategory])

  const handleCategoryClick = useCallback((category: keyof Technologies) => {
    setCurrentCategory(category)
    // Find the first icon of the selected category
    const firstIconOfCategory = allIconsRef.current.find((icon) => icon.category === category)
    if (firstIconOfCategory) {
      setCycledIconIndex(allIconsRef.current.indexOf(firstIconOfCategory))
      setHighlightedDescriptionIndex(firstIconOfCategory.descriptionIndex)
    } else {
      setCycledIconIndex(0)
      setHighlightedDescriptionIndex(0)
    }
    setHoveredIcons([])
    resetCycling()
  }, [])

  const getTechName = useCallback((iconName: string): string => {
    return (techNameMapping as TechNameMappingInterface)[iconName] || iconName
  }, [])

  const resetCycling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!isManualHoverRef.current) {
      startAutoCycle()
    }
  }

  const startAutoCycle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isManualHoverRef.current) {
        setCycledIconIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % allIconsRef.current.length
          const nextIcon = allIconsRef.current[nextIndex]

          if (nextIcon.category !== currentCategoryRef.current) {
            setCurrentCategory(nextIcon.category)
            setHighlightedDescriptionIndex(0)
          } else {
            setHighlightedDescriptionIndex(nextIcon.descriptionIndex)
          }

          return nextIndex
        })
      }
    }, HOVER_INTERVAL)
  }, [setCurrentCategory])

  useEffect(() => {
    if (isFirstRender) {
      setCycledIconIndex(0)
      setHighlightedDescriptionIndex(0)
      setIsFirstRender(false)
    } else {
      startAutoCycle()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isFirstRender, startAutoCycle])

  const handleIconHover = useCallback((icon: string, descriptionIndex: number) => {
    const newIndex = allIconsRef.current.findIndex(
      (tech) => tech.icon === icon && tech.category === currentCategoryRef.current
    )
    if (newIndex !== -1) {
      setCycledIconIndex(newIndex)
      setHighlightedDescriptionIndex(descriptionIndex)
      setHoveredIcons([icon])
      isManualHoverRef.current = true
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleIconHoverEnd = useCallback(() => {
    isManualHoverRef.current = false
    setHoveredIcons([])
    startAutoCycle()
  }, [startAutoCycle])

  const handleDescriptionHover = useCallback(
    (index: number) => {
      setHighlightedDescriptionIndex(index)
      const descriptionIcons = technologies[currentCategory].descriptionParts[index].icons
      const firstIconForDescription = descriptionIcons[0].icon
      const icons = descriptionIcons.map((tech) => tech.icon)

      const newIndex = allIconsRef.current.findIndex(
        (tech) => tech.icon === firstIconForDescription && tech.category === currentCategory
      )

      if (newIndex !== -1) {
        setCycledIconIndex(newIndex)
      }

      setHoveredIcons(icons)
      isManualHoverRef.current = true
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    },
    [technologies, currentCategory]
  )

  const handleDescriptionHoverEnd = useCallback(() => {
    isManualHoverRef.current = false
    setHoveredIcons([])
    startAutoCycle()
  }, [startAutoCycle])

  const formatIconNames = useCallback(
    (icons: string[]): string => {
      if (icons.length === 0) return ''
      if (icons.length === 1) return getTechName(icons[0])
      if (icons.length === 2) return `${getTechName(icons[0])} and ${getTechName(icons[1])}`
      return (
        icons.slice(0, -1).map(getTechName).join(', ') +
        ', and ' +
        getTechName(icons[icons.length - 1])
      )
    },
    [getTechName]
  )

  const currentIcon = allIconsRef.current[cycledIconIndex]

  const getCurrentIcons = useCallback(() => {
    if (hoveredIcons.length > 0) {
      return hoveredIcons
    }
    if (currentIcon) {
      return [currentIcon.icon]
    }
    return []
  }, [hoveredIcons, currentIcon])

  return (
    <div className="flex flex-col items-center py-5 space-y-3 w-full">
      {/* Category buttons */}
      <div className="flex justify-center space-x-4 mb-4 w-full">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 text-md rounded-full transition-all ${
              category === currentCategory
                ? 'bg-gray-300 text-blue-500 shadow-md w-fit'
                : 'bg-transparent text-white hover:bg-blue-300'
            }`}
            whileHover={{ scale: 1.05 }}
            animate={{ scale: category === currentCategory ? 1.1 : 1 }}>
            {category}
          </motion.button>
        ))}
      </div>

      {/* Description texts with bottom-to-top fade animation */}
      <div className="relative overflow-visible w-full h-32 flex items-center">
        {' '}
        {/* Adjust height as needed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full">
            {technologies[currentCategory].descriptionParts.map((part, index) => (
              <motion.p
                key={index}
                className={`flex items-start text-base cursor-pointer rounded-xl px-2 py-1 mb-2 ${
                  index === highlightedDescriptionIndex ? 'bg-slate-800 w-fit' : ''
                }`}
                onMouseEnter={() => handleDescriptionHover(index)}
                onMouseLeave={handleDescriptionHoverEnd}
                animate={{
                  x: index === highlightedDescriptionIndex ? 20 : 0,
                  scale: index === highlightedDescriptionIndex ? 1.05 : 1,
                  opacity: index === highlightedDescriptionIndex ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}>
                <span className="mr-2">•</span>
                <span>{part.text}</span>
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Icon names */}
      <div className="h-8 overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={getCurrentIcons().join(',')}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.2 }}
            className="text-center text-lg font-semibold w-full">
            {formatIconNames(getCurrentIcons())}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Icons */}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {allIconsRef.current
          .filter((tech) => tech.category === currentCategory)
          .map((tech) => (
            <motion.div
              key={`${currentCategory}-${tech.icon}`}
              className="relative w-12 h-12 flex items-center justify-center"
              onMouseEnter={() => handleIconHover(tech.icon, tech.descriptionIndex)}
              onMouseLeave={handleIconHoverEnd}
              animate={{
                scale: hoveredIcons.includes(tech.icon) || tech === currentIcon ? 1.2 : 1,
                y: hoveredIcons.includes(tech.icon) || tech === currentIcon ? -5 : 0,
                zIndex: hoveredIcons.includes(tech.icon) || tech === currentIcon ? 10 : 1,
              }}
              transition={{ duration: 0.2 }}>
              <div className="w-12 h-12 rounded-full border-2 p-2 bg-gradient-to-l from-slate-900 to-darkBlue overflow-hidden flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={`/projectIcons/${tech.icon}`}
                    alt={getTechName(tech.icon)}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}

export default IconCycle
