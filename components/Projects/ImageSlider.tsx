'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IoMdClose } from 'react-icons/io'
import { BorderBeam } from '../magicui/border-beam'

const AUTO_SLIDE_INTERVAL_MS = 4000

interface ImageSliderProps {
  images: string[]
  isModalOpen: boolean
  projectTitle: string
  projectId: number
}

/**
 * ImageSlider component for project screenshots
 *
 * Features:
 * - Auto-cycling behavior (configurable interval)
 * - Intersection observer for lazy loading
 * - Keyboard navigation (Arrow keys, Escape)
 * - Fullscreen modal view with z-[10002] (above ProjectModal)
 * - Touch-friendly navigation
 */
const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  isModalOpen,
  projectTitle,
  projectId
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const currentElement = containerRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
      observer.disconnect()
    }
  }, [])

  // Auto-cycling behavior
  useEffect(() => {
    const shouldAutoCycle = (isModalOpen || isImageModalOpen) && !isHovered

    if (!shouldAutoCycle) return

    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [isModalOpen, isImageModalOpen, isHovered, nextSlide])

  const handleImageClick = () => {
    setIsImageModalOpen(true)
  }

  const handleCloseModal = useCallback(() => {
    setIsImageModalOpen(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!isImageModalOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'Escape') {
        e.stopPropagation() // Prevent closing parent modal
        handleCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isImageModalOpen, prevSlide, nextSlide, handleCloseModal])

  return (
    <>
      {/* === Details Page View === */}
      <div className="flex flex-col items-center w-full select-none">
        {/* === Image container === */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Persistent wrapper div with the ref */}
          <div className="absolute inset-0" >
            {isVisible ? (
              <div className="absolute inset-0">
                <AnimatePresence initial={false} custom={currentIndex}>
                  <motion.div
                    key={currentIndex}
                    custom={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 select-none cursor-zoom-in"
                    onClick={handleImageClick}
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="rounded-xl object-cover select-none"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
              </div>
            )}
          </div>

          {/* Arrows - positioned to overlay only on the screenshot */}
          <div className="absolute left-0 top-0 bottom-0 w-1/6 rounded-tl-xl rounded-bl-xl">
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Previous image">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/6 rounded-tr-xl rounded-br-xl">
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Next image">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Expand icon */}
          <div className="absolute bottom-2 right-2 z-10">
            <button onClick={handleImageClick} className="flex items-center gap-1 text-white bg-black/60 px-2 py-1 rounded hover:bg-black/80" aria-label="Expand image to fullscreen">
              <span className="text-sm">Expand</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75V4.5h5.25M14.25 19.5h5.25v-5.25M19.5 4.5l-6 6M4.5 19.5l6-6" />
              </svg>
            </button>
          </div>
        </div>
        </div>

        {/* === Fixed-position indicators BELOW image === */}
        <div className="mt-2 flex justify-center gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* === End of Details Page View === */}

      {/* === Image Gallery Modal === */}
      <AnimatePresence>
        {isImageModalOpen && (
          <div className="fixed inset-0 z-[10002] flex flex-col items-center justify-center bg-black/80" onClick={handleCloseModal}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex flex-col items-center gap-4"
            >
              {/* Close button - positioned absolute to viewport */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 p-2 sm:p-3 text-white rounded-full flex items-center justify-center transition-all duration-200 z-10 border-2 border-white/50"
                aria-label="Close image viewer"
              >
                <IoMdClose size={20} className="sm:hidden" aria-hidden="true" />
                <IoMdClose size={24} className="hidden sm:block" aria-hidden="true" />
              </button>

              {/* Image container with chevrons */}
              <div className="relative w-[95vw] sm:w-[85vw] md:w-[70vw] lg:w-[60vw] xl:w-[55vw] aspect-video">
                <Image
                  src={images[currentIndex]}
                  alt={`${projectTitle} screenshot ${currentIndex + 1} - fullscreen view`}
                  fill
                  sizes="100vw"
                  className="object-cover select-none rounded-xl"
                  priority={currentIndex === 0 && isImageModalOpen}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />

                {/* Left chevron - overlaid on image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-blue-500/70 p-2 sm:p-3 rounded-full sm:hover:bg-blue-400/80 sm:hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="Previous image"
                  disabled={images.length <= 1}
                >
                  <ChevronLeft size={20} className="sm:hidden" aria-hidden="true" />
                  <ChevronLeft size={32} className="hidden sm:block" aria-hidden="true" />
                </button>

                {/* Right chevron - overlaid on image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-blue-500/70 p-2 sm:p-3 rounded-full sm:hover:bg-blue-400/80 sm:hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label="Next image"
                  disabled={images.length <= 1}
                >
                  <ChevronRight size={20} className="sm:hidden" aria-hidden="true" />
                  <ChevronRight size={32} className="hidden sm:block" aria-hidden="true" />
                </button>
              </div>

              {/* Pagination dots - directly below image */}
              <div className="flex gap-2 sm:gap-5 transition-all duration-300">
                {images.map((_, index) => (
                  <div
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`h-1.5 w-6 sm:h-2 sm:w-10 rounded-full cursor-pointer transition-colors duration-200 ${
                      index === currentIndex ? 'bg-blue-500' : 'bg-white/80'
                    }`}
                  />
                ))}
              </div>

              {/* Keyboard Hint */}
              <div className="hidden sm:flex absolute -bottom-16 text-white/70 text-sm items-center gap-3 pointer-events-none">
                <div className="flex items-center gap-1">
                  <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">←</kbd>
                  <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">→</kbd>
                  <span className="ml-1">to navigate</span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">esc</kbd>
                  <span className="ml-1">to close</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

ImageSlider.displayName = 'ImageSlider'

export default ImageSlider
