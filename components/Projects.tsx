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
import ProjectCard from './Projects/ProjectCard'

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
      {projects.map((project: Project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onProjectClick={handleProjectClick}
          onIconClick={handleIconClick}
          iconCycleState={iconCycleStates[project.id] || getInitialIconCycleState(project.id)}
          onIconCycleStateChange={onStateChangeMap[project.id]}
        />
      ))}
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
