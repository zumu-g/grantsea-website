'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function LandlordInsights() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const marketStats = [
    { value: '$580', label: 'Average Weekly Rent', detail: 'Across our service area' },
    { value: '1.2%', label: 'Vacancy Rate', detail: 'Well below state average' },
    { value: '4.2%', label: 'Average Yield', detail: 'Above regional average' },
    { value: '8.5%', label: 'Rental Growth', detail: 'Year on year increase' }
  ];

  const services = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      title: 'Property Management',
      description: 'Full-service property management including tenant screening, rent collection, maintenance coordination, and regular inspections.',
      link: '/contact'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: 'Rental Appraisals',
      description: 'Accurate market-based rental appraisals to ensure your property achieves maximum returns while minimizing vacancy periods.',
      link: '/appraisal'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: 'Tenant Selection',
      description: 'Rigorous screening process including employment verification, rental history checks, and reference validation for quality tenants.',
      link: '/contact'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Maintenance Network',
      description: 'Trusted network of qualified tradespeople for prompt, cost-effective maintenance and emergency repairs around the clock.',
      link: '/contact'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
      title: 'Regular Inspections',
      description: 'Scheduled property inspections with detailed reports and photography to protect your investment and maintain standards.',
      link: '/contact'
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: 'Financial Reporting',
      description: 'Comprehensive monthly statements, end-of-year summaries, and real-time access to your property performance data.',
      link: '/contact'
    }
  ];

  const insights = [
    {
      title: 'Southeast Melbourne rental demand surges',
      excerpt: 'Strong population growth and limited supply continue to drive rental demand across Berwick, Narre Warren, and surrounding suburbs.',
      date: 'December 2025'
    },
    {
      title: 'Understanding the new tenancy laws',
      excerpt: 'Key changes to Victorian rental legislation and what they mean for property investors and landlords.',
      date: 'November 2025'
    },
    {
      title: 'Maximising your rental yield',
      excerpt: 'Strategic improvements that deliver the best return on investment for rental properties in our region.',
      date: 'October 2025'
    }
  ];

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section */}
        <section style={{
          minHeight: isMobile ? '50vh' : '70vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '96px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '0.95',
              margin: '0 0 24px 0',
              color: '#000',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Landlord<br />
              Insights
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 0 48px 0',
              lineHeight: '1.4',
              fontWeight: '400'
            }}>
              Expert market intelligence and resources to help you maximise your rental property investment
            </p>
            <Link
              href="/appraisal"
              style={{
                display: 'inline-block',
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
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get rental appraisal
            </Link>
          </div>
        </section>

        {/* Market Stats */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Market snapshot
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '48px',
              maxWidth: '600px'
            }}>
              Current rental market conditions across Melbourne's south-east
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '32px' : '32px'
            }}>
              {marketStats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: hoveredStat === index ? 'translateY(-8px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div style={{
                    fontSize: isMobile ? '40px' : '56px',
                    fontWeight: '800',
                    color: '#000',
                    marginBottom: '8px',
                    transition: 'all 0.3s ease',
                    transform: hoveredStat === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: isMobile ? '14px' : '18px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '4px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    opacity: hoveredStat === index ? 1 : 0.7,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '64px',
              fontWeight: '700',
              marginBottom: '64px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              How we help landlords
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={service.link}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <div
                    style={{
                      padding: '40px',
                      backgroundColor: '#fff',
                      border: hoveredCard === index ? '1px solid #000' : '1px solid #e5e5e5',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      transform: hoveredCard === index ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: hoveredCard === index ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div style={{ marginBottom: '24px', color: '#000' }}>
                      {service.icon}
                    </div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#000'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      lineHeight: '1.6',
                      flex: 1
                    }}>
                      {service.description}
                    </p>
                    <div style={{
                      marginTop: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000',
                      transition: 'gap 0.2s ease'
                    }}>
                      Learn more
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Insights */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <h2 style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '700',
                color: '#000',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Latest insights
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {insights.map((insight, index) => (
                <article
                  key={index}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    aspectRatio: '16/9',
                    backgroundColor: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                    </svg>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {insight.date}
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#000',
                      marginBottom: '12px',
                      lineHeight: '1.3'
                    }}>
                      {insight.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6'
                    }}>
                      {insight.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Download */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '64px',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  Free landlord resources
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  Download our comprehensive guides covering everything from tenancy law updates to tax considerations and property investment strategies.
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {[
                    'Quarterly Rental Market Report',
                    'Victorian Tenancy Law Guide',
                    'Investment Property Tax Guide',
                    'Property Maintenance Checklist'
                  ].map((resource, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e5e5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="12" y1="18" x2="12" y2="12"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                      <span style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#000',
                        flex: 1
                      }}>
                        {resource}
                      </span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                backgroundColor: '#000',
                borderRadius: '4px',
                padding: isMobile ? '40px 24px' : '60px 48px',
                color: '#fff',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Get your free rental appraisal
                </h3>
                <p style={{
                  fontSize: '16px',
                  opacity: 0.8,
                  marginBottom: '32px',
                  lineHeight: '1.6'
                }}>
                  Find out what your property could achieve in today's rental market
                </p>
                <Link
                  href="/appraisal"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#fff',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Request appraisal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#000',
          color: '#fff',
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
              Ready to maximise your investment?
            </h2>
            <p style={{
              fontSize: '18px',
              opacity: 0.8,
              lineHeight: '1.6',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Our property management team is here to help you achieve the best returns from your investment property with less stress.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact our team
              </Link>
              <Link
                href="/appraisal"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get rental appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
