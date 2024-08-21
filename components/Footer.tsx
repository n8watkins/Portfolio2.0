import { FaLocationArrow, FaXTwitter } from 'react-icons/fa6'

import MagicButton from './ui/MagicButton'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'

const Footer = () => {
  return (
    <footer className="xl:max-w-5xl m-auto pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img src="/footer-grid.svg" alt="grid" className="w-full h-full opacity-50 " />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to bring <span className="lg:block text-purple-500">fresh talent</span> to your
          team?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Let&apos;s connect and explore how I can add value to your team.
        </p>
        <a href="mailto:nathancwatkins@gmail.com">
          <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col-reverse justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Nathan Watkins
        </p>

        <div className="flex items-center justify-center pb-2 gap-3 z-50">
          <a href="https://github.com/natkins23" target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900">
              <FiGithub className="w-full h-full p-3" />
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/nathancwatkins/"
            target="_blank"
            rel="noopener noreferrer">
            <div className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900">
              <CiLinkedin className="w-full h-full p-2" />
            </div>
          </a>
          <a href="https://x.com/nathancwatkins" target="_blank" rel="noopener noreferrer">
            <div className="w-12 h-12 rounded-full hover:bg-blue-300/30 dark:hover:bg-slate-900">
              <FaXTwitter className="w-full h-full p-3" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
