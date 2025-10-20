import Image from 'next/image'
import MapDetails from '@/components/ui/BentoComponents/MapDetails'
import type { GridItemConfig } from '@/lib/types/gridItem'

/**
 * Grid Item 2: "Ready to relocate" - Location availability with globe visual
 *
 * VISUAL STRATEGY:
 * - Full-size globe image as background
 * - Gradient overlay at bottom for text readability
 * - Title positioned at bottom with smooth hover effect
 */
export const gridItem2: GridItemConfig = {
  id: 2,
  title: 'Ready to relocate',
  description: '',
  gridItemContainer:
    'col-span-2 row-span-3 sm:row-span-3   md:col-span-2 lg:col-span-2 lg:row-span-3 xl:col-span-2 xl:row-span-6 ',

  imgContainerClass: 'relative w-full h-full group overflow-hidden rounded-3xl',
  imgClassName: 'absolute top-0   rounded-3xl  z-10  transition duration-500',
  img: '/bento/globe.jpeg',

  textContainerClassName:
    'bottom-0 w-full h-32 left-0  pt-10 h-52 bg-gradient-to-t rounded-b-3xl from-blue-500 via-blue-500 to-blue-500/0 dark:from-[#020621] dark:via-[#020621] dark:to-[#020621]/0 text-slate-200',

  titleClassName:
    'relative z-30 font-sans font-bold dark:text-neutral-200 flex  items-center  xs:pl-10 1sm:pl-5 pt-28 w-full h-[5rem] select-none text-2xl lg:text-4xl',

  textOrder: 'group-hover:translate-x-2 duration-200',

  buttonContainer: '',
  buttonClass: '',

  renderBackground: () => (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-full group overflow-hidden rounded-3xl">
        <Image
          src="/bento/globe.jpeg"
          fill
          sizes="100%"
          className="absolute top-0   rounded-3xl  z-10  transition duration-500"
          alt="/bento/globe.jpeg"
          loading="lazy"
        />
      </div>
    </div>
  ),

  renderContent: () => <MapDetails />,
}
