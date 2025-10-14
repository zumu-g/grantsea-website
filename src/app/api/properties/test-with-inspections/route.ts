import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Create a test property with inspection times to verify display is working
  const testProperty = {
    id: "test-123",
    address: "123 Test Street, Berwick VIC 3806",
    suburb: "Berwick",
    state: "VIC",
    postcode: "3806",
    price: "850000",
    priceDisplay: "$850,000 - $900,000",
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    propertyType: "House",
    status: "active",
    description: "Test property with inspection times",
    features: ["Test feature"],
    images: [{
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
      type: "photo"
    }],
    agent: {
      name: "Test Agent",
      email: "test@grantsea.com.au",
      phone: "0400 000 000"
    },
    // Add test inspection times
    inspectionTimes: [
      {
        id: "insp-1",
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // Tomorrow + 30 mins
        type: "public"
      },
      {
        id: "insp-2", 
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // In 3 days
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(), // In 3 days + 30 mins
        type: "public"
      }
    ]
  };

  return NextResponse.json({
    success: true,
    data: testProperty,
    message: "Test property with inspection times"
  });
}