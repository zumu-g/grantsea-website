'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function CalculatorsPage() {
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

  const calculators = [
    {
      id: 'buy-sell',
      title: 'Buy & sell calculator',
      description: 'Calculate the costs when selling your current home and buying a new one',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      link: '/calculators/buy-sell'
    },
    {
      id: 'borrowing-capacity',
      title: 'Borrowing capacity',
      description: 'Discover your maximum borrowing capacity based on your financial situation',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
      link: '/calculators/borrowing-capacity'
    },
    {
      id: 'stamp-duty',
      title: 'Stamp duty',
      description: 'Calculate stamp duty and government fees for your property purchase',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
      ),
      link: '/calculators/stamp-duty'
    }
  ];

  return (
    <React.Fragment>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - Minimalist ON.COM Style */}
        <section style={{
          paddingTop: isMobile ? '40px' : '64px',
          paddingBottom: isMobile ? '40px' : '64px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '40px' : '64px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              marginBottom: '8px',
              color: '#000',
              lineHeight: '1.1',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Property calculators
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              Make informed decisions with our financial tools
            </p>
          </div>
        </section>

        {/* Calculators Grid - Clean ON.COM Style */}
        <section style={{
          paddingBottom: isMobile ? '80px' : '120px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '16px' : '24px'
            }}>
              {calculators.map((calculator) => (
                <Link
                  key={calculator.id}
                  href={calculator.link}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      padding: isMobile ? '32px 24px' : '48px',
                      transition: 'all 0.2s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    <div style={{
                      marginBottom: '24px',
                      color: '#000'
                    }}>
                      {calculator.icon}
                    </div>

                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#000',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.2'
                    }}>
                      {calculator.title}
                    </h2>

                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      flex: 1
                    }}>
                      {calculator.description}
                    </p>

                    <div style={{
                      marginTop: '32px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#000',
                      color: '#fff',
                      borderRadius: '32px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                    }}>
                      Calculate now
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

        {/* Trust Section - Clean ON.COM Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '48px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Trusted calculations
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: isMobile ? '32px' : '48px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  100%
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  Accurate rates
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  <2s
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  Instant results
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  VIC
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  State specific
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  $0
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.4'
                }}>
                  Free to use
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Minimalist ON.COM Style */}
        <section style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Need advice?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Our experienced team can provide personalised guidance for your situation.
            </p>
            <Link
              href="/contact"
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
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
              }}
            >
              Contact our team
            </Link>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}