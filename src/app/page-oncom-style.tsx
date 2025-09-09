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
      {/* ON.COM Style Header - Exact clone */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000
      }}>
        <div style={{
          height: '100%',
          padding: '0 24px',
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
              letterSpacing: '-0.025em'
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
                fontSize: '16px',
                fontWeight: '500'
              }}>Buy</Link>
              <Link href="/rent" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>Rent</Link>
              <Link href="/sold" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>Sold</Link>
              <Link href="/agents" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>Find agents</Link>
              <Link href="/new-homes" style={{
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>New homes</Link>
            </nav>
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link href="/saved-properties" style={{
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
            <Link href="/sign-in" style={{
              padding: '8px 16px',
              fontSize: '16px',
              fontWeight: '500',
              color: '#000',
              textDecoration: 'none'
            }}>
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - ON.COM exact style */}
      <section style={{
        height: 'calc(100vh - 72px)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginTop: '72px',
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
          padding: '0 24px'
        }}>
          <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '72px',
              fontWeight: '900',
              lineHeight: '1',
              marginBottom: '24px',
              color: '#fff',
              letterSpacing: '-0.02em',
              maxWidth: '800px'
            }}>
              Your best move starts here
            </h1>
            <p style={{
              fontSize: '24px',
              fontWeight: '400',
              lineHeight: '1.4',
              marginBottom: '48px',
              color: '#fff',
              maxWidth: '600px'
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
        padding: '0',
        backgroundColor: '#fff',
        marginTop: '0' // Normal spacing
      }}>
        <div style={{
          maxWidth: '100%',
          margin: '0'
        }}>
          <h2 style={{
            fontSize: '14px',
            fontWeight: '400',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: '40px 0 24px',
            color: '#000'
          }}>
            Shop by category
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2px',
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            {/* Buy Category */}
            <Link href="/buy" style={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#000'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=800&fit=crop"
                alt="Buy property"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              />
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>Houses for sale</h3>
                <p style={{
                  color: '#fff',
                  fontSize: '14px',
                  opacity: '0.8'
                }}>Find your dream home</p>
              </div>
            </Link>

            {/* Rent Category */}
            <Link href="/rent" style={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#000'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop"
                alt="Rent property"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              />
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>Apartments for rent</h3>
                <p style={{
                  color: '#fff',
                  fontSize: '14px',
                  opacity: '0.8'
                }}>Premium rentals available</p>
              </div>
            </Link>

            {/* Sell Category */}
            <Link href="/sell" style={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#000'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=800&fit=crop"
                alt="Sell property"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              />
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>Sell your property</h3>
                <p style={{
                  color: '#fff',
                  fontSize: '14px',
                  opacity: '0.8'
                }}>Get the best price</p>
              </div>
            </Link>

            {/* Recently Sold Category */}
            <Link href="/sold" style={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              display: 'block',
              textDecoration: 'none',
              backgroundColor: '#000'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=800&fit=crop"
                alt="Recently sold"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: '0.8',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              />
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px'
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '4px'
                }}>Recently sold</h3>
                <p style={{
                  color: '#fff',
                  fontSize: '14px',
                  opacity: '0.8'
                }}>View market trends</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Properties Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#fafafa'
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          padding: '0 40px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: '48px',
              fontWeight: '700'
            }}>
              Latest properties
            </h2>
            <Link href="/buy" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '2px solid #000',
              paddingBottom: '4px'
            }}>
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
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
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
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '12px'
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