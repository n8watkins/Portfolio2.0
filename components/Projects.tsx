import { projects } from '@/data'
import Image from 'next/image'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { RxExternalLink } from 'react-icons/rx'
import { TbExternalLink } from 'react-icons/tb'

const Projects = () => {
  return (
    <div className="flex flex-col my-20 items-center justify-center gap-5 w-full ">
      <div className="flex ">
        <h1 className="text-5xl font-bold py-14 text-center">
          {' '}
          A small selection of <div className="text-purple-300 lg:inline">recent projects</div>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-5 xl:gap-14">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative flex flex-col items-center justify-center h-full w-full p-5 rounded-xl col-span-1 row-span-1 border auto-rows-[10rem] border-white/[.2]  shadow-md">
            <div className="relative w-[28rem] h-[20rem] mb-4 overflow-hidden group rounded-xl ">
              <div className="  rounded-xl  ">
                <Image
                  src={project.img}
                  alt={project.img}
                  fill
                  className="rounded-xl hover:cursor-pointer group-hover:scale-105 duration-200 "
                />
              </div>
            </div>
            <div className="relative flex flex-col w-full space-y-2">
              <div className="text-xl font-sans font-bold">{project.title}</div>
              <div className="  ">{project.des}</div>
              <div className="flex flex-row">
                <div className="flex flex-row w-full h-20 pt-2 ">
                  {project.iconLists.map((icon, index) => (
                    <div
                      key={icon}
                      className={`relative  w-12 h-12 rounded-full border-2 bg-gradient-to-l from-slate-900 to-darkBlue ${
                        index !== 0 ? '-ml-3 ' : ''
                      }`}>
                      <Image src={icon} alt={icon} className="p-3" fill />
                    </div>
                  ))}
                </div>
                <div className="relative flex flex-row pt-2">
                  <div className="flex flex-row ">
                    <a
                      href="https://github.com/natkins23"
                      target="_blank"
                      className="flex flex-row ">
                      <div className="w-11 h-11 rounded-full peer">
                        <FiGithub className="w-full h-full p-3  " />
                      </div>
                      <span className="text-sm whitespace-nowrap peer-hover:decoration-2 underline-offset-2 underline  pt-3 ">
                        Github
                      </span>
                    </a>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row group">
                      <a
                        href="https://github.com/natkins23"
                        target="_blank"
                        className="flex flex-row ">
                        <div className="w-11 h-11 rounded-full peer">
                          <RxExternalLink className=" w-full h-full p-3 text-black dark:text-white " />
                        </div>
                        <span className="text-sm whitespace-nowrap peer-hover:decoration-2 underline-offset-2 underline  pt-3 ">
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
