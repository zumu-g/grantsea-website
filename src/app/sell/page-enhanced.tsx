'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';

export default function SellPageEnhanced() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const sellingSteps = [
    {
      number: '01',
      title: 'Free Appraisal',
      description: 'Get an accurate market valuation from our expert agents who know your area inside out.',
      icon: '🏠'
    },
    {
      number: '02',
      title: 'Tailored Strategy',
      description: 'We create a customized marketing plan designed to attract the right buyers for your property.',
      icon: '📋'
    },
    {
      number: '03',
      title: 'Premium Marketing',
      description: 'Professional photography, virtual tours, and targeted advertising to showcase your home.',
      icon: '📸'
    },
    {
      number: '04',
      title: 'Expert Negotiation',
      description: 'Our skilled negotiators work to achieve the best possible price for your property.',
      icon: '🤝'
    },
    {
      number: '05',
      title: 'Seamless Settlement',
      description: 'We guide you through every step to ensure a smooth and stress-free settlement.',
      icon: '✅'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah & Michael Chen',
      location: 'Berwick',
      quote: 'Grant\'s team exceeded our expectations. They sold our home in just 12 days for $85,000 above our target price.',
      rating: 5
    },
    {
      name: 'The Thompson Family',
      location: 'Narre Warren',
      quote: 'Professional, knowledgeable, and genuinely caring. The best real estate experience we\'ve had.',
      rating: 5
    },
    {
      name: 'Robert Williams',
      location: 'Officer',
      quote: 'Their market knowledge and negotiation skills are unmatched. Highly recommend Grant\'s Estate Agents.',
      rating: 5
    }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: isMobile ? '90px' : '120px', backgroundColor: '#fff' }}>
        {/* Hero Section - Minimalist */}
        <section style={{
          minHeight: isMobile ? '60vh' : '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle gradient overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)'
          }} />
          
          <div style={{
            position: 'relative',
            textAlign: 'center',
            padding: isMobile ? '0 20px' : '0 40px',
            maxWidth: '1000px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '96px',
              fontWeight: '200',
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              lineHeight: '0.9',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Sell with<br />Confidence
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              marginBottom: '48px',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: '1.4',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Experience premium service and exceptional results with Melbourne's trusted property experts
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/appraisal"
                style={{
                  padding: '18px 48px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                  border: '2px solid #fff',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
              >
                Get Free Appraisal
              </Link>
              <a
                href="tel:1300000000"
                style={{
                  padding: '18px 48px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                  border: '2px solid #fff',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Call 1300 000 000
              </a>
            </div>
          </div>
        </section>

        {/* The Selling Process - Interactive Steps */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 0',
          backgroundColor: '#fafafa'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '0' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '0' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '300',
              textAlign: 'center',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Your Selling Journey
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              textAlign: 'center',
              marginBottom: '80px',
              maxWidth: '600px',
              margin: '0 auto 80px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              A transparent, step-by-step process designed to maximize your property's value
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
              gap: isMobile ? '40px' : '0'
            }}>
              {sellingSteps.map((step, index) => (
                <div
                  key={index}
                  onClick={() => setActiveStep(index)}
                  style={{
                    textAlign: 'center',
                    padding: '0 20px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Progress Line (desktop only) */}
                  {!isMobile && index < sellingSteps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '40px',
                      left: '50%',
                      right: '-50%',
                      height: '2px',
                      backgroundColor: activeStep > index ? '#000' : '#e5e5e5',
                      transition: 'background-color 0.3s ease',
                      zIndex: 1
                    }} />
                  )}
                  
                  {/* Step Number Circle */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: activeStep >= index ? '#000' : '#fff',
                    color: activeStep >= index ? '#fff' : '#000',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '24px',
                    fontWeight: '300',
                    position: 'relative',
                    zIndex: 2,
                    transition: 'all 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {step.number}
                  </div>
                  
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: activeStep === index ? '#000' : '#666',
                    transition: 'color 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {step.title}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6',
                    opacity: activeStep === index ? 1 : 0.7,
                    transition: 'opacity 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us - Grid */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 0',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '0' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '0' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '300',
              textAlign: 'center',
              marginBottom: '80px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              The Grant's Advantage
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '60px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '40px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '300',
                    marginBottom: '16px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Local Market Leaders</h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.8',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    With over 25 years serving Melbourne's South East, we have unmatched knowledge of local market conditions, buyer preferences, and pricing trends.
                  </p>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '300',
                    marginBottom: '16px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Premium Marketing</h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.8',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    Professional photography, 3D virtual tours, drone footage, and targeted digital campaigns ensure your property reaches the right buyers.
                  </p>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '300',
                    marginBottom: '16px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Proven Results</h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.8',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    Our properties sell on average 12% above initial expectations and 21 days faster than the market average.
                  </p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#f5f5f5',
                padding: '60px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{
                  fontSize: '72px',
                  fontWeight: '200',
                  marginBottom: '24px',
                  lineHeight: '1',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>500+</h3>
                <p style={{
                  fontSize: '18px',
                  marginBottom: '40px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Properties sold in 2023</p>

                <h3 style={{
                  fontSize: '72px',
                  fontWeight: '200',
                  marginBottom: '24px',
                  lineHeight: '1',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>98%</h3>
                <p style={{
                  fontSize: '18px',
                  marginBottom: '40px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Client satisfaction rate</p>

                <h3 style={{
                  fontSize: '72px',
                  fontWeight: '200',
                  marginBottom: '24px',
                  lineHeight: '1',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>21</h3>
                <p style={{
                  fontSize: '18px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Average days on market</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 0',
          backgroundColor: '#fafafa'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '0' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '0' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '300',
              textAlign: 'center',
              marginBottom: '80px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Client Success Stories
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '40px'
            }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#fff',
                    padding: '40px',
                    borderRadius: '0',
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '24px'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFD700">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    marginBottom: '24px',
                    fontStyle: 'italic',
                    color: '#333',
                    fontFamily: 'Georgia, serif'
                  }}>
                    "{testimonial.quote}"
                  </p>
                  
                  <div>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '4px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      {testimonial.name}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px 0',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '300',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Ready to Sell?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.6',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Get started with a free, no-obligation property appraisal from our expert team
            </p>
            <Link
              href="/appraisal"
              style={{
                display: 'inline-block',
                padding: '20px 60px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'all 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Request Free Appraisal
            </Link>
          </div>
        </section>
      </main>

      <OncomFooter />
    </>
  );
}