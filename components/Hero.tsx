'use client'
import React from 'react'
import { AuroraBackground } from './ui/aurora-background'
import { ModeToggle } from './ModeToggle'
import Image from 'next/image'
import { FaArrowDown, FaLocationArrow } from 'react-icons/fa'
import { Link } from 'react-scroll'
import GridBackground from './ui/GridBackground'
import next from 'next'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'
import { FaXTwitter } from 'react-icons/fa6'
const Hero = () => {
  return (
    <div className="" id="home">
      <AuroraBackground>
        {
          // GRID AND DOT BACKGROUND
        }
        <GridBackground />
        <div className="max-w-[100vw] h-[85vh] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center z-50">
          <p className="uppercase tracking-widest pb-10 pt-20 text-xl text-center text-darkBlue font-semibold dark:font-normal dark:text-white max-w-80">
            <span className="animate-fade-right animate-delay-[2000ms] ">Code.</span>{' '}
            <span className="animate-fade-right animate-delay-[2500ms]">Create.</span>{' '}
            <span className="animate-fade-right animate-delay-[3000ms] ">Innovate.</span>
          </p>
          <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full gap-10">
            <div className="flex max-w-[100vw] md:max-w-2xl lg:max-w-[60vw]  flex-col items-start gap-3 ">
              <h1 className="  text-start justify-start text-[40px] md:text-5xl lg:text-6xl animate-fade-right animate-delay-[3500ms] ">
                Hi, I&apos;m Nathan
              </h1>{' '}
              <p className="  pl-1 md:tracking-wider  text-sm md:text-lg lg:text-2xl animate-fade-up animate-delay-[4000ms] font-semibold dark:font-normal ">
                A Next.js Developer
              </p>
              <div className="relative ">
                <div className="absolute top-0 -left-2  z-50">
                  <div className="flex items-center justify-center pb-2 gap-3">
                    <a href="https://github.com/natkins23" target="_blank">
                      <div className="w-12 h-12 rounded-full hover:bg-slate-900">
                        <FiGithub className="w-full h-full p-3  " />
                      </div>
                    </a>
                    <a href="https://www.linkedin.com/in/nathancwatkins/" target="_blank">
                      <div className="w-12 h-12 rounded-full hover:bg-slate-900">
                        <CiLinkedin className=" w-full h-full p-2  " />
                      </div>
                    </a>
                    <a href="https://x.com/nathancwatkins" target="_blank">
                      <div className="w-12 h-12 rounded-full hover:bg-slate-900">
                        <FaXTwitter className="w-full h-full p-3  " />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="about" className="animate-fade-up animate-delay-[4000ms] ">
                <button className="relative mt-12 group inline-flex h-12 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 transform transition-transform duration-300 hover:scale-105 ">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-blue-600 dark:bg-darkBlue px-5 py-2 text-base font-medium text-white backdrop-blur-3xl gap-3">
                    <span className="group-hover:translate-y-20 text-center transition duration-300">
                      <span>See more</span>
                    </span>
                    <div className="-translate-y-20 group-hover:translate-y-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                      <div className="pt-2 animate-bounce animate-infinite animate-duration-[600ms]">
                        <FaArrowDown />
                      </div>
                    </div>
                  </span>
                </button>
              </Link>
            </div>
            <div className="w-[20rem] h-[20rem] relative rounded-full ">
              <div className="relative w-full h-full dark:bg-black/20 animate-delay-[3500ms] animate-fade-left rounded-full z-50"></div>
              <Image
                src="/portrait.jpg"
                className="rounded-full animate-fade-left z-40 animate-delay-[3500ms]"
                fill
                alt="Nathan's portrait"
              />
            </div>
          </div>
        </div>{' '}
      </AuroraBackground>
    </div>
  )
}

export default Hero
