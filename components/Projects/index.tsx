import React, { useCallback, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUpVariants, staggerContainerSlowVariants, defaultAnimationConfig } from '@/lib/animations'
import { projects } from '@/data/projects'
import { Project, IconCycleState } from '@/lib/types'
import { trackProjectEvent, trackModalEvent } from '@/lib/analytics'
import ProjectModal from './ProjectModal'
import ProjectCard from './ProjectCard'
import { getInitialIconCycleState, createStateHandlerMap } from './utils'

const BLURB =
  'Generative AI is changing what software can be — and how it gets built. These two projects are where I explore that shift hands-on: streaming AI interfaces, semantic search over vector embeddings, and the full-stack plumbing that makes intelligent products feel effortless.'

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [iconCycleStates, setIconCycleStates] = useState<Record<number, IconCycleState>>({})

  const getOnStateChange = useCallback(
    (projectId: number) =>
      (newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => {
        setIconCycleStates((prevStates) => ({
          ...prevStates,
          [projectId]:
            typeof newState === 'function'
              ? newState(prevStates[projectId] || getInitialIconCycleState(projectId, projects))
              : newState,
        }))
      },
    []
  )

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('view', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title })
  }

  const onStateChangeMap = useMemo(
    () => createStateHandlerMap(projects, getOnStateChange),
    [getOnStateChange]
  )


  const handleIconClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('icon_click', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title, trigger: 'icon' })
  }

  return (
    <div className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200 mb-16 ">
      <div className="w-full px-2 md:px-4 text-left">
        <motion.h2
          variants={fadeInUpVariants}
          {...defaultAnimationConfig}
          className="text-5xl font-bold pt-10 pb-4 text-slate-800 dark:text-slate-200 select-none">
          Building for the <span className="text-sky-400 lg:inline">AI-native web</span>
        </motion.h2>

        {/* Blurb streams in word-by-word like LLM token generation */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.035 } },
          }}
          className="max-w-3xl mb-8 text-base md:text-lg text-slate-600 dark:text-slate-400 select-none">
          {BLURB.split(' ').map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.12 } },
              }}>
              {word}{' '}
            </motion.span>
          ))}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="inline-block w-[0.55em] h-[1.1em] align-text-bottom bg-sky-400 rounded-[2px]"
            aria-hidden="true"
          />
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainerSlowVariants}
        {...defaultAnimationConfig}
        className="grid grid-cols-1 gap-16 lg:gap-24 w-full px-2 md:px-4">
      {projects.map((project: Project, index: number) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onProjectClick={handleProjectClick}
          onIconClick={handleIconClick}
          iconCycleState={iconCycleStates[project.id] || getInitialIconCycleState(project.id, projects)}
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
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
