import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { RxExternalLink } from 'react-icons/rx'

import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { projects } from '@/data'
import { Project } from '@/lib/types'

const Projects: React.FC = () => {
  const [isIconsLoading, setIsIconsLoading] = useState(true)
  const [isLargeDevice, setIsLargeDevice] = useState(false)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    const checkDeviceAndMouse = () => {
      setIsLargeDevice(window.innerWidth >= 768)
      setHasMouse(window.matchMedia('(pointer:fine)').matches)
    }

    checkDeviceAndMouse()
    window.addEventListener('resize', checkDeviceAndMouse)

    // Simulate loading delay for icons
    const timer = setTimeout(() => {
      setIsIconsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener('resize', checkDeviceAndMouse)
      clearTimeout(timer)
    }
  }, [])

  const handleProjectClick = (url: string) => {
    if (isLargeDevice && hasMouse) {
      window.open(url, '_blank')
    }
  }

  return (
    <div
      id="projects"
      className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200">
      <h1 className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200">
        A small selection of <span className="text-purple-500 lg:inline">recent projects</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5 xl:gap-14">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center sm:h-[40rem] md:h-[35rem] lg:h-[38rem] xl:h-[38rem] 2xl:h-[39rem] 1sm:p-3 sm:p-5 md:p-4 lg:p-5 xl:p-4 h-full w-full rounded-xl col-span-1 row-span-1 border auto-rows-[10rem] border-white/[.2] shadow-md group">
            <div className="relative 1sm:w-[19rem] 1sm:h-[14rem] 1md:w-[22rem] 1md:h-[15rem] 1lg:w-[25rem] 1lg:h-[17rem] sm:h-[25rem] sm:w-[32rem] md:w-[21rem] md:h-[15rem] md:mt-0 md:pt-0 lg:w-[24rem] lg:h-[21rem] xl:w-[27rem] xl:h-[20rem] 2xl:w-[31rem] rounded-xl mb-4">
              <div
                onClick={() => handleProjectClick(project.liveSite)}
                className={`rounded-xl flex flex-row h-full w-full ${
                  isLargeDevice && hasMouse ? 'cursor-pointer' : ''
                }`}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className={`rounded-xl peer ${
                    isLargeDevice && hasMouse ? 'hover:scale-105' : ''
                  } duration-200`}
                />
              </div>
            </div>
            <div className="relative flex flex-col w-full space-y-2 xl:px-4">
              <div className="text-xl font-sans font-bold">{project.title}</div>
              <div>{project.des}</div>
              <IconCycle technologies={project.technologies} isIconsLoading={isIconsLoading} />
              <div className="flex flex-row justify-between pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center">
                  <FiGithub className="w-5 h-5 mr-1" />
                  <span className="text-sm underline underline-offset-2">Github</span>
                </a>
                <a
                  href={project.liveSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center">
                  <RxExternalLink className="w-5 h-5 mr-1" />
                  <span className="text-sm underline underline-offset-2">Live</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
