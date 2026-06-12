# HANDOFF — portfolio2.0

_Last updated: 2026-06-12 (session: digital-card redesign, round 2)_

## Project summary

Nathan Watkins' personal portfolio — positioned as an **online resume / digital card** whose job is to funnel visitors to **n8builds.dev** (his main build-in-public site) and **Appturnity** (his consulting company, https://appturnity.web.app). Dark-only, slate + sky-blue palette.

- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind 3.4, framer-motion, react-scroll.
- Run: `npm run dev` → **http://localhost:4829** (port is non-standard, set in package.json).
- Tests: `npx playwright test --project=chromium` (config/webServer point at 4829 — fixed this session; do NOT pre-start the dev server, Playwright boots its own with `NODE_ENV=test`).
- Checks: `npm run type-check`, `npm run lint`. Husky + lint-staged run eslint on commit.
- Not deployed this session; commits are **local only, not pushed**.

## State (all verified working at 4829, committed)

Recent session commits (newest first): `ce33c78` Appturnity-CTA hover fix, `56b7fa6` brand cards, `0dbb22f` hero CTAs, `b087482` experience hover reveals, `96e6394` about intro, `69b0f98` horizontal project cards, `0fc5713` watercolor portrait, `7e24190` Playwright port fix, plus the earlier redesign commits (`2dbd17a`…`21f6426`).

- Projects: exactly 2 horizontal full-width cards (GeminiGPT, Net-Trailer) under a "Building for the AI-native web" blurb. `liveSite` is optional; GeminiGPT card shows "Live demo coming soon" until deployed.
- Hero: rotating portrait (`data/portraits.ts`, 2 images, 3s fade), animated grid squares, two brand-hover CTAs (n8builds gradient / Appturnity white + understroke swoosh). "See more" removed. 72vh.
- Nav: always visible, text-only, headshot scrolls to top, react-scroll `offset={-80}`.
- Experience: company/client links (arroyosecogc.com, riverwoodranch.web.app, Coder School Santa Monica), hover image reveals (`hoverImage` in `data/experience.tsx`).
- Brand section (`components/sections/AppturnityCard.tsx`): big Appturnity card (live-site screenshot, SiteForge story) + n8builds card (gradient wordmark). The "Need something built?" CTA currently scrolls to the contact form and preselects the consulting subject via `lib/contactPrefill.ts`.
- Contact form (footer): full Resend + reCAPTCHA form — **scheduled for removal, see Next steps.**

## Next steps

### 1. Remove the contact form (decided by user — do not re-ask)

Rationale: inbound contact will live on n8builds.dev; this site only routes. **No simplified form** — that option was explicitly considered and rejected. Full deletion is fine; user has a clone and git history.

1. `components/layout/Footer.tsx` — delete the ContactForm block (incl. `ContactFormErrorBoundary`, reCAPTCHA badge note). Replace with a slim contact card under the existing "Let's build something amazing together!" heading:
   - CTA 1: "Get in touch → n8builds.dev" (https://n8builds.dev, n8builds styling like the hero CTA).
   - CTA 2: "Consulting → Appturnity" (https://appturnity.web.app/ — their site has its own intake/quiz).
   - Keep a visible `mailto:nathancwatkins23@gmail.com` line — it's the only working contact path until the n8builds.dev domain is connected (it was NOT live as of 2026-06-12; user said he's connecting it now — verify before relying on it).
2. `components/sections/AppturnityCard.tsx` — "Need something built?" react-scroll Link → replace with `mailto:nathancwatkins23@gmail.com?subject=Consulting%20inquiry` (or link to the Appturnity site); remove `requestSubjectPrefill` usage.
3. Delete (full file removals): `components/ContactForm/` (5 files), `components/ContactFormErrorBoundary.tsx`, `lib/contactPrefill.ts`, `app/api/contact/route.ts`, `lib/email/` (resend.ts, sender.ts, templates.ts), `lib/security/recaptcha.ts`, `lib/validations/contact.ts`, `tests/api/contact.spec.ts`.
4. `lib/analytics.ts` — remove `trackContactEvent` only if nothing else uses it (grep first).
5. Deps now removable: `resend`, `react-google-recaptcha-v3`, `@types/react-google-recaptcha`, `react-hook-form`, `@hookform/resolvers`, `isomorphic-dompurify` (grep each for other usages before removing; zod may be used elsewhere — check).
6. Nav "Contact" item still points at `#contact` (the footer section) — keep, the slim card is the target. Env vars `RESEND_API_KEY`/`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` become unused.
7. Note for later: this form stack (route + validation + Resend templates) is the reference implementation to port into `~/n8builds/n8builds-web` for its contact page. It survives in git history at `ce33c78`.

Acceptance: type-check + lint clean; `#contact` section renders the slim card; no references to ContactForm/api/contact remain (`grep -rn 'ContactForm\|api/contact\|contactPrefill'`); contact API Playwright spec deleted so `npx playwright test` runs only web-vitals.

### 2. Upgrade dependencies ("make the project new")

From `npm outdated` (2026-06-12):

- **Safe batch (wanted/minor):** next 16.2.9, eslint-config-next 16.2.9, @next/bundle-analyzer 16.2.9, @sentry/nextjs 10.57, radix minors, @types/react 19.2.17, isomorphic-dompurify 3.16, react-hook-form 7.78 (moot if removed in step 1). Do `npm update` style bumps, then build + test.
- **Low-risk majors, do individually with a build between each:** framer-motion 11→12 (check `AnimatePresence` usage in PortraitRotator/ImageSlider/Projects), sharp 0.35, @vercel/speed-insights 2, tailwind-merge 3, lucide-react 1.x, tailwindcss-animated 2 (verify `animate-*` classes used in ScrollButton/LinkButton still exist).
- **Defer / separate task (user should opt in):** tailwindcss 3.4→4 (big config migration: `tailwind.config.ts` matchUtilities for `bg-grid`, custom breakpoints `1sm/1md/1lg`, darkMode class — Tailwind 4 moves to CSS-first config), eslint 10 (flat-config interactions with eslint-config-next), typescript 6, @types/node 25 (align with runtime; engines says >=20.9).

Acceptance: `npm run build` succeeds, `npm run type-check`/`lint` clean, dev-server visual smoke (hero rotation, project cards, hovers), `npx playwright test --project=chromium` web-vitals spec not worse than before.

### 3. Backlog (earlier sessions, still open)

- **GeminiGPT live URL**: deploy `/home/natkins/portfolio/examples/gemini-chat-app` (Railway-ready: railway.json, Dockerfile; env: GEMINI_API_KEY, NEXTAUTH_*, Google OAuth + callback URL, TRUST_PROXY=true). Then add `liveSite` to GeminiGPT in `data/projects.tsx` and replace its two placeholder screenshots in `public/projects/geminigpt*.webp` with populated-chat shots.
- **n8builds.dev domain**: was dead (NXDOMAIN); user connecting it to Vercel. All four site links (hero CTA, Inside Scoop, brand card, footer) depend on it.
- More hero portraits: drop files in `public/hero/`, list in `data/portraits.ts` (rotator supports `fade | slide | zoom-blur`).
- Resume typo (in the PDF, not this repo): visible text says `n8portfolio.vercel.app` (404) but the hyperlink targets `nathansportfolio.vercel.app`.

## Conventions & gotchas

- Commit after every logical change (user's global rule), trailer: `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`. Conventional-commit style messages (`feat(scope): …`). Don't push unless asked.
- Husky pre-commit runs eslint --fix via lint-staged; a JSX syntax error aborts the commit and **reverts staged changes** — fix and re-stage.
- Background `npm run dev` tasks get SIGTERM'd by the harness; for scripted browser checks run server + script in ONE foreground Bash command. Never `pkill -f 'next dev --port 4829'` — the pattern matches the shell's own wrapper and kills your command (exit 144).
- Ports: portfolio 4829; user's unrelated projects occupy 3001 (asset-arsenal) and 7678 (portfolio-rank) — don't kill those.
- Playwright API tests sent REAL emails via Resend (rate-limited at 5 req/s → 500s). Goes away when the form is removed.
- Verification pattern: Playwright script with `chromium.launch({ args: ['--no-sandbox'] })`, slow-scroll to trigger framer-motion viewport animations before screenshots (sections are opacity-0 until scrolled into view).
- 13 pre-existing lint warnings (React Compiler/refs) — not errors, ignore.
- Appturnity brand: primary `#237EF6`, light theme, SVG swoosh understroke (`M1 5.5C54.5 2.5 150.5 1.5 299 11.5`, replicated in Hero CTA). n8builds brand: cyan-400→blue-600 on `#050812`. Twitch/YouTube handle **n8builds**; GitHub/X/LinkedIn **n8watkins**.
- SiteForge = internal Appturnity engine (`/home/natkins/appturnity/site-forge/la-pool-engine`), no public URL — described, never linked.

## File map (for the next steps)

- `components/layout/Footer.tsx` — heading + form block to replace with slim contact card
- `components/sections/AppturnityCard.tsx` — consulting CTA to re-point; brand cards
- `components/ContactForm/*`, `components/ContactFormErrorBoundary.tsx` — delete
- `app/api/contact/route.ts`, `lib/email/*`, `lib/security/recaptcha.ts`, `lib/validations/contact.ts`, `lib/contactPrefill.ts` — delete
- `tests/api/contact.spec.ts` — delete; `tests/web-vitals.spec.ts` — keep
- `package.json` — dep removals + upgrades; `data/projects.tsx` — GeminiGPT liveSite later
- `components/sections/Hero.tsx` — reference for n8builds/Appturnity CTA styling to reuse in footer card
