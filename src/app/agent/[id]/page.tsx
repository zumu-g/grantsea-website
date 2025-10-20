'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';
import SavePropertyButton from '@/components/SavePropertyButton';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

// Agent data structure inspired by The Agency but with on.com styling
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

Stuart's commitment to excellence has earned him recognition as the #1 agent in the Casey/Cardinia region, with a 94% auction clearance rate that speaks to his negotiation skills and market insight.

Beyond his professional achievements, Stuart is deeply invested in the local community, supporting local schools, sporting clubs, and community initiatives that make Casey and Cardinia great places to live.`,
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
      avgSellingPrice: '105% of asking'
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

Sarah's approach combines thorough market knowledge with innovative marketing strategies and genuine care for her clients' needs. Her attention to detail and commitment to communication ensures every client feels supported throughout their property journey.

Ranked in the top 10% of agents nationally, Sarah's success is built on trust, integrity, and a deep understanding of what makes each property unique. Her clients appreciate her honest advice, professional approach, and ability to achieve outstanding results in any market condition.`,
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
      avgSellingPrice: '102% of asking'
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
  const [activeSection, setActiveSection] = useState('about');
  
  const agent = mockAgents[params.id as string] || mockAgents['stuart-grant'];
  const { properties } = useProperties();
  
  // Filter properties for this agent (mock - in reality would filter by agent ID)
  const agentProperties = properties.slice(0, agent.stats.currentListings);
  const soldProperties = properties.slice(0, 6).map(p => ({ ...p, status: 'sold' }));

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
      
      <main style={{ paddingTop: isMobile ? '60px' : '64px', minHeight: '100vh', backgroundColor: '#fff' }}>
        
        {/* Hero Section - The Agency Style */}
        <section style={{
          position: 'relative',
          height: isMobile ? '60vh' : '70vh',
          backgroundColor: '#f5f5f5',
          overflow: 'hidden',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}>
          {/* Background Image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${agent.heroImage || '/images/agent-hero-bg.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
          
          {/* Content */}
          <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '24px' : '48px',
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              {/* Agent Photo */}
              <div style={{
                width: isMobile ? '160px' : '220px',
                height: isMobile ? '160px' : '220px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#fff',
                border: '4px solid #fff',
                flexShrink: 0
              }}>
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  width={220}
                  height={220}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Agent Info */}
              <div style={{ color: '#fff' }}>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '300',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Property Partner
                </p>
                <h1 style={{
                  fontSize: isMobile ? '40px' : '64px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '16px',
                  lineHeight: '1.1'
                }}>
                  {agent.name}
                </h1>
                <p style={{
                  fontSize: isMobile ? '18px' : '24px',
                  fontWeight: '300',
                  marginBottom: '16px'
                }}>
                  {agent.position}
                </p>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '8px' : '32px',
                  alignItems: isMobile ? 'center' : 'flex-start',
                  fontSize: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{agent.ranking}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600' }}>{agent.clearanceRate}</span>
                    <span style={{ fontWeight: '300' }}>Auction Clearance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Bar */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: isMobile ? '20px 0' : '24px 0'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '0'
          }}>
            <div style={{
              display: 'flex',
              gap: isMobile ? '16px' : '32px',
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left'
            }}>
              <a href={`tel:${agent.phone}`} style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '400'
              }}>
                Call {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '18px',
                fontWeight: '400'
              }}>
                {agent.email}
              </a>
            </div>
            <button
              onClick={() => setShowContactForm(true)}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              Request Appraisal
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: isMobile ? '60px 0' : '80px 0',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '40px' : '60px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  {agent.stats.soldThisYear}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Sold This Year
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  {agent.stats.auctionClearanceRate}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Auction Clearance
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  {agent.stats.avgDaysOnMarket}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Days on Market
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '8px',
                  color: '#000'
                }}>
                  {agent.stats.totalSalesValue}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Total Sales
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section style={{
          padding: isMobile ? '80px 0' : '120px 0'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
              gap: isMobile ? '48px' : '80px'
            }}>
              {/* Main Content */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  letterSpacing: '-0.02em',
                  marginBottom: '32px',
                  lineHeight: '1.2'
                }}>
                  About {agent.name.split(' ')[0]}
                </h2>
                <div style={{
                  fontSize: isMobile ? '16px' : '18px',
                  lineHeight: '1.7',
                  color: '#333',
                  whiteSpace: 'pre-line'
                }}>
                  {agent.bio}
                </div>

                {/* Specialties */}
                <div style={{ marginTop: '48px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '400',
                    marginBottom: '24px'
                  }}>
                    Areas of Expertise
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    {agent.specialties.map((specialty: string) => (
                      <div key={specialty} style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        fontSize: '14px',
                        textAlign: 'center',
                        fontWeight: '400'
                      }}>
                        {specialty}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                {/* Achievements */}
                <div style={{
                  backgroundColor: '#f8f8f8',
                  padding: '32px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '400',
                    marginBottom: '24px'
                  }}>
                    Professional Recognition
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {agent.achievements.map((achievement: string) => (
                      <li key={achievement} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '16px',
                        fontSize: '14px',
                        lineHeight: '1.5'
                      }}>
                        <span style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#000',
                          borderRadius: '50%',
                          marginTop: '8px',
                          flexShrink: 0
                        }} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Card */}
                <div style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '400',
                    marginBottom: '20px'
                  }}>
                    Get in Touch
                  </h3>
                  <div style={{
                    marginBottom: '24px',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '8px' }}>{agent.phone}</div>
                    <div>{agent.email}</div>
                  </div>
                  <button
                    onClick={() => setShowContactForm(true)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Now Selling Section */}
        <section style={{
          padding: isMobile ? '80px 0' : '120px 0',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '48px' : '64px'
            }}>
              <h2 style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '300',
                letterSpacing: '-0.02em',
                marginBottom: '16px'
              }}>
                Now Selling
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#666'
              }}>
                {agent.stats.currentListings} properties currently on the market
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {agentProperties.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`} style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}>
                  <div style={{
                    backgroundColor: '#fff',
                    overflow: 'hidden',
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
                      backgroundColor: '#f5f5f5'
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
                          color: '#999'
                        }}>
                          No image
                        </div>
                      )}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px'
                      }}>
                        <SavePropertyButton property={property} />
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <p style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {property.suburb}
                      </p>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        marginBottom: '12px',
                        lineHeight: '1.4'
                      }}>
                        {property.address.replace(', VIC', '')}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '16px'
                      }}>
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                      </div>
                      <p style={{
                        fontSize: '18px',
                        fontWeight: '400',
                        color: '#000'
                      }}>
                        {property.priceDisplay || formatPrice(property.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Client Reviews */}
        <section style={{
          padding: isMobile ? '80px 0' : '120px 0'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '48px' : '64px'
            }}>
              <h2 style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '300',
                letterSpacing: '-0.02em',
                marginBottom: '16px'
              }}>
                Client Reviews
              </h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#000">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span style={{ fontSize: '18px', fontWeight: '400' }}>5.0</span>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#666'
              }}>
                Based on {agent.testimonials.length} verified reviews
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {agent.testimonials.map((testimonial: any) => (
                <div key={testimonial.id} style={{
                  backgroundColor: '#f8f8f8',
                  padding: '32px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '2px',
                    marginBottom: '16px'
                  }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#000">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                    fontStyle: 'italic'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                  }}>
                    <div>
                      <div style={{
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>
                        {testimonial.author}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        {testimonial.suburb}
                      </div>
                    </div>
                    {testimonial.soldPrice && (
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Sold: {testimonial.soldPrice}
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
          padding: isMobile ? '80px 0' : '120px 0',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}>
              Ready to get started?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              fontWeight: '300'
            }}>
              Whether you're buying, selling, or just curious about your property's value, {agent.name.split(' ')[0]} is here to help.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <button
                onClick={() => setShowContactForm(true)}
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Request Appraisal
              </button>
              <a
                href={`tel:${agent.phone}`}
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '2px solid #fff',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                Call {agent.phone}
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '48px',
            maxWidth: '600px',
            width: '100%',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowContactForm(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 style={{
              fontSize: '32px',
              fontWeight: '300',
              marginBottom: '32px'
            }}>Contact {agent.name}</h3>

            <form>
              <div style={{ marginBottom: '24px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <input
                  type="email"
                  placeholder="Email address"
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <input
                  type="tel"
                  placeholder="Phone number"
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '16px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <select
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '16px',
                    backgroundColor: '#fff'
                  }}
                >
                  <option value="">How can we help?</option>
                  <option value="buy">I'm looking to buy</option>
                  <option value="sell">I'm looking to sell</option>
                  <option value="appraisal">I need a property appraisal</option>
                  <option value="other">Other inquiry</option>
                </select>
              </div>
              <div style={{ marginBottom: '32px' }}>
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}