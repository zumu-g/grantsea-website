// Vault RE API Service
// This service handles all API calls to Vault RE CRM system

// VaultRE API v1.3 - Updated endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';

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
  // Vault RE may use API key in different formats
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'X-API-Key': API_KEY, // Alternative header
    'Api-Key': API_KEY,   // Another alternative
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  console.log('Fetching from CRM:', `${API_BASE_URL}${endpoint}`);
  console.log('Using API Key:', API_KEY ? 'Key is set' : 'No API key!');
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
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
      // Map 'active' to 'current' for Vault RE
      if (filters.status) {
        const vaultStatus = filters.status === 'active' ? 'current' : filters.status;
        params.append('listing_status', vaultStatus);
      }
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('per_page', filters.limit.toString());
    }

    // VaultRE uses specific endpoints based on property type
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
    
    // Transform Vault RE response - handle different response formats
    const properties = response.data || response.properties || response.results || response;
    
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

  // Get featured properties
  async getFeaturedProperties(): Promise<ApiResponse<Property[]>> {
    return fetchFromCRM<ApiResponse<Property[]>>('/listings?featured=true');
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
  // Handle different possible response structures from Vault RE
  const address = vaultProperty.address || vaultProperty.addressParts || {};
  
  return {
    id: vaultProperty.id || vaultProperty.listing_id,
    address: vaultProperty.display_address || 
             `${address.street_number || ''} ${address.street_name || ''}`.trim() ||
             vaultProperty.address,
    suburb: address.suburb || vaultProperty.suburb,
    state: address.state || vaultProperty.state || 'VIC',
    postcode: address.postcode || vaultProperty.postcode,
    price: vaultProperty.price?.value?.toString() || vaultProperty.price || '0',
    priceDisplay: vaultProperty.price?.display || 
                  vaultProperty.price_display ||
                  vaultProperty.display_price ||
                  formatPrice(vaultProperty.price?.value || vaultProperty.price || 0),
    leasePrice: vaultProperty.lease_price?.value?.toString() || vaultProperty.lease_price || '',
    leasePriceDisplay: vaultProperty.lease_price?.display || 
                       vaultProperty.lease_price_display ||
                       (vaultProperty.lease_price ? `$${vaultProperty.lease_price} per week` : ''),
    listingType: vaultProperty.listing_type || 
                 (vaultProperty.lease_price ? 'lease' : 'sale'),
    bedrooms: vaultProperty.bedrooms || 0,
    bathrooms: vaultProperty.bathrooms || 0,
    carSpaces: vaultProperty.car_spaces || vaultProperty.garages || 0,
    landSize: vaultProperty.land_area || vaultProperty.land_size,
    buildingSize: vaultProperty.building_area || vaultProperty.building_size,
    propertyType: vaultProperty.property_type || vaultProperty.propertyType || 'House',
    status: vaultProperty.status || vaultProperty.listing_status || 'active',
    saleMethod: vaultProperty.sale_method || vaultProperty.saleMethod,
    availableDate: vaultProperty.available_date || vaultProperty.availableDate,
    leaseTerm: vaultProperty.lease_term || vaultProperty.leaseTerm,
    bond: vaultProperty.bond,
    description: vaultProperty.description || '',
    features: vaultProperty.features || [],
    images: (vaultProperty.images || []).map((img: any) => ({
      id: img.id,
      url: img.url || img.image_url,
      caption: img.caption || img.description,
      order: img.order || img.sort_order || 0,
      type: 'photo' as const
    })),
    agent: {
      id: vaultProperty.agent?.id || '',
      name: vaultProperty.agent?.name || '',
      email: vaultProperty.agent?.email || '',
      phone: vaultProperty.agent?.phone || '',
      mobile: vaultProperty.agent?.mobile || ''
    },
    inspectionTimes: vaultProperty.inspection_times || [],
    coordinates: vaultProperty.coordinates || vaultProperty.location,
    createdAt: vaultProperty.created_at || vaultProperty.createdAt || new Date().toISOString(),
    updatedAt: vaultProperty.updated_at || vaultProperty.updatedAt || new Date().toISOString()
  };
}