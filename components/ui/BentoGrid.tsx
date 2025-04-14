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
  img,
  imgClassName,
  titleClassName,
  textContainerClassName,
  imgContainerClass,
  descriptionClass,
  textOrder,
  buttonClass,
  buttonContainer,
  gridItemContainer,
}: {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  id?: number
  img: string
  titleClassName: string
  imgClassName: string
  textContainerClassName?: string
  imgContainerClass?: string
  descriptionClass?: string
  textOrder?: string
  buttonClass?: string
  buttonContainer?: string
  gridItemContainer?: string
}) => {
  const { theme } = useTheme()

  

  return (
    <div
      className={cn(
        'flex w-full h-full rounded-3xl relative group  dark:border-white/[0.2]  bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400 border dark:from-[#020621] dark:via-darkBlue dark:to-[#020621] overflow-hidden  select-none',
        gridItemContainer
      )}>
      {
        //backgrounds
        (id === 1 && (
          <div className="relative w-full h-full overflow-hidden">
            <GridPattern className="absolute inset-0 z-10" />
            <div className={`relative z-30 ${imgContainerClass}`}>
              <Image
                src={img}
                fill
                sizes='100%'
                className={`rounded-3xl ${imgClassName}`}
                alt="Bento grid image"
              />
            </div>
          </div>
        )) ||
          ((id === 4 || id == 2) && (
            <div className="relative w-full h-full overflow-hidden">
              <div className={`  ${imgContainerClass} `}>
              <Image src={`${img}`} fill sizes='100%' className={` ${imgClassName} `} alt={img} />
              </div>
            </div>
          )) ||
          (id == 6 && (
            <div className={`  ${imgContainerClass} `}>
              <Image src={`${img}`} fill sizes='100%'  className={` ${imgClassName} `} alt={img} />
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
          <div className={` ${descriptionClass}`}>{description}</div>
        </div>
        {id === 4 && <ResumeButtons buttonClass={buttonClass} buttonContainer={buttonContainer} />}
        {id === 6 && (
          <div className=" flex relative items-start justify-center w-2/5 h-full pl-10 1md:pl-5 1lg:pl-1  pt-5 1md:pt-10  lg:right-3  xl:pt-20 xl:right-5 xl:items-center">
            <div className="flex  items-center justify-center">
              <ScrollButton
                link="projects"
                className=" lg:h-14  w-fit whitespace-nowrap 1md:w-40"
                text="Check it out!"
              />
            </div>
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
