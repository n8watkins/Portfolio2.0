import { Project } from './types';

export class ProjectImagePreloader {
  private loadedImages = new Set<string>();
  private loadingImages = new Set<string>();

  async preloadVisibleProjects(projects: Project[]) {
    const visibleProjects = this.getVisibleProjects(projects);

    for (const project of visibleProjects) {
      if (project.images && project.images.length > 0) {
        await this.preloadImage(project.images[0]);
      }
    }
  }

  async preloadAllImages(projects: Project[]) {
    // Skip aggressive preloading on slow connections
    if (!this.shouldPreload()) {
      return;
    }

    const preloadBatch = () => {
      return new Promise<void>((resolve) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            this.preloadNextBatch(projects);
            resolve();
          });
        } else {
          setTimeout(() => {
            this.preloadNextBatch(projects);
            resolve();
          }, 100);
        }
      });
    };

    await preloadBatch();
  }

  private getVisibleProjects(projects: Project[]): Project[] {
    const visibleProjects: Project[] = [];

    projects.forEach((project) => {
      const projectElements = document.querySelectorAll(`[data-project-id="${project.id}"]`);
      projectElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible && !visibleProjects.find(p => p.id === project.id)) {
          visibleProjects.push(project);
        }
      });
    });

    return visibleProjects.length > 0 ? visibleProjects : projects.slice(0, 3);
  }

  private async preloadNextBatch(projects: Project[]) {
    const allImages: string[] = [];

    projects.forEach(project => {
      if (project.images) {
        allImages.push(...project.images);
      }
    });

    const unloadedImages = allImages.filter(
      src => !this.loadedImages.has(src) && !this.loadingImages.has(src)
    );

    const batchSize = 2;
    const batch = unloadedImages.slice(0, batchSize);

    await Promise.all(batch.map(src => this.preloadImage(src)));
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

  isImageLoaded(src: string): boolean {
    return this.loadedImages.has(src);
  }

  private shouldPreload(): boolean {
    // Check if Network Information API is available
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;

      // Skip preloading on slow connections
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return false;
      }

      // Skip if user has data saver enabled
      if (connection.saveData) {
        return false;
      }
    }

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
      return false;
    }

    return true;
  }
}