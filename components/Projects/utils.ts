import { Project, Technologies, IconCycleState } from '@/lib/types'

/**
 * Creates initial icon cycle state for a project
 *
 * Returns the initial state with:
 * - First technology category as current category
 * - Index 0 for cycled icon
 * - Index 0 for highlighted description
 *
 * @param projectId - The ID of the project
 * @param projects - Array of all projects
 * @returns Initial IconCycleState for the project
 */
export const getInitialIconCycleState = (
  projectId: number,
  projects: Project[]
): IconCycleState => {
  const project = projects.find((p) => p.id === projectId)
  return {
    currentCategory: project
      ? (Object.keys(project.technologies)[0] as keyof Technologies)
      : 'Frontend',
    cycledIconIndex: 0,
    highlightedDescriptionIndex: 0,
  }
}

/**
 * Creates memoized state handler map for all projects
 *
 * This function creates a map of project IDs to their state change handlers,
 * which is useful for memoization to prevent unnecessary re-renders.
 *
 * @param projects - Array of all projects
 * @param getOnStateChange - Function that returns a state change handler for a project ID
 * @returns Record mapping project IDs to their state change handlers
 */
export const createStateHandlerMap = (
  projects: Project[],
  getOnStateChange: (projectId: number) => (
    state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)
  ) => void
): Record<number, (state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => void> => {
  const result: Record<number, (state: IconCycleState | ((prevState: IconCycleState) => IconCycleState)) => void> = {}
  for (const project of projects) {
    result[project.id] = getOnStateChange(project.id)
  }
  return result
}
