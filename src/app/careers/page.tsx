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
        paddingTop: isMobile ? '90px' : '200px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '80px 20px' : '120px 40px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ maxWidth: '800px' }}>
              <h1 style={{
                fontSize: isMobile ? '40px' : '56px',
                fontWeight: '700',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                marginBottom: '24px',
                color: '#000'
              }}>
                Join our team
              </h1>
              <p style={{
                fontSize: isMobile ? '20px' : '24px',
                lineHeight: '1.4',
                color: '#666',
                marginBottom: '40px'
              }}>
                We're always looking for talented people who share our passion for real estate and commitment to excellence.
              </p>
              <Link href="#openings" style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                View open positions
              </Link>
            </div>
          </div>
        </section>

        {/* Why Grant's Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '80px 20px' : '120px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '48px',
              letterSpacing: '-0.02em'
            }}>
              Why Grant's?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '40px' : '80px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>Culture & Values</h3>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  We're more than just a real estate agency – we're a family of professionals dedicated to excellence, innovation, and community. Our culture celebrates success while maintaining work-life balance.
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {['Collaborative team environment', 'Continuous learning opportunities', 'Recognition and rewards', 'Community involvement'].map((item, index) => (
                    <li key={index} style={{
                      fontSize: '16px',
                      color: '#333',
                      marginBottom: '12px',
                      paddingLeft: '24px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#000',
                        borderRadius: '50%'
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>Benefits & Perks</h3>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  We invest in our people. From industry-leading commission structures to comprehensive training programs, we provide everything you need to succeed.
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {['Competitive compensation', 'Health and wellness benefits', 'Latest technology and tools', 'Flexible working arrangements'].map((item, index) => (
                    <li key={index} style={{
                      fontSize: '16px',
                      color: '#333',
                      marginBottom: '12px',
                      paddingLeft: '24px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#000',
                        borderRadius: '50%'
                      }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '80px 20px' : '120px 40px'
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <blockquote style={{
              margin: 0,
              padding: 0
            }}>
              <p style={{
                fontSize: isMobile ? '24px' : '32px',
                lineHeight: '1.4',
                fontStyle: 'italic',
                color: '#333',
                marginBottom: '32px',
                fontWeight: '300'
              }}>
                "Working at Grant's has been transformational for my career. The support, training, and opportunities for growth are unmatched in the industry."
              </p>
              <cite style={{
                fontSize: '18px',
                color: '#666',
                fontStyle: 'normal',
                display: 'block'
              }}>
                <strong>Sarah Mitchell</strong><br />
                Senior Sales Agent, 5 years with Grant's
              </cite>
            </blockquote>
          </div>
        </section>

        {/* Career Growth Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '80px 20px' : '120px 40px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '48px',
              letterSpacing: '-0.02em'
            }}>
              Your career journey
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: isMobile ? '32px' : '40px'
            }}>
              {[
                { step: '1', title: 'Join', desc: 'Start with comprehensive onboarding and training' },
                { step: '2', title: 'Learn', desc: 'Access mentorship and continuous education' },
                { step: '3', title: 'Grow', desc: 'Build your client base and expertise' },
                { step: '4', title: 'Lead', desc: 'Advance to leadership and specialization' }
              ].map((item, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#f8f8f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '24px',
                    fontWeight: '600'
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Current Openings */}
        <section id="openings" style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '80px 20px' : '120px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '60px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Open positions
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {[
                {
                  title: 'Senior Sales Agent',
                  location: 'Berwick',
                  type: 'Full-time',
                  department: 'Sales',
                  description: 'Join our top-performing sales team and leverage your experience to achieve exceptional results. We\'re seeking a seasoned professional with 5+ years in real estate sales.'
                },
                {
                  title: 'Property Manager',
                  location: 'Narre Warren',
                  type: 'Full-time',
                  department: 'Property Management',
                  description: 'Manage a diverse portfolio of residential properties while building strong relationships with both landlords and tenants. Growth opportunities available.'
                },
                {
                  title: 'Marketing Coordinator',
                  location: 'All Offices',
                  type: 'Part-time',
                  department: 'Marketing',
                  description: 'Drive our digital marketing initiatives and create compelling campaigns that showcase our properties and brand. Creative mindset essential.'
                },
                {
                  title: 'Sales Associate',
                  location: 'Cranbourne',
                  type: 'Full-time',
                  department: 'Sales',
                  description: 'Perfect entry-level opportunity for ambitious individuals looking to start their real estate career. Comprehensive training and mentorship provided.'
                },
                {
                  title: 'Administrative Assistant',
                  location: 'Berwick',
                  type: 'Full-time',
                  department: 'Administration',
                  description: 'Support our busy team with exceptional organizational skills and attention to detail. Real estate experience preferred but not essential.'
                }
              ].map((position, index) => (
                <Link key={index} href={`/careers/${position.title.toLowerCase().replace(/ /g, '-')}`} style={{
                  backgroundColor: '#fff',
                  padding: '32px',
                  display: 'block',
                  textDecoration: 'none',
                  color: '#000',
                  transition: 'all 0.2s ease',
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        {position.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666'
                      }}>
                        {position.department} • {position.location} • {position.type}
                      </p>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{
                      marginTop: '4px',
                      flexShrink: 0
                    }}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#666'
                  }}>
                    {position.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #f0f0f0',
          padding: isMobile ? '60px 20px' : '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '600',
              marginBottom: '16px',
              letterSpacing: '-0.01em'
            }}>
              Don't see the right role?
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.5'
            }}>
              We're always interested in meeting talented people. Send us your details and we'll be in touch when the right opportunity arises.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/contact" style={{
                padding: '16px 32px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                Get in touch
              </Link>
              <Link href="/about" style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '2px solid #000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
              }}>
                Learn about us
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}