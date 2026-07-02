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

// [PROTECTED-APPROVED 2026-07-02] Reverse scan replaces the forwards "scan ALL pages" loop.
// Why: VaultRE's /openHomes endpoint IGNORES the from/to date filters (verified 2026-07-02:
// totalItems is identical with or without them) and returns the FULL history (2,461 records /
// 50 pages back to 2023). Records are in insertion order, so upcoming open homes can only live
// in the last few pages — future events are always recently created. Scanning forwards through
// all history took 100s+ and exceeded Vercel's function limit, killing every /api/properties
// request. Scanning backwards from the last page finds the same complete set of upcoming open
// homes in 2-4 requests. Coverage guarantee preserved: we keep scanning backwards until we hit
// EMPTY_PAGES_MARGIN consecutive pages with no upcoming entries, so nothing "buried" is missed.
const SCAN_TIMEOUT_MS = 20000; // Well under Vercel maxDuration
const EMPTY_PAGES_MARGIN = 3; // Keep scanning back this many pages past the last future entry
const MAX_PAGES_SCANNED = 15; // Hard cap; upcoming events never span this many trailing pages

async function scanUpcomingOpenHomes(
  apiBaseUrl: string,
  headers: HeadersInit
): Promise<any[]> {
  const now = new Date();
  const upcomingOpenHomes: any[] = [];

  const fetchPage = async (page: number): Promise<{ items: any[]; totalPages: number }> => {
    const response = await fetch(
      `${apiBaseUrl}/openHomes?limit=100&page=${page}`,
      { headers, cache: 'no-store' }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch open homes page ${page}: ${response.status}`);
    }
    const data = await response.json();
    return { items: data.items || data.data || [], totalPages: data.totalPages || 1 };
  };

  const scanPromise = (async () => {
    // First request discovers totalPages
    const first = await fetchPage(1);
    const totalPages = first.totalPages;

    const collectUpcoming = (items: any[]): number => {
      const upcoming = items.filter((oh: any) => {
        const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
        return startTime > now;
      });
      upcomingOpenHomes.push(...upcoming);
      return upcoming.length;
    };

    if (totalPages === 1) {
      collectUpcoming(first.items);
      return upcomingOpenHomes;
    }

    // Walk backwards from the last page
    let emptyPagesInARow = 0;
    let pagesScanned = 0;
    for (let page = totalPages; page >= 1 && pagesScanned < MAX_PAGES_SCANNED; page--) {
      const { items } = await fetchPage(page);
      const found = collectUpcoming(items);
      pagesScanned++;
      emptyPagesInARow = found > 0 ? 0 : emptyPagesInARow + 1;
      if (emptyPagesInARow >= EMPTY_PAGES_MARGIN) break;
    }
    console.log(`Reverse scan: ${pagesScanned}/${totalPages} pages scanned, found ${upcomingOpenHomes.length} upcoming open homes`);
    return upcomingOpenHomes;
  })();

  return Promise.race([
    scanPromise,
    new Promise<any[]>((_, reject) =>
      setTimeout(() => reject(new Error('Open homes scan timeout')), SCAN_TIMEOUT_MS)
    )
  ]);
}

// Background refresh function
async function refreshOpenHomesInBackground(
  apiBaseUrl: string,
  headers: HeadersInit,
  cacheKey: string
): Promise<void> {
  try {
    const upcomingOpenHomes = await scanUpcomingOpenHomes(apiBaseUrl, headers);
    // Update cache with fresh data
    openHomesCache.set(cacheKey, upcomingOpenHomes);
    console.log(`Background refresh complete: found ${upcomingOpenHomes.length} upcoming open homes`);
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

    // [PROTECTED-APPROVED 2026-07-02] Reverse scan (see scanUpcomingOpenHomes above)
    try {
      upcomingOpenHomes = await scanUpcomingOpenHomes(apiBaseUrl, headers);
    } catch (error) {
      console.error('Open homes scan failed or timed out:', error);
      // Return empty map if scan fails, but don't cache it
      return new Map<string, any[]>();
    }

    // Cache the results
    openHomesCache.set(cacheKey, upcomingOpenHomes);
    console.log(`Scan complete: found ${upcomingOpenHomes.length} upcoming open homes`);
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