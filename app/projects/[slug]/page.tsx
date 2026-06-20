import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/data/projects'
import ProjectDetail from '@/components/Projects/ProjectDetail'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: `${project.title} — ${project.subTitle} | Nathan Watkins`,
    description: project.des,
    openGraph: {
      title: `${project.title} — ${project.subTitle}`,
      description: project.des,
      images: project.images?.[0] ? [{ url: project.images[0] }] : undefined,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
