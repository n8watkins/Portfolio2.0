import { ReactNode } from 'react'

export interface GridItemConfig {
  id: number
  title?: string | ReactNode
  description?: string | ReactNode
  gridItemContainer: string
  img?: string
  imgClassName?: string
  titleClassName?: string
  textContainerClassName?: string
  imgContainerClass?: string
  descriptionClass?: string
  textOrder?: string
  buttonClass?: string
  buttonContainer?: string
  duration?: string

  // Composition render functions
  renderBackground?: () => ReactNode
  renderContent?: () => ReactNode
  renderForeground?: () => ReactNode
}
