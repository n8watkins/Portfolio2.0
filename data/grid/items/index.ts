/**
 * Grid Items - Barrel Export
 *
 * Centralized export for all grid item configurations.
 * Each grid item is defined in its own file for better organization and maintainability.
 *
 * BENEFITS:
 * - Single Responsibility: Each file contains one grid item
 * - Easier Navigation: Find specific grid items quickly
 * - Better Git Diffs: Changes to one item don't affect others
 * - Reusability: Items can be imported individually if needed
 */

export { gridItem1 } from './gridItem1'
export { gridItem2 } from './gridItem2'
export { gridItem3 } from './gridItem3'
export { gridItem4 } from './gridItem4'
export { gridItem5 } from './gridItem5'
export { gridItem6 } from './gridItem6'

// Re-export as array for convenience
import { gridItem1 } from './gridItem1'
import { gridItem2 } from './gridItem2'
import { gridItem3 } from './gridItem3'
import { gridItem4 } from './gridItem4'
import { gridItem5 } from './gridItem5'
import { gridItem6 } from './gridItem6'

export const gridItems = [gridItem1, gridItem2, gridItem3, gridItem4, gridItem5, gridItem6]
