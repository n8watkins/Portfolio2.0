import React from 'react'
import Image from 'next/image'
import GridBackground from './ui/GridBackground'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'
import { FaXTwitter } from 'react-icons/fa6'
import dynamic from 'next/dynamic'

const ScrollButton = dynamic(() => import('./ui/BentoComponents/ScrollButton'), { ssr: false })

const Hero = () => {
  return (
    <div
      className="relative flex flex-col h-[85vh] items-center justify-center bg-blue-400 dark:bg-darkBlue transition-bg select-none"
      id="home">
      <GridBackground />
      <div className="max-w-[100vw] h-[85vh] md:max-w-2xl lg:max-w-[70vw] flex flex-col items-center justify-center z-50">
        <p className="uppercase tracking-widest pb-2 1lg:pb-5 md:pb-10 pt-40  sm:pt-40 md:pt-10 text-base md:text-xl text-center text-darkBlue font-semibold dark:font-normal dark:text-white max-w-80">
          <span>Code.</span>{' '}
          <span>Create.</span>{' '}
          <span>Innovate.</span>
        </p>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full gap-3 md:gap-5  ">
          <div className="flex max-w-[100vw] md:max-w-2xl lg:max-w-[60vw] flex-col items-start gap-2 md:gap-3  ">
            <h1 className="text-center md:text-start w-full justify-start text-5xl md:text-5xl lg:text-6xl font-semibold">
              Hi, I&apos;m <span className="text-purple-500">Nathan</span>
            </h1>
            <p className="text-center md:text-start w-full pl-1 md:tracking-wider text-2xl md:text-lg lg:text-2xl font-semibold dark:font-normal">
              A Next.js Developer
            </p>
            <div className="flex items-center justify-center md:justify-start w-full">
              <nav aria-label="Social media links" className="relative md:top-0 md:-left-2 z-50">
                <div className="flex items-center justify-center pb-2 gap-3">
                  <a
                    href="https://github.com/n8watkins"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Nathan's GitHub profile"
                    className="w-12 h-12 rounded-full hover:bg-blue-500/60 dark:hover:bg-slate-700/70 focus:outline-none focus:bg-transparent active:bg-transparent transition-all duration-200"
                  >
                    <FiGithub className="w-full h-full p-3" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/n8watkins/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Nathan's LinkedIn profile"
                    className="w-12 h-12 rounded-full hover:bg-blue-500/60 dark:hover:bg-slate-700/70 focus:outline-none focus:bg-transparent active:bg-transparent transition-all duration-200"
                  >
                    <CiLinkedin className="w-full h-full p-2" aria-hidden="true" />
                  </a>
                  <a
                    href="https://x.com/n8watkins"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Nathan's X (Twitter) profile"
                    className="w-12 h-12 rounded-full hover:bg-blue-500/60 dark:hover:bg-slate-700/70 focus:outline-none focus:bg-transparent active:bg-transparent transition-all duration-200"
                  >
                    <FaXTwitter className="w-full h-full p-3" aria-hidden="true" />
                  </a>
                </div>
              </nav>
            </div>
            <div className="flex w-full items-center md:justify-start justify-center ">
              <ScrollButton link="about" text="See more" className="" />
            </div>
          </div>
          <div className="w-[17rem] h-[17rem] 1sm:w-[20rem] 1sm:h-[20rem] relative">
            <div className="aspect-square w-full h-full relative">
              <div className="absolute inset-0 dark:bg-black/20 rounded-full z-10"></div>
              <Image
                src="/hero/portrait.jpg"
                className="rounded-full object-cover"
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 320px) 17rem, (max-width: 768px) 17rem, 20rem"
                alt="Professional headshot of Nathan Watkins, a Next.js developer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
