'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

export default function PropertySearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  
  // State for filters
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [bedrooms, setBedrooms] = useState<string>('any');
  const [bathrooms, setBathrooms] = useState<string>('any');
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [suburbs, setSuburbs] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'newest'>('relevance');
  
  const { properties, loading, error } = useProperties({ 
    type: filter,
    limit: 50 
  });

  // Filter properties based on search and filters
  const filteredProperties = properties.filter((property) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        property.address.toLowerCase().includes(query) ||
        property.suburb.toLowerCase().includes(query) ||
        property.postcode.includes(query) ||
        property.propertyType.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;
    }

    // Price range filter
    if (priceRange.min && parseInt(property.price) < parseInt(priceRange.min)) return false;
    if (priceRange.max && parseInt(property.price) > parseInt(priceRange.max)) return false;

    // Bedrooms filter
    if (bedrooms !== 'any' && property.bedrooms.toString() !== bedrooms) return false;

    // Bathrooms filter
    if (bathrooms !== 'any' && property.bathrooms.toString() !== bathrooms) return false;

    // Property type filter
    if (propertyTypes.length > 0 && !propertyTypes.includes(property.propertyType)) return false;

    // Suburb filter
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
        return 0; // Relevance - keep original order
    }
  });

  // Get unique suburbs from properties
  const uniqueSuburbs = [...new Set(properties.map(p => p.suburb))].sort();

  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '72px',
            gap: '48px'
          }}>
            {/* Logo */}
            <Link href="/" style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1a202c',
              textDecoration: 'none'
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
                    padding: '12px 48px 12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    backgroundColor: '#f7fafc'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    position: 'absolute',
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '8px 16px',
                    backgroundColor: '#3182ce',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </form>

            {/* Navigation Icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
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

      {/* Main Content */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px',
        display: 'flex',
        gap: '32px'
      }}>
        {/* Filters Sidebar */}
        <aside style={{
          width: '320px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '24px',
          height: 'fit-content',
          position: 'sticky',
          top: '96px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '600'
            }}>Filters</h2>
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
                color: '#3182ce',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear all
            </button>
          </div>

          {/* Property Type Filter */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Listing Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['all', 'sale', 'lease'].map((type) => (
                <label key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                  <input
                    type="radio"
                    name="listingType"
                    checked={filter === type}
                    onChange={() => setFilter(type as any)}
                    style={{
                      marginRight: '8px',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {type === 'all' ? 'All' : type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Price Range</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Bedrooms</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['any', '1', '2', '3', '4', '5+'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => setBedrooms(bed)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    backgroundColor: bedrooms === bed ? '#3182ce' : 'white',
                    color: bedrooms === bed ? 'white' : '#4a5568',
                    fontSize: '14px',
                    cursor: 'pointer'
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
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Bathrooms</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['any', '1', '2', '3', '4+'].map((bath) => (
                <button
                  key={bath}
                  onClick={() => setBathrooms(bath)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    backgroundColor: bathrooms === bath ? '#3182ce' : 'white',
                    color: bathrooms === bath ? 'white' : '#4a5568',
                    fontSize: '14px',
                    cursor: 'pointer'
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
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>Property Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['House', 'Apartment', 'Townhouse', 'Land', 'Unit'].map((type) => (
                <label key={type} style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
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
                      marginRight: '8px',
                      width: '16px',
                      height: '16px'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Suburbs */}
          {uniqueSuburbs.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>Suburbs</h3>
              <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {uniqueSuburbs.map((suburb) => (
                  <label key={suburb} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={suburbs.includes(suburb)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSuburbs([...suburbs, suburb]);
                        } else {
                          setSuburbs(suburbs.filter(s => s !== suburb));
                        }
                      }}
                      style={{
                        marginRight: '8px',
                        width: '16px',
                        height: '16px'
                      }}
                    />
                    <span style={{ fontSize: '14px' }}>{suburb}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Results Section */}
        <main style={{ flex: 1 }}>
          {/* Results Header */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <div>
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  {searchQuery ? `Search results for "${searchQuery}"` : 'All Properties'}
                </h1>
                <p style={{
                  color: '#718096',
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
                  padding: '8px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: 'white'
                }}
              >
                <option value="relevance">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Active Filters */}
            {(filter !== 'all' || priceRange.min || priceRange.max || bedrooms !== 'any' || 
              bathrooms !== 'any' || propertyTypes.length > 0 || suburbs.length > 0) && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {filter !== 'all' && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    backgroundColor: '#e6f2ff',
                    color: '#3182ce',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}>
                    {filter === 'sale' ? 'For Sale' : 'For Rent'}
                    <button
                      onClick={() => setFilter('all')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 4px'
                      }}
                    >
                      ×
                    </button>
                  </span>
                )}
                {bedrooms !== 'any' && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 12px',
                    backgroundColor: '#e6f2ff',
                    color: '#3182ce',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}>
                    {bedrooms} bed{bedrooms !== '1' ? 's' : ''}
                    <button
                      onClick={() => setBedrooms('any')}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0 4px'
                      }}
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Grid */}
          {loading ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '80px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid #e2e8f0',
                borderTopColor: '#3182ce',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 24px'
              }} />
              <p>Loading properties...</p>
            </div>
          ) : sortedProperties.length === 0 ? (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '80px',
              textAlign: 'center'
            }}>
              <svg
                width="64"
                height="64"
                fill="none"
                stroke="#cbd5e0"
                viewBox="0 0 24 24"
                style={{ margin: '0 auto 24px' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No properties found</h3>
              <p style={{ color: '#718096' }}>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {sortedProperties.map((property) => (
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
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                  >
                    {/* Property Image */}
                    <div style={{
                      position: 'relative',
                      paddingTop: '60%',
                      backgroundColor: '#f7fafc'
                    }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle save
                        }}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '36px',
                          height: '36px',
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
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div style={{ padding: '20px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {property.address}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: '#718096'
                        }}>
                          {property.suburb}, {property.state} {property.postcode}
                        </p>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        marginBottom: '12px',
                        fontSize: '14px',
                        color: '#4a5568'
                      }}>
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                        <span>{property.propertyType}</span>
                      </div>

                      <div style={{
                        fontSize: '20px',
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
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowMobileFilters(true)}
        style={{
          display: 'none',
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          padding: '16px',
          backgroundColor: '#3182ce',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer'
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}