import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Marquee from '@/components/magicui/marquee'

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string
    name: string
    title: string
    image: string
  }[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getSpeedValue = () => {
    switch (speed) {
      case 'fast':
        return '20s'
      case 'normal':
        return '40s'
      case 'slow':
        return '80s'
      default:
        return '40s'
    }
  }

  return (
    <div
      className={cn(
        'scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}>
      <Marquee
        className="py-4"
        reverse={direction === 'right'}
        pauseOnHover={pauseOnHover}
        style={{ '--duration': getSpeedValue() } as React.CSSProperties}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              'w-[90vw] max-w-full mx-2 relative rounded-2xl border border-slate-800 flex-shrink-0 px-5 py-5 md:p-16 md:w-[55vw] xl:w-[48vw] 2xl:w-[43vw] bg-blue-500 dark:bg-[rgb(4,7,29)] transition-transform duration-300',
              hoveredIndex === idx ? 'scale-103' : ''
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <blockquote className="flex flex-col justify-stretch items-start ">
              <span className="relative z-20 min-h-20 xl:min-h-24 2xl:min-h-28 text-sm md:text-lg xl:text-2xl 2xl:text-3xl leading-[1.6] text-white font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <div className="me-3 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 relative">
                  <Image
                    src={item.image}
                    alt={`Profile picture of ${item.name}`}
                    fill
                    sizes="(max-width: 768px) 56px, (max-width: 1024px) 64px, (max-width: 1280px) 80px, (max-width: 1536px) 96px, 112px"
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold leading-[1.6] text-white">{item.name}</span>
                  <span className="text-sm md:text-base xl:text-lg 2xl:text-xl leading-[1.6] text-white font-normal">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
