'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function PropertyListingsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const { properties, loading, error } = useProperties({ 
    type: filter,
    limit: 20 
  });
  
  console.log('Listings page properties:', properties);

  // Sort properties
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseInt(a.price) - parseInt(b.price);
      case 'price-desc':
        return parseInt(b.price) - parseInt(a.price);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header Navigation - Adapted from template */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '90px'
          }}>
            {/* Logo */}
            <Link href="/" style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1a202c',
              textDecoration: 'none',
              marginRight: 'auto'
            }}>
              Grant's Estate Agents
            </Link>

            {/* Primary Navigation */}
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: '48px',
              marginRight: '48px'
            }}>
              <Link href="/search" style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Search
              </Link>
              <Link href="/about" style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                About
              </Link>
              <Link href="/explore" style={{
                color: '#4a5568',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Explore
              </Link>
            </nav>

            {/* Icon Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link href="/saved-properties" style={{ padding: '8px' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              <Link href="/profile" style={{ padding: '8px' }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '80px 40px',
        textAlign: 'center',
        backgroundColor: '#f7fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '300',
          lineHeight: '1.2',
          marginBottom: '24px',
          color: '#1a202c'
        }}>
          Find your perfect property
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#718096',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Discover exceptional homes in Melbourne's Southeast with Grant's Estate Agents
        </p>
      </section>

      {/* Filter Bar */}
      <section style={{
        borderBottom: '1px solid #e2e8f0',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Property Type Filter */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '12px 24px',
                backgroundColor: filter === 'all' ? '#1a202c' : 'transparent',
                color: filter === 'all' ? 'white' : '#4a5568',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              All Properties
            </button>
            <button
              onClick={() => setFilter('sale')}
              style={{
                padding: '12px 24px',
                backgroundColor: filter === 'sale' ? '#1a202c' : 'transparent',
                color: filter === 'sale' ? 'white' : '#4a5568',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              For Sale
            </button>
            <button
              onClick={() => setFilter('lease')}
              style={{
                padding: '12px 24px',
                backgroundColor: filter === 'lease' ? '#1a202c' : 'transparent',
                color: filter === 'lease' ? 'white' : '#4a5568',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s'
              }}
            >
              For Rent
            </button>
          </div>

          {/* Sort and Advanced Filters */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                padding: '12px 24px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '3px solid #e2e8f0',
              borderTopColor: '#3182ce',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 24px'
            }} />
            <p style={{ color: '#718096' }}>Loading properties...</p>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#e53e3e'
          }}>
            <p>Error loading properties. Please try again later.</p>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            color: '#718096'
          }}>
            <p>No properties found matching your criteria.</p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div style={{
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p style={{ color: '#718096', fontSize: '14px' }}>
                {sortedProperties.length} properties found
              </p>
            </div>

            {/* Test Navigation Buttons */}
            <div style={{ 
              marginBottom: '24px', 
              padding: '20px', 
              backgroundColor: '#fef3c7', 
              borderRadius: '8px',
              border: '1px solid #fbbf24'
            }}>
              <h3 style={{ marginBottom: '10px' }}>Debug Navigation (Remove when fixed)</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    console.log('Test: Navigating to /property/test');
                    router.push('/property/test');
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Go to /property/test
                </button>
                <button
                  onClick={() => {
                    console.log('Test: Using window.location to /property/123');
                    window.location.href = '/property/123';
                  }}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  window.location to /property/123
                </button>
                <Link 
                  href="/property/456"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}
                >
                  Link to /property/456
                </Link>
                {properties.length > 0 && (
                  <button
                    onClick={() => {
                      const firstId = properties[0].id;
                      console.log('Test: Navigate to first property ID:', firstId);
                      router.push(`/property/${firstId}`);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Go to First Property (ID: {properties[0]?.id || 'none'})
                  </button>
                )}
              </div>
            </div>

            {/* Property Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '32px'
            }}>
              {sortedProperties.map((property) => {
                console.log('Property ID:', property.id, 'Full property:', property);
                const propertyUrl = `/property/${property.id}`;
                return (
                <div
                  key={property.id}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    position: 'relative'
                  }}
                >
                  <article 
                    onClick={(e) => {
                      // Prevent click if it's from the save button
                      if ((e.target as HTMLElement).closest('button')) return;
                      
                      console.log('=== PROPERTY CARD CLICKED ===');
                      console.log('Event target:', e.target);
                      console.log('Property ID:', property.id);
                      console.log('Property URL:', propertyUrl);
                      console.log('Current pathname:', window.location.pathname);
                      console.log('Router available:', !!router);
                      
                      try {
                        console.log('Attempting router.push...');
                        router.push(propertyUrl);
                        console.log('router.push called successfully');
                      } catch (error) {
                        console.error('Router navigation failed:', error);
                        console.log('Falling back to window.location...');
                        window.location.href = propertyUrl;
                      }
                    }}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      border: '1px solid #e2e8f0',
                      userSelect: 'none'
                    }}>
                    {/* Property Image */}
                    <div style={{
                      position: 'relative',
                      paddingTop: '66.67%', // 3:2 aspect ratio
                      backgroundColor: '#f7fafc',
                      overflow: 'hidden'
                    }}>
                      {/* Save Button */}
                      <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}>
                        <SavePropertyButton property={property} />
                      </div>
                      
                      {property.images && property.images[0] ? (
                        <img
                          src={property.images[0].url}
                          alt={property.address}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#cbd5e0'
                        }}>
                          Property Image
                        </div>
                      )}
                    </div>

                    {/* Property Details */}
                    <div style={{ padding: '24px' }}>
                      {/* Status Badge */}
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          backgroundColor: property.status === 'active' ? '#48bb78' : '#e53e3e',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {property.listingType === 'lease' ? 'For Rent' : 'For Sale'}
                        </span>
                      </div>

                      {/* Property Title */}
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1a202c'
                      }}>
                        {property.address}
                      </h3>

                      {/* Suburb and Postcode */}
                      <p style={{
                        fontSize: '16px',
                        color: '#718096',
                        marginBottom: '16px'
                      }}>
                        {property.suburb} {property.postcode}
                      </p>

                      {/* Property Type and Features */}
                      <div style={{
                        display: 'flex',
                        gap: '24px',
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                          </svg>
                          <span>{property.bedrooms}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c0 .01-.01 0 0 0H8v-2h8v2zm2-4H6V4h12v12z"/>
                            <circle cx="8" cy="6" r="1"/>
                            <circle cx="16" cy="6" r="1"/>
                            <path d="M8 9h8v5H8z"/>
                          </svg>
                          <span>{property.bathrooms}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                          </svg>
                          <span>{property.carSpaces}</span>
                        </div>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#718096',
                        marginBottom: '16px'
                      }}>
                        {property.propertyType}
                      </p>

                      {/* Price */}
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#1a202c'
                      }}>
                        {property.listingType === 'lease' 
                          ? (property.leasePriceDisplay || `$${property.leasePrice} per week`)
                          : (property.priceDisplay || formatPrice(property.price))}
                      </div>
                    </div>
                  </article>
                </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}