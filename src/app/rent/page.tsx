'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { motion } from 'framer-motion';

export default function RentPage() {
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
    // Convert to weekly rent
    const weeklyRent = Math.round(numPrice / 4.33);
    return `$${weeklyRent.toLocaleString()} per week`;
  };

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '60px',
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
                fontSize: '72px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
              Rental Properties
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '20px',
                color: '#666',
                fontWeight: '400',
                letterSpacing: '0.01em'
              }}>
              Find your perfect rental home in Melbourne's South East
            </motion.p>
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
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '3px solid #F0F0F0',
                  borderTop: '3px solid #000',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
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
                  gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
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
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Link 
                      href={`/property/${property.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{
                        position: 'relative',
                        aspectRatio: '16/10',
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
                        
                        {/* Rent Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '20px',
                          left: '20px',
                          backgroundColor: '#000',
                          color: '#FFF',
                          padding: '6px 16px',
                          fontSize: '12px',
                          fontWeight: '600',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase'
                        }}>
                          For Rent
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
                      
                      <div style={{ padding: '32px' }}>
                        <h3 style={{
                          fontSize: '32px',
                          fontWeight: '600',
                          marginBottom: '12px',
                          letterSpacing: '-0.02em'
                        }}>
                          {formatRentPrice(property.leasePrice || property.price)}
                        </h3>
                        
                        <p style={{
                          fontSize: '18px',
                          color: '#000',
                          marginBottom: '8px',
                          fontWeight: '500',
                          letterSpacing: '0.01em'
                        }}>
                          {property.address}
                        </p>
                        
                        <p style={{
                          fontSize: '16px',
                          color: '#666',
                          marginBottom: '24px',
                          fontWeight: '400'
                        }}>
                          {property.suburb}{property.state && `, ${property.state}`}
                        </p>
                        
                        <div style={{
                          display: 'flex',
                          gap: '32px',
                          fontSize: '15px',
                          color: '#333',
                          paddingTop: '24px',
                          borderTop: '1px solid #F0F0F0'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                            </svg>
                            <span style={{ fontWeight: '500' }}>{property.bedrooms}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c0 .01-.01 0 0 0H8v-2h8v2zm2-4H6V4h12v12z"/>
                              <circle cx="8" cy="6" r="1"/>
                              <circle cx="16" cy="6" r="1"/>
                              <path d="M8 9h8v5H8z"/>
                            </svg>
                            <span style={{ fontWeight: '500' }}>{property.bathrooms}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                            </svg>
                            <span style={{ fontWeight: '500' }}>{property.carSpaces}</span>
                          </div>
                        </div>
                        
                        {/* Property Type Badge */}
                        {property.propertyType && (
                          <div style={{
                            marginTop: '16px',
                            display: 'inline-block',
                            padding: '6px 12px',
                            backgroundColor: '#F0F0F0',
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#666'
                          }}>
                            {property.propertyType}
                          </div>
                        )}
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