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
              'w-[90vw] max-w-full mx-2 relative rounded-2xl border border-slate-800 flex-shrink-0 px-4 py-4 md:p-10 md:w-[50vw] xl:w-[42vw] 2xl:w-[38vw] bg-blue-500 dark:bg-[rgb(4,7,29)] transition-transform duration-300',
              hoveredIndex === idx ? 'scale-103' : ''
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <blockquote className="flex flex-col justify-stretch items-start ">
              <span className="relative z-20 min-h-20 xl:min-h-24 2xl:min-h-28 text-sm md:text-base xl:text-xl 2xl:text-2xl leading-[1.6] text-white font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <div className="me-3 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 relative">
                  <Image
                    src={item.image}
                    alt={`Profile picture of ${item.name}`}
                    fill
                    sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, (max-width: 1280px) 64px, (max-width: 1536px) 80px, 96px"
                    style={{ objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <span className="flex flex-col gap-1">
                  <span className="text-lg md:text-xl xl:text-2xl 2xl:text-3xl font-bold leading-[1.6] text-white">{item.name}</span>
                  <span className="text-xs md:text-sm xl:text-base 2xl:text-lg leading-[1.6] text-white font-normal">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
