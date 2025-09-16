'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function ClydeSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties, loading } = useProperties({ suburb: 'Clyde', limit: 6 });

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
            }}>How to live in<br />Clyde</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              opacity: 0.9,
              maxWidth: '800px',
              lineHeight: '1.5'
            }}>
              Melbourne's newest frontier where modern masterplanned communities are creating a suburb designed for 21st-century living
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
                  Welcome to Clyde
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde represents Melbourne's newest frontier in suburban development, a rapidly transforming area that's evolving from rural farmland into a modern residential community before our eyes. Located approximately 48 kilometres southeast of Melbourne's CBD in the City of Casey, Clyde offers a unique opportunity to be part of a suburb's birth and growth.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  What makes Clyde special is its blank-canvas approach to suburban development. Here, planners have learned from decades of suburban growth to create communities with integrated parks, walkable neighborhoods, and future transport connections from day one. The suburb attracts pioneers – young families and professionals who want to be part of building a new community while securing brand-new homes at competitive prices.
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
                  alt="Clyde streets"
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
                  Clyde sits at the southeastern edge of Melbourne's urban growth boundary, positioned between Clyde North to the north, Cranbourne South to the west, and rural areas extending toward Koo Wee Rup to the southeast. This location places Clyde at the current frontier of Melbourne's expansion, where urban meets rural in a carefully planned transition.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Currently, Clyde's transport relies heavily on private vehicles, with road networks designed to handle this reality. The future Clyde railway station, planned as part of the Cranbourne line extension, will transform connectivity. While construction timelines remain uncertain, the reserved corridor and station location provide confidence in eventual delivery.
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
                      <span>Future Clyde Station - Planned Cranbourne line extension</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚌</span>
                      <span>Routes 897, 898 - Connecting to Cranbourne Station</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚗</span>
                      <span>Thompsons Road & Berwick-Cranbourne Road access</span>
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
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>15min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Cranbourne Station</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>10-15min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to major shopping</div>
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
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏞️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Future Regional Park
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Planned Clyde Regional Park will provide sporting fields, playgrounds, and community facilities as a major focal point.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛍️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Future Town Centre
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Planned major activity hub with supermarkets, specialty retail, dining, and entertainment creating a community focal point.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🌳</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Estate Parks
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Each estate features integrated parks with modern equipment, walking paths, and green corridors throughout neighborhoods.
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              Clyde's lifestyle revolves around new community infrastructure designed to foster connection and wellbeing. Each estate features parks and playgrounds strategically distributed to ensure all homes are within walking distance of green space. Walking and cycling paths wind throughout Clyde, connecting neighborhoods and providing recreational routes.
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
              Education infrastructure in Clyde is developing in parallel with residential growth, with new schools opening as population thresholds are reached. Planning provisions ensure sites are reserved for future schools as each precinct develops.
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
                  Current Schools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Clyde Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Early learning centres in estates</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Kindergartens opening progressively</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Access to nearby suburb schools</li>
                </ul>
              </div>
              <div style={{
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                  Future Education
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Additional primary schools planned</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Secondary school sites reserved</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Private school potential</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Timing linked to population growth</li>
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
                  Clyde's housing market consists almost entirely of new construction, with estates offering contemporary homes designed for modern family living. Properties typically feature 3-5 bedrooms, open-plan living areas, and alfresco spaces that blur indoor-outdoor boundaries. Modern design principles emphasize natural light, energy efficiency, and flexible spaces.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  Land sizes in Clyde vary by estate and price point, typically ranging from 300-600 square meters. While smaller than traditional quarter-acre blocks, these lots are designed efficiently. The building process often involves purchasing house-and-land packages, where buyers select from builder ranges and customize finishes.
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
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>$650,000 - $800,000</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Property Types</div>
                  <div style={{ fontSize: '16px' }}>95% Houses • 5% Townhouses</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Growth Potential</div>
                  <div style={{ fontSize: '16px' }}>Strong long-term with infrastructure plans</div>
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
              Clyde's community is actively forming, with residents consciously building connections in their new neighborhood. Social media groups play crucial roles, facilitating introductions, sharing information, and organizing gatherings. The demographic homogeneity of young families creates natural connection points through children's activities.
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
                }}>🏗️</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Pioneer Spirit</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Building community together</p>
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
                }}>👨‍👩‍👧‍👦</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Young Families</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Average age 25-40</p>
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
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Digital Connected</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Active online communities</p>
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
                }}>🌱</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Growing Together</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Shaping suburb character</p>
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
              Current Properties in Clyde
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px'
            }}>
              Discover brand-new homes in Melbourne's newest suburb
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
                  No properties currently available in Clyde
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
              <Link href="/buy?suburb=Clyde" style={{
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
                View all Clyde properties
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
                      Research estate differences - each has distinct characteristics
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Understand infrastructure timing for schools and transport
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Budget for two cars - current transport requires vehicles
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Check builder reputation when buying house-and-land packages
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
                      Consider construction impacts in developing areas
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Join community groups early for local connections
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Factor in current travel times to work/shops
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Expect amenities to develop progressively
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
              Who will love Clyde?
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
                    <strong>Pioneer families</strong> - Excited by building community and shaping character
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>First-home buyers</strong> - Seeking new homes at accessible prices
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Young families</strong> - Wanting space and modern amenities
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Remote workers</strong> - Needing home office space
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Property investors</strong> - Focused on long-term growth potential
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  The Clyde advantage:
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.9 }}>
                  Clyde offers a unique opportunity in Melbourne's property market – the chance to be part of a suburb's creation story. For those who see beyond current limitations to future potential, Clyde provides new homes at accessible prices in masterplanned communities designed for contemporary living.
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
              Ready to pioneer in Clyde?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '40px',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Our experts understand new estate developments and can guide you through building your dream home in Melbourne's newest community.
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