'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

// Agent data with specialties
const agents = [
  {
    id: 'stuart-grant',
    name: 'Stuart Grant',
    position: 'Principal & Licensed Estate Agent',
    email: 'stuart@grantsea.com',
    mobile: '0423 456 789',
    photo: '/images/stuart-grant-profile.png',
    yearsExperience: 12,
    suburbs: ['Berwick', 'Narre Warren', 'Cranbourne'],
    specialty: 'Sales',
    salesVolume: '$150M+',
    propertiesSold: 450
  },
  {
    id: 'sarah-thompson',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    yearsExperience: 8,
    suburbs: ['Officer', 'Pakenham', 'Beaconsfield'],
    specialty: 'Sales',
    salesVolume: '$85M+',
    propertiesSold: 280
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    position: 'Investment Specialist',
    email: 'michael@grantsea.com',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    yearsExperience: 15,
    suburbs: ['Cranbourne', 'Clyde', 'Hampton Park'],
    specialty: 'Investment',
    salesVolume: '$120M+',
    propertiesSold: 380
  },
  {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    yearsExperience: 5,
    suburbs: ['Clyde North', 'Cranbourne North', 'Officer'],
    specialty: 'New Homes',
    salesVolume: '$45M+',
    propertiesSold: 120
  },
  {
    id: 'david-martinez',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    yearsExperience: 10,
    suburbs: ['Hallam', 'Endeavour Hills', 'Narre Warren South'],
    specialty: 'Rentals',
    salesVolume: '350+ managed',
    propertiesSold: 0
  },
  {
    id: 'jessica-park',
    name: 'Jessica Park',
    position: 'Luxury Specialist',
    email: 'jessica@grantsea.com',
    mobile: '0456 789 012',
    photo: '/agents/jessica-park.jpg',
    yearsExperience: 7,
    suburbs: ['Beaconsfield Upper', 'Harkaway', 'Garfield'],
    specialty: 'Luxury',
    salesVolume: '$95M+',
    propertiesSold: 85
  }
];

const specialties = ['All', 'Sales', 'Investment', 'New Homes', 'Rentals', 'Luxury'];

export default function AgentsPageOncom() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const filteredAgents = activeFilter === 'All'
    ? agents
    : agents.filter(agent => agent.specialty === activeFilter);

  const totalExperience = agents.reduce((sum, agent) => sum + agent.yearsExperience, 0);
  const totalSales = agents.reduce((sum, agent) => sum + agent.propertiesSold, 0);

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
              Meet our<br />
              team
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '600px',
              margin: '0',
              lineHeight: '1.4',
              fontWeight: '400'
            }}>
              Local experts with decades of combined experience across Melbourne's south-east
            </p>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '32px' : '48px',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                {agents.length}
              </div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                Expert agents
              </div>
            </div>
            <div>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                {totalExperience}+
              </div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                Years combined experience
              </div>
            </div>
            <div>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                {totalSales.toLocaleString()}+
              </div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                Properties sold
              </div>
            </div>
            <div>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '800',
                marginBottom: '8px'
              }}>
                20+
              </div>
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                Suburbs covered
              </div>
            </div>
          </div>
        </section>

        {/* Filter Pills */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'flex-start' : 'center'
          }}>
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setActiveFilter(specialty)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '32px',
                  border: activeFilter === specialty ? '2px solid #000' : '1px solid #e5e5e5',
                  backgroundColor: activeFilter === specialty ? '#000' : '#fff',
                  color: activeFilter === specialty ? '#fff' : '#000',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== specialty) {
                    e.currentTarget.style.borderColor = '#000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== specialty) {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                  }
                }}
              >
                {specialty}
              </button>
            ))}
          </div>
        </section>

        {/* Agents Grid */}
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
              gap: isMobile ? '48px' : '40px'
            }}>
              {filteredAgents.map((agent) => (
                <Link
                  key={agent.id}
                  href={`/agent/${agent.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    {/* Agent Photo */}
                    <div style={{
                      aspectRatio: '4/5',
                      backgroundColor: '#f8f8f8',
                      marginBottom: '24px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      position: 'relative'
                    }}>
                      {agent.photo ? (
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            transform: hoveredAgent === agent.id ? 'scale(1.05)' : 'scale(1)'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: agent.photo ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '72px',
                        fontWeight: '300',
                        color: '#ccc',
                        backgroundColor: '#f0f0f0',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}>
                        {agent.name.charAt(0)}
                      </div>

                      {/* Specialty Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '8px 16px',
                        backgroundColor: '#000',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '32px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {agent.specialty}
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        margin: '0 0 8px 0',
                        color: '#000',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.2s ease'
                      }}>
                        {agent.name}
                      </h3>

                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 16px 0'
                      }}>
                        {agent.position}
                      </p>

                      {/* Quick Stats */}
                      <div style={{
                        display: 'flex',
                        gap: '24px',
                        marginBottom: '20px'
                      }}>
                        <div>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#000'
                          }}>
                            {agent.yearsExperience}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#999'
                          }}>
                            Years
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: '20px',
                            fontWeight: '700',
                            color: '#000'
                          }}>
                            {agent.salesVolume}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#999'
                          }}>
                            {agent.specialty === 'Rentals' ? 'Properties' : 'In Sales'}
                          </div>
                        </div>
                      </div>

                      {/* Areas */}
                      <div style={{
                        fontSize: '13px',
                        color: '#999',
                        marginBottom: '20px'
                      }}>
                        {agent.suburbs.join(' · ')}
                      </div>

                      {/* Contact Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '12px'
                      }}>
                        <a
                          href={`tel:${agent.mobile}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            flex: 1,
                            padding: '14px',
                            backgroundColor: '#000',
                            color: '#fff',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '600',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#333';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#000';
                          }}
                        >
                          Call
                        </a>
                        <a
                          href={`mailto:${agent.email}`}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            flex: 1,
                            padding: '14px',
                            backgroundColor: 'transparent',
                            color: '#000',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: '1px solid #e5e5e5',
                            borderRadius: '4px',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e5e5e5';
                          }}
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666'
              }}>
                <p style={{ fontSize: '18px' }}>No agents found for this specialty.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
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
              Ready to get started?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Whether you're buying, selling, or renting, our team is here to help you navigate the market with confidence.
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
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
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
                Contact us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
