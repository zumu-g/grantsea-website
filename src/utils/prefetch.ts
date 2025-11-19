// Property prefetching utilities for improved perceived performance

interface PrefetchOptions {
  suburb?: string;
  type?: 'all' | 'sale' | 'lease';
  limit?: number;
}

/**
 * Prefetch common property queries in the background
 * This improves perceived performance by preloading data users are likely to need
 */
export function prefetchProperties(options: PrefetchOptions[] = []) {
  // Default prefetch queries for common user paths
  const defaultQueries: PrefetchOptions[] = [
    { type: 'sale', limit: 12 }, // Properties for sale page
    { type: 'lease', limit: 12 }, // Properties for rent page
    { suburb: 'Berwick', limit: 6 }, // Popular suburb
    { suburb: 'Narre Warren', limit: 6 }, // Popular suburb
  ];

  const queriesToFetch = options.length > 0 ? options : defaultQueries;

  // Fire off prefetch requests in the background
  queriesToFetch.forEach(async (query) => {
    try {
      const params = new URLSearchParams();
      if (query.type) params.append('type', query.type);
      if (query.suburb) params.append('suburb', query.suburb);
      if (query.limit) params.append('limit', query.limit.toString());

      // Use fetch with low priority to not interfere with critical requests
      fetch(`/api/properties?${params.toString()}`, {
        priority: 'low' as RequestInit['priority'],
        mode: 'cors',
      }).catch(() => {
        // Silently fail prefetch requests
        console.debug('Prefetch failed for:', query);
      });
    } catch (error) {
      // Silently fail - prefetch is optional
      console.debug('Prefetch error:', error);
    }
  });
}

/**
 * Prefetch property data when user shows intent (hover, focus, etc.)
 */
export function prefetchOnIntent(
  element: HTMLElement,
  query: PrefetchOptions,
  delay: number = 100
) {
  let timeoutId: NodeJS.Timeout;

  const handleIntent = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      prefetchProperties([query]);
    }, delay);
  };

  const cleanup = () => {
    clearTimeout(timeoutId);
    element.removeEventListener('mouseenter', handleIntent);
    element.removeEventListener('focus', handleIntent);
  };

  element.addEventListener('mouseenter', handleIntent);
  element.addEventListener('focus', handleIntent);

  return cleanup;
}

/**
 * Warm up the cache with essential data on app initialization
 */
export function warmUpCache() {
  // Only warm up cache if we're in the browser
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback to run during idle time
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      prefetchProperties();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      prefetchProperties();
    }, 2000);
  }
}