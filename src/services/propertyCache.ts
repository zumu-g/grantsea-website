// Property caching service for improved performance
// Implements server-side caching with TTL to reduce API calls

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class PropertyCache {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 30 * 60 * 1000; // 30 minutes in milliseconds for better performance

  /**
   * Generate a cache key based on request parameters
   */
  private generateKey(params: {
    type?: string;
    limit?: string;
    suburb?: string;
    published?: string;
    [key: string]: string | undefined;
  }): string {
    const keys = Object.keys(params).sort();
    const keyParts = keys.map(key => `${key}:${params[key] || ''}`);
    return keyParts.join('|');
  }

  /**
   * Get cached data if available and not expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    const now = Date.now();
    if (now > entry.timestamp + entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set cache data with TTL
   */
  set<T>(key: string, data: T, ttl = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });

    // Clean up expired entries periodically
    this.cleanupExpired();
  }

  /**
   * Get cached property data or return null
   */
  getCachedProperties(params: {
    type?: string;
    limit?: string;
    suburb?: string;
    published?: string;
  }): any[] | null {
    const key = this.generateKey(params);
    return this.get(key);
  }

  /**
   * Cache property data
   */
  setCachedProperties(
    params: {
      type?: string;
      limit?: string;
      suburb?: string;
      published?: string;
    },
    data: any[],
    ttl = this.DEFAULT_TTL
  ): void {
    const key = this.generateKey(params);
    this.set(key, data, ttl);
  }

  /**
   * Get cached property by ID
   */
  getCachedProperty(id: string): any | null {
    return this.get(`property:${id}`);
  }

  /**
   * Cache single property
   */
  setCachedProperty(id: string, property: any, ttl = this.DEFAULT_TTL): void {
    this.set(`property:${id}`, property, ttl);
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupExpired(): void {
    // Only run cleanup occasionally to avoid performance impact
    if (Math.random() > 0.1) return;

    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache stats for monitoring
   */
  getStats(): {
    size: number;
    entries: string[];
    memoryUsage: number;
  } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys()),
      memoryUsage: JSON.stringify(Object.fromEntries(this.cache)).length
    };
  }
}

// Export singleton instance
export const propertyCache = new PropertyCache();

/**
 * Cached fetch wrapper for property API calls
 */
export async function fetchWithCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl?: number
): Promise<T> {
  // Try to get from cache first
  const cached = propertyCache.get<T>(key);
  if (cached !== null) {
    console.log(`Cache HIT for key: ${key}`);
    return cached;
  }

  console.log(`Cache MISS for key: ${key}`);
  
  // Fetch fresh data
  try {
    const data = await fetchFn();
    
    // Cache the result
    propertyCache.set(key, data, ttl);
    
    return data;
  } catch (error) {
    console.error(`Failed to fetch data for key ${key}:`, error);
    throw error;
  }
}