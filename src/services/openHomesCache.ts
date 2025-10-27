// Simple in-memory cache for open homes data
// This helps prevent repeated fetching of all open homes pages

interface CacheEntry {
  data: any[];
  timestamp: number;
}

class OpenHomesCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 15 * 60 * 1000; // 15 minutes cache (longer since we scan all pages)

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

  // Force clear for debugging
  forceClear(): void {
    this.cache.clear();
    console.log('Open homes cache forcefully cleared');
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
    
    // Scan ALL pages to find ALL upcoming open homes
    const now = new Date();
    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    
    console.log('Starting comprehensive open homes scan...');
    
    while (hasMorePages) {
      try {
        const response = await fetch(
          `${apiBaseUrl}/openHomes?limit=100&page=${page}`,
          { headers, cache: 'no-store' }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch page ${page}: ${response.status}`);
          break;
        }
        
        const data = await response.json();
        const pageOpenHomes = data.items || data.data || [];
        
        // Check if we've reached the end of data
        if (pageOpenHomes.length === 0) {
          hasMorePages = false;
          console.log(`Reached end of data at page ${page}`);
        } else {
          // Filter for upcoming only
          const upcoming = pageOpenHomes.filter((oh: any) => {
            const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
            return startTime > now;
          });
          
          if (upcoming.length > 0) {
            console.log(`Page ${page}: Found ${upcoming.length} upcoming open homes`);
            upcomingOpenHomes.push(...upcoming);
          } else {
            console.log(`Page ${page}: No upcoming open homes (${pageOpenHomes.length} past)`);
          }
          
          totalPagesScanned++;
          page++;
          
          // Safety limit to prevent infinite loops (can be adjusted based on actual data)
          if (page > 100) {
            console.warn('Reached safety limit of 100 pages');
            hasMorePages = false;
          }
        }
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        hasMorePages = false;
      }
    }
    
    // Cache the results
    openHomesCache.set(cacheKey, upcomingOpenHomes);
    console.log(`Scan complete: ${totalPagesScanned} pages scanned, found ${upcomingOpenHomes.length} upcoming open homes`);
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