'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function StrategicUpgradeStory() {
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

      <main style={{ paddingTop: isMobile ? '160px' : '190px', backgroundColor: '#fff' }}>
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
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#666'
              }}>
                <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
                <span>/</span>
                <Link href="/stories" style={{ color: '#666', textDecoration: 'none' }}>Stories</Link>
                <span>/</span>
                <span style={{ color: '#000' }}>Strategic Upgrade</span>
              </div>
            </nav>

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
                  Upgrade Strategy
                </div>
                <h1 style={{
                  fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  marginBottom: isMobile ? '16px' : '24px',
                  color: '#000',
                  lineHeight: '1.1'
                }}>
                  The Johnson Family's Smart Upgrade Strategy
                </h1>
                <p style={{
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  How Mark and Lisa Johnson strategically timed their property upgrade to maximize their sale price and find their dream home.
                </p>
              </div>
              <div>
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
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#333'
            }}>
              <p>
                Mark and Lisa Johnson had outgrown their first home but were unsure about the best time to sell and buy. With two young children and a third on the way, they needed more space but were concerned about market timing and the costs of moving.
              </p>

              <p>
                "We were worried about selling in a down market or buying at the wrong time," Mark explains. "We also didn't know if we should sell first or buy first. It felt like a huge gamble."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Challenge: Market Timing and Strategy
              </h2>

              <p>
                The Johnsons' biggest concern was getting the timing right. "We had friends who had sold at the wrong time and lost money, or bought when prices were high," Lisa says. "We didn't want to make the same mistakes."
              </p>

              <p>
                Their agent conducted a comprehensive market analysis, examining local sales data, market trends, and seasonal patterns. "The agent showed us that our area had been consistently strong, and spring was typically the best time to sell our type of property," Mark notes.
              </p>

              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '24px',
                borderRadius: '8px',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  The Strategy: Market Analysis and Timing
                </h3>
                <p>The agent's analysis revealed several key insights:</p>
                <ul style={{ marginTop: '16px' }}>
                  <li><strong>Market Conditions:</strong> The local market had been stable for 18 months, with consistent demand for family homes.</li>
                  <li><strong>Seasonal Patterns:</strong> Spring was identified as the peak selling season for family homes.</li>
                  <li><strong>Property Type:</strong> Three-bedroom family homes in their area were in high demand.</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Decision: Sell First Strategy
              </h2>

              <p>
                Based on the market analysis, the agent recommended a "sell first" strategy. "We decided to sell first to know exactly how much we'd have for our next purchase," Lisa explains. "This gave us certainty and helped us negotiate from a position of strength."
              </p>

              <div style={{
                backgroundColor: '#fff3cd',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #ffc107',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#856404'
                }}>
                  Preparing for Sale
                </h3>
                <p>The agent recommended several improvements to maximize the sale price:</p>
                <ul style={{ marginTop: '16px', color: '#856404' }}>
                  <li><strong>Professional Staging:</strong> "The agent recommended professional staging, which cost $3,000 but increased our sale price by $25,000," Mark says.</li>
                  <li><strong>Minor Repairs:</strong> Fixed loose door handles, touched up paint, and replaced worn carpet in the main bedroom.</li>
                  <li><strong>Presentation:</strong> Decluttered, cleaned thoroughly, and made sure every room looked its best.</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Sale Result
              </h2>

              <p>
                The Johnsons' property sold for $15,000 above their target price. "We had three offers, and the successful buyer offered $15,000 more than our asking price," Lisa says. "The agent's strategy worked perfectly."
              </p>

              <p>
                The sale process was smooth and efficient. "The agent handled all the negotiations and kept us informed throughout," Mark explains. "We felt confident and supported throughout the entire process."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Perfect Upgrade
              </h2>

              <p>
                The Johnsons found their dream home: a four-bedroom family home with a large backyard and modern kitchen. "It had everything we needed for our growing family," Lisa says. "The price was right, and the location was perfect."
              </p>

              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #28a745',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#155724'
                }}>
                  Key Success Factors
                </h3>
                <ul style={{ color: '#155724' }}>
                  <li><strong>Professional staging</strong> - Cost $3,000 but increased sale price by $25,000</li>
                  <li><strong>Strategic pricing</strong> - Priced slightly below market to create competition, resulting in multiple offers</li>
                  <li><strong>Flexible settlement</strong> - Offered flexible settlement period, which made their property more attractive to buyers</li>
                  <li><strong>Market timing</strong> - Sold in spring when family buyers were most active</li>
                  <li><strong>Professional guidance</strong> - The agent's expertise and support made all the difference</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result
              </h2>

              <p>
                The Johnsons successfully upgraded to their dream home and are thrilled with the result. "We maximized our sale price and found exactly what we wanted," Lisa says. "The strategy worked perfectly, and we couldn't be happier with our new home."
              </p>

              <p>
                Their experience demonstrates that with the right strategy and professional guidance, families can successfully upgrade their homes while maximizing their financial position and finding the perfect property for their needs.
              </p>
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
              Ready to Upgrade Your Home?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Contact our team of experienced professionals who can help you develop a strategic plan for your property upgrade.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              }}>
                Get Professional Guidance
              </Link>
              <Link href="/stories" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '8px',
                border: '1px solid #fff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease'
              }}>
                Read More Stories
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}