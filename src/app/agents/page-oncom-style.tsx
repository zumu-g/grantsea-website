'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

// Enhanced agents data with additional ON.COM style information
const agents = [
  {
    id: 'stuart-grant',
    name: 'Stuart Grant',
    position: 'Principal & Licensed Estate Agent',
    email: 'stuart@grantsea.com',
    mobile: '0423 456 789',
    photo: '/images/stuart-grant-profile.png',
    specialties: ['Residential Sales', 'Market Analysis', 'Property Investment'],
    propertiesCount: 34,
    soldCount: 247,
    yearsExperience: 12,
    averageSalePrice: '850k',
    suburbs: ['Berwick', 'Narre Warren', 'Cranbourne'],
    testimonial: `"Stuart's market knowledge and dedication made selling our home effortless. Highly recommend!"`,
    available: true,
    achievements: ['Top Performer 2023', 'REIV Member']
  },
  {
    id: 'sarah-thompson',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    specialties: ['Residential Sales', 'First Home Buyers', 'Downsizing'],
    propertiesCount: 24,
    soldCount: 142,
    yearsExperience: 8,
    averageSalePrice: '720k',
    suburbs: ['Officer', 'Pakenham', 'Beaconsfield'],
    testimonial: `"Sarah understood exactly what we needed and found us the perfect family home."`,
    available: true,
    achievements: ['Customer Choice Award', 'Top 10% Sales']
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    position: 'Investment Specialist',
    email: 'michael@grantsea.com',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    specialties: ['Investment Properties', 'Commercial', 'Development Sites'],
    propertiesCount: 18,
    soldCount: 203,
    yearsExperience: 15,
    averageSalePrice: '950k',
    suburbs: ['Cranbourne', 'Clyde', 'Hampton Park'],
    testimonial: `"Michael's investment expertise helped us build a strong property portfolio."`,
    available: false,
    achievements: ['Commercial Specialist', 'Investment Expert']
  },
  {
    id: 'emma-wilson',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    specialties: ['New Homes', 'Off-the-Plan', 'House & Land Packages'],
    propertiesCount: 35,
    soldCount: 89,
    yearsExperience: 5,
    averageSalePrice: '680k',
    suburbs: ['Clyde North', 'Cranbourne North', 'Officer'],
    testimonial: `"Emma guided us through our first home purchase with incredible patience and care."`,
    available: true,
    achievements: ['New Home Specialist', 'Rising Star Award']
  },
  {
    id: 'david-martinez',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    specialties: ['Property Management', 'Rental Appraisals', 'Maintenance Coordination'],
    propertiesCount: 156,
    managedProperties: 156,
    yearsExperience: 10,
    averageRent: '550pw',
    suburbs: ['Hallam', 'Endeavour Hills', 'Narre Warren South'],
    testimonial: `"David manages our investment properties with professionalism and great communication."`,
    available: true,
    achievements: ['Property Management Excellence', 'Landlord Choice Award']
  },
  {
    id: 'jessica-park',
    name: 'Jessica Park',
    position: 'Luxury Specialist',
    email: 'jessica@grantsea.com',
    mobile: '0456 789 012',
    photo: '/agents/jessica-park.jpg',
    specialties: ['Luxury Homes', 'Prestige Properties', 'Waterfront'],
    propertiesCount: 12,
    soldCount: 67,
    yearsExperience: 7,
    averageSalePrice: '1.2M',
    suburbs: ['Beaconsfield Upper', 'Harkaway', 'Garfield'],
    testimonial: `"Jessica's attention to detail and luxury market knowledge is exceptional."`,
    available: true,
    achievements: ['Luxury Property Expert', 'Prestige Sales Award']
  }
];

export default function AgentsPageOncom() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [filteredAgents, setFilteredAgents] = useState(agents);

  // Get unique specialties for filtering
  const specialties = ['All', ...new Set(agents.flatMap(agent => agent.specialties))];

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Filter agents based on selected specialty
  useEffect(() => {
    if (selectedSpecialty === 'All') {
      setFilteredAgents(agents);
    } else {
      setFilteredAgents(agents.filter(agent => 
        agent.specialties.includes(selectedSpecialty)
      ));
    }
  }, [selectedSpecialty]);

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '100px' : '120px', 
        minHeight: '100vh', 
        backgroundColor: '#fff' 
      }}>
        
        {/* Hero Section - Enhanced with Filtering */}
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
              Meet our agents
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              color: '#666',
              maxWidth: '600px',
              lineHeight: '1.4',
              margin: '0 0 40px 0'
            }}>
              Connect with our expert team to achieve your property goals
            </p>
            
            {/* Team Stats */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: isMobile ? '20px' : '40px',
              marginBottom: '40px'
            }}>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '40px',
                  fontWeight: '300',
                  color: '#000',
                  marginBottom: '4px'
                }}>
                  {agents.reduce((sum, agent) => sum + (agent.soldCount || 0), 0)}+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Properties Sold
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '40px',
                  fontWeight: '300',
                  color: '#000',
                  marginBottom: '4px'
                }}>
                  {agents.reduce((sum, agent) => sum + agent.yearsExperience, 0)}+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Years Combined Experience
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '32px' : '40px',
                  fontWeight: '300',
                  color: '#000',
                  marginBottom: '4px'
                }}>
                  20+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Suburbs Covered
                </div>
              </div>
            </div>
          </div>

          {/* Specialty Filter */}
          <div style={{
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: '20px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Filter by specialty
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: selectedSpecialty === specialty ? '#000' : 'transparent',
                    color: selectedSpecialty === specialty ? '#fff' : '#666',
                    border: '1px solid #e0e0e0',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '300',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedSpecialty !== specialty) {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                      e.currentTarget.style.borderColor = '#ccc';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedSpecialty !== specialty) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#e0e0e0';
                    }
                  }}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
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
            {filteredAgents.map((agent) => (
              <div key={agent.id} style={{
                position: 'relative',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                
                {/* Availability Badge */}
                {agent.available && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: '#22c55e',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    zIndex: 2
                  }}>
                    Available
                  </div>
                )}

                {/* Agent Photo - Enhanced */}
                <div style={{
                  aspectRatio: '4/5',
                  backgroundColor: '#f8f8f8',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  position: 'relative'
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
                  
                  {/* Overlay with Contact Buttons */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                    padding: '40px 20px 20px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <a
                        href={`tel:${agent.mobile}`}
                        style={{
                          flex: 1,
                          padding: '8px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: '#000',
                          textDecoration: 'none',
                          textAlign: 'center',
                          fontSize: '12px',
                          fontWeight: '500',
                          borderRadius: '4px'
                        }}
                      >
                        Call
                      </a>
                      <a
                        href={`mailto:${agent.email}`}
                        style={{
                          flex: 1,
                          padding: '8px',
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          color: '#000',
                          textDecoration: 'none',
                          textAlign: 'center',
                          fontSize: '12px',
                          fontWeight: '500',
                          borderRadius: '4px'
                        }}
                      >
                        Email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Agent Info - Enhanced */}
                <Link 
                  href={`/agent/${agent.id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block'
                  }}
                >
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: isMobile ? '22px' : '24px',
                        fontWeight: '400',
                        margin: 0,
                        color: '#000',
                        letterSpacing: '-0.01em'
                      }}>
                        {agent.name}
                      </h3>
                      {agent.achievements.includes('Top Performer') && (
                        <div style={{
                          backgroundColor: '#fbbf24',
                          color: '#000',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}>
                          ⭐ Top
                        </div>
                      )}
                    </div>
                    
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 4px 0',
                      fontWeight: '300'
                    }}>
                      {agent.position}
                    </p>

                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                      margin: '0 0 16px 0'
                    }}>
                      {agent.yearsExperience} years experience • {agent.suburbs.slice(0, 2).join(', ')}
                      {agent.suburbs.length > 2 && ` +${agent.suburbs.length - 2} more`}
                    </p>
                    
                    {/* Specialty Tags */}
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '16px'
                    }}>
                      {agent.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#f0f0f0',
                            color: '#666',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '400'
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                      {agent.specialties.length > 2 && (
                        <span style={{
                          color: '#999',
                          fontSize: '11px',
                          padding: '4px 0'
                        }}>
                          +{agent.specialties.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Key Stats */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '300',
                          color: '#000',
                          marginBottom: '2px'
                        }}>
                          {agent.soldCount || agent.managedProperties}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {agent.soldCount ? 'Sold' : 'Managed'}
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '300',
                          color: '#000',
                          marginBottom: '2px'
                        }}>
                          ${agent.averageSalePrice || agent.averageRent}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Avg {agent.averageSalePrice ? 'Sale' : 'Rent'}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div style={{
                      backgroundColor: '#f8f8f8',
                      padding: '12px',
                      borderRadius: '4px',
                      marginBottom: '16px'
                    }}>
                      <p style={{
                        fontSize: '13px',
                        color: '#666',
                        margin: 0,
                        fontStyle: 'italic',
                        lineHeight: '1.4'
                      }}>
                        {agent.testimonial}
                      </p>
                    </div>

                    {/* View Profile Link */}
                    <div style={{
                      textAlign: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <span style={{
                        fontSize: '14px',
                        color: '#000',
                        fontWeight: '400',
                        textDecoration: 'underline'
                      }}>
                        View full profile →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Team Achievements Section */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '300',
              margin: '0 0 40px 0',
              color: '#fff',
              letterSpacing: '-0.02em',
              textAlign: 'center'
            }}>
              Award-winning team
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: isMobile ? '30px' : '40px',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              <div>
                <div style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  marginBottom: '8px'
                }}>
                  #1
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Agency in Casey
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  marginBottom: '8px'
                }}>
                  5★
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Google Rating
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  marginBottom: '8px'
                }}>
                  REIV
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Member
                </div>
              </div>
              <div>
                <div style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  marginBottom: '8px'
                }}>
                  12+
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#ccc',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Years Experience
                </div>
              </div>
            </div>

            <div style={{
              textAlign: 'center'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Contact our team
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA - Enhanced */}
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