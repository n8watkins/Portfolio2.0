import React from 'react'
import { FaArrowDown } from 'react-icons/fa6'
import { Link } from 'react-scroll'

interface ScrollButtonProps {
  text: string
  link: string
  className: string
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ text, link, className }) => {
  return (
    <div className={` flex items-center justify-center`}>
      <Link to={link} className="inline-block">
        <button
          className={`h-12 ${className} relative group inline-flex  overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 transform transition-transform duration-300 hover:scale-105`}>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md text-darkBlue dark:text-white font-semibold bg-gradient-to-br  from-blue-400 via-purple-300 to-blue-400 dark:from-darkBlue dark:via-blue-950 dark:to-darkBlue px-5 py-2 text-base  backdrop-blur-3xl gap-3">
            <span className="group-hover:translate-y-20 text-center transition duration-300">
              <span>{text}</span>
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
  )
}

export default ScrollButton
