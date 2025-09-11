'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

interface SavedProperty {
  id: string;
  address: string;
  suburb: string;
  state: string;
  price?: number | string;
  priceDisplay?: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  propertyType: string;
  listingType?: 'sale' | 'lease' | 'both';
  images?: any[];
}

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    suburb?: string;
    priceMin?: string;
    priceMax?: string;
    bedrooms?: string;
    bathrooms?: string;
    parking?: string;
    propertyType?: string;
    type?: 'sale' | 'lease';
  };
  createdAt: string;
  resultsCount?: number;
}

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<'properties' | 'searches'>('properties');
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = () => {
    try {
      // Load saved properties
      const savedPropsData = localStorage.getItem('savedPropertiesData');
      if (savedPropsData) {
        setSavedProperties(JSON.parse(savedPropsData));
      }

      // Load saved searches
      const savedSearchData = localStorage.getItem('savedSearches');
      if (savedSearchData) {
        setSavedSearches(JSON.parse(savedSearchData));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedProperty = (propertyId: string) => {
    const updatedProperties = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updatedProperties);
    localStorage.setItem('savedPropertiesData', JSON.stringify(updatedProperties));
    
    // Also update the savedProperties list
    const savedIds = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    const updatedIds = savedIds.filter((id: string) => id !== propertyId);
    localStorage.setItem('savedProperties', JSON.stringify(updatedIds));
  };

  const removeSavedSearch = (searchId: string) => {
    const updatedSearches = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const formatSearchFilters = (filters: SavedSearch['filters']) => {
    const parts = [];
    if (filters.suburb) parts.push(filters.suburb);
    if (filters.propertyType) parts.push(filters.propertyType);
    if (filters.bedrooms) parts.push(`${filters.bedrooms} beds`);
    if (filters.priceMin || filters.priceMax) {
      const min = filters.priceMin ? `$${parseInt(filters.priceMin).toLocaleString()}` : '';
      const max = filters.priceMax ? `$${parseInt(filters.priceMax).toLocaleString()}` : '';
      parts.push(min && max ? `${min} - ${max}` : min || max);
    }
    if (filters.type) parts.push(`For ${filters.type}`);
    return parts.join(' • ') || 'All properties';
  };

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Page Header */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '60px 0 40px'
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
            }}>Saved</h1>
            <p style={{
              fontSize: '18px',
              color: '#666'
            }}>
              Keep track of your favorite properties and searches
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          position: 'sticky',
          top: '64px',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            gap: '40px'
          }}>
            <button
              onClick={() => setActiveTab('properties')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'properties' ? '#000' : '#666'
              }}
            >
              Properties ({savedProperties.length})
              {activeTab === 'properties' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#000'
                }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('searches')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'searches' ? '#000' : '#666'
              }}
            >
              Searches ({savedSearches.length})
              {activeTab === 'searches' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#000'
                }} />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          padding: '40px'
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '80px 0'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid #f0f0f0',
                borderTop: '3px solid #000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : activeTab === 'properties' ? (
            savedProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 0'
              }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5" style={{ margin: '0 auto 24px' }}>
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>No saved properties yet</h2>
                <p style={{ color: '#666', marginBottom: '32px' }}>Start browsing and save properties you're interested in</p>
                <Link href="/buy" style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  Browse Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px'
              }}>
                {savedProperties.map((property) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <Link href={`/property/${property.id}`} style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#f5f5f5'
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSavedProperty(property.id);
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        border: '1px solid #e5e5e5',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            // Saved Searches Tab
            savedSearches.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 0'
              }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5" style={{ margin: '0 auto 24px' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>No saved searches yet</h2>
                <p style={{ color: '#666', marginBottom: '32px' }}>Save your search criteria to get notified of new listings</p>
                <Link href="/search" style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  Search Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: '16px'
              }}>
                {savedSearches.map((search) => (
                  <div key={search.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        {search.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}>
                        {formatSearchFilters(search.filters)}
                      </p>
                      <p style={{
                        fontSize: '12px',
                        color: '#999'
                      }}>
                        Created {new Date(search.createdAt).toLocaleDateString()}
                        {search.resultsCount !== undefined && ` • ${search.resultsCount} properties`}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}>
                      <Link 
                        href={`/search?${new URLSearchParams(Object.entries(search.filters).filter(([_, v]) => v).map(([k, v]) => [k, v as string])).toString()}`}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#000',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        View Results
                      </Link>
                      <button
                        onClick={() => removeSavedSearch(search.id)}
                        style={{
                          padding: '8px 20px',
                          backgroundColor: '#fff',
                          border: '1px solid #e5e5e5',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#fff';
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
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