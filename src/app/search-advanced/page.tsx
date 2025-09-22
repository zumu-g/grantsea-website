'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import SavePropertyButton from '@/components/SavePropertyButton';

interface AdvancedFilters {
  // Basic filters
  listingType: 'all' | 'sale' | 'lease';
  suburb: string[];
  propertyType: string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number[];
  bathrooms?: number[];
  parking?: number;

  // Advanced filters
  schoolZone?: string[];
  distanceToStation?: number;
  nbnAvailable?: boolean;
  petFriendly?: boolean;
  landSize?: { min?: number; max?: number };
  yearBuilt?: { min?: number; max?: number };
  openHomeOnly?: boolean;
  auctionOnly?: boolean;
  newListingsOnly?: boolean;
  priceReduced?: boolean;

  // Lifestyle filters
  pool?: boolean;
  gym?: boolean;
  securityGated?: boolean;
  waterViews?: boolean;
  parkNearby?: boolean;
}

export default function AdvancedSearchPage() {
  const [filters, setFilters] = useState<AdvancedFilters>({
    listingType: 'all',
    suburb: [],
    propertyType: []
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { properties, loading } = useProperties();

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const suburbs = [
    'Berwick', 'Narre Warren', 'Cranbourne', 'Pakenham', 'Officer',
    'Clyde', 'Clyde North', 'Hallam', 'Hampton Park', 'Endeavour Hills',
    'Beaconsfield', 'Beaconsfield Upper', 'Garfield', 'Harkaway', 'Koo Wee Rup'
  ];

  const propertyTypes = [
    'House', 'Unit', 'Apartment', 'Townhouse', 'Villa', 'Land', 'Acreage', 'Rural'
  ];

  const schools = [
    'Berwick College', 'Nossal High School', 'Kambrya College',
    'Alkira Secondary College', 'Narre Warren South P-12', 'Hillcrest Christian College'
  ];

  const trainStations = [
    'Berwick Station', 'Narre Warren Station', 'Hallam Station',
    'Pakenham Station', 'Cardinia Road Station'
  ];

  // Filter properties based on selected criteria
  const filteredProperties = properties.filter(property => {
    if (filters.listingType !== 'all' && property.listingType !== filters.listingType) {
      return false;
    }
    if (filters.suburb.length > 0 && !filters.suburb.includes(property.suburb)) {
      return false;
    }
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.propertyType)) {
      return false;
    }
    // Add more filter logic here
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
        {/* Search Header */}
        <div style={{
          padding: isMobile ? '20px' : '40px',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '700',
            marginBottom: '8px',
            letterSpacing: '-0.02em'
          }}>
            Advanced Property Search
          </h1>
          <p style={{
            color: '#666',
            fontSize: '16px'
          }}>
            Find your perfect property with detailed filters
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '32px'
        }}>
          {/* Filters Sidebar */}
          <aside style={{
            width: isMobile ? '100%' : '320px',
            padding: '24px',
            borderRight: isMobile ? 'none' : '1px solid #e5e5e5',
            height: isMobile ? 'auto' : 'calc(100vh - 200px)',
            overflowY: 'auto',
            position: isMobile ? 'relative' : 'sticky',
            top: '200px'
          }}>
            {/* Listing Type */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Listing Type
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['all', 'sale', 'lease'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilters({ ...filters, listingType: type as any })}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      backgroundColor: filters.listingType === type ? '#000' : '#fff',
                      color: filters.listingType === type ? '#fff' : '#000',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type === 'all' ? 'All' : type === 'sale' ? 'Buy' : 'Rent'}
                  </button>
                ))}
              </div>
            </div>

            {/* Suburbs */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Suburbs
              </h3>
              <div style={{
                maxHeight: '200px',
                overflowY: 'auto',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '8px'
              }}>
                {suburbs.map(suburb => (
                  <label
                    key={suburb}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <input
                      type="checkbox"
                      checked={filters.suburb.includes(suburb)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, suburb: [...filters.suburb, suburb] });
                        } else {
                          setFilters({ ...filters, suburb: filters.suburb.filter(s => s !== suburb) });
                        }
                      }}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '14px' }}>{suburb}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* School Zones */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                🏫 School Zones
              </h3>
              <select
                multiple
                value={filters.schoolZone || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setFilters({ ...filters, schoolZone: selected });
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  minHeight: '100px',
                  fontSize: '14px'
                }}
              >
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            {/* Distance to Station */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                🚂 Distance to Station
              </h3>
              <input
                type="range"
                min="0"
                max="5000"
                step="500"
                value={filters.distanceToStation || 5000}
                onChange={(e) => setFilters({ ...filters, distanceToStation: Number(e.target.value) })}
                style={{ width: '100%' }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#666',
                marginTop: '4px'
              }}>
                <span>Any</span>
                <span>{filters.distanceToStation ? `${filters.distanceToStation}m` : 'Any'}</span>
              </div>
            </div>

            {/* NBN & Pet Friendly */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                Features
              </h3>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={filters.nbnAvailable}
                  onChange={(e) => setFilters({ ...filters, nbnAvailable: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>🌐 NBN Available</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={filters.petFriendly}
                  onChange={(e) => setFilters({ ...filters, petFriendly: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>🐕 Pet Friendly</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={filters.openHomeOnly}
                  onChange={(e) => setFilters({ ...filters, openHomeOnly: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>🏠 Open Homes This Week</span>
              </label>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={filters.priceReduced}
                  onChange={(e) => setFilters({ ...filters, priceReduced: e.target.checked })}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>💰 Price Reduced</span>
              </label>
            </div>

            {/* Show More Filters */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                backgroundColor: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              {showMoreFilters ? 'Show Less' : 'Show More Filters'}
            </button>

            {showMoreFilters && (
              <>
                {/* Lifestyle Features */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    Lifestyle Features
                  </h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {[
                      { key: 'pool', label: '🏊 Swimming Pool' },
                      { key: 'gym', label: '💪 Gym/Fitness' },
                      { key: 'securityGated', label: '🔒 Security Gated' },
                      { key: 'waterViews', label: '🌊 Water Views' },
                      { key: 'parkNearby', label: '🌳 Park Nearby' }
                    ].map(feature => (
                      <label
                        key={feature.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters[feature.key as keyof AdvancedFilters] as boolean}
                          onChange={(e) => setFilters({ ...filters, [feature.key]: e.target.checked })}
                          style={{ marginRight: '8px' }}
                        />
                        <span style={{ fontSize: '14px' }}>{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Reset Filters */}
            <button
              onClick={() => setFilters({
                listingType: 'all',
                suburb: [],
                propertyType: []
              })}
              style={{
                width: '100%',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Reset All Filters
            </button>
          </aside>

          {/* Results */}
          <div style={{
            flex: 1,
            padding: '24px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <p style={{
                fontSize: '16px',
                color: '#666'
              }}>
                Found {filteredProperties.length} properties
              </p>
              <select
                style={{
                  padding: '8px 16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option>Most Relevant</option>
                <option>Price (Low to High)</option>
                <option>Price (High to Low)</option>
                <option>Newest First</option>
                <option>Largest First</option>
              </select>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '48px' }}>
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
            ) : filteredProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                  No properties found
                </h3>
                <p style={{ color: '#666' }}>
                  Try adjusting your filters to see more results
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '24px'
              }}>
                {filteredProperties.map(property => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #e5e5e5',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      height: '200px',
                      backgroundColor: '#f5f5f5'
                    }}>
                      {property.images?.[0] && (
                        <Image
                          src={property.images[0].url}
                          alt={property.headline || 'Property'}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      )}
                      <SavePropertyButton
                        propertyId={property.id}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px'
                        }}
                      />
                    </div>
                    <div style={{ padding: '16px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '4px'
                      }}>
                        {property.headline}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px'
                      }}>
                        {property.address?.suburb}
                      </p>
                      <p style={{
                        fontSize: '20px',
                        fontWeight: '700'
                      }}>
                        {property.priceDisplay || 'Contact Agent'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}