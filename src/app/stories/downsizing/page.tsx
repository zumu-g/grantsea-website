'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function DownsizingStory() {
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
                <span style={{ color: '#000' }}>Downsizing Success</span>
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
                  Downsizing Success
                </div>
                <h1 style={{
                  fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  marginBottom: isMobile ? '16px' : '24px',
                  color: '#000',
                  lineHeight: '1.1'
                }}>
                  Margaret's Journey: From Family Home to Perfect Retirement
                </h1>
                <p style={{
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  How Margaret Williams successfully downsized from her family home to create the perfect retirement lifestyle.
                </p>
              </div>
              <div>
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
                At 65, Margaret Williams was ready to downsize. Her four-bedroom family home in Berwick was too large for her needs, and the maintenance was becoming overwhelming. She wanted to simplify her life and free up capital for retirement.
              </p>

              <p>
                "I loved my home, but it was time for a change," Margaret explains. "I wanted something smaller, easier to maintain, and closer to amenities. But I was worried about making the wrong decision."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Challenge: Emotional Attachment
              </h2>

              <p>
                Margaret's biggest challenge was emotional attachment to her family home. "I raised my children there, and it held so many memories. I was worried I'd regret selling it."
              </p>

              <p>
                The home had been in the family for 35 years, and every room held special memories. "I had to come to terms with the fact that the house was just a building," Margaret says. "The memories would always be with me, regardless of where I lived."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Solution: Professional Guidance
              </h2>

              <p>
                Her agent helped her understand that downsizing was about creating a new chapter, not losing the past. "The agent showed me how to honor the memories while embracing the future. They helped me see the practical benefits of downsizing."
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
                  The Strategy: Defining Needs and Wants
                </h3>
                <p>The agent helped Margaret define what she really needed in her new home:</p>
                <div style={{ marginTop: '16px' }}>
                  <p><strong>Essential Requirements:</strong></p>
                  <ul>
                    <li>Two bedrooms (one for guests)</li>
                    <li>Low maintenance</li>
                    <li>Single level (no stairs)</li>
                    <li>Proximity to shops and transport</li>
                    <li>Secure parking</li>
                    <li>Small garden or courtyard</li>
                  </ul>
                </div>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                Maximizing the Sale Price
              </h2>

              <p>
                The agent recommended several improvements to maximize Margaret's sale price. Professional staging cost $2,500 but increased the sale price by $20,000. They also made minor repairs and helped with decluttering and organizing the home for maximum appeal.
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
                  The Marketing Strategy
                </h3>
                <p>The agent developed a comprehensive marketing strategy:</p>
                <ul style={{ marginTop: '16px', color: '#856404' }}>
                  <li><strong>Pricing Strategy:</strong> Priced the property competitively to attract multiple buyers</li>
                  <li><strong>Marketing Campaign:</strong> Used multiple marketing channels, including online listings, print advertising, and open homes</li>
                  <li><strong>Open Homes:</strong> Conducted well-organized open homes that showcased the property's best features</li>
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
                Margaret's property sold for $20,000 above her target price. "We had four offers, and the successful buyer offered $20,000 more than our asking price," Margaret says. "The agent's strategy worked perfectly."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Perfect Retirement Home
              </h2>

              <p>
                Margaret found her dream home: a two-bedroom unit in a modern complex with a small courtyard and modern kitchen. "It had everything I needed for retirement," Margaret says. "The price was right, and the location was perfect."
              </p>

              <div style={{
                backgroundColor: '#e7f3ff',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #007bff',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#004085'
                }}>
                  Property Features
                </h3>
                <ul style={{ color: '#004085' }}>
                  <li>Two bedrooms with built-in wardrobes</li>
                  <li>Modern kitchen with quality appliances</li>
                  <li>Ensuite bathroom and main bathroom</li>
                  <li>Small courtyard for gardening</li>
                  <li>Secure parking and storage</li>
                  <li>Proximity to shops and transport</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Financial Benefits
              </h2>

              <p>
                Margaret's downsizing decision provided significant financial benefits. She released $330,000 in capital, which she's invested for retirement income. Her new home has lower maintenance and utility costs, saving money every month.
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
                  <li><strong>Professional guidance</strong> - The agent's expertise and support was essential</li>
                  <li><strong>Emotional preparation</strong> - Coming to terms with letting go of the family home</li>
                  <li><strong>Clear strategy</strong> - Having a clear plan for selling and buying made the process manageable</li>
                  <li><strong>Realistic expectations</strong> - Focusing on what she really needed, not what she thought she wanted</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result: A Perfect Retirement
              </h2>

              <p>
                Margaret's downsizing decision has been a complete success. "I love my new home and my new lifestyle," she says. "I have everything I need without the stress of maintaining a large home."
              </p>

              <p>
                Her financial position is stronger, her lifestyle is simpler, and she's enjoying retirement more than ever. "Downsizing was the best decision I could have made," Margaret concludes. "I'm living proof that you can create a perfect retirement lifestyle by making the right property decisions."
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
              Ready to Downsize Your Home?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Contact our team of experienced professionals who can help you create the perfect retirement lifestyle.
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