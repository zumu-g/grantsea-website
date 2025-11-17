// Simple in-memory cache for auction data
// Based on openHomesCache.ts but optimized for auction functionality

interface CacheEntry {
  data: any[];
  timestamp: number;
}

class AuctionsCache {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly TTL = 10 * 60 * 1000; // 10 minutes cache (shorter for more frequent updates)
  private readonly LIVE_TTL = 30 * 1000; // 30 seconds for live auctions

  set(key: string, data: any[], isLive: boolean = false): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string, isLive: boolean = false): any[] | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    // Check if cache is expired (shorter TTL for live auctions)
    const ttl = isLive ? this.LIVE_TTL : this.TTL;
    if (Date.now() - entry.timestamp > ttl) {
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
    console.log('Auctions cache forcefully cleared');
  }
}

// Create a singleton instance
export const auctionsCache = new AuctionsCache();

// Background refresh function for auctions
async function refreshAuctionsInBackground(
  apiBaseUrl: string, 
  headers: HeadersInit, 
  cacheKey: string,
  isLive: boolean = false
): Promise<void> {
  try {
    const now = new Date();
    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    const maxPages = 5;
    const timeoutMs = 5000;
    let upcomingAuctions: any[] = [];
    
    console.log(`Background refresh: fetching fresh ${isLive ? 'live' : 'upcoming'} auctions data...`);
    
    const scanPromise = new Promise<any[]>(async (resolve, reject) => {
      try {
        while (hasMorePages && page <= maxPages) {
          const futureDate = new Date(now);
          futureDate.setDate(futureDate.getDate() + 30);
          
          const fromDate = now.toISOString().split('T')[0];
          const toDate = futureDate.toISOString().split('T')[0];
          
          // Build query parameters for auction properties
          let queryParams = `limit=100&page=${page}&saleMethod=auction`;
          if (!isLive) {
            queryParams += `&auctionDateFrom=${fromDate}&auctionDateTo=${toDate}`;
          } else {
            queryParams += `&status=live`;
          }
          
          const response = await fetch(
            `${apiBaseUrl}/properties?${queryParams}`,
            { headers, cache: 'no-store' }
          );
          
          if (!response.ok) {
            console.error(`Background refresh failed on page ${page}: ${response.status}`);
            break;
          }
          
          const data = await response.json();
          const pageProperties = data.items || data.data || [];
          
          if (pageProperties.length === 0) {
            hasMorePages = false;
          } else {
            // Filter for properties with auction dates
            const auctionProperties = pageProperties.filter((prop: any) => {
              if (!prop.auctionDate) return false;
              
              if (isLive) {
                // For live auctions, check if auction is happening now
                const auctionDateTime = new Date(`${prop.auctionDate} ${prop.auctionTime || '10:00'}`);
                const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
                const hourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
                return auctionDateTime >= hourAgo && auctionDateTime <= hourFromNow;
              } else {
                // For upcoming auctions, check if auction is in the future
                const auctionDate = new Date(prop.auctionDate);
                return auctionDate > now;
              }
            });
            
            if (auctionProperties.length > 0) {
              upcomingAuctions.push(...auctionProperties);
            }
            
            totalPagesScanned++;
            page++;
          }
        }
        
        resolve(upcomingAuctions);
      } catch (error) {
        reject(error);
      }
    });
    
    // Race between scan and timeout
    upcomingAuctions = await Promise.race([
      scanPromise,
      new Promise<any[]>((_, reject) => 
        setTimeout(() => reject(new Error('Background refresh timeout')), timeoutMs)
      )
    ]);
    
    // Update cache with fresh data
    auctionsCache.set(cacheKey, upcomingAuctions, isLive);
    console.log(`Background refresh complete: ${totalPagesScanned} pages scanned, found ${upcomingAuctions.length} ${isLive ? 'live' : 'upcoming'} auctions`);
  } catch (error) {
    console.error('Background refresh failed:', error);
  }
}

// Helper function to fetch upcoming auctions with caching
export async function fetchUpcomingAuctionsWithCache(
  apiBaseUrl: string,
  headers: HeadersInit,
  propertyIds?: string[]
): Promise<Map<string, any[]>> {
  const cacheKey = 'upcoming-auctions';
  const cachedData = auctionsCache.get(cacheKey);
  const cacheAge = cachedData ? Date.now() - (auctionsCache as any).cache.get(cacheKey)?.timestamp || 0 : Infinity;
  const staleThreshold = 5 * 60 * 1000; // 5 minutes - serve stale data after this
  
  let upcomingAuctions: any[] = [];
  
  // Stale-while-revalidate: serve cached data if available, fetch fresh data in background if stale
  if (cachedData) {
    console.log('Using cached auctions data');
    upcomingAuctions = cachedData;
    
    // If cache is stale but not expired, fetch fresh data in background
    if (cacheAge > staleThreshold) {
      console.log('Cache is stale, refreshing in background...');
      // Start background refresh (don't await)
      refreshAuctionsInBackground(apiBaseUrl, headers, cacheKey);
    }
  } else {
    console.log('No cached data, fetching fresh auctions data...');
    
    // Optimized scan with timeout and reasonable limits
    const now = new Date();
    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    const maxPages = 5; // Limit to 5 pages for performance (500 properties max)
    const timeoutMs = 5000; // 5 second timeout for entire operation
    
    console.log('Starting optimized auctions scan (max 5 pages, 5s timeout)...');
    
    const scanPromise = new Promise<any[]>(async (resolve, reject) => {
      try {
        while (hasMorePages && page <= maxPages) {
          // Add date filter to only fetch upcoming auctions
          const futureDate = new Date(now);
          futureDate.setDate(futureDate.getDate() + 30); // Only look 30 days ahead
          
          const fromDate = now.toISOString().split('T')[0];
          const toDate = futureDate.toISOString().split('T')[0];
          
          const response = await fetch(
            `${apiBaseUrl}/properties?limit=100&page=${page}&saleMethod=auction&auctionDateFrom=${fromDate}&auctionDateTo=${toDate}`,
            { headers, cache: 'no-store' }
          );
          
          if (!response.ok) {
            console.error(`Failed to fetch page ${page}: ${response.status}`);
            break;
          }
          
          const data = await response.json();
          const pageProperties = data.items || data.data || [];
          
          // Check if we've reached the end of data
          if (pageProperties.length === 0) {
            hasMorePages = false;
            console.log(`Reached end of data at page ${page}`);
          } else {
            // Filter for upcoming auctions only
            const upcoming = pageProperties.filter((prop: any) => {
              if (!prop.auctionDate) return false;
              const auctionDate = new Date(prop.auctionDate);
              return auctionDate > now;
            });
            
            if (upcoming.length > 0) {
              console.log(`Page ${page}: Found ${upcoming.length} upcoming auctions`);
              upcomingAuctions.push(...upcoming);
            } else {
              console.log(`Page ${page}: No upcoming auctions (${pageProperties.length} past/invalid)`);
            }
            
            totalPagesScanned++;
            page++;
          }
        }
        
        if (page > maxPages) {
          console.log(`Stopped scan at ${maxPages} pages for performance`);
        }
        
        resolve(upcomingAuctions);
      } catch (error) {
        reject(error);
      }
    });
    
    // Race between scan and timeout
    try {
      upcomingAuctions = await Promise.race([
        scanPromise,
        new Promise<any[]>((_, reject) => 
          setTimeout(() => reject(new Error('Scan timeout')), timeoutMs)
        )
      ]);
    } catch (error) {
      console.error('Auctions scan failed or timed out:', error);
      // Return empty array if scan fails, but don't cache it
      return new Map<string, any[]>();
    }
    
    // Cache the results
    auctionsCache.set(cacheKey, upcomingAuctions);
    console.log(`Scan complete: ${totalPagesScanned} pages scanned, found ${upcomingAuctions.length} upcoming auctions`);
  }
  
  // Create a map of property ID to auction details
  const auctionsByProperty = new Map<string, any[]>();
  
  upcomingAuctions.forEach((prop: any) => {
    const propertyId = prop.id?.toString();
    if (!propertyId || !prop.auctionDate) return;
    
    // If propertyIds filter is provided, skip properties not in the list
    if (propertyIds && !propertyIds.includes(propertyId)) return;
    
    const auction = {
      id: `auction-${propertyId}`,
      propertyId: propertyId,
      auctionDate: prop.auctionDate,
      auctionTime: prop.auctionTime || '10:00 AM',
      auctionVenue: prop.auctionVenue,
      auctionTerms: prop.auctionTerms,
      registrationRequired: prop.registrationRequired ?? true,
      bidderRegistrationUrl: prop.bidderRegistrationUrl,
      auctioneer: prop.auctioneer,
      guide: prop.guide || prop.priceDisplay,
      reserve: prop.reserve,
      status: prop.auctionStatus || 'upcoming',
      streamUrl: prop.auctionStreamUrl,
      isStreamingEnabled: prop.isAuctionStreamEnabled ?? false
    };
    
    if (!auctionsByProperty.has(propertyId)) {
      auctionsByProperty.set(propertyId, []);
    }
    auctionsByProperty.get(propertyId)!.push(auction);
  });
  
  return auctionsByProperty;
}

// Helper function to fetch live auctions with caching
export async function fetchLiveAuctionsWithCache(
  apiBaseUrl: string,
  headers: HeadersInit
): Promise<any[]> {
  const cacheKey = 'live-auctions';
  const cachedData = auctionsCache.get(cacheKey, true);
  
  let liveAuctions: any[] = [];
  
  // For live auctions, always refresh more frequently (30-second cache)
  if (cachedData) {
    console.log('Using cached live auctions data');
    liveAuctions = cachedData;
    
    // Always refresh live auctions in background for real-time updates
    refreshAuctionsInBackground(apiBaseUrl, headers, cacheKey, true);
  } else {
    console.log('No cached live data, fetching fresh live auctions...');
    
    try {
      const response = await fetch(
        `${apiBaseUrl}/properties?saleMethod=auction&status=live&hasAuctionStream=true`,
        { headers, cache: 'no-store' }
      );
      
      if (response.ok) {
        const data = await response.json();
        liveAuctions = data.items || data.data || [];
        auctionsCache.set(cacheKey, liveAuctions, true);
        console.log(`Found ${liveAuctions.length} live auctions with streams`);
      }
    } catch (error) {
      console.error('Failed to fetch live auctions:', error);
    }
  }
  
  return liveAuctions.filter((auction: any) => 
    auction.auctionStreamUrl && auction.isAuctionStreamEnabled
  );
}