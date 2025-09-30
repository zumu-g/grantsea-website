'use client';

import React from 'react';
import Link from 'next/link';

export default function TestPropertyPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
        Test Property Page (Static Route)
      </h1>

      <p style={{ marginBottom: '20px' }}>
        This is a test page with a static route to verify the app is working.
      </p>

      <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>Test Property Details</h2>
        <p>Address: 123 Test Street</p>
        <p>Suburb: Berwick, VIC 3806</p>
        <p>Price: $850,000</p>
        <p>Bedrooms: 4</p>
        <p>Bathrooms: 2</p>
        <p>Parking: 2</p>
      </div>

      <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
        ← Back to Home
      </Link>
    </div>
  );
}