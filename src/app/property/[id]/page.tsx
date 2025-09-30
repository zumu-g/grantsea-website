'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import AskAI from '@/components/AskAI';

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
  landSize?: number;
  propertyType?: string;
  description?: string;
  features?: string[];
  images?: Array<{ url: string }>;
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    if (params.id) {
      fetchProperty();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading property details...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Property not found</h1>
          <p>{error}</p>
          <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const displayPrice = () => {
    if (property.listingType === 'lease') {
      return property.leasePriceDisplay || property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent';
    }
    return property.priceDisplay || formatPrice(property.price || 0);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Back Link */}
      <Link href="/" style={{
        display: 'inline-block',
        marginBottom: '20px',
        color: '#000',
        textDecoration: 'none'
      }}>
        ← Back to listings
      </Link>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>

        {/* Left Column */}
        <div>
          {/* Main Image */}
          {property.images && property.images[0] && (
            <div style={{ marginBottom: '32px' }}>
              <img
                src={property.images[0].url}
                alt="Property"
                style={{
                  width: '100%',
                  height: '500px',
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

          {/* Property Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              {property.address || 'Property Address'}
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '16px'
            }}>
              {property.suburb}, {property.state} {property.postcode}
            </p>
            <p style={{
              fontSize: '28px',
              fontWeight: '700'
            }}>
              {displayPrice()}
            </p>
          </div>

          {/* Features */}
          <div style={{
            display: 'flex',
            gap: '32px',
            padding: '24px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            marginBottom: '32px'
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.bedrooms || '–'}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Bedrooms</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.bathrooms || '–'}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Bathrooms</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.carSpaces || '–'}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Parking</div>
            </div>
            {property.landSize && (
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.landSize} m²</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Land Size</div>
              </div>
            )}
          </div>

          {/* Description */}
          {property.description && (
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Description</h2>
              <p style={{ lineHeight: '1.8', color: '#333' }}>
                {property.description}
              </p>
            </div>
          )}

          {/* Features List */}
          {property.features && property.features.length > 0 && (
            <div>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Features</h2>
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
        </div>

        {/* Right Column - Agent Contact */}
        <div>
          <div style={{
            position: 'sticky',
            top: '20px',
            padding: '24px',
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '8px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Contact Agent
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>
                {property.agent?.name || 'Grant\'s Estate Agents'}
              </p>
              <p style={{ color: '#666', marginBottom: '4px' }}>
                {property.agent?.phone || '1300 000 000'}
              </p>
              <p style={{ color: '#666' }}>
                {property.agent?.email || 'info@grantsea.com.au'}
              </p>
            </div>
            <button
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}