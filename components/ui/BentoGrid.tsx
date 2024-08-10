'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { CiLinkedin, CiLocationOn } from 'react-icons/ci'
import { FaLinkedin, FaLocationDot, FaXTwitter } from 'react-icons/fa6'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import MapDetails from './BentoComponents/MapDetails'
import GridPattern from '../magicui/grid-pattern'
import { TechStack } from '../TechStack'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import ResumeButtons from './BentoComponents/ResumeButtons'
import EmailButton from './BentoComponents/EmailButton'
import { BackgroundGradientAnimation } from './background-gradient-animation'
import { FiGithub } from 'react-icons/fi'
import { TiSocialLinkedin } from 'react-icons/ti'
import MapAnimation from './BentoComponents/MapAnimations'

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
        'grid  grid-cols-2 grid-rows-11 2xl:bg-yellow-500 xl:bg-purple-600 lg:bg-green-500 md:bg-red-500 sm:bg-orange-500 bg-teal-500 auto-rows-[5rem]  md:auto-rows-[7rem] lg:auto-rows-[8rem] sm:grid-rows-20 md:grid-cols-4 md:grid-rows-7 xl:auto-rows-[10rem] lg:grid-rows-12 gap-2 lg:gap-7  max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-4xl 2xl:max-w-5xl lg:m-auto mx-auto ',
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
          </div>
        )) ||
          ((id === 4 || id == 5 || id == 2) && (
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
        <div className={` ${textOrder} `}>
          <div className={` ${titleClassName}`}>{title}</div>
          <div className={`${descriptionClass}`}>{description}</div>
        </div>
        {id === 4 && <ResumeButtons buttonClass={buttonClass} buttonContainer={buttonContainer} />}
      </div>

      <div>
        {
          //forground images
          (id === 3 && <TechStack />) ||
            (id === 1 && (
              <div className={`absolute z-30 ${imgContainerClass} border-none`}>
                <Image
                  src={lightImg}
                  fill
                  className={`${theme === 'dark' && `hidden`} ${imgClassName} `}
                  alt={lightImg}
                />
                <Image
                  src={darkImg}
                  fill
                  className={`${theme === 'light' && `hidden`} ${imgClassName} `}
                  alt={darkImg}
                />
              </div>
            )) ||
            (id === 7 && (
              <div className="absolute w-full h-full">
                <EmailButton buttonClass={buttonClass} buttonContainer={buttonContainer} />
              </div>
            )) ||
            (id === 2 && <div className="z-50"></div>)
        }
      </div>
    </div>
  )
}
