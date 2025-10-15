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
    
    // Fetch only the pages that typically contain upcoming open homes
    // Based on our analysis, these are around pages 6, 16, 17, 24, 45, 46
    const targetPages = [6, 16, 17, 24, 45, 46];
    const now = new Date();
    
    for (const page of targetPages) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/openHomes?limit=100&page=${page}`,
          { headers, cache: 'no-store' }
        );
        
        if (!response.ok) continue;
        
        const data = await response.json();
        const pageOpenHomes = data.items || data.data || [];
        
        // Filter for upcoming only
        const upcoming = pageOpenHomes.filter((oh: any) => {
          const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
          return startTime > now;
        });
        
        upcomingOpenHomes.push(...upcoming);
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
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