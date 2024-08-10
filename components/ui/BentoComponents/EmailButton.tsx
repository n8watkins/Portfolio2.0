'use client'
import React, { useState } from 'react'
import { MdContentCopy } from 'react-icons/md'
import { BackgroundGradientAnimation } from '../background-gradient-animation'
import Lottie from 'react-lottie'
import animationData from '../../../data/confetti.json'

interface ResumeButtonsProps {
  buttonContainer?: string
  buttonClass?: string
}

const EmailButton: React.FC<ResumeButtonsProps> = ({ buttonContainer, buttonClass }) => {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const handleEmailClick = () => {
    navigator.clipboard.writeText('nathancwatkins23@gmail.com').then(() => {
      if (!copiedEmail) {
        setCopiedEmail(true)
        setAnimationKey((prevKey) => prevKey + 1)
      }
      setTimeout(() => {
        setCopiedEmail(false)
      }, 5000)
    })
  }
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <div className="">
      <BackgroundGradientAnimation className="h-full pb-32">
        <div className="z-50 flex justify-center  text-2xl pt-5  font-sans font-bold ">
          <h2 className="">Have a Project? Let&apos;s connect! </h2>
        </div>
        <div key={animationKey} className="absolute top-0 left-0 w-full h-full z-50">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <div className={`${buttonContainer} `}>
          <button
            className={`${buttonClass} gap-3 bg-[linear-gradient(1100deg,#000103,45%,#1e2631,55%,#000103)] animate-duration-[4000ms] `}
            onClick={handleEmailClick}>
            <span className="text-black dark:text-white font-semibold dark:font-normal   ">
              {copiedEmail ? 'Copied!' : 'Copy Email'}
            </span>{' '}
            <MdContentCopy className="text-black dark:text-white " />
          </button>
        </div>
      </BackgroundGradientAnimation>
    </div>
  )
}

export default EmailButton
