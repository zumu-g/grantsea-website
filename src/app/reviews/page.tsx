'use client';

import React, { useState } from 'react';
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      {/* Hero - Minimal & Warm */}
      <section style={{
        paddingTop: '180px',
        paddingBottom: '120px',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Page Heading */}
          <h1 style={{
            fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            margin: '0 0 64px 0',
            color: '#000'
          }}>
            Customer reviews
          </h1>

          {/* Large Rating Display */}
          <div style={{
            fontSize: '120px',
            fontWeight: '200',
            lineHeight: '1',
            marginBottom: '24px',
            letterSpacing: '-4px'
          }}>
            4.9
          </div>

          {/* Stars */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: star < 5 ? '#000' : '#e0e0e0',
                  borderRadius: '50%'
                }}
              />
            ))}
          </div>

          <p style={{
            fontSize: '18px',
            color: '#666',
            fontWeight: '400'
          }}>
            from 1,247 reviews
          </p>
        </div>
      </section>

      {/* Reviews Grid - Clean Cards */}
      <section style={{
        padding: '0 max(2rem, 3.33vw) 120px',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '48px'
        }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                position: 'relative',
                paddingBottom: '32px',
                borderBottom: '1px solid #f0f0f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setHoveredReview(review.id)}
              onMouseLeave={() => setHoveredReview(null)}
            >
              {/* Quote Mark */}
              <div style={{
                fontSize: '64px',
                lineHeight: '0.5',
                color: '#f0f0f0',
                marginBottom: '24px',
                fontFamily: 'Georgia, serif'
              }}>
                "
              </div>

              {/* Review Text */}
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: '#000',
                marginBottom: '32px',
                fontWeight: '400',
                minHeight: '80px'
              }}>
                {review.text}
              </p>

              {/* Author Info */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end'
              }}>
                <div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '4px',
                    color: '#000'
                  }}>
                    {review.author}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#999'
                  }}>
                    {review.suburb} • {review.date}
                  </div>
                </div>

                {review.agentName && (
                  <Link
                    href={`/agents#${review.agentName.toLowerCase().replace(' ', '-')}`}
                    style={{
                      fontSize: '14px',
                      color: hoveredReview === review.id ? '#000' : '#999',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                  >
                    with {review.agentName} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More - Minimal Button */}
        <div style={{
          textAlign: 'center',
          marginTop: '80px'
        }}>
          <button
            style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#000',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid #000',
              padding: '8px 0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomWidth = '2px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomWidth = '1px';
            }}
          >
            View all 1,247 reviews
          </button>
        </div>
      </section>

      {/* Share Your Experience - Warm CTA */}
      <section style={{
        backgroundColor: '#fafafa',
        padding: '120px max(2rem, 3.33vw)',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '300',
            marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            Share your experience
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Your feedback helps us maintain our exceptional service and assists others in making informed decisions.
          </p>

          {/* Review Platform Links - Minimal */}
          <div style={{
            display: 'flex',
            gap: '32px',
            justifyContent: 'center'
          }}>
            <a
              href="#"
              style={{
                fontSize: '16px',
                color: '#000',
                textDecoration: 'none',
                padding: '16px 32px',
                border: '1px solid #000',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
              }}
            >
              Review on Google
            </a>
            <a
              href="#"
              style={{
                fontSize: '16px',
                color: '#000',
                textDecoration: 'none',
                padding: '16px 32px',
                border: '1px solid #000',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
              }}
            >
              Review on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial Highlight - Large Quote */}
      <section style={{
        padding: '120px max(2rem, 3.33vw)',
        backgroundColor: '#fff',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '300',
            lineHeight: '1.5',
            marginBottom: '48px',
            fontStyle: 'italic',
            color: '#000'
          }}>
            "Grant's Estate Agents made what could have been a stressful process absolutely seamless. Their local knowledge and genuine care for their clients sets them apart."
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            The Harrison Family
          </div>
          <div style={{
            fontSize: '16px',
            color: '#999'
          }}>
            Sold and bought in Berwick, 2024
          </div>
        </div>
      </section>

      {/* Ready to Experience - Simple CTA */}
      <section style={{
        padding: '120px max(2rem, 3.33vw)',
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '300',
            marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            Ready to work with us?
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '48px',
            opacity: '0.8',
            lineHeight: '1.6'
          }}>
            Join thousands of satisfied clients who've found their perfect property with Grant's.
          </p>

          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center'
          }}>
            <Link
              href="/appraisal"
              style={{
                padding: '16px 40px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              Get an appraisal
            </Link>
            <Link
              href="/contact"
              style={{
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                display: 'inline-block'
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