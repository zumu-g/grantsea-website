import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const propertyId = searchParams.get('propertyId');
  const days = searchParams.get('days') || '30'; // Look ahead 30 days by default
  const status = searchParams.get('status'); // 'live', 'upcoming', etc.

  if (!API_KEY || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'API credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-Api-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    let auctions: any[] = [];

    if (status === 'live') {
      // Fetch live auctions with streaming
      const { fetchLiveAuctionsWithCache } = await import('@/services/auctionsCache');
      const liveAuctions = await fetchLiveAuctionsWithCache(API_BASE_URL, headers);
      
      auctions = liveAuctions.map((prop: any) => ({
        id: `auction-${prop.id}`,
        propertyId: prop.id?.toString(),
        auctionDate: prop.auctionDate,
        auctionTime: prop.auctionTime || '10:00 AM',
        auctionVenue: prop.auctionVenue,
        auctionTerms: prop.auctionTerms,
        registrationRequired: prop.registrationRequired ?? true,
        bidderRegistrationUrl: prop.bidderRegistrationUrl,
        auctioneer: prop.auctioneer,
        guide: prop.guide || prop.priceDisplay,
        reserve: prop.reserve,
        status: 'live',
        streamUrl: prop.auctionStreamUrl,
        isStreamingEnabled: true,
        currentBid: prop.currentBid,
        bidderCount: prop.bidderCount,
        timeRemaining: prop.timeRemaining,
        property: prop
      }));
    } else {
      // Use the caching service for efficient fetching of upcoming auctions
      const { fetchUpcomingAuctionsWithCache } = await import('@/services/auctionsCache');
      
      // Get all upcoming auctions efficiently
      const cachedAuctionsByProperty = await fetchUpcomingAuctionsWithCache(
        API_BASE_URL,
        headers
      );
      
      // Convert map to array format and fetch property details
      const propertyIds = Array.from(cachedAuctionsByProperty.keys());
      
      // Fetch property details for all properties with auctions
      const propertyDetailsMap = new Map();
      
      for (const propId of propertyIds) {
        try {
          const propertyResponse = await fetch(
            `${API_BASE_URL}/properties/${propId}`,
            { headers, cache: 'no-store' }
          );
          
          if (propertyResponse.ok) {
            const propertyData = await propertyResponse.json();
            // Transform the VaultRE property data using the standard transformer
            const { transformVaultREProperty } = await import('@/services/api');
            const transformedProperty = transformVaultREProperty(propertyData);
            propertyDetailsMap.set(propId, transformedProperty);
          }
        } catch (error) {
          console.error(`Failed to fetch property ${propId}:`, error);
        }
      }
      
      // Combine auction details with property details
      cachedAuctionsByProperty.forEach((auctionDetails, propId) => {
        const propertyDetails = propertyDetailsMap.get(propId);
        
        auctionDetails.forEach(auction => {
          auctions.push({
            ...auction,
            propertyId: propId,
            property: propertyDetails || { id: propId }
          });
        });
      });
    }

    // Filter by property ID if specified
    if (propertyId) {
      auctions = auctions.filter((auction: any) => {
        const auctionPropertyId = auction.property?.id?.toString() || auction.propertyId?.toString();
        return auctionPropertyId === propertyId.toString();
      });
    }

    // Sort by auction date/time (earliest first)
    auctions.sort((a: any, b: any) => {
      const dateA = new Date(`${a.auctionDate} ${a.auctionTime}`);
      const dateB = new Date(`${b.auctionDate} ${b.auctionTime}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Transform to our format with timezone conversion from UTC to local time
    const transformedAuctions = auctions.map((auction: any) => {
      // Convert auction date/time to proper timezone
      const auctionDateTime = new Date(`${auction.auctionDate} ${auction.auctionTime}`);
      
      return {
        id: auction.id,
        propertyId: auction.propertyId,
        auctionDate: auction.auctionDate,
        auctionTime: auction.auctionTime,
        auctionDateTime: auctionDateTime.toISOString(),
        auctionDateTimeLocal: auctionDateTime.toLocaleString('en-AU', { 
          timeZone: 'Australia/Melbourne',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        auctionVenue: auction.auctionVenue || 'On Site',
        auctionTerms: auction.auctionTerms,
        registrationRequired: auction.registrationRequired,
        bidderRegistrationUrl: auction.bidderRegistrationUrl,
        auctioneer: auction.auctioneer,
        guide: auction.guide,
        reserve: auction.reserve,
        status: auction.status,
        streamUrl: auction.streamUrl,
        isStreamingEnabled: auction.isStreamingEnabled,
        currentBid: auction.currentBid,
        bidderCount: auction.bidderCount,
        timeRemaining: auction.timeRemaining,
        property: auction.property
      };
    });

    console.log(`Found ${transformedAuctions.length} ${status || 'upcoming'} auctions from VaultRE API`);

    return NextResponse.json({
      success: true,
      data: transformedAuctions,
      total: transformedAuctions.length,
      status: status || 'upcoming'
    });

  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch auctions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}