'use client';
// Force redeployment
import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import PropertySkeleton from '@/components/PropertySkeleton';

function OpenForInspectionPage() {
  const [openHomes, setOpenHomes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedDay, setSelectedDay] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('time');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

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
    fetchOpenHomes();
  }, []);

  const fetchOpenHomes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/open-homes');
      const data = await response.json();
      
      if (data.success) {
        setOpenHomes(data.openHomes);
      } else {
        setError(data.error || 'Failed to fetch open homes');
      }
    } catch (error) {
      console.error('Error fetching open homes:', error);
      setError('Unable to load open homes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: any) => {
    if (!price) return 'Price on application';
    
    if (typeof price === 'object') {
      if (price.from && price.to) {
        return `$${parseInt(price.from).toLocaleString()} - $${parseInt(price.to).toLocaleString()}`;
      }
      if (price.display) return price.display;
      if (price.from) return `From $${parseInt(price.from).toLocaleString()}`;
    }
    
    if (typeof price === 'string') {
      const numPrice = parseInt(price.replace(/[^0-9]/g, ''));
      if (!isNaN(numPrice) && numPrice > 0) {
        return `$${numPrice.toLocaleString()}`;
      }
      return price;
    }
    
    return 'Price on application';
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    const timeStr = date.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (isToday) return `Today ${timeStr}`;
    if (isTomorrow) return `Tomorrow ${timeStr}`;
    
    return date.toLocaleDateString('en-AU', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDayOfWeek = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'today';
    if (date.toDateString() === tomorrow.toDateString()) return 'tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  };

  const getUniqueSuburbs = () => {
    const suburbs = [...new Set(openHomes.map(home => home.property?.address?.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const filteredOpenHomes = openHomes
    .filter(home => {
      if (selectedDay !== 'all') {
        const dayOfWeek = getDayOfWeek(home.startTime);
        if (selectedDay !== dayOfWeek) return false;
      }
      
      if (selectedSuburb !== 'all') {
        const suburb = home.property?.address?.suburb;
        if (suburb !== selectedSuburb) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'time':
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        case 'suburb':
          return (a.property?.address?.suburb || '').localeCompare(b.property?.address?.suburb || '');
        case 'price':
          const priceA = a.property?.price?.from || a.property?.price || 0;
          const priceB = b.property?.price?.from || b.property?.price || 0;
          return parseInt(String(priceA).replace(/[^0-9]/g, '') || '0') - parseInt(String(priceB).replace(/[^0-9]/g, '') || '0');
        default:
          return 0;
      }
    });

  const getTimeStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return 'upcoming';
    if (now >= start && now <= end) return 'active';
    return 'ended';
  };

  return (
    <React.Fragment>
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
              Open for Inspection
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Discover your next home at our upcoming open inspections. Browse available properties and plan your visits.
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
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
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
                <option value="all">All Days</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>

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
                <option value="time">Sort by Time</option>
                <option value="suburb">Sort by Suburb</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>

            {/* Results Count */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              {loading ? 'Loading...' : `Showing ${filteredOpenHomes.length} open inspection${filteredOpenHomes.length !== 1 ? 's' : ''}`}
            </div>
          </div>
        </section>

        {/* Open Homes List */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {loading ? (
              <PropertySkeleton count={6} isMobile={isMobile} />
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#e74c3c'
                }}>
                  Unable to Load Open Inspections
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  marginBottom: '32px',
                  maxWidth: '500px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6'
                }}>
                  {error}
                </p>
                <button
                  onClick={fetchOpenHomes}
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    backgroundColor: '#002b7f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : filteredOpenHomes.length === 0 ? (
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
                  No Open Inspections Found
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6'
                }}>
                  There are currently no scheduled open inspections matching your criteria. Check back soon or contact us for private inspections.
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
                  Browse All Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: isMobile ? '16px' : '24px'
              }}>
                {filteredOpenHomes.map((openHome, index) => {
                  const property = openHome.property;
                  const status = getTimeStatus(openHome.startTime, openHome.endTime);
                  
                  return (
                    <Link
                      key={index}
                      href={`/property/${property?.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        flex: isMobile ? '0 0 85%' : '0 0 calc(33.333% - 16px)',
                        minWidth: isMobile ? '320px' : '380px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                        const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                        if (addressElement) {
                          addressElement.style.color = '#AF272F';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                        const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                        if (addressElement) {
                          addressElement.style.color = '#000';
                        }
                      }}>
                        {/* Image */}
                        <div style={{
                          position: 'relative',
                          paddingTop: '100%',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            left: '1.5rem',
                            right: '1.5rem',
                            bottom: '1.5rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            backgroundColor: '#f8f8f8'
                          }}>
                            {property?.images && property.images[0] ? (
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
                                backgroundColor: '#f8f8f8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#999'
                              }}>
                                No Image Available
                              </div>
                            )}
                          </div>
                          
                          {/* Inspection Time Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '1.5rem',
                            left: '1.5rem',
                            backgroundColor: 'rgba(0, 43, 127, 0.9)',
                            color: '#fff',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}>
                            Open {formatDateTime(openHome.startTime)}
                          </div>

                          {/* Save Property Button */}
                          <button style={{
                            position: 'absolute',
                            top: '2rem',
                            right: '2rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'all 0.3s ease'
                          }}>
                            ♡
                          </button>
                        </div>

                        {/* Content */}
                        <div style={{
                          padding: '1rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}>
                          {/* Suburb */}
                          <div style={{
                            fontSize: '12px',
                            color: '#666',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {property?.address?.suburb}
                          </div>

                          {/* Address */}
                          <h3 
                            data-property-address="true"
                            style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              margin: '0',
                              color: '#000',
                              lineHeight: '1.3',
                              transition: 'color 0.2s ease'
                            }}>
                            {property?.address?.street}
                          </h3>

                          {/* Property Features */}
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '4px'
                          }}>
                            {property?.bedrooms && <span>{property.bedrooms} bed</span>}
                            {property?.bathrooms && <span>{property.bathrooms} bath</span>}
                            {property?.carSpaces && <span>{property.carSpaces} car</span>}
                          </div>

                          {/* Price */}
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#000',
                            marginTop: '8px'
                          }}>
                            {formatPrice(property?.price)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          backgroundColor: '#f8f9fa',
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : isTablet ? '36px' : '40px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#000',
              letterSpacing: '-0.02em',
              lineHeight: '1.1'
            }}>
              Can't Make an Open Inspection?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Contact us to arrange a private inspection at a time that suits you.
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
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/buy"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #002b7f',
                  transition: 'all 0.3s ease'
                }}
              >
                Browse All Properties
              </Link>
            </div>
          </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default OpenForInspectionPage;