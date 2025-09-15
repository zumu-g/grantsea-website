'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function NarreWarrenPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { properties, loading } = useProperties({ 
    suburb: 'Narre Warren', 
    limit: 6 
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return (
    <>
      <OncomHeader />

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: isMobile ? '60vh' : '70vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${scrolled ? 1.1 : 1})`,
          transition: 'transform 0.6s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)'
        }} />
        
        <div style={{
          position: 'relative',
          width: '100%',
          padding: isMobile ? '40px 20px' : '80px',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2.5rem' : '3.75rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Narre Warren
          </h1>
          <p style={{
            fontSize: isMobile ? '1.125rem' : '1.25rem',
            color: '#fff',
            maxWidth: '600px',
            lineHeight: '1.5',
            opacity: 0.9
          }}>
            Growing community hub
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section style={{
        backgroundColor: '#fff',
        padding: isMobile ? '40px 20px' : '60px 80px',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: isMobile ? '20px' : '40px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>38km</div>
            <div style={{ fontSize: '14px', color: '#666' }}>to Melbourne CBD</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>$750K</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Median house price</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>35,000+</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Population</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>⭐⭐⭐⭐</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Family friendly</div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        backgroundColor: '#f8f8f8',
        padding: isMobile ? '40px 20px' : '80px'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Note about missing content */}
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '40px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '16px',
              color: '#856404'
            }}>
              <strong>Note:</strong> Specific content for Narre Warren is not available. Showing general information and available properties. 
              For detailed suburb information, please contact our local experts.
            </p>
          </div>

          <article style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: isMobile ? '30px 20px' : '60px',
            marginBottom: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              About Narre Warren
            </h2>
            
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              <p style={{ marginBottom: '20px' }}>
                Narre Warren is a thriving suburb in Melbourne's southeast, positioned as a major activity center for the Casey region. 
                Located approximately 38 kilometers from Melbourne's CBD, it serves as both a residential community and commercial hub.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                The suburb features excellent transport connections with its own train station on the Pakenham line, making it attractive 
                for commuters. Fountain Gate Shopping Centre (Casey Central) provides comprehensive retail and entertainment options, 
                while the surrounding area offers diverse housing from established family homes to modern developments.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Narre Warren appeals to families seeking established infrastructure, good schools, and convenient access to employment 
                centers throughout the southeast. The blend of urban convenience and suburban lifestyle continues to attract steady growth.
              </p>
            </div>
          </article>

          {/* Key Features */}
          <article style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: isMobile ? '30px 20px' : '60px',
            marginBottom: '40px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Why choose Narre Warren?
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '32px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>🚆</span> Transport Hub
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Direct train station with frequent services to Melbourne CBD, plus excellent freeway access via Princes Highway.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>🛍️</span> Shopping Paradise
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Home to Fountain Gate (Casey Central), one of Melbourne's largest shopping and entertainment destinations.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>🏘️</span> Diverse Housing
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Wide range of properties from affordable units to spacious family homes, catering to all life stages.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '24px' }}>🏥</span> Healthcare Access
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Close to Casey Hospital and numerous medical centers, ensuring comprehensive healthcare services nearby.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Properties Section */}
      <section style={{
        backgroundColor: '#fff',
        padding: isMobile ? '60px 20px' : '80px'
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Properties in Narre Warren
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover your next home in this thriving community
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: '48px',
                height: '48px',
                border: '3px solid #f0f0f0',
                borderTop: '3px solid #000',
                borderRadius: '50%',
                margin: '0 auto',
                animation: 'spin 1s linear infinite'
              }} />
            </div>
          ) : properties.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {properties.map((property) => (
                <div key={property.id} style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <Link href={`/property/${property.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}>
                    <div style={{
                      position: 'relative',
                      paddingTop: '66.67%',
                      backgroundColor: '#f5f5f5'
                    }}>
                      {property.images && property.images[0] ? (
                        <img
                          src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                          alt={property.address}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#999'
                        }}>
                          No image available
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
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '16px'
                      }}>
                        {property.address}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '20px',
                        fontSize: '14px',
                        color: '#333'
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
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#f8f8f8',
              borderRadius: '12px'
            }}>
              <p style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '24px'
              }}>
                No properties currently available in Narre Warren
              </p>
              <Link href="/buy" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 32px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                View all properties
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: isMobile ? '60px 20px' : '100px 80px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: '700',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Need local expertise?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Our Narre Warren specialists have in-depth knowledge of the local market. 
            Get a free appraisal or chat with an expert today.
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/appraisal" style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#fff',
              color: '#000',
              textDecoration: 'none',
              borderRadius: '32px',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              Get free appraisal
            </Link>
            <Link href="/contact" style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '32px',
              fontSize: '16px',
              fontWeight: '600',
              border: '2px solid #fff',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#fff';
            }}>
              Contact an agent
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}