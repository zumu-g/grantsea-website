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
  statusDisplay?: string;
  saleMethod?: 'auction' | 'private' | 'tender' | 'eoi';
  auctionDate?: string;
  auctionVenue?: string;
  availableDate?: string;
  leaseTerm?: string;
  bond?: string;
  description: string;
  features: string[];
  images: PropertyImage[];
  floorPlans?: PropertyImage[];
  documents?: PropertyDocument[];
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

export interface PropertyDocument {
  id: string;
  name: string;
  url: string;
  type: 'soi' | 'section32' | 'brochure' | 'contract' | 'other';
  size?: number;
  format?: string;
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
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }

  // User-friendly error messages
  getUserMessage(): string {
    switch (this.status) {
      case 400:
        return 'The request was invalid. Please check your input and try again.';
      case 401:
        return 'Authentication failed. Please log in and try again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
      case 502:
      case 503:
        return 'Server error. Please try again later.';
      default:
        return this.message || 'An unexpected error occurred.';
    }
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

  try {
    const response = await fetch(url, config);

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      throw new ApiError(
        500,
        'Invalid JSON response from API',
        'PARSE_ERROR',
        { responseText: responseText.substring(0, 200) }
      );
    }

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.message || data.error || `API Error: ${response.status} ${response.statusText}`,
        data.code,
        data
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
    } catch (error) {
      response = await fetchFromCRM<any>(`/properties?${params.toString()}`);
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
        
        // Data is already transformed by the API route
        return {
          success: true,
          data: data.data
        };
      } catch (error) {
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
      if (filters?.suburb) {
        params.append('suburb', filters.suburb);
      }

      try {
        const response = await fetch(`/api/properties?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }

        // Data is already transformed by the API route, don't transform again
        return {
          success: true,
          data: Array.isArray(data.data) ? data.data : [],
          pagination: {
            total: data.total || 0,
            page: 1,
            limit: parseInt(params.get('limit') || '20'),
            totalPages: Math.ceil((data.total || 0) / parseInt(params.get('limit') || '20'))
          }
        };
      } catch (error) {
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
      if (filters?.suburb) {
        params.append('suburb', filters.suburb);
      }

      try {
        const response = await fetch(`/api/properties?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch properties');
        }

        // Data is already transformed by the API route, don't transform again
        return {
          success: true,
          data: Array.isArray(data.data) ? data.data : [],
          pagination: {
            total: data.total || 0,
            page: 1,
            limit: parseInt(params.get('limit') || '20'),
            totalPages: Math.ceil((data.total || 0) / parseInt(params.get('limit') || '20'))
          }
        };
      } catch (error) {
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
export function formatPrice(price: string | number | null | undefined): string {
  // Handle null/undefined cases
  if (price === null || price === undefined) {
    return 'Contact Agent';
  }

  // Handle string with range
  if (typeof price === 'string' && price.includes('-')) {
    return price; // Already formatted as range
  }

  // Handle empty string
  if (price === '') {
    return 'Contact Agent';
  }

  const numPrice = typeof price === 'string' ? parseInt(price) : price;

  // Handle NaN or 0
  if (isNaN(numPrice) || numPrice === 0) {
    return 'Contact Agent';
  }

  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(numPrice);
}

// Helper function to determine listing type from VaultRE property data
function determineListingType(vaultProperty: any): 'sale' | 'lease' | 'both' {
  // Check status field first
  if (vaultProperty.status === 'management' || vaultProperty.status === 'leased') {
    return 'lease';
  }

  // Check commercial listing type
  if (vaultProperty.commercialListingType) {
    return vaultProperty.commercialListingType as 'sale' | 'lease' | 'both';
  }

  // Check if property has rental price fields (without calling getRentalPrice)
  const hasRentalPrice = !!(
    vaultProperty.searchPrice ||
    vaultProperty.commercialLeasePrice ||
    vaultProperty.leasePrice ||
    vaultProperty.rent ||
    vaultProperty.weeklyRent ||
    vaultProperty.currentTenancy?.rent ||
    vaultProperty.leaseHistory?.[0]?.rent ||
    vaultProperty.leaseLife?.rent
  );

  // Check if property has sale price fields
  const hasSalePrice = !!(
    vaultProperty.priceFrom ||
    vaultProperty.priceTo ||
    (vaultProperty.searchPrice && vaultProperty.status !== 'management')
  );

  // For management status with searchPrice, it's a rental
  if (vaultProperty.status === 'management' && vaultProperty.searchPrice) {
    return 'lease';
  }

  // Determine based on available prices
  if (hasRentalPrice && !hasSalePrice) {
    return 'lease';
  } else if (hasSalePrice && !hasRentalPrice) {
    return 'sale';
  } else if (hasRentalPrice && hasSalePrice) {
    return 'both';
  }

  // Default to sale
  return 'sale';
}

// Helper function to extract rental price from VaultRE property data
function getRentalPrice(vaultProperty: any): string {
  // Check multiple possible rental price fields
  // searchPrice is used for rental properties in VaultRE API
  const rentalPriceFields = [
    vaultProperty.searchPrice,  // Main field for rental price (e.g., 600 for $600/week)
    vaultProperty.commercialLeasePrice,
    vaultProperty.leasePrice,
    vaultProperty.rent,
    vaultProperty.weeklyRent,
    vaultProperty.currentTenancy?.rent, // Current tenant's rent
    vaultProperty.leaseHistory?.[0]?.rent,
    vaultProperty.leaseLife?.rent
  ];

  for (const price of rentalPriceFields) {
    if (price !== null && price !== undefined && price !== '' && !isNaN(Number(price))) {
      return price.toString();
    }
  }

  return '';
}

// Helper function to get formatted rental price display
function getRentalPriceDisplay(vaultProperty: any): string {
  const rentalPrice = getRentalPrice(vaultProperty);
  
  if (!rentalPrice || rentalPrice === '0') {
    // Check if there's already a formatted display
    const displayFields = [
      vaultProperty.leasePriceDisplay,
      vaultProperty.rentDisplay,
      vaultProperty.leaseHistory?.[0]?.rentDisplay,
      vaultProperty.leaseLife?.rentDisplay
    ];
    
    for (const display of displayFields) {
      if (display && typeof display === 'string' && display.trim()) {
        return display;
      }
    }
    
    return 'Contact Agent';
  }
  
  const numPrice = parseInt(rentalPrice);
  if (isNaN(numPrice)) return 'Contact Agent';
  
  return `${formatPrice(numPrice)} per week`;
}

// Extract features from description text (VaultRE stores features in description)
function extractFeaturesFromDescription(description: string): string[] {
  if (!description) return [];

  const features: string[] = [];
  const lines = description.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    // Look for bullet points or feature markers
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const feature = trimmed.substring(1).trim();
      if (feature && feature.length > 3 && feature.length < 100) {
        features.push(feature);
      }
    }
    // Also look for key feature phrases
    else if (trimmed.match(/^(kitchen|bedroom|bathroom|living|garage|pool|outdoor|heating|cooling)/i)) {
      if (trimmed.length < 100) {
        features.push(trimmed);
      }
    }
  }

  return features.slice(0, 12); // Limit to 12 features
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
    leasePrice: getRentalPrice(vaultProperty),
    leasePriceDisplay: getRentalPriceDisplay(vaultProperty),
    listingType: determineListingType(vaultProperty),
    bedrooms: vaultProperty.bed || 0,
    bathrooms: vaultProperty.bath || 0,
    carSpaces: (vaultProperty.garages || 0) + (vaultProperty.carports || 0) + (vaultProperty.openSpaces || 0),
    landSize: vaultProperty.landArea?.value,
    buildingSize: vaultProperty.floorArea?.value,
    propertyType: vaultProperty.type?.name || 'House',
    status: vaultProperty.status || vaultProperty.portalStatus || 'active',
    statusDisplay: vaultProperty.status === 'unconditional' ? 'Under Contract' :
                   vaultProperty.status === 'listing' ? 'Available' :
                   vaultProperty.status === 'management' ? 'Leased' :
                   vaultProperty.status || 'active',
    saleMethod: vaultProperty.methodOfSale?.name,
    auctionDate: vaultProperty.auctionDetails?.dateTime,
    auctionVenue: vaultProperty.auctionDetails?.venue,
    availableDate: vaultProperty.availableDate,
    leaseTerm: vaultProperty.leaseTerm,
    bond: vaultProperty.bond,
    description: vaultProperty.description || vaultProperty.heading || '',
    features: extractFeaturesFromDescription(vaultProperty.description || vaultProperty.heading || ''),
    images: (vaultProperty.photos || vaultProperty.images || vaultProperty.media || [])
      .filter((img: any) => img.type?.toLowerCase() !== 'floorplan')
      .map((img: any, index: number) => ({
        id: img.id || `img-${index}`,
        url: img.url || img.original || img.fullUrl || img.large || '',
        caption: img.caption || img.description || '',
        order: img.order !== undefined ? img.order : index,
        type: 'photo' as const
      })),
    floorPlans: (vaultProperty.photos || vaultProperty.images || vaultProperty.media || [])
      .filter((img: any) => img.type?.toLowerCase() === 'floorplan')
      .map((img: any, index: number) => ({
        id: img.id || `floorplan-${index}`,
        url: img.url || img.original || img.fullUrl || img.large || '',
        caption: img.caption || img.description || 'Floor Plan',
        order: img.order !== undefined ? img.order : index,
        type: 'floorplan' as const
      })),
    documents: [
      // Statement of Information (SOI) - similar to Section 32 in Victoria
      ...(vaultProperty.soiUrl ? [{
        id: 'soi',
        name: 'Statement of Information',
        url: vaultProperty.soiUrl,
        type: 'soi' as const,
        format: 'pdf'
      }] : []),
      // eTable URL (property brochure)
      ...(vaultProperty.eTableUrl ? [{
        id: 'brochure',
        name: 'Property Brochure',
        url: vaultProperty.eTableUrl,
        type: 'brochure' as const,
        format: 'pdf'
      }] : []),
    ],
    agent: vaultProperty.contactStaff && vaultProperty.contactStaff[0] ? {
      id: vaultProperty.contactStaff[0].id?.toString() || '',
      name: `${vaultProperty.contactStaff[0].firstName} ${vaultProperty.contactStaff[0].lastName}`.trim(),
      email: vaultProperty.contactStaff[0].email || '',
      phone: vaultProperty.contactStaff[0].phoneNumbers?.[0]?.number || '',
      mobile: vaultProperty.contactStaff[0].phoneNumbers?.find((p: any) => p.type === 'Mobile')?.number,
      photo: vaultProperty.contactStaff[0].photo?.url ||
             vaultProperty.contactStaff[0].profilePhoto?.url ||
             vaultProperty.contactStaff[0].avatar?.url ||
             vaultProperty.contactStaff[0].image?.url ||
             '/images/default-agent.jpg'
    } : {
      id: '',
      name: 'Grant\'s Estate Agents',
      email: 'info@grantsea.com.au',
      phone: '03 9707 5555',
      photo: '/images/default-agent.jpg'
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