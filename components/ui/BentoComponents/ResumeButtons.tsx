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
          className={`${buttonClass} gap-3 bg-[linear-gradient(1100deg,#000103,45%,#1e2631,55%,#000103)] animate-duration-[4000ms]`}>
          <span className="text-black dark:text-white font-semibold dark:font-normal   ">View</span>{' '}
          <FaExternalLinkAlt className="text-black dark:text-white " />
        </button>
      </a>
      <a
        href="https://drive.google.com/uc?export=download&id=16FFjyX8zjzu-D8XQbqeQK6PFpXCm6t_s"
        download="Nathan_Watkins_NextJS_Resume">
        <button
          className={`${buttonClass} gap-3 bg-[linear-gradient(330deg,#000103,45%,#1e2631,55%,#000103)] animate-duration-[4000ms]`}>
          <span className="text-black dark:text-white font-semibold dark:font-normal   ">
            Download
          </span>
          <IoMdDownload className="text-black dark:text-white" />
        </button>
      </a>
    </div>
  )
}

export default ResumeButtons
