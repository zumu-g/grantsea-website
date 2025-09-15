'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';
import Link from 'next/link';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: 'google' | 'facebook';
  text: string;
  propertyAddress?: string;
  agentName?: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    rating: 5,
    date: '2 weeks ago',
    source: 'google',
    text: 'Exceptional service from start to finish! Our agent Stuart was incredibly knowledgeable about the Berwick market and helped us secure our dream home. The whole team at Grant\'s made the process smooth and stress-free.',
    propertyAddress: 'Berwick',
    agentName: 'Stuart Grant',
    verified: true
  },
  {
    id: '2',
    author: 'Michael Thompson',
    rating: 5,
    date: '1 month ago',
    source: 'facebook',
    text: 'Grant\'s Estate Agents sold our property in Narre Warren in just 12 days! They provided excellent market analysis, professional photography, and their negotiation skills got us well above our reserve price.',
    propertyAddress: 'Narre Warren',
    agentName: 'Jessica Lee',
    verified: true
  },
  {
    id: '3',
    author: 'Emma Williams',
    rating: 5,
    date: '1 month ago',
    source: 'google',
    text: 'As first home buyers, we were nervous about the process. The team at Grant\'s guided us every step of the way. They were patient, honest, and really fought for us during negotiations. Highly recommend!',
    propertyAddress: 'Cranbourne',
    agentName: 'David Park',
    verified: true
  },
  {
    id: '4',
    author: 'James Anderson',
    rating: 5,
    date: '2 months ago',
    source: 'google',
    text: 'Professional, responsive, and results-driven. Grant\'s marketed our investment property brilliantly and achieved a rental return above our expectations. Their property management team is top-notch.',
    propertyAddress: 'Pakenham',
    agentName: 'Rachel Smith',
    verified: true
  },
  {
    id: '5',
    author: 'Lisa Martinez',
    rating: 5,
    date: '2 months ago',
    source: 'facebook',
    text: 'We\'ve bought and sold multiple properties with Grant\'s over the years. Their local knowledge is unmatched, and they always go above and beyond. Special thanks to the Berwick office team!',
    propertyAddress: 'Berwick',
    agentName: 'Tom Wilson',
    verified: true
  },
  {
    id: '6',
    author: 'Robert Taylor',
    rating: 5,
    date: '3 months ago',
    source: 'google',
    text: 'Outstanding communication throughout the entire selling process. Weekly updates, honest feedback, and a fantastic result. Grant\'s is the only agency we\'ll use in Casey.',
    propertyAddress: 'Narre Warren North',
    agentName: 'Stuart Grant',
    verified: true
  }
];

export default function ReviewsPage() {
  const [selectedSource, setSelectedSource] = useState<'all' | 'google' | 'facebook'>('all');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const filteredReviews = selectedSource === 'all' 
    ? reviews 
    : reviews.filter(review => review.source === selectedSource);

  const averageRating = 4.9;
  const totalReviews = 1247;

  return (
    <>
      <OncomHeader />

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: isMobile ? '120px 20px 60px' : '160px 0 80px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3.75rem',
            fontWeight: '700',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            What our clients say
          </h1>
          <p style={{
            fontSize: isMobile ? '1rem' : '1.25rem',
            lineHeight: '1.5',
            opacity: '0.9',
            marginBottom: '40px',
            fontWeight: '400'
          }}>
            Real experiences from real people. See why we're Casey and Cardinia's most trusted real estate agency.
          </p>
          
          {/* Rating Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px'
            }}>
              <span style={{
                fontSize: '48px',
                fontWeight: '700'
              }}>{averageRating}</span>
              <div style={{
                display: 'flex',
                gap: '4px'
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>
            <span style={{
              fontSize: '18px',
              opacity: '0.8'
            }}>
              {totalReviews.toLocaleString()} reviews
            </span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{
        backgroundColor: '#f8f8f8',
        borderBottom: '1px solid #e5e5e5',
        position: 'sticky',
        top: '64px',
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: isMobile ? '0 20px' : '0 max(2rem, 3.33vw)'
        }}>
          <div style={{
            display: 'flex',
            gap: '32px'
          }}>
            <button
              onClick={() => setSelectedSource('all')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                borderBottom: selectedSource === 'all' ? '2px solid #000' : '2px solid transparent',
                fontSize: '16px',
                fontWeight: selectedSource === 'all' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              All Reviews
            </button>
            <button
              onClick={() => setSelectedSource('google')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                borderBottom: selectedSource === 'google' ? '2px solid #000' : '2px solid transparent',
                fontSize: '16px',
                fontWeight: selectedSource === 'google' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Google Reviews
            </button>
            <button
              onClick={() => setSelectedSource('facebook')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                borderBottom: selectedSource === 'facebook' ? '2px solid #000' : '2px solid transparent',
                fontSize: '16px',
                fontWeight: selectedSource === 'facebook' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Facebook Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 0',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: isMobile ? '24px' : '32px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {review.author}
                      </h3>
                      {review.verified && (
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#666',
                          backgroundColor: '#f0f0f0',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#4CAF50">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </svg>
                          Verified
                        </span>
                      )}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '2px'
                      }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="16" height="16" viewBox="0 0 24 24" fill={star <= review.rating ? '#FFD700' : '#e0e0e0'}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                      </div>
                      <span>{review.date}</span>
                      <span>•</span>
                      <span style={{ textTransform: 'capitalize' }}>{review.source}</span>
                    </div>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '16px'
                }}>
                  {review.text}
                </p>
                
                {(review.propertyAddress || review.agentName) && (
                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    fontSize: '14px',
                    color: '#666',
                    flexWrap: 'wrap'
                  }}>
                    {review.propertyAddress && (
                      <span>📍 {review.propertyAddress}</span>
                    )}
                    {review.agentName && (
                      <Link 
                        href={`/agents#${review.agentName.toLowerCase().replace(' ', '-')}`}
                        style={{
                          color: '#000',
                          textDecoration: 'none',
                          fontWeight: '500',
                          borderBottom: '1px solid transparent',
                          transition: 'border-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderBottomColor = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderBottomColor = 'transparent';
                        }}
                      >
                        Agent: {review.agentName}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Load More */}
          <div style={{
            textAlign: 'center',
            marginTop: '48px'
          }}>
            <button style={{
              padding: '16px 48px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '32px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Load more reviews
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        backgroundColor: '#f8f8f8',
        padding: isMobile ? '60px 20px' : '80px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: isMobile ? '32px' : '40px',
            fontWeight: '700',
            marginBottom: '24px',
            letterSpacing: '-0.02em'
          }}>
            Ready to experience our 5-star service?
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginBottom: '40px',
            color: '#666'
          }}>
            Join thousands of satisfied clients who've made their best property moves with Grant's Estate Agents.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/appraisal" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '20px 48px',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '32px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Get a free appraisal
            </Link>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '20px 48px',
              backgroundColor: 'transparent',
              color: '#000',
              textDecoration: 'none',
              fontSize: '17px',
              fontWeight: '600',
              borderRadius: '32px',
              border: '2px solid #000',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* External Review Links */}
      <section style={{
        backgroundColor: '#fff',
        padding: isMobile ? '40px 20px' : '60px 0',
        borderTop: '1px solid #e5e5e5'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '32px'
          }}>
            Leave us a review
          </h3>
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="https://g.page/r/YOUR-GOOGLE-REVIEW-LINK/review"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                backgroundColor: '#fff',
                border: '2px solid #4285F4',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#4285F4',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4285F4';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#4285F4';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Review on Google
            </a>
            <a
              href="https://www.facebook.com/YOUR-FACEBOOK-PAGE/reviews"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                backgroundColor: '#fff',
                border: '2px solid #1877F2',
                borderRadius: '8px',
                textDecoration: 'none',
                color: '#1877F2',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1877F2';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#1877F2';
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Review on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: isMobile ? '40px 20px' : '60px 0',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', opacity: '0.8' }}>
          © 2025 Grant's Estate Agents. All rights reserved.
        </p>
      </footer>
    </>
  );
}