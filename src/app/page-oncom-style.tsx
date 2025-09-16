'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import OncomHeader from '@/components/OncomHeader';

export default function HomePageOncom() {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties, loading } = useProperties({ limit: 12 });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <OncomHeader />

      {/* Hero Section - Full screen with bottom-left text like ON.COM */}
      <section className="hero-section" style={{
        height: isMobile ? 'calc(100vh - env(safe-area-inset-top, 0px))' : '100vh',
        minHeight: isMobile ? '600px' : '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000'
      }}>
        {/* Gradient overlay - lighter like on.com */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)'
        }} />
        
        <div style={{
          position: 'relative',
          width: '100%',
          padding: isMobile ? '40px 20px' : isTablet ? '60px 40px' : '80px max(2rem, 3.33vw)',
          textAlign: 'left',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: isMobile ? '12px' : '16px',
            color: '#fff',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Your best move starts here
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
            fontWeight: '400',
            lineHeight: '1.5',
            marginBottom: isMobile ? '24px' : '32px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '640px'
          }}>
            Casey and Cardinia's trusted real estate experts
          </p>
          <div className="button-group" style={{ 
            display: 'flex', 
            gap: isMobile ? '12px' : '16px', 
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <Link href="/buy" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: isMobile ? '16px 40px' : '20px 48px',
              backgroundColor: '#fff',
              color: '#000',
              textDecoration: 'none',
              fontSize: isMobile ? '16px' : '17px',
              fontWeight: '600',
              borderRadius: '500px',
              transition: 'all 0.2s ease',
              minWidth: isMobile ? '100%' : '200px',
              justifyContent: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)';
            }}
            >
              Browse properties
            </Link>
            <Link href="/appraisal" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: isMobile ? '16px 40px' : '20px 48px',
              backgroundColor: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '16px' : '17px',
              fontWeight: '600',
              borderRadius: '500px',
              border: '2px solid rgba(255,255,255,0.8)',
              transition: 'all 0.2s ease',
              minWidth: isMobile ? '100%' : '200px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Get appraisal
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category - ON.COM exact style */}
      <section style={{
        backgroundColor: '#fff',
        paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
        paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            textTransform: 'none',
            textAlign: 'start',
            margin: '0',
            marginBottom: isMobile ? '24px' : '48px',
            color: '#000',
            lineHeight: '1.1',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            Shop by category
          </h2>
          
          {/* Category Layout - Grid for 3 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            gap: isMobile ? '16px' : '24px',
            position: 'relative',
            justifyContent: 'center'
          }}>
            {/* Buy Category */}
            <Link href="/buy" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '8px',
              height: isMobile ? '450px' : isTablet ? '550px' : 'auto',
              aspectRatio: '3/4',
              width: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }
            }}>
              <div style={{
                position: 'relative',
                height: '100%'
              }}>
                <img 
                  aria-hidden="true"
                  alt=""
                  loading="eager"
                  data-allow-mismatch="true"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  width="600"
                  height="800"
                  srcSet="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=400&fit=crop&q=80 300w"
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: isMobile ? '20px' : '24px',
                  left: isMobile ? '20px' : '24px',
                  right: isMobile ? '20px' : '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.625rem, 1.52rem + .45vw, 2.0625rem)',
                    fontWeight: '600',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                  }}>Buy</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>Browse homes for sale</p>
                </div>
              </div>
            </Link>

            {/* Rent Category */}
            <Link href="/rent" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '8px',
              height: isMobile ? '450px' : isTablet ? '550px' : 'auto',
              aspectRatio: '3/4',
              width: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }
            }}>
              <div style={{
                position: 'relative',
                height: '100%'
              }}>
                <img 
                  aria-hidden="true"
                  alt=""
                  loading="eager"
                  data-allow-mismatch="true"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  width="600"
                  height="800"
                  srcSet="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=300&h=400&fit=crop&q=80 300w"
                  src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=800&fit=crop"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: isMobile ? '20px' : '24px',
                  left: isMobile ? '20px' : '24px',
                  right: isMobile ? '20px' : '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.625rem, 1.52rem + .45vw, 2.0625rem)',
                    fontWeight: '600',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                  }}>Rent</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>Find your next rental</p>
                </div>
              </div>
            </Link>

            {/* Berwick Category */}
            <Link href="/suburbs/berwick" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '8px',
              height: isMobile ? '450px' : isTablet ? '550px' : 'auto',
              aspectRatio: '3/4',
              width: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isMobile) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }
            }}>
              <div style={{
                position: 'relative',
                height: '100%'
              }}>
                <img 
                  aria-hidden="true"
                  alt=""
                  loading="eager"
                  data-allow-mismatch="true"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  width="600"
                  height="800"
                  srcSet="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=400&fit=crop&q=80 300w"
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: isMobile ? '20px' : '24px',
                  left: isMobile ? '20px' : '24px',
                  right: isMobile ? '20px' : '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.625rem, 1.52rem + .45vw, 2.0625rem)',
                    fontWeight: '600',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                  }}>Berwick</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>Explore this premium suburb</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Activities Section - ON.COM style */}
      <section style={{
        backgroundColor: '#fff',
        paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
        paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px',
        position: 'relative',
        overflow: 'hidden',
        display: isMobile ? 'none' : 'block' // Hide on mobile for now
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            margin: '0',
            marginBottom: isMobile ? '24px' : '48px',
            color: '#000',
            lineHeight: '1.1',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            Find your perfect property
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '0',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            {/* Activities List */}
            <div style={{
              flex: '0 0 40%',
              paddingRight: isTablet ? '40px' : '60px'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
              }}>
                {[
                  { id: 'family-homes', name: 'Family Homes', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' },
                  { id: 'apartments', name: 'Apartments & Units', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' },
                  { id: 'townhouses', name: 'Townhouses', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop' },
                  { id: 'land', name: 'Land & Development', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop' },
                  { id: 'rural', name: 'Rural & Acreage', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop' },
                  { id: 'commercial', name: 'Commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
                  { id: 'investment', name: 'Investment Properties', image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop' }
                ].map((activity) => (
                  <Link 
                    key={activity.id}
                    href={`/buy?type=${activity.id}`}
                    style={{
                      display: 'block',
                      padding: '24px 0',
                      borderBottom: '1px solid #e5e5e5',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: hoveredActivity === activity.id ? '#f8f8f8' : 'transparent'
                    }}
                    onMouseEnter={() => setHoveredActivity(activity.id)}
                    onMouseLeave={() => setHoveredActivity(null)}
                  >
                    <h3 style={{
                      fontSize: isTablet ? '20px' : '24px',
                      fontWeight: '500',
                      color: '#000',
                      margin: 0,
                      transition: 'transform 0.3s ease',
                      transform: hoveredActivity === activity.id ? 'translateX(8px)' : 'translateX(0)',
                      lineHeight: '1.3'
                    }}>
                      {activity.name}
                    </h3>
                  </Link>
                ))}
              </div>
              
              <Link href="/buy" style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: '40px',
                color: '#000',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                borderBottom: '1px solid #000',
                paddingBottom: '2px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderBottomWidth = '2px';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderBottomWidth = '1px';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              >
                View all properties
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
            
            {/* Activity Image */}
            <div style={{
              flex: '1',
              position: 'relative',
              minHeight: isTablet ? '400px' : '600px',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#f5f5f5'
            }}>
              {[
                { id: 'family-homes', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop' },
                { id: 'apartments', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop' },
                { id: 'townhouses', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop' },
                { id: 'land', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop' },
                { id: 'rural', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop' },
                { id: 'commercial', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop' },
                { id: 'investment', image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop' }
              ].map((activity) => (
                <div
                  key={activity.id}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: hoveredActivity === activity.id ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                >
                  <img 
                    src={activity.image}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              ))}
              
              {!hoveredActivity && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f8f8'
                }}>
                  <p style={{
                    fontSize: '18px',
                    color: '#999',
                    textAlign: 'center'
                  }}>
                    Hover over a property type to preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section - ON.COM style */}
      <section style={{
        backgroundColor: '#f8f8f8',
        paddingTop: isMobile ? '60px' : '80px',
        paddingBottom: isMobile ? '60px' : '80px',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            margin: '0',
            marginBottom: isMobile ? '24px' : '48px',
            color: '#000',
            lineHeight: '1.1',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : '60px',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : '60px'
          }}>
            Explore suburbs
          </h2>
          {/* Carousel Container */}
          <div style={{
            position: 'relative'
          }}>
            {/* Carousel Track */}
            <div style={{
              overflow: 'hidden',
              padding: isMobile ? '0 20px' : '0 60px'
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                transform: `translateX(-${carouselScroll}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {[
                  {
                    name: 'Berwick',
                    tagline: 'Family-friendly suburb',
                    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop',
                    link: '/suburbs/berwick'
                  },
                  {
                    name: 'Narre Warren',
                    tagline: 'Growing community hub',
                    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop',
                    link: '/suburbs/narre-warren'
                  },
                  {
                    name: 'Pakenham',
                    tagline: 'Affordable family living',
                    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
                    link: '/suburbs/pakenham'
                  },
                  {
                    name: 'Cranbourne',
                    tagline: 'Thriving growth corridor',
                    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=800&fit=crop',
                    link: '/suburbs/cranbourne'
                  },
                  {
                    name: 'Narre Warren South',
                    tagline: 'Established family haven',
                    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=800&fit=crop',
                    link: '/suburbs/narre-warren-south'
                  },
                  {
                    name: 'Hampton Park',
                    tagline: 'Multicultural community',
                    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=800&fit=crop',
                    link: '/suburbs/hampton-park'
                  },
                  {
                    name: 'Officer',
                    tagline: 'Emerging suburb',
                    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop',
                    link: '/suburbs/officer'
                  },
                  {
                    name: 'Clyde',
                    tagline: 'Building tomorrow',
                    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=800&fit=crop',
                    link: '/suburbs/clyde'
                  },
                  {
                    name: 'Beaconsfield',
                    tagline: 'Hills charm',
                    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop',
                    link: '/suburbs/beaconsfield'
                  },
                  {
                    name: 'Hallam',
                    tagline: 'Established convenience',
                    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&h=800&fit=crop',
                    link: '/suburbs/hallam'
                  },
                  {
                    name: 'Clyde North',
                    tagline: 'Modern family living',
                    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop',
                    link: '/suburbs/clyde-north'
                  },
                  {
                    name: 'Cranbourne North',
                    tagline: 'Family-focused growth',
                    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop',
                    link: '/suburbs/cranbourne-north'
                  },
                  {
                    name: 'Narre Warren East',
                    tagline: 'Peaceful acreage',
                    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
                    link: '/suburbs/narre-warren-east'
                  },
                  {
                    name: 'Endeavour Hills',
                    tagline: 'Established excellence',
                    image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=600&h=800&fit=crop',
                    link: '/suburbs/endeavour-hills'
                  }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    style={{
                      flex: isMobile ? '0 0 80%' : '0 0 calc((100% - 5 * 16px) / 6.5)',
                      minWidth: isMobile ? '280px' : '180px',
                      position: 'relative',
                      textDecoration: 'none',
                      display: 'block',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      backgroundColor: '#fff'
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      paddingBottom: '133.33%', // 3:4 aspect ratio
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0'
                    }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: '24px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
                      }}>
                        <h3 style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          marginBottom: '4px',
                          color: '#fff',
                          letterSpacing: '-0.01em'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.8)',
                          margin: 0,
                          fontWeight: '400'
                        }}>
                          {item.tagline}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={() => setCarouselScroll(Math.max(0, carouselScroll - 196))}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                opacity: carouselScroll === 0 ? 0 : 1,
                pointerEvents: carouselScroll === 0 ? 'none' : 'auto',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                if (carouselScroll !== 0) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button
              onClick={() => setCarouselScroll(Math.min(2156, carouselScroll + 196))}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(8px)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                opacity: carouselScroll >= 2156 ? 0 : 1,
                pointerEvents: carouselScroll >= 2156 ? 'none' : 'auto',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                if (carouselScroll < 2156) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* You may be interested in - ON.COM style */}
      <section style={{
        backgroundColor: '#f8f9fa',
        paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
        paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '36px' : isTablet ? '44px' : '56px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: isMobile ? '32px' : '48px',
            color: '#000',
            lineHeight: '1.1'
          }}>
            You may be interested in
          </h2>
          
          {/* Properties Carousel - Shows 3.5 items */}
          {loading ? (
            <div style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid #e0e0e0',
                borderTop: '2px solid #000',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : (
            <div className="property-carousel" style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '16px' : '24px',
                paddingBottom: '16px'
              }}>
                {properties.slice(0, 3).map((property) => (
                <div key={property.id} style={{
                  flex: isMobile ? '0 0 85%' : isTablet ? '0 0 calc(50% - 12px)' : '0 0 calc(33.333% - 16px)',
                  minWidth: isMobile ? '320px' : '380px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                  scrollSnapAlign: 'start',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <Link href={`/property/${property.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <div style={{
                      position: 'relative',
                      paddingTop: '100%', // 1:1 square aspect ratio
                      backgroundColor: '#fff',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                          />
                        ) : (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '12px'
                          }}>
                            No image
                          </div>
                        )}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 1
                      }}>
                        <SavePropertyButton property={property} />
                      </div>
                    </div>
                    
                    <div style={{ 
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      flex: '1'
                    }}>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '500',
                        marginBottom: '0.25rem'
                      }}>
                        {property.suburb}
                      </p>
                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#000',
                        letterSpacing: '-0.01em',
                        lineHeight: '1.3',
                        marginBottom: '0.5rem'
                      }}>
                        {property.address.replace(', VIC', '')}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        fontSize: '0.875rem',
                        color: '#666',
                        marginBottom: '0.5rem'
                      }}>
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                      </div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#666',
                        marginTop: 'auto'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
              </div>
            </div>
          )}
          {/* View all link */}
          <div style={{
            textAlign: 'center',
            marginTop: '48px',
            paddingLeft: '64px',
            paddingRight: '64px'
          }}>
            <Link href="/buy" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#000',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              borderBottom: '2px solid #000',
              paddingBottom: '4px',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View all properties
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stories that move - ON.COM style */}
      <section style={{
        backgroundColor: '#fff',
        paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
        paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: isMobile ? '24px' : '48px',
            color: '#000',
            lineHeight: '1.1'
          }}>
            Stories that move
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '32px' : '24px'
          }}>
            {/* Story 1 */}
            <article style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Link href="/suburbs/berwick" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <img 
                    aria-hidden="true"
                    alt=""
                    loading="eager"
                    data-allow-mismatch="true"
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    width="600"
                    height="800"
                    srcSet="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=300&h=400&fit=crop&q=80 300w"
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Success Story
                  </div>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#000',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    From first home to forever home in Berwick
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#666',
                    marginBottom: '16px',
                    flex: '1',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    How the Chen family found their dream home in Berwick's family-friendly community, with top schools and parks at their doorstep.
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#000',
                    marginTop: 'auto'
                  }}>
                    <span>Read their story</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
              </Link>
            </article>

            {/* Story 2 */}
            <article style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Link href="/suburbs/cranbourne" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <img 
                    aria-hidden="true"
                    alt=""
                    loading="eager"
                    data-allow-mismatch="true"
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    width="600"
                    height="800"
                    srcSet="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop&q=80 300w"
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Market Update
                  </div>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#000',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Cranbourne: The suburb that's redefining growth
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#666',
                    marginBottom: '16px',
                    flex: '1',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Discover why Cranbourne is Melbourne's fastest-growing suburb and what this means for property investors and homeowners.
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#000',
                    marginTop: 'auto'
                  }}>
                    <span>Explore Cranbourne</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
              </Link>
            </article>

            {/* Story 3 */}
            <article style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Link href="/suburbs/officer" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <img 
                    aria-hidden="true"
                    alt=""
                    loading="eager"
                    data-allow-mismatch="true"
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    width="600"
                    height="800"
                    srcSet="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=300&h=400&fit=crop&q=80 300w"
                    src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&h=800&fit=crop"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Investment Guide
                  </div>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#000',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Officer's hidden investment opportunities
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#666',
                    marginBottom: '16px',
                    flex: '1',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Why savvy investors are turning to Officer for strong capital growth and rental yields in Melbourne's southeast.
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#000',
                    marginTop: 'auto'
                  }}>
                    <span>Learn more</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
              </Link>
            </article>

            {/* Story 4 */}
            <article style={{
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <Link href="/suburbs/narre-warren-south" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <img 
                    aria-hidden="true"
                    alt=""
                    loading="eager"
                    data-allow-mismatch="true"
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    width="600"
                    height="800"
                    srcSet="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=900&h=1200&fit=crop&q=80 900w, https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=800&fit=crop&q=80 600w, https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=408&h=544&fit=crop&q=80 408w, https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=300&h=400&fit=crop&q=80 300w"
                    src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&h=800&fit=crop"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '4px 10px',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Family Living
                  </div>
                </div>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#000',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Narre Warren South: Perfect for families
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#666',
                    marginBottom: '16px',
                    flex: '1',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    Discover why families are choosing Narre Warren South for its excellent schools, parks and community atmosphere.
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#000',
                    marginTop: 'auto'
                  }}>
                    <span>Explore the area</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
              </Link>
            </article>
          </div>

          {/* View all stories link */}
          <div style={{
            marginTop: '48px'
          }}>
            <Link href="/stories" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#000',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              borderBottom: '2px solid #000',
              paddingBottom: '4px',
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View all stories
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section - ON.COM style */}
      <section style={{
        backgroundColor: '#000',
        color: '#fff',
        paddingTop: isMobile ? '60px' : '120px',
        paddingBottom: isMobile ? '60px' : '120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '100%',
          padding: isMobile ? '0 20px' : '0 47.952px',
          position: 'relative',
          zIndex: 1,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '2.5rem' : 'clamp(3rem, 5vw, 6rem)',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                marginBottom: isMobile ? '20px' : '32px',
                lineHeight: '0.9'
              }}>
                Join our<br />community
              </h2>
              <p style={{
                fontSize: isMobile ? '16px' : '20px',
                lineHeight: '1.6',
                marginBottom: isMobile ? '32px' : '48px',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '450px'
              }}>
                Get exclusive access to new listings, market insights, and property news delivered to your inbox.
              </p>
              <div style={{
                display: 'flex',
                gap: isMobile ? '12px' : '16px',
                marginBottom: '32px',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '32px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                  }}
                />
                <button style={{
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Subscribe
                </button>
              </div>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)'
              }}>
                Join 10,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr',
              gap: isMobile ? '16px' : '24px'
            }}>
              <div style={{
                padding: '32px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>250+</div>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Properties sold monthly</p>
              </div>
              
              <div style={{
                padding: '32px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>4.9</div>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Average rating</p>
              </div>
              
              <div style={{
                padding: '32px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>98%</div>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Success rate</p>
              </div>
              
              <div style={{
                padding: '32px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>15+</div>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Expert agents</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }} />
      </section>

      {/* Latest Properties Section */}
      <section style={{
        padding: isMobile ? '60px 0' : '80px 0',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              Latest properties
            </h2>
            <Link href="/buy" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              borderBottom: '1px solid #000',
              paddingBottom: '2px',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View all properties →
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
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
          ) : (
            <div className="property-grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '20px' : '24px'
            }}>
              {properties.slice(0, 12).map((property) => (
                <div key={property.id} style={{
                  backgroundColor: '#fff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}>
                  <Link href={`/property/${property.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}>
                    <div style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden'
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
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '12px',
                        lineHeight: '1.4'
                      }}>
                        {property.address}, {property.suburb}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <span>{property.bedrooms} beds</span>
                        <span>{property.bathrooms} baths</span>
                        <span>{property.carSpaces} cars</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer - on.com style */}
      <footer style={{
        backgroundColor: '#f8f8f8',
        padding: isMobile ? '40px 0' : '48px 0'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
        }}>
          {/* Newsletter Section */}
          <div style={{
            marginBottom: '48px',
            paddingBottom: '48px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '24px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  margin: 0,
                  color: '#333'
                }}>
                  Stay in the loop, with exclusive offers and product previews.
                </h3>
              </div>
              <div style={{
                display: 'flex',
                gap: '16px',
                flexDirection: isMobile ? 'column' : 'row',
                width: isMobile ? '100%' : 'auto'
              }}>
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  style={{
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    width: isMobile ? '100%' : '280px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#666';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#ddd';
                  }}
                />
                <button style={{
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '32px 16px' : '48px',
            marginBottom: '48px'
          }}>
            {/* Column 1 */}
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#000'
              }}>Help & support</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/help" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Help & support
                  </Link>
                </li>
                <li>
                  <Link href="/chat" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    <span>Chat</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#000'
              }}>Become a member</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/refer" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Refer a friend
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/gift-cards" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Gift cards
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/stores" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    On stores
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/locator" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Shop locator
                  </Link>
                </li>
                <li>
                  <Link href="/portal" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Supplier portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#000'
              }}>About On</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/careers" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Careers
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/investors" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Investors
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/press" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Press & media
                  </Link>
                </li>
                <li>
                  <Link href="/backstage" style={{ color: '#666', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                    Backstage
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Australia flag */}
            <div style={{
              display: 'flex',
              justifyContent: isMobile ? 'flex-start' : 'flex-end'
            }}>
              <Link href="/au" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '24px',
                textDecoration: 'none',
                color: '#333',
                fontSize: '13px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#666';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}>
                <span style={{ fontSize: '16px' }}>🇦🇺</span>
                <span>Australia</span>
              </Link>
            </div>
          </div>
          {/* Bottom Links and Social */}
          <div style={{
            paddingTop: '24px',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '24px'
          }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '12px'
            }}>
              <span style={{ color: '#666' }}>© On 2025</span>
              <Link href="/terms" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Terms & conditions
              </Link>
              <Link href="/privacy" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Privacy policy
              </Link>
              <Link href="/accessibility" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Accessibility
              </Link>
              <Link href="/imprint" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Imprint
              </Link>
              <Link href="/vulnerability" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Vulnerability reporting
              </Link>
              <Link href="/consent" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Consent Settings
              </Link>
              <Link href="/modern-slavery" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Modern Slavery Act
              </Link>
              <Link href="/student-discount" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Student Discount
              </Link>
              <Link href="/community-discounts" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                Community Discounts
              </Link>
            </div>
            
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://strava.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#666', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}