// Simple in-memory cache for open homes data
// This helps prevent repeated fetching of all open homes pages

interface CacheEntry {
  data: any[];
  timestamp: number;
}

class OpenHomesCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes cache

  set(key: string, data: any[]): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string): any[] | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if cache is expired
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

// Create a singleton instance
export const openHomesCache = new OpenHomesCache();

// Helper function to fetch upcoming open homes with caching
export async function fetchUpcomingOpenHomesWithCache(
  apiBaseUrl: string,
  headers: HeadersInit,
  propertyIds?: string[]
): Promise<Map<string, any[]>> {
  const cacheKey = 'upcoming-open-homes';
  const cachedData = openHomesCache.get(cacheKey);
  
  let upcomingOpenHomes: any[] = [];
  
  if (cachedData) {
    console.log('Using cached open homes data');
    upcomingOpenHomes = cachedData;
  } else {
    console.log('Fetching fresh open homes data...');
    
    // Dynamic approach: Start from page 1 and keep fetching until we have enough upcoming open homes
    // or reach a reasonable limit to prevent timeout
    const now = new Date();
    const MAX_PAGES = 15; // Reasonable limit to prevent timeout
    const TARGET_UPCOMING = 20; // Stop when we find this many upcoming open homes
    let page = 1;
    let consecutiveEmptyPages = 0;
    
    while (page <= MAX_PAGES && upcomingOpenHomes.length < TARGET_UPCOMING) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/openHomes?limit=100&page=${page}`,
          { headers, cache: 'no-store' }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch page ${page}`);
          break;
        }
        
        const data = await response.json();
        const pageOpenHomes = data.items || data.data || [];
        
        // If we get empty pages, stop after 3 consecutive empty pages
        if (pageOpenHomes.length === 0) {
          consecutiveEmptyPages++;
          if (consecutiveEmptyPages >= 3) break;
        } else {
          consecutiveEmptyPages = 0;
        }
        
        // Filter for upcoming only
        const upcoming = pageOpenHomes.filter((oh: any) => {
          const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
          return startTime > now;
        });
        
        if (upcoming.length > 0) {
          console.log(`Found ${upcoming.length} upcoming open homes on page ${page}`);
          upcomingOpenHomes.push(...upcoming);
        }
        
        page++;
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        break;
      }
    }
    
    // Cache the results
    openHomesCache.set(cacheKey, upcomingOpenHomes);
    console.log(`Cached ${upcomingOpenHomes.length} upcoming open homes`);
  }
  
  // Create a map of property ID to open homes
  const openHomesByProperty = new Map<string, any[]>();
  
  upcomingOpenHomes.forEach((oh: any) => {
    const propertyId = oh.property?.id?.toString() || oh.propertyId?.toString();
    if (!propertyId) return;
    
    // If propertyIds filter is provided, skip properties not in the list
    if (propertyIds && !propertyIds.includes(propertyId)) return;
    
    const inspection = {
      id: oh.id?.toString() || '',
      startTime: oh.start || oh.startTime || oh.startDateTime,
      endTime: oh.end || oh.endTime || oh.endDateTime,
      type: oh.type || 'public'
    };
    
    if (!openHomesByProperty.has(propertyId)) {
      openHomesByProperty.set(propertyId, []);
    }
    openHomesByProperty.get(propertyId)!.push(inspection);
  });
  
  return openHomesByProperty;
}