// Simple in-memory cache for open homes data
// This helps prevent repeated fetching of all open homes pages

interface CacheEntry {
  data: any[];
  timestamp: number;
}

class OpenHomesCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 10 * 60 * 1000; // 10 minutes cache (shorter for more frequent updates)

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

// Background refresh function
async function refreshOpenHomesInBackground(
  apiBaseUrl: string, 
  headers: HeadersInit, 
  cacheKey: string
): Promise<void> {
  try {
    const now = new Date();
    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    // RULE: NEVER STOP - CHECK ALL PAGES to find upcoming open homes buried in later pages
    // No maxPages limit - scan until API returns empty pages
    const timeoutMs = 120000; // Extended timeout to 2 minutes for full scan
    let upcomingOpenHomes: any[] = [];
    
    console.log('Background refresh: fetching fresh open homes data from ALL pages...');
    
    const scanPromise = new Promise<any[]>(async (resolve, reject) => {
      try {
        while (hasMorePages) {
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const futureDate = new Date(now);
          futureDate.setDate(futureDate.getDate() + 30);
          
          const fromDate = now.toISOString().split('T')[0];
          const toDate = futureDate.toISOString().split('T')[0];
          
          const response = await fetch(
            `${apiBaseUrl}/openHomes?limit=100&page=${page}&from=${fromDate}&to=${toDate}`,
            { headers, cache: 'no-store' }
          );
          
          if (!response.ok) {
            console.error(`Background refresh failed on page ${page}: ${response.status}`);
            break;
          }
          
          const data = await response.json();
          const pageOpenHomes = data.items || data.data || [];
          
          if (pageOpenHomes.length === 0) {
            hasMorePages = false;
          } else {
            const upcoming = pageOpenHomes.filter((oh: any) => {
              const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
              return startTime > now;
            });
            
            if (upcoming.length > 0) {
              upcomingOpenHomes.push(...upcoming);
            }
            
            totalPagesScanned++;
            page++;
            
            // Add small delay to avoid rate limiting but keep scan moving
            if (page % 5 === 0) {
              await new Promise(resolve => setTimeout(resolve, 100)); // Brief pause every 5 pages
            }
          }
        }
        
        resolve(upcomingOpenHomes);
      } catch (error) {
        reject(error);
      }
    });
    
    // Race between scan and timeout
    upcomingOpenHomes = await Promise.race([
      scanPromise,
      new Promise<any[]>((_, reject) => 
        setTimeout(() => reject(new Error('Background refresh timeout')), timeoutMs)
      )
    ]);
    
    // Update cache with fresh data
    openHomesCache.set(cacheKey, upcomingOpenHomes);
    console.log(`Background refresh complete: ${totalPagesScanned} pages scanned, found ${upcomingOpenHomes.length} upcoming open homes`);
  } catch (error) {
    console.error('Background refresh failed:', error);
  }
}

// Helper function to fetch upcoming open homes with caching
export async function fetchUpcomingOpenHomesWithCache(
  apiBaseUrl: string,
  headers: HeadersInit,
  propertyIds?: string[]
): Promise<Map<string, any[]>> {
  const cacheKey = 'upcoming-open-homes';
  const cachedData = openHomesCache.get(cacheKey);
  const cacheAge = cachedData ? Date.now() - (openHomesCache as any).cache.get(cacheKey)?.timestamp || 0 : Infinity;
  const staleThreshold = 5 * 60 * 1000; // 5 minutes - serve stale data after this
  
  let upcomingOpenHomes: any[] = [];
  
  // Stale-while-revalidate: serve cached data if available, fetch fresh data in background if stale
  if (cachedData) {
    console.log('Using cached open homes data');
    upcomingOpenHomes = cachedData;
    
    // If cache is stale but not expired, fetch fresh data in background
    if (cacheAge > staleThreshold) {
      console.log('Cache is stale, refreshing in background...');
      // Start background refresh (don't await)
      refreshOpenHomesInBackground(apiBaseUrl, headers, cacheKey);
    }
  } else {
    console.log('No cached data, fetching fresh open homes data...');
    
    // Optimized scan with timeout and reasonable limits
    const now = new Date();
    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    // RULE: NEVER STOP - CHECK ALL PAGES to find upcoming open homes buried in later pages
    // Removed maxPages limit - scan until API returns empty pages (could be 50+ pages)
    const timeoutMs = 120000; // Extended timeout to 2 minutes for comprehensive scan
    
    console.log('Starting comprehensive open homes scan (ALL pages, no limit)...');
    
    const scanPromise = new Promise<any[]>(async (resolve, reject) => {
      try {
        while (hasMorePages) {
          // Add date filter to only fetch upcoming open homes
          const tomorrow = new Date(now);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const futureDate = new Date(now);
          futureDate.setDate(futureDate.getDate() + 30); // Only look 30 days ahead
          
          const fromDate = now.toISOString().split('T')[0];
          const toDate = futureDate.toISOString().split('T')[0];
          
          const response = await fetch(
            `${apiBaseUrl}/openHomes?limit=100&page=${page}&from=${fromDate}&to=${toDate}`,
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
            
            // Add small delay to avoid rate limiting but keep scan moving
            if (page % 5 === 0) {
              await new Promise(resolve => setTimeout(resolve, 100)); // Brief pause every 5 pages
            }
          }
        }
        
        
        resolve(upcomingOpenHomes);
      } catch (error) {
        reject(error);
      }
    });
    
    // Race between scan and timeout
    try {
      upcomingOpenHomes = await Promise.race([
        scanPromise,
        new Promise<any[]>((_, reject) => 
          setTimeout(() => reject(new Error('Scan timeout')), timeoutMs)
        )
      ]);
    } catch (error) {
      console.error('Open homes scan failed or timed out:', error);
      // Return empty array if scan fails, but don't cache it
      return new Map<string, any[]>();
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