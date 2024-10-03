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
      className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200 mb-40">
      <h1 className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200">
        A small selection of <span className="text-purple-500 lg:inline">recent projects</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-14">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center p-4 w-full rounded-xl col-span-1 border border-white/[.2] shadow-md group">
            <div className="relative w-full pt-[56.25%] rounded-xl mb-4">
              <div
                onClick={() => handleProjectClick(project.liveSite)}
                className={`absolute inset-0 rounded-xl ${
                  isLargeDevice && hasMouse ? 'cursor-pointer' : ''
                }`}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className={`rounded-xl peer object-cover ${
                    isLargeDevice && hasMouse ? 'hover:scale-105' : ''
                  } duration-200`}
                />
              </div>
            </div>
            <div className="relative flex flex-col w-full">
              <div className="flex w-full justify-between">
                <span className="text-xl font-sans font-bold">{project.title}</span>

                <span className="flex flex-row justify-end items-center space-x-2">
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
                </span>
              </div>
              <span className="text-sm font-sans font-bold pb-2 ">{project.subTitle}</span>
              <div className="text-base">{project.des}</div>
              <IconCycle technologies={project.technologies} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
