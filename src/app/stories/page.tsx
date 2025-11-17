'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function StoriesPage() {
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
      
      <main style={{ paddingTop: isMobile ? '90px' : '190px', backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <section style={{
          paddingTop: isMobile ? '40px' : isTablet ? '60px' : '80px',
          paddingBottom: isMobile ? '40px' : isTablet ? '60px' : '80px',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '16px' : '24px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              Property Journey Stories
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              lineHeight: '1.6',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Real advice from real experiences. Learn from five essential property stories that every buyer and seller should read.
            </p>
          </div>
        </section>

        {/* Story 1: Sarah's First-Time Buyer Journey */}
        <section id="first-time-buyer" style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  First Home Success
                </div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Sarah's Journey: From Renter to Homeowner in 6 Months
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  Sarah Thompson had been renting in Melbourne's inner suburbs for five years when she decided it was time to buy her first home. At 28, she had a stable job in marketing and had saved a modest deposit, but the property market felt overwhelming and intimidating.
                </p>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Key Lessons Learned
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Get pre-approved first</strong> - Knowing exactly how much she could borrow gave her confidence and helped focus her search.
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Budget for hidden costs</strong> - She had no idea about stamp duty, legal fees, building inspections, and other costs.
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Location vs. Property</strong> - She had to compromise on the property to get the location she wanted.
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      <strong>Don't fall in love too quickly</strong> - She learned to keep emotions in check and always get a building inspection.
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#155724',
                    margin: 0
                  }}>
                    Result: Sarah successfully purchased a two-bedroom unit in Berwick for $580,000. "I'm now building equity instead of paying someone else's mortgage."
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80"
                  alt="First home buyer success story"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story 2: The Johnson Family's Strategic Upgrade */}
        <section id="strategic-upgrade" style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div style={{ order: isMobile ? 2 : 1 }}>
                <img 
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&q=80"
                  alt="Family upgrading to larger home"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
              <div style={{ order: isMobile ? 1 : 2 }}>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  Upgrade Strategy
                </div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  The Johnson Family's Smart Upgrade Strategy
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  Mark and Lisa Johnson had outgrown their first home but were unsure about the best time to sell and buy. With two young children and a third on the way, they needed more space but were concerned about market timing and the costs of moving.
                </p>
                <div style={{
                  backgroundColor: '#fff',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Success Factors
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Professional staging</strong> - Cost $3,000 but increased sale price by $25,000
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Strategic pricing</strong> - Priced slightly below market to create competition
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Flexible settlement</strong> - Made their property more attractive to buyers
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      <strong>Market timing</strong> - Sold in spring when family buyers were most active
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#155724',
                    margin: 0
                  }}>
                    Result: Sold for $15,000 above target price and found their dream home within three months.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story 3: David's Investment Success */}
        <section id="investment-success" style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  Investment Success
                </div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  David's Journey: Building a Property Portfolio
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  David Chen had been saving for years and was ready to make his first property investment. As a software engineer with a stable income, he wanted to build wealth through property but didn't know where to start or what to look for.
                </p>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Investment Principles Learned
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Location is everything</strong> - Focus on areas with strong rental demand and growth potential
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Numbers matter</strong> - Calculate yield, cash flow, and growth potential before deciding
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Tenant appeal</strong> - Consider proximity to transport, schools, and amenities
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      <strong>Long-term thinking</strong> - Focus on capital growth over short-term rental yield
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#155724',
                    margin: 0,
                    marginBottom: '8px'
                  }}>
                    Results: First investment in Narre Warren
                  </p>
                  <ul style={{ 
                    fontSize: '14px',
                    color: '#155724',
                    margin: 0,
                    paddingLeft: '16px'
                  }}>
                    <li>Purchase price: $420,000</li>
                    <li>Rental yield: 4.2%</li>
                    <li>Capital growth: 15% in first two years</li>
                    <li>Cash flow positive from day one</li>
                  </ul>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop&q=80"
                  alt="Investment property success"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story 4: Margaret's Downsizing */}
        <section id="downsizing-success" style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div style={{ order: isMobile ? 2 : 1 }}>
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop&q=80"
                  alt="Downsizing to retirement home"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
              <div style={{ order: isMobile ? 1 : 2 }}>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  Downsizing Success
                </div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  Margaret's Perfect Retirement Move
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  At 65, Margaret Williams was ready to downsize. Her four-bedroom family home in Berwick was too large for her needs, and the maintenance was becoming overwhelming. She wanted to simplify her life and free up capital for retirement.
                </p>
                <div style={{
                  backgroundColor: '#fff',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    The Strategy
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Define your needs</strong> - Two bedrooms, low maintenance, proximity to shops and transport
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Maximize sale price</strong> - Invested in minor improvements and professional presentation
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Find the right replacement</strong> - Perfect two-bedroom unit that met all criteria
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      <strong>Time the transition</strong> - Coordinated sale and purchase to minimize stress
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#155724',
                    margin: 0,
                    marginBottom: '8px'
                  }}>
                    Results:
                  </p>
                  <ul style={{ 
                    fontSize: '14px',
                    color: '#155724',
                    margin: 0,
                    paddingLeft: '16px'
                  }}>
                    <li>Sold for $850,000 (above expectations)</li>
                    <li>New home: $520,000 (perfect for her needs)</li>
                    <li>Capital released: $330,000 for retirement</li>
                    <li>Reduced ongoing costs and maintenance stress</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story 5: Market Timing Masterclass */}
        <section id="market-timing" style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  Market Timing
                </div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  lineHeight: '1.2'
                }}>
                  The Patel Family's Market Navigation Success
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  Raj and Priya Patel had been watching the property market for two years, waiting for the "right time" to buy their first home. They were concerned about market volatility and wanted to avoid buying at the peak of a cycle.
                </p>
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '24px',
                  borderRadius: '8px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Key Market Insights
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Time in market beats timing the market</strong> - Property values generally increase over time
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Focus on your needs</strong> - Find the right property for your needs, not market predictions
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #e5e5e5' }}>
                      <strong>Market conditions affect everyone</strong> - When prices are low, competition is high
                    </li>
                    <li style={{ padding: '8px 0' }}>
                      <strong>Long-term thinking</strong> - They were buying a home, not making a short-term investment
                    </li>
                  </ul>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '20px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #28a745'
                }}>
                  <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#155724',
                    margin: 0
                  }}>
                    Result: The Patels stopped trying to time the market and focused on finding the right home. "It was the best decision we could have made."
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop&q=80"
                  alt="Market timing and property purchase decision"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#fff',
              lineHeight: '1.2'
            }}>
              Ready to Start Your Property Journey?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Don't go it alone. Professional guidance can help you avoid costly mistakes and achieve your property goals with confidence.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#fff',
              color: '#000',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Professional Guidance
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}