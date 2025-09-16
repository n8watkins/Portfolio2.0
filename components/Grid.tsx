'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
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
          {gridItems.map(
            (
              {
                id,
                gridItemContainer,
                title,
                description,
                img,
                imgClassName,
                titleClassName,
                textContainerClassName,
                imgContainerClass,
                descriptionClass,
                textOrder,
                buttonClass,
                buttonContainer,
              },
              i
            ) => {
              return (
                <BentoGridItem
                  id={id}
                  key={i}
                  index={i}
                  gridItemContainer={gridItemContainer}
                  title={title}
                  description={description}
                  img={img}
                  imgClassName={imgClassName}
                  titleClassName={titleClassName}
                  textContainerClassName={textContainerClassName}
                  imgContainerClass={imgContainerClass}
                  descriptionClass={descriptionClass}
                  textOrder={textOrder}
                  buttonClass={buttonClass}
                  buttonContainer={buttonContainer}
                />
              )
            }
          )}
        </BentoGrid>
      </motion.div>
    </section>
  )
}

export default Grid
