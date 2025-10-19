'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import { MdOpenInNew } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { BorderBeam } from '../magicui/border-beam'
import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import ImageSlider from './ImageSlider'
import { trackProjectEvent, trackModalEvent } from '@/lib/analytics'
import { Project, IconCycleState } from '@/lib/types'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  iconCycleState: IconCycleState
  setIconCycleState: (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
}

/**
 * ProjectModal component displays detailed project information
 *
 * Features:
 * - Full project details with title, links, and description
 * - IconCycle integration for technology stack
 * - ImageSlider for project screenshots
 * - Analytics tracking for GitHub and live site clicks
 * - Framer Motion animations
 * - BorderBeam visual effects
 * - Z-index: 10001 (below ImageSlider fullscreen modal at 10002)
 */
const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  iconCycleState,
  setIconCycleState
}) => {
  if (!isOpen) return null

  const handleModalClose = () => {
    trackModalEvent('close', 'project_details', { project_name: project.title })
    onClose()
  }

  const handleGitHubClick = () => {
    trackProjectEvent('github_click', project.title, { url: project.github })
  }

  const handleLiveSiteClick = () => {
    trackProjectEvent('live_site_click', project.title, { url: project.liveSite })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-[10001] flex items-center justify-center p-4 select-none"
      onClick={handleModalClose}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 dark:from-[#050a28] dark:via-[#0e1f50] dark:to-[#050a28] rounded-xl p-6 max-w-[68rem] lg:max-w-[76rem] xl:max-w-[84rem] 2xl:max-w-[92rem] w-full max-h-[80vh] lg:max-h-[82vh] xl:max-h-[85vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}>
        <BorderBeam className="beam-1" startPosition={0} />
        <BorderBeam className="beam-2" startPosition={10} />
        <BorderBeam className="beam-2" startPosition={20} />

        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 p-3 bg-purple-300 rounded-full dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Close project details">
          <IoMdClose aria-hidden="true" />
        </button>
        <div className="flex flex-col justify-center w-full mt-2 sm:mt-6 text-white">
          <div className="flex justify-center items-center w-full gap-3">
            <a
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveSiteClick}
              className="flex flex-row justify-center items-center w-fit">
              <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 ">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex justify-start  decoration-3 hover-underline-animation">
                  {project.title}
                </h2>
                <MdOpenInNew className="flex justify-center items-center w-5 h-5 mb-2" />
              </span>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGitHubClick}
                className="flex sm:hidden items-center mb-2">
                <FiGithub className="w-6 h-6" />
              </a>
            )}
          </div>

          <div className="flex flex-row justify-end gap-3 mb-2 sm:mb-4">
            <span className="flex flex-row space-x-4 justify-center">
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveSiteClick}
                className="hidden sm:flex flex-row items-center">
                <MdOpenInNew className="w-5 h-5 mr-1" />
                <span className="text-sm underline-offset-2 decoration-3 hover-underline-animation">
                  Site
                </span>
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleGitHubClick}
                  className="hidden sm:flex flex-row items-center">
                  <FiGithub className="w-5 h-5 mr-1" />
                  <span className="text-sm underline-offset-2 decoration-3 hover-underline-animation">
                    Source
                  </span>
                </a>
              )}
            </span>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-1 1lg:gap-0 sm:gap-6 -mx-6 sm:mx-1">
            <div className="w-full sm:w-1/2 px-6 sm:px-0">
              <IconCycle
                technologies={project.technologies}
                orientation="h"
                view="detailed"
                initialCategory={iconCycleState.currentCategory}
                initialIconIndex={iconCycleState.cycledIconIndex}
                onStateChange={setIconCycleState}
              />
            </div>
            <div className="flex sm:w-1/2 justify-center items-center h-40 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] mb-8 1md:mb-12 1lg:mb-20 sm:mb-0 px-4 1lg:px-6 sm:px-0">
              <div className="relative w-full 1lg:max-w-[22rem] sm:max-w-none h-full">
                <ImageSlider
                  images={project.images}
                  isModalOpen={isOpen}
                  projectTitle={project.title}
                  projectId={project.id}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

ProjectModal.displayName = 'ProjectModal'

export default ProjectModal
