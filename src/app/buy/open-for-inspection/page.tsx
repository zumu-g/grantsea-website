'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function OpenForInspectionPage() {
  const [openHomes, setOpenHomes] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedDay, setSelectedDay] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('time');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
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
      const response = await fetch('/api/open-homes');
      const data = await response.json();
      
      if (data.success) {
        setOpenHomes(data.openHomes);
      }
    } catch (error) {
      console.error('Error fetching open homes:', error);
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
                  Loading open inspections...
                </div>
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
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '32px'
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
                      }}>
                        {/* Image */}
                        <div style={{
                          width: '100%',
                          height: '240px',
                          backgroundColor: '#f8f8f8',
                          position: 'relative',
                          overflow: 'hidden'
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
                          
                          {/* Status Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: '16px',
                            padding: '6px 12px',
                            backgroundColor: status === 'active' ? '#27ae60' : status === 'upcoming' ? '#002b7f' : '#95a5a6',
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            {status === 'active' ? 'Open Now' : status === 'upcoming' ? 'Upcoming' : 'Ended'}
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{
                          padding: '24px',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          {/* Time */}
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#002b7f',
                            marginBottom: '12px'
                          }}>
                            📅 {formatDateTime(openHome.startTime)}
                            {openHome.endTime && (
                              <span style={{ color: '#666', fontWeight: '400' }}>
                                {' '}- {new Date(openHome.endTime).toLocaleTimeString('en-AU', { 
                                  hour: 'numeric', 
                                  minute: '2-digit',
                                  hour12: true 
                                })}
                              </span>
                            )}
                          </div>

                          {/* Property Details */}
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            margin: '0 0 8px 0',
                            color: '#000'
                          }}>
                            {property?.address?.street}, {property?.address?.suburb}
                          </h3>

                          <div style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#002b7f',
                            marginBottom: '16px'
                          }}>
                            {formatPrice(property?.price)}
                          </div>

                          {/* Property Features */}
                          {(property?.bedrooms || property?.bathrooms || property?.carSpaces) && (
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

                          {/* Contact Info */}
                          {openHome.agent && (
                            <div style={{
                              marginTop: 'auto',
                              padding: '16px 0',
                              borderTop: '1px solid #e5e5e5',
                              fontSize: '14px',
                              color: '#666'
                            }}>
                              <div style={{ fontWeight: '600', color: '#000' }}>
                                {openHome.agent.name || openHome.agent.firstName + ' ' + openHome.agent.lastName}
                              </div>
                              {openHome.agent.phone && (
                                <div>{openHome.agent.phone}</div>
                              )}
                            </div>
                          )}
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
        </section>
      </main>
    </>
  );
}

export default OpenForInspectionPage;