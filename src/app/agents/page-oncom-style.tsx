'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

// Simplified agents data
const agents = [
  {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    specialties: ['Residential Sales', 'First Home Buyers'],
    propertiesCount: 24,
    soldCount: 142
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Investment Specialist',
    email: 'michael@grantsea.com',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    specialties: ['Investment Properties', 'Commercial'],
    propertiesCount: 18,
    soldCount: 203
  },
  {
    id: '3',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    specialties: ['New Homes', 'Off-the-Plan'],
    propertiesCount: 35,
    soldCount: 89
  },
  {
    id: '4',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    specialties: ['Property Management', 'Rentals'],
    propertiesCount: 156,
    managedProperties: 156
  },
  {
    id: '5',
    name: 'Jessica Park',
    position: 'Luxury Specialist',
    email: 'jessica@grantsea.com',
    mobile: '0456 789 012',
    photo: '/agents/jessica-park.jpg',
    specialties: ['Luxury Homes', 'Waterfront'],
    propertiesCount: 12,
    soldCount: 67
  },
  {
    id: '6',
    name: 'Tom Richards',
    position: 'Senior Consultant',
    email: 'tom@grantsea.com',
    mobile: '0467 890 123',
    photo: '/agents/tom-richards.jpg',
    specialties: ['Residential Sales', 'Auctions'],
    propertiesCount: 28,
    soldCount: 178
  }
];

export default function AgentsPageOncom() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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
      
      <main style={{ 
        paddingTop: isMobile ? '100px' : '120px', 
        minHeight: '100vh', 
        backgroundColor: '#fff' 
      }}>
        
        {/* Hero Section - Minimal */}
        <section style={{
          paddingTop: isMobile ? '40px' : '80px',
          paddingBottom: isMobile ? '60px' : '100px',
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
            fontWeight: '300',
            letterSpacing: '-0.02em',
            lineHeight: '1.1',
            margin: '0 0 24px 0',
            color: '#000'
          }}>
            Find agents
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '24px',
            fontWeight: '300',
            color: '#666',
            maxWidth: '600px',
            lineHeight: '1.4',
            margin: 0
          }}>
            Connect with our expert team to achieve your property goals
          </p>
        </section>

        {/* Agents Grid - Clean Minimal Cards */}
        <section style={{
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingBottom: isMobile ? '60px' : '120px',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '40px' : '60px'
          }}>
            {agents.map((agent) => (
              <Link 
                key={agent.id} 
                href={`/agent/${agent.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block'
                }}
              >
                <div style={{
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  {/* Agent Photo - Minimal */}
                  <div style={{
                    aspectRatio: '4/5',
                    backgroundColor: '#f8f8f8',
                    marginBottom: '24px',
                    overflow: 'hidden'
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '48px',
                        fontWeight: '300',
                        color: '#ccc'
                      }}>
                        {agent.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Agent Info - Clean Typography */}
                  <div>
                    <h3 style={{
                      fontSize: isMobile ? '24px' : '28px',
                      fontWeight: '300',
                      margin: '0 0 8px 0',
                      color: '#000',
                      letterSpacing: '-0.01em'
                    }}>
                      {agent.name}
                    </h3>
                    
                    <p style={{
                      fontSize: isMobile ? '16px' : '18px',
                      color: '#666',
                      margin: '0 0 16px 0',
                      fontWeight: '300'
                    }}>
                      {agent.position}
                    </p>
                    
                    {/* Contact Info - Minimal */}
                    <div style={{
                      fontSize: '14px',
                      color: '#999',
                      marginBottom: '20px'
                    }}>
                      <div style={{ marginBottom: '4px' }}>{agent.mobile}</div>
                      <div>{agent.email}</div>
                    </div>

                    {/* Stats - Simple */}
                    <div style={{
                      fontSize: '14px',
                      color: '#666',
                      borderTop: '1px solid #f0f0f0',
                      paddingTop: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span>Active listings</span>
                        <span style={{ color: '#000' }}>{agent.propertiesCount}</span>
                      </div>
                      {agent.soldCount && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span>Properties sold</span>
                          <span style={{ color: '#000' }}>{agent.soldCount}</span>
                        </div>
                      )}
                      {agent.managedProperties && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span>Properties managed</span>
                          <span style={{ color: '#000' }}>{agent.managedProperties}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact CTA - Minimal */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : '100px',
          paddingBottom: isMobile ? '60px' : '100px',
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '300',
              margin: '0 0 24px 0',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Ready to get started?
            </h2>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              margin: '0 0 40px 0',
              fontWeight: '300',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Contact our team today to discuss your property needs
            </p>
            <Link href="/contact" style={{
              display: 'inline-block',
              padding: isMobile ? '16px 32px' : '20px 40px',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '300',
              transition: 'background-color 0.3s ease',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000';
            }}>
              Get in touch
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}