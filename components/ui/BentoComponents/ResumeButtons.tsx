import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'

interface ResumeButtonsProps {
  buttonContainer?: string
  buttonClass?: string
}

const ResumeButtons: React.FC<ResumeButtonsProps> = ({ buttonContainer, buttonClass }) => {
  return (
    <div className={`${buttonContainer} absolute top-0 right-0 w-full h-full z-50`}>
      <a
        target="_blank"
        href={'https://drive.google.com/file/d/16FFjyX8zjzu-D8XQbqeQK6PFpXCm6t_s/view?usp=sharing'}>
        {
          // lighter value bg-[linear-gradient(110deg,#395bbf,45%,#5b93f5,55%,#3956a8)]
        }
        <button
          className={`${buttonClass} gap-3  bg-[linear-gradient(110deg,#1e40af,45%,#2563eb,55%,#1e40af)] border-white/30  animate-duration-[5000ms]`}>
          <span className="text-white dark:text-white    ">View</span>{' '}
          <FaExternalLinkAlt className="h-5 w-5 text-white dark:text-white " />
        </button>
      </a>
      <a
        href="https://drive.google.com/uc?export=download&id=16FFjyX8zjzu-D8XQbqeQK6PFpXCm6t_s"
        download="Nathan_Watkins_NextJS_Resume">
        <button
          className={`${buttonClass} gap-2   bg-[linear-gradient(40deg,#1e40af,45%,#2563eb,55%,#1e40af)] border-white/30  animate-duration-[6000ms]`}>
          <span className="text-white dark:text-white font-normal   ">Download</span>
          <IoMdDownload className="h-6 w-6 text-white dark:text-white" />
        </button>
      </a>
    </div>
  )
}

export default ResumeButtons
