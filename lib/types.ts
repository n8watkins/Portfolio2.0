export interface TechIcon {
  icon: string
}

export interface DescriptionPart {
  text: string
  icons: TechIcon[]
}

export interface TechnologyCategory {
  descriptionParts: DescriptionPart[]
}

export interface Technologies {
  Frontend: TechnologyCategory
  Backend: TechnologyCategory
  Cloud: TechnologyCategory
}

export interface Project {
  id: number
  title: string
  subTitle: string
  des: string
  images: string[]
  technologies: Technologies
  github?: string
  liveSite: string
}

export type TechNameMappingInterface = {
  [key: string]: string
}

export interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}
