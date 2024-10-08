import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { techNameMapping, projects } from '@/data'
import { Technologies, TechNameMappingInterface } from '@/lib/types'

interface IconCycleProps {
  technologies: Technologies
  orientation?: 'h' | 'v'
  view?: 'simple' | 'detailed'
  initialCategory?: keyof Technologies
  initialIconIndex?: number
  onStateChange?: (state: IconCycleState) => void
  onIconClick?: () => void
  projectId?: number
}

interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}

const HOVER_INTERVAL = 3000 // 3 seconds per icon

const IconCycle: React.FC<IconCycleProps> = ({
  technologies,
  orientation = 'h',
  view = 'detailed',
  initialCategory,
  initialIconIndex = 0,
  onStateChange,
  onIconClick,
  projectId,
}) => {
  const categories = Object.keys(technologies) as (keyof Technologies)[]
  const [currentCategory, setCurrentCategory] = useState<keyof Technologies>(
    initialCategory || categories[0]
  )
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([])
  const [cycledIconIndex, setCycledIconIndex] = useState(initialIconIndex)
  const [highlightedDescriptionIndex, setHighlightedDescriptionIndex] = useState<number>(0)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [hoveredDescriptionIndex, setHoveredDescriptionIndex] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isManualHoverRef = useRef(false)
  const [loading, setLoading] = useState(true)

  const allIconsRef = useRef<
    { icon: string; category: keyof Technologies; descriptionIndex: number }[]
  >([])
  const currentCategoryRef = useRef(currentCategory)

  useEffect(() => {
    allIconsRef.current = categories.flatMap((category) =>
      technologies[category].descriptionParts.flatMap((part, descriptionIndex) =>
        part.icons.map((tech) => ({ icon: tech.icon, category, descriptionIndex }))
      )
    )
  }, [technologies, categories])

  useEffect(() => {
    currentCategoryRef.current = currentCategory
  }, [currentCategory])

  const handleCategoryClick = useCallback((category: keyof Technologies) => {
    setCurrentCategory(category)
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

  const handleNextCategory = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory)
    const nextIndex = (currentIndex + 1) % categories.length
    handleCategoryClick(categories[nextIndex])
  }, [categories, currentCategory, handleCategoryClick])

  const handlePreviousCategory = useCallback(() => {
    const currentIndex = categories.indexOf(currentCategory)
    const previousIndex = (currentIndex - 1 + categories.length) % categories.length
    handleCategoryClick(categories[previousIndex])
  }, [categories, currentCategory, handleCategoryClick])

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
      setCycledIconIndex(initialIconIndex)
      setHighlightedDescriptionIndex(0)
      setIsFirstRender(false)
      setLoading(false)
    } else {
      startAutoCycle()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isFirstRender, startAutoCycle, initialIconIndex])

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        currentCategory,
        cycledIconIndex,
        highlightedDescriptionIndex,
      })
    }
  }, [currentCategory, cycledIconIndex, highlightedDescriptionIndex, onStateChange])

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

  const handleIconClick = useCallback(
    (icon: string, descriptionIndex: number) => {
      handleIconHover(icon, descriptionIndex)
      if (onIconClick) {
        onIconClick()
      }
    },
    [handleIconHover, onIconClick]
  )

  const handleDescriptionHover = useCallback(
    (index: number) => {
      setHighlightedDescriptionIndex(index)
      setHoveredDescriptionIndex(index)
      const descriptionIcons = technologies[currentCategory].descriptionParts[index].icons
      const icons = descriptionIcons.map((tech) => tech.icon)

      setHoveredIcons(icons)
      isManualHoverRef.current = true
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      const firstIconIndex = allIconsRef.current.findIndex(
        (tech) => tech.icon === icons[0] && tech.category === currentCategory
      )
      if (firstIconIndex !== -1) {
        setCycledIconIndex(firstIconIndex)
      }
    },
    [technologies, currentCategory, setCycledIconIndex]
  )

  const handleDescriptionHoverEnd = useCallback(() => {
    isManualHoverRef.current = false
    setHoveredIcons([])
    setHoveredDescriptionIndex(null)
    startAutoCycle()
  }, [startAutoCycle])

  const formatIconNames = useCallback(
    (icons: string[]): string => {
      if (icons.length === 0) return ''
      if (icons.length === 1) return getTechName(icons[0])
      if (icons.length === 2) return `${getTechName(icons[0])} and ${getTechName(icons[1])}`
      return (
        icons.slice(0, -1).map(getTechName).join(', ') +
        ', & ' +
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

  const renderTitle = () => {
    return (
      <div className="mt-9 1sm:mt-6 1lg:mt-1 md:mt-6 lg:mt-4 flex items-center justify-center mb-1 ">
        <div className="w-12 h-12 flex items-center justify-center">
          <ChevronLeft
            className="cursor-pointer text-white hover:text-purple-400 transition-colors"
            onClick={handlePreviousCategory}
          />
        </div>
        <div className="flex justify-center items-center w-40  ">
          <h3 className="font-bold text-xl ">{currentCategory}</h3>
        </div>
        <div className="w-12 h-12 flex items-center justify-center">
          <ChevronRight
            className="cursor-pointer text-white hover:text-purple-400 transition-colors"
            onClick={handleNextCategory}
          />
        </div>
      </div>
    )
  }
  const renderTechName = () => {
    let techNames: string[] = []
    if (
      hoveredDescriptionIndex !== null &&
      technologies[currentCategory]?.descriptionParts[hoveredDescriptionIndex]?.icons
    ) {
      techNames = technologies[currentCategory].descriptionParts[hoveredDescriptionIndex].icons.map(
        (tech) => getTechName(tech.icon)
      )
    } else {
      const currentIcons = getCurrentIcons()
      techNames = currentIcons.map(getTechName)
    }

    const formattedNames = formatIconNames(techNames)

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={formattedNames}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-lg 1lg:text-xl font-bold text-center mt-4">
          {formattedNames}
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderFrontendIcons = () => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return null

    const firstTechName = getTechName(
      project.technologies.Frontend.descriptionParts[0]?.icons[0].icon
    )

    return (
      <div>
        <div className="flex flex-wrap gap-4 justify-center items-start h-12 mb-1 select-none">
          {project.technologies.Frontend.descriptionParts.flatMap((part, partIndex) =>
            part.icons.map((tech, techIndex) => {
              const isFirstIcon = partIndex === 0 && techIndex === 0
              return (
                <motion.div key={tech.icon} className="relative flex flex-col items-center">
                  <div
                    className={` rounded-full  p-2 bg-slate-800 dark:bg-slate-900  overflow-visible flex flex-col items-center justify-center cursor-pointer ${
                      isFirstIcon
                        ? 'border-slate-200 dark:border-slate-200  border-2 w-[3.70rem] h-[3.70rem]  -translate-y-3'
                        : 'w-12 h-12 border-transparent border border-slate-400 dark:border-slate-400'
                    }`}>
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
              )
            })
          )}
        </div>
        <div className="flex items-center justify-center text-lg font-bold pt-2">
          {firstTechName}
        </div>
      </div>
    )
  }

  const renderIcons = () => (
    <div
      className={`flex  h-12  ${
        orientation === 'v' ? 'flex-col' : 'flex-row'
      } items-center justify-center gap-3 `}>
      {allIconsRef.current
        .filter((tech) => tech.category === currentCategory)
        .map((tech) => (
          <motion.div
            key={`${currentCategory}-${tech.icon}`}
            className="relative flex flex-col items-center "
            onMouseEnter={() => handleIconHover(tech.icon, tech.descriptionIndex)}
            onMouseLeave={handleIconHoverEnd}
            onClick={() => handleIconClick(tech.icon, tech.descriptionIndex)}
            animate={{
              scale: hoveredIcons.includes(tech.icon) || tech === currentIcon ? 1.2 : 1,
              [orientation === 'v' ? 'x' : 'y']:
                hoveredIcons.includes(tech.icon) || tech === currentIcon ? -5 : 0,
              zIndex: hoveredIcons.includes(tech.icon) || tech === currentIcon ? 10 : 1,
            }}
            transition={{ duration: 0.2 }}>
            <div
              className={`w-12 h-12 rounded-full  p-2 bg-slate-800  dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center cursor-pointer ${
                hoveredIcons.includes(tech.icon) || tech === currentIcon
                  ? 'border-slate-200 border-2 dark:border-slate-200'
                  : 'border-transparent border-slate-400 border dark:border-slate-400'
              }`}>
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
  )

  const renderSimpleView = () => (
    <>
      {/* Always render this section */}
      {renderTitle()}
      {/* Conditionally render this section based on loading state */}
      {loading ? (
        renderFrontendIcons()
      ) : (
        <>
          {renderIcons()}
          {renderTechName()}
        </>
      )}
    </>
  )

  const renderDetailedView = () => (
    <>
      <div className="flex flex-row justify-center items-center w-full ">
        <div className="flex w-fit  justify-center items-center bg-slate-600 dark:bg-blue-800 h-fit rounded-full gap-4 py-2 px-3 overflow-visible -translate-y-4  ">
          {
            //categories - Front Back Cloud
            categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-2 py-1 text-sm 1md:text-base  rounded-full transition-all ${
                  category === currentCategory
                    ? 'bg-gray-300 text-blue-500 dark:text-blue-700 font-semibold shadow-md w-fit'
                    : ' text-white hover:bg-slate-500/80 dark:hover:bg-blue-400/80'
                }`}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: category === currentCategory ? 1.1 : 1 }}>
                {category}
              </motion.button>
            ))
          }
        </div>
      </div>
      <div className="relative flex flex-col justify-start items-start w-full 1lg:w-[80%] m-auto sm:w-full h-40 1lg:justify-center 1lg:items-center  -translate-x-3 -translate-y-5 1md:-translate-y-3 1lg:-translate-y-5  sm:-translate-y-6 2xl:-translate-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className="w-full px-4 mr-2  ">
            {technologies[currentCategory].descriptionParts.map((part, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-center  sm:items-start text-sm 1md:text-sm 1lg:text-base w-fit cursor-pointer rounded-xl px-1 1md:px-2 py-1   ${
                  index === highlightedDescriptionIndex ? 'dark:bg-blue-800 bg-slate-600' : ''
                }`}
                onMouseEnter={() => handleDescriptionHover(index)}
                onMouseLeave={handleDescriptionHoverEnd}
                animate={{
                  x: index === highlightedDescriptionIndex ? 10 : 0,
                  scale: index === highlightedDescriptionIndex ? 1.05 : 1,
                  opacity: index === highlightedDescriptionIndex ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}>
                <span className="mr-2 flex-shrink-0">•</span>
                <span className="flex-grow text-ellipsis">{part.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="-translate-y-2  1lg:-translate-y-1">
        {renderIcons()}
        <div className="-translate-y-3 sm:-translate-y-0">{renderTechName()}</div>
      </div>
    </>
  )

  return (
    <div className={`flex flex-col  justify-center mt-2 space-y-3  w-full `}>
      {view === 'simple' ? renderSimpleView() : renderDetailedView()}
    </div>
  )
}

export default IconCycle
