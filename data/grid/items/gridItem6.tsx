import CurrentBuildsCarousel from '@/components/ui/BentoComponents/CurrentBuildsCarousel'
import type { GridItemConfig } from '@/lib/types/gridItem'

/**
 * Grid Item 6: "Currently building" — an enlarged bento card with a carousel of
 * the projects I'm actively shipping in public (Scribe, TLDW, Portfolio Ranker),
 * each with a visual, a live indicator, a timer, and links out to n8builds.dev.
 */
export const gridItem6: GridItemConfig = {
  id: 6,
  title: '',
  description: '',
  gridItemContainer: 'col-span-2 row-span-4 md:col-span-4 md:row-span-3 xl:row-span-5',

  textContainerClassName: '',
  titleClassName: '',
  textOrder: '',
  buttonContainer: '',
  buttonClass: '',

  renderForeground: () => <CurrentBuildsCarousel />,
}
