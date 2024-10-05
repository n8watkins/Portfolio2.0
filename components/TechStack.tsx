import React from 'react'
import { cn } from '@/lib/utils'
import Marquee from '@/components/magicui/marquee'
import { tech_libraries, tech_tools } from '../data/index'
import { ReactElement } from 'react'

const StackContainer = ({
  name,
  icon,
  description,
}: {
  name: string
  icon?: string | ReactElement
  description: string
}) => {
  return (
    <figure
      className={cn(
        'stack-container',
        'relative flex h-28 min-w-40 max-w-52 px-2 cursor-pointer overflow-hidden rounded-xl border pb-2 items-center justify-center',
        'border-gray-950/[.1] bg-blue-300 hover:bg-purple-100/90',
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-lg',
        '[&_.content-wrapper]:hover:scale-75 [&_.content-wrapper]:hover:-translate-y-9',
        '[&_.description]:hover:opacity-100'
      )}>
      <div className="content-wrapper flex flex-col items-center transition-all duration-300 ease-in-out">
        <figcaption className="icon-name-wrapper mt-2 text-xl font-medium dark:text-white flex flex-col items-center transition-all duration-300 ease-in-out">
          <div className="icon-name flex flex-row gap-2 pt-24">
            <span className="icon transition-transform duration-300 ease-in-out">{icon}</span>
            <span className="name transition-all duration-300 ease-in-out  whitespace-nowrap">
              {name}
            </span>
          </div>
          <div className="description  flex items-start justify-center text-base w-48 h-24 opacity-0 translate-y-2 transition-all duration-300 ease-in-out ">
            {description}
          </div>
        </figcaption>
      </div>
    </figure>
  )
}

export function TechStack() {
  return (
    <div className="absolute bottom-20 flex h-[100%] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-none bg-gradient-to-br from-blue-400 via-blue-500 to-blue-400 border dark:bg-[#020621]">
      <Marquee reverse pauseOnHover className="[--duration:45s]">
        {tech_libraries.map((tech) => (
          <StackContainer
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            description={tech.description}
          />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:45s]">
        {tech_tools.map((tech) => (
          <StackContainer
            key={tech.name}
            name={tech.name}
            icon={tech.icon}
            description={tech.description}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute left-0 w-1/3 h-full bg-gradient-to-r from-blue-500 to-transparent dark:from-[#020621] dark:to-transparent"></div>
      <div className="pointer-events-none absolute right-0 w-1/3 h-full bg-gradient-to-l from-blue-500 to-transparent dark:from-[#020621] dark:to-transparent"></div>
    </div>
  )
}
