'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/services/api';

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
  images?: Array<{ url: string; order: number }>;
  agent?: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

export default function SafePropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure we only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !params.id) return;

    const fetchData = async () => {
      try {
        // Fetch main property
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();

        if (response.ok && data.success && data.data) {
          setProperty(data.data);

          // Fetch similar properties after we have the main property
          if (data.data.suburb) {
            try {
              const similarResponse = await fetch(`/api/properties?suburb=${data.data.suburb}&limit=4`);
              const similarData = await similarResponse.json();
              if (similarData.success && similarData.data) {
                setSimilarProperties(similarData.data.filter((p: Property) => p.id !== data.data.id).slice(0, 3));
              }
            } catch {
              // Silently fail for similar properties
            }
          }
        } else {
          setError(data.error || 'Failed to load property');
        }
      } catch (err) {
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mounted, params.id]);

  if (!mounted || loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e0e0e0',
            borderTop: '3px solid #000',
            borderRadius: '50%',
            margin: '0 auto'
          }} />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Property not found</h1>
          <p style={{ color: '#666', marginBottom: '24px' }}>{error || 'The property you are looking for does not exist.'}</p>
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
        textDecoration: 'none',
        fontSize: '14px'
      }}>
        ← Back to listings
      </Link>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }}>

        {/* Left Column - Images and Details */}
        <div>
          {/* Main Image */}
          {property.images && property.images.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
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
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjQwMCIgeT0iMjUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
          )}

          {/* Property Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
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

          {/* Property Features */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginBottom: '32px',
            padding: '24px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }}>
            {property.bedrooms !== undefined && (
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.bedrooms}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Bedrooms</div>
              </div>
            )}
            {property.bathrooms !== undefined && (
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.bathrooms}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Bathrooms</div>
              </div>
            )}
            {property.carSpaces !== undefined && (
              <div>
                <div style={{ fontSize: '24px', fontWeight: '600' }}>{property.carSpaces}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Parking</div>
              </div>
            )}
            {property.landSize !== undefined && (
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
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Features</h2>
              <ul style={{
                columns: 2,
                columnGap: '40px',
                listStyle: 'disc',
                paddingLeft: '20px'
              }}>
                {property.features.map((feature, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#333' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - Contact and Similar Properties */}
        <div>
          {/* Agent Contact Card */}
          <div style={{
            padding: '24px',
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '8px',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Contact Agent</h3>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontWeight: '600', marginBottom: '8px' }}>
                {property.agent?.name || 'Grant\'s Estate Agents'}
              </p>
              <p style={{ color: '#666', marginBottom: '4px' }}>
                {property.agent?.phone || '1300 000 000'}
              </p>
              <p style={{ color: '#666' }}>
                {property.agent?.email || 'info@grantsea.com.au'}
              </p>
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Contact Agent
            </button>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '16px' }}>Similar Properties</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {similarProperties.map((similar) => (
                  <Link
                    key={similar.id}
                    href={`/property/${similar.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div style={{
                      padding: '16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                    }}>
                      <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                        {similar.address}
                      </p>
                      <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                        {similar.suburb}
                      </p>
                      <p style={{ fontWeight: '600' }}>
                        {similar.listingType === 'lease'
                          ? (similar.leasePriceDisplay || `$${similar.leasePrice} per week`)
                          : (similar.priceDisplay || formatPrice(similar.price || 0))
                        }
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}