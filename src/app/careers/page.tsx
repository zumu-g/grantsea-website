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
      
      <main style={{ 
        paddingTop: isMobile ? '60px' : '64px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section with Large Text */}
        <section style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          position: 'relative',
          padding: isMobile ? '40px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '1440px',
            width: '100%',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
          }}>
            <h1 style={{
              fontSize: isMobile ? '80px' : isTablet ? '120px' : '180px',
              fontWeight: '700',
              lineHeight: '0.85',
              letterSpacing: '-0.05em',
              marginBottom: '40px',
              color: '#000'
            }}>
              Dream<br />
              Together.
            </h1>
            <div style={{
              maxWidth: '600px',
              marginTop: '40px'
            }}>
              <p style={{
                fontSize: isMobile ? '20px' : '24px',
                lineHeight: '1.4',
                color: '#333',
                fontWeight: '400'
              }}>
                Join our passionate team shaping the future of real estate in Casey and Cardinia.
              </p>
            </div>
          </div>
        </section>

        {/* Full Width Image Section */}
        <section style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '60vh' : '80vh',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            opacity: 0.8
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '40px' : isTablet ? '60px' : '80px',
                fontWeight: '700',
                marginBottom: '20px',
                letterSpacing: '-0.03em'
              }}>
                Culture of Excellence
              </h2>
              <p style={{
                fontSize: isMobile ? '18px' : '20px',
                maxWidth: '600px',
                margin: '0 auto',
                opacity: 0.9
              }}>
                Where innovation meets tradition in real estate
              </p>
            </div>
          </div>
        </section>

        {/* Text Content Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'start'
          }}>
            <div>
              <h3 style={{
                fontSize: isMobile ? '32px' : '40px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Our Mission
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666'
              }}>
                To revolutionize the real estate experience in Melbourne's southeast through innovation, integrity, and exceptional service. We believe in creating lasting relationships and delivering results that exceed expectations.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: isMobile ? '32px' : '40px',
                fontWeight: '700',
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Our Vision
              </h3>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#666'
              }}>
                To be the most trusted and innovative real estate agency in Casey and Cardinia, known for our people-first approach and commitment to community growth.
              </p>
            </div>
          </div>
        </section>

        {/* Values Grid Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: '700',
              marginBottom: '60px',
              letterSpacing: '-0.03em',
              textAlign: 'center'
            }}>
              Our Values
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '2px',
              backgroundColor: '#fff',
              border: '2px solid #fff'
            }}>
              {[
                { number: '01', title: 'Integrity', desc: 'Honest and transparent in every interaction' },
                { number: '02', title: 'Innovation', desc: 'Embracing technology and new approaches' },
                { number: '03', title: 'Excellence', desc: 'Delivering exceptional results every time' },
                { number: '04', title: 'Community', desc: 'Building strong local connections' },
                { number: '05', title: 'Growth', desc: 'Continuous learning and development' },
                { number: '06', title: 'Passion', desc: 'Love what we do and who we serve' }
              ].map((value, index) => (
                <div key={index} style={{
                  backgroundColor: '#fff',
                  padding: isMobile ? '40px 30px' : '60px 40px',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}>
                  <div style={{
                    fontSize: '14px',
                    color: '#999',
                    marginBottom: '16px',
                    fontWeight: '500'
                  }}>
                    {value.number}
                  </div>
                  <h3 style={{
                    fontSize: isMobile ? '24px' : '28px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#000',
                    letterSpacing: '-0.01em'
                  }}>
                    {value.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#666'
                  }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Benefits Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: '700',
              marginBottom: '60px',
              letterSpacing: '-0.03em',
              textAlign: 'center'
            }}>
              Why Grant's?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '60px' : '100px',
              alignItems: 'center'
            }}>
              <div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  {[
                    'Industry-leading commission structure',
                    'Comprehensive training programs',
                    'Latest technology and marketing tools',
                    'Flexible working arrangements',
                    'Supportive team environment',
                    'Career progression opportunities',
                    'Health and wellness benefits',
                    'Recognition and rewards program'
                  ].map((benefit, index) => (
                    <li key={index} style={{
                      fontSize: '18px',
                      color: '#333',
                      paddingLeft: '32px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '2px',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: isMobile ? '80px' : '120px',
                  fontWeight: '700',
                  color: '#000',
                  lineHeight: '1',
                  marginBottom: '16px'
                }}>
                  98%
                </div>
                <p style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Team Satisfaction
                </p>
                <p style={{
                  fontSize: '16px',
                  color: '#666'
                }}>
                  Annual survey results 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: '700',
              marginBottom: '60px',
              letterSpacing: '-0.03em',
              textAlign: 'center'
            }}>
              Join Our Team
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {[
                {
                  title: 'Senior Sales Agent',
                  location: 'Berwick Office',
                  type: 'Full-time',
                  description: 'Lead sales professional with 5+ years experience'
                },
                {
                  title: 'Property Manager',
                  location: 'Narre Warren Office',
                  type: 'Full-time',
                  description: 'Manage residential portfolio with growth opportunities'
                },
                {
                  title: 'Marketing Coordinator',
                  location: 'All Offices',
                  type: 'Part-time',
                  description: 'Creative marketing professional for digital campaigns'
                },
                {
                  title: 'Sales Associate',
                  location: 'Cranbourne Office',
                  type: 'Full-time',
                  description: 'Entry-level sales role with mentorship program'
                },
                {
                  title: 'Administrative Assistant',
                  location: 'Berwick Office',
                  type: 'Full-time',
                  description: 'Support our busy team with admin excellence'
                },
                {
                  title: 'Business Development',
                  location: 'All Offices',
                  type: 'Full-time',
                  description: 'Drive growth and expand our market presence'
                }
              ].map((position, index) => (
                <Link key={index} href="/contact" style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '32px',
                  display: 'block',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {position.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    opacity: 0.7,
                    marginBottom: '16px'
                  }}>
                    {position.location} • {position.type}
                  </p>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    opacity: 0.9,
                    marginBottom: '24px'
                  }}>
                    {position.description}
                  </p>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    Apply Now
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 40px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '40px' : isTablet ? '56px' : '72px',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.03em'
            }}>
              Start Your Journey
            </h2>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.5'
            }}>
              Join Melbourne's most innovative real estate team and build the career you've always dreamed of.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/contact" style={{
                padding: '16px 40px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '40px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
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
                Apply Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link href="/about" style={{
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '2px solid #000',
                borderRadius: '40px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}