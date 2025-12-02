'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import { formatNextInspection } from '@/utils/formatInspectionTime';
import SavePropertyButton from '@/components/SavePropertyButton';
import OncomHeader from '@/components/OncomHeader';
import PropertySkeleton from '@/components/PropertySkeleton';

export default function BuyPageOncom() {
  const [showDropdown, setShowDropdown] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filters, setFilters] = useState<{
    priceMin: string;
    priceMax: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    propertyType: string;
    suburb: string;
    landSize: string;
    yearBuilt: string;
    auction: string;
  }>({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    propertyType: '',
    suburb: '',
    landSize: '',
    yearBuilt: '',
    auction: ''
  });
  const [sortBy, setSortBy] = useState('newest');
  const [searchSaved, setSearchSaved] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(12);
  
  const { properties, loading } = useProperties({ 
    type: 'sale',
    limit: currentLimit
  });

  // Get unique suburbs from properties
  const getUniqueSuburbs = () => {
    const suburbs = [...new Set(properties.map(property => 
      property.suburb || property.address?.split(',')[1]?.trim()
    ).filter(Boolean))];
    return suburbs.sort();
  };

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
    
    // Land size filter
    if (filters.landSize) {
      const landSize = property.landSize || 0;
      if (filters.landSize === '0-400' && landSize >= 400) return false;
      if (filters.landSize === '400-600' && (landSize < 400 || landSize >= 600)) return false;
      if (filters.landSize === '600-800' && (landSize < 600 || landSize >= 800)) return false;
      if (filters.landSize === '800+' && landSize < 800) return false;
    }
    
    // Year built filter
    if (filters.yearBuilt && property.yearBuilt) {
      if (filters.yearBuilt === '2020+' && property.yearBuilt < 2020) return false;
      if (filters.yearBuilt === '2010-2019' && (property.yearBuilt < 2010 || property.yearBuilt >= 2020)) return false;
      if (filters.yearBuilt === '2000-2009' && (property.yearBuilt < 2000 || property.yearBuilt >= 2010)) return false;
      if (filters.yearBuilt === '1990-1999' && (property.yearBuilt < 1990 || property.yearBuilt >= 2000)) return false;
      if (filters.yearBuilt === 'pre-1990' && property.yearBuilt >= 1990) return false;
    }
    
    // Auction filter
    if (filters.auction) {
      const isAuction = property.saleMethod === 'auction' || property.methodOfSale?.toLowerCase()?.includes('auction');
      if (filters.auction === 'auction' && !isAuction) return false;
      if (filters.auction === 'private' && isAuction) return false;
    }
    
    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    
    const priceA = typeof a.price === 'string' ? parseInt(a.price) : (a.price || 0);
    const priceB = typeof b.price === 'string' ? parseInt(b.price) : (b.price || 0);
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    
    if (sortBy === 'bedrooms-high') return (b.bedrooms || 0) - (a.bedrooms || 0);
    if (sortBy === 'land-size') return (b.landSize || 0) - (a.landSize || 0);
    
    return 0;
  });

  const handleSaveSearch = () => {
    const searchData = {
      type: 'sale',
      filters,
      sortBy,
      timestamp: new Date().toISOString(),
      resultsCount: sortedProperties.length
    };
    
    try {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      savedSearches.push(searchData);
      localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
      setSearchSaved(true);
      setTimeout(() => setSearchSaved(false), 3000);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  return (
    <>
      <OncomHeader />

      {/* Main Content */}
      <main style={{ paddingTop: isMobile ? '90px' : '200px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Page Header */}
        <div style={{
          backgroundColor: '#fff',
          paddingTop: isMobile ? '80px' : '120px',
          paddingBottom: isMobile ? '40px' : '60px'
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
              marginBottom: 0
            }}>Properties for sale</h1>
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
          padding: isMobile ? '16px 0' : '20px 0',
          display: isMobile ? 'none' : 'block'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: '32px',
              flex: 1,
              flexWrap: 'wrap'
            }}>
              {/* Properties for sale with X button */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  borderBottom: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottom = '1px solid #666';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottom = '1px solid transparent';
                }}
              >
                Properties for sale
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Property Type Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(showDropdown === 'type' ? '' : 'type')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '14px',
                    color: '#000',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid transparent';
                  }}
                >
                  {filters.propertyType || 'All property types'}
                </button>
                {showDropdown === 'type' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    minWidth: '200px',
                    zIndex: 101,
                    padding: '16px'
                  }}>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '14px',
                      marginBottom: '16px' 
                    }}>
                      Property type
                    </div>
                    {['House', 'Apartment', 'Townhouse', 'Land'].map(type => (
                      <label
                        key={type}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 0',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.propertyType === type}
                          onChange={() => {
                            setFilters({ ...filters, propertyType: filters.propertyType === type ? '' : type });
                          }}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer'
                          }}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Bedrooms */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(showDropdown === 'beds' ? '' : 'beds')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '14px',
                    color: '#000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid transparent';
                  }}
                >
                  {filters.bedrooms ? `${filters.bedrooms} bed${filters.bedrooms !== '1' ? 's' : ''}` : 'Bedrooms'}
                </button>
                {showDropdown === 'beds' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    minWidth: '180px',
                    zIndex: 101,
                    padding: '16px'
                  }}>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '14px',
                      marginBottom: '16px' 
                    }}>
                      Bedrooms
                    </div>
                    {['1', '2', '3', '4', '5+'].map(beds => (
                      <label
                        key={beds}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 0',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.bedrooms === beds.replace('+', '')}
                          onChange={() => {
                            const bedValue = beds.replace('+', '');
                            setFilters({ ...filters, bedrooms: filters.bedrooms === bedValue ? '' : bedValue });
                          }}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer'
                          }}
                        />
                        {beds}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Suburbs */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(showDropdown === 'suburbs' ? '' : 'suburbs')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '14px',
                    color: '#000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid transparent';
                  }}
                >
                  {filters.suburb || 'All suburbs'}
                </button>
                {showDropdown === 'suburbs' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '16px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                    minWidth: '200px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 101,
                    padding: '16px'
                  }}>
                    <div style={{ 
                      fontWeight: '600', 
                      fontSize: '14px',
                      marginBottom: '16px' 
                    }}>
                      Suburb
                    </div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px 0',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.suburb === ''}
                        onChange={() => {
                          setFilters({ ...filters, suburb: '' });
                        }}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer'
                        }}
                      />
                      All suburbs
                    </label>
                    {getUniqueSuburbs().map(suburb => (
                      <label
                        key={suburb}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 0',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.suburb === suburb}
                          onChange={() => {
                            setFilters({ ...filters, suburb: filters.suburb === suburb ? '' : suburb });
                          }}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer'
                          }}
                        />
                        {suburb}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowDropdown(showDropdown === 'price' ? '' : 'price')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '14px',
                    color: '#000',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderBottom: '1px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderBottom = '1px solid transparent';
                  }}
                >
                  Price
                </button>
                {showDropdown === 'price' && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '16px',
                    minWidth: '300px',
                    zIndex: 101
                  }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#666',
                          fontSize: '14px',
                          pointerEvents: 'none'
                        }}>$</span>
                        <input
                          type="number"
                          placeholder="Min"
                          value={filters.priceMin}
                          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                          style={{
                            width: '100%',
                            paddingLeft: '24px',
                            paddingRight: '12px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            border: '1px solid #e5e5e5',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <span>—</span>
                      <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#666',
                          fontSize: '14px',
                          pointerEvents: 'none'
                        }}>$</span>
                        <input
                          type="number"
                          placeholder="Max"
                          value={filters.priceMax}
                          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                          style={{
                            width: '100%',
                            paddingLeft: '24px',
                            paddingRight: '12px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            border: '1px solid #e5e5e5',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDropdown('')}
                      style={{
                        marginTop: '12px',
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* More Filters */}
              <button
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                style={{
                  background: 'none',
                  padding: '12px 24px',
                  fontSize: '14px',
                  color: '#000',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  fontWeight: '600'
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
                More filters
              </button>
            </div>

            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {/* Save Search */}
              <button
                onClick={handleSaveSearch}
                style={{
                  background: searchSaved ? '#4CAF50' : 'none',
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: searchSaved ? '#fff' : '#000',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: `1px solid ${searchSaved ? '#4CAF50' : '#000'}`,
                  borderRadius: '4px'
                }}
                onMouseEnter={(e) => {
                  if (!searchSaved) {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!searchSaved) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#000';
                  }
                }}
              >
                {searchSaved ? '✓ Search saved' : 'Save search'}
              </button>

              {/* Results Count */}
              <span style={{ fontSize: '14px', color: '#666' }}>
                {sortedProperties.length} results
              </span>
            </div>
          </div>

          {/* Expanded Filters */}
          {showMoreFilters && (
            <div style={{
              maxWidth: '1480px',
              margin: '0 auto',
              paddingLeft: 'max(2rem, 3.33vw)',
              paddingRight: 'max(2rem, 3.33vw)',
              paddingBottom: '20px',
              borderTop: '1px solid #F0F0F0',
              paddingTop: '20px'
            }}>
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

                {/* Suburb Dropdown */}
                <select
                  value={filters.suburb}
                  onChange={(e) => setFilters({ ...filters, suburb: e.target.value })}
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
                  <option value="">All Suburbs</option>
                  {getUniqueSuburbs().map(suburb => (
                    <option key={suburb} value={suburb}>{suburb}</option>
                  ))}
                </select>

                {/* Land Size */}
                <select
                  value={filters.landSize}
                  onChange={(e) => setFilters({ ...filters, landSize: e.target.value })}
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
                  <option value="">Land Size</option>
                  <option value="0-400">Under 400m²</option>
                  <option value="400-600">400-600m²</option>
                  <option value="600-800">600-800m²</option>
                  <option value="800+">800m²+</option>
                </select>

                {/* Year Built */}
                <select
                  value={filters.yearBuilt}
                  onChange={(e) => setFilters({ ...filters, yearBuilt: e.target.value })}
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
                  <option value="">Year Built</option>
                  <option value="2020+">2020 or newer</option>
                  <option value="2010-2019">2010-2019</option>
                  <option value="2000-2009">2000-2009</option>
                  <option value="1990-1999">1990-1999</option>
                  <option value="pre-1990">Before 1990</option>
                </select>

                {/* Auction */}
                <select
                  value={filters.auction}
                  onChange={(e) => setFilters({ ...filters, auction: e.target.value })}
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
                  <option value="">Sale Method</option>
                  <option value="auction">Auction</option>
                  <option value="private">Private Sale</option>
                  <option value="expressions">Expressions of Interest</option>
                </select>

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
                      landSize: '',
                      yearBuilt: '',
                      auction: ''
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
            </div>
          )}
        </div>

        {/* Results Bar with Sort */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '20px',
          paddingBottom: '20px',
          display: isMobile ? 'none' : 'block'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '16px',
              color: '#666',
              fontWeight: '500'
            }}>
              {loading ? 'Loading...' : `${sortedProperties.length} properties for sale`}
            </span>

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
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bedrooms-high">Most Bedrooms</option>
              <option value="land-size">Largest Land</option>
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
          {loading && properties.length === 0 ? (
            <PropertySkeleton count={6} isMobile={isMobile} />
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
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
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
                  const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                  if (addressEl) addressEl.style.color = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  const addressEl = e.currentTarget.querySelector('.property-address') as HTMLElement;
                  if (addressEl) addressEl.style.color = '#000';
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
                          loading="lazy"
                          decoding="async"
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
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <svg style={{ width: '16px', height: '16px', color: 'rgb(153, 92, 0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p style={{
                          fontSize: '0.813rem',
                          color: 'rgb(153, 92, 0)',
                          fontWeight: '500'
                        }}>
                          {formatNextInspection(property.inspectionTimes) || 'Contact agent for inspection'}
                        </p>
                      </div>

                      {/* Auction Information */}
                      {(property.saleMethod === 'auction' || property.methodOfSale?.toLowerCase()?.includes('auction')) && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <svg style={{ width: '16px', height: '16px', color: 'rgb(153, 92, 0)' }} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 2l3 6 5-4-3 6.5c.33 2 1.5 3.14 2.5 3.5l-2.5 4.5c-.86 1.53-3 1-3-1l-2 .5c-1 .25-1.5-.75-1-1.5L6 10 4 8z"/>
                          </svg>
                          <p style={{
                            fontSize: '0.813rem',
                            color: 'rgb(153, 92, 0)',
                            fontWeight: '500'
                          }}>
                            {(property.auctionDate || property.auctionDetails?.dateTime) ? 
                              `Auction ${new Date(property.auctionDate || property.auctionDetails?.dateTime).toLocaleDateString('en-AU', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}` : 
                              'Auction details TBA'
                            }
                          </p>
                        </div>
                      )}

                      <p style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        marginTop: 'auto'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Load More */}
          {!loading && sortedProperties.length > 0 && sortedProperties.length >= currentLimit && (
            <div style={{
              textAlign: 'center',
              marginTop: '64px'
            }}>
              <button 
                onClick={() => setCurrentLimit(prev => prev + 12)}
                style={{
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
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px',
                        pointerEvents: 'none'
                      }}>$</span>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                        style={{
                          width: '100%',
                          paddingLeft: '28px',
                          paddingRight: '12px',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
                    <span>-</span>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <span style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#666',
                        fontSize: '16px',
                        pointerEvents: 'none'
                      }}>$</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                        style={{
                          width: '100%',
                          paddingLeft: '28px',
                          paddingRight: '12px',
                          paddingTop: '12px',
                          paddingBottom: '12px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      />
                    </div>
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
                    suburb: '',
                    landSize: '',
                    yearBuilt: '',
                    auction: ''
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