# IconCycle refactor plan

`components/ui/ProjectComponents/iconCycle.tsx` (~530 lines) is the most complex
component in the app. It works, but it's fragile and hard to change. This is a
plan to refactor it **incrementally and safely** — no big-bang rewrite. Nothing
here needs to ship at once; each phase is independently shippable and testable.

> **Status (2026-06-19): steps 1–6 essentially DONE.**
> - **Step 1 (tests):** `tests/icon-cycle.spec.ts` — a Playwright spec locking
>   auto-cycle, reduced-motion, hover-pause/highlight, category-nav, icon→modal,
>   and keyboard operability (6 tests, all green). These caught a real hover
>   regression mid-refactor.
> - **Step 2:** `allIcons` is a `useMemo`; loading skeleton / `renderFrontendIcons`
>   / `setTimeout` deleted.
> - **Step 3:** the imperative `setInterval` + the `isManualHoverRef` /
>   `currentCategoryRef` / `allIconsRef` ref-mirrors collapsed to one declarative
>   effect.
> - **Step 4:** state collapsed to **one source of truth** — `cycledIconIndex` +
>   an ephemeral `preview` ({icons, descriptionIndex, kind}); `currentCategory`,
>   `highlightedDescriptionIndex`, `hoveredIcons`, and the pause flag are all
>   derived. (Also fixed a pre-existing duplicate-`gemini.svg` key collision in
>   Echo's Backend by giving the Live engine a dedicated WebSocket icon.)
> - **Step 5:** `onStateChange` sync simplified — dropped the redundant
>   `lastStateRef` diff (the effect only fires on real primitive changes).
> - **Step 6 (a11y):** the tech icons are now real keyboard-operable
>   `<motion.button>`s (focus ring, `onFocus`/`onBlur` mirror hover, Enter opens
>   the modal). Category-nav chevrons were buttonized earlier.
>
> **Deferred (optional, code-org only):** the *component extraction* part of step 6
> — pulling a shared `<IconRow>`/`<IconButton>` out of `renderIcons`/`renderDetailedView`.
> The user-facing accessibility it was meant to deliver is already done; this is a
> pure tidiness refactor that can happen anytime. Note `renderDetailedView` (the
> `view="detailed"` path) is currently unused — only `view="simple"` ships — so it's
> a candidate for deletion if the detailed view isn't planned.

---

## 1. What it does (so we don't lose behavior)

A per-project widget that displays a project's tech stack as cyclable icons:

- **Categories** (Frontend / Backend / Cloud) with prev/next nav.
- **Auto-cycle**: every 3s it advances to the next icon, crossing into the next
  category when it runs out — unless the user is hovering.
- **Hover / click**: hovering an icon (or a description bullet, in detailed view)
  pauses the cycle and highlights that icon + its description; clicking opens the
  project modal.
- **Two views**: `simple` (project cards) and `detailed` (inside the modal),
  which share the icon row but differ in chrome.
- **State persistence**: it reports its position up via `onStateChange` and
  restores from `initialCategory`/`initialIconIndex`, so a card and its modal
  stay in sync.

The refactor must preserve all of the above.

---

## 2. Why it's hard to maintain (the actual problems)

1. **State sprawl with overlapping sources of truth.** 7 `useState` + 5 `useRef`
   track what is really *one* selection: `currentCategory`, `cycledIconIndex`
   (a flat index into `allIconsRef`), `highlightedDescriptionIndex`,
   `hoveredIcons`, `hoveredDescriptionIndex`, plus `isFirstRender`/`loading`.
   `cycledIconIndex`, `currentCategory`, and `highlightedDescriptionIndex` must
   be kept mutually consistent **by hand** in every handler — the classic
   desync trap.

2. **Refs used to dodge stale closures.** `allIconsRef`, `currentCategoryRef`,
   and `isManualHoverRef` are ref-mirrors of state, kept only so the
   `setInterval` callback (created once) can read fresh values. This is the root
   cause of most of the complexity.

3. **`allIconsRef` is populated in an effect, then read during render.**
   `currentIcon = allIconsRef.current[cycledIconIndex]` can be `undefined` on the
   first render (effect hasn't run yet), which is why a `loading` skeleton +
   `setTimeout(…, 800)` exists at all — it papers over a render-ordering bug.

4. **Imperative interval management.** `startAutoCycle` / `resetCycling` are
   cleared and restarted from ~6 call sites (mount, hover, hover-end, category
   click, description hover/-end). Reasoning about "is the timer running right
   now?" requires reading all of them.

5. **Manual parent-sync with loop guards.** Reporting state up uses a
   `lastStateRef` deep-compare plus a `didMountRef` flag to avoid feedback loops
   — a smell that signals the data flow is fighting React.

6. **Duplicated render paths.** `renderIcons` and `renderFrontendIcons` both draw
   icon rows with slightly different markup; `simple`/`detailed` repeat layout.

7. **Accessibility gaps.** Icons are clickable `<div>`s (not keyboard-operable,
   no roles/labels). *(Category chevrons were converted to `<button>`s in the
   a11y pass; the icons themselves remain.)*

---

## 3. Goals

- One source of truth for "what's selected," everything else derived.
- No ref-mirrors of state; no render-time reads of effect-populated refs.
- The auto-cycle owned by one declarative hook, paused via a boolean.
- Shared, accessible icon-row rendering across both views.
- Behavior-preserving: same visuals, same persistence, same modal trigger.

---

## 4. Target architecture

### 4a. Derive the icon list with `useMemo` (kills problem #2/#3)

```ts
type FlatIcon = { id: string; icon: string; category: keyof Technologies; descriptionIndex: number }

const allIcons = useMemo<FlatIcon[]>(() =>
  categories.flatMap((category) =>
    technologies[category].descriptionParts.flatMap((part, descriptionIndex) =>
      part.icons.map((t) => ({
        id: `${category}:${descriptionIndex}:${t.icon}`,
        icon: t.icon, category, descriptionIndex,
      }))
    )
  ), [technologies])
```

Available on the **first** render → `currentIcon` is never `undefined` → the
`loading`/`isFirstRender`/`setTimeout` skeleton can be deleted entirely.

### 4b. Collapse selection to one piece of state

Track a single `activeIndex` (into `allIcons`). Derive everything else:

```ts
const [activeIndex, setActiveIndex] = useState(initialIconIndex)
const active = allIcons[activeIndex] ?? allIcons[0]
const currentCategory = active.category                 // derived, not state
const highlightedDescriptionIndex = active.descriptionIndex  // derived
```

`hoveredIcons`/`hoveredDescriptionIndex` become a single optional
`hoverIndex: number | null`; "is the user interacting" is just `hoverIndex !== null`.
This removes `currentCategoryRef`, `isManualHoverRef`, and most setters.

Category nav becomes "jump `activeIndex` to the first icon of the target
category" — a pure function over `allIcons`.

### 4c. One declarative auto-cycle hook (kills problem #4)

```ts
function useAutoCycle(enabled: boolean, advance: () => void, intervalMs = 3000) {
  const prefersReduced = useReducedMotion()
  useEffect(() => {
    if (!enabled || prefersReduced) return
    const id = setInterval(advance, intervalMs)
    return () => clearInterval(id)
  }, [enabled, prefersReduced, advance, intervalMs])
}

// usage:
useAutoCycle(hoverIndex === null, () => setActiveIndex((i) => (i + 1) % allIcons.length))
```

`advance` is stable via `useCallback`/functional updates — no ref-mirror needed
because the effect re-subscribes when `enabled` flips. This replaces
`startAutoCycle` + `resetCycling` + all the manual `clearInterval` calls.

### 4d. Simplify parent sync (kills problem #5)

Report up with a single effect keyed on the derived selection; no
`lastStateRef`/`didMountRef` needed once selection is one value:

```ts
useEffect(() => {
  onStateChange?.({ currentCategory, cycledIconIndex: activeIndex, highlightedDescriptionIndex })
}, [activeIndex])  // category/description are derived from activeIndex
```

(Stretch goal: make the component fully *controlled* by lifting `activeIndex`
into the parent, eliminating the round-trip entirely.)

### 4e. Extract shared presentational pieces (kills problem #6/#7)

- `<CategoryNav category onPrev onNext />` — already button-based.
- `<IconButton flat active onHover onLeave onSelect />` — a real `<button>` with
  `aria-label={getTechName(icon)}` and `aria-pressed={active}`. Used by both views.
- `<TechName names />` — the animated label.

`renderIcons` and `renderFrontendIcons` collapse into one `<IconRow>` driven by
`allIcons` filtered to `currentCategory`.

---

## 5. Incremental migration order (each step ships green)

1. **Add tests first** (see §7) to lock current behavior.
2. **Derive `allIcons` via `useMemo`**; delete the populating effect. Keep the
   rest. Then delete `loading`/`isFirstRender`/`setTimeout` skeleton. *(Pure
   internal change; biggest risk-reduction for least surface area.)*
3. **Replace the interval with `useAutoCycle`**; delete `startAutoCycle`/
   `resetCycling`/`isManualHoverRef`/`currentCategoryRef`.
4. **Collapse selection** to `activeIndex` + `hoverIndex`; derive category and
   description; remove redundant setters.
5. **Simplify the `onStateChange` effect**; drop the diff/guard refs.
6. **Extract `<IconButton>`/`<IconRow>`/`<CategoryNav>`/`<TechName>`** and unify
   the two views. Make icons keyboard-operable here.
7. Delete now-dead code; final a11y sweep.

Stop after any step — each is a strict improvement.

---

## 6. Risks & gotchas

- **Persistence parity**: a card and its modal share state via
  `onStateChange`/`initialIconIndex` (see `Projects/index.tsx`
  `onStateChangeMap` + `getInitialIconCycleState`). Keep the
  `IconCycleState` shape identical so the parent doesn't change in the same PR.
- **Index stability**: `initialIconIndex` is a flat index — if the derived
  `allIcons` ordering changes, restoration breaks. Preserve category→part→icon
  iteration order exactly (it already matches).
- **Hover vs auto-cycle race**: ensure hovering immediately pauses (set
  `hoverIndex` synchronously) so `useAutoCycle`'s `enabled` flips before the next
  tick.
- **`onIconClick` opens the modal** — keep click distinct from hover so keyboard
  Enter/Space on the new `<button>`s triggers select, not just hover preview.

---

## 7. Testing (do this before refactoring)

There are currently no tests for this component. Add, via the existing Vitest/RTL
setup (mirrors the `examples/*` projects):

- Renders all icons for a project; first icon highlighted.
- Auto-advances after `HOVER_INTERVAL` (fake timers); wraps across categories.
- Hover pauses; mouse-leave resumes.
- Category prev/next jumps to that category's first icon.
- `onStateChange` fires with the right shape; `initialIconIndex` restores.
- With `prefers-reduced-motion`, no auto-advance (the timer never starts).
- Keyboard: Tab to an icon button, Enter calls `onIconClick`.

These tests are the safety net that makes steps 2–6 mechanical.

---

## 8. Rough effort

~½–1 day with the tests in place. Steps 2–3 alone (derive `allIcons`, declarative
interval) remove most of the fragility for ~2 hours and are the recommended
**minimum** if a full pass isn't wanted.
