import Image from 'next/image'
import ScrollButton from '@/components/ui/BentoComponents/ScrollButton'
import type { GridItemConfig } from '@/lib/types/gridItem'

/**
 * Grid Item 6: "The Inside Scoop" - Current project showcase
 *
 * VISUAL STRATEGY:
 * - Code/development icon as background
 * - Gradient overlay at top for text readability
 * - CTA button to scroll to projects section
 * - Highlights current work (AI lead generation tool)
 */
export const gridItem6: GridItemConfig = {
  id: 6,
  title: "Currently building an AI-driven lead generation tool powered by OpenAI's Realtime API",
  description: 'The Inside Scoop ',
  gridItemContainer: 'col-span-2 row-span-3 md:col-span-4 md:row-span-2 xl:row-span-4',

  imgContainerClass: 'absolute top-10  w-full h-full ',
  imgClassName: 'absolute pl-40 ',
  img: '/bento/code.svg',

  textContainerClassName:
    'absolute  top-0 pt-5 lg:pt-8 h-52 w-full bg-gradient-to-b rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621]/90 dark:to-[#020621]/0 z-30 text-slate-200 dark:text-white select-none ',

  textOrder: 'flex flex-col-reverse xs:pl-10 1sm:pl-5 group-hover:translate-x-2 duration-200',

  titleClassName: ' font-sans font-bold text-2xl lg:text-4xl items-center   ',

  descriptionClass:
    'relative text-sm w-[50%]  font-semibold dark:font-normal nowrap whitespace-nowrap select-none',

  buttonContainer: '',
  buttonClass: '',

  renderBackground: () => (
    <div className="relative w-full h-full absolute top-10  w-full h-full ">
      <Image
        src="/bento/code.svg"
        fill
        sizes="100%"
        className="absolute pl-40 "
        alt="/bento/code.svg"
        loading="lazy"
      />
    </div>
  ),

  renderContent: () => (
    <div className="flex relative items-start justify-center w-2/5 h-1/2 xl:h-full pl-10 1md:pl-5 1lg:pl-1  pt-5 1md:pt-10  lg:right-3  xl:pt-20 xl:right-5 xl:items-center">
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
