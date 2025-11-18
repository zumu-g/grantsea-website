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
      description: 'Calculate the costs and cash requirements when selling your current home and buying a new one',
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4"/>
          <path d="M12 18v4"/>
        </svg>
      ),
      features: ['Selling costs breakdown', 'Buying expenses', 'Cash requirements', 'Agent commission calculator'],
      link: '/calculators/buy-sell'
    },
    {
      id: 'borrowing-capacity',
      title: 'Borrowing capacity',
      description: 'Discover your maximum borrowing capacity based on your income, expenses, and financial situation',
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      features: ['Income assessment', 'Expense analysis', 'Debt service ratios', 'Employment type factors'],
      link: '/calculators/borrowing-capacity'
    },
    {
      id: 'stamp-duty',
      title: 'Stamp duty',
      description: 'Calculate stamp duty and government fees for your property purchase in Victoria',
      icon: (
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      features: ['Victorian stamp duty rates', 'First home buyer concessions', 'Detailed breakdown', 'Additional costs guide'],
      link: '/calculators/stamp-duty'
    }
  ];

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - ON.COM Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#000',
              lineHeight: '1.1',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Property calculators
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              maxWidth: '600px',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              Make informed property decisions with our comprehensive financial calculators
            </p>
          </div>
        </section>

        {/* Calculators Grid - ON.COM Style */}
        <section style={{
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '24px' : '32px'
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
                      padding: isMobile ? '32px' : '48px',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      color: '#002b7f',
                      marginBottom: '32px'
                    }}>
                      {calculator.icon}
                    </div>

                    <h2 style={{
                      fontSize: '28px',
                      fontWeight: '700',
                      marginBottom: '16px',
                      color: '#000',
                      letterSpacing: '-0.01em',
                      lineHeight: '1.2'
                    }}>
                      {calculator.title}
                    </h2>

                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '32px',
                      flex: 1
                    }}>
                      {calculator.description}
                    </p>

                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '32px'
                    }}>
                      {calculator.features.map((feature, index) => (
                        <li key={index} style={{
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'flex-start'
                        }}>
                          <span style={{
                            color: '#002b7f',
                            marginRight: '12px'
                          }}>•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#002b7f',
                      marginTop: 'auto'
                    }}>
                      Use calculator
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - ON.COM Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '44px' : '48px',
              fontWeight: '700',
              marginBottom: '48px',
              textAlign: 'left',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Why use our calculators
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '48px' : '64px'
            }}>
              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002b7f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Accurate calculations
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Up-to-date rates based on current Victorian regulations and banking criteria
                </p>
              </div>

              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002b7f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Instant results
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Get immediate estimates without waiting. All calculations happen instantly
                </p>
              </div>

              <div>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#f0f4ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#002b7f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Completely private
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  All calculations are done in your browser. No personal information is stored
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - ON.COM Style */}
        <section style={{
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Need personalised advice?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}>
              While our calculators provide accurate estimates, every situation is unique. 
              Speak with our experienced team for personalised property advice.
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
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001d5c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
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
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #002b7f',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#002b7f';
                }}
              >
                Get free appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}