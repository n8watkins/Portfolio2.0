import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { projects } from '@/data'
import { Project, Technologies } from '@/lib/types'
import { FaEye } from 'react-icons/fa6'
import { MdOpenInNew } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'

interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}

const ProjectModal: React.FC<{
  project: Project
  isOpen: boolean
  onClose: () => void
  iconCycleState: IconCycleState
  setIconCycleState: (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
}> = ({ project, isOpen, onClose, iconCycleState, setIconCycleState }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.scrollBy(0, 1)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-[5001] flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className=" bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-3 bg-purple-300 rounded-full dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
          <IoMdClose />
        </button>
        <div className="mt-6 text-white">
          <h2 className="text-3xl font-bold ">{project.title}</h2>
          <div className="flex flex-row  justify-between ">
            <h3 className="text-lg font-semibold mb-4">{project.subTitle}</h3>
            <span className="flex flex-row space-x-4 justify-center mt-4 ">
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
                <FaEye className="w-5 h-5 mr-1" />
                <span className="text-sm underline underline-offset-2">Live</span>
              </a>
            </span>
          </div>
          <p className=" ">{project.des}</p>
          <IconCycle
            technologies={project.technologies}
            orientation="h"
            iconClass=""
            view="detailed"
            initialCategory={iconCycleState.currentCategory}
            initialIconIndex={iconCycleState.cycledIconIndex}
            onStateChange={setIconCycleState}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  const [isIconsLoading, setIsIconsLoading] = useState(true)
  const [isLargeDevice, setIsLargeDevice] = useState(false)
  const [hasMouse, setHasMouse] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [iconCycleStates, setIconCycleStates] = useState<Record<number, IconCycleState>>({})

  useEffect(() => {
    const checkDeviceAndMouse = () => {
      setIsLargeDevice(window.innerWidth >= 768)
      setHasMouse(window.matchMedia('(pointer:fine)').matches)
    }

    checkDeviceAndMouse()
    window.addEventListener('resize', checkDeviceAndMouse)

    const timer = setTimeout(() => {
      setIsIconsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener('resize', checkDeviceAndMouse)
      clearTimeout(timer)
    }
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const getInitialIconCycleState = (projectId: number): IconCycleState => {
    const project = projects.find((p) => p.id === projectId)
    return {
      currentCategory: project
        ? (Object.keys(project.technologies)[0] as keyof Technologies)
        : 'Frontend',
      cycledIconIndex: 0,
      highlightedDescriptionIndex: 0,
    }
  }

  const handleIconCycleStateChange = (
    projectId: number,
    newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => {
    setIconCycleStates((prevStates) => ({
      ...prevStates,
      [projectId]:
        typeof newState === 'function'
          ? newState(prevStates[projectId] || getInitialIconCycleState(projectId))
          : newState,
    }))
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
            className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center xl:p-6 w-full rounded-xl col-span-1 border border-white/[.2] shadow-md group">
            <div className="relative w-full pt-[56.25%] rounded-xl mb-4">
              <div
                onClick={() => handleProjectClick(project)}
                className="absolute inset-0 rounded-xl cursor-pointer">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="rounded-xl peer object-cover hover:scale-105 duration-200"
                />
              </div>
            </div>
            <div className="relative flex flex-col w-full ">
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <span className="text-xl xl:text-3xl font-sans font-bold">{project.title}</span>
                  <span className="text-base xl:text-md font-sans font-bold pb-2">
                    {project.subTitle}
                  </span>
                </div>
                <span className="flex flex-row justify-end items-end space-x-4 pb-2">
                  <span
                    className="flex flex-row items-center cursor-pointer "
                    onClick={() => handleProjectClick(project)}>
                    <MdOpenInNew className="w-5 h-5 mr-1" />
                    <span className="text-sm underline underline-offset-2">More Info</span>
                  </span>
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
                    <FaEye className="w-5 h-5 mr-1" />
                    <span className="text-sm underline underline-offset-2">Live</span>
                  </a>
                </span>
              </div>

              <p className="text:text-white dark:text-slate-300 ">{project.des}</p>
              <IconCycle
                technologies={project.technologies}
                orientation="h"
                iconClass="mt-4"
                view="simple"
                initialCategory={iconCycleStates[project.id]?.currentCategory}
                initialIconIndex={iconCycleStates[project.id]?.cycledIconIndex}
                onStateChange={(newState) => handleIconCycleStateChange(project.id, newState)}
              />
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            iconCycleState={
              iconCycleStates[selectedProject.id] || getInitialIconCycleState(selectedProject.id)
            }
            setIconCycleState={(newState) =>
              handleIconCycleStateChange(selectedProject.id, newState)
            }
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
