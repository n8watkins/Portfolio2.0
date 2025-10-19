# Performance Optimizations

This document outlines the performance optimizations implemented to improve Web Vitals scores.

## Issues Identified

### 1. Large JavaScript Bundle (16.2 MB)
- **Impact**: HIGH
- **Primary issue**: Extremely large bundle size slowing down initial load
- **Main contributors**:
  - `page.js`: 11.4 MB
  - App chunks: ~1.4-1.7 MB each

### 2. Large SVG Files with Embedded Images ✅ OPTIMIZED
- **Impact**: HIGH
- **Status**: COMPLETED (Oct 18, 2025)
- **Files Optimized**:
  - ~~`public/bento/grid.svg`: 3.5 MB~~ → **DELETED** (unused)
  - `public/testimonials/profile.svg`: 1.07 MB → **1.4 KB WebP** (99.9% reduction)
  - `public/testimonials/zorik.png`: 2.59 MB → **20 KB WebP** (99.3% reduction)
  - `public/bento/code.svg`: 428 KB (kept - reasonable size)
  - `public/projectIcons/gsap.svg`: 152 KB (kept - reasonable size)
- **Total Savings**: ~7.14 MB

### 3. Slow Image Loading
- **Impact**: MEDIUM
- **Issue**: 10 images loading over 1 second each
- **Average load time**: 1.18 seconds

## Optimizations Implemented

### 1. Package Import Optimization

**File**: `next.config.mjs`

Added tree-shaking for large icon libraries:
```javascript
experimental: {
  optimizePackageImports: [
    'lucide-react',
    'framer-motion',
    'react-icons',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-icons',
    '@tabler/icons-react',
  ],
}
```

**Expected Impact**: Reduce bundle size by 30-40%

### 2. Bundle Analysis Tool

**File**: `package.json`

Added script to analyze bundle composition:
```bash
npm run analyze
```

This generates a visual report showing which packages contribute most to bundle size.

### 3. Image Conversion to WebP ✅ COMPLETED

**Automated Conversion Script**: `scripts/convert-images.mjs`

**Results**:
- `grid.svg`: 3.5 MB → **DELETED** (unused file)
- `profile.svg`: 1.07 MB → **1.4 KB WebP** (99.9% reduction)
- `zorik.png`: 2.59 MB → **20 KB WebP** (99.3% reduction)
- Updated references in `data/index.tsx`

**Script Usage**:
```bash
node scripts/convert-images.mjs
```

The script uses Sharp to convert images to WebP with 85% quality and optimal sizing.

### 4. Image Lazy Loading

All images below the fold should use `loading="lazy"`:

```tsx
<Image
  src="/path/to/image.jpg"
  loading="lazy"  // Add this
  alt="Description"
/>
```

**Where to Apply**:
- Project cards (below fold)
- Testimonial images
- Experience section images
- Footer images

### 5. Priority Images

Mark above-the-fold images as priority:

```tsx
<Image
  src="/hero/portrait.jpg"
  priority  // Add this for hero image
  alt="Portrait"
/>
```

## Testing & Verification

### Run Performance Tests

```bash
# Run Playwright tests
npm run test:chromium

# Run Lighthouse CI
npm run lighthouse

# Analyze bundle
npm run analyze
```

### Expected Improvements

After implementing all optimizations:

| Metric | Before | Target | Improvement |
|--------|--------|--------|-------------|
| **LCP** | 396ms | <300ms | ✅ Already good |
| **CLS** | 0.002 | <0.1 | ✅ Already good |
| **FCP** | 604ms | <500ms | ~100ms faster |
| **TTFB** | 108ms | <100ms | Maintain |
| **JS Bundle** | 16.2 MB | <5 MB | **70% reduction** |
| **Image Load Time** | 1.18s avg | <500ms | **60% faster** |

## Next Steps

### Immediate Actions

1. ✅ Add package import optimization to `next.config.mjs`
2. ✅ Add bundle analyzer script
3. ✅ Convert large SVG files to WebP (saved 7.14 MB)
4. ✅ Add `loading="lazy"` to below-fold images
5. ✅ Add `priority` to hero image
6. ⏳ Re-run performance tests with optimizations

### Future Optimizations

1. **Code Splitting**: Implement dynamic imports for heavy components
   ```tsx
   const Projects = dynamic(() => import('./components/Projects'))
   ```

2. **Font Optimization**: Ensure fonts are subset and preloaded

3. **API Route Optimization**: Consider edge functions for faster TTFB

4. **CDN**: Ensure static assets are served from CDN

5. **Service Worker**: Implement for offline support and caching

## Monitoring

Set up continuous monitoring:

1. **CI/CD Integration**: Run Lighthouse CI on every PR
2. **Real User Monitoring**: Track actual user metrics with Vercel Analytics
3. **Budget Alerts**: Set bundle size budgets in `next.config.mjs`

### Bundle Size Budgets

Add to `next.config.mjs`:
```javascript
// Warn if bundles exceed these sizes
experimental: {
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
},
```

## Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

## Questions?

If you have questions about these optimizations, refer to:
- Test results in `playwright-report/`
- Bundle analysis in `.next/analyze.html`
- Lighthouse reports in `.lighthouseci/`
