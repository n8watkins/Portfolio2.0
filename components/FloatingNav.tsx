import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Link } from 'react-scroll'
import { ModeToggle } from './ModeToggle'

const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(' ')

type NavItem = {
  name: string
  link: string
  icon?: React.ReactElement
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)
  const [atBottom, setAtBottom] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const checkIfBottom = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const atBottom = windowHeight + scrollTop >= documentHeight - 10 // 10px threshold
    setAtBottom(atBottom)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !atBottom) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      checkIfBottom()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkIfBottom)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkIfBottom)
    }
  }, [atBottom])

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current - scrollYProgress.getPrevious()!

      if (direction < 0 || atBottom) {
        setVisible(true)
      } else if (window.scrollY > 50 && !atBottom) {
        setVisible(false)
      }
    }
  })

  const getItemPosition = (index: number) => {
    if (navRef.current) {
      const navItem = navRef.current.children[index] as HTMLElement
      return {
        left: navItem.offsetLeft,
        width: navItem.offsetWidth,
      }
    }
    return { left: 0, width: 0 }
  }

  const allItems: Array<NavItem | { name: string; icon: React.ReactElement }> = [
    ...navItems,
    { name: '', icon: <ModeToggle /> }, 
  ]
  


  return (
    <AnimatePresence mode="sync">
      <div className="fixed top-0 w-full h-16 bg-gradient-to-t from-blue-400/0 via-blue-400/90 to-blue-400 dark:from-darkBlue/0 dark:via-darkBlue/90 dark:to-darkBlue z-[9999] select-none" />
      <motion.div
        key="floating-nav-wrapper"
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit fixed top-2 1lg:top-4  xl:top-6 inset-x-0 mx-auto border dark:border-white/[0.2] rounded-2xl bg-gradient-to-r from-purple-200 to-blue-300 dark:from-gray-900 dark:to-blue-950 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),5px_0px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-0.5 sm:py-1 items-center justify-center z-[9999]',
          className
        )}>
        <div ref={navRef} className="flex items-center relative px-1 sm:px-2">
        {allItems.map((item, idx) => (
  <div
  key={`nav-${item.name}-${idx}`}

    className={cn(
      'relative dark:text-neutral-50 items-center flex space-x-0 font-semibold dark:font-normal text-black dark:hover:text-neutral-300 hover:text-slate-800 cursor-pointer px-2 sm:px-4 py-0.5 sm:py-1 z-10 select-none'
    )}
    onMouseEnter={() => setActiveIndex(idx)}
    onMouseLeave={() => setActiveIndex(null)}
  >
    {'link' in item ? (
      <Link
        to={item.link}
        activeClass="active"
        spy={true}
        smooth={true}
        offset={0}
        className="flex items-center"
      >
        {item.icon && (
          <motion.div
            className="mr-1 sm:mr-2 flex items-center justify-center"
            animate={
              activeIndex === idx
                ? {
                    scale: [1, 1.2, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 1,
                    },
                  }
                : {}
            }
          >
            {React.cloneElement(item.icon as React.ReactElement, {
              className: 'w-4 h-4 sm:w-5 sm:h-5',
            })}
          </motion.div>
        )}
        <span className="text-xs sm:text-sm">{item.name}</span>
      </Link>
    ) : (
      <div className="flex items-center justify-center">
        {item.icon}
        {item.name && <span className="text-xs sm:text-sm ml-2">{item.name}</span>}
      </div>
    )}
  </div>
))}
          <motion.div
            className="absolute top-0 bottom-0 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm"
            initial={false}
            animate={
              activeIndex !== null
                ? {
                    left: getItemPosition(activeIndex).left,
                    width: getItemPosition(activeIndex).width,
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
