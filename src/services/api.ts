// Vault RE API Service
// This service handles all API calls to Vault RE CRM system

// VaultRE API - Using documented endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
// VaultRE requires both API Key and Access Token
const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || 'igLctQ47aj3qYl1vvHitt8gx3S9u59dpaW2m9ixE';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || 'nzinklyrqutvcdodhyaqyizcjflohlayxezuthan';

// Property interface matching Vault RE structure
export interface Property {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  price: string;
  priceDisplay?: string;
  leasePrice?: string;
  leasePriceDisplay?: string;
  listingType?: 'sale' | 'lease' | 'both';
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  buildingSize?: number;
  propertyType: string;
  status: string;
  saleMethod?: 'auction' | 'private' | 'tender' | 'eoi';
  availableDate?: string;
  leaseTerm?: string;
  bond?: string;
  description: string;
  features: string[];
  images: PropertyImage[];
  agent: Agent;
  inspectionTimes?: InspectionTime[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
  // Vault RE specific fields
  addressParts?: {
    streetNumber: string;
    streetName: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  priceDetails?: {
    display: string;
    value: number;
    priceFrom: number;
    priceTo: number;
  };
}

export interface PropertyImage {
  id: string;
  url: string;
  caption?: string;
  order: number;
  type: 'photo' | 'floorplan' | 'video';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  mobile?: string;
  photo?: string;
  position?: string;
}

export interface InspectionTime {
  id: string;
  startTime: string;
  endTime: string;
  type: 'private' | 'public';
}

// API response types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error handling
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Base fetch wrapper with Vault RE authentication
async function fetchFromCRM<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // VaultRE requires both API Key and Access Token
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`, // Access Token for client access
    'X-Api-Key': API_KEY, // API Key for integrator identification
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const url = `${API_BASE_URL}${endpoint}`;
  console.log('Fetching from CRM:', url);
  console.log('Using API Key:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'No API key!');
  
  try {
    const response = await fetch(url, config);
    
    // Log response details for debugging
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    let data;
    
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error(`Invalid JSON response from API: ${responseText.substring(0, 200)}`);
    }
    
    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new ApiError(
        response.status,
        data.message || data.error || `API Error: ${response.status} ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Network error: ${errorMessage}`);
  }
}

// Property API methods for Vault RE
export const propertyAPI = {
  // Get all properties with optional filters
  async getProperties(filters?: {
    suburb?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Property[]>> {
    const params = new URLSearchParams();
    
    // Vault RE specific parameters
    if (filters) {
      if (filters.suburb) params.append('suburb', filters.suburb);
      if (filters.minPrice) params.append('price_min', filters.minPrice.toString());
      if (filters.maxPrice) params.append('price_max', filters.maxPrice.toString());
      if (filters.bedrooms) params.append('bedrooms_min', filters.bedrooms.toString());
      if (filters.bathrooms) params.append('bathrooms_min', filters.bathrooms.toString());
      if (filters.propertyType) params.append('property_type', filters.propertyType);
      // Use the status as-is based on documentation
      if (filters.status) {
        params.append('listing_status', filters.status);
      }
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('per_page', filters.limit.toString());
    }

    // VaultRE uses specific endpoints based on property type
    // Add published=true to get only active listings
    params.append('published', 'true');
    
    // Try residential properties first (most common)
    let response;
    try {
      response = await fetchFromCRM<any>(`/properties/residential/sale?${params.toString()}`);
      console.log('Raw Vault RE response (residential/sale):', response);
    } catch (error) {
      console.log('Residential/sale endpoint failed, trying general properties endpoint');
      response = await fetchFromCRM<any>(`/properties?${params.toString()}`);
      console.log('Raw Vault RE response (properties):', response);
    }
    
    // VaultRE API returns data in 'items' array
    const properties = response.items || response.data || response.properties || response.results || response;
    
    if (Array.isArray(properties)) {
      return {
        success: true,
        data: properties.map(transformVaultREProperty),
        pagination: response.pagination
      };
    } else if (properties && typeof properties === 'object') {
      // If response is wrapped in an object
      const propertyList = properties.data || properties.listings || properties.items || [];
      return {
        success: true,
        data: Array.isArray(propertyList) ? propertyList.map(transformVaultREProperty) : [],
        pagination: response.pagination
      };
    }
    
    return response;
  },

  // Get single property by ID
  async getPropertyById(id: string): Promise<ApiResponse<Property>> {
    // Use our API route to avoid CORS issues
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch(`/api/properties/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch property');
        }
        
        return {
          success: true,
          data: transformVaultREProperty(data.data)
        };
      } catch (error) {
        console.error('Error fetching property:', error);
        throw error;
      }
    }
    
    // Server-side: try to fetch directly from VaultRE
    const response = await fetchFromCRM<any>(`/properties/${id}`);
    
    if (response.data) {
      return {
        success: true,
        data: transformVaultREProperty(response.data)
      };
    }
    
    return response;
  },

  // Search properties by keyword
  async searchProperties(query: string): Promise<ApiResponse<Property[]>> {
    return fetchFromCRM<ApiResponse<Property[]>>(
      `/listings?search=${encodeURIComponent(query)}`
    );
  },

  // Get properties for sale
  async getPropertiesForSale(filters?: any): Promise<ApiResponse<Property[]>> {
    // Use our API route to avoid CORS issues
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.append('type', 'sale');
      params.append('limit', filters?.limit?.toString() || '20');
      
      try {
        const response = await fetch(`/api/properties?${params.toString()}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }
        
        return {
          success: true,
          data: Array.isArray(data.data) ? data.data.map(transformVaultREProperty) : [],
          pagination: {
            total: data.total || 0,
            page: 1,
            limit: parseInt(params.get('limit') || '20'),
            totalPages: Math.ceil((data.total || 0) / parseInt(params.get('limit') || '20'))
          }
        };
      } catch (error) {
        console.error('Error fetching sale properties:', error);
        throw error;
      }
    }
    
    // Server-side: call VaultRE directly
    const params = new URLSearchParams();
    params.append('published', 'true');
    params.append('limit', filters?.limit?.toString() || '20');
    
    const response = await fetchFromCRM<any>(`/properties/residential/sale?${params.toString()}`);
    const properties = response.items || response.data || [];
    
    return {
      success: true,
      data: Array.isArray(properties) ? properties.map(transformVaultREProperty) : [],
      pagination: response.pagination
    };
  },

  // Get properties for lease
  async getPropertiesForLease(filters?: any): Promise<ApiResponse<Property[]>> {
    // Use our API route to avoid CORS issues
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      params.append('type', 'lease');
      params.append('limit', filters?.limit?.toString() || '20');
      
      try {
        const response = await fetch(`/api/properties?${params.toString()}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }
        
        return {
          success: true,
          data: Array.isArray(data.data) ? data.data.map(transformVaultREProperty) : [],
          pagination: {
            total: data.total || 0,
            page: 1,
            limit: parseInt(params.get('limit') || '20'),
            totalPages: Math.ceil((data.total || 0) / parseInt(params.get('limit') || '20'))
          }
        };
      } catch (error) {
        console.error('Error fetching lease properties:', error);
        throw error;
      }
    }
    
    // Server-side: call VaultRE directly
    const params = new URLSearchParams();
    params.append('published', 'true');
    params.append('limit', filters?.limit?.toString() || '20');
    
    const response = await fetchFromCRM<any>(`/properties/residential/lease?${params.toString()}`);
    const properties = response.items || response.data || [];
    
    return {
      success: true,
      data: Array.isArray(properties) ? properties.map(transformVaultREProperty) : [],
      pagination: response.pagination
    };
  },

  // Get featured properties
  async getFeaturedProperties(): Promise<ApiResponse<Property[]>> {
    try {
      // Get a mix of sale and lease properties
      const [saleResponse, leaseResponse] = await Promise.all([
        this.getPropertiesForSale({ limit: 6 }),
        this.getPropertiesForLease({ limit: 6 })
      ]);
      
      const allProperties = [...(saleResponse.data || []), ...(leaseResponse.data || [])];
      console.log('Featured properties combined:', allProperties.length);
      
      return {
        success: true,
        data: allProperties.slice(0, 12), // Limit to 12 properties
        pagination: {
          total: allProperties.length,
          page: 1,
          limit: 12,
          totalPages: Math.ceil(allProperties.length / 12)
        }
      };
    } catch (error) {
      console.error('Error fetching featured properties:', error);
      // If featured endpoint fails, try getting all active listings
      try {
        const fallbackResponse = await this.getProperties({ limit: 12, status: 'active' });
        return fallbackResponse;
      } catch (fallbackError) {
        throw error;
      }
    }
  },

  // Get properties by agent
  async getPropertiesByAgent(agentId: string): Promise<ApiResponse<Property[]>> {
    return fetchFromCRM<ApiResponse<Property[]>>(
      `/agents/${agentId}/properties`
    );
  },

  // Submit property inquiry
  async submitInquiry(data: {
    propertyId: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<ApiResponse<{ success: boolean; inquiryId: string }>> {
    return fetchFromCRM<ApiResponse<{ success: boolean; inquiryId: string }>>(
      '/enquiries',
      {
        method: 'POST',
        body: JSON.stringify({
          listing_id: data.propertyId,
          name: data.name,
          email: data.email,
          mobile: data.phone,
          message: data.message,
        }),
      }
    );
  },

  // Book inspection
  async bookInspection(data: {
    propertyId: string;
    inspectionTimeId?: string;
    name: string;
    email: string;
    phone: string;
    preferredDate?: string;
    notes?: string;
  }): Promise<ApiResponse<{ success: boolean; bookingId: string }>> {
    return fetchFromCRM<ApiResponse<{ success: boolean; bookingId: string }>>(
      '/inspections/book',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  },
};

// Suburb API methods
export const suburbAPI = {
  // Get all suburbs
  async getSuburbs(): Promise<ApiResponse<string[]>> {
    return fetchFromCRM<ApiResponse<string[]>>('/suburbs');
  },

  // Get suburb details with statistics
  async getSuburbDetails(suburb: string): Promise<ApiResponse<{
    name: string;
    postcode: string;
    state: string;
    medianPrice: number;
    propertyCount: number;
    demographics?: any;
  }>> {
    return fetchFromCRM<ApiResponse<any>>(
      `/suburbs/${encodeURIComponent(suburb)}`
    );
  },
};

// Agent API methods
export const agentAPI = {
  // Get all agents
  async getAgents(): Promise<ApiResponse<Agent[]>> {
    return fetchFromCRM<ApiResponse<Agent[]>>('/agents');
  },

  // Get agent by ID
  async getAgentById(id: string): Promise<ApiResponse<Agent>> {
    return fetchFromCRM<ApiResponse<Agent>>(`/agents/${id}`);
  },
};

// Export all APIs
export const crmAPI = {
  properties: propertyAPI,
  suburbs: suburbAPI,
  agents: agentAPI,
};

// Utility function to format price display
export function formatPrice(price: string | number): string {
  if (typeof price === 'string' && price.includes('-')) {
    return price; // Already formatted as range
  }
  
  const numPrice = typeof price === 'string' ? parseInt(price) : price;
  if (isNaN(numPrice)) return price.toString();
  
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(numPrice);
}

// Transform Vault RE response to our Property interface
export function transformVaultREProperty(vaultProperty: any): Property {
  // Handle the actual Vault RE response structure
  const address = vaultProperty.address || {};
  const suburb = address.suburb || {};
  const state = address.state || suburb.state || {};
  
  // Build the full address string
  const addressString = vaultProperty.displayAddress || 
                       `${address.streetNumber || ''} ${address.street || ''}`.trim() ||
                       'Address Available Upon Request';
  
  return {
    id: vaultProperty.id?.toString() || '',
    address: addressString,
    suburb: suburb.name || vaultProperty.suburb || '',
    state: state.abbreviation || state.name || 'VIC',
    postcode: suburb.postcode || vaultProperty.postcode || '',
    price: vaultProperty.searchPrice?.toString() || vaultProperty.priceFrom?.toString() || '0',
    priceDisplay: vaultProperty.displayPrice || 
                  vaultProperty.priceDisplay ||
                  (vaultProperty.priceFrom && vaultProperty.priceTo ? 
                    `${formatPrice(vaultProperty.priceFrom)} - ${formatPrice(vaultProperty.priceTo)}` :
                    'Contact Agent'),
    leasePrice: vaultProperty.commercialLeasePrice?.toString() || '',
    leasePriceDisplay: vaultProperty.commercialLeasePrice ? 
                       `${formatPrice(vaultProperty.commercialLeasePrice)} per week` : '',
    listingType: vaultProperty.commercialListingType || 'sale',
    bedrooms: vaultProperty.bed || 0,
    bathrooms: vaultProperty.bath || 0,
    carSpaces: (vaultProperty.garages || 0) + (vaultProperty.carports || 0) + (vaultProperty.openSpaces || 0),
    landSize: vaultProperty.landArea?.value,
    buildingSize: vaultProperty.floorArea?.value,
    propertyType: vaultProperty.type?.name || 'House',
    status: vaultProperty.status || 'active',
    saleMethod: vaultProperty.methodOfSale?.name,
    availableDate: vaultProperty.availableDate,
    leaseTerm: vaultProperty.leaseTerm,
    bond: vaultProperty.bond,
    description: vaultProperty.description || vaultProperty.heading || '',
    features: Array.isArray(vaultProperty.features) ? vaultProperty.features : [],
    images: (vaultProperty.photos || []).map((img: any, index: number) => ({
      id: img.id || `img-${index}`,
      url: img.url || img.original || '',
      caption: img.caption || '',
      order: img.order !== undefined ? img.order : index,
      type: 'photo' as const
    })),
    agent: vaultProperty.contactStaff && vaultProperty.contactStaff[0] ? {
      id: vaultProperty.contactStaff[0].id?.toString() || '',
      name: `${vaultProperty.contactStaff[0].firstName} ${vaultProperty.contactStaff[0].lastName}`.trim(),
      email: vaultProperty.contactStaff[0].email || '',
      phone: vaultProperty.contactStaff[0].phoneNumbers?.[0]?.number || '',
      mobile: vaultProperty.contactStaff[0].phoneNumbers?.find((p: any) => p.type === 'Mobile')?.number
    } : {
      id: '',
      name: 'Grant\'s Estate Agents',
      email: 'info@grantsea.com.au',
      phone: '03 9707 5555'
    },
    inspectionTimes: (vaultProperty.inspection_times || []).map((inspection: any) => ({
      id: inspection.id,
      startTime: inspection.start || inspection.startTime,
      endTime: inspection.end || inspection.endTime,
      type: inspection.type || 'public'
    })),
    coordinates: vaultProperty.coordinates || vaultProperty.geo,
    createdAt: vaultProperty.created_at || new Date().toISOString(),
    updatedAt: vaultProperty.updated_at || new Date().toISOString()
  };
}