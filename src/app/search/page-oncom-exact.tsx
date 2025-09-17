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
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'newest', 'oldest'

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

  // Determine property type based on URL or filter
  const urlListingType = searchParams.get('listingType');
  const propertyType = urlListingType === 'rent' || urlListingType === 'lease' ? 'lease' :
                       urlListingType === 'buy' || urlListingType === 'sale' ? 'sale' :
                       filters.listingType === 'rent' ? 'lease' : 'sale';

  const { properties, loading } = useProperties({ type: propertyType });

  // Filter and sort properties
  const filteredProperties = properties
    .filter(property => {
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
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return parseInt(a.price) - parseInt(b.price);
        case 'price-desc':
          return parseInt(b.price) - parseInt(a.price);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default: // 'featured'
          return 0;
      }
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
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
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
            <Link
              href={`/map?q=${searchQuery || ''}&listingType=${filters.listingType}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'none',
                color: '#000'
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map
            </Link>
            
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
          <div style={{ paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', paddingTop: '24px', paddingBottom: '24px' }}>
            {loading ? (
              <div style={{ textAlign: 'center', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', paddingTop: '48px', paddingBottom: '48px' }}>
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
              <>
                {/* Sort and Results Count */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '16px', color: '#333' }}>
                    {filteredProperties.length} properties found
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      backgroundColor: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price (low to high)</option>
                    <option value="price-desc">Price (high to low)</option>
                    <option value="newest">Newest listings</option>
                    <option value="oldest">Oldest listings</option>
                  </select>
                </div>

                <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
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
                      const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                      if (addressEl) addressEl.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                      const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                      if (addressEl) addressEl.style.color = '#1f2937';
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
                      {property.listingType === 'lease' && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#AF272F',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          For Lease
                        </div>
                      )}
                      {property.status === 'unconditional' && (
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#FFA500',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Under Contract
                        </div>
                      )}
                    </div>
                    
                    <div style={{ padding: '16px' }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {property.listingType === 'lease'
                          ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent'))
                          : (property.priceDisplay || formatPrice(property.price))
                        }
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px',
                        color: '#1f2937',
                        transition: 'color 0.3s ease'
                      }}
                      className="property-address"
                      >
                        {property.address.replace(/ VIC$/, '')}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        marginBottom: '12px'
                      }}>
                        {property.suburb}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#4b5563'
                      }}>
                        {property.bedrooms !== undefined && property.bedrooms > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                            </svg>
                            {property.bedrooms}
                          </span>
                        )}
                        {property.bathrooms !== undefined && property.bathrooms > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c0 .01-.01 0 0 0H8v-2h8v2zm2-4H6V4h12v12z"/>
                              <circle cx="8" cy="6" r="1"/>
                              <circle cx="16" cy="6" r="1"/>
                              <path d="M8 9h8v5H8z"/>
                            </svg>
                            {property.bathrooms}
                          </span>
                        )}
                        {property.carSpaces !== undefined && property.carSpaces > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                            </svg>
                            {property.carSpaces}
                          </span>
                        )}
                        {property.propertyType && <span>{property.propertyType}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              </>
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
                  <select
                    value={filters.priceMin}
                    onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Min Price</option>
                    <option value="100000">$100,000</option>
                    <option value="200000">$200,000</option>
                    <option value="300000">$300,000</option>
                    <option value="400000">$400,000</option>
                    <option value="500000">$500,000</option>
                    <option value="600000">$600,000</option>
                    <option value="700000">$700,000</option>
                    <option value="800000">$800,000</option>
                    <option value="900000">$900,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1250000">$1,250,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="1750000">$1,750,000</option>
                    <option value="2000000">$2,000,000</option>
                    <option value="2250000">$2,250,000</option>
                    <option value="2500000">$2,500,000</option>
                    <option value="2750000">$2,750,000</option>
                    <option value="3000000">$3,000,000</option>
                    <option value="3250000">$3,250,000</option>
                    <option value="3500000">$3,500,000</option>
                    <option value="3750000">$3,750,000</option>
                    <option value="4000000">$4,000,000</option>
                    <option value="4250000">$4,250,000</option>
                    <option value="4500000">$4,500,000</option>
                    <option value="4750000">$4,750,000</option>
                    <option value="5000000">$5,000,000</option>
                  </select>
                  <span style={{ alignSelf: 'center' }}>-</span>
                  <select
                    value={filters.priceMax}
                    onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Max Price</option>
                    <option value="100000">$100,000</option>
                    <option value="200000">$200,000</option>
                    <option value="300000">$300,000</option>
                    <option value="400000">$400,000</option>
                    <option value="500000">$500,000</option>
                    <option value="600000">$600,000</option>
                    <option value="700000">$700,000</option>
                    <option value="800000">$800,000</option>
                    <option value="900000">$900,000</option>
                    <option value="1000000">$1,000,000</option>
                    <option value="1250000">$1,250,000</option>
                    <option value="1500000">$1,500,000</option>
                    <option value="1750000">$1,750,000</option>
                    <option value="2000000">$2,000,000</option>
                    <option value="2250000">$2,250,000</option>
                    <option value="2500000">$2,500,000</option>
                    <option value="2750000">$2,750,000</option>
                    <option value="3000000">$3,000,000</option>
                    <option value="3250000">$3,250,000</option>
                    <option value="3500000">$3,500,000</option>
                    <option value="3750000">$3,750,000</option>
                    <option value="4000000">$4,000,000</option>
                    <option value="4250000">$4,250,000</option>
                    <option value="4500000">$4,500,000</option>
                    <option value="4750000">$4,750,000</option>
                    <option value="5000000">$5,000,000</option>
                  </select>
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
      <style jsx global>{`
        a:hover .property-address {
          color: #AF272F !important;
        }
      `}</style>
    </>
  );
}