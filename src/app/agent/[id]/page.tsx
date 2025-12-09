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

      <main>

        {/* Hero Section - Full-Width Dramatic Photo */}
        <section style={{
          position: 'relative',
          height: isMobile ? '100vh' : '90vh',
          minHeight: isMobile ? '600px' : '700px',
          maxHeight: '900px',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}>
          {/* Large Agent Photo - Full Bleed */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
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
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              zIndex: 2
            }} />
          </div>

          {/* Agent Info Overlay - Bottom Left */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? '40px 24px' : '80px max(2rem, 3.33vw)',
            zIndex: 3
          }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
              <p style={{
                fontSize: '12px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.7)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '16px'
              }}>
                Property Partner
              </p>

              <h1 style={{
                fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
                fontWeight: '300',
                letterSpacing: '-0.03em',
                lineHeight: '1',
                marginBottom: '16px',
                color: '#fff'
              }}>
                {agent.name}
              </h1>

              <p style={{
                fontSize: isMobile ? '18px' : '24px',
                fontWeight: '300',
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '40px',
                lineHeight: '1.4'
              }}>
                {agent.position}
              </p>

              {/* Quick Stats Row - On Dark */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '32px' : '64px',
                marginBottom: '40px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '200',
                    letterSpacing: '-0.02em',
                    color: '#fff'
                  }}>
                    {agent.stats.soldThisYear}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>
                    Sales this year
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '200',
                    letterSpacing: '-0.02em',
                    color: '#fff'
                  }}>
                    {agent.stats.auctionClearanceRate}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>
                    Clearance rate
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '200',
                    letterSpacing: '-0.02em',
                    color: '#fff'
                  }}>
                    {agent.stats.avgDaysOnMarket}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>
                    Avg days on market
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '200',
                    letterSpacing: '-0.02em',
                    color: '#fff'
                  }}>
                    {agent.stats.totalSalesValue}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginTop: '4px'
                  }}>
                    Total sales value
                  </div>
                </div>
              </div>

              {/* Contact Buttons - Pill Shape */}
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    backgroundColor: '#fff',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: '500',
                    borderRadius: '500px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {agent.phone}
                </a>
                <button
                  onClick={() => setShowContactForm(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '16px 32px',
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: '1.5px solid rgba(255,255,255,0.5)',
                    fontSize: '15px',
                    fontWeight: '500',
                    borderRadius: '500px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.borderColor = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Send message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)',
          backgroundColor: '#f9f9f9'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '80px'
            }}>
              {/* Bio */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '28px' : '36px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '32px',
                  color: '#000'
                }}>
                  About {agent.name.split(' ')[0]}
                </h2>
                <div style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#444',
                  whiteSpace: 'pre-line'
                }}>
                  {agent.bio}
                </div>
              </div>

              {/* Expertise & Achievements */}
              <div>
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#666',
                    marginBottom: '24px'
                  }}>
                    Areas of expertise
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    {agent.specialties.map((specialty: string) => (
                      <span key={specialty} style={{
                        padding: '10px 20px',
                        backgroundColor: '#fff',
                        fontSize: '14px',
                        color: '#333',
                        border: '1px solid #e5e5e5'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#666',
                    marginBottom: '24px'
                  }}>
                    Recognition
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {agent.achievements.map((achievement: string) => (
                      <div key={achievement} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '15px',
                        color: '#333'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#000',
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Stats - Full Width */}
        <section style={{
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '40px' : '60px',
              textAlign: 'center'
            }}>
              Performance
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '40px' : '0',
              textAlign: 'center'
            }}>
              <div style={{
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.15)',
                padding: '0 20px'
              }}>
                <div style={{
                  fontSize: isMobile ? '48px' : '72px',
                  fontWeight: '200',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  lineHeight: '1'
                }}>
                  {agent.stats.propertiesSold}
                </div>
                <div style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.7
                }}>
                  Properties sold
                </div>
              </div>

              <div style={{
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.15)',
                padding: '0 20px'
              }}>
                <div style={{
                  fontSize: isMobile ? '48px' : '72px',
                  fontWeight: '200',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  lineHeight: '1'
                }}>
                  {agent.stats.totalSalesValue}
                </div>
                <div style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.7
                }}>
                  Total sales value
                </div>
              </div>

              <div style={{
                borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.15)',
                padding: '0 20px'
              }}>
                <div style={{
                  fontSize: isMobile ? '48px' : '72px',
                  fontWeight: '200',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  lineHeight: '1'
                }}>
                  {agent.stats.avgSellingPrice}
                </div>
                <div style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.7
                }}>
                  Avg. of asking price
                </div>
              </div>

              <div style={{ padding: '0 20px' }}>
                <div style={{
                  fontSize: isMobile ? '48px' : '72px',
                  fontWeight: '200',
                  letterSpacing: '-0.03em',
                  marginBottom: '12px',
                  lineHeight: '1'
                }}>
                  {agent.yearsExperience}+
                </div>
                <div style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0.7
                }}>
                  Years experience
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Current Listings */}
        {agentProperties.length > 0 && (
          <section style={{
            padding: isMobile ? '60px 20px' : '100px max(2rem, 3.33vw)'
          }}>
            <div style={{
              maxWidth: '1440px',
              margin: '0 auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                marginBottom: isMobile ? '32px' : '48px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: '300',
                    letterSpacing: '-0.02em',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Current listings
                  </h2>
                  <p style={{
                    fontSize: '15px',
                    color: '#666'
                  }}>
                    {agent.stats.currentListings} properties currently on the market
                  </p>
                </div>
                <Link href="/buy" style={{
                  display: isMobile ? 'none' : 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#000',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  View all properties
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {agentProperties.map((property) => (
                  <Link key={property.id} href={`/property/${property.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit'
                  }}>
                    <article style={{
                      backgroundColor: '#fff',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#f5f5f5',
                        overflow: 'hidden'
                      }}>
                        {property.images && property.images[0] ? (
                          <Image
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '14px'
                          }}>
                            No image
                          </div>
                        )}
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px'
                        }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>

                      <div style={{ padding: '20px 0' }}>
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '6px'
                        }}>
                          {property.suburb}
                        </p>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          marginBottom: '12px',
                          lineHeight: '1.3',
                          color: '#000'
                        }}>
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
                    </article>
                  </Link>
                ))}
              </div>

              <div style={{
                textAlign: 'center',
                marginTop: '40px',
                display: isMobile ? 'block' : 'none'
              }}>
                <Link href="/buy" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  borderRadius: '500px'
                }}>
                  View all properties
                </Link>
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
