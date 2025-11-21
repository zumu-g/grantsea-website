import { useState, useEffect } from 'react';
import { crmAPI, Property } from '@/services/api';

// Simple cache for properties with aggressive caching
const propertiesCache = new Map<string, { data: Property[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for faster refresh
const FRESH_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes for super fresh data

interface UsePropertiesOptions {
  suburb?: string;
  limit?: number;
  featured?: boolean;
  type?: 'all' | 'sale' | 'lease' | 'rent';
}

interface UsePropertiesReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProperties(options?: UsePropertiesOptions): UsePropertiesReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Immediately check cache on mount to reduce loading time
  const [initialCacheChecked, setInitialCacheChecked] = useState(false);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create cache key
      const cacheKey = JSON.stringify({
        suburb: options?.suburb,
        limit: options?.limit,
        featured: options?.featured,
        type: options?.type
      });

      // Check cache first - serve immediately if very fresh
      const cached = propertiesCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < FRESH_CACHE_DURATION) {
        setProperties(cached.data);
        setLoading(false);
        return;
      }

      // Show cached data immediately while fetching fresh data in background
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setProperties(cached.data);
        setLoading(false);
      }

      let response;
      
      if (options?.featured) {
        response = await crmAPI.properties.getFeaturedProperties();
      } else if (options?.type === 'lease' || options?.type === 'rent') {
        // Use the specific lease endpoint
        response = await crmAPI.properties.getPropertiesForLease({
          suburb: options?.suburb,
          limit: options?.limit
        });
      } else if (options?.type === 'sale') {
        // Use the specific sale endpoint with optimized limit
        const actualLimit = options?.limit || 12;
        response = await crmAPI.properties.getPropertiesForSale({
          suburb: options?.suburb,
          limit: Math.min(actualLimit, 24) // Reasonable limit for good UX
        });
      } else {
        // Get all properties (both sale and lease) with timeout protection
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 3000) // Reduced from 8s to 3s
        );
        
        const [saleResponse, leaseResponse] = await Promise.race([
          Promise.all([
            crmAPI.properties.getPropertiesForSale({
              suburb: options?.suburb,
              limit: options?.limit ? Math.floor(options.limit / 2) : 10
            }),
            crmAPI.properties.getPropertiesForLease({
              suburb: options?.suburb,
              limit: options?.limit ? Math.floor(options.limit / 2) : 10
            })
          ]),
          timeoutPromise
        ]) as [any, any];
        
        response = {
          success: true,
          data: [...(saleResponse.data || []), ...(leaseResponse.data || [])]
        };
      }

      if (response.success && response.data) {
        // Always set the properties, even if empty array
        setProperties(response.data);
        // Cache the successful response
        propertiesCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where success flag might be missing but data exists
        setProperties(response.data);
        // Cache the response
        propertiesCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      } else {
        throw new Error(response.error || 'Failed to fetch properties');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Set empty array instead of mock data
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Check cache immediately on mount before starting network request
  useEffect(() => {
    if (!initialCacheChecked) {
      const cacheKey = JSON.stringify({
        suburb: options?.suburb,
        limit: options?.limit,
        featured: options?.featured,
        type: options?.type
      });

      const cached = propertiesCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setProperties(cached.data);
        setLoading(false);
        setInitialCacheChecked(true);
        return;
      }
      setInitialCacheChecked(true);
    }
    
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.suburb, options?.limit, options?.featured, options?.type, initialCacheChecked]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
}

// Hook for single property
export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await crmAPI.properties.getPropertyById(id);
        
        if (response.success && response.data) {
          setProperty(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch property');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        
        // Don't use mock data - let the error bubble up
        // The component can decide how to handle the error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  return { property, loading, error };
}

// Mock data for development/fallback
function getMockProperties(): Property[] {
  return [
    {
      id: '1',
      address: '42 Rosewood Avenue',
      suburb: 'Berwick',
      state: 'VIC',
      postcode: '3806',
      price: '850000',
      priceDisplay: '$850,000 - $900,000',
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      landSize: 700,
      buildingSize: 220,
      propertyType: 'House',
      status: 'active',
      description: 'Prized family home on 700sqm',
      features: [
        'Master bedroom with walk-in robe and ensuite',
        'Open-plan kitchen with stone benchtops',
        'Ducted heating and cooling',
        'Double garage with internal access'
      ],
      images: [
        {
          id: '1',
          url: '/property-images/property1-main.jpg',
          order: 1,
          type: 'photo'
        }
      ],
      agent: {
        id: '1',
        name: 'Sarah Thompson',
        email: 'sarah@grantsea.com',
        phone: '0423 456 789'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      address: '15 Lakeside Drive',
      suburb: 'Narre Warren',
      state: 'VIC',
      postcode: '3805',
      price: '1250000',
      priceDisplay: '$1,250,000 - $1,350,000',
      bedrooms: 5,
      bathrooms: 3,
      carSpaces: 3,
      propertyType: 'House',
      status: 'active',
      description: 'Modern lakefront masterpiece',
      features: [
        'Lakefront position with stunning views',
        'Multiple living areas',
        'Chef\'s kitchen with butler\'s pantry',
        'Swimming pool and spa'
      ],
      images: [
        {
          id: '2',
          url: '/property-images/property2-main.jpg',
          order: 1,
          type: 'photo'
        }
      ],
      agent: {
        id: '1',
        name: 'Sarah Thompson',
        email: 'sarah@grantsea.com',
        phone: '0423 456 789'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      address: '8 Heritage Court',
      suburb: 'Pakenham',
      state: 'VIC',
      postcode: '3810',
      price: '720000',
      priceDisplay: '$720,000 - $780,000',
      bedrooms: 4,
      bathrooms: 2,
      carSpaces: 2,
      propertyType: 'House',
      status: 'active',
      description: 'Spacious family entertainer',
      features: [
        'Large entertainment area',
        'Modern kitchen with island bench',
        'Four generous bedrooms',
        'Low maintenance gardens'
      ],
      images: [
        {
          id: '3',
          url: '/property-images/property3-main.jpg',
          order: 1,
          type: 'photo'
        }
      ],
      agent: {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@grantsea.com',
        phone: '0412 345 678'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      address: '23 Parkview Terrace',
      suburb: 'Officer',
      state: 'VIC',
      postcode: '3809',
      price: '650000',
      priceDisplay: '$650,000 - $700,000',
      bedrooms: 3,
      bathrooms: 2,
      carSpaces: 1,
      propertyType: 'Townhouse',
      status: 'active',
      description: 'Contemporary townhouse living',
      features: [
        'Brand new construction',
        'High-quality fixtures throughout',
        'Private courtyard',
        'Walk to shops and transport'
      ],
      images: [
        {
          id: '4',
          url: '/property-images/property4-main.jpg',
          order: 1,
          type: 'photo'
        }
      ],
      agent: {
        id: '3',
        name: 'Emma Wilson',
        email: 'emma@grantsea.com',
        phone: '0434 567 890'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}