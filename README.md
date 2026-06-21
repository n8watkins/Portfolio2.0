# Nathan's Portfolio 2.0 🚀

A modern, production-ready developer portfolio built with Next.js 16, featuring per-project detail pages, a "building in public" bento, advanced animations, and an interactive tech-stack cycler.

## ✨ Key Features

- **Modern Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS
- **Per-Project Detail Pages**: Blog-style `/projects/[slug]` pages with a sticky table of contents and a full-width tech-stack breakdown
- **"Building in Public" Bento**: An auto-cycling feed of what I'm shipping, with per-build links out to GitHub / live / n8builds.dev
- **Advanced Animations**: Framer Motion with scroll-triggered fade-ins and interactive elements
- **Performance Optimized**: Optimized images, code splitting, and comprehensive monitoring
- **Fully Responsive**: Mobile-first design with seamless desktop experience
- **Analytics Integration**: Google Analytics 4 with custom event tracking for all interactions
- **Dark Theme**: Cohesive dark-only design (slate + sky-blue)
- **Error Boundaries**: Granular section-level error handling with graceful degradation
- **Web Vitals HUD**: Real-time performance monitoring (Alt+Shift+V toggle in dev mode)
- **Testing & CI**: Playwright E2E tests, Lighthouse CI, and automated accessibility testing
- **Error Monitoring**: Comprehensive error tracking and performance monitoring with Sentry

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Next Themes for theme management

**Backend:**
- Next.js API Routes

**Development & Testing:**
- ESLint + TypeScript strict mode
- Playwright for E2E testing
- Lighthouse CI for performance
- Husky + lint-staged for git hooks
- Bundle analyzer for optimization
- Vercel for deployment
- Sentry for error monitoring

### Project Structure

```
Portfolio2.0/
├── app/                          # Next.js 16 App Router
│   ├── api/health/               # Health check endpoint
│   ├── projects/[slug]/          # Per-project detail pages
│   ├── layout.tsx                # Root layout, metadata, GA snippet
│   ├── page.tsx                  # Home (lazy-loaded sections)
│   ├── sitemap.ts / robots       # SEO surfaces
│   └── global-error.tsx          # Global error boundary
├── components/
│   ├── Projects/                 # Project cards + blog-style detail pages
│   ├── sections/                 # Hero, About/Bento (Grid), Experience, Testimonials
│   ├── ui/                       # BentoGrid, ProjectComponents/iconCycle,
│   │                             #   BentoComponents/CurrentBuildsCarousel, etc.
│   └── layout/                   # FloatingNav, Footer
├── lib/                          # analytics, animations, logger, types
├── data/                         # projects, grid items, experience, navigation
├── hooks/                        # section + scroll tracking
├── tests/                        # Playwright E2E tests
└── public/                       # projects, hero, bento, builds assets
```

**Key Stats:**
- **~6,900 lines** of TypeScript/TSX
- **340 kB** First Load JS (15% under budget)
- **A+ grade** (96/100) code quality
- **Zero** technical debt (no TODO/FIXME)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Environment variables (see `.env.local.example`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/n8watkins/Portfolio2.0.git
   cd Portfolio2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Environment Variables

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=your_ga_id

# Portfolio Info
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Portfolio Name
NEXT_PUBLIC_VERSION=2.0

# Sentry (Optional - Error Tracking)
SENTRY_AUTH_TOKEN=your_sentry_token
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
```

#### 🔑 Where to Get API Keys

| Service | URL | Free Tier | Notes |
|---------|-----|-----------|-------|
| Google Analytics | [analytics.google.com](https://analytics.google.com) | ✅ Yes | Create a GA4 property — no Google Cloud project needed |
| Sentry | [sentry.io](https://sentry.io) | ✅ 5K errors/month | Error tracking (optional) |

## 🎨 Animations & UX

### Framer Motion Integration

- **Scroll-triggered animations** with intersection observers
- **Staggered reveals** for portfolio grid items
- **Smooth page transitions** and micro-interactions
- **Loading states** with skeleton animations
- **Lottie micro-animations** (e.g. the email button)

### Performance Optimizations

- **Lazy loading** for images and components
- **Code splitting** for optimal bundle sizes
- **Next.js Image optimization** with proper sizing
- **CSS-in-JS optimization** with Tailwind
- **Analytics integration** without performance impact

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server (with HMR)
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # TypeScript type checking without emit

# Testing & Analysis
npm run test         # Run Playwright E2E tests
npm run test:ui      # Run Playwright in UI mode
npm run lighthouse   # Run Lighthouse CI performance audit
npm run analyze      # Build with bundle analysis (ANALYZE=true)

# Maintenance
npm run clean        # Clean .next and out directories
npm run prepare      # Setup Husky git hooks
```

### Code Quality

- **TypeScript Strict Mode** — near-fully type-safe (a few isolated `any` casts in perf/HUD glue)
- **ESLint** with Next.js configuration (zero warnings/errors)
- **Prettier** integration for consistent formatting
- **Husky + lint-staged** - Pre-commit hooks enforce code quality
- **Component-driven development** with modular architecture
- **Comprehensive inline documentation** - JSDoc comments throughout
- **Zero technical debt** - No TODO, FIXME, or HACK comments

**Current Grade: A+ (96/100)**

## 📈 Analytics & Monitoring

### Performance Monitoring
- **Web Vitals HUD** - Real-time metrics display (Alt+Shift+V in dev mode)
- **Vercel Speed Insights** - Real user monitoring in production
- **Lighthouse CI** - Automated performance audits with thresholds
- **Bundle Analyzer** - Track bundle size over time

### User Analytics
- **Google Analytics 4** with comprehensive event tracking:
  - Section views (IntersectionObserver-based)
  - Scroll depth milestones (25%, 50%, 75%, 100%)
  - Project interactions (views, icon clicks)
  - Modal interactions (open/close)
  - Resume downloads/views
  - Social media clicks
  - Web Vitals metrics

### Error Tracking
- **Sentry integration** for error monitoring and performance
- **Section-level error boundaries** for granular failure isolation
- **Global error boundary** for unhandled exceptions
- **Custom error reporting** to health API endpoint

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🛠️ Customization

### Content Management

- **Portfolio data**: Edit `data/projects.tsx`
- **Project information**: Update project arrays and images
- **Contact details**: Modify footer and contact sections
- **Theme colors**: Customize in `app/globals.css`

### Adding New Sections

1. Create component in `components/`
2. Add to main page in `app/page.tsx`
3. Update navigation in `components/layout/FloatingNav.tsx`
4. Add animations and styling

## 🔒 Security Considerations

- Never commit API keys or secrets
- Use environment variables for all sensitive data
- Regular dependency updates for security patches
- Proper error handling without information disclosure

## 📝 Development Notes

### Performance Optimizations
- **Bundle Size**: 340 kB First Load JS (15% under 400 kB target)
- **Dynamic Imports**: Below-the-fold components lazy loaded
- **Image Optimization**: AVIF/WebP formats with Next/Image
- **Font Optimization**: Inter font with subset loading and swap display
- **Package Tree-shaking**: Optimized imports for lucide-react, framer-motion, etc.

### Technical Highlights
- **CSS Masks**: Gradient effects in infinite card animations
- **Marquee Components**: Magic UI marquee for performant infinite scroll
- **Animation Performance**: Framer Motion optimized for 60fps
- **Error Resilience**: Section-level boundaries prevent cascading failures
- **Type Safety**: TypeScript strict mode across the codebase

## 🏛️ Architecture Decisions

### Composition Pattern for Grid Items

The BentoGrid uses a data-driven composition pattern instead of ID-based conditionals:

```typescript
// ✅ Clean: Data-driven render functions
<BentoGridItem
  renderBackground={() => <GridPattern />}
  renderContent={() => <MapDetails />}
  renderForeground={() => <TechStack />}
/>

// ❌ Old: 152 lines of ID-based conditionals
{id === 1 && <Component1 />}
{id === 2 && <Component2 />}
```

**Result**: 59% code reduction, better maintainability, easier testing

### Centralized Animation Library

All animations defined in `lib/animations.ts` for consistency:

```typescript
import { animationPresets } from '@/lib/animations'

<motion.div {...animationPresets.fadeInUp}>
  Content
</motion.div>
```

**Benefits**: Consistent timing, easy global changes, better performance

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Nathan Watkins using modern web technologies.

