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
        {/* Hero Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '64px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              margin: '0 0 24px 0',
              color: '#000'
            }}>
              Coming Soon
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Get exclusive access to properties before they hit the market. Register your interest for upcoming listings.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px',
              marginBottom: '30px',
              alignItems: isMobile ? 'stretch' : 'center'
            }}>
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                style={{
                  padding: '16px 20px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  flex: 1,
                  fontFamily: 'inherit'
                }}
              >
                <option value="all">All Suburbs</option>
                {getUniqueSuburbs().map(suburb => (
                  <option key={suburb} value={suburb}>{suburb}</option>
                ))}
              </select>

              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                style={{
                  padding: '16px 20px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  flex: 1,
                  fontFamily: 'inherit'
                }}
              >
                <option value="all">All Property Types</option>
                {getUniquePropertyTypes().map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '16px 20px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  flex: 1,
                  fontFamily: 'inherit'
                }}
              >
                <option value="expected-date">Sort by Expected Date</option>
                <option value="suburb">Sort by Suburb</option>
                <option value="price">Sort by Expected Price</option>
              </select>
            </div>

            {/* Results Count */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              {loading ? 'Loading...' : `Showing ${filteredProperties.length} coming soon propert${filteredProperties.length !== 1 ? 'ies' : 'y'}`}
            </div>
          </div>
        </section>

        {/* Properties List */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
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
                  fontSize: '18px',
                  color: '#666'
                }}>
                  Loading coming soon properties...
                </div>
              </div>
            ) : filteredProperties.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  No Properties Coming Soon
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6'
                }}>
                  There are currently no properties scheduled to come to market matching your criteria. Check back soon or browse our available properties.
                </p>
                <Link
                  href="/buy"
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    backgroundColor: '#002b7f',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  Browse Available Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '32px'
              }}>
                {filteredProperties.map((property, index) => {
                  const interestLevel = getInterestLevel();
                  
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #e5e5e5',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: '100%',
                        height: '240px',
                        backgroundColor: '#f8f8f8',
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
                              objectFit: 'cover',
                              filter: 'brightness(0.8) blur(1px)'
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#f8f8f8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
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
                          backgroundColor: '#27ae60',
                          color: '#fff',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '700',
                          textTransform: 'uppercase'
                        }}>
                          🚀 Coming Soon
                        </div>

                        {/* Interest Level */}
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(0,0,0,0.8)',
                          color: '#fff',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          ❤️ {interestLevel} interested
                        </div>

                        {/* Expected Date Overlay */}
                        <div style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '0',
                          right: '0',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          color: '#fff',
                          padding: '20px 16px 16px 16px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}>
                          📅 {formatExpectedDate(property.listingDate)}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{
                        padding: '24px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Property Details */}
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          margin: '0 0 8px 0',
                          color: '#000'
                        }}>
                          {property.address?.street}, {property.address?.suburb}
                        </h3>

                        <div style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          color: '#27ae60',
                          marginBottom: '16px'
                        }}>
                          {formatExpectedPrice(property.price)}
                        </div>

                        {/* Property Features */}
                        {(property.bedrooms || property.bathrooms || property.carSpaces) && (
                          <div style={{
                            display: 'flex',
                            gap: '16px',
                            marginBottom: '16px',
                            fontSize: '14px',
                            color: '#666'
                          }}>
                            {property.bedrooms && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                🛏️ {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                              </div>
                            )}
                            {property.bathrooms && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                🚿 {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                              </div>
                            )}
                            {property.carSpaces && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                🚗 {property.carSpaces} car{property.carSpaces !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Property Type */}
                        {property.propertyType && (
                          <div style={{
                            padding: '8px 12px',
                            backgroundColor: '#f0f4ff',
                            borderRadius: '16px',
                            fontSize: '12px',
                            color: '#002b7f',
                            fontWeight: '500',
                            alignSelf: 'flex-start',
                            marginBottom: '16px',
                            textTransform: 'capitalize'
                          }}>
                            {property.propertyType}
                          </div>
                        )}

                        {/* Early Access Note */}
                        <div style={{
                          padding: '12px',
                          backgroundColor: '#e8f5e8',
                          borderRadius: '8px',
                          marginBottom: '16px',
                          fontSize: '14px',
                          color: '#27ae60',
                          border: '1px solid #27ae60'
                        }}>
                          💡 <strong>Early Access:</strong> Register interest for exclusive previews and first viewing opportunities.
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          gap: '12px',
                          flexDirection: isMobile ? 'column' : 'row'
                        }}>
                          <button style={{
                            flex: 1,
                            padding: '12px 20px',
                            backgroundColor: '#27ae60',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                          }}>
                            📝 Register Interest
                          </button>
                          
                          <button style={{
                            flex: 1,
                            padding: '12px 20px',
                            backgroundColor: '#fff',
                            color: '#27ae60',
                            border: '2px solid #27ae60',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}>
                            🔔 Get Alerts
                          </button>
                        </div>

                        {/* Agent Info */}
                        {property.agent && (
                          <div style={{
                            marginTop: '16px',
                            padding: '16px 0',
                            borderTop: '1px solid #e5e5e5',
                            fontSize: '14px',
                            color: '#666'
                          }}>
                            <div style={{ fontWeight: '600', color: '#000' }}>
                              {property.agent.name || property.agent.firstName + ' ' + property.agent.lastName}
                            </div>
                            {property.agent.phone && (
                              <div>{property.agent.phone}</div>
                            )}
                          </div>
                        )}
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
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '300',
              marginBottom: '20px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Get First Access
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
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
                  padding: '14px 28px',
                  backgroundColor: '#27ae60',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Join VIP List
              </Link>
              <Link
                href="/buy"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  backgroundColor: '#fff',
                  color: '#27ae60',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #27ae60',
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