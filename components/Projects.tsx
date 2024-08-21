import { projects } from '@/data'
import Image from 'next/image'
import React from 'react'
import { FiGithub } from 'react-icons/fi'
import { RxExternalLink } from 'react-icons/rx'
import { BorderBeam } from './magicui/border-beam'

const Projects = () => {
  return (
    <div
      id="projects"
      className="flex flex-col my-20 items-center justify-center gap-5 w-full   text-slate-200">
      <div className="flex ">
        <h1 className="text-5xl font-bold py-14 text-center text-slate-800">
          {' '}
          A small selection of <div className="text-purple-500 lg:inline">recent projects</div>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5 xl:gap-14">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative flex flex-col items-center   bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700  dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center sm:h-[40rem] md:h-[30rem] lg:h-[40rem] p-5 h-full w-full  rounded-xl col-span-1 row-span-1 border auto-rows-[10rem] border-white/[.2]  shadow-md group">
            <div className="relative w-[25rem] h-[20rem] sm:h-[25rem] sm:w-[32rem]  md:w-[20rem] md:h-[15rem] lg:w-[25rem] lg:h-[23rem]  xl:w-[30rem] xl:h-[20rem]    rounded-xl mb-4 ">
              <a href={project.liveSite} target="_blank" className="">
                <div className="  rounded-xl flex flex-row h-full w-full  ">
                  <Image
                    src={project.img}
                    alt={project.img}
                    fill
                    className="rounded-xl hover:cursor-pointer peer  group-hover:scale-105 duration-200 "
                  />
                </div>
              </a>
            </div>
            <div className="relative flex flex-col w-full space-y-2 xl:px-4">
              <div className="text-xl font-sans font-bold ">{project.title}</div>
              <div className="  ">{project.des}</div>
              <div className="flex flex-row">
                <div className="flex flex-row w-full h-20 pt-2  ">
                  {project.iconLists.map((icon, index) => (
                    <div
                      key={icon}
                      className={`relative  w-12 h-12 rounded-full border-2 bg-gradient-to-l from-slate-900 to-darkBlue  ${
                        index !== 0 ? '-ml-3 ' : ''
                      }`}>
                      <Image src={icon} alt={icon} className="p-3" fill />
                    </div>
                  ))}
                </div>
                <div className="relative flex flex-row pt-2">
                  <div className="flex flex-row  pr-3">
                    <a href={project.github} target="_blank" className="flex flex-row  ">
                      <div className="w-5 h-5 rounded-full peer mt-3 mr-1">
                        <FiGithub className="w-full h-full " />
                      </div>
                      <span className="text-sm whitespace-nowrap peer-hover:decoration-2 hover:decoration-2 underline-offset-2 underline  pt-3 ">
                        Github
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row ">
                      <a href={project.liveSite} target="_blank" className="flex flex-row ">
                        <div className="w-5 h-5 rounded-full peer mt-3 mr-1">
                          <RxExternalLink className=" w-full h-full text-white dark:text-white " />
                        </div>
                        <span className="text-sm whitespace-nowrap peer-hover:decoration-2 hover:decoration-2 underline-offset-2 underline  pt-3 ">
                          Live Site
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects
