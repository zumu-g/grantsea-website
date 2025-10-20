'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

// Simplified agents data focusing on essential information only
const agents = [
  {
    id: 'stuart-grant',
    name: 'Stuart Grant',
    position: 'Principal & Licensed Estate Agent',
    email: 'stuart@grantsea.com',
    mobile: '0423 456 789',
    photo: '/images/stuart-grant-profile.png',
    yearsExperience: 12,
    suburbs: ['Berwick', 'Narre Warren', 'Cranbourne']
  },
  {
    id: 'sarah-thompson',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    yearsExperience: 8,
    suburbs: ['Officer', 'Pakenham', 'Beaconsfield']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    position: 'Investment Specialist',
    email: 'michael@grantsea.com',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    yearsExperience: 15,
    suburbs: ['Cranbourne', 'Clyde', 'Hampton Park']
  },
  {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    yearsExperience: 5,
    suburbs: ['Clyde North', 'Cranbourne North', 'Officer']
  },
  {
    id: 'david-martinez',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    yearsExperience: 10,
    suburbs: ['Hallam', 'Endeavour Hills', 'Narre Warren South']
  },
  {
    id: 'jessica-park',
    name: 'Jessica Park',
    position: 'Luxury Specialist',
    email: 'jessica@grantsea.com',
    mobile: '0456 789 012',
    photo: '/agents/jessica-park.jpg',
    yearsExperience: 7,
    suburbs: ['Beaconsfield Upper', 'Harkaway', 'Garfield']
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
    <React.Fragment>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '100px' : '120px', 
        minHeight: '100vh', 
        backgroundColor: '#fff' 
      }}>
        
        {/* Hero Section */}
        <section style={{
          paddingTop: isMobile ? '40px' : '80px',
          paddingBottom: isMobile ? '40px' : '60px',
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          maxWidth: '1440px',
          margin: '0 auto'
        }}>
          <div style={{
            marginBottom: isMobile ? '40px' : '60px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : isTablet ? '64px' : '80px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              margin: '0 0 24px 0',
              color: '#000'
            }}>
              Our team
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              color: '#666',
              maxWidth: '600px',
              lineHeight: '1.4',
              margin: '0'
            }}>
              Local expertise, proven results
            </p>
          </div>
        </section>

        {/* Agents Grid - Ultra Minimal */}
        <section style={{
          paddingTop: isMobile ? '60px' : '80px',
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
              <Link key={agent.id} href={`/agent/${agent.id}`} style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block'
              }}>
                <div style={{
                  cursor: 'pointer'
                }}>
                  {/* Agent Photo - Simple */}
                  <div style={{
                    aspectRatio: '4/5',
                    backgroundColor: '#f8f8f8',
                    marginBottom: '20px',
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
                        color: '#ccc',
                        backgroundColor: '#f0f0f0'
                      }}>
                        {agent.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Agent Info - Minimal */}
                  <div>
                    <h3 style={{
                      fontSize: isMobile ? '20px' : '22px',
                      fontWeight: '400',
                      margin: '0 0 8px 0',
                      color: '#000',
                      letterSpacing: '-0.01em'
                    }}>
                      {agent.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 8px 0',
                      fontWeight: '300'
                    }}>
                      {agent.position}
                    </p>

                    <p style={{
                      fontSize: '13px',
                      color: '#999',
                      margin: '0 0 16px 0'
                    }}>
                      {agent.yearsExperience} years experience
                    </p>
                    
                    {/* Contact */}
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '16px'
                    }}>
                      <a
                        href={`tel:${agent.mobile}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flex: 1,
                          padding: '10px',
                          backgroundColor: '#000',
                          color: '#fff',
                          textDecoration: 'none',
                          textAlign: 'center',
                          fontSize: '13px',
                          fontWeight: '400',
                          transition: 'background-color 0.2s ease'
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
                          padding: '10px',
                          backgroundColor: 'transparent',
                          color: '#000',
                          textDecoration: 'none',
                          textAlign: 'center',
                          fontSize: '13px',
                          fontWeight: '400',
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f5f5f5';
                          e.currentTarget.style.borderColor = '#ccc';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderColor = '#e0e0e0';
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
        </section>

      </main>
    </React.Fragment>
  );
}