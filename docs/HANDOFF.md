# HANDOFF — portfolio2.0

_Last updated: 2026-06-13 (session: mobile hero fix, bento overlay retint, portfolio.n8builds.dev now LIVE + SEO surfaces switched over)_

## Project summary

Nathan Watkins' personal portfolio — an **online resume / digital card** whose job is to funnel visitors to **n8builds.dev** (his main build-in-public site, project `n8builds-web`, source at `~/n8builds/n8builds-web`) and **Appturnity** (his consulting company, https://appturnity.web.app). Dark-only, slate + sky-blue palette.

- Stack: Next.js 16.2.9 (App Router, Turbopack dev / webpack build), React 19, TypeScript, Tailwind 3.4, framer-motion 12, react-scroll.
- Run: `npm run dev` → **http://localhost:4829** (non-standard port, set in package.json).
- Tests: `npx playwright test --project=chromium` (webServer on 4829, `reuseExistingServer` outside CI; suite = `tests/web-vitals.spec.ts` only).
- Checks: `npm run type-check`, `npm run lint`. Husky + lint-staged run eslint on commit.
- Deploy: Vercel project **`portfolio`** (account natkins23), prod URL **n8sportfolio.vercel.app** (NOT nathansportfolio/n8portfolio — older notes and the resume PDF have wrong URLs). Pushes to GitHub `n8watkins/Portfolio2.0` main auto-deploy.
- **All session work is committed AND pushed** through `f715e17`.

## State (all verified: type-check/lint clean, 10/10 Playwright, visual smokes)

This session's commits, oldest first:

- `b67a2a8` Contact form fully removed → slim routing footer card (n8builds CTA, Appturnity CTA + swoosh, visible mailto). Deps dropped: resend, react-google-recaptcha-v3, react-hook-form, @hookform/resolvers, isomorphic-dompurify, zod (+ @types). Old form stack survives at `ce33c78` — it's the reference implementation to port to n8builds-web's contact page someday.
- `cb32403`…`c7e0129` Dep upgrades: safe batch (next 16.2.9, sentry 10.57, radix, types) + majors one-at-a-time: framer-motion 12.40, sharp 0.35, speed-insights 2, tailwind-merge 3, lucide-react 1.18, tailwindcss-animated 2.1. **Deferred, user must opt in: tailwindcss 4, eslint 10, typescript 6, @types/node 25.**
- `1327d49` About intro: inline links (Appturnity sky-underline, n8builds gradient, Twitch purple), 3 emojis, polaroid snapshot strip (3 tilted photos, straighten on hover, Appturnity one links out).
- `7084c7a` Bento: cursor-follow glow fixed (handler was on the blob, now on the container — works over text) and rolled out to ALL bento cards via lightweight `useCursorGlow` in `components/ui/BentoGrid.tsx` (single radial div, rAF lerp only while hovered). Cards' dark base is now the blue gradient (`#0c4a6e → #0f172a`).
- `d519ca1` Projects: heading/blurb left-aligned; blurb streams word-by-word like LLM tokens with blinking caret (`BLURB` const in `components/Projects/index.tsx`); cards un-boxed (no bg/border), alternate image-left/right by index, images 55%-wide; Details modal: IconCycle removed, full-width ImageSlider, new `highlights: string[]` bullets (data in `data/projects.tsx`, type in `lib/types.ts`); ImageSlider fullscreen "Expand" view deleted.
- `f715e17` Experience: Appturnity entry now has chips for riverwoodranch.web.app, lifelineclinicallab.com, comfort1hvac.com, primeshows.live (from the resume; Riverlakes/Sierra Lakes skipped — resume gives no URLs).

## Next steps

### 1. ~~portfolio.n8builds.dev goes live~~ DONE (2026-06-13)

**LIVE.** The site serves at `https://portfolio.n8builds.dev` (HTTP 200, valid cert). Nathan added the three Cloudflare DNS records (all DNS-only/gray-cloud): `A @ → 76.76.21.21`, `CNAME www → cname.vercel-dns.com`, `CNAME portfolio → cname.vercel-dns.com` — all resolve. Vercel domain attachments were already in place (`portfolio.n8builds.dev` → project `portfolio`; `n8builds.dev` + `www` → `n8builds-web`).

This session: set `NEXT_PUBLIC_SITE_URL=https://portfolio.n8builds.dev` on the Vercel `portfolio` project (Production + Development — the CLI's agent-non-interactive mode wouldn't set Preview, but `d66e73c` made the code fallback the new domain so Preview deploys inherit it). `d66e73c` also replaced the stale `nathansportfolio.vercel.app` default in `app/layout.tsx`, `app/sitemap.ts`, `public/robots.txt`. Verified live after redeploy: og:url, og:image, sitemap.xml, robots.txt all show `portfolio.n8builds.dev`; the four n8builds.dev outbound links target the root `https://n8builds.dev` (200) and were unaffected.

**Still open:** the resume PDF (outside this repo) still links to the old portfolio URL — Nathan should update it to `portfolio.n8builds.dev`.

### 2. GeminiGPT deploy (backlog)

Deploy `/home/natkins/portfolio/examples/gemini-chat-app` (Railway-ready: railway.json, Dockerfile; env: GEMINI_API_KEY, NEXTAUTH_*, Google OAuth + callback URL, TRUST_PROXY=true). Then add `liveSite` to GeminiGPT in `data/projects.tsx` and replace placeholder screenshots `public/projects/geminigpt*.webp` with populated-chat shots.

### 3. Small flagged issues

- ~~Narrow-mobile hero CTA overlap~~ DONE `9ee4f26` — hero is `h-auto pb-12` below md, `md:h-[72vh]` up (overlap was real: at 320px the CTAs sat on the About intro text; verified fixed at 320/360/768/1440).
- ~~Slate `#1e293b` overlays on bluer bento base~~ DONE `6be08d5` — retinted to `#0d304c` (midpoint of the base gradient) in gridItem2/3/4/6 + TechStack panel/edge fades; `grid-pattern.tsx` intentionally untouched (site background, not a card).
- More hero portraits: drop files in `public/hero/`, list in `data/portraits.ts`. (Needs user-provided images.)

### 3b. Backlog cleanups (flagged 2026-06-13, not yet started)

- **Dead Vercel env vars on the `portfolio` project**: `RESEND_API_KEY`, `RECAPTCHA_SECRET_KEY`, `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`, `CONTACT_EMAIL_TO` — all orphaned when the contact form was removed (`b67a2a8`). Harmless but cluttery, and the recaptcha/resend keys are unused secrets. Remove from this project — but the contact stack is slated to be ported to n8builds-web, so copy the values there first if not already done. (`NEXT_PUBLIC_GA_ID` is still in use — keep it.)
- **gridItem class-string cleanup**: `data/grid/items/*.tsx` carry iteration cruft — doubled-up class strings (e.g. `w-full h-full w-full h-full` in gridItem6), redundant `absolute`s, leftover empty `buttonContainer`/`buttonClass` fields. Low-risk tidy pass.
- **Substance/proof ordering**: strongest assets (Appturnity client sites, the AI lead-gen tool) sit below the fold while filler-ish bento cards ("Ready to relocate", globe) surface high. Consider promoting proof higher. (Bigger/subjective — needs user direction.)

### 4. Deferred dep majors (separate task, user opt-in)

tailwindcss 3.4→4 (CSS-first config migration: matchUtilities `bg-grid`, custom breakpoints `1sm/1md/1lg`, darkMode class), eslint 10, typescript 6, @types/node 25.

## Conventions & gotchas

- Commit after every logical change, conventional-commit style, trailer `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`. This session pushes to origin/main (auto-deploys Vercel).
- **Turbopack stale-CSS cache**: brand-new Tailwind utility classes can silently render width-0 from a stale `.next` persistent cache. Stop the server FIRST, then `rm -rf .next`, then restart — `rm -rf .next` under a running server corrupts the cache ("Compaction failed").
- Kill the dev server by port: `lsof -t -i:4829 | xargs -r kill` — zsh doesn't word-split `$(...)` into `kill`, and pgrep/pkill by pattern matches your own shell wrapper (exit 144).
- Detached dev server pattern that survives the session: `setsid nohup npm run dev >/tmp/portfolio-dev.log 2>&1 < /dev/null &`. First request after cold start compiles for ~30-60s — curls hang, not dead.
- Playwright suite can mass-fail with beforeEach networkidle timeouts when parallel workers stampede a cold/post-HMR dev server — warm `/` once and re-run before believing failures.
- Verification pattern: Playwright script `chromium.launch({ args: ['--no-sandbox'] })`, run from the REPO ROOT (scripts in /tmp can't resolve `@playwright/test`), slow-scroll first — sections are opacity-0 until scrolled into view.
- 12 pre-existing lint warnings (React Compiler/refs) — not errors, ignore.
- Ports: 4829 = this app; 3001 and 7678 belong to the user's other projects — don't kill.
- Appturnity brand: `#237EF6`, swoosh path `M1 5.5C54.5 2.5 150.5 1.5 299 11.5`. n8builds: cyan-400→blue-600 on `#050812`. Twitch/YouTube handle **n8builds**; GitHub/X/LinkedIn **n8watkins**. SiteForge = internal Appturnity engine, described but never linked.
- User decisions already made — do NOT re-ask: no contact form ever (routing card only); projects have no card boxes; ImageSlider has no fullscreen view; Details modal = bullets not icon-cycle; portfolio lives at portfolio.n8builds.dev.

## File map (for the next steps)

- `components/sections/Hero.tsx` — hero, CTAs, mobile-overlap issue
- `components/sections/Grid.tsx` — About intro (links/emojis/snapshots) + bento wrapper
- `components/ui/BentoGrid.tsx` — `useCursorGlow` + card base gradient
- `components/ui/background-gradient-animation.tsx` — email-card animated gradient (handler on container)
- `components/Projects/{index,ProjectCard,ProjectModal,ImageSlider}.tsx` — projects section
- `data/projects.tsx` — project copy, `highlights` bullets, GeminiGPT `liveSite` goes here
- `data/experience.tsx` — experience entries + link chips
- `data/grid/items/` — bento card configs (overlay gradients live here)
- `app/layout.tsx` / env — `NEXT_PUBLIC_SITE_URL` consumers for the domain switch
