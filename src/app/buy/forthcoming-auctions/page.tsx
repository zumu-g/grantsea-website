'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function ForthcomingAuctionsPage() {
  const [auctions, setAuctions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedDay, setSelectedDay] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('date');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  React.useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auctions');
      const data = await response.json();
      
      if (data.success) {
        setAuctions(data.data);
      } else {
        console.error('Failed to fetch auctions:', data.error);
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: any) => {
    if (!price) return 'Guide on application';
    
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
    
    return 'Guide on application';
  };

  const formatAuctionDateTime = (dateTime: string) => {
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
      weekday: 'long',
      month: 'long', 
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
    const suburbs = [...new Set(auctions.map(auction => auction.property?.address?.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const filteredAuctions = auctions
    .filter(auction => {
      if (selectedDay !== 'all') {
        const dayOfWeek = getDayOfWeek(auction.auctionDate);
        if (selectedDay !== dayOfWeek) return false;
      }
      
      if (selectedSuburb !== 'all') {
        const suburb = auction.property?.address?.suburb;
        if (suburb !== selectedSuburb) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.auctionDate).getTime() - new Date(b.auctionDate).getTime();
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

  const getAuctionStatus = (auctionDate: string) => {
    const now = new Date();
    const auction = new Date(auctionDate);
    const daysDifference = Math.ceil((auction.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if (daysDifference <= 0) return 'today';
    if (daysDifference === 1) return 'tomorrow';
    if (daysDifference <= 7) return 'this-week';
    return 'upcoming';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today': return '#e74c3c';
      case 'tomorrow': return '#f39c12';
      case 'this-week': return '#3498db';
      case 'upcoming': return '#27ae60';
      default: return '#002b7f';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'today': return 'Today';
      case 'tomorrow': return 'Tomorrow';
      case 'this-week': return 'This Week';
      case 'upcoming': return 'Upcoming';
      default: return 'Scheduled';
    }
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
              Forthcoming Auctions
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              View scheduled property auctions and register your interest to bid.
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
              {/* Day Filter */}
              <div style={{ position: 'relative', minWidth: isMobile ? '100%' : '180px' }}>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
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
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

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
                  <option value="date">Sort by Date</option>
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
              {loading ? 'Loading...' : `${filteredAuctions.length} upcoming auction${filteredAuctions.length !== 1 ? 's' : ''}`}
            </div>
          </div>
        </section>

        {/* Auctions List */}
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
                  fontSize: '18px',
                  color: '#666'
                }}>
                  Loading auctions...
                </div>
              </div>
            ) : filteredAuctions.length === 0 ? (
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
                  No Upcoming Auctions
                </h3>
                <p style={{
                  fontSize: '16px',
                  marginBottom: '32px',
                  maxWidth: '450px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  There are currently no scheduled auctions matching your criteria. Check back soon or browse our available properties.
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
                  Browse All Properties
                </Link>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '24px' : '24px'
              }}>
                {filteredAuctions.map((auction, index) => {
                  const status = getAuctionStatus(auction.auctionDate);

                  return (
                    <Link
                      key={index}
                      href={`/property/${auction.propertyId}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block'
                      }}
                    >
                      <div style={{
                        backgroundColor: '#fff',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Image */}
                        <div style={{
                          width: '100%',
                          aspectRatio: '1/1',
                          backgroundColor: '#f5f5f5',
                          position: 'relative',
                          overflow: 'hidden'
                        }}>
                          {auction.property?.images && auction.property.images[0] ? (
                            <img
                              src={auction.property.images[0].url}
                              alt={`${auction.property?.address?.street}, ${auction.property?.address?.suburb}`}
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
                              No Image Available
                            </div>
                          )}

                          {/* Auction Badge */}
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
                            Auction
                          </div>

                          {/* Status Badge */}
                          {(status === 'today' || status === 'tomorrow') && (
                            <div style={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                              padding: '8px 16px',
                              backgroundColor: status === 'today' ? '#AF272F' : '#D4A853',
                              color: '#fff',
                              borderRadius: '100px',
                              fontSize: '12px',
                              fontWeight: '500',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              {getStatusLabel(status)}
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
                          {/* Auction Date */}
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#000',
                            marginBottom: '8px'
                          }}>
                            {formatAuctionDateTime(auction.auctionDate)}
                          </div>

                          {/* Auction Location */}
                          {auction.auctionVenue && (
                            <div style={{
                              fontSize: '13px',
                              color: '#666',
                              marginBottom: '12px'
                            }}>
                              {auction.auctionVenue}
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
                            {auction.property?.address?.display || `${auction.property?.address?.street}, ${auction.property?.address?.suburb}`}
                          </h3>

                          {/* Price Guide */}
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            color: '#000',
                            marginBottom: '12px'
                          }}>
                            {auction.guide || formatPrice(auction.property?.price)}
                          </div>

                          {/* Property Features */}
                          {(auction.property?.bedrooms || auction.property?.bathrooms || auction.property?.carSpaces) && (
                            <div style={{
                              display: 'flex',
                              gap: '16px',
                              fontSize: '14px',
                              color: '#666'
                            }}>
                              {auction.property?.bedrooms && (
                                <span>{auction.property.bedrooms} bed</span>
                              )}
                              {auction.property?.bathrooms && (
                                <span>{auction.property.bathrooms} bath</span>
                              )}
                              {auction.property?.carSpaces && (
                                <span>{auction.property.carSpaces} car</span>
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
              Ready to Bid?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Register your interest for upcoming auctions and get bidding guidance from our experienced team.
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
                Register Interest
              </Link>
              <Link
                href="/buy/livestream-auctions"
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
                Watch Live Auctions
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ForthcomingAuctionsPage;