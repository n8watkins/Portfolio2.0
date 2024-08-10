'use client'
import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { useTheme } from 'next-themes'

const Grid = () => {
  const { theme } = useTheme()
  return (
    <section id="about" className="mb-10">
      <BentoGrid className=" ">
        {gridItems.map(
          (
            {
              id,
              gridItemContainer,
              title,
              description,
              lightImg,
              darkImg,
              imgClassName,
              titleClassName,
              textContainerClassName,
              imgContainerClass,
              spareImg,
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
                gridItemContainer={gridItemContainer}
                title={title}
                description={description}
                lightImg={lightImg}
                darkImg={darkImg}
                imgClassName={imgClassName}
                titleClassName={titleClassName}
                textContainerClassName={textContainerClassName}
                imgContainerClass={imgContainerClass}
                spareImg={spareImg}
                descriptionClass={descriptionClass}
                textOrder={textOrder}
                buttonClass={buttonClass}
                buttonContainer={buttonContainer}
              />
            )
          }
        )}
      </BentoGrid>
    </section>
  )
}

export default Grid
