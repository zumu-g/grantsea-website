'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();

        if (data.success && data.data) {
          setProperty(data.data);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Loading property...</h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Property not found</h2>
        <Link href="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px' }}>
      <Link href="/" style={{ color: '#000', marginBottom: '20px', display: 'inline-block' }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
        {property.address}
      </h1>

      <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
        {property.suburb}, {property.state} {property.postcode}
      </p>

      <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        {property.listingType === 'lease'
          ? `$${property.leasePrice || '0'} per week`
          : `$${property.priceDisplay || property.price || 'Contact Agent'}`
        }
      </div>

      {property.images && property.images[0] && (
        <img
          src={property.images[0].url}
          alt="Property"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginBottom: '30px' }}
        />
      )}

      <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
        <div>
          <strong>Bedrooms:</strong> {property.bedrooms || '-'}
        </div>
        <div>
          <strong>Bathrooms:</strong> {property.bathrooms || '-'}
        </div>
        <div>
          <strong>Parking:</strong> {property.carSpaces || '-'}
        </div>
      </div>

      {property.description && (
        <div style={{ marginBottom: '30px' }}>
          <h2>Description</h2>
          <p style={{ lineHeight: '1.6' }}>{property.description}</p>
        </div>
      )}

      <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h3>Contact Agent</h3>
        <p>{property.agent?.name || 'Grant\'s Estate Agents'}</p>
        <p>{property.agent?.phone || '1300 000 000'}</p>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px'
        }}>
          Contact Agent
        </button>
      </div>
    </div>
  );
}