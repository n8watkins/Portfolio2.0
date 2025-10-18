'use client'

import React from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { MdOpenInNew, MdOutlineUnfoldMore } from 'react-icons/md'
import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { staggerItemVariants } from '@/lib/animations'
import { trackProjectEvent } from '@/lib/analytics'
import { Project, IconCycleState } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  onProjectClick: (project: Project) => void
  onIconClick: (project: Project) => void
  iconCycleState: IconCycleState
  onIconCycleStateChange: (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
}

/**
 * ProjectCard component displays a project in the grid view
 *
 * Features:
 * - Project thumbnail image
 * - Project title, subtitle, and description
 * - GitHub and live site links
 * - IconCycle integration for technology stack
 * - Analytics tracking for clicks
 * - Hover effects and animations
 * - Responsive design
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onProjectClick,
  onIconClick,
  iconCycleState,
  onIconCycleStateChange
}) => {
  return (
    <motion.div
      key={project.id}
      variants={staggerItemVariants}
      className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center p-3 lg:p-4 xl:p-6 w-full max-w-full min-w-0 rounded-xl col-span-1 border border-white/[.2] shadow-md overflow-hidden"
    >
      <div>
        <div className="relative w-full pt-[56.25%] rounded-xl mb-4 overflow-hidden">
          <div
            onClick={() => onProjectClick(project)}
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
                onClick={() => onProjectClick(project)}
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
            initialCategory={iconCycleState?.currentCategory}
            initialIconIndex={iconCycleState?.cycledIconIndex}
            onStateChange={onIconCycleStateChange}
            onIconClick={() => onIconClick(project)}
            projectId={project.id}
          />
        </div>
      </div>
    </motion.div>
  )
}

ProjectCard.displayName = 'ProjectCard'

export default ProjectCard
