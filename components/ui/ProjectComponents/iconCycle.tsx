import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { techNameMapping } from '@/data/projects'
import { Technologies, TechNameMappingInterface, IconCycleState } from '@/lib/types'

interface IconCycleProps {
  technologies: Technologies
  orientation?: 'h' | 'v'
  view?: 'simple' | 'detailed'
  initialCategory?: keyof Technologies
  initialIconIndex?: number
  onStateChange?: (state: IconCycleState) => void
  onIconClick?: () => void
  onIconStateChange?: (icon: string, descriptionIndex: number) => void
  projectId?: number
}

const HOVER_INTERVAL = 3000 // 3 seconds per icon



const IconCycle: React.FC<IconCycleProps> = ({
  technologies,
  orientation = 'h',
  view = 'simple',
  initialCategory,
  initialIconIndex = 0,
  onStateChange,
  onIconClick,
  onIconStateChange,
}) => {
  const categories = useMemo(
    () => Object.keys(technologies) as (keyof Technologies)[],
    [technologies]
  )

  // Flattened, ordered list of every icon across all categories, derived from
  // props. Because it's a memo (not an effect-populated ref) it's correct on the
  // very first render — which is why no loading skeleton is needed. The
  // auto-cycle and handlers index into this single source of truth.
  const allIcons = useMemo(
    () =>
      categories.flatMap((category) =>
        technologies[category].descriptionParts.flatMap((part, descriptionIndex) =>
          part.icons.map((tech) => ({ icon: tech.icon, category, descriptionIndex }))
        )
      ),
    [technologies, categories]
  )

  const [currentCategory, setCurrentCategory] = useState<keyof Technologies>(
    initialCategory || categories[0]
  )
  const [hoveredIcons, setHoveredIcons] = useState<string[]>([])
  const [cycledIconIndex, setCycledIconIndex] = useState(initialIconIndex)
  const [highlightedDescriptionIndex, setHighlightedDescriptionIndex] = useState<number>(0)
  const [hoveredDescriptionIndex, setHoveredDescriptionIndex] = useState<number | null>(null)
  // Whether the user is actively previewing an icon/description — pauses the
  // auto-cycle. Replaces the old `isManualHoverRef` + manual clearInterval calls.
  const [interacting, setInteracting] = useState(false)





  const getTechName = useCallback((iconName: string): string => {
    return (techNameMapping as TechNameMappingInterface)[iconName] || iconName
  }, [])


  const prefersReducedMotion = useReducedMotion()

  // Auto-cycle: advance through every icon, crossing into the next category when
  // this one runs out. Declarative — the interval lives and dies with this effect
  // and pauses whenever the user is interacting or prefers reduced motion. The
  // category is derived from the icon list, so no ref-mirror of state is needed.
  useEffect(() => {
    if (interacting || prefersReducedMotion || allIcons.length <= 1) return
    const id = setInterval(() => {
      setCycledIconIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allIcons.length
        const prevIcon = allIcons[prevIndex]
        const nextIcon = allIcons[nextIndex]
        if (!nextIcon) return prevIndex
        if (!prevIcon || nextIcon.category !== prevIcon.category) {
          setCurrentCategory(nextIcon.category)
          setHighlightedDescriptionIndex(0)
        } else {
          setHighlightedDescriptionIndex(nextIcon.descriptionIndex)
        }
        return nextIndex
      })
    }, HOVER_INTERVAL)
    return () => clearInterval(id)
  }, [interacting, prefersReducedMotion, allIcons])
  
  const handleCategoryClick = useCallback((category: keyof Technologies) => {
    setCurrentCategory(category)
    const firstIndex = allIcons.findIndex((icon) => icon.category === category)
    if (firstIndex !== -1) {
      setCycledIconIndex(firstIndex)
      setHighlightedDescriptionIndex(allIcons[firstIndex].descriptionIndex)
    } else {
      setCycledIconIndex(0)
      setHighlightedDescriptionIndex(0)
    }
    setHoveredIcons([])
    setInteracting(false)
  }, [allIcons])

    
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

  
  const didMountRef = useRef(false);
  const lastStateRef = useRef<IconCycleState | null>(null);

  useEffect(() => {
    const currentState: IconCycleState = {
      currentCategory,
      cycledIconIndex,
      highlightedDescriptionIndex,
    };
  
    const lastState = lastStateRef.current;
  
    const hasChanged =
      !lastState ||
      lastState.currentCategory !== currentState.currentCategory ||
      lastState.cycledIconIndex !== currentState.cycledIconIndex ||
      lastState.highlightedDescriptionIndex !== currentState.highlightedDescriptionIndex;
  
    if (hasChanged && didMountRef.current && onStateChange) {
      onStateChange(currentState);
      lastStateRef.current = currentState;
    } else {
      didMountRef.current = true;
    }
  }, [currentCategory, cycledIconIndex, highlightedDescriptionIndex, onStateChange]);


  const handleIconHover = useCallback((icon: string, descriptionIndex: number) => {
    const newIndex = allIcons.findIndex(
      (tech) => tech.icon === icon && tech.category === currentCategory
    )
    if (newIndex !== -1) {
      setCycledIconIndex(newIndex)
      setHighlightedDescriptionIndex(descriptionIndex)
      setHoveredIcons([icon])
      setInteracting(true)
    }
  }, [allIcons, currentCategory])

  const handleIconHoverEnd = useCallback(() => {
    setHoveredIcons([])
    setInteracting(false)
  }, [])

  const handleIconClick = useCallback(
    (icon: string, descriptionIndex: number) => {
      const newIndex = allIcons.findIndex(
        (tech) => tech.icon === icon && tech.category === currentCategory
      )
      if (newIndex === -1) return
      setCycledIconIndex(newIndex)
      setTimeout(() => {
        setHighlightedDescriptionIndex(descriptionIndex)
        onIconStateChange?.(icon, descriptionIndex)
        onIconClick?.()
      }, 0)
    },
    [allIcons, currentCategory, onIconClick, onIconStateChange]
  )

  const handleDescriptionHover = useCallback(
    (index: number) => {
      setHighlightedDescriptionIndex(index)
      setHoveredDescriptionIndex(index)
      const icons = technologies[currentCategory].descriptionParts[index].icons.map(
        (tech) => tech.icon
      )

      setHoveredIcons(icons)
      setInteracting(true)

      const firstIconIndex = allIcons.findIndex(
        (tech) => tech.icon === icons[0] && tech.category === currentCategory
      )
      if (firstIconIndex !== -1) {
        setCycledIconIndex(firstIconIndex)
      }
    },
    [technologies, currentCategory, allIcons]
  )

  const handleDescriptionHoverEnd = useCallback(() => {
    setHoveredIcons([])
    setHoveredDescriptionIndex(null)
    setInteracting(false)
  }, [])

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

  const currentIcon = allIcons[cycledIconIndex]

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
        <button
          type="button"
          onClick={handlePreviousCategory}
          aria-label="Previous tech category"
          className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer text-white hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="flex justify-center items-center w-40  ">
          <h3 className="font-bold text-lg md:text-xl">{currentCategory}</h3>
        </div>
        <button
          type="button"
          onClick={handleNextCategory}
          aria-label="Next tech category"
          className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer text-white hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400">
          <ChevronRight aria-hidden="true" />
        </button>
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
          className="text-base md:text-lg lg:text-xl font-bold text-center pt-3 select-text">
          {formattedNames}
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderIcons = () => (
    <div
      className={`flex flex-wrap h-12 mb-1 pt-2 ${
        orientation === 'v' ? 'flex-col' : 'flex-row'
      } items-start justify-center gap-2 sm:gap-3 `}>
      {allIcons
        .filter((tech) => tech.category === currentCategory)
        .map((tech) => (
          <motion.div
            key={`${currentCategory}-${tech.icon}`}
            className="relative flex flex-col items-center "
            onMouseEnter={() => handleIconHover(tech.icon, tech.descriptionIndex)}
            onMouseLeave={handleIconHoverEnd}
            onClick={() => handleIconClick(tech.icon, tech.descriptionIndex)}
            animate={{
              scale:
                hoveredIcons.includes(tech.icon) || tech === allIcons[cycledIconIndex]
                  ? 1.2
                  : 1,
              [orientation === 'v' ? 'x' : 'y']:
                hoveredIcons.includes(tech.icon) || tech === allIcons[cycledIconIndex]
                  ? -5
                  : 0,
              zIndex:
                hoveredIcons.includes(tech.icon) || tech === allIcons[cycledIconIndex]
                  ? 10
                  : 1,
            }}
            transition={{ duration: 0.2 }}>
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full  p-2 bg-slate-800  dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center cursor-pointer ${
                hoveredIcons.includes(tech.icon) || tech === allIcons[cycledIconIndex]
                  ? 'border-slate-200 border-2 dark:border-slate-200'
                  : 'border-transparent border-slate-400 border dark:border-slate-400'
              }`}>
              <div className="relative w-full h-full">
                <Image
                  src={`/projectIcons/${tech.icon}`}
                  alt={getTechName(tech.icon)}
                  fill
                  sizes="(max-width: 768px) 32px, (max-width: 1024px) 40px, 48px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  )

  const renderSimpleView = () => (
    <div className="select-none relative">
      {renderTitle()}
      <div className="relative">
        {renderIcons()}
        {renderTechName()}
      </div>
    </div>
  )

  const renderDetailedView = () => (
    <>
      <div className="flex flex-row justify-center items-center w-full select-none ">
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
      <div className="relative flex flex-col justify-start items-start w-full 1lg:w-[80%] m-auto sm:w-full xl:justify-center xl:items-center h-40 1lg:justify-center 1lg:items-center  -translate-x-3 -translate-y-5 1md:-translate-y-3 1lg:-translate-y-5  sm:-translate-y-2 2xl:-translate-y-4 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
            className="w-full px-4 mr-2 xl:w-[32rem] xl:mx-auto xl:px-0">
            {technologies[currentCategory].descriptionParts.map((part, index) => (
              <motion.div
                key={index}
                className={`flex items-center justify-start text-sm 1md:text-sm 1lg:text-base w-fit cursor-pointer rounded-xl px-1 1md:px-2 py-1   ${
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
        <div className="translate-y-1 sm:-translate-y-0">{renderTechName()}</div>
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
