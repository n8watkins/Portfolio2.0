import React, { useCallback, useEffect, useState,useRef, useMemo } from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUpVariants, staggerContainerSlowVariants, staggerItemVariants, defaultAnimationConfig } from '@/lib/animations'

import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { projects } from '@/data'
import { Project, Technologies, IconCycleState } from '@/lib/types'
import { MdOpenInNew, MdOutlineUnfoldMore } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BorderBeam } from './magicui/border-beam'
import { trackProjectEvent, trackModalEvent } from '@/lib/analytics'
import ImageSlider from './Projects/ImageSlider'
import ProjectModal from './Projects/ProjectModal'

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [iconCycleStates, setIconCycleStates] = useState<Record<number, IconCycleState>>({})

  const getInitialIconCycleState = useCallback((projectId: number): IconCycleState => {
    const project = projects.find((p) => p.id === projectId)
    return {
      currentCategory: project
        ? (Object.keys(project.technologies)[0] as keyof Technologies)
        : 'Frontend',
      cycledIconIndex: 0,
      highlightedDescriptionIndex: 0,
    }
  }, [projects])
  

  const getOnStateChange = useCallback(
  (projectId: number) =>
    (newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => {
      setIconCycleStates((prevStates) => ({
        ...prevStates,
        [projectId]:
          typeof newState === 'function'
            ? newState(prevStates[projectId] || getInitialIconCycleState(projectId))
            : newState,
      }))
    },
  [getInitialIconCycleState]
)

  



  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('view', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title })
  }

  const onStateChangeMap = useMemo(() => {
    const result: Record<number, ReturnType<typeof getOnStateChange>> = {};
    for (const project of projects) {
      result[project.id] = getOnStateChange(project.id);
    }
    return result;
  }, [getOnStateChange]);


  const getModalOnStateChange = useCallback(
    (projectId: number) =>
      (newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => {
        setIconCycleStates((prevStates) => ({
          ...prevStates,
          [projectId]:
            typeof newState === 'function'
              ? newState(prevStates[projectId] || getInitialIconCycleState(projectId))
              : newState,
        }));
      },
    [getInitialIconCycleState]
  );
  
  const modalStateChangeHandler = useMemo(() => {
    if (!selectedProject) return () => {};
    return getModalOnStateChange(selectedProject.id);
  }, [getModalOnStateChange, selectedProject]);

  const handleIconClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('icon_click', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title, trigger: 'icon' })
  }

  return (
    <div
      id="projects"
      className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200 mb-40 ">
      <motion.h2
        variants={fadeInUpVariants}
        {...defaultAnimationConfig}
        className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200 select-none">
        A small selection of <span className="text-purple-500 lg:inline">recent projects</span>
      </motion.h2>

      <motion.div
        variants={staggerContainerSlowVariants}
        {...defaultAnimationConfig}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 xl:gap-5 2xl:gap-6">
      {projects.map((project: Project) => {
const onStateChange = onStateChangeMap[project.id];
  return (

    <motion.div
      key={project.id}
      variants={staggerItemVariants}
      className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center p-3 lg:p-4 xl:p-6 w-full max-w-full min-w-0 rounded-xl col-span-1 border border-white/[.2] shadow-md overflow-hidden"
    >
      <div>
        <div className="relative w-full pt-[56.25%] rounded-xl mb-4 overflow-hidden">
          <div
            onClick={() => handleProjectClick(project)}
            className="absolute inset-0 rounded-xl cursor-pointer overflow-hidden"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-xl select-none object-cover hover:scale-[1.01] duration-200 transform-gpu will-change-transform"
            />
          </div>
        </div>
        <div className="relative flex flex-col w-full max-w-full overflow-hidden">
          <div className="flex w-full justify-between items-start gap-2 min-w-0 select-none">
            <div className="flex flex-col flex-1 min-w-0">
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectEvent('live_site_click', project.title, { source: 'grid' })}
                className="flex flex-row justify-start items-center mb-1 select-none cursor-default"
              >
                <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 select-none">
                  <h2 className="text-xl sm:text-3xl md:text-2xl lg:text-3xl font-bold mb-2 flex justify-center decoration-3 hover-underline-animation truncate select-none">
                    {project.title}
                  </h2>
                  <MdOpenInNew className="flex justify-center items-center w-5 h-5" />
                </span>
              </a>
              <span className="text-lg md:text-base lg:text-base xl:text-md font-sans font-bold pb-2 -mt-3 select-none truncate">
                {project.subTitle}
              </span>
            </div>
            <span className="flex flex-row justify-end items-end gap-1 md:gap-2 lg:gap-4 pb-2 flex-shrink-0 select-none">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectEvent('github_click', project.title, { source: 'grid' })}
                className="flex flex-row items-center select-none"
              >
                <FiGithub className="w-5 h-5 mr-1" />
                <span className="hidden 1md:inline-block text-sm underline underline-offset-2 decoration-2 hover-underline-animation cursor-default select-none">
                  Source
                </span>
              </a>
              <span
                className="flex flex-row items-center cursor-pointer select-none"
                onClick={() => handleProjectClick(project)}
              >
                <MdOutlineUnfoldMore className="w-5 h-5 mr-1" />
                <span className="hidden 1md:inline-block text-sm underline underline-offset-2 whitespace-nowrap decoration-2 hover-underline-animation hover-underline-animation-trigger select-none">
                  Details
                </span>
              </span>
            </span>
          </div>
          <p className="text-sm sm:text-base md:text-base h-10 mt-1 dark:text-slate-300 select-none">
            {project.des}
          </p>
          <IconCycle
            technologies={project.technologies}
            orientation="h"
            view="simple"
            initialCategory={iconCycleStates[project.id]?.currentCategory}
            initialIconIndex={iconCycleStates[project.id]?.cycledIconIndex}
            onStateChange={onStateChange}
            onIconClick={() => handleIconClick(project)}
            projectId={project.id}
          />
        </div>
      </div>
    </motion.div>
  );
})}
      </motion.div>
      <AnimatePresence mode="wait">
        {selectedProject && (
         <ProjectModal
         project={selectedProject}
         isOpen={!!selectedProject}
         onClose={() => setSelectedProject(null)}
         iconCycleState={
           iconCycleStates[selectedProject.id] || getInitialIconCycleState(selectedProject.id)
         }
         setIconCycleState={modalStateChangeHandler} 
       />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
