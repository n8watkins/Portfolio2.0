'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid'
import { gridItems } from '@/data/grid'
import { useTheme } from 'next-themes'
import { staggerContainerVariants, defaultAnimationConfig } from '@/lib/animations'

const Grid = () => {
  const { theme } = useTheme()
  return (
    <section id="about" className="mb-10">
      <motion.div
        variants={staggerContainerVariants}
        {...defaultAnimationConfig}
      >
        <BentoGrid className=" ">
          {gridItems.map((item, i) => (
            <BentoGridItem key={item.id} {...item} />
          ))}
        </BentoGrid>
      </motion.div>
    </section>
  )
}

export default Grid
