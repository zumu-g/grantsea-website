'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

export default function PropertyListingsPage() {
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

            {/* Property Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '32px'
            }}>
              {sortedProperties.map((property) => {
                console.log('Property ID:', property.id, 'Full property:', property);
                return (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <article style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0'
                  }}>
                    {/* Property Image */}
                    <div style={{
                      position: 'relative',
                      paddingTop: '66.67%', // 3:2 aspect ratio
                      backgroundColor: '#f7fafc',
                      overflow: 'hidden'
                    }}>
                      {/* Save Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle save property
                        }}
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      
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
                        {property.suburb}, {property.state} {property.postcode}
                      </p>

                      {/* Property Type */}
                      <p style={{
                        fontSize: '14px',
                        color: '#4a5568',
                        marginBottom: '16px'
                      }}>
                        {property.propertyType} • {property.bedrooms} bed, {property.bathrooms} bath, {property.carSpaces} car
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
                </Link>
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