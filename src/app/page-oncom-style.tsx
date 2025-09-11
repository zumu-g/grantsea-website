'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function HomePageOncom() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const { properties, loading } = useProperties({ limit: 12 });

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header only at the very top
      if (currentScrollY === 0) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ON.COM Style Header - Only visible at top */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'transparent',
        zIndex: 1000,
        transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease'
      }}>
        <div style={{
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Left section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Logo */}
            <Link href="/" style={{ 
              fontSize: '24px', 
              fontWeight: '800', 
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '-0.02em'
            }}>
              GRANT'S
            </Link>

            {/* Navigation - Desktop */}
            <nav style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center'
            }}>
              <Link href="/buy" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Buy</Link>
              <Link href="/rent" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Rent</Link>
              <Link href="/agents" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>Find agents</Link>
              <Link href="/new-homes" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500'
              }}>New homes</Link>
            </nav>
          </div>

          {/* Right section - empty space to balance layout */}
          <div style={{ width: '120px' }} />
        </div>
      </header>

      {/* Hero Section - Full screen with centered text like ON.COM */}
      <section style={{
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000'
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)'
        }} />
        
        <div style={{
          position: 'relative',
          width: 'calc(100vw - 15px)',
          padding: '0 47.952px',
          textAlign: 'left'
        }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 5vw, 6rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: '#fff',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Your best move starts here
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
            fontWeight: '400',
            lineHeight: '1.5',
            marginBottom: '48px',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px'
          }}>
            Casey and Cardinia's trusted real estate experts
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}>
            <Link href="/buy" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 40px',
              backgroundColor: '#fff',
              color: '#000',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '50px',
              transition: 'all 0.2s ease',
              minWidth: '180px',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)';
            }}
            >
              Browse properties
            </Link>
            <Link href="/appraisal" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '18px 40px',
              backgroundColor: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: '600',
              borderRadius: '50px',
              border: '2px solid rgba(255,255,255,0.8)',
              transition: 'all 0.2s ease',
              minWidth: '180px',
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
        paddingTop: '120px',
        paddingBottom: '120px'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          padding: '0'
        }}>
          <h2 style={{
            fontSize: '48.448px',
            fontWeight: '700',
            letterSpacing: '-0.48448px',
            textTransform: 'none',
            textAlign: 'start',
            margin: '0 0 32.2296px',
            color: '#000',
            lineHeight: '53.2928px',
            paddingLeft: '47.952px',
            paddingRight: '47.952px'
          }}>
            Shop by category
          </h2>
          
          {/* Category Layout - ON.COM exact style (Flexbox, not Grid) */}
          <div style={{
            display: 'flex',
            paddingLeft: '47.952px',
            paddingRight: '47.952px',
            gap: '32px',
            position: 'relative'
          }}>
            {/* Buy Category */}
            <Link href="/buy" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '0px',
              flex: '1'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '148.15%' // 2:3 Portrait aspect ratio (847/571 = 1.4815)
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=480&fit=crop"
                  alt="Buy"
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
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  right: '32px'
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
              borderRadius: '0px',
              flex: '1'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '148.15%'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=480&fit=crop"
                  alt="Rent"
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
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  right: '32px'
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

            {/* Sell Category */}
            <Link href="/sell" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '0px',
              flex: '1'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '148.15%'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=480&fit=crop"
                  alt="Sell"
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
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '32px',
                  left: '32px',
                  right: '32px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: 'clamp(1.625rem, 1.52rem + .45vw, 2.0625rem)',
                    fontWeight: '600',
                    marginBottom: '4px',
                    letterSpacing: '-0.01em'
                  }}>Sell</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>List your property</p>
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Activities Section - ON.COM style */}
      <section style={{
        backgroundColor: '#fff',
        paddingTop: '80px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          padding: '0'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            letterSpacing: '-0.48px',
            textAlign: 'left',
            margin: '0 0 48px',
            color: '#000',
            paddingLeft: '48px'
          }}>
            Find your perfect property
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '0'
          }}>
            {/* Activities List */}
            <div style={{
              flex: '0 0 40%',
              paddingLeft: '47.952px',
              paddingRight: '60px'
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
                      padding: '20px 0',
                      borderBottom: '1px solid #e5e5e5',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: hoveredActivity === activity.id ? '#f8f8f8' : 'transparent'
                    }}
                    onMouseEnter={() => setHoveredActivity(activity.id)}
                    onMouseLeave={() => setHoveredActivity(null)}
                  >
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#000',
                      margin: 0,
                      transition: 'transform 0.3s ease',
                      transform: hoveredActivity === activity.id ? 'translateX(8px)' : 'translateX(0)'
                    }}>
                      {activity.name}
                    </h3>
                  </Link>
                ))}
              </div>
              
              <Link href="/buy" style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: '32px',
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
              minHeight: '500px',
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
        paddingTop: '80px',
        paddingBottom: '80px',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Carousel Container */}
          <div style={{
            position: 'relative'
          }}>
            {/* Carousel Track */}
            <div style={{
              overflow: 'hidden',
              padding: '0 60px'
            }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                transform: `translateX(-${carouselScroll}px)`,
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {[
                  {
                    name: 'Premium',
                    tagline: 'Luxury properties',
                    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=800&fit=crop',
                    link: '/buy?type=premium'
                  },
                  {
                    name: 'Performance',
                    tagline: 'Investment returns',
                    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop',
                    link: '/buy?type=investment'
                  },
                  {
                    name: 'Showcase',
                    tagline: 'Featured listings',
                    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop',
                    link: '/featured'
                  },
                  {
                    name: 'Core',
                    tagline: 'Essential homes',
                    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=800&fit=crop',
                    link: '/buy?type=family'
                  },
                  {
                    name: 'The Collection',
                    tagline: 'Exclusive properties',
                    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=800&fit=crop',
                    link: '/exclusive'
                  },
                  {
                    name: 'Waterfront',
                    tagline: 'Coastal living',
                    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=800&fit=crop',
                    link: '/buy?type=waterfront'
                  }
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    style={{
                      flex: '0 0 calc((100% - 5 * 16px) / 6.5)',
                      minWidth: '180px',
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
              onClick={() => setCarouselScroll(Math.min(980, carouselScroll + 196))}
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
                opacity: carouselScroll >= 980 ? 0 : 1,
                pointerEvents: carouselScroll >= 980 ? 'none' : 'auto',
                zIndex: 2
              }}
              onMouseEnter={(e) => {
                if (carouselScroll < 980) {
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

      {/* Featured Section - ON.COM style */}
      <section style={{
        backgroundColor: '#f5f5f5',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          padding: '0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{
              paddingLeft: '48px'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)',
                fontWeight: '700',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                color: '#000',
                lineHeight: '1.2'
              }}>
                Your property journey starts with confidence
              </h2>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '32px',
                maxWidth: '480px'
              }}>
                Experience the difference with Casey and Cardinia's most trusted agents. From first inspection to final settlement, we're with you every step.
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <Link href="/appraisal" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '32px',
                  transition: 'all 0.2s ease',
                  border: '2px solid #000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  Get free appraisal
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginLeft: '8px' }}
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link href="/selling-guide" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '32px',
                  transition: 'all 0.2s ease',
                  border: '2px solid #000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                >
                  Selling guide
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              marginRight: '47.952px'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Happy homeowners"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* You may be interested in - ON.COM style */}
      <section style={{
        backgroundColor: '#f8f9fa',
        paddingTop: '64px',
        paddingBottom: '64px',
        overflow: 'hidden',
        position: 'relative',
        width: 'calc(100vw - 15px)'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          paddingLeft: '47.952px',
          paddingRight: '47.952px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.625rem, 1.52rem + 0.45vw, 2.0625rem)',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
            color: '#000',
            lineHeight: '1.2'
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
            <div style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              marginLeft: '-47.952px',
              marginRight: '-47.952px',
              paddingLeft: '48px'
            }}>
              <div style={{
                display: 'flex',
                gap: '24px',
                paddingRight: '47.952px'
              }}>
                {properties.slice(0, 6).map((property) => (
                <div key={property.id} style={{
                  flex: '0 0 calc(25% - 0.375rem)', // Adjusted for 4 items visible with small gap
                  minWidth: '280px',
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
                        {property.address}
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
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: '#000',
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
        paddingTop: '64px',
        paddingBottom: '64px',
        width: 'calc(100vw - 15px)'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          padding: '0 48px'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.625rem, 1.52rem + 0.45vw, 2.0625rem)',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
            color: '#000',
            lineHeight: '1.2'
          }}>
            Stories that move
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
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
                  aspectRatio: '3/2',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid #e5e5e5'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=267&fit=crop"
                    alt="Family in new home"
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
                  fontSize: '18px',
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
                  aspectRatio: '3/2',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid #e5e5e5'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop"
                    alt="Modern development"
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
                  fontSize: '18px',
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
              <Link href="/sell" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/2',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid #e5e5e5'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=267&fit=crop"
                    alt="Selling success"
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
                    Selling Guide
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
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
                  5 secrets to selling above reserve in 2025
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
                  Expert tips from Grant's top agents on how to maximize your property's value in today's competitive market.
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
                  <span>Get selling tips</span>
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
              <Link href="/buying-guide" style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/2',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                  border: '1px solid #e5e5e5'
                }}>
                  <img 
                    src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=267&fit=crop"
                    alt="First home buyers"
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
                    Buying Tips
                  </div>
                </div>
                <h3 style={{
                  fontSize: '18px',
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
                  First home buyer's guide to Casey & Cardinia
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
                  Everything you need to know about buying your first home in Melbourne's growth corridor, from grants to great suburbs.
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
                  <span>Start your journey</span>
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
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          width: 'calc(100vw - 15px)',
          padding: '0 47.952px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(3rem, 5vw, 6rem)',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                marginBottom: '32px',
                lineHeight: '0.9'
              }}>
                Join our<br />community
              </h2>
              <p style={{
                fontSize: '20px',
                lineHeight: '1.6',
                marginBottom: '48px',
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '450px'
              }}>
                Get exclusive access to new listings, market insights, and property news delivered to your inbox.
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '32px'
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
              gridTemplateColumns: '1fr 1fr',
              gap: '24px'
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
        padding: '80px 0',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: '36px',
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
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {properties.slice(0, 8).map((property) => (
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

      {/* Why Choose Grant's Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#000',
        color: '#fff'
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '24px'
          }}>
            Why choose Grant's
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '64px',
            maxWidth: '600px',
            margin: '0 auto 64px',
            opacity: '0.9'
          }}>
            Local expertise, global standards. Your trusted partner in Casey and Cardinia real estate.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px'
          }}>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>30+</div>
              <p style={{ fontSize: '16px', opacity: '0.8' }}>Years of local experience</p>
            </div>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>5,000+</div>
              <p style={{ fontSize: '16px', opacity: '0.8' }}>Properties sold</p>
            </div>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>98%</div>
              <p style={{ fontSize: '16px', opacity: '0.8' }}>Customer satisfaction</p>
            </div>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '700',
                marginBottom: '16px'
              }}>14</div>
              <p style={{ fontSize: '16px', opacity: '0.8' }}>Days average sale time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#fff',
        borderTop: '1px solid #e5e5e5',
        padding: '64px 0 32px'
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '48px',
            marginBottom: '48px'
          }}>
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Buy</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/buy/houses" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Houses</Link>
                <Link href="/buy/apartments" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Apartments</Link>
                <Link href="/buy/land" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Land</Link>
                <Link href="/buy/commercial" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Commercial</Link>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Sell</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/appraisal" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Get an appraisal</Link>
                <Link href="/sell/guide" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Selling guide</Link>
                <Link href="/sell/marketing" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Marketing</Link>
                <Link href="/sell/results" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Recent sales</Link>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>About</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/about" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Our story</Link>
                <Link href="/agents" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Our team</Link>
                <Link href="/offices" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Our offices</Link>
                <Link href="/careers" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Careers</Link>
              </div>
            </div>
            
            <div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '24px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:1300472687" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>1300 GRANTS</a>
                <a href="mailto:hello@grantsea.com.au" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>hello@grantsea.com.au</a>
                <Link href="/contact" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Contact form</Link>
                <Link href="/offices" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Find an office</Link>
              </div>
            </div>
          </div>
          
          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid #e5e5e5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#666' }}>
              © 2025 Grant's Estate Agents. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/privacy" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Privacy</Link>
              <Link href="/terms" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Terms</Link>
              <Link href="/sitemap" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Sitemap</Link>
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