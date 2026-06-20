import Image from 'next/image'
import CurrentBuildsCarousel from '@/components/ui/BentoComponents/CurrentBuildsCarousel'
import type { GridItemConfig } from '@/lib/types/gridItem'

/**
 * Grid Item 6: "Currently building" — a carousel of the projects I'm actively
 * shipping in public (Scribe, TLDW, Portfolio Ranker), cycling over a code
 * background, with a CTA out to n8builds.dev where the builds are documented.
 */
export const gridItem6: GridItemConfig = {
  id: 6,
  title: '',
  description: '',
  gridItemContainer: 'col-span-2 row-span-3 md:col-span-4 md:row-span-2 xl:row-span-4',

  textContainerClassName: '',
  titleClassName: '',
  textOrder: '',
  buttonContainer: '',
  buttonClass: '',

  renderBackground: () => (
    <div className="relative w-full h-full absolute top-10  w-full h-full ">
      <Image src="/bento/code.svg" fill sizes="100%" className="absolute pl-40 " alt="" loading="lazy" />
    </div>
  ),

  renderForeground: () => <CurrentBuildsCarousel />,
}
