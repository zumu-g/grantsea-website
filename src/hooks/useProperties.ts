import { useState, useEffect } from 'react';
import { crmAPI, Property } from '@/services/api';

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

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching properties from API...');

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
        // Use the specific sale endpoint
        response = await crmAPI.properties.getPropertiesForSale({
          suburb: options?.suburb,
          limit: options?.limit
        });
      } else {
        // Get all properties (both sale and lease)
        const [saleResponse, leaseResponse] = await Promise.all([
          crmAPI.properties.getPropertiesForSale({
            suburb: options?.suburb,
            limit: options?.limit ? Math.floor(options.limit / 2) : 10
          }),
          crmAPI.properties.getPropertiesForLease({
            suburb: options?.suburb,
            limit: options?.limit ? Math.floor(options.limit / 2) : 10
          })
        ]);
        
        response = {
          success: true,
          data: [...(saleResponse.data || []), ...(leaseResponse.data || [])]
        };
      }

      console.log('API Response:', response);
      if (response.success && response.data) {
        console.log(`Successfully fetched ${response.data.length} properties from API`);
        // Always set the properties, even if empty array
        setProperties(response.data);
      } else if (response.data && Array.isArray(response.data)) {
        // Handle case where success flag might be missing but data exists
        console.log(`Fetched ${response.data.length} properties (no success flag)`);
        setProperties(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch properties');
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      
      // Don't automatically fall back to mock data - let the component decide
      // Only use mock data if explicitly needed for development
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.log('API error details:', errorMessage);
      
      // Set empty array instead of mock data
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [options?.suburb, options?.limit, options?.featured, options?.type]);

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
        console.error('Error fetching property:', err);
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