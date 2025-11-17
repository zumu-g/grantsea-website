// Service to fetch and manage upcoming auctions from VaultRE API
// Based on openHomes.ts but adapted for auction functionality

const API_BASE_URL = process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export interface AuctionDetails {
  id: string;
  propertyId: string;
  auctionDate: string;
  auctionTime: string;
  auctionVenue?: string;
  auctionTerms?: string;
  registrationRequired?: boolean;
  bidderRegistrationUrl?: string;
  auctioneer?: string;
  guide?: string;
  reserve?: string;
  status: 'upcoming' | 'live' | 'passed_in' | 'sold' | 'withdrawn';
  streamUrl?: string;
  isStreamingEnabled?: boolean;
  property?: any;
}

export interface LiveAuction extends AuctionDetails {
  status: 'live';
  streamUrl: string;
  currentBid?: number;
  bidderCount?: number;
  timeRemaining?: number;
}

export async function fetchUpcomingAuctions(days: number = 30): Promise<Map<string, AuctionDetails[]>> {
  try {
    const response = await fetch(`/api/auctions?days=${days}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch auctions:', response.status);
      return new Map();
    }
    
    const data = await response.json();
    const auctions = data.data || [];
    
    // Group auctions by property ID
    const auctionsByProperty = new Map<string, AuctionDetails[]>();
    
    auctions.forEach((auction: any) => {
      const propertyId = auction.propertyId;
      if (!propertyId) return;
      
      const auctionDetails: AuctionDetails = {
        id: auction.id,
        propertyId: auction.propertyId,
        auctionDate: auction.auctionDate,
        auctionTime: auction.auctionTime || '10:00 AM',
        auctionVenue: auction.auctionVenue,
        auctionTerms: auction.auctionTerms,
        registrationRequired: auction.registrationRequired ?? true,
        bidderRegistrationUrl: auction.bidderRegistrationUrl,
        auctioneer: auction.auctioneer,
        guide: auction.guide,
        reserve: auction.reserve,
        status: auction.status || 'upcoming',
        streamUrl: auction.streamUrl,
        isStreamingEnabled: auction.isStreamingEnabled ?? false
      };
      
      if (!auctionsByProperty.has(propertyId)) {
        auctionsByProperty.set(propertyId, []);
      }
      
      auctionsByProperty.get(propertyId)!.push(auctionDetails);
    });
    
    return auctionsByProperty;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return new Map();
  }
}

export async function fetchPropertyAuctions(propertyId: string): Promise<AuctionDetails[]> {
  try {
    const response = await fetch(`/api/auctions?propertyId=${propertyId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch property auctions:', response.status);
      return [];
    }
    
    const data = await response.json();
    const auctions = data.data || [];
    
    return auctions.map((auction: any) => ({
      id: auction.id,
      propertyId: auction.propertyId,
      auctionDate: auction.auctionDate,
      auctionTime: auction.auctionTime || '10:00 AM',
      auctionVenue: auction.auctionVenue,
      auctionTerms: auction.auctionTerms,
      registrationRequired: auction.registrationRequired ?? true,
      bidderRegistrationUrl: auction.bidderRegistrationUrl,
      auctioneer: auction.auctioneer,
      guide: auction.guide,
      reserve: auction.reserve,
      status: auction.status || 'upcoming',
      streamUrl: auction.streamUrl,
      isStreamingEnabled: auction.isStreamingEnabled ?? false
    }));
  } catch (error) {
    console.error('Error fetching property auctions:', error);
    return [];
  }
}

export async function fetchLiveAuctions(): Promise<LiveAuction[]> {
  try {
    const response = await fetch('/api/auctions?status=live', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch live auctions:', response.status);
      return [];
    }
    
    const data = await response.json();
    const liveAuctions = data.data || [];
    
    return liveAuctions
      .filter((auction: any) => auction.status === 'live' && auction.streamUrl)
      .map((auction: any) => ({
        id: auction.id,
        propertyId: auction.propertyId,
        auctionDate: auction.auctionDate,
        auctionTime: auction.auctionTime || '10:00 AM',
        auctionVenue: auction.auctionVenue,
        auctionTerms: auction.auctionTerms,
        registrationRequired: auction.registrationRequired ?? true,
        bidderRegistrationUrl: auction.bidderRegistrationUrl,
        auctioneer: auction.auctioneer,
        guide: auction.guide,
        reserve: auction.reserve,
        status: 'live' as const,
        streamUrl: auction.streamUrl,
        isStreamingEnabled: true,
        currentBid: auction.currentBid,
        bidderCount: auction.bidderCount,
        timeRemaining: auction.timeRemaining
      }));
  } catch (error) {
    console.error('Error fetching live auctions:', error);
    return [];
  }
}

// Helper function to check if an auction is happening today
export function isAuctionToday(auctionDate: string): boolean {
  const today = new Date();
  const auction = new Date(auctionDate);
  
  return (
    auction.getDate() === today.getDate() &&
    auction.getMonth() === today.getMonth() &&
    auction.getFullYear() === today.getFullYear()
  );
}

// Helper function to check if an auction is happening this week
export function isAuctionThisWeek(auctionDate: string): boolean {
  const today = new Date();
  const auction = new Date(auctionDate);
  const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return auction >= today && auction <= oneWeekFromNow;
}

// Helper function to get time until auction starts
export function getTimeUntilAuction(auctionDate: string, auctionTime: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
} {
  const now = new Date();
  const auctionDateTime = new Date(`${auctionDate} ${auctionTime}`);
  const diff = auctionDateTime.getTime() - now.getTime();
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalMilliseconds: 0 };
  }
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, totalMilliseconds: diff };
}