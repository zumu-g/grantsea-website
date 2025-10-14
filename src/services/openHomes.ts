// Service to fetch and manage open homes from VaultRE API
import { InspectionTime } from './api';

const API_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

interface OpenHome {
  id: string;
  propertyId: string;
  start: string;
  end: string;
  type?: string;
  notes?: string;
  property?: any;
}

export async function fetchUpcomingOpenHomes(days: number = 30): Promise<Map<string, InspectionTime[]>> {
  try {
    const response = await fetch(`/api/open-homes?days=${days}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch open homes:', response.status);
      return new Map();
    }
    
    const data = await response.json();
    const openHomes = data.data || [];
    
    // Group open homes by property ID
    const openHomesByProperty = new Map<string, InspectionTime[]>();
    
    openHomes.forEach((oh: any) => {
      const propertyId = oh.propertyId;
      if (!propertyId) return;
      
      const inspection: InspectionTime = {
        id: oh.id,
        startTime: oh.startTime,
        endTime: oh.endTime,
        type: (oh.type || 'public') as 'private' | 'public'
      };
      
      if (!openHomesByProperty.has(propertyId)) {
        openHomesByProperty.set(propertyId, []);
      }
      
      openHomesByProperty.get(propertyId)!.push(inspection);
    });
    
    return openHomesByProperty;
  } catch (error) {
    console.error('Error fetching open homes:', error);
    return new Map();
  }
}

export async function fetchPropertyOpenHomes(propertyId: string): Promise<InspectionTime[]> {
  try {
    const response = await fetch(`/api/open-homes?propertyId=${propertyId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch property open homes:', response.status);
      return [];
    }
    
    const data = await response.json();
    const openHomes = data.data || [];
    
    return openHomes.map((oh: any) => ({
      id: oh.id,
      startTime: oh.startTime,
      endTime: oh.endTime,
      type: (oh.type || 'public') as 'private' | 'public'
    }));
  } catch (error) {
    console.error('Error fetching property open homes:', error);
    return [];
  }
}