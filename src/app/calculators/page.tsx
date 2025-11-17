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
      title: 'Buy & Sell Calculator',
      description: 'Calculate the costs and cash requirements when selling your current home and buying a new one',
      icon: '🔄',
      features: ['Selling costs breakdown', 'Buying expenses', 'Cash requirements', 'Agent commission calculator'],
      buttonText: 'Calculate Buy & Sell Costs'
    },
    {
      id: 'borrowing-capacity',
      title: 'How Much Can I Borrow?',
      description: 'Discover your maximum borrowing capacity based on your income, expenses, and financial situation',
      icon: '💰',
      features: ['Income assessment', 'Expense analysis', 'Debt service ratios', 'Employment type factors'],
      buttonText: 'Calculate Borrowing Power'
    },
    {
      id: 'stamp-duty',
      title: 'Stamp Duty Calculator',
      description: 'Calculate stamp duty and government fees for your property purchase in Victoria',
      icon: '📋',
      features: ['Victorian stamp duty rates', 'First home buyer concessions', 'Detailed breakdown', 'Additional costs guide'],
      buttonText: 'Calculate Stamp Duty'
    }
  ];

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '100px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              Property Calculators
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Make informed property decisions with our comprehensive suite of financial calculators
            </p>
          </div>
        </section>

        {/* Calculators Grid */}
        <section style={{
          padding: isMobile ? '60px 20px' : '100px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '40px' : '50px'
          }}>
            {calculators.map((calculator) => (
              <div
                key={calculator.id}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '40px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#002b7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                <div style={{
                  fontSize: '64px',
                  marginBottom: '20px'
                }}>
                  {calculator.icon}
                </div>

                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  {calculator.title}
                </h2>

                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '30px',
                  flex: 1
                }}>
                  {calculator.description}
                </p>

                <div style={{
                  marginBottom: '30px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '15px',
                    color: '#002b7f'
                  }}>
                    Features:
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {calculator.features.map((feature, index) => (
                      <li key={index} style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#002b7f',
                          borderRadius: '50%',
                          marginRight: '10px'
                        }}></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/calculators/${calculator.id}`}
                  style={{
                    display: 'flex',
                    padding: isMobile ? '16px 24px' : '14px 28px',
                    backgroundColor: '#002b7f',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    minHeight: '48px',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#001a5c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#002b7f';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {calculator.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Why Use Our Calculators */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#000'
            }}>
              Why Use Our Calculators?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '50px',
              maxWidth: '800px',
              margin: '0 auto 50px auto',
              lineHeight: '1.6'
            }}>
              Our property calculators are designed by real estate professionals to give you accurate,
              up-to-date estimates for your property journey.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: isMobile ? '30px' : '40px',
              marginTop: '50px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#002b7f',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  fontSize: '32px'
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Accurate Calculations
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Up-to-date rates and formulas based on current Victorian government regulations and banking criteria.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#002b7f',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  fontSize: '32px'
                }}>
                  ⚡
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Instant Results
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  Get immediate estimates without waiting. All calculations happen instantly as you type.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#002b7f',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  fontSize: '32px'
                }}>
                  🔒
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Completely Private
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  All calculations are done in your browser. No personal information is stored or shared.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section style={{
          backgroundColor: '#002b7f',
          color: '#fff',
          padding: isMobile ? '60px 20px' : '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Need Personalized Advice?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              While our calculators provide accurate estimates, every situation is unique.
              Speak with our experienced team for personalized property advice.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  padding: isMobile ? '18px 32px' : '16px 32px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  minHeight: '48px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact Our Team
              </Link>
              <Link
                href="/appraisal"
                style={{
                  display: 'flex',
                  padding: isMobile ? '18px 32px' : '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #fff',
                  transition: 'all 0.3s ease',
                  minHeight: '48px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#002b7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Get Free Appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}