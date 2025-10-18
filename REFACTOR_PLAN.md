# Component Refactoring Plan

## Overview
This document outlines the plan to refactor the `Projects.tsx` component (currently 640 lines) into smaller, more maintainable components following single responsibility principles.

---

## Current Issues

### Projects.tsx (640 lines)
**Problems:**
- Multiple responsibilities (image slider, modal, state management, analytics)
- Complex state management with multiple useState/useCallback hooks
- Difficult to test and maintain
- Long file makes navigation and debugging harder

---

## Refactoring Strategy

### Phase 1: Extract ImageSlider Component

**Current Location:** `components/Projects.tsx` (lines 22-283)

**New Location:** `components/Projects/ImageSlider.tsx`

**Responsibilities:**
- Image display with navigation
- Auto-cycling behavior
- Intersection observer for lazy loading
- Keyboard navigation
- Fullscreen modal view

**Props Interface:**
```typescript
interface ImageSliderProps {
  images: string[]
  isModalOpen: boolean
  projectTitle?: string  // For analytics
}
```

**Benefits:**
- Reusable across other projects
- Isolated logic for image handling
- Easier to test slider behavior independently
- ~260 lines → separate file

---

### Phase 2: Extract ProjectModal Component

**Current Location:** `components/Projects.tsx` (lines 297-412)

**New Location:** `components/Projects/ProjectModal.tsx`

**Responsibilities:**
- Display project details in modal
- Handle modal open/close
- Render project metadata (title, links, tech stack)
- Integrate ImageSlider component

**Props Interface:**
```typescript
interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  iconCycleState: IconCycleState
  onIconCycleStateChange: (state: IconCycleState | ((prev: IconCycleState) => IconCycleState)) => void
}
```

**Benefits:**
- Cleaner modal logic
- Easier to update modal UI
- ~115 lines → separate file

---

### Phase 3: Extract ProjectCard Component

**Current Location:** `components/Projects.tsx` (lines 534-620)

**New Location:** `components/Projects/ProjectCard.tsx`

**Responsibilities:**
- Display individual project in grid
- Handle click interactions
- Show project preview
- Render tech stack icons

**Props Interface:**
```typescript
interface ProjectCardProps {
  project: Project
  onProjectClick: (project: Project) => void
  onIconClick: (project: Project) => void
  iconCycleState?: IconCycleState
  onIconCycleStateChange: (state: IconCycleState | ((prev: IconCycleState) => IconCycleState)) => void
}
```

**Benefits:**
- Reusable project card
- Isolated interaction logic
- ~85 lines → separate file

---

### Phase 4: Create Project Utilities

**New Location:** `components/Projects/utils.ts`

**Contents:**
```typescript
// Icon cycle state helpers
export const getInitialIconCycleState = (projectId: number, projects: Project[]): IconCycleState => {
  const project = projects.find((p) => p.id === projectId)
  return {
    currentCategory: project ? (Object.keys(project.technologies)[0] as keyof Technologies) : 'Frontend',
    cycledIconIndex: 0,
    highlightedDescriptionIndex: 0,
  }
}

// State management helpers
export const createIconCycleStateHandlers = (
  setIconCycleStates: React.Dispatch<React.SetStateAction<Record<number, IconCycleState>>>,
  projects: Project[]
) => {
  // Returns memoized handlers for state updates
}
```

**Benefits:**
- Centralized utility functions
- Easier to test business logic
- Reduced component complexity

---

### Phase 5: Create Project Types

**New Location:** `components/Projects/types.ts`

**Contents:**
```typescript
export interface IconCycleState {
  currentCategory: keyof Technologies
  cycledIconIndex: number
  highlightedDescriptionIndex: number
}

export interface ProjectsState {
  selectedProject: Project | null
  iconCycleStates: Record<number, IconCycleState>
  isLargeDevice: boolean
  hasMouse: boolean
}

// Re-export from lib/types for convenience
export type { Project, Technologies } from '@/lib/types'
```

**Benefits:**
- Type safety across project components
- Single source of truth for project types
- Better IDE autocompletion

---

## Final Structure

```
components/
├── Projects/
│   ├── index.tsx              (~150 lines - main orchestrator)
│   ├── ImageSlider.tsx        (~260 lines - image display logic)
│   ├── ProjectModal.tsx       (~115 lines - modal UI)
│   ├── ProjectCard.tsx        (~85 lines - grid card UI)
│   ├── types.ts               (~30 lines - TypeScript types)
│   └── utils.ts               (~50 lines - helper functions)
└── Projects.tsx (DEPRECATED - remove after migration)
```

---

## Implementation Steps

### Step 1: Create Directory Structure
```bash
mkdir -p components/Projects
```

### Step 2: Extract ImageSlider
1. Create `components/Projects/ImageSlider.tsx`
2. Copy ImageSlider component code (lines 22-283)
3. Add proper imports and exports
4. Test independently

### Step 3: Extract ProjectModal
1. Create `components/Projects/ProjectModal.tsx`
2. Copy ProjectModal component code (lines 297-412)
3. Import ImageSlider component
4. Add proper imports and exports
5. Test modal functionality

### Step 4: Extract ProjectCard
1. Create `components/Projects/ProjectCard.tsx`
2. Copy project card rendering logic (lines 534-620)
3. Add proper imports and exports
4. Test card interactions

### Step 5: Create Utilities
1. Create `components/Projects/utils.ts`
2. Extract helper functions
3. Add JSDoc comments
4. Write unit tests (optional but recommended)

### Step 6: Create Types File
1. Create `components/Projects/types.ts`
2. Move interfaces and type definitions
3. Re-export from lib/types where appropriate

### Step 7: Refactor Main Component
1. Update `components/Projects/index.tsx`
2. Import extracted components
3. Simplify main component logic
4. Remove duplicated code
5. Ensure analytics still work

### Step 8: Testing & Validation
1. Test all interactions (click, hover, modal)
2. Verify analytics tracking still works
3. Check responsive behavior
4. Test keyboard navigation
5. Verify accessibility features

### Step 9: Cleanup
1. Delete old `components/Projects.tsx`
2. Update imports in `app/page.tsx`
3. Run type-check: `npm run type-check`
4. Run lint: `npm run lint`
5. Test build: `npm run build`

### Step 10: Documentation
1. Add JSDoc comments to all components
2. Update README if necessary
3. Document props and usage examples

---

## Benefits Summary

### Before:
- 1 file, 640 lines
- Multiple responsibilities
- Hard to test
- Complex state management
- Difficult to navigate

### After:
- 6 files, ~150 lines each (avg)
- Single responsibility per file
- Easy to test each component
- Clear state management
- Easy to navigate and maintain

### Additional Benefits:
- **Reusability:** ImageSlider can be used elsewhere
- **Testability:** Each component can be unit tested
- **Maintainability:** Easier to find and fix bugs
- **Readability:** Clear component boundaries
- **Scalability:** Easy to add new features
- **Performance:** Potential for better code splitting

---

## Migration Checklist

- [ ] Create `components/Projects/` directory
- [ ] Extract `ImageSlider.tsx`
- [ ] Extract `ProjectModal.tsx`
- [ ] Extract `ProjectCard.tsx`
- [ ] Create `utils.ts`
- [ ] Create `types.ts`
- [ ] Refactor `index.tsx`
- [ ] Update imports in `app/page.tsx`
- [ ] Test all functionality
- [ ] Run type-check
- [ ] Run lint
- [ ] Test production build
- [ ] Delete old `Projects.tsx`
- [ ] Commit changes

---

## Estimated Time

- **Setup & Planning:** 15 minutes ✓ (this document)
- **ImageSlider extraction:** 30 minutes
- **ProjectModal extraction:** 20 minutes
- **ProjectCard extraction:** 20 minutes
- **Utilities & Types:** 15 minutes
- **Main component refactor:** 30 minutes
- **Testing & Validation:** 45 minutes
- **Documentation:** 15 minutes

**Total:** ~3 hours

---

## Notes

- This is a **non-breaking change** if done carefully
- All existing functionality should be preserved
- Analytics tracking must continue to work
- Accessibility features must be maintained
- No visual changes should occur
- Consider adding unit tests during refactoring

---

## Future Enhancements (Post-Refactor)

Once refactored, we can more easily:
1. Add lazy loading for ProjectModal
2. Implement virtual scrolling for large project lists
3. Add project filtering/search
4. Enhance image optimization
5. Add unit tests for each component
6. Add Storybook stories for component documentation
