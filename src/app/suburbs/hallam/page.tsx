'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function HallamSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties, loading } = useProperties({ suburb: 'Hallam', limit: 6 });

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
            }}>How to live in<br />Hallam</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              opacity: 0.9,
              maxWidth: '800px',
              lineHeight: '1.5'
            }}>
              Affordable family living with exceptional transport links and genuine multicultural community spirit
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
                  Welcome to Hallam
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hallam embodies the essence of affordable family living in Melbourne's southeast, offering a mature suburban environment that has evolved gracefully from industrial roots to become a diverse residential community. Located approximately 35 kilometres from Melbourne's CBD in the City of Casey, Hallam presents an attractive proposition for families and investors seeking established infrastructure, convenient transport links, and genuine value.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  What distinguishes Hallam is its strategic positioning at the intersection of major transport corridors, providing exceptional connectivity while maintaining affordable housing options. With the Hallam railway station on both the Pakenham and Cranbourne lines, extensive bus networks, and proximity to major employment centres, Hallam offers practical suburban living without premium price tags.
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
                  alt="Hallam streets"
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
                  Hallam occupies a central position in Melbourne's southeastern suburbs, strategically located between the major centres of Dandenong and Narre Warren. The suburb is bounded by Endeavour Hills to the north, Hampton Park to the east, Lynbrook to the south, and Noble Park to the west.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hallam boasts exceptional public transport connectivity that sets it apart from many outer suburbs. The Hallam railway station is uniquely positioned on both the Pakenham and Cranbourne lines, providing frequent services and flexibility in travel directions. The extensive bus network includes the 901 SmartBus orbital route, providing connections to major activity centres.
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
                      <span>Hallam Station - Pakenham & Cranbourne lines (45-50 min to CBD)</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚌</span>
                      <span>901 SmartBus & multiple local routes</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚗</span>
                      <span>Princes Highway & South Gippsland Highway access</span>
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
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>35km</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Melbourne CBD</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>10min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Dandenong</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>5min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Fountain Gate</div>
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
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏃</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Recreation Reserve
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Sporting grounds for cricket and football, playgrounds and open space supporting local clubs and community gatherings.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>⛳</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Spring Valley Golf
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Quality golf course serving enthusiasts while providing green space and recreational variety for the area.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Cultural Events
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Regular festivals, religious celebrations, and community gatherings celebrating Hallam's multicultural character.
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              Hallam offers practical recreational facilities that serve the community's needs without pretense. Local parks provide playground equipment and green space for families, while nearby facilities like Endeavour Hills Leisure Centre and Noble Park Aquatic Centre offer swimming and fitness options within easy reach.
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
              Education facilities in Hallam cater comprehensively to the local community, with several primary schools serving different parts of the suburb. These schools often feature specialist programs including languages that reflect the community's diversity.
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
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Hallam Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Hallam Valley Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• St Elizabeth's Catholic Primary</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Multiple childcare centres</li>
                </ul>
              </div>
              <div style={{
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                  Secondary Options
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Hallam Senior Learning Centre</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Fountain Gate Secondary College</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Lyndale Secondary College</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• VCE/VCAL alternative pathways</li>
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
                  Hallam's housing stock primarily consists of established homes built during the suburb's major growth phase from the 1970s to 1990s. These properties typically feature practical designs with three to four bedrooms, formal and informal living areas, and good-sized backyards that appeal to families.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  The suburb offers exceptional value for money, with house prices significantly below Melbourne's median while providing similar amenities to more expensive areas. Typical blocks range from 600-800 square meters, providing space for outdoor living and practical considerations for working families.
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
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>$650,000 - $750,000</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Property Types</div>
                  <div style={{ fontSize: '16px' }}>Established family homes • Some townhouses</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Investment Potential</div>
                  <div style={{ fontSize: '16px' }}>Strong rental yields • Steady demand</div>
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
              Hallam's community strength lies in its diversity and the networks that different cultural groups have established. Religious facilities spanning various faiths provide not just spiritual services but community support and social connection. The population includes significant communities from Southeast Asian, Middle Eastern, and Pacific Islander backgrounds.
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
                }}>🌏</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Multicultural</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Rich diversity celebrated</p>
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
                }}>🏘️</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Working Families</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Backbone of community</p>
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
                }}>🏛️</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Faith Communities</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Multiple religions represented</p>
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
                }}>🤝</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Support Networks</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Strong community bonds</p>
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
              Current Properties in Hallam
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px'
            }}>
              Discover affordable family homes in this well-connected suburb
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
                  No properties currently available in Hallam
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
              <Link href="/buy?suburb=Hallam" style={{
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
                View all Hallam properties
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
                      Inspect infrastructure condition - older homes may need updates
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Research specific locations for varying characteristics
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Consider transport proximity - properties near station command premiums
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Embrace the multicultural character as community strength
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
                      Strong rental market with affordable options
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Excellent transport links for CBD commuters
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Research schools for family-appropriate options
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Take advantage of multicultural dining options
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
              Who will love Hallam?
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
                    <strong>Budget-conscious families</strong> - Affordable housing with practical layouts
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Multicultural communities</strong> - Diverse population and cultural facilities
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Commuters</strong> - Exceptional train connectivity with two lines
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Investors</strong> - Strong rental yields and steady demand
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>First-home buyers</strong> - Accessible prices with established infrastructure
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  The Hallam advantage:
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.9 }}>
                  Hallam represents authentic suburban Melbourne – unpretentious, multicultural, and focused on providing affordable family housing with good connectivity. While it may lack the polish of premium suburbs, it offers genuine value through established infrastructure, exceptional transport links, and strong community networks.
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
              Ready to make Hallam home?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '40px',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Our local experts understand the value in Hallam and can help you find an affordable family home with great transport links.
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