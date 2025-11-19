// Optimized service to fetch open homes ONLY for current active listings
import { openHomesCache } from './openHomesCache';

export async function fetchOpenHomesForActiveProperties(
  apiBaseUrl: string,
  headers: HeadersInit,
  activePropertyIds: string[]
): Promise<Map<string, any[]>> {
  const openHomesByProperty = new Map<string, any[]>();
  
  if (!activePropertyIds || activePropertyIds.length === 0) {
    return openHomesByProperty;
  }

  // Check if we have cached data
  const cacheKey = 'active-properties-open-homes';
  const cachedData = openHomesCache.get(cacheKey);
  
  if (cachedData) {
    // Filter cached data to only include our active properties
    cachedData.forEach((openHome: any) => {
      const propertyId = openHome.propertyId || openHome.listingId || openHome.listing_id;
      if (propertyId && activePropertyIds.includes(propertyId)) {
        if (!openHomesByProperty.has(propertyId)) {
          openHomesByProperty.set(propertyId, []);
        }
        openHomesByProperty.get(propertyId)!.push(openHome);
      }
    });
    return openHomesByProperty;
  }

  try {
    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 30); // Look 30 days ahead
    
    const fromDate = now.toISOString().split('T')[0];
    const toDate = futureDate.toISOString().split('T')[0];
    
    // Fetch open homes with date filter and limit
    // Start with a smaller page size and only fetch what we need
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(
      `${apiBaseUrl}/openHomes?from=${fromDate}&to=${toDate}&limit=200&page=1&sort=startTime`,
      { 
        headers, 
        cache: 'no-store',
        signal: controller.signal
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('Failed to fetch open homes:', response.status);
      return openHomesByProperty;
    }
    
    const data = await response.json();
    const openHomes = data.items || data.data || [];
    
    // Filter to only include open homes for our active properties
    const relevantOpenHomes: any[] = [];
    
    openHomes.forEach((oh: any) => {
      const propertyId = oh.propertyId || oh.listingId || oh.listing_id;
      if (propertyId && activePropertyIds.includes(propertyId)) {
        relevantOpenHomes.push(oh);
        
        if (!openHomesByProperty.has(propertyId)) {
          openHomesByProperty.set(propertyId, []);
        }
        
        const inspection = {
          id: oh.id?.toString() || '',
          startTime: oh.start || oh.startTime || oh.startDateTime,
          endTime: oh.end || oh.endTime || oh.endDateTime,
          type: oh.type || 'public'
        };
        
        openHomesByProperty.get(propertyId)!.push(inspection);
      }
    });
    
    // Cache the filtered results
    if (relevantOpenHomes.length > 0) {
      openHomesCache.set(cacheKey, relevantOpenHomes);
    }
    
    console.log(`Found ${relevantOpenHomes.length} open homes for ${openHomesByProperty.size} active properties`);
    
  } catch (error) {
    console.error('Error fetching open homes:', error);
  }
  
  return openHomesByProperty;
}