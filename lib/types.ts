export interface Technology {
  name: string
  icon: string
}

export type TechnologyItem = Technology | string

export interface TechnologiesType {
  [key: string]: TechnologyItem[]
}

export interface Project {
  id: number
  title: string
  des: string
  img: string
  technologies: TechnologiesType
  github: string
  liveSite: string
}
