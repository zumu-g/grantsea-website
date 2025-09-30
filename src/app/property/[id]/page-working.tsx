'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Property {
  id: string;
  address?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  price?: string;
  priceDisplay?: string;
  leasePrice?: string;
  leasePriceDisplay?: string;
  listingType?: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  propertyType?: string;
  description?: string;
  features?: string[];
  images?: Array<{ url: string; order: number }>;
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export default function WorkingPropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();

        if (response.ok && data.success && data.data) {
          setProperty(data.data);
        } else {
          setError(data.error || 'Failed to load property');
        }
      } catch (err) {
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
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

  const displayPrice = () => {
    if (property.listingType === 'lease') {
      return property.leasePriceDisplay || property.leasePrice || 'Contact Agent';
    }
    return property.priceDisplay || property.price || 'Contact Agent';
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Back Link */}
      <Link href="/" style={{
        display: 'inline-block',
        marginBottom: '20px',
        color: '#000',
        textDecoration: 'none'
      }}>
        ← Back to listings
      </Link>

      {/* Property Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '10px'
        }}>
          {property.address || 'Property Address'}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666'
        }}>
          {property.suburb}, {property.state} {property.postcode}
        </p>
        <p style={{
          fontSize: '24px',
          fontWeight: '600',
          marginTop: '10px'
        }}>
          {displayPrice()}
        </p>
      </div>

      {/* Property Images */}
      {property.images && property.images.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <img
            src={property.images[0].url}
            alt="Property"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Property Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '40px'
      }}>
        {property.bedrooms !== undefined && (
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>{property.bedrooms}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Bedrooms</div>
          </div>
        )}
        {property.bathrooms !== undefined && (
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>{property.bathrooms}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Bathrooms</div>
          </div>
        )}
        {property.carSpaces !== undefined && (
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>{property.carSpaces}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Parking</div>
          </div>
        )}
        {property.propertyType && (
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600' }}>{property.propertyType}</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Type</div>
          </div>
        )}
      </div>

      {/* Description */}
      {property.description && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Description</h2>
          <p style={{ lineHeight: '1.6', color: '#333' }}>
            {property.description}
          </p>
        </div>
      )}

      {/* Features */}
      {property.features && property.features.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Features</h2>
          <ul style={{
            columns: 2,
            columnGap: '40px',
            listStyle: 'disc',
            paddingLeft: '20px'
          }}>
            {property.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '8px' }}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Agent Contact */}
      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Contact Agent</h3>
        {property.agent ? (
          <>
            <p style={{ marginBottom: '5px' }}>{property.agent.name}</p>
            <p style={{ marginBottom: '5px' }}>{property.agent.phone}</p>
            <p>{property.agent.email}</p>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '5px' }}>Grant's Estate Agents</p>
            <p style={{ marginBottom: '5px' }}>1300 000 000</p>
            <p>info@grantsea.com.au</p>
          </>
        )}
      </div>
    </div>
  );
}