import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { projects } from '@/data'
import { Project, Technologies } from '@/lib/types'
import { MdOpenInNew, MdOutlineUnfoldMore } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BorderBeam } from './magicui/border-beam'

interface ImageSliderProps {
  images: string[]
  isModalOpen: boolean
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, isModalOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isModalOpen && !isHovered) {
      interval = setInterval(() => {
        nextSlide()
      }, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isModalOpen, isHovered, nextSlide])

  return (
    <div
      className="relative w-full h-full group hover:scale-105 duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0">
          <Image
            src={images[currentIndex]}
            alt={`Project image ${currentIndex + 1}`}
            fill
            className="rounded-xl object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevSlide}
        className="absolute group-hover:bg-slate-400 left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full duration-200">
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute group-hover:bg-slate-300 right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full duration-200">
        <ChevronRight size={24} />
      </button>
    </div>
  )
}
interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}

interface ImageComponentProps {
  src: string
  alt: string
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => {
  return (
    <div className="relative w-full h-full">
      <Image src={src} alt={alt} fill className="rounded-xl object-cover" />
    </div>
  )
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
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      // Trigger reflow to apply the padding before scrolling
      window.requestAnimationFrame(() => {
        window.scrollBy(0, 1)
      })
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
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
        className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] rounded-xl p-6 max-w-[58rem] w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}>
        <BorderBeam className="beam-1" startPosition={0} />
        <BorderBeam className="beam-2" startPosition={10} />
        <BorderBeam className="beam-2" startPosition={20} />

        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-3 bg-purple-300 rounded-full dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">
          <IoMdClose />
        </button>
        <div className="mt-6 text-white">
          <a
            href={project.liveSite}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row justify-center items-center">
            <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 ">
              <h2 className="text-3xl font-bold mb-2 flex justify-center  decoration-3 hover-underline-animation">
                {project.title}
              </h2>
              <MdOpenInNew className="flex justify-center items-center w-5 h-5 " />
            </span>
          </a>
          <div className="flex flex-row justify-end gap-3 mb-4">
            <span className="flex flex-row space-x-4 justify-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center">
                <FiGithub className="w-5 h-5 mr-1" />
                <span className="text-sm  underline-offset-2  decoration-3 hover-underline-animation">
                  Source
                </span>
              </a>
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <IconCycle
                technologies={project.technologies}
                orientation="h"
                view="detailed"
                initialCategory={iconCycleState.currentCategory}
                initialIconIndex={iconCycleState.cycledIconIndex}
                onStateChange={setIconCycleState}
              />
            </div>
            <div className="flex w-1/2 h-80 ">
              <div className="relative w-full h-full ">
                <ImageSlider images={project.images} isModalOpen={isOpen} />
              </div>
            </div>
          </div>
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

  const handleIconClick = (project: Project) => {
    setSelectedProject(project)
  }

  return (
    <div
      id="projects"
      className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200 mb-40 ">
      <h1 className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200">
        A small selection of <span className="text-purple-500 lg:inline">recent projects</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-14 ">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="relative flex flex-col items-start  bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center xl:p-6 w-full rounded-xl col-span-1 border border-white/[.2] shadow-md group ">
            <div className="m-3">
              <div className="relative w-full pt-[56.25%] rounded-xl mb-4 ">
                <div
                  onClick={() => handleProjectClick(project)}
                  className="absolute inset-0 rounded-xl cursor-pointer">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="rounded-xl peer object-cover hover:scale-105 duration-200"
                  />
                </div>
              </div>
              <div className="relative flex flex-col w-full ">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row justify-center items-center mb-1">
                      <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 ">
                        <h2 className="text-3xl font-bold mb-2 flex justify-center  decoration-3 hover-underline-animation">
                          {project.title}
                        </h2>
                        <MdOpenInNew className="flex justify-center items-center w-5 h-5 " />
                      </span>
                    </a>
                    <span className="text-base xl:text-md font-sans font-bold pb-2 -mt-3  whitespace-nowrap">
                      {project.subTitle}
                    </span>
                  </div>
                  <span className="flex flex-row justify-end items-end space-x-4 pb-2">
                    <span
                      className="flex flex-row items-center cursor-pointer  "
                      onClick={() => handleProjectClick(project)}>
                      <MdOutlineUnfoldMore className="w-5 h-5 mr-1" />
                      <span className="text-sm underline underline-offset-2 whitespace-nowrap  decoration-2 hover-underline-animation hover-underline-animation-trigger">
                        Details
                      </span>
                    </span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center">
                      <FiGithub className="w-5 h-5 mr-1" />
                      <span className="text-sm underline underline-offset-2  decoration-2 hover-underline-animation">
                        Source
                      </span>
                    </a>
                  </span>
                </div>
                {/*media query*/}
                <p className="text:text-white h-10 mt-1  dark:text-slate-300 ">{project.des}</p>
                <IconCycle
                  technologies={project.technologies}
                  orientation="h"
                  view="simple"
                  initialCategory={iconCycleStates[project.id]?.currentCategory}
                  initialIconIndex={iconCycleStates[project.id]?.cycledIconIndex}
                  onStateChange={(newState) => handleIconCycleStateChange(project.id, newState)}
                  onIconClick={() => handleIconClick(project)}
                  projectId={project.id}
                />
              </div>
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
