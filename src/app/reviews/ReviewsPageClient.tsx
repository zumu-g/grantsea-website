'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  suburb: string;
  agentName?: string;
  type: 'Buyer' | 'Seller' | 'Landlord' | 'Tenant';
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah & Michael Chen',
    rating: 5,
    date: '2 weeks ago',
    text: "Stuart was exceptional. He understood the Berwick market intimately and helped us secure our dream home. His knowledge of the area and negotiation skills were invaluable. The whole process was seamless from start to finish.",
    suburb: 'Berwick',
    agentName: 'Stuart Grant',
    type: 'Buyer'
  },
  {
    id: '2',
    author: 'The Thompson Family',
    rating: 5,
    date: '1 month ago',
    text: "Sold in just 12 days! Grant's provided excellent market analysis and their negotiation skills got us well above reserve. The marketing campaign was professional and effective.",
    suburb: 'Narre Warren',
    agentName: 'Jessica Lee',
    type: 'Seller'
  },
  {
    id: '3',
    author: 'Emma Williams',
    rating: 5,
    date: '1 month ago',
    text: "As first home buyers, we were guided every step of the way. Patient, honest, and they really fought for us during negotiations. Couldn't recommend them more highly.",
    suburb: 'Cranbourne',
    agentName: 'David Park',
    type: 'Buyer'
  },
  {
    id: '4',
    author: 'James Anderson',
    rating: 5,
    date: '2 months ago',
    text: "Professional and results-driven. Our investment property achieved rental returns above expectations. The property management team keeps everything running smoothly.",
    suburb: 'Pakenham',
    agentName: 'Rachel Smith',
    type: 'Landlord'
  },
  {
    id: '5',
    author: 'Lisa Martinez',
    rating: 5,
    date: '2 months ago',
    text: "We've bought and sold multiple properties with Grant's over the years. Their local knowledge is unmatched and they consistently deliver outstanding results.",
    suburb: 'Berwick',
    agentName: 'Tom Wilson',
    type: 'Seller'
  },
  {
    id: '6',
    author: 'Robert & Karen',
    rating: 5,
    date: '3 months ago',
    text: "Outstanding communication throughout the entire sale process. Weekly updates, honest feedback, and a fantastic result that exceeded our expectations.",
    suburb: 'Narre Warren North',
    agentName: 'Stuart Grant',
    type: 'Seller'
  },
  {
    id: '7',
    author: 'Amanda Foster',
    rating: 5,
    date: '3 months ago',
    text: "Renting through Grant's has been a great experience. The team is responsive, maintenance issues are handled quickly, and communication is excellent.",
    suburb: 'Officer',
    agentName: 'David Martinez',
    type: 'Tenant'
  },
  {
    id: '8',
    author: 'Mark & Julie Wong',
    rating: 5,
    date: '4 months ago',
    text: "They found us the perfect investment property in Clyde North. The analysis they provided on growth potential was spot on. Already seeing great returns.",
    suburb: 'Clyde North',
    agentName: 'Michael Chen',
    type: 'Buyer'
  }
];

const filterOptions = ['All', 'Buyer', 'Seller', 'Landlord', 'Tenant'];

export default function ReviewsPageClient({ googleReviewsSection }: { googleReviewsSection?: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const filteredReviews = activeFilter === 'All'
    ? reviews
    : reviews.filter(review => review.type === activeFilter);

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 6);

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>

        {/* Hero Section */}
        <section style={{
          minHeight: isMobile ? '40vh' : '50vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : isTablet ? '72px' : '96px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '0.95',
              margin: '0 0 24px 0',
              color: '#000',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Client<br />
              reviews
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '600px',
              margin: '0',
              lineHeight: '1.4',
              fontWeight: '400'
            }}>
              Hear from our clients about their experience working with our team
            </p>
          </div>
        </section>

        {/* Server-rendered Google reviews (absent when data unavailable) */}
        {googleReviewsSection}

        {/* Client stories heading + Filter Pills */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto 40px',
            textAlign: isMobile ? 'left' : 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              margin: '0 0 12px 0',
              color: '#000'
            }}>
              Client stories
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Selected experiences shared by our clients
            </p>
          </div>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'center'
          }}>
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setActiveFilter(option);
                  setShowAll(false);
                }}
                style={{
                  padding: '12px 24px',
                  borderRadius: '32px',
                  border: activeFilter === option ? '2px solid #000' : '1px solid #e5e5e5',
                  backgroundColor: activeFilter === option ? '#000' : '#fff',
                  color: activeFilter === option ? '#fff' : '#000',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== option) {
                    e.currentTarget.style.borderColor = '#000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== option) {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                  }
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        {/* Reviews Grid */}
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
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    padding: '32px',
                    backgroundColor: '#fff',
                    border: hoveredReview === review.id ? '1px solid #000' : '1px solid #e5e5e5',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    transform: hoveredReview === review.id ? 'translateY(-2px)' : 'translateY(0)',
                    boxShadow: hoveredReview === review.id ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                  onMouseEnter={() => setHoveredReview(review.id)}
                  onMouseLeave={() => setHoveredReview(null)}
                >
                  {/* Type Badge & Stars */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '32px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      {review.type}
                    </span>
                    <div style={{
                      display: 'flex',
                      gap: '2px'
                    }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill={star <= review.rating ? '#000' : '#e5e5e5'}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: '#000',
                    margin: '0 0 24px 0',
                    flex: 1
                  }}>
                    "{review.text}"
                  </p>

                  {/* Author Info */}
                  <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '20px'
                  }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '16px',
                      color: '#000',
                      marginBottom: '4px'
                    }}>
                      {review.author}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      {review.suburb} · {review.date}
                    </div>
                    {review.agentName && (
                      <Link
                        href={`/agent/${review.agentName.toLowerCase().replace(' ', '-')}`}
                        style={{
                          fontSize: '13px',
                          color: '#999',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#999';
                        }}
                      >
                        with {review.agentName}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {filteredReviews.length > 6 && !showAll && (
              <div style={{
                textAlign: 'center',
                marginTop: '48px'
              }}>
                <button
                  onClick={() => setShowAll(true)}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View all stories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Leave a Review */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Share your experience
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Had a great experience with our team? We'd love to hear from you. Your feedback helps others make informed decisions.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="https://g.page/r/review"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Review on Google
              </a>
              <a
                href="https://facebook.com/review"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Review on Facebook
              </a>
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
              Ready to experience the difference?
            </h2>
            <p style={{
              fontSize: '18px',
              opacity: 0.8,
              lineHeight: '1.6',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Join thousands of satisfied clients who have trusted us with their property journey.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
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
                Get a free appraisal
              </Link>
              <Link
                href="/contact"
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
                Contact us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
