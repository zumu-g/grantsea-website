'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

const guides = [
  {
    id: 'first-home-buyers',
    title: 'First Home Buyer\'s Complete Guide',
    description: 'Everything you need to know about buying your first home in Casey & Cardinia',
    category: 'Buying',
    pages: '32 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    id: 'property-investment',
    title: 'Property Investment Strategy Guide',
    description: 'Build wealth through strategic property investment in Melbourne\'s growth corridors',
    category: 'Investing',
    pages: '48 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    id: 'selling-guide',
    title: 'Ultimate Property Selling Guide',
    description: 'Maximize your property\'s value and achieve the best sale price',
    category: 'Selling',
    pages: '28 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  },
  {
    id: 'suburb-profiles',
    title: 'Casey & Cardinia Suburb Profiles',
    description: 'In-depth analysis of every suburb in our service area',
    category: 'Research',
    pages: '156 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  },
  {
    id: 'market-report',
    title: 'Quarterly Market Report Q4 2024',
    description: 'Latest market data, trends, and forecasts for the local property market',
    category: 'Market Data',
    pages: '24 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    )
  },
  {
    id: 'renovation-guide',
    title: 'Pre-Sale Renovation Guide',
    description: 'Which renovations add the most value to your property',
    category: 'Selling',
    pages: '36 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    )
  },
  {
    id: 'rental-guide',
    title: 'Landlord & Tenant Guide',
    description: 'Rights, responsibilities, and best practices for rental properties',
    category: 'Renting',
    pages: '40 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    )
  },
  {
    id: 'auction-guide',
    title: 'Auction Success Guide',
    description: 'How to prepare for and win at property auctions',
    category: 'Buying',
    pages: '20 pages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )
  }
];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const categories = ['All', ...new Set(guides.map(g => g.category))];
  const filteredGuides = selectedCategory === 'All'
    ? guides
    : guides.filter(g => g.category === selectedCategory);

  return (
    <>
      <OncomHeader />

      <main style={{
        minHeight: '100vh',
        paddingTop: '64px',
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
              Property Guides & Resources
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Free expert guides to help you navigate every step of your property journey
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section style={{
          borderBottom: '1px solid #e5e5e5',
          backgroundColor: '#fff',
          position: 'sticky',
          top: '64px',
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: isMobile ? '20px' : '24px 0',
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: selectedCategory === category ? '#002b7f' : 'transparent',
                  color: selectedCategory === category ? '#fff' : '#666',
                  border: `1px solid ${selectedCategory === category ? '#002b7f' : '#e5e5e5'}`,
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#002b7f';
                    e.currentTarget.style.color = '#002b7f';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.color = '#666';
                  }
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Guides Grid */}
        <section style={{
          padding: isMobile ? '40px 20px' : '80px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '32px'
            }}>
              {filteredGuides.map(guide => (
                <Link
                  key={guide.id}
                  href={`/guides/download?guide=${guide.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#002b7f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e5e5';
                  }}>
                    {/* Guide Preview */}
                    <div style={{
                      backgroundColor: '#f8f8f8',
                      padding: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      aspectRatio: '16/9',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#002b7f',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                      }}>
                        {guide.icon}
                      </div>
                      <span style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        padding: '6px 12px',
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#666'
                      }}>
                        {guide.category}
                      </span>
                    </div>

                    {/* Guide Info */}
                    <div style={{
                      padding: '32px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <h3 style={{
                        fontSize: '22px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#000',
                        lineHeight: '1.3'
                      }}>
                        {guide.title}
                      </h3>
                      <p style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                        flex: 1
                      }}>
                        {guide.description}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{
                          fontSize: '14px',
                          color: '#999'
                        }}>
                          {guide.pages}
                        </span>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#002b7f',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          Download free
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#002b7f',
          color: '#fff',
          padding: isMobile ? '60px 20px' : '100px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              Can\'t find what you\'re looking for?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9
            }}>
              Our expert team is here to provide personalized advice for your unique situation
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
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
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
                Contact an expert
              </Link>
              <Link
                href="/appraisal"
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #fff',
                  transition: 'all 0.3s'
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
                Get free appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}