'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import PropertySkeleton from '@/components/PropertySkeleton';
import { motion } from 'framer-motion';

export default function RentPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<{
    priceMin: string;
    priceMax: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    propertyType: string;
    suburb: string;
    furnished: string;
    pets: string;
  }>({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    propertyType: '',
    suburb: '',
    furnished: '',
    pets: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  
  const { properties, loading } = useProperties({ type: 'lease' });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Filter properties based on criteria
  const filteredProperties = properties.filter(property => {
    // Use lease price for rentals
    const rentPrice = property.leasePrice || property.price;
    const propertyPrice = typeof rentPrice === 'string' ? parseInt(rentPrice) : rentPrice;
    
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
    const rentA = a.leasePrice || a.price || 0;
    const rentB = b.leasePrice || b.price || 0;
    const priceA = typeof rentA === 'string' ? parseInt(rentA) : rentA;
    const priceB = typeof rentB === 'string' ? parseInt(rentB) : rentB;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    return 0;
  });

  const formatRentPrice = (price: number | string | undefined) => {
    if (!price) return 'Price on Application';
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    // Price is already weekly rent from API
    return `$${numPrice.toLocaleString()} per week`;
  };

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '180px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: isMobile ? '80px' : '120px',
          paddingBottom: isMobile ? '40px' : '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '700',
                marginBottom: '24px'
              }}>
              Properties for rent
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <Link
                href="/rent/report-maintenance"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  backgroundColor: '#002b7f',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001d5c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                Report Maintenance
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Filters Bar */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          position: 'sticky',
          top: '64px',
          zIndex: 100,
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '20px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {/* Suburb Filter */}
              <input
                type="text"
                placeholder="Suburb"
                value={filters.suburb}
                onChange={(e) => setFilters({ ...filters, suburb: e.target.value })}
                style={{
                  padding: '12px 20px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  minWidth: '160px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#F0F0F0';
                }}
              />

              {/* Weekly Rent Range */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Min $/week"
                  value={filters.priceMin}
                  onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    width: '120px'
                  }}
                />
                <span style={{ color: '#999' }}>—</span>
                <input
                  type="number"
                  placeholder="Max $/week"
                  value={filters.priceMax}
                  onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    width: '120px'
                  }}
                />
              </div>

              {/* Bedrooms */}
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                style={{
                  padding: '12px 20px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <option value="">Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>

              {/* Property Type */}
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                style={{
                  padding: '12px 20px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Unit">Unit</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Villa">Villa</option>
              </select>

              {/* More Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#F0F0F0';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                More Filters
              </button>

              {/* Clear Filters */}
              {Object.values(filters).some(v => v) && (
                <button
                  onClick={() => setFilters({
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    bathrooms: '',
                    parking: '',
                    propertyType: '',
                    suburb: '',
                    furnished: '',
                    pets: ''
                  })}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: '#000',
                    color: '#FFF',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '12px 20px',
                border: '1px solid #F0F0F0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                outline: 'none',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Rent: Low to High</option>
              <option value="price-high">Rent: High to Low</option>
            </select>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: '1480px',
                margin: '0 auto',
                paddingBottom: '20px',
                borderTop: '1px solid #F0F0F0',
                paddingTop: '20px'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {/* Bathrooms */}
                <select
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                  style={{
                    padding: '12px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Bathrooms</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3+ Bathrooms</option>
                </select>

                {/* Parking */}
                <select
                  value={filters.parking}
                  onChange={(e) => setFilters({ ...filters, parking: e.target.value })}
                  style={{
                    padding: '12px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Car Spaces</option>
                  <option value="0">No Parking</option>
                  <option value="1">1 Space</option>
                  <option value="2">2 Spaces</option>
                  <option value="3">3+ Spaces</option>
                </select>

                {/* Furnished */}
                <select
                  value={filters.furnished}
                  onChange={(e) => setFilters({ ...filters, furnished: e.target.value })}
                  style={{
                    padding: '12px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Furnished</option>
                  <option value="furnished">Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="partly">Partly Furnished</option>
                </select>

                {/* Pets */}
                <select
                  value={filters.pets}
                  onChange={(e) => setFilters({ ...filters, pets: e.target.value })}
                  style={{
                    padding: '12px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    outline: 'none',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">Pets</option>
                  <option value="allowed">Pets Allowed</option>
                  <option value="negotiable">Pets Negotiable</option>
                  <option value="no">No Pets</option>
                </select>
              </div>
            </motion.div>
          )}
        </section>

        {/* Results Count */}
        <section style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '40px',
          paddingBottom: '20px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '16px',
              color: '#666',
              fontWeight: '500'
            }}>
              {loading ? 'Loading...' : `${sortedProperties.length} rental properties found`}
            </p>
          </div>
        </section>

        {/* Property Grid */}
        <section style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingBottom: '120px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            {loading ? (
              <PropertySkeleton count={6} isMobile={isMobile} />
            ) : sortedProperties.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: '80px 20px'
                }}
              >
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '300',
                  fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>No rental properties found</h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '32px'
                }}>Try adjusting your filters or search in a different area</p>
                <button
                  onClick={() => setFilters({
                    priceMin: '',
                    priceMax: '',
                    bedrooms: '',
                    bathrooms: '',
                    parking: '',
                    propertyType: '',
                    suburb: '',
                    furnished: '',
                    pets: ''
                  })}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '32px'
                }}
              >
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #F0F0F0',
                      borderRadius: '0px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                    onMouseEnter={(e) => {
                      const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                      if (addressEl) addressEl.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                      if (addressEl) addressEl.style.color = '#000';
                    }}
                  >
                    <Link 
                      href={`/property/${property.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#FAFAFA',
                        overflow: 'hidden'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              transition: 'transform 0.6s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#CCC',
                            fontSize: '14px',
                            fontWeight: '500',
                            letterSpacing: '0.02em'
                          }}>
                            NO IMAGE AVAILABLE
                          </div>
                        )}
                        
                        {/* For Lease Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          left: '20px',
                          backgroundColor: '#002b7f',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          zIndex: 10
                        }}>
                          For Lease
                        </div>

                        {/* Save Button */}
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          right: '20px',
                          zIndex: 10
                        }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                      
                      <div style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        flex: '1'
                      }}>
                        <p style={{
                          fontSize: '0.75rem',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: '500',
                          marginBottom: '0.25rem'
                        }}>
                          {property.suburb}
                        </p>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#000',
                          letterSpacing: '-0.01em',
                          lineHeight: '1.3',
                          marginBottom: '0.5rem',
                          transition: 'color 0.3s ease'
                        }}
                        className="property-address"
                        >
                          {property.address.replace(', VIC', '')}
                        </h3>
                        
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          fontSize: '0.875rem',
                          color: '#666',
                          marginBottom: '0.5rem'
                        }}>
                          {property.bedrooms !== undefined && property.bedrooms > 0 && (
                            <span>{property.bedrooms} bed</span>
                          )}
                          {property.bathrooms !== undefined && property.bathrooms > 0 && (
                            <span>{property.bathrooms} bath</span>
                          )}
                          {property.carSpaces !== undefined && property.carSpaces > 0 && (
                            <span>{property.carSpaces} car</span>
                          )}
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#666',
                          marginTop: 'auto'
                        }}>
                          {property.leasePriceDisplay || formatRentPrice(property.leasePrice || property.price)}
                        </p>
                      </div>
                        
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
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