'use client'

import React from 'react'
import { FiGithub } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { MdOpenInNew, MdOutlineUnfoldMore } from 'react-icons/md'
import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import CardImageCarousel from './CardImageCarousel'
import { staggerItemVariants } from '@/lib/animations'
import { trackProjectEvent } from '@/lib/analytics'
import { Project, IconCycleState } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  index: number
  onProjectClick: (project: Project) => void
  onIconClick: (project: Project) => void
  iconCycleState: IconCycleState
  onIconCycleStateChange: (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
}

/**
 * ProjectCard — vertical layout: title / subtitle / Source / Details sit ABOVE a
 * wide, short, auto-cycling image banner, with a technical description and the
 * tech-stack cycler below. The image is deliberately small so the card stays
 * text-forward; "Details" opens the full write-up.
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick,
  onIconClick,
  iconCycleState,
  onIconCycleStateChange,
}) => {
  return (
    <motion.div
      key={project.id}
      variants={staggerItemVariants}
      className="relative flex flex-col w-full max-w-full min-w-0 gap-4 col-span-1">
      {/* Header — title + subtitle (left), Source + Details (right) */}
      <div className="flex w-full items-start justify-between gap-3 select-none">
        <div className="flex flex-col min-w-0">
          {project.liveSite ? (
            <a
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectEvent('live_site_click', project.title, { source: 'grid' })}
              className="group/title flex items-center gap-1.5 w-fit cursor-pointer">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 truncate group-hover/title:text-sky-300 transition-colors">
                {project.title}
              </h3>
              <MdOpenInNew className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover/title:text-sky-300 transition-colors" />
            </a>
          ) : (
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 truncate">
              {project.title}
            </h3>
          )}
          <span className="mt-1 text-xs md:text-sm font-semibold uppercase tracking-wider text-sky-400/90 truncate">
            {project.subTitle}
          </span>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 pt-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackProjectEvent('github_click', project.title, { source: 'grid' })}
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-sky-400 transition-colors">
              <FiGithub className="w-5 h-5" />
              <span className="hidden sm:inline underline underline-offset-2 decoration-1">Source</span>
            </a>
          )}
          <button
            type="button"
            aria-label={`View ${project.title} details`}
            onClick={() => onProjectClick(project)}
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-sky-400 transition-colors rounded cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-darkBlue">
            <MdOutlineUnfoldMore className="w-5 h-5" />
            <span className="hidden sm:inline underline underline-offset-2 decoration-1 whitespace-nowrap">
              Details
            </span>
          </button>
        </div>
      </div>

      {/* Wide, short, auto-cycling image banner */}
      <CardImageCarousel
        images={project.images}
        alt={project.title}
        onClick={() => onProjectClick(project)}
      />

      {/* Technical description */}
      <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed select-none">
        {project.des}
      </p>

      {/* Tech stack */}
      <IconCycle
        technologies={project.technologies}
        orientation="h"
        view="simple"
        initialCategory={iconCycleState?.currentCategory}
        initialIconIndex={iconCycleState?.cycledIconIndex}
        onStateChange={onIconCycleStateChange}
        onIconClick={() => onIconClick(project)}
        projectId={project.id}
      />
    </motion.div>
  )
}

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
