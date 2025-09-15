# Project Screenshot Loading Optimization Plan

## 📊 Current State Analysis

### Performance Issues
- **18 project images** totaling **11MB** in the `/public/projects` directory
- **Largest offenders**: Netflix project (2.5MB each for `netflix.jpg` and `netflix2.png`)
- **Current loading**: Intersection observer loads images when visible (better, but still impacts initial page load)
- **User experience**: Heavy images can delay First Contentful Paint (FCP) and Largest Contentful Paint (LCP)

### Current Implementation
```tsx
// components/Projects.tsx - ImageSlider component
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsVisible(entry.isIntersecting); // Loads immediately when visible
    },
    { threshold: 0.1 }
  );
}, []);
```

## 🎯 Proposed Loading Strategy

### Phase 1: Critical Page Assets (0-2s)
**Priority: IMMEDIATE**
- Hero section image (`/portrait.jpg`)
- Navigation and layout components
- Essential CSS and fonts
- Above-the-fold content

### Phase 2: Deferred Screenshot Loading (2s+)
**Priority: BACKGROUND**
- Wait for main page load completion
- Start preloading project screenshots during browser idle time
- Prioritize visible project screenshots first
- Load remaining screenshots in background

### Phase 3: On-Demand Loading (Fallback)
**Priority: IMMEDIATE (when needed)**
- Keep intersection observer as immediate fallback
- If user scrolls to unloaded project, load instantly
- Ensure smooth UX regardless of preload status

## 🛠️ Implementation Strategy

### 1. Main Page Load Detection
```tsx
// Hook to detect when main page assets are loaded
const usePageLoadComplete = () => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      // Wait for both DOM and all resources
      if (document.readyState === 'complete') {
        setTimeout(() => setIsComplete(true), 1000); // Grace period
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(() => setIsComplete(true), 1000);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return isComplete;
};
```

### 2. Smart Preloading Manager
```tsx
// utils/imagePreloader.ts
class ProjectImagePreloader {
  private loadedImages = new Set<string>();
  private loadingImages = new Set<string>();

  async preloadVisibleProjects(projects: Project[]) {
    // Get visible project cards first
    const visibleProjects = this.getVisibleProjects(projects);

    // Load first image of each visible project
    for (const project of visibleProjects) {
      await this.preloadImage(project.images[0]);
    }
  }

  async preloadAllImages(projects: Project[]) {
    // Use requestIdleCallback for non-critical loading
    const preloadBatch = () => {
      return new Promise((resolve) => {
        requestIdleCallback(() => {
          this.preloadNextBatch(projects);
          resolve();
        });
      });
    };

    await preloadBatch();
  }

  private async preloadImage(src: string): Promise<void> {
    if (this.loadedImages.has(src) || this.loadingImages.has(src)) {
      return;
    }

    this.loadingImages.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.add(src);
        this.loadingImages.delete(src);
        resolve();
      };
      img.onerror = () => {
        this.loadingImages.delete(src);
        reject();
      };
      img.src = src;
    });
  }
}
```

### 3. Enhanced ImageSlider Component
```tsx
// components/Projects.tsx
const ImageSlider: React.FC<ImageSliderProps> = ({ images, isModalOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const pageLoadComplete = usePageLoadComplete();

  // Immediate loading if visible + page loaded, or user interaction
  const shouldLoadImage = isVisible && (pageLoadComplete || isModalOpen);

  useEffect(() => {
    if (shouldLoadImage && !imageLoaded) {
      // Image will be preloaded or load immediately
      setImageLoaded(true);
    }
  }, [shouldLoadImage]);

  return (
    <div ref={containerRef}>
      {shouldLoadImage ? (
        <Image src={images[currentIndex]} {...props} />
      ) : (
        <OptimizedLoadingSkeleton />
      )}
    </div>
  );
};
```

### 4. Global Preloader Integration
```tsx
// components/Projects.tsx - Main component
const Projects = () => {
  const pageLoadComplete = usePageLoadComplete();
  const preloader = useRef(new ProjectImagePreloader());

  useEffect(() => {
    if (pageLoadComplete) {
      // Start background preloading after main page loads
      const startPreloading = async () => {
        // Phase 1: Preload visible project thumbnails
        await preloader.current.preloadVisibleProjects(projects);

        // Phase 2: Preload remaining images during idle time
        await preloader.current.preloadAllImages(projects);
      };

      startPreloading();
    }
  }, [pageLoadComplete]);

  return (/* JSX */);
};
```

## 📈 Expected Performance Benefits

### Initial Page Load (0-2s)
- **Faster FCP**: Hero and navigation load without waiting for project images
- **Better LCP**: Portrait image prioritized over project screenshots
- **Reduced blocking**: 11MB of images no longer block initial render

### User Experience (2s+)
- **Smooth scrolling**: Images preloaded before user reaches them
- **Instant interactions**: Intersection observer as immediate fallback
- **Progressive enhancement**: Page works even if preloading fails

### Network Efficiency
- **Smart prioritization**: Load visible content first
- **Idle time usage**: Use browser idle periods for background loading
- **Bandwidth-aware**: Could add connection speed detection

## 🔧 Implementation Steps

### Step 1: Create Loading Detection Hook
- [ ] Implement `usePageLoadComplete` hook
- [ ] Test with various connection speeds
- [ ] Add grace period for slower devices

### Step 2: Build Preloader Class
- [ ] Create `ProjectImagePreloader` utility
- [ ] Implement visible project detection
- [ ] Add `requestIdleCallback` for background loading

### Step 3: Update ImageSlider Component
- [ ] Integrate loading states with preloader
- [ ] Maintain intersection observer fallback
- [ ] Add optimized loading skeleton

### Step 4: Global Integration
- [ ] Add preloader to main Projects component
- [ ] Implement phased loading strategy
- [ ] Test performance impact

### Step 5: Performance Validation
- [ ] Measure FCP and LCP improvements
- [ ] Test on slower connections
- [ ] Validate user experience on mobile

## 🚀 Advanced Optimizations (Future)

### Connection-Aware Loading
```tsx
// Only preload on fast connections
const connection = navigator.connection;
if (connection?.effectiveType === '4g') {
  startPreloading();
}
```

### Progressive Image Loading
```tsx
// Load low-quality placeholder first, then full image
<Image
  src={highQualitySrc}
  placeholder="blur"
  blurDataURL={lowQualityBase64}
/>
```

### Service Worker Caching
```tsx
// Cache preloaded images for subsequent visits
self.addEventListener('message', (event) => {
  if (event.data.type === 'PRELOAD_IMAGES') {
    preloadAndCacheImages(event.data.urls);
  }
});
```

## 📊 Success Metrics

### Performance Targets
- **FCP**: < 1.5s (currently unknown, likely 2-3s)
- **LCP**: < 2.5s (portrait image should be prioritized)
- **CLS**: < 0.1 (skeleton should prevent layout shift)

### User Experience Targets
- **Perceived loading**: Smooth skeleton → image transition
- **Interaction readiness**: All visible content loads within 3s
- **Progressive enhancement**: Works without JavaScript

---

## 🎯 Implementation Priority

**HIGH PRIORITY** (Week 1):
1. Page load detection hook
2. Basic preloader integration
3. Enhanced ImageSlider with loading states

**MEDIUM PRIORITY** (Week 2):
4. Advanced preloading strategies
5. Performance measurement and optimization

**LOW PRIORITY** (Future):
6. Connection-aware loading
7. Service worker integration
8. Progressive image enhancement

This optimization should reduce initial page load time significantly while maintaining excellent user experience for project browsing.