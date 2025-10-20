import Image from 'next/image'
import GridPattern from '@/components/magicui/grid-pattern'
import type { GridItemConfig } from '@/lib/types/gridItem'

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
export const gridItem1: GridItemConfig = {
  id: 1,
  gridItemContainer:
    'col-span-2 row-span-4 h-[40rem]  md:row-span-2 md:col-span-4 lg:col-span-2 lg:row-span-4 xl:col-span-4 md:h-[20rem] lg:h-[40rem] xl:h-[20rem]  xl:w-[100%] ',
  title: 'My Start',
  description:
    'During COVID, I built a Chrome extension to automate class attendance. Coding to make life easier flipped my learning paradigm.',

  // Image container with responsive positioning
  // Mobile → Tablet (side-by-side) → Desktop (stacked) → XL (side-by-side)
  imgContainerClass:
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
    'shadow-lg',

  // Hover effect: subtle scale up on group hover
  imgClassName:
    'flex relative aspect-ratio rounded-3xl item-center justify-center group-hover:scale-105 transition duration-200',

  img: '/bento/laptop.jpeg',
  duration: 'rounded-3xl z-10',

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
      <div
        className={
          'relative z-30 ' +
          'absolute ' +
          'w-[80%] h-[50%]  ' +
          'top-[18rem] ' +
          'md:w-[30%] md:h-[70%] md:left-60 md:top-1/2 md:-translate-y-1/2 ' +
          'lg:w-[80%] lg:h-[50%] lg:left-0 lg:top-[18rem] lg:translate-y-0 ' +
          'xl:w-[27%] xl:h-[80%] xl:left-80 xl:top-1/2 xl:-translate-y-1/2 ' +
          'z-30 rounded-3xl overflow-visible mx-auto aspect-ratio ' +
          'transition-all duration-300 ease-in-out ' +
          'shadow-lg'
        }
      >
        <Image
          src="/bento/laptop.jpeg"
          fill
          sizes="100%"
          className="rounded-3xl flex relative aspect-ratio rounded-3xl item-center justify-center group-hover:scale-105 transition duration-200"
          alt="Bento grid image"
          priority
        />
      </div>
    </div>
  ),
}
