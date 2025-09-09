'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function BuyPageOncom() {
  const [filters, setFilters] = useState({
    type: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    propertyType: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  
  const { properties, loading } = useProperties({ 
    type: filters.type === 'all' ? undefined : filters.type 
  });

  // Filter properties based on criteria
  const filteredProperties = properties.filter(property => {
    if (filters.priceMin && property.price < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && property.price > parseInt(filters.priceMax)) return false;
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  return (
    <>
      {/* Header - Same as homepage */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          height: '100%',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#000',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
          }}>
            GRANT'S
          </Link>

          <nav style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Link href="/buy" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              borderBottom: '2px solid #000',
              paddingBottom: '2px'
            }}>Buy</Link>
            <Link href="/sell" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Sell</Link>
            <Link href="/rent" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Rent</Link>
            <Link href="/agents" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Find Agents</Link>
          </nav>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/saved-properties" style={{ padding: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Page Header */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '40px 0'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '16px'
            }}>Properties for sale</h1>
            <p style={{
              fontSize: '18px',
              color: '#666'
            }}>
              {sortedProperties.length} properties found
            </p>
          </div>
        </div>

        {/* Filters Bar */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '24px 0',
          position: 'sticky',
          top: '64px',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
              {/* Property Type */}
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="">All property types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Land">Land</option>
              </select>

              {/* Bedrooms */}
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any beds</option>
                <option value="1">1 bed</option>
                <option value="2">2 beds</option>
                <option value="3">3 beds</option>
                <option value="4">4 beds</option>
                <option value="5">5+ beds</option>
              </select>

              {/* Price Range */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e5e5',
                    fontSize: '14px',
                    width: '120px'
                  }}
                />
                <span style={{ color: '#666' }}>-</span>
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #e5e5e5',
                    fontSize: '14px',
                    width: '120px'
                  }}
                />
              </div>

              {/* Clear Filters */}
              {(filters.propertyType || filters.bedrooms || filters.priceMin || filters.priceMax) && (
                <button
                  onClick={() => setFilters({
                    type: 'all',
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    propertyType: ''
                  })}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #e5e5e5',
                backgroundColor: '#fff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
            </select>
          </div>
        </div>

        {/* Property Grid */}
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          padding: '40px'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #e0e0e0',
                borderTop: '3px solid #000',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : sortedProperties.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 0'
            }}>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>No properties found</h2>
              <p style={{ color: '#666' }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {sortedProperties.map((property) => (
                <div key={property.id} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <Link href={`/property/${property.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    <div style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden'
                    }}>
                      {property.images && property.images[0] ? (
                        <img
                          src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                          alt={property.address}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#999'
                        }}>
                          No image
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px'
                      }}>
                        <SavePropertyButton property={property} />
                      </div>
                      {property.status === 'new' && (
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          backgroundColor: '#000',
                          color: '#fff',
                          padding: '4px 12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}>
                          New
                        </div>
                      )}
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#000',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {property.address}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '16px'
                      }}>
                        {property.suburb}, {property.state} {property.postcode}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '24px',
                        fontSize: '14px',
                        color: '#666',
                        paddingTop: '16px',
                        borderTop: '1px solid #e5e5e5'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                          <span>{property.bedrooms}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          <span>{property.bathrooms}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                          <span>{property.carSpaces}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {!loading && sortedProperties.length > 0 && (
            <div style={{
              textAlign: 'center',
              marginTop: '64px'
            }}>
              <button style={{
                padding: '16px 48px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Load more properties
              </button>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}