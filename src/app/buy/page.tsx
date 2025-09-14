'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import OncomHeader from '@/components/OncomHeader';

export default function BuyPageOncom() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    priceMin: string;
    priceMax: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    propertyType: string;
    suburb: string;
  }>({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    propertyType: '',
    suburb: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  
  const { properties, loading } = useProperties({ 
    type: 'sale' 
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Filter properties based on criteria
  const filteredProperties = properties.filter(property => {
    const propertyPrice = typeof property.price === 'string' ? parseInt(property.price) : property.price;
    if (filters.priceMin && propertyPrice < parseInt(filters.priceMin)) return false;
    if (filters.priceMax && propertyPrice > parseInt(filters.priceMax)) return false;
    if (filters.bedrooms && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    if (filters.bathrooms && property.bathrooms !== parseInt(filters.bathrooms)) return false;
    if (filters.parking && property.carSpaces !== parseInt(filters.parking)) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (filters.suburb && !property.suburb?.toLowerCase().includes(filters.suburb.toLowerCase())) return false;
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    const priceA = typeof a.price === 'string' ? parseInt(a.price) : (a.price || 0);
    const priceB = typeof b.price === 'string' ? parseInt(b.price) : (b.price || 0);
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    return 0;
  });

  return (
    <>
      <OncomHeader />

      {/* Main Content */}
      <main style={{ paddingTop: isMobile ? '60px' : '64px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Page Header */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          paddingTop: isMobile ? '40px' : '60px',
          paddingBottom: isMobile ? '24px' : '40px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: isMobile ? '8px' : '16px'
            }}>Properties for sale</h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666'
            }}>
              {sortedProperties.length} properties found
            </p>
          </div>
        </div>

        {/* Mobile Filter Button */}
        {isMobile && (
          <div style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #e5e5e5',
            padding: '12px 20px',
            position: 'sticky',
            top: '60px',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setShowFilters(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: 'none',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              Filters
              {(filters.propertyType || filters.bedrooms || filters.bathrooms || filters.parking || filters.priceMin || filters.priceMax || filters.suburb) && (
                <span style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '2px 8px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {Object.values(filters).filter(v => v).length}
                </span>
              )}
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e5e5',
                backgroundColor: '#fff',
                fontSize: '14px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest first</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
            </select>
          </div>
        )}

        {/* Desktop Filters Bar */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: isMobile ? '16px 0' : '24px 0',
          position: 'sticky',
          top: isMobile ? '60px' : '64px',
          zIndex: 100,
          display: isMobile ? 'none' : 'block'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            display: 'flex',
            gap: isMobile ? '8px' : '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            <div style={{ 
              display: isMobile ? 'none' : 'flex', 
              gap: '16px', 
              flex: 1 
            }}>
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

              {/* Bathrooms */}
              <select
                value={filters.bathrooms}
                onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any baths</option>
                <option value="1">1 bath</option>
                <option value="2">2 baths</option>
                <option value="3">3 baths</option>
                <option value="4">4+ baths</option>
              </select>

              {/* Parking */}
              <select
                value={filters.parking}
                onChange={(e) => setFilters({ ...filters, parking: e.target.value })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any parking</option>
                <option value="0">No parking</option>
                <option value="1">1 car</option>
                <option value="2">2 cars</option>
                <option value="3">3+ cars</option>
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

              {/* Suburb */}
              <input
                type="text"
                placeholder="Suburb"
                value={filters.suburb}
                onChange={(e) => setFilters({ ...filters, suburb: e.target.value })}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  fontSize: '14px',
                  width: '150px'
                }}
              />

              {/* Clear Filters */}
              {(filters.propertyType || filters.bedrooms || filters.bathrooms || filters.parking || filters.priceMin || filters.priceMax || filters.suburb) && (
                <button
                  onClick={() => setFilters({
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    bathrooms: '',
                    parking: '',
                    propertyType: '',
                    suburb: ''
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
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingTop: isMobile ? '24px' : '40px',
          paddingBottom: isMobile ? '24px' : '40px'
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
            <div className="property-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: isMobile ? '16px' : '24px'
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
                    
                    <div style={{ padding: isMobile ? '16px' : '24px' }}>
                      <h3 style={{
                        fontSize: isMobile ? '20px' : '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </h3>
                      <p style={{
                        fontSize: isMobile ? '14px' : '16px',
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
                        {property.suburb}
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

      {/* Mobile Filter Panel */}
      {isMobile && showFilters && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9998,
              opacity: showFilters ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            onClick={() => setShowFilters(false)}
          />
          
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            transform: showFilters ? 'translateY(0)' : 'translateY(100%)',
            zIndex: 9999,
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '24px 20px 20px',
              borderBottom: '1px solid #e5e5e5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Property Type */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Property Type
                  </label>
                  <select
                    value={filters.propertyType}
                    onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">All types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Price Range
                  </label>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                {/* Bathrooms */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                {/* Parking */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Parking
                  </label>
                  <select
                    value={filters.parking}
                    onChange={(e) => setFilters({ ...filters, parking: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                </div>

                {/* Suburb */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                    Suburb
                  </label>
                  <input
                    type="text"
                    placeholder="Enter suburb"
                    value={filters.suburb}
                    onChange={(e) => setFilters({ ...filters, suburb: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div style={{
              padding: '16px 20px',
              borderTop: '1px solid #e5e5e5',
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  setFilters({
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    bathrooms: '',
                    parking: '',
                    propertyType: '',
                    suburb: ''
                  });
                }}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: '#f5f5f5',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  flex: 1,
                  padding: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Apply filters
              </button>
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