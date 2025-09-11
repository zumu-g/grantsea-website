'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import SavePropertyButton from '@/components/SavePropertyButton';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

// Extended agent data
const mockAgents: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    phone: '02 9123 4567',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    coverPhoto: '/agents/sarah-cover.jpg',
    bio: `With over 15 years in real estate, Sarah specializes in helping families find their perfect home. Her deep understanding of the local market and commitment to client satisfaction has earned her numerous awards.
    
Sarah's approach to real estate is built on trust, transparency, and results. She believes in going above and beyond for her clients, providing expert guidance through every step of the buying or selling process. Her extensive network and market knowledge ensure her clients always have an advantage.

Beyond her professional achievements, Sarah is actively involved in the local community, supporting various charitable initiatives and local sports clubs. She believes in giving back to the community that has supported her successful career.`,
    specialties: ['Residential Sales', 'First Home Buyers', 'Family Homes', 'Investment Properties'],
    languages: ['English', 'Mandarin'],
    achievements: [
      'Top Sales Agent 2023',
      'Customer Service Excellence Award 2022',
      'Million Dollar Club Member',
      'Licensed Auctioneer',
      'Over $200M in total sales'
    ],
    stats: {
      propertiesSold: 142,
      avgDaysOnMarket: 21,
      avgSalePrice: '$1.2M',
      clientSatisfaction: '98%',
      repeatClients: '45%',
      currentListings: 24
    },
    testimonials: [
      {
        id: '1',
        author: 'John & Mary Davies',
        text: 'Sarah made selling our family home a stress-free experience. Her market knowledge and negotiation skills got us a price well above our expectations. We couldn\'t be happier with the result.',
        rating: 5,
        date: '2024-01'
      },
      {
        id: '2',
        author: 'Michael Chen',
        text: 'As a first-time buyer, I appreciated Sarah\'s patience and guidance throughout the process. She found us the perfect home within our budget and handled all the complexities with ease.',
        rating: 5,
        date: '2023-12'
      },
      {
        id: '3',
        author: 'The Williams Family',
        text: 'Sarah sold our investment property in record time. Her marketing strategy was spot-on, and she kept us informed every step of the way. Highly recommend!',
        rating: 5,
        date: '2023-11'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarah-thompson',
      instagram: '@sarah_grantsea',
      facebook: 'sarah.thompson.grantsea'
    }
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    position: 'Property Investment Specialist',
    email: 'michael@grantsea.com',
    phone: '02 9123 4568',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    coverPhoto: '/agents/michael-cover.jpg',
    bio: `Michael brings 20 years of investment expertise to help clients build their property portfolios. His analytical approach and market insights have helped countless investors achieve their financial goals.

With a background in finance and a passion for real estate, Michael offers a unique perspective on property investment. He specializes in identifying opportunities that deliver strong returns while managing risk effectively.

Michael's extensive network includes developers, financial advisors, and industry professionals, ensuring his clients have access to the best opportunities and advice in the market.`,
    specialties: ['Investment Properties', 'Commercial Real Estate', 'Development Sites', 'Portfolio Strategy'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    achievements: [
      'Investment Specialist of the Year 2023',
      'Top Commercial Agent 2022',
      'Licensed Real Estate Auctioneer',
      'Certified Property Investment Advisor',
      'MBA in Finance'
    ],
    stats: {
      propertiesSold: 203,
      avgDaysOnMarket: 28,
      avgSalePrice: '$2.8M',
      portfolioValue: '$450M',
      investorClients: 156,
      currentListings: 18
    },
    testimonials: [
      {
        id: '1',
        author: 'Robert Liu',
        text: 'Michael helped me build a property portfolio worth over $5M in just 3 years. His strategic advice and market timing have been invaluable.',
        rating: 5,
        date: '2024-02'
      },
      {
        id: '2',
        author: 'Strategic Investments Pty Ltd',
        text: 'We\'ve worked with Michael on multiple commercial acquisitions. His professionalism and expertise make him our go-to agent for investment properties.',
        rating: 5,
        date: '2023-10'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michael-chen-property',
      wechat: 'michael_chen_property'
    }
  }
  // Add more agents as needed
};

export default function AgentDetailPageOncom() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'about' | 'listings' | 'sold'>('about');
  const [showContactForm, setShowContactForm] = useState(false);
  
  const agent = mockAgents[params.id as string] || mockAgents['1'];
  const { properties } = useProperties();
  
  // Filter properties for this agent (mock - in reality would filter by agent ID)
  const agentProperties = properties.slice(0, agent.stats.currentListings);
  const soldProperties = properties.slice(0, 6).map(p => ({ ...p, status: 'sold' }));

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Hero Section with Cover Photo */}
        <div style={{
          height: '400px',
          backgroundColor: '#000',
          backgroundImage: agent.coverPhoto ? `url(${agent.coverPhoto})` : 'linear-gradient(45deg, #000, #333)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            paddingTop: '80px',
            paddingBottom: '40px'
          }}>
            <div style={{
              maxWidth: '1480px',
              margin: '0 auto',
              paddingLeft: 'max(2rem, 3.33vw)',
              paddingRight: 'max(2rem, 3.33vw)',
              display: 'flex',
              gap: '40px',
              alignItems: 'flex-end'
            }}>
              {/* Agent Photo */}
              <div style={{
                width: '200px',
                height: '200px',
                backgroundColor: '#fff',
                padding: '8px',
                flexShrink: 0
              }}>
                {agent.photo ? (
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '60px',
                    fontWeight: '700',
                    color: '#ccc'
                  }}>
                    {agent.name.charAt(0)}
                  </div>
                )}
              </div>
              
              {/* Agent Info */}
              <div style={{ color: '#fff', flex: 1 }}>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: '900',
                  marginBottom: '8px'
                }}>
                  {agent.name}
                </h1>
                <p style={{
                  fontSize: '24px',
                  marginBottom: '16px',
                  opacity: 0.9
                }}>
                  {agent.position}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  fontSize: '16px',
                  opacity: 0.8
                }}>
                  <span>{agent.phone}</span>
                  <span>{agent.mobile}</span>
                  <span>{agent.email}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                gap: '16px',
                flexShrink: 0
              }}>
                <button
                  onClick={() => setShowContactForm(true)}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Contact Agent
                </button>
                <button style={{
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '2px solid #fff',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Download Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          paddingTop: '40px',
          paddingBottom: '40px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>
                {agent.stats.propertiesSold}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Properties Sold</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>
                {agent.stats.avgDaysOnMarket}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg. Days on Market</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>
                {agent.stats.avgSalePrice}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg. Sale Price</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>
                {agent.stats.clientSatisfaction}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Client Satisfaction</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>
                {agent.stats.currentListings}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Current Listings</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          position: 'sticky',
          top: '64px',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            gap: '40px'
          }}>
            <button
              onClick={() => setActiveTab('about')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'about' ? '#000' : '#666'
              }}
            >
              About
              {activeTab === 'about' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#000'
                }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'listings' ? '#000' : '#666'
              }}
            >
              Current Listings ({agent.stats.currentListings})
              {activeTab === 'listings' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#000'
                }} />
              )}
            </button>
            <button
              onClick={() => setActiveTab('sold')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'sold' ? '#000' : '#666'
              }}
            >
              Recently Sold
              {activeTab === 'sold' && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: '#000'
                }} />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          paddingTop: '60px',
          paddingBottom: '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          {activeTab === 'about' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '60px'
            }}>
              {/* Left Column - Bio & Testimonials */}
              <div>
                <section style={{ marginBottom: '60px' }}>
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}>
                    About {agent.name.split(' ')[0]}
                  </h2>
                  <div style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#333',
                    whiteSpace: 'pre-line'
                  }}>
                    {agent.bio}
                  </div>
                </section>

                <section style={{ marginBottom: '60px' }}>
                  <h2 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}>
                    Client Testimonials
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {agent.testimonials.map((testimonial: any) => (
                      <div key={testimonial.id} style={{
                        backgroundColor: '#f8f8f8',
                        padding: '32px',
                        borderLeft: '4px solid #000'
                      }}>
                        <p style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          marginBottom: '16px',
                          fontStyle: 'italic'
                        }}>
                          "{testimonial.text}"
                        </p>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{ fontWeight: '600' }}>{testimonial.author}</div>
                            <div style={{ fontSize: '14px', color: '#666' }}>
                              {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Right Column - Skills & Contact */}
              <div>
                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  padding: '32px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}>
                    Specialties
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {agent.specialties.map((specialty: string) => (
                      <span key={specialty} style={{
                        padding: '8px 16px',
                        backgroundColor: '#f5f5f5',
                        fontSize: '14px',
                        borderRadius: '4px'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  padding: '32px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}>
                    Languages
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {agent.languages.map((language: string) => (
                      <span key={language} style={{
                        padding: '8px 16px',
                        backgroundColor: '#f5f5f5',
                        fontSize: '14px',
                        borderRadius: '4px'
                      }}>
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  padding: '32px',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '24px'
                  }}>
                    Achievements
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {agent.achievements.map((achievement: string) => (
                      <li key={achievement} style={{
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px'
                      }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#4CAF50">
                          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                        </svg>
                        <span style={{ fontSize: '14px' }}>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '16px'
                  }}>
                    Get in Touch
                  </h3>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ marginBottom: '8px' }}>{agent.phone}</div>
                    <div style={{ marginBottom: '8px' }}>{agent.mobile}</div>
                    <div>{agent.email}</div>
                  </div>
                  <button
                    onClick={() => setShowContactForm(true)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px'
              }}>
                {agentProperties.map((property) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <Link href={`/property/${property.id}`} style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '4/3',
                        backgroundColor: '#f5f5f5'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
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
                        <h3 style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          marginBottom: '8px'
                        }}>
                          {property.priceDisplay || formatPrice(property.price)}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          color: '#000',
                          marginBottom: '8px',
                          fontWeight: '500'
                        }}>
                          {property.address}
                        </p>
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '16px'
                        }}>
                          {property.suburb}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '24px',
                          fontSize: '14px',
                          color: '#666',
                          paddingTop: '16px',
                          borderTop: '1px solid #e5e5e5'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                            </svg>
                            <span>{property.bedrooms}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c0 .01-.01 0 0 0H8v-2h8v2zm2-4H6V4h12v12z"/>
                              <circle cx="8" cy="6" r="1"/>
                              <circle cx="16" cy="6" r="1"/>
                              <path d="M8 9h8v5H8z"/>
                            </svg>
                            <span>{property.bathrooms}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                            </svg>
                            <span>{property.carSpaces}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sold' && (
            <div>
              <div style={{
                marginBottom: '32px',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderLeft: '4px solid #4CAF50'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                  Recent Sales Performance
                </h3>
                <p style={{ fontSize: '16px', color: '#666' }}>
                  {agent.stats.propertiesSold} properties sold with an average of {agent.stats.avgDaysOnMarket} days on market
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '24px'
              }}>
                {soldProperties.map((property: any) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      padding: '4px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      zIndex: 1
                    }}>
                      Sold
                    </div>
                    
                    <div style={{
                      aspectRatio: '4/3',
                      backgroundColor: '#f5f5f5',
                      position: 'relative'
                    }}>
                      {property.images && property.images[0] ? (
                        <img
                          src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                          alt={property.address}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            filter: 'grayscale(50%)'
                          }}
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
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        marginBottom: '8px'
                      }}>
                        SOLD
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#000',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {property.address}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        {property.suburb}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
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
            borderRadius: '8px',
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
              fontWeight: '700',
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
                  fontWeight: '600',
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