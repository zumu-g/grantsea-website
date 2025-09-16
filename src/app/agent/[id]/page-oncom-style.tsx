'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import SavePropertyButton from '@/components/SavePropertyButton';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

// Extended agent data with McGrath-inspired structure
const mockAgents: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Director / Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    phone: '0423 456 789',
    officePhone: '(03) 9702 8200',
    photo: '/agents/sarah-thompson.jpg',
    coverPhoto: '/agents/sarah-cover.jpg',
    licenseNumber: 'LREA 20351234',
    yearsExperience: 15,
    bio: `Sarah Thompson has been transforming the real estate experience in Casey and Cardinia for over 15 years. Known for her exceptional negotiation skills and deep market knowledge, Sarah has built a reputation as one of the most trusted agents in the region.
    
Her approach combines cutting-edge marketing strategies with old-fashioned personal service. Sarah believes that buying or selling property should be an exciting journey, not a stressful ordeal. This philosophy has earned her numerous industry awards and, more importantly, the loyalty of hundreds of satisfied clients.

Specializing in premium residential properties, Sarah has an innate understanding of what makes each home unique. She takes pride in crafting tailored marketing campaigns that showcase properties in their best light, consistently achieving outstanding results that exceed vendor expectations.

Beyond her professional achievements, Sarah is deeply committed to the local community. She actively supports local schools, sporting clubs, and charitable organizations, believing that a strong community creates a better environment for everyone.`,
    specialties: ['Premium Residential Sales', 'Luxury Properties', 'Family Homes', 'Development Sites', 'Off-Market Sales'],
    languages: ['English', 'Mandarin'],
    achievements: [
      'Grant\'s Estate Agents Top Sales Performer 2023',
      'REIV Award for Excellence 2022',
      'Ranked in Top 5% of Agents Nationally',
      'Licensed Estate Agent & Auctioneer',
      'Over $250M in Total Sales'
    ],
    stats: {
      propertiesSold: 289,
      totalSalesValue: '$250M+',
      avgDaysOnMarket: 18,
      avgSalePrice: '$1.45M',
      auctionClearanceRate: '94%',
      currentListings: 12,
      soldThisYear: 42,
      avgSellingPrice: '103% of asking',
      repeatClients: '62%'
    },
    suburbExpertise: ['Berwick', 'Harkaway', 'Beaconsfield', 'Officer', 'Narre Warren North'],
    testimonials: [
      {
        id: '1',
        author: 'John & Mary Davies',
        suburb: 'Berwick',
        text: 'Sarah\'s expertise and dedication were evident from our first meeting. She achieved a sale price that exceeded our expectations by over $100,000. Her marketing strategy was brilliant, and she kept us informed throughout the entire process.',
        rating: 5,
        date: '2024-01',
        soldPrice: '$1,850,000'
      },
      {
        id: '2',
        author: 'Michael Chen',
        suburb: 'Harkaway',
        text: 'As overseas sellers, we needed an agent we could trust completely. Sarah handled everything professionally, from styling advice to negotiating with buyers. She achieved an outstanding result in a challenging market.',
        rating: 5,
        date: '2023-12',
        soldPrice: '$2,200,000'
      },
      {
        id: '3',
        author: 'The Williams Family',
        suburb: 'Beaconsfield',
        text: 'This is the third time we\'ve used Sarah, and once again, she delivered exceptional results. Her market knowledge is unmatched, and her ability to connect with buyers is remarkable. We wouldn\'t use anyone else.',
        rating: 5,
        date: '2023-11',
        soldPrice: '$1,425,000'
      },
      {
        id: '4',
        author: 'Robert & Lisa Martinez',
        suburb: 'Officer',
        text: 'Sarah made the impossible possible. We needed to sell quickly due to a job relocation, and she had our property sold in just 10 days at a price we were thrilled with. Her network of buyers is incredible.',
        rating: 5,
        date: '2023-10',
        soldPrice: '$980,000'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sarah-thompson',
      instagram: '@sarah_grantsea',
      facebook: 'sarah.thompson.grantsea'
    },
    marketingPackages: [
      {
        name: 'Premium Marketing',
        features: ['Professional photography', 'Drone footage', 'Floor plans', 'Virtual tour', 'Featured listings on major portals', 'Social media campaign', 'Email marketing to database']
      },
      {
        name: 'Luxury Marketing',
        features: ['Twilight photography', 'Lifestyle video', '3D virtual tour', 'Custom property website', 'Print advertising in premium publications', 'Targeted digital advertising', 'VIP buyer events']
      }
    ]
  },
  '2': {
    id: '2',
    name: 'Michael Chen',
    position: 'Director / Investment Specialist',
    email: 'michael@grantsea.com',
    phone: '0412 345 678',
    officePhone: '(03) 9702 8200',
    photo: '/agents/michael-chen.jpg',
    coverPhoto: '/agents/michael-cover.jpg',
    licenseNumber: 'LREA 20358888',
    yearsExperience: 20,
    bio: `Michael Chen is a property investment specialist with an exceptional track record of helping clients build wealth through strategic real estate investments. With over 20 years of experience and a background in finance, Michael brings a unique analytical approach to property investment.

His expertise spans residential investment properties, commercial real estate, and development opportunities. Michael's data-driven methodology and deep understanding of market cycles have helped his clients achieve consistent capital growth and strong rental yields.

Fluent in English, Mandarin, and Cantonese, Michael has built an extensive network of local and international investors. He specializes in identifying off-market opportunities and structuring deals that maximize returns while minimizing risk.

Michael's commitment to education sets him apart - he regularly conducts investment seminars and provides detailed market reports to keep his clients informed about trends and opportunities in the Casey and Cardinia regions.`,
    specialties: ['Investment Properties', 'Commercial Real Estate', 'Development Sites', 'Portfolio Strategy', 'International Buyers'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    achievements: [
      'Grant\'s Investment Specialist of the Year 2023',
      'REIV Commercial Agent Award 2022',
      'Licensed Estate Agent & Auctioneer',
      'Certified Property Investment Advisor',
      'MBA in Finance',
      'Over $450M in Investment Sales'
    ],
    stats: {
      propertiesSold: 312,
      totalSalesValue: '$450M+',
      avgDaysOnMarket: 24,
      avgSalePrice: '$1.44M',
      auctionClearanceRate: '88%',
      currentListings: 18,
      soldThisYear: 38,
      avgSellingPrice: '98% of asking',
      repeatClients: '71%'
    },
    suburbExpertise: ['Berwick', 'Cranbourne', 'Narre Warren', 'Clyde', 'Pakenham'],
    testimonials: [
      {
        id: '1',
        author: 'Robert Liu',
        suburb: 'Berwick',
        text: 'Michael helped me build a property portfolio worth over $5M in just 3 years. His strategic advice on timing and location has been invaluable. Each property has shown significant capital growth.',
        rating: 5,
        date: '2024-02',
        soldPrice: 'Portfolio Value: $5.2M'
      },
      {
        id: '2',
        author: 'Strategic Investments Pty Ltd',
        suburb: 'Cranbourne',
        text: 'We\'ve completed multiple commercial acquisitions with Michael. His ability to identify undervalued assets and negotiate favorable terms is exceptional. A true professional.',
        rating: 5,
        date: '2023-10',
        soldPrice: '$3,400,000'
      },
      {
        id: '3',
        author: 'Jennifer & Mark Thompson',
        suburb: 'Clyde',
        text: 'As first-time investors, we appreciated Michael\'s patience and detailed explanations. He found us a property with great rental yield and growth potential. Highly recommended!',
        rating: 5,
        date: '2023-09',
        soldPrice: '$720,000'
      }
    ],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/michael-chen-property',
      wechat: 'michael_chen_property',
      instagram: '@michael_grantsea'
    },
    marketingPackages: [
      {
        name: 'Investment Property Marketing',
        features: ['Professional photography', 'Detailed investment analysis report', 'Rental appraisal', 'Targeted investor database marketing', 'Featured on investment portals', 'Direct marketing to buyer agents']
      },
      {
        name: 'Commercial Property Marketing',
        features: ['Commercial photography and video', 'Detailed Information Memorandum', 'Financial analysis', 'Direct marketing to commercial buyers', 'Commercial portal listings', 'Expression of Interest campaign']
      }
    ]
  }
  // Add more agents as needed
};

export default function AgentDetailPageOncom() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'about' | 'listings' | 'sold' | 'reviews'>('about');
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const agent = mockAgents[params.id as string] || mockAgents['1'];
  const { properties } = useProperties();
  
  // Filter properties for this agent (mock - in reality would filter by agent ID)
  const agentProperties = properties.slice(0, agent.stats.currentListings);
  const soldProperties = properties.slice(0, 6).map(p => ({ ...p, status: 'sold' }));
  
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
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: isMobile ? '160px' : '190px', minHeight: '100vh', backgroundColor: '#fff' }}>
        {/* Hero Section - Clean White Background */}
        <div style={{
          backgroundColor: '#fff',
          paddingTop: isMobile ? '40px' : '80px',
          paddingBottom: isMobile ? '40px' : '60px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '24px' : '60px',
            alignItems: isMobile ? 'center' : 'flex-start'
          }}>
            {/* Agent Photo */}
            <div style={{
              width: isMobile ? '200px' : '280px',
              height: isMobile ? '200px' : '280px',
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5'
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
                  fontSize: '80px',
                  fontWeight: '700',
                  color: '#ccc'
                }}>
                  {agent.name.charAt(0)}
                </div>
              )}
            </div>
            
            {/* Agent Info */}
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: isMobile ? '36px' : '56px',
                fontWeight: '400',
                letterSpacing: '-0.02em',
                marginBottom: '8px',
                lineHeight: '1.1'
              }}>
                {agent.name}
              </h1>
              <p style={{
                fontSize: isMobile ? '20px' : '24px',
                marginBottom: '12px',
                color: '#666'
              }}>
                {agent.position}
              </p>
              <p style={{
                fontSize: '16px',
                color: '#999',
                marginBottom: '24px'
              }}>
                License No: {agent.licenseNumber}
              </p>
              
              {/* Contact Details */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '32px'
              }}>
                <a href={`tel:${agent.phone}`} style={{
                  fontSize: '18px',
                  color: '#000',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} style={{
                  fontSize: '16px',
                  color: '#666',
                  textDecoration: 'none'
                }}>
                  {agent.email}
                </a>
                <span style={{
                  fontSize: '16px',
                  color: '#666'
                }}>
                  Office: {agent.officePhone}
                </span>
              </div>

              {/* CTA Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '16px'
              }}>
                <button
                  onClick={() => setShowContactForm(true)}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Contact Agent
                </button>
                <button style={{
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '2px solid #000',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                >
                  Download Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar - Clean Grid Layout */}
        <div style={{
          backgroundColor: '#f8f8f8',
          borderTop: '1px solid #e5e5e5',
          borderBottom: '1px solid #e5e5e5',
          paddingTop: isMobile ? '32px' : '60px',
          paddingBottom: isMobile ? '32px' : '60px'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            {/* Key Performance Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
              gap: isMobile ? '24px' : '40px',
              textAlign: 'center',
              marginBottom: isMobile ? '32px' : '48px'
            }}>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.soldThisYear}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Sold This Year</div>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.auctionClearanceRate}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Auction Clearance</div>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.avgSellingPrice}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Of Asking Price</div>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.avgDaysOnMarket}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Days on Market</div>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.repeatClients}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Repeat Clients</div>
              </div>
              <div>
                <div style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: '300', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                  {agent.stats.currentListings}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Current Listings</div>
              </div>
            </div>
            
            {/* Career Stats Summary */}
            <div style={{
              textAlign: 'center',
              paddingTop: isMobile ? '24px' : '32px',
              borderTop: '1px solid #e5e5e5'
            }}>
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: '#333',
                marginBottom: '8px'
              }}>
                <strong>{agent.stats.propertiesSold}</strong> properties sold • <strong>{agent.stats.totalSalesValue}</strong> in total sales
              </p>
              <p style={{
                fontSize: '14px',
                color: '#666'
              }}>
                {agent.yearsExperience} years of experience • Ranked in top 5% nationally
              </p>
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
                color: activeTab === 'about' ? '#000' : '#666',
                whiteSpace: 'nowrap'
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
                color: activeTab === 'listings' ? '#000' : '#666',
                whiteSpace: 'nowrap'
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
                color: activeTab === 'sold' ? '#000' : '#666',
                whiteSpace: 'nowrap'
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
            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                padding: '20px 0',
                background: 'none',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                position: 'relative',
                color: activeTab === 'reviews' ? '#000' : '#666',
                whiteSpace: 'nowrap'
              }}
            >
              Reviews ({agent.testimonials.length})
              {activeTab === 'reviews' && (
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
              {/* Current Listings Header */}
              <div style={{
                marginBottom: '48px',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '400',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Current Listings
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
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {property.suburb}
                        </p>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          lineHeight: '1.3'
                        }}>
                          {property.address.replace(', VIC', '')}
                        </h3>
                        <div style={{
                          display: 'flex',
                          gap: '16px',
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '16px'
                        }}>
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.carSpaces} car</span>
                        </div>
                        <p style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#000'
                        }}>
                          {property.priceDisplay || formatPrice(property.price)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              
              {/* CTA for Appraisal */}
              <div style={{
                marginTop: '64px',
                textAlign: 'center',
                padding: '48px',
                backgroundColor: '#f8f8f8'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: '400',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Thinking of selling?
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  Get a free market appraisal from {agent.name}
                </p>
                <button
                  onClick={() => window.location.href = '/appraisal'}
                  style={{
                    padding: '16px 48px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Request Appraisal
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              {/* Reviews Summary */}
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '40px',
                marginBottom: '48px',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '400',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Client Reviews
                </h2>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="#FFD700">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: '600'
                  }}>
                    5.0
                  </span>
                </div>
                <p style={{
                  fontSize: '16px',
                  color: '#666'
                }}>
                  Based on {agent.testimonials.length} verified client reviews
                </p>
              </div>

              {/* Individual Reviews */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '32px'
              }}>
                {agent.testimonials.map((testimonial: any) => (
                  <div key={testimonial.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    padding: '32px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {testimonial.author}
                        </h4>
                        <p style={{
                          fontSize: '14px',
                          color: '#666'
                        }}>
                          {testimonial.suburb} • {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                      {testimonial.soldPrice && (
                        <div style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#4CAF50'
                        }}>
                          Sold: {testimonial.soldPrice}
                        </div>
                      )}
                    </div>
                    <p style={{
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: '#333'
                    }}>
                      "{testimonial.text}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div style={{
                textAlign: 'center',
                marginTop: '64px',
                padding: '48px',
                backgroundColor: '#f8f8f8'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: '400',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Ready to work with {agent.name.split(' ')[0]}?
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  Get in touch for a free market appraisal
                </p>
                <button
                  onClick={() => setShowContactForm(true)}
                  style={{
                    padding: '16px 48px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Contact Agent
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sold' && (
            <div>
              {/* Sales Performance Header */}
              <div style={{
                marginBottom: '48px',
                textAlign: 'center'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '32px' : '48px',
                  fontWeight: '400',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  Recent Sales
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  {agent.stats.propertiesSold} properties sold • Average {agent.stats.avgDaysOnMarket} days on market
                </p>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {soldProperties.map((property: any) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: '#000',
                      color: '#fff',
                      padding: '6px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      zIndex: 1
                    }}>
                      Sold
                    </div>
                    
                    <div style={{
                      aspectRatio: '4/3',
                      backgroundColor: '#f5f5f5',
                      position: 'relative',
                      overflow: 'hidden'
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
                    </div>
                    
                    <div style={{ padding: '24px' }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {property.suburb}
                      </p>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '16px',
                        lineHeight: '1.3'
                      }}>
                        {property.address.replace(', VIC', '')}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.carSpaces} car</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <div style={{
                textAlign: 'center',
                marginTop: '48px'
              }}>
                <button style={{
                  padding: '16px 48px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '2px solid #000',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
                >
                  View All Sales History
                </button>
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