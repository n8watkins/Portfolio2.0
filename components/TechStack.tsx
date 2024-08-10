import { cn } from '@/lib/utils'
import Marquee from '@/components/magicui/marquee'
import { tech_libraries, tech_tools } from '../data/index'
import { SiShadcnui } from 'react-icons/si'
import { ReactElement } from 'react'

const StackContainer = ({ name, icon }: { name: string; icon?: string | ReactElement }) => {
  return (
    <figure
      className={cn(
        'relative flex h-20 min-w-28 max-w-42 px-2 cursor-pointer overflow-hidden rounded-xl border pb-2  items-center justify-center  ',
        // light styles
        'border-gray-950/[.1] bg-blue-400 hover:bg-blue-400/90',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}>
      <div className="flex flex-col items-center gap-2">
        <figcaption className="mt-2 text-base font-medium   dark:text-white flex flex-row gap-2">
          <span className="">{icon}</span>
          <span className="">{name}</span>
        </figcaption>
      </div>
    </figure>
  )
}

export function TechStack() {
  return (
    <div className="absolute top-0 flex h-[70%] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border-none bg-blue-300 dark:bg-[#020621] ">
      <Marquee reverse pauseOnHover className="[--duration:45s]">
        {tech_libraries.map((tech) => (
          <StackContainer key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:45s]">
        {tech_tools.map((tech) => (
          <StackContainer key={tech.name} name={tech.name} icon={tech.icon} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute left-0 w-1/3 h-full bg-gradient-to-r  from-blue-300 to-transparent dark:from-[#020621] dark:to-transparent "></div>
      <div className="pointer-events-none absolute right-0 w-1/3  h-full bg-gradient-to-l from-blue-300  to-transparent dark:from-[#020621] dark:to-transparent"></div>
    </div>
  )
}
