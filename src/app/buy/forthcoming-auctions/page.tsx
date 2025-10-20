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
      const response = await fetch('/api/properties');
      const data = await response.json();
      
      if (data.success) {
        // Filter for properties with auctions that are for sale
        const auctionProperties = data.properties.filter((property: any) => 
          property.listingType === 'sale' && 
          property.auction && 
          property.auction.date &&
          new Date(property.auction.date) > new Date()
        );
        setAuctions(auctionProperties);
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
    const suburbs = [...new Set(auctions.map(auction => auction.address?.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const filteredAuctions = auctions
    .filter(auction => {
      if (selectedDay !== 'all') {
        const dayOfWeek = getDayOfWeek(auction.auction.date);
        if (selectedDay !== dayOfWeek) return false;
      }
      
      if (selectedSuburb !== 'all') {
        const suburb = auction.address?.suburb;
        if (suburb !== selectedSuburb) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.auction.date).getTime() - new Date(b.auction.date).getTime();
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
              Forthcoming Auctions
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Don't miss out on upcoming property auctions. View scheduled auctions and register your interest to bid.
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
                <option value="date">Sort by Auction Date</option>
                <option value="suburb">Sort by Suburb</option>
                <option value="price">Sort by Guide Price</option>
              </select>
            </div>

            {/* Results Count */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              {loading ? 'Loading...' : `Showing ${filteredAuctions.length} upcoming auction${filteredAuctions.length !== 1 ? 's' : ''}`}
            </div>
          </div>
        </section>

        {/* Auctions List */}
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
                  Loading auctions...
                </div>
              </div>
            ) : filteredAuctions.length === 0 ? (
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
                  No Upcoming Auctions
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px auto',
                  lineHeight: '1.6'
                }}>
                  There are currently no scheduled auctions matching your criteria. Check back soon or browse our available properties.
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
                {filteredAuctions.map((auction, index) => {
                  const status = getAuctionStatus(auction.auction.date);
                  
                  return (
                    <Link
                      key={index}
                      href={`/property/${auction.id}`}
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
                          {auction.images && auction.images[0] ? (
                            <img
                              src={auction.images[0]}
                              alt={`${auction.address?.street}, ${auction.address?.suburb}`}
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
                            backgroundColor: getStatusColor(status),
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            {getStatusLabel(status)}
                          </div>

                          {/* Auction Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            padding: '6px 12px',
                            backgroundColor: '#8e44ad',
                            color: '#fff',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                          }}>
                            🔨 Auction
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{
                          padding: '24px',
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column'
                        }}>
                          {/* Auction Date */}
                          <div style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#8e44ad',
                            marginBottom: '12px'
                          }}>
                            🗓️ {formatAuctionDateTime(auction.auction.date)}
                          </div>

                          {/* Auction Location */}
                          {auction.auction.location && (
                            <div style={{
                              fontSize: '14px',
                              color: '#666',
                              marginBottom: '12px'
                            }}>
                              📍 {auction.auction.location}
                            </div>
                          )}

                          {/* Property Details */}
                          <h3 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            margin: '0 0 8px 0',
                            color: '#000'
                          }}>
                            {auction.address?.street}, {auction.address?.suburb}
                          </h3>

                          <div style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#8e44ad',
                            marginBottom: '16px'
                          }}>
                            {formatPrice(auction.price)}
                          </div>

                          {/* Property Features */}
                          {(auction.bedrooms || auction.bathrooms || auction.carSpaces) && (
                            <div style={{
                              display: 'flex',
                              gap: '16px',
                              marginBottom: '16px',
                              fontSize: '14px',
                              color: '#666'
                            }}>
                              {auction.bedrooms && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  🛏️ {auction.bedrooms} bed{auction.bedrooms !== 1 ? 's' : ''}
                                </div>
                              )}
                              {auction.bathrooms && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  🚿 {auction.bathrooms} bath{auction.bathrooms !== 1 ? 's' : ''}
                                </div>
                              )}
                              {auction.carSpaces && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  🚗 {auction.carSpaces} car{auction.carSpaces !== 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Auction Terms */}
                          {auction.auction.terms && (
                            <div style={{
                              padding: '12px',
                              backgroundColor: '#f8f8f8',
                              borderRadius: '8px',
                              marginBottom: '16px',
                              fontSize: '14px',
                              color: '#666'
                            }}>
                              <strong>Terms:</strong> {auction.auction.terms}
                            </div>
                          )}

                          {/* Agent Info */}
                          {auction.agent && (
                            <div style={{
                              marginTop: 'auto',
                              padding: '16px 0',
                              borderTop: '1px solid #e5e5e5',
                              fontSize: '14px',
                              color: '#666'
                            }}>
                              <div style={{ fontWeight: '600', color: '#000' }}>
                                {auction.agent.name || auction.agent.firstName + ' ' + auction.agent.lastName}
                              </div>
                              {auction.agent.phone && (
                                <div>{auction.agent.phone}</div>
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
              Ready to Bid?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
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
                  padding: '14px 28px',
                  backgroundColor: '#8e44ad',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Register Interest
              </Link>
              <Link
                href="/buy/livestream-auctions"
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  backgroundColor: '#fff',
                  color: '#8e44ad',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #8e44ad',
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