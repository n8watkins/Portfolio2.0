import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import { trackResumeEvent } from '@/lib/analytics'

interface ResumeButtonsProps {
  buttonContainer?: string
  buttonClass?: string
}

const ResumeButtons: React.FC<ResumeButtonsProps> = ({ buttonContainer, buttonClass }) => {
  const [isVisible, setIsVisible] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: {
      opacity: 1,
      y: 56, // Equivalent to translate-y-14 in Tailwind
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div
      className={`${buttonContainer} absolute top-0 right-0 w-full h-full z-50`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex items-center justify-evenly w-full h-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}>
            <a
              target="_blank"
              href={
                'https://drive.google.com/file/d/1YqIv0xOL4vOygI448JKCzKTkLHONxg8L/view?usp=sharing'
              }
              onClick={() => trackResumeEvent('view')}>
              <button
                className={`${buttonClass} gap-3 bg-[linear-gradient(110deg,#1e40af,45%,#2563eb,55%,#1e40af)] border-white/30 animate-duration-[5000ms]`}>
                <span className="text-white dark:text-white">View</span>{' '}
                <FaExternalLinkAlt className="h-5 w-5 text-white dark:text-white" />
              </button>
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1YqIv0xOL4vOygI448JKCzKTkLHONxg8L"
              download="Nathan_Watkins_Resume"
              onClick={() => trackResumeEvent('download')}>
              <button
                className={`${buttonClass} gap-2 bg-[linear-gradient(40deg,#1e40af,45%,#2563eb,55%,#1e40af)] border-white/30 animate-duration-[6000ms]`}>
                <span className="text-white dark:text-white font-normal">Download</span>
                <IoMdDownload className="h-6 w-6 text-white dark:text-white" />
              </button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ResumeButtons
