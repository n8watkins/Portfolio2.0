'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const AUTO_INTERVAL_MS = 4000

interface CardImageCarouselProps {
  images: string[]
  alt: string
  onClick?: () => void
}

/**
 * Wide, short image banner that auto-cycles through a project's screenshots with
 * a crossfade. Pauses on hover and on prefers-reduced-motion; the dots jump
 * directly to an image. Kept deliberately short so the card stays text-forward.
 */
export default function CardImageCarousel({ images, alt, onClick }: CardImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const current = images.length ? index % images.length : 0

  useEffect(() => {
    if (images.length <= 1 || paused || prefersReducedMotion) return
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), AUTO_INTERVAL_MS)
    return () => clearInterval(id)
  }, [images.length, paused, prefersReducedMotion])

  if (images.length === 0) return null

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group/img relative w-full h-52 sm:h-60 md:h-64 rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900/40 shadow-lg shadow-black/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0">
          <Image
            src={images[current]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-center select-none group-hover/img:scale-[1.03] transition-transform duration-700"
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === current}
                onClick={(e) => {
                  e.stopPropagation()
                  setIndex(i)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  i === current ? 'w-5 bg-sky-400' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
