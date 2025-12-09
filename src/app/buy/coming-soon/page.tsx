'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function ComingSoonPage() {
  const [comingSoonProperties, setComingSoonProperties] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [selectedPropertyType, setSelectedPropertyType] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('expected-date');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  React.useEffect(() => {
    fetchComingSoonProperties();
  }, []);

  const fetchComingSoonProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/properties');
      const data = await response.json();
      
      if (data.success) {
        // Filter for properties that are coming soon or off-market
        const comingSoon = data.properties.filter((property: any) => 
          property.status === 'coming-soon' || 
          property.status === 'off-market' ||
          property.listingStatus === 'coming-soon' ||
          property.preMarket === true ||
          (property.listingDate && new Date(property.listingDate) > new Date())
        );
        setComingSoonProperties(comingSoon);
      }
    } catch (error) {
      console.error('Error fetching coming soon properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatExpectedPrice = (price: any) => {
    if (!price) return 'Price to be advised';
    
    if (typeof price === 'object') {
      if (price.from && price.to) {
        return `Expected $${parseInt(price.from).toLocaleString()} - $${parseInt(price.to).toLocaleString()}`;
      }
      if (price.display) return `Expected ${price.display}`;
      if (price.from) return `Expected from $${parseInt(price.from).toLocaleString()}`;
    }
    
    if (typeof price === 'string') {
      const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
      if (!isNaN(numPrice) && numPrice > 0) {
        return `Expected $${numPrice.toLocaleString()}`;
      }
      return `Expected ${price}`;
    }
    
    return 'Price to be advised';
  };

  const formatExpectedDate = (date: string | null) => {
    if (!date) return 'Date to be confirmed';
    
    const expectedDate = new Date(date);
    const today = new Date();
    const timeDifference = expectedDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    if (daysDifference <= 0) return 'Available now';
    if (daysDifference <= 7) return `Expected ${daysDifference} day${daysDifference !== 1 ? 's' : ''}`;
    if (daysDifference <= 30) return `Expected ${Math.ceil(daysDifference / 7)} week${Math.ceil(daysDifference / 7) !== 1 ? 's' : ''}`;
    
    return expectedDate.toLocaleDateString('en-AU', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getUniqueSuburbs = () => {
    const suburbs = [...new Set(comingSoonProperties.map(property => property.address?.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const getUniquePropertyTypes = () => {
    const types = [...new Set(comingSoonProperties.map(property => property.propertyType).filter(Boolean))];
    return types.sort();
  };

  const filteredProperties = comingSoonProperties
    .filter(property => {
      if (selectedSuburb !== 'all') {
        const suburb = property.address?.suburb;
        if (suburb !== selectedSuburb) return false;
      }
      
      if (selectedPropertyType !== 'all') {
        if (property.propertyType !== selectedPropertyType) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'expected-date':
          const dateA = a.listingDate ? new Date(a.listingDate).getTime() : Date.now() + 365 * 24 * 60 * 60 * 1000;
          const dateB = b.listingDate ? new Date(b.listingDate).getTime() : Date.now() + 365 * 24 * 60 * 60 * 1000;
          return dateA - dateB;
        case 'suburb':
          return (a.address?.suburb || '').localeCompare(b.address?.suburb || '');
        case 'price':
          const priceA = a.price?.from || a.price || 0;
          const priceB = b.price?.from || b.price || 0;
          return parseInt(String(priceA).replace(/[^0-9]/g, '') || '0') - parseInt(String(priceB).replace(/[^0-9]/g, '') || '0');
        default:
          return 0;
      }
    });

  const getInterestLevel = () => {
    // Simulate interest level based on property features
    return Math.floor(Math.random() * 20) + 5;
  };

  return (
    <>
      <OncomHeader />
      
      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - on.com Style */}
        <section style={{
          padding: isMobile ? '60px 20px 40px' : '80px max(2rem, 3.33vw) 60px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : '72px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              color: '#000'
            }}>
              Coming Soon
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Get exclusive access to properties before they hit the market. Register your interest for upcoming listings.
            </p>
          </div>
        </section>

        {/* Filters - on.com Style */}
        <section style={{
          padding: isMobile ? '20px 20px 30px' : '0 max(2rem, 3.33vw) 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '12px',
              marginBottom: '24px',
              alignItems: isMobile ? 'stretch' : 'center',
              flexWrap: 'wrap'
            }}>
              {/* Suburb Filter */}
              <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '180px' }}>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    padding: '14px 44px 14px 20px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    width: '100%',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    color: '#000'
                  }}
                >
                  <option value="all">All Suburbs</option>
                  {getUniqueSuburbs().map(suburb => (
                    <option key={suburb} value={suburb}>{suburb}</option>
                  ))}
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Property Type Filter */}
              <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '180px' }}>
                <select
                  value={selectedPropertyType}
                  onChange={(e) => setSelectedPropertyType(e.target.value)}
                  style={{
                    padding: '14px 44px 14px 20px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    width: '100%',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    color: '#000'
                  }}
                >
                  <option value="all">All Types</option>
                  {getUniquePropertyTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Sort Filter */}
              <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '200px' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '14px 44px 14px 20px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    width: '100%',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    color: '#000'
                  }}
                >
                  <option value="expected-date">Sort by Date</option>
                  <option value="suburb">Sort by Suburb</option>
                  <option value="price">Sort by Price</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Results Count */}
            <div style={{
              fontSize: '14px',
              color: '#666',
              fontWeight: '400'
            }}>
              {loading ? 'Loading...' : `${filteredProperties.length} coming soon propert${filteredProperties.length !== 1 ? 'ies' : 'y'}`}
            </div>
          </div>
        </section>

        {/* Properties List */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px'
              }}>
                <div style={{
                  fontSize: '16px',
                  color: '#666'
                }}>
                  Loading coming soon properties...
                </div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '100px 20px',
                color: '#666'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  No Properties Coming Soon
                </h3>
                <p style={{
                  fontSize: '16px',
                  marginBottom: '32px',
                  maxWidth: '450px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  There are currently no properties scheduled to come to market matching your criteria. Check back soon or browse our available properties.
                </p>
                <Link
                  href="/buy"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  Browse Available Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '24px' : '24px'
              }}>
                {filteredProperties.map((property, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        backgroundColor: '#f5f5f5',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={property.images[0]}
                            alt={`${property.address?.street}, ${property.address?.suburb}`}
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
                            backgroundColor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '14px'
                          }}>
                            Coming Soon
                          </div>
                        )}

                        {/* Coming Soon Badge */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          padding: '8px 16px',
                          backgroundColor: '#000',
                          color: '#fff',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Coming Soon
                        </div>

                        {/* Expected Date Badge */}
                        {property.listingDate && (
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '8px 16px',
                            backgroundColor: '#D4A853',
                            color: '#fff',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: '500',
                            letterSpacing: '0.05em'
                          }}>
                            {formatExpectedDate(property.listingDate)}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{
                        padding: '20px 0',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Property Type */}
                        {property.propertyType && (
                          <div style={{
                            fontSize: '13px',
                            color: '#666',
                            marginBottom: '8px',
                            textTransform: 'capitalize'
                          }}>
                            {property.propertyType}
                          </div>
                        )}

                        {/* Property Address */}
                        <h3
                          style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            margin: '0 0 8px 0',
                            color: '#000',
                            transition: 'color 0.2s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#AF272F';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#000';
                          }}
                        >
                          {property.address?.street}, {property.address?.suburb}
                        </h3>

                        {/* Price Guide */}
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          color: '#000',
                          marginBottom: '12px'
                        }}>
                          {formatExpectedPrice(property.price)}
                        </div>

                        {/* Property Features */}
                        {(property.bedrooms || property.bathrooms || property.carSpaces) && (
                          <div style={{
                            display: 'flex',
                            gap: '16px',
                            fontSize: '14px',
                            color: '#666',
                            marginBottom: '16px'
                          }}>
                            {property.bedrooms && (
                              <span>{property.bedrooms} bed</span>
                            )}
                            {property.bathrooms && (
                              <span>{property.bathrooms} bath</span>
                            )}
                            {property.carSpaces && (
                              <span>{property.carSpaces} car</span>
                            )}
                          </div>
                        )}

                        {/* Register Interest Button */}
                        <button
                          style={{
                            marginTop: 'auto',
                            padding: '14px 24px',
                            backgroundColor: '#000',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '100px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'opacity 0.3s ease',
                            width: '100%'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.8';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                        >
                          Register Interest
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          backgroundColor: '#f9f9f9',
          padding: isMobile ? '80px 20px' : '120px max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Get First Access
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Join our VIP list to receive exclusive notifications about new properties before they're publicly listed.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '16px',
              justifyContent: 'center'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'opacity 0.3s ease'
                }}
              >
                Join VIP List
              </Link>
              <Link
                href="/buy"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: '1px solid #000',
                  transition: 'all 0.3s ease'
                }}
              >
                Browse Available Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ComingSoonPage;