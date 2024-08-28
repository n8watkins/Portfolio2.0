import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ModeToggle } from './ModeToggle'
import { Link } from 'react-scroll'

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
    icon?: JSX.Element
  }[]
  className?: string
}) => {
  const { scrollYProgress } = useScroll()
  const [visible, setVisible] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

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

  return (
    <AnimatePresence mode="wait">
      <div className="fixed top-0 w-full h-16 bg-gradient-to-t from-blue-400/0 via-blue-400/90 to-blue-400 dark:from-darkBlue/0 dark:via-darkBlue/20 dark:to-darkBlue z-50" />
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit 1sm:gap-0 sm:gap-3 fixed top-5 1sm:top-2 sm:top-10 inset-x-0 mx-auto border dark:border-white/[0.2] rounded-2xl bg-gradient-to-r from-purple-200 to-blue-300 dark:from-gray-900 dark:to-blue-950 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),5px_0px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 items-center justify-center space-x-4 z-[5000]',
          className
        )}>
        {navItems.map((navItem, idx) => (
          <Link
            key={`${navItem.name}-${idx}`}
            to={navItem.link}
            activeClass="active"
            spy={true}
            smooth={true}
            offset={0}
            className={cn(
              'relative dark:text-neutral-50 items-center flex space-x-0 font-semibold dark:font-normal text-black dark:hover:text-neutral-300 hover:text-slate-800 cursor-pointer'
            )}>
            <span className="text-sm">{navItem.name}</span>
          </Link>
        ))}
        <div className="">
          <ModeToggle />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
