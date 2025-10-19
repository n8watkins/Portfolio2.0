'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { staggerItemVariants } from '@/lib/animations'
import type { GridItemConfig } from '@/lib/types/gridItem'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'grid  grid-cols-2 grid-rows-11  auto-rows-[5rem]  md:auto-rows-[7rem] lg:auto-rows-[8rem] sm:grid-rows-20 md:grid-cols-4 md:grid-rows-7 xl:auto-rows-[5rem] lg:grid-rows-8 gap-5 md:gap-7 lg:gap-8   max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl lg:m-auto mx-auto pt-40 lg:pt-0',
        className
      )}>
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  title,
  description,
  titleClassName,
  textContainerClassName,
  descriptionClass,
  textOrder,
  gridItemContainer,
  renderBackground,
  renderContent,
  renderForeground,
}: GridItemConfig) => {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={cn(
        'flex w-full h-full rounded-3xl relative group  dark:border-white/[0.2]  bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400 border dark:from-[#020621] dark:via-darkBlue dark:to-[#020621] overflow-hidden  select-none',
        gridItemContainer
      )}>
      {/* Background layer - data-driven */}
      {renderBackground?.()}

      {/* Content layer - data-driven */}
      <div className={`absolute z-[500]   ${textContainerClassName}`}>
        {renderContent?.()}

        <div className={` ${textOrder}  `}>
          {title && <div className={` ${titleClassName} `}>{title}</div>}
          {description && <div className={` ${descriptionClass}`}>{description}</div>}
        </div>
      </div>

      {/* Foreground layer - data-driven */}
      {renderForeground?.()}
    </motion.div>
  )
}
