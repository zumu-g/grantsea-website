'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function PropertySearchPageOncomStyle() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  // State for filters
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [bathrooms, setBathrooms] = useState<string>('any');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'newest'>('relevance');
  
  const { properties, loading, error } = useProperties({ 
    type: filter,
    limit: 50 
  });

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        property.address.toLowerCase().includes(query) ||
        property.suburb.toLowerCase().includes(query) ||
        property.postcode.includes(query) ||
        property.propertyType.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    if (priceRange.min && parseInt(property.price) < parseInt(priceRange.min)) return false;
    if (priceRange.max && parseInt(property.price) > parseInt(priceRange.max)) return false;
    if (bedrooms !== 'any' && property.bedrooms.toString() !== bedrooms) return false;
    if (bathrooms !== 'any' && property.bathrooms.toString() !== bathrooms) return false;
    if (propertyTypes.length > 0 && !propertyTypes.includes(property.propertyType)) return false;
    if (suburbs.length > 0 && !suburbs.includes(property.suburb)) return false;

    return true;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseInt(a.price) - parseInt(b.price);
      case 'price-desc':
        return parseInt(b.price) - parseInt(a.price);
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  // Get unique suburbs from properties
  const uniqueSuburbs = [...new Set(properties.map(p => p.suburb))].sort();

  // Close filters on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFilters) {
        setShowFilters(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showFilters]);

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      {/* Overlay */}
      {showFilters && (
        <div
          onClick={() => setShowFilters(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 49,
            cursor: 'pointer'
          }}
        />
      )}

      {/* Slide-out Filter Panel */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: showFilters ? 0 : '-400px',
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        transition: 'left 0.3s ease-out',
        zIndex: 50,
        overflowY: 'auto'
      }}>
        {/* Filter Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: 0
          }}>Filters</h2>
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

        <div style={{ padding: '24px' }}>
          {/* Listing Type */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Listing Type</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['all', 'sale', 'lease'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '24px',
                    backgroundColor: filter === type ? '#000' : 'transparent',
                    color: filter === type ? '#fff' : '#000',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {type === 'all' ? 'All' : type === 'sale' ? 'For Sale' : 'For Rent'}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Price Range</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <span style={{ color: '#999' }}>—</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Bedrooms</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['any', '1', '2', '3', '4', '5+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => setBedrooms(bed)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '24px',
                    backgroundColor: bedrooms === bed ? '#000' : 'transparent',
                    color: bedrooms === bed ? '#fff' : '#000',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {bed === 'any' ? 'Any' : bed}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Bathrooms</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['any', '1', '2', '3', '4+'].map((bath) => (
                <button
                  key={bath}
                  onClick={() => setBathrooms(bath)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '24px',
                    backgroundColor: bathrooms === bath ? '#000' : 'transparent',
                    color: bathrooms === bath ? '#fff' : '#000',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {bath === 'any' ? 'Any' : bath}
                </button>
              ))}
            </div>
          </div>

          {/* Property Types */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Property Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['House', 'Apartment', 'Townhouse', 'Land', 'Unit'].map((type) => (
                <label key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  <input
                    type="checkbox"
                    checked={propertyTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPropertyTypes([...propertyTypes, type]);
                      } else {
                        setPropertyTypes(propertyTypes.filter(t => t !== type));
                      }
                    }}
                    style={{
                      marginRight: '12px',
                      width: '18px',
                      height: '18px',
                      cursor: 'pointer'
                    }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear All Button */}
          <button
            onClick={() => {
              setFilter('all');
              setPriceRange({ min: '', max: '' });
              setBedrooms('any');
              setBathrooms('any');
              setPropertyTypes([]);
              setSuburbs([]);
            }}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #000',
              borderRadius: '24px',
              backgroundColor: 'transparent',
              color: '#000',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e5e5',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '64px',
            gap: '40px'
          }}>
            {/* Logo */}
            <Link href="/" style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#000',
              textDecoration: 'none',
              letterSpacing: '-0.5px'
            }}>
              Grant's Estate Agents
            </Link>

            {/* Search Bar */}
            <form style={{
              flex: 1,
              maxWidth: '600px'
            }}>
              <div style={{
                position: 'relative'
              }}>
                <input
                  type="text"
                  defaultValue={searchQuery}
                  placeholder="Search by suburb, postcode, or address..."
                  style={{
                    width: '100%',
                    padding: '10px 48px 10px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '24px',
                    fontSize: '14px',
                    backgroundColor: '#f8f8f8'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '6px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Right Navigation */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
              <Link href="/saved-properties" style={{
                padding: '8px',
                color: '#000'
              }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              <Link href="/profile" style={{
                padding: '8px',
                color: '#000'
              }}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Results Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setShowFilters(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                border: '1px solid #e5e5e5',
                borderRadius: '24px',
                backgroundColor: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
            <p style={{
              color: '#666',
              fontSize: '14px'
            }}>
              {sortedProperties.length} properties found
            </p>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '10px 16px',
              border: '1px solid #e5e5e5',
              borderRadius: '24px',
              fontSize: '14px',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="relevance">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid #f3f4f6',
              borderTopColor: '#000',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        ) : sortedProperties.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px'
          }}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: '500' }}>No properties found</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {sortedProperties.map((property) => (
              <div
                key={property.id}
                style={{
                  position: 'relative'
                }}
              >
                <article 
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    const propertyUrl = `/property/${property.id}`;
                    window.location.href = propertyUrl;
                  }}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Property Image */}
                  <div style={{
                    position: 'relative',
                    paddingTop: '66.67%',
                    backgroundColor: '#f8f8f8'
                  }}>
                    {/* Save Button */}
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '36px',
                        height: '36px',
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

                    {/* Status Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      padding: '4px 12px',
                      backgroundColor: property.listingType === 'lease' ? '#000' : '#666',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {property.listingType === 'lease' ? 'For Rent' : 'For Sale'}
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
                        color: '#ccc',
                        fontSize: '14px'
                      }}>
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div style={{ padding: '20px' }}>
                    {/* Price */}
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      letterSpacing: '-0.5px'
                    }}>
                      {property.listingType === 'lease' 
                        ? (property.leasePriceDisplay || `$${property.leasePrice} per week`)
                        : (property.priceDisplay || formatPrice(property.price))}
                    </div>

                    {/* Address */}
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      marginBottom: '4px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {property.address}
                    </h3>

                    {/* Suburb */}
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '12px'
                    }}>
                      {property.suburb}, {property.state} {property.postcode}
                    </p>

                    {/* Features */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.carSpaces} car</span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}