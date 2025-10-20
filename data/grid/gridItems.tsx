import Image from 'next/image'
import dynamic from 'next/dynamic'
import GridPattern from '@/components/magicui/grid-pattern'
import MapDetails from '@/components/ui/BentoComponents/MapDetails'
import { TechStack } from '@/components/features/TechStack'
import ResumeButtons from '@/components/ui/BentoComponents/ResumeButtons'
import ScrollButton from '@/components/ui/BentoComponents/ScrollButton'
import type { GridItemConfig } from '@/lib/types/gridItem'

const EmailButton = dynamic(
  () => import('@/components/ui/BentoComponents/EmailButton'),
  { ssr: false }
)

/**
 * Grid Item 1: "My Start" - Origin story about COVID-era Chrome extension
 *
 * RESPONSIVE LAYOUT STRATEGY:
 * - Mobile (base): Text stacked on top, image below (18rem from top)
 * - Tablet (md): Text left, image right (side-by-side layout)
 * - Desktop (lg): Returns to stacked layout for better content flow
 * - XL screens: Back to side-by-side with more horizontal space
 *
 * This alternating pattern ensures optimal readability at each breakpoint.
 */
const createGridItem1 = (): GridItemConfig => {
  // Image container with responsive positioning
  // Mobile → Tablet (side-by-side) → Desktop (stacked) → XL (side-by-side)
  const imgContainerClass =
    'absolute ' +
    // Mobile: 80% width, positioned 18rem from top (below text)
    'w-[80%] h-[50%]  ' + // Base size
    'top-[18rem] ' + // Base position
    // Tablet: Smaller (30%), positioned on right side, vertically centered
    'md:w-[30%] md:h-[70%] md:left-60 md:top-1/2 md:-translate-y-1/2 ' +
    // Desktop: Returns to mobile-like stacked layout (80% width, below text)
    'lg:w-[80%] lg:h-[50%] lg:left-0 lg:top-[18rem] lg:translate-y-0 ' +
    // XL: Side-by-side again (27% width, far right, vertically centered)
    'xl:w-[27%] xl:h-[80%] xl:left-80 xl:top-1/2 xl:-translate-y-1/2 ' +
    // Visual polish: layering, corners, smooth transitions
    'z-30 rounded-3xl overflow-visible mx-auto aspect-ratio ' +
    'transition-all duration-300 ease-in-out ' +
    'shadow-lg'

  // Hover effect: subtle scale up on group hover
  const imgClassName =
    'flex relative aspect-ratio rounded-3xl item-center justify-center group-hover:scale-105 transition duration-200'

  const img = '/bento/laptop.jpeg'

  return {
    id: 1,
    gridItemContainer:
      'col-span-2 row-span-4 h-[40rem]  md:row-span-2 md:col-span-4 lg:col-span-2 lg:row-span-4 xl:col-span-4 md:h-[20rem] lg:h-[40rem] xl:h-[20rem]  xl:w-[100%] ',
    title: 'My Start',
    description:
      'During COVID, I built a Chrome extension to automate class attendance. Coding to make life easier flipped my learning paradigm.',
    imgContainerClass,
    imgClassName,
    duration: 'rounded-3xl z-10',
    img,
    textContainerClassName:
      'absolute inset-0 flex flex-col justify-center ' +
      'p-6 md:p-8 ' +
      'z-20 text-slate-200 ' +
      'w-full md:w-2/3 lg:w-1/2',
    textOrder: ' ',
    titleClassName:
      'absolute top-4 font-sans  transition duration-200 group-hover:translate-x-2 font-bold ' +
      'text-2xl sm:text-3xl md:text-3xl  lg:w-[22rem] lg:text-4xl ' +
      'mb-4 ' +
      'select-none',
    descriptionClass:
      'transition duration-200  group-hover:translate-x-2 absolute top-14 md:top-[4rem] lg:top-[4.5rem] text-base font-semibold sm:text-lg md:w-[24rem] md:text-lg lg:w-[24rem] xl:w-[35rem] ' +
      'text-slate-300  ' +
      'select-none',
    buttonContainer: '',
    buttonClass: '',

    renderBackground: () => (
      <div className="relative w-full h-full overflow-hidden">
        <GridPattern className="absolute inset-0 z-10" />
        <div className={`relative z-30 ${imgContainerClass}`}>
          <Image
            src={img}
            fill
            sizes="100%"
            className={`rounded-3xl ${imgClassName}`}
            alt="Bento grid image"
            priority
          />
        </div>
      </div>
    ),
  }
}

const createGridItem2 = (): GridItemConfig => {
  const imgContainerClass = 'relative w-full h-full group overflow-hidden rounded-3xl'
  const imgClassName = 'absolute top-0   rounded-3xl  z-10  transition duration-500'
  const img = '/bento/globe.jpeg'

  return {
    id: 2,
    title: 'Ready to relocate',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-3 sm:row-span-3   md:col-span-2 lg:col-span-2 lg:row-span-3 xl:col-span-2 xl:row-span-6 ',
    imgContainerClass,
    imgClassName,
    textContainerClassName:
      'bottom-0 w-full h-32 left-0  pt-10 h-52 bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621] dark:to-[#020621]/0 text-slate-200',
    titleClassName:
      'relative z-30 font-sans font-bold dark:text-neutral-200 flex  items-center  xs:pl-10 1sm:pl-5 pt-28 w-full h-[5rem] select-none text-2xl lg:text-4xl',
    textOrder: 'group-hover:translate-x-2 duration-200',
    img,
    buttonContainer: '',
    buttonClass: '',

    renderBackground: () => (
      <div className="relative w-full h-full overflow-hidden">
        <div className={imgContainerClass}>
          <Image
            src={img}
            fill
            sizes="100%"
            className={imgClassName}
            alt={img}
            loading="lazy"
          />
        </div>
      </div>
    ),

    renderContent: () => <MapDetails />,
  }
}

const createGridItem3 = (): GridItemConfig => {
  return {
    id: 3,
    title: 'My tech stack',
    description: 'I constantly try to improve',
    gridItemContainer:
      'col-span-2 row-span-3 md:col-span-2  lg:col-span-2  lg:row-span-3 xl:col-span-2 xl:row-span-6',
    imgClassName: '',
    textContainerClassName:
      'absolute  bottom-0 pt-16 h-40 w-full bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-slate-200 dark:text-white  ',
    textOrder: 'flex flex-col-reverse xs:pl-10 1sm:pl-5 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-2xl lg:text-4xl items-center  select-none ',
    descriptionClass: 'relative text-base w-[50%]  font-bold nowrap whitespace-nowrap select-none ',
    img: '',
    buttonContainer: '',
    buttonClass: '',

    renderForeground: () => <TechStack />,
  }
}

const createGridItem4 = (): GridItemConfig => {
  const imgContainerClass = '  '
  const imgClassName =
    'absolute w-full h-full pl-52 1sm:pt-10 1sm:h-[10rem] pt-0 rounded-3xl  z-10 group-hover:scale-105 transition duration-500 group-hover:translate-y-10 group-hover:translate-x-6  '
  const img = '/bento/resume.svg'
  const buttonContainer = 'flex items-center justify-evenly z-50 w-full h-full pb-14'
  const buttonClass = `inline-flex h-12 py-2 px-6 z-[5000] animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[length:200%_100%] font-medium text-slate-200 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms] cursor-pointer`

  return {
    id: 4,
    title: 'Check out my resume!',
    description: '',
    gridItemContainer:
      'col-span-2 row-span-1 md:col-span-2  lg:col-span-2 xl:row-span-2 xl:col-span-2 group  ',
    imgContainerClass,
    imgClassName,
    img,
    textContainerClassName:
      'flex items-center justify-start xs:pl-10 1sm:pl-5  w-full h-full whitespace-nowrap dark:via-[#020621]/90 dark:to-[#020621]/0 ',
    textOrder:
      'group-hover:-translate-y-20 group-hover:translate-x-[3.5rem] 1sm:group-hover:translate-x-[0rem] sm:group-hover:translate-x-[5.5rem] duration-200 md:group-hover:translate-x-[1rem] xl:group-hover:translate-x-[3rem] ',
    titleClassName:
      'flex transition duration-300  pt-[5rem] z-30 font-sans font-bold   select-none text-slate-200 dark:text-neutral-200  text-2xl lg:text-3xl text-start w-full',
    buttonContainer,
    buttonClass,

    renderBackground: () => (
      <div className="relative w-full h-full overflow-hidden">
        <div className={`relative w-full h-full ${imgContainerClass}`}>
          <Image
            src={img}
            fill
            sizes="100%"
            className={imgClassName}
            alt={img}
            loading="lazy"
          />
        </div>
      </div>
    ),

    renderContent: () => (
      <ResumeButtons buttonClass={buttonClass} buttonContainer={buttonContainer} />
    ),
  }
}

const createGridItem5 = (): GridItemConfig => {
  const buttonContainer = 'flex items-center  justify-evenly z-50     w-full h-full pt-10 '
  const buttonClass = `inline-flex h-12  py-2 px-6  z-[5000] animate-shimmer items-center justify-center rounded-md border border-slate-800  bg-[length:200%_100%] font-medium text-slate-200 transition-transform focus:outline-none focus:ring-0 focus:ring-offset-slate-50 hover:scale-105 animate-duration-[3000ms]`

  return {
    id: 5,
    title: '',
    description: '',
    gridItemContainer: 'col-span-2 row-span-2 md:row-span-1 lg:col-span-2 xl:row-span-2 ',
    imgClassName: '',
    textContainerClassName: '',
    titleClassName: ' pt-16 h-40  rounded-b-3xl select-none',
    textOrder: '',
    img: '',
    buttonContainer,
    buttonClass,

    renderForeground: () => (
      <div className="absolute w-full h-full">
        <EmailButton buttonClass={buttonClass} buttonContainer={buttonContainer} />
      </div>
    ),
  }
}

const createGridItem6 = (): GridItemConfig => {
  const imgContainerClass = 'absolute top-10  w-full h-full '
  const imgClassName = 'absolute pl-40 '
  const img = '/bento/code.svg'

  return {
    id: 6,
    title: "Currently building an AI-driven lead generation tool powered by OpenAI's Realtime API",
    description: 'The Inside Scoop ',
    gridItemContainer: 'col-span-2 row-span-3 md:col-span-4 md:row-span-2 xl:row-span-4',
    imgContainerClass,
    imgClassName,
    img,
    textContainerClassName:
      'absolute  top-0 pt-5 h-52 w-full bg-gradient-to-b rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-slate-200 dark:text-white select-none ',
    textOrder: 'flex flex-col-reverse xs:pl-10 1sm:pl-5 group-hover:translate-x-2 duration-200',
    titleClassName: ' font-sans font-bold text-2xl lg:text-4xl items-center   ',
    descriptionClass:
      'relative text-sm w-[50%]  font-semibold dark:font-normal nowrap whitespace-nowrap select-none',
    buttonContainer: '',
    buttonClass: '',

    renderBackground: () => (
      <div className={`relative w-full h-full ${imgContainerClass}`}>
        <Image
          src={img}
          fill
          sizes="100%"
          className={imgClassName}
          alt={img}
          loading="lazy"
        />
      </div>
    ),

    renderContent: () => (
      <div className="flex relative items-start justify-center w-2/5 h-full pl-10 1md:pl-5 1lg:pl-1  pt-5 1md:pt-10  lg:right-3  xl:pt-20 xl:right-5 xl:items-center">
        <div className="flex  items-center justify-center">
          <ScrollButton
            link="projects"
            className=" lg:h-14  w-fit whitespace-nowrap 1md:w-40"
            text="Check it out!"
          />
        </div>
      </div>
    ),
  }
}

export const gridItems: GridItemConfig[] = [
  createGridItem1(),
  createGridItem2(),
  createGridItem3(),
  createGridItem4(),
  createGridItem5(),
  createGridItem6(),
]
