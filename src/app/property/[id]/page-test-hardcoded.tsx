'use client';

import React from 'react';
import Link from 'next/link';

// Completely hardcoded test page with no external dependencies
export default function HardcodedPropertyDetailPage() {
  // Hardcoded test property data
  const property = {
    id: 'test-1',
    address: '42 Test Street',
    suburb: 'Berwick',
    state: 'VIC',
    postcode: '3806',
    price: '850000',
    priceDisplay: '$850,000',
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    propertyType: 'House',
    description: 'This is a test property with hardcoded data to verify the page renders without API calls.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    images: [
      { id: '1', url: 'https://via.placeholder.com/600x400', order: 1, type: 'photo' }
    ],
    agent: {
      id: '1',
      name: 'Test Agent',
      phone: '0400 000 000',
      email: 'test@grantsea.com.au'
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
        ← Back to listings
      </Link>

      <h1 style={{ fontSize: '32px', marginTop: '20px', marginBottom: '10px' }}>
        {property.address}
      </h1>

      <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
        {property.suburb}, {property.state} {property.postcode}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div>
          <strong>Price:</strong><br />
          {property.priceDisplay}
        </div>
        <div>
          <strong>Bedrooms:</strong><br />
          {property.bedrooms}
        </div>
        <div>
          <strong>Bathrooms:</strong><br />
          {property.bathrooms}
        </div>
        <div>
          <strong>Parking:</strong><br />
          {property.carSpaces}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Description</h2>
        <p style={{ lineHeight: '1.6', color: '#333' }}>
          {property.description}
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Test Image</h2>
        <img
          src={property.images[0].url}
          alt="Test property"
          style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
        />
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Contact Agent</h3>
        <p>{property.agent.name}</p>
        <p>{property.agent.phone}</p>
        <p>{property.agent.email}</p>
      </div>
    </div>
  );
}