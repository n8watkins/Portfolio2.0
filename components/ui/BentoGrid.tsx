'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import MapDetails from './BentoComponents/MapDetails'
import GridPattern from '../magicui/grid-pattern'
import { TechStack } from '../TechStack'
import ResumeButtons from './BentoComponents/ResumeButtons'
import EmailButton from './BentoComponents/EmailButton'
import ScrollButton from './BentoComponents/ScrollButton'

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    //2xl:bg-yellow-500 xl:bg-purple-600 lg:bg-green-500 md:bg-red-500 sm:bg-orange-500 bg-teal-500
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
  id,
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
  gridItemContainer,
}: {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  id?: number
  lightImg: string
  darkImg: string
  titleClassName: string
  imgClassName: string
  textContainerClassName?: string
  imgContainerClass?: string
  spareImg: string
  descriptionClass?: string
  textOrder?: string
  buttonClass?: string
  buttonContainer?: string
  gridItemContainer?: string
}) => {
  const { theme } = useTheme()

  {
    //removed? hover:shadow-xl transition  shadow-input dark:shadow-none
  }

  return (
    <div
      className={cn(
        'flex w-full h-full rounded-3xl relative group dark:bg-[#020621] dark:border-white/[0.2] bg-blue-500 border  overflow-hidden  ',
        gridItemContainer
      )}>
      {
        //backgrounds
        (id === 1 && (
          <div className="">
            <GridPattern className="z-20" />
            <div className={`  z-30 ${imgContainerClass} border-none`}>
              <Image src={lightImg} fill className={` ${imgClassName} `} alt={lightImg} />
            </div>
          </div>
        )) ||
          ((id === 4 || id == 2) && (
            <div className={`  ${imgContainerClass} `}>
              <Image src={lightImg} fill className={` ${imgClassName} `} alt={lightImg} />
            </div>
          )) ||
          (id == 6 && (
            <div className={`  ${imgContainerClass} `}>
              <Image src={lightImg} fill className={` ${imgClassName} `} alt={lightImg} />
            </div>
          ))
      }

      {
        //text Container
      }
      <div className={`absolute z-[500]   ${textContainerClassName}`}>
        {id === 2 && (
          <div>
            <MapDetails />
          </div>
        )}
        <div className={` ${textOrder}  `}>
          <div className={` ${titleClassName} `}>{title}</div>
          <div className={`${descriptionClass}`}>{description}</div>
        </div>
        {id === 4 && <ResumeButtons buttonClass={buttonClass} buttonContainer={buttonContainer} />}
        {id === 6 && (
          <div className="w-2/5 h-full 1sm:bottom-5 1sm:pl-10  1md:bottom-4 1md:pl-5  1lg:bottom-3 1lg:pl-1  md:bottom-0  lg:top-5  lg:right-3  item-center justify-center flex relative ">
            <ScrollButton link="projects" className=" lg:h-14 w-40" text="Check it out!" />
          </div>
        )}
      </div>

      {
        //forground images
      }
      <div className="">
        {(id === 3 && <TechStack />) ||
          (id === 5 && (
            <div className="absolute w-full h-full">
              <EmailButton buttonClass={buttonClass} buttonContainer={buttonContainer} />
            </div>
          ))}
      </div>
    </div>
  )
}
