import { NextRequest, NextResponse } from 'next/server';

// This endpoint searches for properties from other agencies using web scraping
// It helps show a complete market view including competitors' listings

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const street = searchParams.get('street');
  const suburb = searchParams.get('suburb');
  const listingType = searchParams.get('type') || 'lease';
  const excludeId = searchParams.get('excludeId');

  if (!street || !suburb) {
    return NextResponse.json(
      { error: 'Street and suburb are required' },
      { status: 400 }
    );
  }

  try {
    // For now, return mock data to demonstrate the feature
    // In production, this would integrate with Firecrawl API or similar service
    const mockProperties = [
      {
        id: 'ext-1',
        address: `${street}, ${suburb} VIC`,
        suburb: suburb,
        price: listingType === 'lease' ? '650' : '950000',
        priceDisplay: listingType === 'lease' ? '$650 per week' : '$950,000',
        listingType: listingType,
        bedrooms: 3,
        bathrooms: 2,
        carSpaces: 2,
        propertyType: 'House',
        images: [{ url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop' }],
        agency: 'Ray White Berwick',
        agentName: 'John Smith',
        externalUrl: 'https://www.realestate.com.au'
      },
      {
        id: 'ext-2',
        address: `${street}, ${suburb} VIC`,
        suburb: suburb,
        price: listingType === 'lease' ? '580' : '880000',
        priceDisplay: listingType === 'lease' ? '$580 per week' : '$880,000 - $920,000',
        listingType: listingType,
        bedrooms: 4,
        bathrooms: 2,
        carSpaces: 2,
        propertyType: 'House',
        images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' }],
        agency: 'Barry Plant Narre Warren',
        agentName: 'Sarah Johnson',
        externalUrl: 'https://www.domain.com.au'
      },
      {
        id: 'ext-3',
        address: `${street}, ${suburb} VIC`,
        suburb: suburb,
        price: listingType === 'lease' ? '700' : '1050000',
        priceDisplay: listingType === 'lease' ? '$700 per week' : 'Contact Agent',
        listingType: listingType,
        bedrooms: 4,
        bathrooms: 3,
        carSpaces: 2,
        propertyType: 'House',
        images: [{ url: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop' }],
        agency: 'OBrien Real Estate',
        agentName: 'Michael Chen',
        externalUrl: 'https://www.realestate.com.au'
      }
    ];

    // Filter out the current property if excludeId is provided
    const filteredProperties = excludeId 
      ? mockProperties.filter(p => p.id !== excludeId)
      : mockProperties;

    // Randomize and limit results to make it more realistic
    const shuffled = filteredProperties.sort(() => 0.5 - Math.random());
    const results = shuffled.slice(0, Math.min(3, shuffled.length));

    return NextResponse.json({
      success: true,
      properties: results,
      total: results.length,
      source: 'market-search'
    });

  } catch (error) {
    console.error('Market search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to search market properties',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Future Firecrawl integration example:
/*
async function searchWithFirecrawl(street: string, suburb: string, listingType: string) {
  const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;
  
  // Construct search URL for realestate.com.au
  const searchUrl = `https://www.realestate.com.au/${listingType}-in-${suburb.toLowerCase().replace(/\s+/g, '-')}-vic`;
  
  const response = await fetch('https://api.firecrawl.dev/v0/scrape', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: searchUrl,
      pageOptions: {
        includeHtml: false,
        onlyMainContent: true
      },
      extractorOptions: {
        mode: 'llm-extraction',
        extractionPrompt: `Extract property listings that match the street "${street}" in ${suburb}. For each property, extract: address, price, bedrooms, bathrooms, carSpaces, propertyType, agency name, agent name, main image URL`,
        extractionSchema: {
          type: 'object',
          properties: {
            properties: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  address: { type: 'string' },
                  price: { type: 'string' },
                  bedrooms: { type: 'number' },
                  bathrooms: { type: 'number' },
                  carSpaces: { type: 'number' },
                  propertyType: { type: 'string' },
                  agency: { type: 'string' },
                  agentName: { type: 'string' },
                  imageUrl: { type: 'string' }
                }
              }
            }
          }
        }
      }
    })
  });

  const data = await response.json();
  return data.data?.properties || [];
}
*/