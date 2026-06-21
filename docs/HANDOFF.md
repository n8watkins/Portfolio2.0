# HANDOFF — portfolio2.0

_Last updated: 2026-06-20 (session: full projects redesign — image-led cards + blog-style detail pages + "Building in public" bento; reCAPTCHA purge; unified GA4 analytics across n8builds.dev + subdomains; repo moved into `~/n8builds/`)._

## Project summary

Nathan Watkins' personal portfolio — an **online resume / digital card** that funnels visitors to **n8builds.dev** (his build-in-public site; project `n8builds-web`, source `~/n8builds/n8builds-web`) and **Appturnity** (consulting, https://appturnity.com). Dark-only, slate + sky-blue palette.

- **Location: `~/n8builds/portfolio2.0`** — moved here 2026-06-20 from `~/portfolio/portfolio2.0`, now a sibling of `n8builds-web`. Still its **own** git repo (`n8watkins/Portfolio2.0`) and its **own** Vercel project — NOT merged into n8builds-web.
- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind 3.4, framer-motion 12.
- Run: `npm run dev` → http://localhost:4829. Checks: `npm run build` / `type-check` / `lint`. Husky + lint-staged on commit.
- Tests: `npx playwright test --project=chromium --workers=1`. Specs: `tests/icon-cycle.spec.ts` (6, the redesign's coverage) + `tests/web-vitals.spec.ts`.
- Deploy: Vercel project **`portfolio`** → **portfolio.n8builds.dev**. Git-connected; pushes to `main` auto-deploy.
- **Fully committed + pushed through `fedc75a`. Clean tree, one branch (`main`), no worktrees/stashes.**

## This session (2026-06-20)

**Projects redesign (the big one):**
- Cards: alternating "back and forth" layout — auto-cycling screenshot on one side, title + full `des` + interactive tech-stack cycler on the other (`ProjectCard.tsx`, `CardImageCarousel.tsx`).
- **Per-project detail PAGES** at `/projects/[slug]` (`app/projects/[slug]/page.tsx`, `ProjectDetail.tsx`) — blog-style: hero image, sticky "On this page" TOC, sections (goal / how it uses AI / how it works), full-width tech-stack breakdown. **Replaces the old Details modal.**
- **`iconCycle` re-added + refactored** — simple view on cards, detailed (keyboard-accessible) view on detail pages. `tests/icon-cycle.spec.ts` = 6 passing.
- **`ProjectModal.tsx` + `ImageSlider.tsx` are now DEAD code** (navigation replaced the modal) — safe to delete.
- 4 projects (echo, scout, geminigpt, net-trailer) carry slug/purpose/aiUsage/highlights in `data/projects.tsx`; sitemap includes the 4 detail URLs.

**"Building in public" bento** (`components/ui/BentoComponents/CurrentBuildsCarousel.tsx`, `data/grid/items/gridItem6.tsx`): auto-cycling feed of LocalDictate / TL;DW / Portfolio Rank — real icons (copied from n8builds into `public/builds/`), stack chips, per-build Code/Live links, pause-on-hover/focus (WCAG 2.2.2). Header is **"Building in public"** (renamed from "Currently building" — honest, since two of the three are shipped, not in-progress).

**About me** (`components/sections/Grid.tsx`): rewritten — Appturnity + n8builds links woven inline (no trailing link dump). Twitch deliberately NOT surfaced.

**reCAPTCHA fully purged** (was a prior backlog item): gone from code, README, `.env.local`, AND Vercel (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `RECAPTCHA_SECRET_KEY` removed from the `portfolio` project). README also de-fictionalized — it documented a contact-form/Resend/7-layer-security system that **never existed** in the code. Left `RESEND_API_KEY` + `CONTACT_EMAIL_TO` in Vercel (the `ContactInput/Select/Textarea` field components still exist; a real contact form may be wired later).

**Unified GA4 analytics — LIVE + verified.** One property (renamed to **n8builds.dev**), Measurement ID **`G-JZQGKY9Q37`**, on BOTH sites. portfolio.n8builds.dev was already wired; this session set the same ID on the `n8builds-web` Vercel project (Production) and redeployed — `G-JZQGKY9Q37` confirmed live on **both** n8builds.dev and portfolio.n8builds.dev. No Google Cloud project needed (GA4 is web-console only); segment by **Hostname**. n8builds-web set Production-only; **portfolio still has the ID in all envs, so dev/preview hits also reach the property** (could tighten — see next steps).

**Housekeeping:** repo moved into `~/n8builds/`; Claude memory migrated to the new path namespace (`~/.claude/projects/-home-natkins-n8builds-portfolio2-0/memory/`); test artifacts (`playwright-report/`, `test-results/`) gitignored + untracked; stale `backup-before-improvements` branch deleted (recover via `git branch backup-before-improvements 3eb79f0` within git's gc window).

## Next steps

1. **(Optional) SPA route-change page_view tracking** — `lib/analytics.ts` doesn't fire a page_view on client-side navigation, so `/projects/[slug]` views under-report. Add a `usePathname`-based tracker; if added, turn OFF GA4 Enhanced Measurement → "page changes based on browser history events" to avoid double-counting. Applies to both sites.
2. **(Optional) Tighten portfolio GA to Production-only** — it's set in all Vercel envs, so local/preview traffic pollutes the property. Match n8builds-web.
3. **Delete dead code** — `components/Projects/ProjectModal.tsx` + `ImageSlider.tsx` (unused after the modal→page move).
4. **Appturnity "A" logo** — `AppturnityCard.tsx` uses a placeholder gradient "A" monogram; swap for the real logo when available.
5. **GeminiGPT deploy** (backlog) — deploy `~/portfolio/examples/gemini-chat-app` (Railway-ready), then add `liveSite` to GeminiGPT in `data/projects.tsx` + replace placeholder screenshots.
6. **Resume PDF** (outside repo) still links the old portfolio URL → update to portfolio.n8builds.dev.
7. **Deferred dep majors** (user opt-in): tailwindcss 4, eslint 10, typescript 6, @types/node 25.

## Stale docs (flagged 2026-06-20 — candidates to delete/archive)

- `FOLLOW_UP.md`, `PIN_IT.md` (both 2025-09) — 9-month-old roadmaps, superseded.
- `docs/bundle-analysis.md` (2025-10, "Next.js 14.2.32") — predates the Next 16 upgrade.
- `docs/code-quality-improvements-summary.md` (2025-10) — old one-off summary.
- `docs/ICONCYCLE_REFACTOR_PLAN.md` (2026-06-19) — the refactor it plans is **done**.
- `WEB_VITALS.md` — still plausibly accurate (WebVitals/HUD code is live); leave.

## Conventions & gotchas

- Commit after each logical change, conventional-commit style, trailer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`. Push when asked. `main` auto-deploys.
- **Repo path is now `~/n8builds/portfolio2.0`.** Claude project memory is keyed to the path — migrated this session.
- Dev port 4829. Kill by port: `lsof -t -i:4829 | xargs -r kill` — `pkill -f <pattern>` self-matches the shell (exit 144).
- Vercel: both projects are git-connected. To apply an env-var change without shipping local WIP, `vercel redeploy <latest-prod-deployment-url>` (rebuilds live source + current env — re-inlines `NEXT_PUBLIC_*`). **n8builds-web currently has WIP on `feat/hero-terminal-circuit` (7 commits ahead) — do NOT `vercel --prod` from its local tree.**
- No Google Cloud project is used or needed. No Vercel/GA MCP is connected — analytics work was done via the authenticated Vercel CLI (`natkins23`).
- Twitch/YouTube handle **n8builds**; GitHub/X/LinkedIn **n8watkins**.
- 12 pre-existing lint warnings (React Compiler/refs) — not errors.

## File map

- `components/Projects/ProjectCard.tsx` — alternating image-led card
- `components/Projects/CardImageCarousel.tsx` — auto-cycling card screenshot
- `components/Projects/ProjectDetail.tsx` + `app/projects/[slug]/page.tsx` — blog-style detail page
- `components/Projects/{ProjectModal,ImageSlider}.tsx` — **DEAD, delete**
- `components/ui/ProjectComponents/iconCycle.tsx` — tech-stack cycler (simple + detailed views)
- `components/ui/BentoComponents/CurrentBuildsCarousel.tsx` + `data/grid/items/gridItem6.tsx` — "Building in public" bento
- `components/sections/Grid.tsx` — About me + bento wrapper
- `components/sections/AppturnityCard.tsx` — twin Appturnity/n8builds cards ("A" monogram placeholder)
- `data/projects.tsx` — project copy (slug/des/purpose/aiUsage/highlights)
- `app/layout.tsx` — GA snippet (reads `NEXT_PUBLIC_GA_ID`) + metadata
- `lib/analytics.ts` — GA event helpers (no route-change page_view yet)
