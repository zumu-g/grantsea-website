'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';
import Link from 'next/link';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  suburb: string;
  agentName?: string;
}

const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah & Michael Chen',
    rating: 5,
    date: '2 weeks ago',
    text: "Stuart was exceptional. He understood the Berwick market intimately and helped us secure our dream home. The whole process was seamless.",
    suburb: 'Berwick',
    agentName: 'Stuart Grant'
  },
  {
    id: '2',
    author: 'The Thompson Family',
    rating: 5,
    date: '1 month ago',
    text: "Sold in just 12 days! Grant's provided excellent market analysis and their negotiation skills got us well above reserve.",
    suburb: 'Narre Warren',
    agentName: 'Jessica Lee'
  },
  {
    id: '3',
    author: 'Emma Williams',
    rating: 5,
    date: '1 month ago',
    text: "As first home buyers, we were guided every step of the way. Patient, honest, and they really fought for us during negotiations.",
    suburb: 'Cranbourne',
    agentName: 'David Park'
  },
  {
    id: '4',
    author: 'James Anderson',
    rating: 5,
    date: '2 months ago',
    text: "Professional and results-driven. Our investment property achieved rental returns above expectations. Top-notch property management.",
    suburb: 'Pakenham',
    agentName: 'Rachel Smith'
  },
  {
    id: '5',
    author: 'Lisa Martinez',
    rating: 5,
    date: '2 months ago',
    text: "We've bought and sold multiple properties with Grant's over the years. Their local knowledge is unmatched.",
    suburb: 'Berwick',
    agentName: 'Tom Wilson'
  },
  {
    id: '6',
    author: 'Robert & Karen',
    rating: 5,
    date: '3 months ago',
    text: "Outstanding communication throughout. Weekly updates, honest feedback, and a fantastic result.",
    suburb: 'Narre Warren North',
    agentName: 'Stuart Grant'
  }
];

export default function ReviewsPage() {
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Add CSS keyframes for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      {/* Hero - Modern & Minimal */}
      <section style={{
        paddingTop: '90px',
        paddingBottom: '60px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Page Heading */}
          <h1 style={{
            fontSize: isMobile ? '24px' : isTablet ? '32px' : '40px',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            margin: '0 0 32px 0',
            color: '#000'
          }}>
            Customer reviews
          </h1>

          {/* Large Rating Display */}
          <div style={{
            fontSize: '60px',
            fontWeight: '200',
            lineHeight: '1',
            marginBottom: '12px',
            letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #000, #333)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            4.9
          </div>

          {/* Modern Stars */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4px',
            marginBottom: '8px'
          }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill={star < 5 ? '#000' : '#e0e0e0'}
                style={{
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'scale(1)',
                  filter: star < 5 ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' : 'none'
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          <p style={{
            fontSize: '14px',
            color: '#666',
            fontWeight: '400'
          }}>
            from 1,247 reviews
          </p>
        </div>
      </section>

      {/* Reviews Grid - Modern Cards */}
      <section style={{
        padding: '0 max(2rem, 3.33vw) 60px',
        maxWidth: '720px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={review.id}
              style={{
                position: 'relative',
                padding: '24px',
                backgroundColor: hoveredReview === review.id ? '#fafafa' : '#fff',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredReview === review.id ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredReview === review.id 
                  ? '0 8px 25px rgba(0,0,0,0.08)' 
                  : '0 1px 3px rgba(0,0,0,0.02)',
                animationDelay: `${index * 0.1}s`,
                opacity: 1,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
              onMouseEnter={() => setHoveredReview(review.id)}
              onMouseLeave={() => setHoveredReview(null)}
            >
              {/* Modern Quote Icon */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '14px',
                color: '#666',
                fontFamily: 'Georgia, serif'
              }}>
                "
              </div>

              {/* Review Text */}
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#000',
                marginBottom: '20px',
                fontWeight: '400'
              }}>
                {review.text}
              </p>

              {/* Author Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '2px',
                    color: '#000'
                  }}>
                    {review.author}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#999'
                  }}>
                    {review.suburb} • {review.date}
                  </div>
                </div>

                {review.agentName && (
                  <Link
                    href={`/agents#${review.agentName.toLowerCase().replace(' ', '-')}`}
                    style={{
                      fontSize: '12px',
                      color: '#666',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      opacity: hoveredReview === review.id ? 1 : 0.7,
                      transform: hoveredReview === review.id ? 'translateX(2px)' : 'translateX(0)'
                    }}
                  >
                    with {review.agentName} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More - Modern Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px'
        }}>
          <button
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#666',
              background: 'none',
              border: '1px solid #e0e0e0',
              borderRadius: '24px',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#000';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#666';
              e.currentTarget.style.borderColor = '#e0e0e0';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View all reviews
          </button>
        </div>
      </section>

      {/* Share Your Experience - Modern CTA */}
      <section style={{
        backgroundColor: '#fafafa',
        padding: '60px max(2rem, 3.33vw)',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '300',
            marginBottom: '12px',
            letterSpacing: '-0.5px'
          }}>
            Share your experience
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            Help others by sharing your experience with us.
          </p>

          {/* Review Platform Links - Modern Pills */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#000',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                backgroundColor: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Google
            </a>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: '#000',
                textDecoration: 'none',
                padding: '8px 16px',
                border: '1px solid #e0e0e0',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                backgroundColor: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Featured Testimonial - Compact */}
      <section style={{
        padding: '60px max(2rem, 3.33vw)',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '450px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '300',
            lineHeight: '1.4',
            marginBottom: '20px',
            fontStyle: 'italic',
            color: '#333'
          }}>
            "Grant's made our property journey seamless. Their expertise and care sets them apart."
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '4px'
          }}>
            The Harrison Family
          </div>
          <div style={{
            fontSize: '12px',
            color: '#999'
          }}>
            Berwick, 2024
          </div>
        </div>
      </section>

      {/* Ready to Experience - Minimal CTA */}
      <section style={{
        padding: '60px max(2rem, 3.33vw)',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '300',
            marginBottom: '12px',
            letterSpacing: '-0.5px'
          }}>
            Ready to work with us?
          </h2>
          <p style={{
            fontSize: '14px',
            marginBottom: '24px',
            opacity: '0.8',
            lineHeight: '1.5'
          }}>
            Join thousands of satisfied clients.
          </p>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              href="/appraisal"
              style={{
                padding: '10px 20px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get appraisal
            </Link>
            <Link
              href="/contact"
              style={{
                padding: '10px 20px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <OncomFooter />
      <AIChatWidget />
    </div>
  );
}