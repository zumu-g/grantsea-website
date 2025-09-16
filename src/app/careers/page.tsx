'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function CareersPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
      
      {/* Main Content */}
      <main style={{ paddingTop: isMobile ? '60px' : '64px', backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            textAlign: 'center',
            padding: isMobile ? '40px 20px' : '80px 40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '60px' : isTablet ? '80px' : '120px',
              fontWeight: '700',
              lineHeight: '0.9',
              letterSpacing: '-0.04em',
              marginBottom: '40px',
              fontFamily: '"On", "Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Dream<br />Together.
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.4'
            }}>
              Join our team of passionate professionals shaping the future of real estate in Casey and Cardinia.
            </p>
          </div>
        </section>

        {/* Video Section */}
        <section style={{
          backgroundColor: '#000',
          position: 'relative',
          height: isMobile ? '50vh' : '80vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            opacity: 0.8
          }} />
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: '#fff',
            padding: '40px'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : isTablet ? '48px' : '64px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '-0.03em'
            }}>
              Where passion meets purpose
            </h2>
            <button style={{
              padding: '16px 48px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Watch our story
            </button>
          </div>
        </section>

        {/* Values Grid */}
        <section style={{
          padding: isMobile ? '60px 20px' : '120px 40px',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '56px',
              fontWeight: '700',
              marginBottom: '60px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Our values
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '40px'
            }}>
              {[
                {
                  title: 'Innovate',
                  description: 'We push boundaries and embrace new technologies to deliver exceptional experiences.',
                  color: '#ff6b6b'
                },
                {
                  title: 'Collaborate',
                  description: 'Success comes from working together, sharing knowledge, and supporting each other.',
                  color: '#4ecdc4'
                },
                {
                  title: 'Deliver',
                  description: 'We exceed expectations and create lasting value for our clients and communities.',
                  color: '#45b7d1'
                },
                {
                  title: 'Grow',
                  description: 'Continuous learning and development drives personal and professional excellence.',
                  color: '#96ceb4'
                },
                {
                  title: 'Care',
                  description: 'We genuinely care about our people, clients, and the communities we serve.',
                  color: '#f7b731'
                },
                {
                  title: 'Lead',
                  description: 'We set the standard for ethical practice and market innovation in real estate.',
                  color: '#5f27cd'
                }
              ].map((value, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff',
                  padding: '40px',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    backgroundColor: value.color,
                    borderRadius: '50%',
                    opacity: 0.1
                  }} />
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: value.color
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#666'
                  }}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '120px 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '56px',
              fontWeight: '700',
              marginBottom: '24px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Why join Grant's?
            </h2>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 60px',
              lineHeight: '1.5'
            }}>
              We're not just building careers – we're building futures. Our team enjoys industry-leading benefits and a culture that celebrates success.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '60px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px'
                }}>
                  {[
                    'Competitive commission structure',
                    'Comprehensive health benefits',
                    'Professional development programs',
                    'Flexible working arrangements',
                    'Latest technology and tools',
                    'Recognition and rewards program',
                    'Team building and social events',
                    'Career progression opportunities'
                  ].map((benefit, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 1.5L4.5 7.5L1.5 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{
                        fontSize: '16px',
                        color: '#333'
                      }}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '40px',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)',
                  borderRadius: '50%'
                }} />
                <h3 style={{
                  fontSize: '72px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#ff6b6b'
                }}>
                  98%
                </h3>
                <p style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  Team satisfaction rate
                </p>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Our annual survey shows that our team members love working here, with industry-leading retention rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section style={{
          padding: isMobile ? '60px 20px' : '120px 40px',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '56px',
              fontWeight: '700',
              marginBottom: '60px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Open positions
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px'
            }}>
              {[
                {
                  title: 'Senior Sales Agent',
                  location: 'Berwick',
                  type: 'Full-time'
                },
                {
                  title: 'Property Manager',
                  location: 'Narre Warren',
                  type: 'Full-time'
                },
                {
                  title: 'Marketing Coordinator',
                  location: 'All offices',
                  type: 'Part-time'
                },
                {
                  title: 'Sales Associate',
                  location: 'Cranbourne',
                  type: 'Full-time'
                }
              ].map((position, index) => (
                <Link key={index} href="/contact" style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '32px',
                  borderRadius: '12px',
                  display: 'block',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {position.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    opacity: 0.8,
                    marginBottom: '16px'
                  }}>
                    {position.location} • {position.type}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    <span>Apply now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '60px'
            }}>
              <p style={{
                fontSize: '18px',
                marginBottom: '24px',
                opacity: 0.9
              }}>
                Don't see the right role? We're always looking for talented people.
              </p>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 48px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '50px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Send us your resume
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '120px 40px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '56px',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Ready to make your move?
            </h2>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.5'
            }}>
              Take the first step towards an exciting career in real estate. Our team is ready to welcome you.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 48px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              Get in touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}