'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import PropertySkeleton from '@/components/PropertySkeleton';
import { formatAuctionDateTime, getAuctionTimeCategory, getTimeUntilAuction, formatCountdown, getAuctionStatus } from '@/utils/formatAuctionTime';

function UpcomingAuctionsPage() {
  const [auctions, setAuctions] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedDay, setSelectedDay] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('time');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showLiveOnly, setShowLiveOnly] = React.useState(false);

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
    fetchAuctions();
  }, [showLiveOnly]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = showLiveOnly ? '/api/auctions?status=live' : '/api/auctions';
      const response = await fetch(endpoint);
      const data = await response.json();
      
      if (data.success) {
        setAuctions(data.data);
      } else {
        setError(data.error || 'Failed to fetch auctions');
      }
    } catch (error) {
      console.error('Error fetching auctions:', error);
      setError('Unable to load auctions. Please try again later.');
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

  const getUniqueSuburbs = () => {
    const suburbs = [...new Set(auctions.map(auction => auction.property?.address?.suburb).filter(Boolean))];
    return suburbs.sort();
  };

  const filteredAuctions = auctions
    .filter(auction => {
      if (selectedDay !== 'all') {
        const dayOfWeek = getAuctionTimeCategory(auction.auctionDate);
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
        case 'time':
          const dateA = new Date(`${a.auctionDate} ${a.auctionTime}`);
          const dateB = new Date(`${b.auctionDate} ${b.auctionTime}`);
          return dateA.getTime() - dateB.getTime();
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

  const AuctionCard = ({ auction }: { auction: any }) => {
    const timeUntil = getTimeUntilAuction(auction.auctionDate, auction.auctionTime);
    const status = getAuctionStatus(auction.auctionDate, auction.auctionTime);
    const property = auction.property;

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'live': return '#ff4444';
        case 'today': return '#ff8800';
        default: return '#666';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'live': return 'LIVE NOW';
        case 'today': return 'TODAY';
        case 'upcoming': return 'UPCOMING';
        default: return 'AUCTION';
      }
    };

    return (
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        border: status === 'live' ? '2px solid #ff4444' : '1px solid #e5e5e5'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
      }}>
        {/* Status Badge */}
        {(status === 'live' || status === 'today') && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: getStatusColor(status),
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 2,
            animation: status === 'live' ? 'pulse 2s infinite' : 'none'
          }}>
            {getStatusText(status)}
          </div>
        )}

        {/* Stream Button */}
        {auction.isStreamingEnabled && auction.streamUrl && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: '#ff4444',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#fff', 
              borderRadius: '50%',
              animation: 'pulse 1s infinite'
            }}></span>
            WATCH LIVE
          </div>
        )}

        <Link href={`/property/${property?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {/* Property Image */}
          <div style={{
            width: '100%',
            height: '240px',
            backgroundColor: '#f5f5f5',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {property?.images?.[0]?.url ? (
              <img
                src={property.images[0].url}
                alt={property.address?.display}
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
                backgroundColor: '#f0f0f0',
                color: '#999'
              }}>
                No Image Available
              </div>
            )}
          </div>

          {/* Property Details */}
          <div style={{ padding: '20px' }}>
            {/* Address */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 8px 0',
              color: '#000',
              lineHeight: '1.3'
            }}>
              {property?.address?.display || 'Address not available'}
            </h3>

            {/* Price/Guide */}
            <p style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#d4af37',
              margin: '0 0 12px 0'
            }}>
              {auction.guide || formatPrice(property?.price)}
            </p>

            {/* Property Details */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
              fontSize: '14px',
              color: '#666'
            }}>
              {property?.bedrooms && (
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
              )}
              {property?.bathrooms && (
                <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
              )}
              {property?.carSpaces && (
                <span>{property.carSpaces} car{property.carSpaces !== 1 ? 's' : ''}</span>
              )}
            </div>

            {/* Auction Details */}
            <div style={{
              backgroundColor: '#f8f8f8',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '12px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#000',
                marginBottom: '4px'
              }}>
                🔨 {formatAuctionDateTime(auction.auctionDate, auction.auctionTime)}
              </div>
              {auction.auctionVenue && (
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  📍 {auction.auctionVenue}
                </div>
              )}
            </div>

            {/* Countdown */}
            {status !== 'ended' && (
              <div style={{
                fontSize: '14px',
                color: status === 'live' ? '#ff4444' : '#666',
                fontWeight: '500'
              }}>
                {status === 'live' ? '🔴 Auction in progress' : `⏰ ${formatCountdown(timeUntil)}`}
              </div>
            )}

            {/* Registration Notice */}
            {auction.registrationRequired && (
              <div style={{
                marginTop: '12px',
                padding: '8px 12px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px',
                fontSize: '12px',
                color: '#856404'
              }}>
                Registration required to bid
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  };

  const liveAuctionsCount = auctions.filter(auction => 
    getAuctionStatus(auction.auctionDate, auction.auctionTime) === 'live'
  ).length;

  return (
    <React.Fragment>
      <OncomHeader />
      
      {/* Add pulse animation styles */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
      
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
              {showLiveOnly ? 'Live Auctions' : 'Upcoming Auctions'}
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              {showLiveOnly 
                ? 'Watch live auctions in real-time. Register to bid or observe the action unfold.'
                : 'Discover upcoming property auctions and register to bid. Don\'t miss your chance to secure your dream property.'
              }
            </p>

            {/* Live Toggle */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              marginTop: '32px'
            }}>
              <button
                onClick={() => setShowLiveOnly(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: !showLiveOnly ? '#000' : 'transparent',
                  color: !showLiveOnly ? '#fff' : '#000',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Upcoming Auctions
              </button>
              <button
                onClick={() => setShowLiveOnly(true)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: showLiveOnly ? '#ff4444' : 'transparent',
                  color: showLiveOnly ? '#fff' : '#ff4444',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {liveAuctionsCount > 0 && (
                  <span style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: showLiveOnly ? '#fff' : '#ff4444',
                    borderRadius: '50%',
                    animation: 'pulse 1s infinite'
                  }}></span>
                )}
                Live Auctions {liveAuctionsCount > 0 && `(${liveAuctionsCount})`}
              </button>
            </div>
          </div>
        </section>

        {/* Filters */}
        {!showLiveOnly && (
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

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  margin: 0
                }}>
                  {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {loading ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '30px'
              }}>
                {[...Array(6)].map((_, i) => (
                  <PropertySkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  Unable to Load Auctions
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  {error}
                </p>
                <button
                  onClick={fetchAuctions}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : filteredAuctions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {showLiveOnly ? 'No Live Auctions' : 'No Upcoming Auctions'}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666'
                }}>
                  {showLiveOnly 
                    ? 'There are currently no live auctions streaming. Check back later or view upcoming auctions.'
                    : 'There are no auctions scheduled for the selected criteria. Try adjusting your filters or check back later.'
                  }
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '30px'
              }}>
                {filteredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default UpcomingAuctionsPage;