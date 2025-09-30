'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function SimplePropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch property');
        }

        setProperty(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Loading property...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Property not found</h1>
        <p>{error || 'The property you are looking for does not exist.'}</p>
        <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
          Back to home
        </Link>
      </div>
    );
  }

  // Simple display of property data
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
        ← Back to listings
      </Link>

      <h1 style={{ fontSize: '32px', marginTop: '20px', marginBottom: '10px' }}>
        {property.address || 'Property Address'}
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
          {property.listingType === 'lease'
            ? (property.leasePriceDisplay || property.leasePrice || 'Contact Agent')
            : (property.priceDisplay || property.price || 'Contact Agent')}
        </div>
        <div>
          <strong>Bedrooms:</strong><br />
          {property.bedrooms || '–'}
        </div>
        <div>
          <strong>Bathrooms:</strong><br />
          {property.bathrooms || '–'}
        </div>
        <div>
          <strong>Parking:</strong><br />
          {property.carSpaces || '–'}
        </div>
        <div>
          <strong>Property Type:</strong><br />
          {property.propertyType || '–'}
        </div>
        <div>
          <strong>Land Size:</strong><br />
          {property.landSize ? `${property.landSize} m²` : '–'}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Description</h2>
        <p style={{ lineHeight: '1.6', color: '#333' }}>
          {property.description || 'No description available.'}
        </p>
      </div>

      {property.features && property.features.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Features</h2>
          <ul style={{ columns: 2, columnGap: '40px' }}>
            {property.features.map((feature: string, index: number) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {property.images && property.images.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Images</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '10px'
          }}>
            {property.images.slice(0, 6).map((image: any, index: number) => (
              <div key={index} style={{
                backgroundColor: '#f0f0f0',
                paddingBottom: '66.67%',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px'
              }}>
                <img
                  src={image.url}
                  alt={`Property image ${index + 1}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        marginTop: '40px'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Contact Agent</h3>
        <p>{property.agent?.name || 'Grant\'s Estate Agents'}</p>
        <p>{property.agent?.phone || '1300 000 000'}</p>
        <p>{property.agent?.email || 'info@grantsea.com.au'}</p>
      </div>
    </div>
  );
}