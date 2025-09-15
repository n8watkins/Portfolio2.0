import React, { useCallback, useEffect, useState,useRef, useMemo } from 'react'
import Image from 'next/image'
import { FiGithub } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

import IconCycle from '@/components/ui/ProjectComponents/iconCycle'
import { projects } from '@/data'
import { Project, Technologies } from '@/lib/types'
import { MdOpenInNew, MdOutlineUnfoldMore } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { BorderBeam } from './magicui/border-beam'
import { trackProjectEvent, trackModalEvent } from '@/lib/analytics'

interface ImageSliderProps {
  images: string[];
  isModalOpen: boolean;
}


const ImageSlider: React.FC<ImageSliderProps> = ({ images, isModalOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    const shouldAutoCycle = (isModalOpen || isImageModalOpen) && !isHovered;

    if (!shouldAutoCycle) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isModalOpen, isImageModalOpen, isHovered, nextSlide]);
  

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };
  
  

  const handleCloseModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  useEffect(() => {
    if (!isImageModalOpen) return;
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'Escape') handleCloseModal();
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isImageModalOpen, prevSlide, nextSlide, handleCloseModal]);

  return (
    <>
      {/* === Details Page View === */}
      <div className="flex flex-col items-center w-full select-none">
        {/* === Image container === */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Persistent wrapper div with the ref */}
          <div className="absolute inset-0" >
            {isVisible ? (
              <div className="absolute inset-0">
                <AnimatePresence initial={false} custom={currentIndex}>
                  <motion.div
                    key={currentIndex}
                    custom={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 select-none cursor-zoom-in"
                    onClick={handleImageClick}
                  >
                    <Image
                      src={images[currentIndex]}
                      alt={`Project image ${currentIndex + 1}`}
                      fill
                      className="rounded-xl object-cover select-none"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
              </div>
            )}
          </div>

          {/* Arrows - positioned to overlay only on the screenshot */}
          <div className="absolute left-0 top-0 bottom-0 w-1/6 rounded-tl-xl rounded-bl-xl">
            <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Previous image">
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/6 rounded-tr-xl rounded-br-xl">
            <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer" aria-label="Next image">
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>

          {/* Expand icon */}
          <div className="absolute bottom-2 right-2 z-10">
            <button onClick={handleImageClick} className="flex items-center gap-1 text-white bg-black/60 px-2 py-1 rounded hover:bg-black/80" aria-label="Expand image to fullscreen">
              <span className="text-sm">Expand</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75V4.5h5.25M14.25 19.5h5.25v-5.25M19.5 4.5l-6 6M4.5 19.5l6-6" />
              </svg>
            </button>
          </div>
        </div>
        </div>

        {/* === Fixed-position indicators BELOW image === */}
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* === End of Details Page View === */}

      {/* === Image Gallery Modal === */}
      <AnimatePresence>
        {isImageModalOpen && (
          <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/30" onClick={handleCloseModal}>
            <div className="flex flex-col items-center">
            <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
  onClick={(e) => e.stopPropagation()}
  className="relative bg-[#06153b] rounded-2xl w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[60vw] xl:w-[65vw] h-[80vh] sm:h-[75vh] md:h-[65vh] lg:h-[60vh] xl:h-[65vh] flex flex-col"
>
  <BorderBeam className="beam-1" startPosition={0} />
  <BorderBeam className="beam-2" startPosition={10} />
  <BorderBeam className="beam-2" startPosition={20} />

  {/* Close button - positioned relative to modal */}
  <button
    onClick={handleCloseModal}
    className="absolute top-4 right-4 bg-white/30 hover:bg-white/60 p-3 hover:text-black rounded-full flex items-center justify-center transition-all duration-200 z-10"
    aria-label="Close image viewer"
  >
    <IoMdClose size={24} aria-hidden="true" />
  </button>

  {/* Container with external chevrons and image */}
  <div className="flex items-center justify-center px-8 pt-12 pb-4">
    {/* Left chevron - external to image */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        prevSlide();
      }}
      className="flex-shrink-0 cursor-pointer mr-6 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Previous image"
      disabled={images.length <= 1}
    >
      <ChevronLeft size={32} aria-hidden="true" />
    </button>

    {/* Image container */}
    <div className="relative w-full max-h-[65vh] xl:max-h-[55vh] aspect-video">
      <Image
      src={images[currentIndex]}
      alt="Expanded view"
      fill
          className="object-cover select-none rounded-xl"
      priority={true}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QFLQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 80vw"
    />
      </div>

      {/* Right chevron - external to image */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="flex-shrink-0 cursor-pointer ml-6 bg-blue-500 p-3 rounded-full hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Next image"
        disabled={images.length <= 1}
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>
    </div>

  {/* Bottom: pagination dots - centered between screenshot and container bottom */}
  <div className="flex justify-center items-center py-1">
    <div className="flex gap-5 transition-all duration-300">
      {images.map((_, index) => (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentIndex(index);
          }}
          className={`h-2 w-10 rounded-full cursor-pointer transition-colors duration-200 ${
            index === currentIndex ? 'bg-blue-500' : 'bg-white/80'
          }`}
        />
      ))}
    </div>
  </div>

</motion.div>
  {/* Keyboard Hint */}
<div className="hidden sm:flex absolute bottom-32 right-64 text-white/70 text-sm  items-center gap-3 pointer-events-none">
  <div className="flex items-center gap-1">
    <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">←</kbd>
    <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">→</kbd>
    <span className="ml-1">to navigate</span>
  </div>
  <div className="flex items-center gap-1 ml-4">
    <kbd className="bg-white/20 px-2 py-1 rounded border border-white/30 text-xs">esc</kbd>
    <span className="ml-1">to close</span>
  </div>
</div>
  {/* End of Keyboard Hint */}
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};







interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}

const ProjectModal: React.FC<{
  project: Project
  isOpen: boolean
  onClose: () => void
  iconCycleState: IconCycleState
  setIconCycleState: (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
}> = ({ project, isOpen, onClose, iconCycleState, setIconCycleState }) => {
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
        className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] rounded-xl p-6 max-w-[58rem] w-full max-h-[90vh] overflow-hidden relative"
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
        <div className="flex flex-col justify-center w-full mt-6 text-white">
          <div className="flex justify-center items-center w-full">
            <a
              href={project.liveSite}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveSiteClick}
              className="flex flex-row justify-center items-center w-fit">
              <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 ">
                <h2 className="text-3xl font-bold mb-2 flex justify-start  decoration-3 hover-underline-animation">
                  {project.title}
                </h2>
                <MdOpenInNew className="flex justify-center items-center w-5 h-5" />
              </span>
            </a>
          </div>
        
          <div className="flex flex-row justify-end gap-3 mb-4">
            <span className="flex flex-row space-x-4 justify-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleGitHubClick}
                className="flex flex-row items-center">
                <FiGithub className="w-5 h-5 mr-1" />
                <span className="hidden 1md:inline-block text-sm underline-offset-2 decoration-3 hover-underline-animation">
                  Source
                </span>
              </a>
              <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row justify-start items-center mb-1 select-none cursor-default">
                      <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 select-none">
                        <h2 className="text-3xl font-bold mb-2 flex justify-center  decoration-3 hover-underline-animation whitespace-nowrap select-none ">
                         
                        </h2>
                        <MdOpenInNew className="flex justify-center items-center w-5 h-5 " />
                        <span className="hidden 1md:inline-block text-sm underline-offset-2 decoration-3 hover-underline-animation">
                  Site
                </span>
                      </span>
                    </a>
            </span>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-6 mx-1">
            <div className="w-full sm:w-1/2">
              <IconCycle
                technologies={project.technologies}
                orientation="h"
                view="detailed"
                initialCategory={iconCycleState.currentCategory}
                initialIconIndex={iconCycleState.cycledIconIndex}
                onStateChange={setIconCycleState}
              />
            </div>
            <div className="flex sm:w-1/2 justify-center items-center h-40 sm:h-64 md:h-80">
              <div className="relative w-full h-full">
                <ImageSlider images={project.images} isModalOpen={isOpen} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  const [isIconsLoading, setIsIconsLoading] = useState(true)
  const [isLargeDevice, setIsLargeDevice] = useState(false)
  const [hasMouse, setHasMouse] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [iconCycleStates, setIconCycleStates] = useState<Record<number, IconCycleState>>({})

  const getInitialIconCycleState = useCallback((projectId: number): IconCycleState => {
    const project = projects.find((p) => p.id === projectId)
    return {
      currentCategory: project
        ? (Object.keys(project.technologies)[0] as keyof Technologies)
        : 'Frontend',
      cycledIconIndex: 0,
      highlightedDescriptionIndex: 0,
    }
  }, [])
  

  const getOnStateChange = useCallback(
  (projectId: number) =>
    (newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => {
      setIconCycleStates((prevStates) => ({
        ...prevStates,
        [projectId]:
          typeof newState === 'function'
            ? newState(prevStates[projectId] || getInitialIconCycleState(projectId))
            : newState,
      }))
    },
  [getInitialIconCycleState]
)

  
const handleIconCycleStateChange = useCallback((
  projectId: number,
  newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
) => {
  setIconCycleStates((prevStates) => ({
    ...prevStates,
    [projectId]:
      typeof newState === 'function'
        ? newState(prevStates[projectId] || getInitialIconCycleState(projectId))
        : newState,
  }));
}, [getInitialIconCycleState]);

  


  useEffect(() => {
    const checkDeviceAndMouse = () => {
      setIsLargeDevice(window.innerWidth >= 768)
      setHasMouse(window.matchMedia('(pointer:fine)').matches)
    }

    checkDeviceAndMouse()
    window.addEventListener('resize', checkDeviceAndMouse)

    const timer = setTimeout(() => {
      setIsIconsLoading(false)
    }, 1500)

    return () => {
      window.removeEventListener('resize', checkDeviceAndMouse)
      clearTimeout(timer)
    }
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('view', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title })
  }

  const onStateChangeMap = useMemo(() => {
    const result: Record<number, ReturnType<typeof getOnStateChange>> = {};
    for (const project of projects) {
      result[project.id] = getOnStateChange(project.id);
    }
    return result;
  }, [getOnStateChange]);


  const getModalOnStateChange = useCallback(
    (projectId: number) =>
      (newState: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => {
        handleIconCycleStateChange(projectId, newState);
      },
    [handleIconCycleStateChange]
  );
  
  const modalStateChangeHandler = useMemo(() => {
    if (!selectedProject) return () => {};
    return getModalOnStateChange(selectedProject.id);
  }, [getModalOnStateChange, selectedProject]);

  const handleIconClick = (project: Project) => {
    setSelectedProject(project)
    trackProjectEvent('icon_click', project.title)
    trackModalEvent('open', 'project_details', { project_name: project.title, trigger: 'icon' })
  }

  return (
    <div
      id="projects"
      className="flex flex-col my-20 items-center justify-center gap-5 w-full text-slate-200 mb-40 ">
      <h1 className="text-5xl font-bold py-14 text-center text-slate-800 dark:text-slate-200 select-none">
        A small selection of <span className="text-purple-500 lg:inline">recent projects</span>
      </h1>

      <div  className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-14  ">
      {projects.map((project: Project) => {
const onStateChange = onStateChangeMap[project.id];
  return (

    <div
      key={project.id}
      className="relative flex flex-col items-start bg-gradient-to-br from-blue-700 via-blue-500 to-blue-700 dark:bg-gradient-to-br dark:from-[#01051c] dark:via-[#06153b] dark:to-[#01051c] justify-center xl:p-6 w-full rounded-xl col-span-1 border border-white/[.2] shadow-md"
    >
      <div className="m-3">
        <div className="relative w-full pt-[56.25%] rounded-xl mb-4">
          <div
            onClick={() => handleProjectClick(project)}
            className="absolute inset-0 rounded-xl cursor-pointer"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              sizes='100%'
              className="rounded-xl select-none object-cover hover:scale-105 duration-200"
            />
          </div>
        </div>
        <div className="relative flex flex-col w-full mr-2">
          <div className="flex w-full justify-between select-none">
            <div className="flex flex-col">
              <a
                href={project.liveSite}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProjectEvent('live_site_click', project.title, { source: 'grid' })}
                className="flex flex-row justify-start items-center mb-1 select-none cursor-default"
              >
                <span className="flex flex-row text-xl xl:text-3xl font-sans font-bold items-center justify-center gap-1 select-none">
                  <h2 className="text-3xl font-bold mb-2 flex justify-center decoration-3 hover-underline-animation whitespace-nowrap select-none">
                    {project.title}
                  </h2>
                  <MdOpenInNew className="flex justify-center items-center w-5 h-5" />
                </span>
              </a>
              <span className="text-base xl:text-md font-sans font-bold pb-2 -mt-3 select-none whitespace-nowrap">
                {project.subTitle}
              </span>
            </div>
            <span className="flex flex-row justify-end items-end gap-2 md:gap-4 pb-2 select-none">
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
                onClick={() => handleProjectClick(project)}
              >
                <MdOutlineUnfoldMore className="w-5 h-5 mr-1" />
                <span className="hidden 1md:inline-block text-sm underline underline-offset-2 whitespace-nowrap decoration-2 hover-underline-animation hover-underline-animation-trigger select-none">
                  Details
                </span>
              </span>
            </span>
          </div>
          <p className="text:text-white h-10 mt-1 dark:text-slate-300 select-none">
            {project.des}
          </p>
          <IconCycle
            technologies={project.technologies}
            orientation="h"
            view="simple"
            initialCategory={iconCycleStates[project.id]?.currentCategory}
            initialIconIndex={iconCycleStates[project.id]?.cycledIconIndex}
            onStateChange={onStateChange}
            onIconClick={() => handleIconClick(project)}
            projectId={project.id}
          />
        </div>
      </div>
    </div>
  );
})}
      </div>
      <AnimatePresence>
        {selectedProject && (
         <ProjectModal
         project={selectedProject}
         isOpen={!!selectedProject}
         onClose={() => setSelectedProject(null)}
         iconCycleState={
           iconCycleStates[selectedProject.id] || getInitialIconCycleState(selectedProject.id)
         }
         setIconCycleState={modalStateChangeHandler} 
       />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
