'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function HomePageOncom() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { properties, loading } = useProperties({ limit: 12 });

  return (
    <>
      {/* ON.COM Style Header - White background */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
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
              color: '#000',
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
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}>Buy</Link>
              <Link href="/rent" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}>Rent</Link>
              <Link href="/sold" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}>Sold</Link>
              <Link href="/agents" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}>Find agents</Link>
              <Link href="/new-homes" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'opacity 0.2s'
              }}>New homes</Link>
            </nav>
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/saved-properties" style={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
            <Link href="/sign-in" style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000',
              textDecoration: 'none'
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Full screen minus header */}
      <section style={{
        height: 'calc(100vh - 64px)',
        marginTop: '64px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#000'
      }}>
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))'
        }} />
        
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <div>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '20px',
              color: '#fff',
              letterSpacing: '-0.02em',
              maxWidth: '700px'
            }}>
              Your best move starts here
            </h1>
            <p style={{
              fontSize: '20px',
              fontWeight: '400',
              lineHeight: '1.5',
              marginBottom: '40px',
              color: '#fff',
              maxWidth: '500px'
            }}>
              Casey and Cardinia's trusted real estate experts
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/buy" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '32px',
                transition: 'transform 0.2s ease',
                minWidth: '160px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Browse properties
              </Link>
              <Link href="/appraisal" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '32px',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s ease',
                minWidth: '160px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                Get appraisal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category - ON.COM exact style */}
      <section style={{
        backgroundColor: '#fff',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h2 style={{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: '0 0 40px',
            color: '#000'
          }}>
            Shop by category
          </h2>
          
          {/* Category Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            position: 'relative'
          }}>
            {/* Buy Category */}
            <Link href="/buy" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '100%' // 1:1 Square aspect ratio like on.com
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
                  bottom: '24px',
                  left: '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '4px'
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
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '100%'
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
                  bottom: '24px',
                  left: '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '4px'
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
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '100%'
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
                  bottom: '24px',
                  left: '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>Sell</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>List your property</p>
                </div>
              </div>
            </Link>

            {/* Sold Category */}
            <Link href="/sold" style={{
              position: 'relative',
              display: 'block',
              textDecoration: 'none',
              overflow: 'hidden',
              borderRadius: '4px'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '100%'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=480&fit=crop"
                  alt="Sold"
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
                  bottom: '24px',
                  left: '24px'
                }}>
                  <h3 style={{
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>Sold</h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '14px'
                  }}>View recent sales</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px'
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
          padding: '0 40px',
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
                <Link href="/sell/appraisal" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Get an appraisal</Link>
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