'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

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

  // Auto-cycling behavior — paused when the user prefers reduced motion.
  useEffect(() => {
    const shouldAutoCycle = isModalOpen && !isHovered && !prefersReducedMotion

    if (!shouldAutoCycle) return

    const interval = setInterval(nextSlide, AUTO_SLIDE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [isModalOpen, isHovered, nextSlide, prefersReducedMotion])

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
                    className="absolute inset-0 select-none"
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-sky-100 dark:from-gray-800 dark:to-gray-900 rounded-xl animate-pulse flex items-center justify-center">
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

        </div>
        </div>

        {/* === Fixed-position indicators BELOW image === */}
        <div className="mt-2 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1} of ${images.length}`}
              aria-current={index === currentIndex}
              className={`h-1.5 w-8 rounded-full cursor-pointer transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1f50] ${
                index === currentIndex ? 'bg-blue-500' : 'bg-white/60'
              }`}
            />
          ))}
        </div>

    </>
  );
};

ImageSlider.displayName = 'ImageSlider'

export default ImageSlider
