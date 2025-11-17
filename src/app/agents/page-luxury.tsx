'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';

// Luxury agents data with areas of specialization
const agents = [
  {
    id: 'stuart-grant',
    name: 'Stuart Grant',
    title: 'Principal & Founder',
    areas: ['Berwick', 'Narre Warren', 'Officer'],
    specialties: ['Luxury Homes', 'Family Estates', 'Development Sites'],
    photo: '/agents/stuart-grant.jpg',
    experience: '25+ years',
    sold: '500+ properties',
    record: '$3.2M',
    bio: 'Setting the standard for excellence in South East Melbourne real estate.',
    languages: ['English'],
    credentials: ['Licensed Estate Agent', 'REIV Member', 'Auctioneer']
  },
  {
    id: 'emily-chen',
    name: 'Emily Chen',
    title: 'Director of Sales',
    areas: ['Berwick', 'Cranbourne', 'Clyde North'],
    specialties: ['International Clients', 'Investment Properties', 'New Developments'],
    photo: '/agents/emily-chen.jpg',
    experience: '15 years',
    sold: '300+ properties',
    record: '$2.8M',
    bio: 'Bridging cultures and creating exceptional property experiences.',
    languages: ['English', 'Mandarin', 'Cantonese'],
    credentials: ['Licensed Estate Agent', 'Property Investment Advisor']
  },
  {
    id: 'michael-davidson',
    name: 'Michael Davidson',
    title: 'Senior Sales Executive',
    areas: ['Pakenham', 'Officer', 'Beaconsfield'],
    specialties: ['First Home Buyers', 'Growing Families', 'Downsizers'],
    photo: '/agents/michael-davidson.jpg',
    experience: '12 years',
    sold: '250+ properties',
    record: '$1.9M',
    bio: 'Turning property dreams into reality with integrity and expertise.',
    languages: ['English'],
    credentials: ['Licensed Estate Agent', 'Certified Negotiator']
  },
  {
    id: 'sarah-thompson',
    name: 'Sarah Thompson',
    title: 'Property Management Director',
    areas: ['All Areas'],
    specialties: ['Property Management', 'Investment Advisory', 'Tenant Relations'],
    photo: '/agents/sarah-thompson.jpg',
    experience: '18 years',
    managed: '400+ properties',
    occupancy: '98.5%',
    bio: 'Maximizing returns while maintaining exceptional tenant relationships.',
    languages: ['English'],
    credentials: ['Licensed Property Manager', 'REIV Accredited']
  }
];

export default function AgentsLuxuryPage() {
  const [selectedArea, setSelectedArea] = useState('all');
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Get unique areas
  const allAreas = ['all', ...new Set(agents.flatMap(a => a.areas.filter(area => area !== 'All Areas')))];

  // Filter agents
  const filteredAgents = selectedArea === 'all' 
    ? agents 
    : agents.filter(agent => agent.areas.includes(selectedArea) || agent.areas.includes('All Areas'));

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '90px' : '120px', 
        minHeight: '100vh', 
        backgroundColor: '#ffffff' 
      }}>
        {/* Minimalist Hero Section */}
        <section style={{
          padding: isMobile ? '80px 20px' : '160px 0',
          textAlign: 'center',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '72px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              lineHeight: '1'
            }}>
              Our Agents
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              fontWeight: '300',
              lineHeight: '1.5',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Local expertise. Global perspective. Exceptional results.
            </p>
          </div>
        </section>

        {/* Area Filter - Minimal Style */}
        <section style={{
          padding: '40px 0',
          borderBottom: '1px solid #e5e5e5',
          position: 'sticky',
          top: isMobile ? '90px' : '120px',
          backgroundColor: '#fff',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              paddingBottom: '4px'
            }}>
              {allAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  style={{
                    padding: '8px 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: selectedArea === area ? '600' : '400',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    color: selectedArea === area ? '#000' : '#666',
                    borderBottom: selectedArea === area ? '2px solid #000' : '2px solid transparent',
                    paddingBottom: '6px',
                    transition: 'all 0.2s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedArea !== area) {
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.borderBottomColor = '#e5e5e5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedArea !== area) {
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  {area === 'all' ? 'All Areas' : area}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Agents Grid - Luxury Minimalist */}
        <section style={{
          padding: isMobile ? '60px 20px' : '120px 0',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: isMobile ? '60px' : '80px',
            paddingLeft: isMobile ? '0' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '0' : 'max(2rem, 3.33vw)'
          }}>
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                style={{
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                {/* Agent Photo */}
                <Link href={`/agent/${agent.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative',
                    marginBottom: '32px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <div style={{
                      paddingBottom: '120%', // Portrait ratio
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: hoveredAgent === agent.id ? 'scale(1.05)' : 'scale(1)'
                      }}>
                        <div style={{
                          width: '160px',
                          height: '160px',
                          borderRadius: '50%',
                          backgroundColor: '#e5e5e5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '56px',
                          fontWeight: '300',
                          color: '#999',
                          marginBottom: '20px'
                        }}>
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '400',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      {agent.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '16px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      {agent.title}
                    </p>
                    <p style={{
                      fontSize: '16px',
                      color: '#000',
                      marginBottom: '24px',
                      fontStyle: 'italic',
                      fontWeight: '300',
                      lineHeight: '1.5',
                      fontFamily: 'Georgia, serif'
                    }}>
                      "{agent.bio}"
                    </p>

                    {/* Key Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '20px',
                      marginBottom: '24px',
                      paddingTop: '24px',
                      borderTop: '1px solid #e5e5e5'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '11px',
                          color: '#999',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '4px',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}>
                          Experience
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}>
                          {agent.experience}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '11px',
                          color: '#999',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '4px',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}>
                          {agent.sold ? 'Properties Sold' : 'Properties Managed'}
                        </div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '500',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}>
                          {agent.sold || agent.managed}
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '12px',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Specialising In
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {agent.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            style={{
                              fontSize: '12px',
                              padding: '6px 12px',
                              backgroundColor: '#f5f5f5',
                              borderRadius: '20px',
                              fontFamily: '"Helvetica Neue", Arial, sans-serif'
                            }}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Areas */}
                    <div style={{ marginBottom: '32px' }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#999',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '8px',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Areas
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        {agent.areas.join(' • ')}
                      </div>
                    </div>

                    {/* Contact Button */}
                    <button
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#262626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                      }}
                    >
                      Contact {agent.name.split(' ')[0]}
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Find Your Perfect Match CTA */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '80px 20px' : '120px 0',
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
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Find Your Perfect Match
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6',
              fontWeight: '300',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Not sure which agent is right for you? Tell us about your property needs and we'll connect you with the perfect specialist.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-block',
                padding: '20px 48px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'background-color 0.2s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#262626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
              }}
            >
              Get Matched
            </Link>
          </div>
        </section>
      </main>

      <OncomFooter />
    </>
  );
}