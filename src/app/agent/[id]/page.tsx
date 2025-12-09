'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import SavePropertyButton from '@/components/SavePropertyButton';
import { useProperties } from '@/hooks/useProperties';

// Agent data structure with on.com styling
const mockAgents: Record<string, any> = {
  'stuart-grant': {
    id: 'stuart-grant',
    name: 'Stuart Grant',
    position: 'Principal & Licensed Estate Agent',
    email: 'stuart@grantsea.com',
    phone: '0423 456 789',
    officePhone: '(03) 9702 8200',
    photo: '/images/stuart-grant-profile.png',
    heroImage: '/images/agent-hero-bg.jpg',
    licenseNumber: 'LREA 20351234',
    yearsExperience: 12,
    ranking: '#1 Agent in Casey/Cardinia',
    clearanceRate: '94%',
    bio: `Stuart Grant is the Principal and Licensed Estate Agent behind Grant's Estate Agents, bringing over 12 years of unparalleled expertise to the Casey and Cardinia property market.

Known for his strategic approach and genuine care for his clients, Stuart has built a reputation as the region's most trusted property advisor. His deep local knowledge, combined with innovative marketing strategies, consistently delivers exceptional results that exceed expectations.

Stuart's commitment to excellence has earned him recognition as the #1 agent in the Casey/Cardinia region, with a 94% auction clearance rate that speaks to his negotiation skills and market insight.`,
    specialties: [
      'Residential Sales',
      'Luxury Properties',
      'First Home Buyers',
      'Investment Properties',
      'Auction Specialist',
      'Development Sites'
    ],
    achievements: [
      '#1 Agent Casey/Cardinia Region',
      '94% Auction Clearance Rate',
      'Over $180M in Sales',
      'Licensed Estate Agent & Auctioneer',
      'REIV Member',
      '12+ Years Experience'
    ],
    stats: {
      propertiesSold: 234,
      totalSalesValue: '$180M+',
      avgDaysOnMarket: 16,
      auctionClearanceRate: '94%',
      currentListings: 8,
      soldThisYear: 35,
      avgSellingPrice: '105%'
    },
    testimonials: [
      {
        id: '1',
        author: 'James & Michelle Wilson',
        suburb: 'Berwick',
        text: 'Stuart achieved an incredible result for our family home. His marketing was exceptional and he guided us through every step. We couldn\'t be happier with the outcome.',
        rating: 5,
        date: '2024-01',
        soldPrice: '$1,650,000'
      },
      {
        id: '2',
        author: 'David Chen',
        suburb: 'Narre Warren',
        text: 'Professional, knowledgeable, and genuinely cares about getting the best result. Stuart sold our property in just 12 days at a price that exceeded our expectations.',
        rating: 5,
        date: '2023-12',
        soldPrice: '$980,000'
      },
      {
        id: '3',
        author: 'The Rodriguez Family',
        suburb: 'Cranbourne',
        text: 'This was our first time selling and Stuart made the process seamless. His communication was excellent and his market knowledge is unmatched in the area.',
        rating: 5,
        date: '2023-11',
        soldPrice: '$1,125,000'
      }
    ]
  },
  'sarah-thompson': {
    id: 'sarah-thompson',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    phone: '0423 456 789',
    officePhone: '(03) 9702 8200',
    photo: '/agents/sarah-thompson.jpg',
    heroImage: '/images/agent-hero-bg.jpg',
    licenseNumber: 'LREA 20358888',
    yearsExperience: 8,
    ranking: 'Top 10% Nationally',
    clearanceRate: '91%',
    bio: `Sarah Thompson brings passion, expertise, and a personal touch to every property transaction. With 8 years of experience in the Casey and Cardinia markets, she has built a reputation for delivering exceptional results while making the buying and selling process enjoyable for her clients.

Sarah's approach combines thorough market knowledge with innovative marketing strategies and genuine care for her clients' needs. Her attention to detail and commitment to communication ensures every client feels supported throughout their property journey.`,
    specialties: [
      'Family Homes',
      'New Home Sales',
      'First Home Buyers',
      'Downsizing Specialists',
      'Investment Properties'
    ],
    achievements: [
      'Top 10% Nationally',
      '91% Auction Clearance Rate',
      'Over $95M in Sales',
      'Licensed Estate Agent',
      'REIV Member',
      '8+ Years Experience'
    ],
    stats: {
      propertiesSold: 156,
      totalSalesValue: '$95M+',
      avgDaysOnMarket: 18,
      auctionClearanceRate: '91%',
      currentListings: 6,
      soldThisYear: 28,
      avgSellingPrice: '102%'
    },
    testimonials: [
      {
        id: '1',
        author: 'Mark & Emma Foster',
        suburb: 'Officer',
        text: 'Sarah was amazing from start to finish. Her marketing was spot on and she kept us informed every step of the way. Highly recommend!',
        rating: 5,
        date: '2024-02',
        soldPrice: '$875,000'
      }
    ]
  }
};

export default function AgentDetailPage() {
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    message: ''
  });

  const agent = mockAgents[params.id as string] || mockAgents['stuart-grant'];
  const { properties } = useProperties({ type: 'sale', limit: 6 });

  // Filter properties for this agent
  const agentProperties = properties.slice(0, agent.stats.currentListings);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setShowContactForm(false);
    setFormData({ name: '', email: '', phone: '', inquiry: '', message: '' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{ paddingTop: isMobile ? '60px' : '80px' }}>

        {/* Hero Section - Large Vertical Portrait */}
        <section style={{
          padding: isMobile ? '40px 24px 60px' : '60px max(2rem, 3.33vw) 100px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '500px 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'start'
          }}>
            {/* Large Vertical Agent Photo */}
            <div style={{
              position: 'relative',
              aspectRatio: isMobile ? '3/4' : '2/3',
              backgroundColor: '#f5f5f5',
              overflow: 'hidden',
              maxHeight: isMobile ? '500px' : '750px'
            }}>
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
                priority
              />
            </div>

            {/* Agent Info */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: isMobile ? '0' : '40px'
            }}>
              <p style={{
                fontSize: '12px',
                fontWeight: '500',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px'
              }}>
                Property Partner
              </p>

              <h1 style={{
                fontSize: isMobile ? '42px' : isTablet ? '56px' : '72px',
                fontWeight: '300',
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
                marginBottom: '16px',
                color: '#000'
              }}>
                {agent.name}
              </h1>

              <p style={{
                fontSize: isMobile ? '18px' : '22px',
                fontWeight: '300',
                color: '#444',
                marginBottom: '40px',
                lineHeight: '1.4'
              }}>
                {agent.position}
              </p>

              {/* Bio */}
              <div style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#444',
                whiteSpace: 'pre-line',
                marginBottom: '40px'
              }}>
                {agent.bio}
              </div>

              {/* Contact Details */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '32px'
              }}>
                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '400'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {agent.email}
                </a>
              </div>

              {/* Contact Button */}
              <button
                onClick={() => setShowContactForm(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  borderRadius: '500px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  width: isMobile ? '100%' : 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                Get in touch
              </button>
            </div>
          </div>
        </section>

        {/* What's Your Home Worth Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '100px max(2rem, 3.33vw)',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              Like to know what your home is worth?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}>
              Get a free, no-obligation property appraisal from {agent.name.split(' ')[0]}.
            </p>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  padding: '16px 20px',
                  fontSize: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0',
                  backgroundColor: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  padding: '16px 20px',
                  fontSize: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0',
                  backgroundColor: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  padding: '16px 20px',
                  fontSize: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0',
                  backgroundColor: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              />
              <input
                type="text"
                placeholder="Property address"
                value={formData.inquiry}
                onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                required
                style={{
                  padding: '16px 20px',
                  fontSize: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '0',
                  backgroundColor: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
              />
              <button
                type="submit"
                style={{
                  padding: '16px 32px',
                  fontSize: '15px',
                  fontWeight: '500',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '500px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  marginTop: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
              >
                Request appraisal
              </button>
            </form>

            {/* Contact Info */}
            <div style={{
              marginTop: '48px',
              paddingTop: '48px',
              borderTop: '1px solid #e0e0e0'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '16px'
              }}>
                Or contact {agent.name.split(' ')[0]} directly
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '32px',
                flexWrap: 'wrap'
              }}>
                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '15px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '15px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Current Listings - Homepage "New to market" Style */}
        {agentProperties.length > 0 && (
          <section style={{
            padding: isMobile ? '60px 0 60px 20px' : '100px 0 100px max(2rem, 3.33vw)'
          }}>
            <div style={{
              maxWidth: '1440px',
              margin: '0 auto',
              paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
            }}>
              <h2 style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '300',
                letterSpacing: '-0.02em',
                marginBottom: isMobile ? '32px' : '48px',
                color: '#000',
                lineHeight: '1.1'
              }}>
                Current listings
              </h2>
            </div>

            {/* Horizontal Scrolling Carousel */}
            <div style={{
              overflowX: 'auto',
              overflowY: 'hidden',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
              paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
            }}>
              <div style={{
                display: 'flex',
                gap: isMobile ? '16px' : '24px',
                paddingBottom: '16px'
              }}>
                {agentProperties.map((property) => (
                  <div key={property.id} style={{
                    position: 'relative',
                    flex: isMobile ? '0 0 85%' : isTablet ? '0 0 calc(50% - 12px)' : '0 0 calc(33.333% - 16px)',
                    minWidth: isMobile ? '320px' : '380px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer',
                    scrollSnapAlign: 'start',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                    if (addressElement) {
                      addressElement.style.color = '#AF272F';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                    if (addressElement) {
                      addressElement.style.color = '#000';
                    }
                  }}>
                    <Link href={`/property/${property.id}`} style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}>
                      <div style={{
                        position: 'relative',
                        paddingTop: '100%',
                        backgroundColor: '#fff',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          position: 'absolute',
                          inset: '1.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {property.images && property.images[0] ? (
                            <img
                              src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                              alt={property.address}
                              style={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div style={{
                              position: 'absolute',
                              inset: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#999',
                              fontSize: '12px'
                            }}>
                              No image
                            </div>
                          )}
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          zIndex: 1
                        }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '6px'
                        }}>
                          {property.suburb}
                        </p>
                        <h3
                          data-property-address
                          style={{
                            fontSize: '16px',
                            fontWeight: '400',
                            marginBottom: '12px',
                            lineHeight: '1.3',
                            color: '#000',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          {property.address?.replace(', VIC', '').replace(' VIC', '')}
                        </h3>
                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          fontSize: '13px',
                          color: '#666',
                          marginBottom: '12px'
                        }}>
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.carSpaces} car</span>
                        </div>
                        <p style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          color: '#000'
                        }}>
                          {property.priceDisplay || 'Contact Agent'}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '100px max(2rem, 3.33vw)',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <h2 style={{
                fontSize: isMobile ? '28px' : '36px',
                fontWeight: '300',
                letterSpacing: '-0.02em',
                color: '#000',
                marginBottom: '16px'
              }}>
                Client reviews
              </h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#000">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '16px', fontWeight: '400' }}>5.0</span>
              </div>
              <p style={{
                fontSize: '14px',
                color: '#666'
              }}>
                {agent.testimonials.length} verified reviews
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {agent.testimonials.map((testimonial: any) => (
                <div key={testimonial.id} style={{
                  backgroundColor: '#fff',
                  padding: '32px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '2px',
                    marginBottom: '20px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#000">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: '#333',
                    marginBottom: '24px'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <div>
                      <div style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        marginBottom: '2px'
                      }}>
                        {testimonial.author}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#666'
                      }}>
                        {testimonial.suburb}
                      </div>
                    </div>
                    {testimonial.soldPrice && (
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color: '#000'
                      }}>
                        {testimonial.soldPrice}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '120px max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '640px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              lineHeight: '1.1'
            }}>
              Ready to get started?
            </h2>
            <p style={{
              fontSize: '17px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Whether you're buying, selling, or curious about your property's value, {agent.name.split(' ')[0]} is here to help.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setShowContactForm(true)}
                style={{
                  padding: '18px 40px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  borderRadius: '500px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                Request an appraisal
              </button>
              <a
                href={`tel:${agent.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '18px 40px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '1.5px solid #000',
                  fontSize: '15px',
                  fontWeight: '500',
                  borderRadius: '500px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Call {agent.phone}
              </a>
            </div>
          </div>
        </section>

      </main>

      <OncomFooter />

      {/* Contact Form Modal */}
      {showContactForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}
        onClick={() => setShowContactForm(false)}>
          <div
            style={{
              backgroundColor: '#fff',
              padding: isMobile ? '32px 24px' : '48px',
              maxWidth: '520px',
              width: '100%',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowContactForm(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 style={{
              fontSize: '28px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '8px'
            }}>
              Contact {agent.name.split(' ')[0]}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '32px'
            }}>
              We'll get back to you within 2 hours
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <select
                  value={formData.inquiry}
                  onChange={(e) => setFormData({...formData, inquiry: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '15px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="">How can we help?</option>
                  <option value="buy">I'm looking to buy</option>
                  <option value="sell">I'm looking to sell</option>
                  <option value="appraisal">I need a property appraisal</option>
                  <option value="other">Other inquiry</option>
                </select>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <textarea
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '15px',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '18px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  borderRadius: '500px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
