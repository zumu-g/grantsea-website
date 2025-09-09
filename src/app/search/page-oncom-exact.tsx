'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function SearchPageOncomExact() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSuburbs, setSelectedSuburbs] = useState<string[]>([]);
  
  const [filters, setFilters] = useState({
    listingType: 'buy',
    propertyTypes: [] as string[],
    priceMin: '',
    priceMax: '',
    bedroomsMin: '',
    bathroomsMin: '',
    carSpacesMin: '',
    landSizeMin: '',
    excludeUnderOffer: false,
    newListings: false,
    openHomes: false,
    auction: false
  });

  const { properties, loading } = useProperties({ type: 'sale' });

  // Filter properties
  const filteredProperties = properties.filter(property => {
    if (searchQuery && !property.address?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.suburb?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedSuburbs.length > 0 && !selectedSuburbs.includes(property.suburb)) {
      return false;
    }
    if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.propertyType)) {
      return false;
    }
    if (filters.bedroomsMin && property.bedrooms < parseInt(filters.bedroomsMin)) return false;
    if (filters.bathroomsMin && property.bathrooms < parseInt(filters.bathroomsMin)) return false;
    if (filters.carSpacesMin && property.carSpaces < parseInt(filters.carSpacesMin)) return false;
    return true;
  });

  return (
    <>
      {/* Header - Clean on.com style */}
      <header style={{
        position: 'sticky',
        top: 0,
        height: '64px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 50
      }}>
        <div style={{
          height: '100%',
          maxWidth: '100%',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link href="/" style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#000',
              textDecoration: 'none'
            }}>
              GRANT'S
            </Link>
            
            <nav style={{ display: 'flex', gap: '32px' }}>
              <Link href="/buy" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Buy</Link>
              <Link href="/rent" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Rent</Link>
              <Link href="/sold" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Sold</Link>
              <Link href="/agents" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Find agents</Link>
              <Link href="/new-homes" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>New homes</Link>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/saved-properties" style={{ padding: '8px' }}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <Link href="/sign-in" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000',
              textDecoration: 'none'
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Search Results Header with Map Toggle */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: '64px',
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '100%',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              {searchQuery ? `Properties in ${searchQuery}` : 'All Properties'}
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {filteredProperties.length} properties
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map
            </button>
            
            <button
              onClick={() => setShowFilters(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 128px)' }}>
        {/* Property Grid */}
        <div style={{ flex: 1, backgroundColor: '#f9fafb' }}>
          <div style={{ padding: '24px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '48px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '3px solid #e5e7eb',
                  borderTop: '3px solid #000',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px'
              }}>
                {filteredProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      transition: 'box-shadow 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      paddingTop: '66.67%',
                      backgroundColor: '#f3f4f6'
                    }}>
                      {property.images && property.images[0] ? (
                        <img
                          src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
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
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af'
                        }}>
                          No image
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px'
                      }}>
                        <SavePropertyButton property={property} />
                      </div>
                    </div>
                    
                    <div style={{ padding: '16px' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px'
                      }}>
                        {property.address}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginBottom: '12px'
                      }}>
                        {property.suburb}, {property.state} {property.postcode}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#4b5563'
                      }}>
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                        <span>{property.propertyType}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Panel - Slides from right */}
      {showFilters && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setShowFilters(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 60,
              transition: 'opacity 0.3s'
            }}
          />
          
          {/* Filter Panel */}
          <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            bottom: 0,
            width: '400px',
            backgroundColor: '#fff',
            boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.1)',
            zIndex: 70,
            overflowY: 'auto',
            transform: showFilters ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease'
          }}>
            {/* Filter Header */}
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700' }}>Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            {/* Filter Content */}
            <div style={{ padding: '24px' }}>
              {/* Property Type */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Property type
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['House', 'Apartment', 'Townhouse', 'Villa', 'Land', 'Acreage', 'Rural', 'Block of units', 'Retirement living'].map((type) => (
                    <label key={type} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes.includes(type)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({ ...filters, propertyTypes: [...filters.propertyTypes, type] });
                          } else {
                            setFilters({ ...filters, propertyTypes: filters.propertyTypes.filter(t => t !== type) });
                          }
                        }}
                        style={{ width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '14px' }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Price
                </h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="text"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                  <span style={{ alignSelf: 'center' }}>-</span>
                  <input
                    type="text"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Bedrooms
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Any', '1', '2', '3', '4', '5+'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFilters({ ...filters, bedroomsMin: num === 'Any' ? '' : num.replace('+', '') })}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: `1px solid ${filters.bedroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#e5e7eb'}`,
                        backgroundColor: filters.bedroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#fff',
                        color: filters.bedroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#fff' : '#000',
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Bathrooms
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Any', '1', '2', '3', '4+'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFilters({ ...filters, bathroomsMin: num === 'Any' ? '' : num.replace('+', '') })}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: `1px solid ${filters.bathroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#e5e7eb'}`,
                        backgroundColor: filters.bathroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#fff',
                        color: filters.bathroomsMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#fff' : '#000',
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Spaces */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Car spaces
                </h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Any', '1', '2', '3', '4+'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setFilters({ ...filters, carSpacesMin: num === 'Any' ? '' : num.replace('+', '') })}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: `1px solid ${filters.carSpacesMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#e5e7eb'}`,
                        backgroundColor: filters.carSpacesMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#000' : '#fff',
                        color: filters.carSpacesMin === (num === 'Any' ? '' : num.replace('+', '')) ? '#fff' : '#000',
                        borderRadius: '4px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* More Filters */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  More filters
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.excludeUnderOffer}
                      onChange={(e) => setFilters({ ...filters, excludeUnderOffer: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Exclude properties under offer</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.newListings}
                      onChange={(e) => setFilters({ ...filters, newListings: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px' }}>New listings (last 7 days)</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.openHomes}
                      onChange={(e) => setFilters({ ...filters, openHomes: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Open homes this week</span>
                  </label>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={filters.auction}
                      onChange={(e) => setFilters({ ...filters, auction: e.target.checked })}
                      style={{ width: '16px', height: '16px' }}
                    />
                    <span style={{ fontSize: '14px' }}>Auction</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '40px',
                paddingTop: '24px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button
                  onClick={() => {
                    setFilters({
                      listingType: 'buy',
                      propertyTypes: [],
                      priceMin: '',
                      priceMax: '',
                      bedroomsMin: '',
                      bathroomsMin: '',
                      carSpacesMin: '',
                      landSizeMin: '',
                      excludeUnderOffer: false,
                      newListings: false,
                      openHomes: false,
                      auction: false
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}