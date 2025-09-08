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
    const response = await fetchFromCRM<any>(`/listings/${id}`);
    
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
    const params = new URLSearchParams();
    params.append('published', 'true');
    params.append('limit', filters?.limit?.toString() || '20');
    
    if (filters?.suburb) params.append('suburb', filters.suburb);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    
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
    const params = new URLSearchParams();
    params.append('published', 'true');
    params.append('limit', filters?.limit?.toString() || '20');
    
    if (filters?.suburb) params.append('suburb', filters.suburb);
    if (filters?.minPrice) params.append('minRent', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxRent', filters.maxPrice.toString());
    
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
  // Handle the documented Vault RE structure
  const address = vaultProperty.address || {};
  const price = vaultProperty.price || {};
  
  // Build the full address string
  const addressString = vaultProperty.display_address || 
                       `${address.street_number || ''} ${address.street_name || ''}`.trim() ||
                       vaultProperty.address_display ||
                       'Address Available Upon Request';
  
  return {
    id: vaultProperty.id || vaultProperty.listing_id || '',
    address: addressString,
    suburb: address.suburb || vaultProperty.suburb || '',
    state: address.state || vaultProperty.state || 'VIC',
    postcode: address.postcode || vaultProperty.postcode || '',
    price: price.value?.toString() || vaultProperty.price_value || '0',
    priceDisplay: price.display || 
                  vaultProperty.price_display ||
                  (price.price_from && price.price_to ? 
                    `${formatPrice(price.price_from)} - ${formatPrice(price.price_to)}` :
                    formatPrice(price.value || 0)),
    leasePrice: vaultProperty.lease_price?.value?.toString() || '',
    leasePriceDisplay: vaultProperty.lease_price?.display || '',
    listingType: vaultProperty.listing_type || 'sale',
    bedrooms: vaultProperty.bedrooms || 0,
    bathrooms: vaultProperty.bathrooms || 0,
    carSpaces: vaultProperty.car_spaces || 0,
    landSize: vaultProperty.land_area,
    buildingSize: vaultProperty.building_area,
    propertyType: vaultProperty.property_type || 'House',
    status: vaultProperty.status || vaultProperty.listing_status || 'active',
    saleMethod: vaultProperty.sale_method,
    availableDate: vaultProperty.available_date,
    leaseTerm: vaultProperty.lease_term,
    bond: vaultProperty.bond,
    description: vaultProperty.description || '',
    features: Array.isArray(vaultProperty.features) ? vaultProperty.features : [],
    images: (vaultProperty.images || []).map((img: any, index: number) => ({
      id: img.id || `img-${index}`,
      url: img.url || '',
      caption: img.caption || '',
      order: img.order !== undefined ? img.order : index,
      type: 'photo' as const
    })),
    agent: vaultProperty.agent ? {
      id: vaultProperty.agent.id || '',
      name: vaultProperty.agent.name || '',
      email: vaultProperty.agent.email || '',
      phone: vaultProperty.agent.phone || '',
      mobile: vaultProperty.agent.mobile
    } : {
      id: '',
      name: 'Grant & Segal Estate Agents',
      email: 'info@grantsea.com',
      phone: '03 9702 4222'
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