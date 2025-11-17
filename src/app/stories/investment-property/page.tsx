'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function InvestmentPropertyStory() {
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
                <span style={{ color: '#000' }}>Investment Success</span>
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
                  Investment Success
                </div>
                <h1 style={{
                  fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  marginBottom: isMobile ? '16px' : '24px',
                  color: '#000',
                  lineHeight: '1.1'
                }}>
                  David's Journey: From First Investment to Portfolio Building
                </h1>
                <p style={{
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  How David Chen built a successful property investment portfolio by learning the fundamentals and working with the right professionals.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop&q=80"
                  alt="Investment property success"
                  style={{
                    width: '100%',
                    height: isMobile ? '250px' : isTablet ? '350px' : '400px',
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
                David Chen had been saving for years and was ready to make his first property investment. As a software engineer with a stable income, he wanted to build wealth through property but didn't know where to start or what to look for.
              </p>

              <p>
                "I had the money and the motivation, but I didn't understand the fundamentals of property investment," David admits. "I was looking at properties based on price alone, not considering yield, growth potential, or rental demand."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Education: Learning the Fundamentals
              </h2>

              <p>
                David's breakthrough came when he attended a property investment seminar and connected with an agent who specialized in investment properties. "The agent taught me to think like an investor, not a homeowner. It completely changed my approach."
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
                  Key Investment Principles Learned
                </h3>
                <ul style={{ marginTop: '16px' }}>
                  <li><strong>Location is everything</strong> - The agent showed David areas with strong rental demand and growth potential, not just cheap properties.</li>
                  <li><strong>Numbers matter</strong> - David learned to calculate yield, cash flow, and growth potential before making any decisions.</li>
                  <li><strong>Tenant appeal</strong> - Understanding what tenants want: proximity to transport, schools, and amenities.</li>
                  <li><strong>Long-term thinking</strong> - Focus on capital growth over short-term rental yield.</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The First Purchase: A Strategic Choice
              </h2>

              <p>
                David's first investment was a two-bedroom unit near a train station in Narre Warren. "The agent showed me the rental demand data, growth projections, and helped me negotiate a good price. The numbers made sense."
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
                  Property Analysis
                </h3>
                <ul style={{ color: '#004085' }}>
                  <li><strong>Purchase price:</strong> $420,000</li>
                  <li><strong>Rental yield:</strong> 4.2%</li>
                  <li><strong>Vacancy rate:</strong> 2.1% (below market average)</li>
                  <li><strong>Growth potential:</strong> Strong due to infrastructure development</li>
                  <li><strong>Tenant appeal:</strong> High due to transport and amenities</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Results: Exceeding Expectations
              </h2>

              <p>
                David's first investment exceeded all expectations. The property rented immediately and has never been vacant for more than a week. The rental yield has been consistent at 4.2%, and the property has increased in value by 15% in the first two years.
              </p>

              <p>
                "The property has been cash flow positive from day one," David explains. "I'm earning money while building equity."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                Building the Portfolio: Using Equity Strategically
              </h2>

              <p>
                Within 18 months, David had purchased two more investment properties using the equity from his first purchase. "The agent helped me understand how to use equity to grow my portfolio strategically," David says.
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
                  Portfolio Growth
                </h3>
                <p><strong>Second Property:</strong> A three-bedroom house in Cranbourne for $580,000</p>
                <ul style={{ marginBottom: '16px', color: '#856404' }}>
                  <li>Rental yield: 3.8%</li>
                  <li>Growth potential: Strong due to new infrastructure</li>
                  <li>Tenant appeal: High due to family-friendly location</li>
                </ul>
                <p><strong>Third Property:</strong> A two-bedroom unit in Pakenham for $450,000</p>
                <ul style={{ color: '#856404' }}>
                  <li>Rental yield: 4.5%</li>
                  <li>Growth potential: Excellent due to population growth</li>
                  <li>Tenant appeal: High due to transport and amenities</li>
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
                David's investment strategy has provided significant financial benefits. He's earning passive income from rental properties while building equity, benefiting from tax advantages through negative gearing and depreciation, and building wealth through property appreciation.
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
                  <li><strong>Professional education</strong> - Learning the fundamentals was essential</li>
                  <li><strong>Market analysis</strong> - The agent's market analysis was crucial</li>
                  <li><strong>Financial planning</strong> - Understanding the financial aspects was key</li>
                  <li><strong>Long-term thinking</strong> - Focus on long-term growth, not short-term gains</li>
                  <li><strong>Professional guidance</strong> - Working with an agent who understood investment properties was essential</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result: A Successful Investment Strategy
              </h2>

              <p>
                David's investment journey demonstrates that with the right education, guidance, and strategy, property investment can be a powerful wealth-building tool. His portfolio has provided both passive income and capital growth, while his knowledge and experience continue to grow.
              </p>

              <p>
                "Property investment has changed my life," David says. "I'm building wealth, creating passive income, and securing my financial future. The key was learning the fundamentals and working with the right professionals."
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
              Ready to Start Your Investment Journey?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Contact our team of experienced professionals who can help you develop a successful investment strategy.
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