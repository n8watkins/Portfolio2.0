'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub } from 'react-icons/fi'
import { MdOpenInNew } from 'react-icons/md'
import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { Project } from '@/lib/types'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-3">{title}</h2>
      {children}
    </section>
  )
}

/**
 * Full project detail page. The screenshot is deliberately small — the page is
 * about the *thinking*: the goal, how it uses AI, what it's testing, and a deep,
 * interactive breakdown of the stack via the IconCycle detailed view.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="min-h-screen bg-blue-400 dark:bg-darkBlue text-slate-700 dark:text-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-400 transition-colors mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded">
          <FiArrowLeft className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
            {project.subTitle}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100">
            {project.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.des}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            {project.liveSite ? (
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-sky-500/40 transition-all duration-300">
                Live demo
                <MdOpenInNew className="w-4 h-4" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-sky-300 border border-sky-400/30 bg-sky-500/10">
                <span className="h-2 w-2 rounded-full bg-sky-400" aria-hidden="true" />
                Live demo coming soon
              </span>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-400 hover:border-sky-400/60 transition-colors">
                <FiGithub className="w-4 h-4" aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        </header>

        {/* Small image — intentionally compact */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-xl mx-auto h-40 md:h-44 rounded-xl overflow-hidden border border-white/10 bg-slate-900/40 shadow-lg shadow-black/30 mb-12">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 36rem"
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-12">
          {project.purpose && (
            <Section title="The goal — what I'm exploring">
              <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {project.purpose}
              </p>
            </Section>
          )}

          {project.aiUsage && (
            <Section title="How it uses AI">
              <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {project.aiUsage}
              </p>
            </Section>
          )}

          {project.highlights && (
            <Section title="How it works">
              <ul className="flex flex-col gap-3">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="text-sky-400 select-none mt-1" aria-hidden="true">
                      ▸
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* The stack — interactive IconCycle detailed view */}
          <Section title="The stack">
            <div className="rounded-2xl border border-white/10 bg-slate-900/30 px-2 py-6 md:px-6">
              <IconCycle technologies={project.technologies} view="detailed" projectId={project.id} />
            </div>
          </Section>
        </div>
      </div>
    </main>
  )
}
