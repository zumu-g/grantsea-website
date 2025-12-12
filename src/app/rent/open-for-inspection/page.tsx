'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function RentOpenForInspectionPage() {
  const [properties, setProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedDay, setSelectedDay] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('time');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  React.useEffect(() => {
    fetchLeaseProperties();
  }, []);

  const fetchLeaseProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch lease properties from the API
      const response = await fetch('/api/properties?type=lease');
      const data = await response.json();

      if (data.properties && Array.isArray(data.properties)) {
        // Filter to only show lease properties with inspections
        const leaseProps = data.properties.filter((p: any) =>
          p.listingType === 'lease' || p.category === 'lease'
        );
        setProperties(leaseProps);
      } else {
        setError('Failed to fetch rental properties');
      }
    } catch (error) {
      console.error('Error fetching rental properties:', error);
      setError('Unable to load rental properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatRentPrice = (property: any) => {
    // Check various price fields for rental properties
    const price = property.price || property.priceDisplay;

    if (!price) return 'Price on Application';

    if (typeof price === 'string') {
      if (price.toLowerCase().includes('per week') || price.toLowerCase().includes('pw') || price.toLowerCase().includes('p/w')) {
        return price;
      }
      const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
      if (!isNaN(numPrice) && numPrice > 0 && numPrice < 5000) {
        return `$${numPrice} per week`;
      }
      return price;
    }

    if (typeof price === 'object') {
      if (price.display) return price.display;
      if (price.from) return `$${parseInt(price.from).toLocaleString()} per week`;
    }

    return 'Price on Application';
  };

  const getUniqueSuburbs = () => {
    const suburbs = [...new Set(properties.map(p => p.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const filteredProperties = properties
    .filter(property => {
      if (selectedSuburb !== 'all') {
        if (property.suburb !== selectedSuburb) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'suburb':
          return (a.suburb || '').localeCompare(b.suburb || '');
        case 'price':
          const priceA = parseInt(String(a.price || '0').replace(/[^0-9]/g, '') || '0');
          const priceB = parseInt(String(b.price || '0').replace(/[^0-9]/g, '') || '0');
          return priceA - priceB;
        case 'bedrooms':
          return (b.bedrooms || 0) - (a.bedrooms || 0);
        default:
          return 0;
      }
    });

  return (
    <React.Fragment>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section - Minimalist on.com style */}
        <section style={{
          padding: isMobile ? '60px 20px 40px' : '80px max(2rem, 3.33vw) 60px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : isTablet ? '56px' : '72px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              color: '#000'
            }}>
              Rental Inspections
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Browse our available rental properties in the Casey & Cardinia region
            </p>
          </div>
        </section>

        {/* Filter Bar - Clean minimal design */}
        <section style={{
          padding: isMobile ? '0 20px 32px' : '0 max(2rem, 3.33vw) 48px',
          backgroundColor: '#fff',
          position: 'sticky',
          top: isMobile ? '60px' : '80px',
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e5e5e5',
            backgroundColor: '#fff'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '12px' : '16px',
              alignItems: isMobile ? 'stretch' : 'center',
              flexWrap: 'wrap'
            }}>
              {/* Suburb Filter */}
              <div style={{ position: 'relative', flex: isMobile ? '1' : '0 0 auto' }}>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    minWidth: '160px',
                    color: '#000'
                  }}
                >
                  <option value="all">All Suburbs</option>
                  {getUniqueSuburbs().map(suburb => (
                    <option key={suburb} value={suburb}>{suburb}</option>
                  ))}
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Sort By */}
              <div style={{ position: 'relative', flex: isMobile ? '1' : '0 0 auto' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    minWidth: '140px',
                    color: '#000'
                  }}
                >
                  <option value="time">Featured</option>
                  <option value="suburb">Suburb</option>
                  <option value="price">Rent (Low to High)</option>
                  <option value="bedrooms">Bedrooms</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Results Count - Right aligned on desktop */}
              <div style={{
                marginLeft: isMobile ? '0' : 'auto',
                fontSize: '14px',
                color: '#666',
                fontWeight: '500'
              }}>
                {loading ? 'Loading...' : `${filteredProperties.length} rental${filteredProperties.length !== 1 ? 's' : ''} available`}
              </div>
            </div>
          </div>
        </section>

        {/* Properties List */}
        <section style={{
          padding: isMobile ? '20px 20px 60px' : '20px max(2rem, 3.33vw) 80px'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            {loading ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} style={{
                    backgroundColor: '#f8f8f8',
                    borderRadius: '12px',
                    height: '420px',
                    animation: 'pulse 2s infinite'
                  }} />
                ))}
              </div>
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '100px 20px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#AF272F" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Unable to Load Rentals
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px',
                  lineHeight: '1.6'
                }}>
                  {error}
                </p>
                <button
                  onClick={fetchLeaseProperties}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6"></path>
                    <path d="M1 20v-6h6"></path>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  Try Again
                </button>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '100px 20px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  No Rentals Available
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px',
                  lineHeight: '1.6'
                }}>
                  There are currently no rental properties matching your criteria. Try adjusting your filters or contact us for assistance.
                </p>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <Link
                    href="/rent"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '14px 32px',
                      backgroundColor: '#000',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'opacity 0.2s'
                    }}
                  >
                    Browse All Rentals
                  </Link>
                  <Link
                    href="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '14px 32px',
                      backgroundColor: '#fff',
                      color: '#000',
                      textDecoration: 'none',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '600',
                      border: '1px solid #e5e5e5',
                      transition: 'border-color 0.2s'
                    }}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {filteredProperties.map((property: any, index: number) => (
                  <Link
                    key={property.id || index}
                    href={`/property/${property.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <article
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                        const addressEl = e.currentTarget.querySelector('[data-address]') as HTMLElement;
                        if (addressEl) addressEl.style.color = '#AF272F';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        const addressEl = e.currentTarget.querySelector('[data-address]') as HTMLElement;
                        if (addressEl) addressEl.style.color = '#000';
                      }}
                    >
                      {/* Image Container */}
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#f8f8f8',
                        overflow: 'hidden'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address || 'Property'}
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
                            color: '#999',
                            fontSize: '14px'
                          }}>
                            No Image
                          </div>
                        )}

                        {/* For Lease Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#AF272F',
                          color: '#fff',
                          padding: '8px 14px',
                          borderRadius: '100px',
                          fontSize: '13px',
                          fontWeight: '600'
                        }}>
                          For Lease
                        </div>

                        {/* Save Button */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px'
                        }}>
                          <div
                            onClick={(e) => e.preventDefault()}
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'transform 0.2s'
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '20px' }}>
                        {/* Suburb */}
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: '500',
                          margin: '0 0 6px 0'
                        }}>
                          {property.suburb}
                        </p>

                        {/* Address */}
                        <h3
                          data-address="true"
                          style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            margin: '0 0 12px 0',
                            color: '#000',
                            lineHeight: '1.3',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          {property.address}
                        </h3>

                        {/* Features */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '16px',
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '16px'
                        }}>
                          {property.bedrooms && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 12h18M3 12v8h18v-8M3 12V8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4M9 12V8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4M15 12V8c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v4"></path>
                              </svg>
                              {property.bedrooms}
                            </span>
                          )}
                          {property.bathrooms && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zM6 12V5a2 2 0 0 1 2-2h3v2.25"></path>
                                <circle cx="9" cy="6" r=".5" fill="currentColor"></circle>
                              </svg>
                              {property.bathrooms}
                            </span>
                          )}
                          {property.carSpaces && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M5 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                                <path d="M5 15H3a1 1 0 0 1-1-1v-3.5a.5.5 0 0 1 .5-.5h2l2-4h9l2 4h2a.5.5 0 0 1 .5.5V14a1 1 0 0 1-1 1h-2M7 15h10"></path>
                              </svg>
                              {property.carSpaces}
                            </span>
                          )}
                          {property.propertyType && (
                            <span style={{ color: '#999' }}>
                              {property.propertyType}
                            </span>
                          )}
                        </div>

                        {/* Price */}
                        <p style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#000',
                          margin: 0
                        }}>
                          {formatRentPrice(property)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action - Clean minimalist */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#000',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Looking for something specific?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Contact us to discuss your rental requirements and we'll help you find the perfect property.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 36px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'opacity 0.2s'
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/rent"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 36px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '1px solid #e5e5e5',
                  transition: 'border-color 0.2s'
                }}
              >
                View All Rentals
              </Link>
            </div>
          </div>
        </section>

        {/* CSS Keyframes */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </main>
    </React.Fragment>
  );
}

export default RentOpenForInspectionPage;
