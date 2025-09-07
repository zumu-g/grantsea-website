// Performance Optimization Utilities

// Image Optimization
export const imageOptimization = {
  // Generate responsive image URLs
  getResponsiveImageUrl: (baseUrl: string, width: number, quality = 75): string => {
    if (baseUrl.includes('unsplash.com')) {
      return `${baseUrl}&w=${width}&q=${quality}&fm=webp&auto=format`;
    }
    
    if (baseUrl.includes('wordpress') || baseUrl.includes('wp-content')) {
      // WordPress image resizing
      return `${baseUrl}?w=${width}&q=${quality}`;
    }
    
    return baseUrl;
  },

  // Generate srcSet for responsive images
  generateSrcSet: (baseUrl: string, sizes: number[] = [320, 480, 768, 1024, 1280, 1920]): string => {
    return sizes
      .map(size => `${imageOptimization.getResponsiveImageUrl(baseUrl, size)} ${size}w`)
      .join(', ');
  },

  // Preload critical images
  preloadImage: (url: string, priority: 'high' | 'low' = 'low') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    if (priority === 'high') {
      link.fetchPriority = 'high';
    }
    document.head.appendChild(link);
  },

  // Lazy loading with intersection observer
  setupLazyLoading: () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
};

// Code Splitting and Lazy Loading
export const lazyComponents = {};

// Bundle Splitting Configuration
export const bundleOptimization = {
  // Vendor chunks configuration for webpack
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      },
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        priority: -10,
        chunks: 'all'
      },
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react',
        priority: 20,
        chunks: 'all'
      },
      forms: {
        test: /[\\/]src[\\/]components[\\/]forms[\\/]/,
        name: 'forms',
        priority: 10,
        chunks: 'all'
      },
      property: {
        test: /[\\/]src[\\/]components[\\/]property[\\/]/,
        name: 'property',
        priority: 10,
        chunks: 'all'
      }
    }
  },

  // Module preloading
  preloadModules: [
    // Critical modules to preload
    'react',
    'react-dom',
    '@/components/layout/Header',
    '@/components/layout/Footer',
    '@/components/ui/Hero'
  ]
};

// Performance Metrics
export const performanceMetrics = {
  // Core Web Vitals measurement
  measureWebVitals: () => {
    if (typeof window !== 'undefined') {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        const lcp = lastEntry?.startTime ?? 0;
        performanceMonitoring.reportPerformance('LCP', lcp);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const fidEntry = entry as any;
          if (fidEntry.processingStart) {
            const fid = fidEntry.processingStart - fidEntry.startTime;
            performanceMonitoring.reportPerformance('FID', fid);
          }
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            clsValue += clsEntry.value;
          }
        }
        performanceMonitoring.reportPerformance('CLS', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Custom performance marks
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },

  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.measure(name, startMark, endMark);
    }
  },

  // Resource loading performance
  trackResourceLoading: () => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        console.log('Navigation timing:', {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          load: navigation.loadEventEnd - navigation.loadEventStart,
          total: navigation.loadEventEnd - navigation.fetchStart
        });

        console.log('Resource loading:', resources.map(resource => ({
          name: resource.name,
          duration: resource.duration,
          size: resource.transferSize
        })));
      });
    }
  }
};

// Caching Strategies
export const cachingStrategies = {
  // Service Worker cache strategies
  cacheFirst: {
    strategy: 'CacheFirst',
    cacheName: 'images-cache',
    matchCallback: ({ request }: { request: Request }) => {
      return request.destination === 'image';
    }
  },

  networkFirst: {
    strategy: 'NetworkFirst',
    cacheName: 'api-cache',
    matchCallback: ({ url }: { url: URL }) => {
      return url.pathname.startsWith('/api/');
    }
  },

  staleWhileRevalidate: {
    strategy: 'StaleWhileRevalidate',
    cacheName: 'pages-cache',
    matchCallback: ({ request }: { request: Request }) => {
      return request.mode === 'navigate';
    }
  },

  // Browser caching
  localStorage: {
    set: (key: string, value: any, expiry?: number) => {
      const item = {
        value,
        expiry: expiry ? Date.now() + expiry : null
      };
      localStorage.setItem(key, JSON.stringify(item));
    },

    get: (key: string) => {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      if (item.expiry && Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    },

    remove: (key: string) => {
      localStorage.removeItem(key);
    }
  },

  sessionStorage: {
    set: (key: string, value: any) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    },

    get: (key: string) => {
      const itemStr = sessionStorage.getItem(key);
      return itemStr ? JSON.parse(itemStr) : null;
    },

    remove: (key: string) => {
      sessionStorage.removeItem(key);
    }
  }
};

// Network Optimization
export const networkOptimization = {
  // Prefetch important resources
  prefetchResource: (url: string, type: 'fetch' | 'script' | 'style' = 'fetch') => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    if (type !== 'fetch') {
      link.as = type;
    }
    document.head.appendChild(link);
  },

  // Preconnect to external domains
  preconnectDomain: (domain: string) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  },

  // DNS prefetch
  dnsPrefetch: (domain: string) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  },

  // Setup preconnections for common domains
  setupPreconnections: () => {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://images.unsplash.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com'
    ];

    domains.forEach(domain => {
      networkOptimization.preconnectDomain(domain);
    });
  }
};

// Performance Monitoring
export const performanceMonitoring = {
  // Real User Monitoring (RUM)
  init: () => {
    performanceMetrics.measureWebVitals();
    performanceMetrics.trackResourceLoading();
    networkOptimization.setupPreconnections();
    imageOptimization.setupLazyLoading();
  },

  // Report performance data
  reportPerformance: (metric: string, value: number, tags?: Record<string, string>) => {
    // This would integrate with your analytics service
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric, {
        custom_map: {
          metric_value: 'metric1'
        },
        metric_value: Math.round(value),
        ...tags
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance metric: ${metric} = ${value}`, tags);
    }

    // Send to internal RUM endpoint for local storage/analysis
    try {
      const payload = {
        metric,
        value,
        tags: tags || {},
        ts: Date.now(),
        href: typeof window !== 'undefined' ? window.location.href : '',
      };
      if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        (navigator as any).sendBeacon('/api/web-vitals', blob);
      } else if (typeof fetch !== 'undefined') {
        fetch('/api/web-vitals', {
          method: 'POST',
          keepalive: true,
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch {
      // noop
    }
  },

  // Performance budget alerts
  checkPerformanceBudgets: () => {
    const budgets = {
      lcp: 2500, // Largest Contentful Paint
      fid: 100,  // First Input Delay
      cls: 0.1   // Cumulative Layout Shift
    };

    // This would implement actual budget checking
    // For now, just log the budgets
    console.log('Performance budgets:', budgets);
  }
};

// React-specific optimizations
export const reactOptimizations = {
  // Memoization helpers
  memo: {
    // Props comparison for React.memo
    propsEqual: (prevProps: any, nextProps: any, keys: string[]) => {
      return keys.every(key => prevProps[key] === nextProps[key]);
    },

    // Deep comparison for complex objects
    deepEqual: (obj1: any, obj2: any): boolean => {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
  },

  // Debounce hook for expensive operations
  debounce: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },

  // Throttle hook for scroll/resize events
  throttle: (func: Function, delay: number) => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    };
  }
};

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  // Setup performance monitoring when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    performanceMonitoring.init();
  });
}

export default {
  imageOptimization,
  lazyComponents,
  bundleOptimization,
  performanceMetrics,
  cachingStrategies,
  networkOptimization,
  performanceMonitoring,
  reactOptimizations
};