import { NextRequest, NextResponse } from 'next/server';

// VaultRE API configuration
const API_BASE_URL = process.env.CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || '';

interface EstimateRequest {
  suburb: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize?: number;
  condition: string;
}

interface ComparableSale {
  address: string;
  price: number;
  soldDate: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  distance: number;
}

interface EstimateResult {
  lowEstimate: number;
  highEstimate: number;
  medianEstimate: number;
  comparableSales: ComparableSale[];
  confidenceLevel: 'high' | 'medium' | 'low';
  lastUpdated: Date;
}

export async function POST(req: NextRequest) {
  let body: EstimateRequest;
  
  try {
    body = await req.json();
    
    // Fetch recent sales in the suburb
    const salesResponse = await fetch(
      `${API_BASE_URL}/properties/residential/sold?suburb=${encodeURIComponent(body.suburb)}&per_page=50&sold_in_days=180`,
      {
        headers: {
          'X-Api-Key': API_KEY,
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!salesResponse.ok) {
      // Fallback to mock data if API fails
      return NextResponse.json({
        estimate: generateMockEstimate(body)
      });
    }

    const salesData = await salesResponse.json();
    const properties = salesData.items || salesData.data || [];

    // Filter comparable properties
    const comparables = properties
      .filter((prop: any) => {
        // Match property type
        if (body.propertyType !== (prop.type?.name || '').toLowerCase()) return false;
        
        // Match bedroom count (within 1)
        const bedDiff = Math.abs((prop.bed || 0) - body.bedrooms);
        if (bedDiff > 1) return false;
        
        // Match bathroom count (within 1)
        const bathDiff = Math.abs((prop.bath || 0) - body.bathrooms);
        if (bathDiff > 1) return false;
        
        // Must have a sale price
        return prop.soldPrice || prop.searchPrice;
      })
      .map((prop: any) => {
        const price = prop.soldPrice || prop.searchPrice || 0;
        return {
          address: prop.displayAddress || prop.address?.street || 'Address withheld',
          price: parseInt(price),
          soldDate: prop.soldDate || prop.contractDate || new Date().toISOString(),
          bedrooms: prop.bed || 0,
          bathrooms: prop.bath || 0,
          carSpaces: (prop.garages || 0) + (prop.carports || 0),
          landSize: prop.landArea?.value,
          distance: Math.random() * 2 // Mock distance for now
        };
      })
      .filter((comp: ComparableSale) => comp.price > 0)
      .sort((a: ComparableSale, b: ComparableSale) => a.distance - b.distance)
      .slice(0, 10);

    // Calculate estimates based on comparables
    const estimate = calculateEstimate(comparables, body);

    return NextResponse.json({ estimate });

  } catch (error) {
    console.error('Error calculating property estimate:', error);
    
    // Return mock estimate on error - use default values if body parsing failed
    const mockEstimate = generateMockEstimate(body || {
      suburb: 'Unknown',
      propertyType: 'house',
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      condition: 'average'
    });
    return NextResponse.json({ estimate: mockEstimate });
  }
}

function calculateEstimate(comparables: ComparableSale[], request: EstimateRequest): EstimateResult {
  if (comparables.length === 0) {
    return generateMockEstimate(request);
  }

  // Calculate price per square meter if land size available
  const pricesPerSqm = comparables
    .filter(c => c.landSize && c.landSize > 0)
    .map(c => c.price / c.landSize!);

  // Calculate median price
  const prices = comparables.map(c => c.price).sort((a, b) => a - b);
  const medianPrice = prices.length % 2 === 0
    ? (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2
    : prices[Math.floor(prices.length / 2)];

  // Apply condition adjustment
  let conditionMultiplier = 1;
  switch (request.condition) {
    case 'excellent': conditionMultiplier = 1.05; break;
    case 'good': conditionMultiplier = 1; break;
    case 'average': conditionMultiplier = 0.95; break;
    case 'needs-work': conditionMultiplier = 0.85; break;
  }

  const adjustedMedian = medianPrice * conditionMultiplier;

  // Calculate confidence based on number of comparables
  let confidenceLevel: 'high' | 'medium' | 'low' = 'low';
  if (comparables.length >= 5) confidenceLevel = 'high';
  else if (comparables.length >= 3) confidenceLevel = 'medium';

  // Calculate range (±10% for high confidence, ±15% for medium, ±20% for low)
  const rangePercent = confidenceLevel === 'high' ? 0.1 : confidenceLevel === 'medium' ? 0.15 : 0.2;
  
  return {
    lowEstimate: Math.round(adjustedMedian * (1 - rangePercent)),
    highEstimate: Math.round(adjustedMedian * (1 + rangePercent)),
    medianEstimate: Math.round(adjustedMedian),
    comparableSales: comparables.slice(0, 5),
    confidenceLevel,
    lastUpdated: new Date()
  };
}

function generateMockEstimate(request: EstimateRequest): EstimateResult {
  // Base prices by suburb (mock data)
  const suburbMedians: { [key: string]: number } = {
    'berwick': 1100000,
    'narre warren': 850000,
    'cranbourne': 750000,
    'pakenham': 680000,
    'officer': 720000,
    'clyde': 650000,
    'beaconsfield': 950000,
    'hampton park': 700000
  };

  const basePrice = suburbMedians[request.suburb.toLowerCase()] || 800000;
  
  // Adjust for property features
  let adjustedPrice = basePrice;
  adjustedPrice += (request.bedrooms - 3) * 50000; // $50k per bedroom over 3
  adjustedPrice += (request.bathrooms - 2) * 30000; // $30k per bathroom over 2
  adjustedPrice += (request.parking - 2) * 20000; // $20k per car space over 2
  
  // Adjust for condition
  switch (request.condition) {
    case 'excellent': adjustedPrice *= 1.05; break;
    case 'average': adjustedPrice *= 0.95; break;
    case 'needs-work': adjustedPrice *= 0.85; break;
  }

  // Generate mock comparables
  const mockComparables: ComparableSale[] = [];
  for (let i = 0; i < 5; i++) {
    const variation = 0.9 + Math.random() * 0.2; // ±10% variation
    mockComparables.push({
      address: `${Math.floor(Math.random() * 100) + 1} Example Street, ${request.suburb}`,
      price: Math.round(adjustedPrice * variation),
      soldDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      bedrooms: request.bedrooms + Math.floor(Math.random() * 3) - 1,
      bathrooms: request.bathrooms,
      carSpaces: request.parking,
      landSize: 600 + Math.floor(Math.random() * 200),
      distance: Math.round(Math.random() * 20) / 10
    });
  }

  return {
    lowEstimate: Math.round(adjustedPrice * 0.9),
    highEstimate: Math.round(adjustedPrice * 1.1),
    medianEstimate: Math.round(adjustedPrice),
    comparableSales: mockComparables.sort((a, b) => a.distance - b.distance),
    confidenceLevel: 'medium',
    lastUpdated: new Date()
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}