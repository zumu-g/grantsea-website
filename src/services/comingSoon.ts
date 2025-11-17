// Service to fetch and manage "Coming Soon" properties from VaultRE API
// Based on auctions.ts and openHomes.ts patterns

const API_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export interface ComingSoonProperty {
  id: string;
  propertyId: string;
  title: string;
  address: string;
  description: string;
  availableDate?: string;
  estimatedLaunchDate?: string;
  listingDate: string;
  status: 'just_listed' | 'coming_soon' | 'pre_launch' | 'available_soon';
  notifyWhenAvailable?: boolean;
  preRegistrationEnabled?: boolean;
  agentContact?: {
    name: string;
    email: string;
    phone: string;
  };
  property?: any;
}

export async function fetchComingSoonProperties(): Promise<Map<string, ComingSoonProperty[]>> {
  try {
    const response = await fetch('/api/coming-soon', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch coming soon properties:', response.status);
      return new Map();
    }
    
    const data = await response.json();
    const properties = data.data || [];
    
    // Group properties by property ID (though for coming soon, it's usually 1:1)
    const propertiesByID = new Map<string, ComingSoonProperty[]>();
    
    properties.forEach((prop: any) => {
      const propertyId = prop.propertyId || prop.id;
      if (!propertyId) return;
      
      const comingSoonData: ComingSoonProperty = {
        id: prop.id,
        propertyId: propertyId,
        title: prop.title || prop.property?.title || '',
        address: prop.address || prop.property?.address?.display || '',
        description: prop.description || prop.property?.description || '',
        availableDate: prop.availableDate,
        estimatedLaunchDate: prop.estimatedLaunchDate,
        listingDate: prop.listingDate || prop.property?.createdAt || new Date().toISOString(),
        status: prop.status || determinePropertyStatus(prop),
        notifyWhenAvailable: prop.notifyWhenAvailable ?? true,
        preRegistrationEnabled: prop.preRegistrationEnabled ?? true,
        agentContact: prop.agentContact || prop.property?.agent,
        property: prop.property
      };
      
      if (!propertiesByID.has(propertyId)) {
        propertiesByID.set(propertyId, []);
      }
      
      propertiesByID.get(propertyId)!.push(comingSoonData);
    });
    
    return propertiesByID;
  } catch (error) {
    console.error('Error fetching coming soon properties:', error);
    return new Map();
  }
}

export async function fetchPropertyComingSoon(propertyId: string): Promise<ComingSoonProperty[]> {
  try {
    const response = await fetch(`/api/coming-soon?propertyId=${propertyId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch property coming soon data:', response.status);
      return [];
    }
    
    const data = await response.json();
    const properties = data.data || [];
    
    return properties.map((prop: any) => ({
      id: prop.id,
      propertyId: prop.propertyId || prop.id,
      title: prop.title || prop.property?.title || '',
      address: prop.address || prop.property?.address?.display || '',
      description: prop.description || prop.property?.description || '',
      availableDate: prop.availableDate,
      estimatedLaunchDate: prop.estimatedLaunchDate,
      listingDate: prop.listingDate || prop.property?.createdAt || new Date().toISOString(),
      status: prop.status || determinePropertyStatus(prop),
      notifyWhenAvailable: prop.notifyWhenAvailable ?? true,
      preRegistrationEnabled: prop.preRegistrationEnabled ?? true,
      agentContact: prop.agentContact || prop.property?.agent,
      property: prop.property
    }));
  } catch (error) {
    console.error('Error fetching property coming soon data:', error);
    return [];
  }
}

// Helper function to determine property status based on data
function determinePropertyStatus(prop: any): ComingSoonProperty['status'] {
  const now = new Date();
  const listingDate = new Date(prop.listingDate || prop.property?.createdAt || now);
  const daysSinceListing = Math.floor((now.getTime() - listingDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if property title or address contains "Coming Soon"
  const title = (prop.title || prop.property?.title || '').toLowerCase();
  const address = (prop.address || prop.property?.address?.display || '').toLowerCase();
  const description = (prop.description || prop.property?.description || '').toLowerCase();
  
  const hasComingSoonKeywords = 
    title.includes('coming soon') || 
    address.includes('coming soon') ||
    description.includes('coming soon') ||
    title.includes('pre-launch') ||
    address.includes('pre-launch') ||
    description.includes('pre-launch');
  
  // If has available date in the future
  if (prop.availableDate) {
    const availableDate = new Date(prop.availableDate);
    if (availableDate > now) {
      return 'available_soon';
    }
  }
  
  // If explicitly marked as coming soon
  if (hasComingSoonKeywords) {
    return 'coming_soon';
  }
  
  // If listed very recently (within 3 days)
  if (daysSinceListing <= 3) {
    return 'just_listed';
  }
  
  // If has estimated launch date
  if (prop.estimatedLaunchDate) {
    return 'pre_launch';
  }
  
  return 'coming_soon';
}

// Helper function to check if a property is truly "coming soon"
export function isComingSoonProperty(property: any): boolean {
  if (!property) return false;
  
  const title = (property.title || '').toLowerCase();
  const address = (property.address?.display || property.address || '').toLowerCase();
  const description = (property.description || '').toLowerCase();
  const status = (property.status || '').toLowerCase();
  
  // Check for "Coming Soon" keywords in various fields
  const comingSoonKeywords = [
    'coming soon',
    'pre-launch',
    'launching soon',
    'available soon',
    'off the plan',
    'off-the-plan'
  ];
  
  return comingSoonKeywords.some(keyword => 
    title.includes(keyword) || 
    address.includes(keyword) || 
    description.includes(keyword) ||
    status.includes(keyword)
  );
}

// Helper function to check if property was listed recently
export function isRecentlyListed(listingDate: string, days: number = 7): boolean {
  try {
    const listed = new Date(listingDate);
    const now = new Date();
    const daysSince = Math.floor((now.getTime() - listed.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysSince <= days;
  } catch (error) {
    return false;
  }
}

// Helper function to get days since listing
export function getDaysSinceListing(listingDate: string): number {
  try {
    const listed = new Date(listingDate);
    const now = new Date();
    return Math.floor((now.getTime() - listed.getTime()) / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
}

// Helper function to get estimated availability timeline
export function getAvailabilityTimeline(availableDate?: string, estimatedLaunchDate?: string): {
  timeline: string;
  isAvailable: boolean;
  daysUntilAvailable: number;
} {
  const now = new Date();
  
  if (availableDate) {
    const available = new Date(availableDate);
    const daysUntil = Math.ceil((available.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 0) {
      return { timeline: 'Available now', isAvailable: true, daysUntilAvailable: 0 };
    } else if (daysUntil === 1) {
      return { timeline: 'Available tomorrow', isAvailable: false, daysUntilAvailable: 1 };
    } else if (daysUntil <= 7) {
      return { timeline: `Available in ${daysUntil} days`, isAvailable: false, daysUntilAvailable: daysUntil };
    } else if (daysUntil <= 30) {
      const weeks = Math.ceil(daysUntil / 7);
      return { timeline: `Available in ${weeks} week${weeks > 1 ? 's' : ''}`, isAvailable: false, daysUntilAvailable: daysUntil };
    } else {
      const months = Math.ceil(daysUntil / 30);
      return { timeline: `Available in ${months} month${months > 1 ? 's' : ''}`, isAvailable: false, daysUntilAvailable: daysUntil };
    }
  }
  
  if (estimatedLaunchDate) {
    const launch = new Date(estimatedLaunchDate);
    const daysUntil = Math.ceil((launch.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 0) {
      return { timeline: 'Launching soon', isAvailable: false, daysUntilAvailable: 0 };
    } else {
      return { timeline: `Estimated launch: ${launch.toLocaleDateString('en-AU')}`, isAvailable: false, daysUntilAvailable: daysUntil };
    }
  }
  
  return { timeline: 'Coming soon', isAvailable: false, daysUntilAvailable: -1 };
}

// Helper function to register interest in a coming soon property
export async function registerInterest(propertyId: string, contactInfo: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('/api/coming-soon/register-interest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        propertyId,
        ...contactInfo
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, message: 'Interest registered successfully' };
    } else {
      return { success: false, message: data.error || 'Failed to register interest' };
    }
  } catch (error) {
    console.error('Error registering interest:', error);
    return { success: false, message: 'Unable to register interest. Please try again.' };
  }
}