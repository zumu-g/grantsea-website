'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function OfficerSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties, loading } = useProperties({ suburb: 'Officer', limit: 6 });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Scroll to section
  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSection(index);
    }
  };

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'location', title: 'Location & Transport' },
    { id: 'lifestyle', title: 'Lifestyle & Amenities' },
    { id: 'education', title: 'Schools & Education' },
    { id: 'housing', title: 'Housing & Market' },
    { id: 'community', title: 'Community & Culture' },
    { id: 'properties', title: 'Current Listings' },
    { id: 'tips', title: 'Buyer Tips' }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: isMobile ? '60px' : '64px', backgroundColor: '#fff' }}>
        {/* Hero Section - Tennis Guide Style */}
        <section style={{
          position: 'relative',
          height: '100vh',
          minHeight: '600px',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.7
          }} />
          
          {/* Content Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            color: '#fff',
            padding: '0 20px'
          }}>
            <p style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px',
              opacity: 0.9
            }}>Suburb Guide</p>
            
            <h1 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '400',
              lineHeight: '1',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>How to live in<br />Officer</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              opacity: 0.9,
              maxWidth: '800px',
              lineHeight: '1.5'
            }}>
              The perfect intersection of strategic location, contemporary living, and natural beauty in Melbourne's southeastern growth corridor
            </p>
            
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </section>

        {/* Navigation Bar */}
        <nav style={{
          position: 'sticky',
          top: isMobile ? '60px' : '64px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 100,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          <div style={{
            display: 'flex',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
          }}>
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                style={{
                  padding: '20px 24px',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  fontWeight: activeSection === index ? '600' : '400',
                  color: activeSection === index ? '#000' : '#666',
                  borderBottom: activeSection === index ? '2px solid #000' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Sections */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
          
          {/* Introduction */}
          <section id="section-0" style={{ marginBottom: '80px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: '-0.02em'
                }}>
                  Welcome to Officer
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Officer represents the perfect intersection of strategic location, contemporary living, and natural beauty in Melbourne's southeastern growth corridor. Located approximately 48 kilometres from Melbourne's CBD, Officer has rapidly transformed from a quiet rural locality into one of the most sought-after residential addresses in the outer southeast.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  What sets Officer apart is its exceptional balance of urban convenience and semi-rural charm. The suburb features contemporary housing estates with cutting-edge design and sustainability features, while maintaining corridors of natural bushland and green space. With the Cardinia Road Employment Precinct bringing thousands of jobs to the area and excellent transport links via the Officer train station, the suburb offers a rare combination of lifestyle, employment, and connectivity.
                </p>
              </div>
              <div style={{
                position: 'relative',
                height: isMobile ? '300px' : '400px',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=600&fit=crop"
                  alt="Officer streets"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </section>

          {/* Location & Transport */}
          <section id="section-1" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Location & Transport
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
              gap: '40px'
            }}>
              <div>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Officer occupies a prime position in the Shire of Cardinia, strategically located between the established suburb of Berwick to the west and the regional centre of Pakenham to the east. The suburb is bounded by Beaconsfield to the south and Nar Nar Goon to the east, placing it at the heart of one of Melbourne's fastest-growing regions.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Officer's transport infrastructure represents a significant advantage, anchored by the Officer railway station on the Pakenham line. The station, opened in 2012, provides regular services to Melbourne via Dandenong, with typical journey times of 55-65 minutes to the CBD. The modern station includes extensive parking, recognizing that many residents drive to access rail services.
                </p>
                <div style={{
                  backgroundColor: '#f8f8f8',
                  padding: '24px',
                  borderRadius: '8px',
                  marginTop: '32px'
                }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Transport Options</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚆</span>
                      <span>Officer Station - Pakenham line (55-65 min to CBD)</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚌</span>
                      <span>Route 926 - Connecting to Fountain Gate and Pakenham</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚗</span>
                      <span>Princes Highway & Monash Freeway access</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '32px',
                borderRadius: '12px',
                height: 'fit-content'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
                  Distance to Key Locations
                </h3>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>48km</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Melbourne CBD</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>10min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Berwick</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>5min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Pakenham</div>
                </div>
              </div>
            </div>
          </section>

          {/* Lifestyle & Amenities */}
          <section id="section-2" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Lifestyle & Amenities
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px',
              marginBottom: '40px'
            }}>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛍️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Officer Central & Arena
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Modern shopping centres providing supermarkets, cafes, specialty stores and fresh food for everyday needs.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏞️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Recreation Reserve
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Modern sporting fields, playgrounds, and pavilions supporting local football, cricket, and netball clubs.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🌳</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Cardinia Reservoir
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Nearby regional park offering extensive walking trails, picnic areas, and water-based recreation.
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              Officer's lifestyle appeal centers on its abundant green space and modern recreational facilities integrated into residential planning. Each residential estate features parks and playgrounds designed to serve local communities, with equipment catering to various age groups. The Officer Public Hall serves as a community hub, hosting events, programs, and celebrations that bring residents together.
            </p>
          </section>

          {/* Education */}
          <section id="section-3" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Schools & Education
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333',
              marginBottom: '32px'
            }}>
              Education infrastructure in Officer has been developed in tandem with residential growth, resulting in modern facilities designed for contemporary learning. Schools benefit from purpose-built facilities and the opportunity to establish positive cultures from inception.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px'
            }}>
              <div style={{
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                  Primary Schools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Officer Primary School (opened 2016)</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Bridgewood Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Multiple childcare centres</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Planned future schools</li>
                </ul>
              </div>
              <div style={{
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                  Secondary Schools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Officer Secondary College (opened 2018)</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Access to Berwick schools</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Pakenham Secondary College</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Private school options nearby</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Housing & Market */}
          <section id="section-4" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Housing & Property Market
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '40px',
              marginBottom: '40px'
            }}>
              <div>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Officer's housing market is characterized by contemporary design and modern amenities, with most properties built within the last 15 years. The suburb features several masterplanned estates including Arena, Arcadia, and Orchard Park, each offering distinct characteristics while maintaining high design standards.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  New homes dominate the market, typically featuring 3-4 bedrooms, multiple living areas, and modern open-plan designs. These properties emphasize energy efficiency, with many including solar panels, water tanks, and high insulation standards. Block sizes generally range from 300-700 square meters.
                </p>
              </div>
              <div style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
                  Market Snapshot
                </h3>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Median House Price</div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>$700,000 - $850,000</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Property Types</div>
                  <div style={{ fontSize: '16px' }}>90% Houses • 8% Townhouses • 2% Units</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Growth Potential</div>
                  <div style={{ fontSize: '16px' }}>Strong - Employment precinct & infrastructure</div>
                </div>
              </div>
            </div>
          </section>

          {/* Community & Culture */}
          <section id="section-5" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Community & Culture
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333',
              marginBottom: '32px'
            }}>
              Officer's community is characterized by its youth and energy, with new residents actively creating neighborhood connections and community culture. The predominance of young families creates natural connection points through schools, parks, and local activities, fostering a supportive community environment.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '24px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '32px'
                }}>👨‍👩‍👧‍👦</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Young Families</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Average age 32 with children</p>
              </div>
              <div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '32px'
                }}>🏗️</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>New Community</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Building culture together</p>
              </div>
              <div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '32px'
                }}>🏃</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Active Lifestyle</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Sports clubs & recreation</p>
              </div>
              <div>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '32px'
                }}>💻</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Connected</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Active online community</p>
              </div>
            </div>
          </section>

          {/* Properties Section */}
          <section id="section-6" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Current Properties in Officer
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px'
            }}>
              Discover modern homes in this growing community
            </p>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '3px solid #f0f0f0',
                  borderTop: '3px solid #000',
                  borderRadius: '50%',
                  margin: '0 auto',
                  animation: 'spin 1s linear infinite'
                }} />
              </div>
            ) : properties.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px'
              }}>
                {properties.map((property) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <Link href={`/property/${property.id}`} style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}>
                      <div style={{
                        position: 'relative',
                        paddingTop: '66.67%',
                        backgroundColor: '#f5f5f5'
                      }}>
                        {property.images && property.images[0] ? (
                          <img
                            src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                            alt={property.address}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                          }}>
                            No image available
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
                          fontWeight: '600',
                          marginBottom: '8px'
                        }}>
                          {property.priceDisplay || formatPrice(property.price)}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          color: '#666',
                          marginBottom: '16px'
                        }}>
                          {property.address}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '20px',
                          fontSize: '14px',
                          color: '#333'
                        }}>
                          <span>{property.bedrooms} beds</span>
                          <span>{property.bathrooms} baths</span>
                          <span>{property.carSpaces} cars</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  No properties currently available in Officer
                </p>
                <Link href="/buy" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
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
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  View all properties
                </Link>
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/buy?suburb=Officer" style={{
                display: 'inline-block',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #000',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
              }}>
                View all Officer properties
              </Link>
            </div>
          </section>

          {/* Buyer Tips */}
          <section id="section-7" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Tips for Buyers & Renters
            </h2>
            <div style={{
              backgroundColor: '#f8f8f8',
              padding: isMobile ? '32px 24px' : '48px',
              borderRadius: '12px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '32px'
              }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                    For Buyers
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Research estates carefully - each has different characteristics and price points
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Consider construction timelines for new areas
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Check school zones as they may change with new school openings
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Understand estate architectural guidelines and landscape requirements
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                    For Renters
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Strong rental market with modern properties
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Factor in commute costs including train fares and parking
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Consider proximity to shops and amenities
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Plan for amenity development - some facilities still developing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Who Will Love It */}
          <section style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: isMobile ? '48px 24px' : '80px',
            borderRadius: '12px',
            marginBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Who will love Officer?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '40px'
            }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  Perfect for:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Young families</strong> - Modern homes, new schools, and family-friendly estates
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>First-home buyers</strong> - Competitive prices for new homes with modern amenities
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Professionals</strong> - Train connectivity and emerging local employment
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Remote workers</strong> - Modern homes with space for home offices
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Community builders</strong> - Opportunity to shape a new community
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  The Officer advantage:
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.9 }}>
                  Officer represents a new generation of Melbourne suburbs – purposefully planned, sustainably designed, and strategically located to provide residents with an optimal balance of affordability, lifestyle, and opportunity. The combination of modern housing, emerging employment opportunities, and quality infrastructure creates a compelling proposition for those seeking to establish themselves in Melbourne's growth corridor.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '100px 80px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Ready to make Officer home?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '40px',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Our local experts know every estate and can help you find the perfect modern home in this thriving community.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/appraisal" style={{
                display: 'inline-block',
                padding: '16px 40px',
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
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                Get free appraisal
              </Link>
              <Link href="/contact" style={{
                display: 'inline-block',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #000',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#000';
              }}>
                Talk to an expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-10px) translateX(-50%);
          }
          60% {
            transform: translateY(-5px) translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}