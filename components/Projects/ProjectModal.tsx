'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import { MdOpenInNew } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { BorderBeam } from '../magicui/border-beam'
import ImageSlider from './ImageSlider'
import { trackProjectEvent, trackModalEvent } from '@/lib/analytics'
import { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
}

/**
 * ProjectModal component displays detailed project information
 *
 * Features:
 * - Full project details with title and links
 * - Wide ImageSlider for project screenshots
 * - "How it works" highlight bullets with the stack referenced in prose
 * - Analytics tracking for GitHub and live site clicks
 * - Framer Motion animations + BorderBeam visual effects
 */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
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
        className="bg-gradient-to-br from-blue-600 via-blue-400 to-blue-600 dark:from-[#050a28] dark:via-[#0e1f50] dark:to-[#050a28] rounded-xl p-6 max-w-3xl lg:max-w-4xl w-full max-h-[85vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}>
        <BorderBeam className="beam-1" startPosition={0} />
        <BorderBeam className="beam-2" startPosition={10} />
        <BorderBeam className="beam-2" startPosition={20} />

        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 p-3 bg-sky-300 rounded-full dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Close project details">
          <IoMdClose aria-hidden="true" />
        </button>
        <div className="flex flex-col justify-center w-full mt-2 sm:mt-6 text-white">
          <div className="flex justify-center items-center w-full gap-3">
            {project.liveSite ? (
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveSiteClick}
                className="flex flex-row justify-center items-center w-fit">
                <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 ">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 flex justify-start  decoration-3 hover-underline-animation">
                    {project.title}
                  </h3>
                  <MdOpenInNew className="flex justify-center items-center w-5 h-5 mb-2" />
                </span>
              </a>
            ) : (
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 flex justify-start">
                {project.title}
              </h3>
            )}
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
              {project.liveSite ? (
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
              ) : (
                <span className="hidden sm:flex flex-row items-center text-sm text-slate-300">
                  Live demo coming soon
                </span>
              )}
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
          <div className="flex flex-col gap-5 overflow-y-auto max-h-[calc(85vh-8rem)] pr-1">
            {/* Screenshots — full width of the modal */}
            <div className="w-full">
              <ImageSlider
                images={project.images}
                isModalOpen={isOpen}
                projectTitle={project.title}
                projectId={project.id}
              />
            </div>

            {/* How it works — stack referenced in prose */}
            {project.highlights && (
              <ul className="flex flex-col gap-3 pb-4 text-left">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm md:text-base leading-relaxed text-slate-100">
                    <span className="text-sky-400 select-none" aria-hidden="true">
                      ▸
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

ProjectModal.displayName = 'ProjectModal'

export default ProjectModal
