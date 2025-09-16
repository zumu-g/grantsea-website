'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function HamptonParkSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties, loading } = useProperties({ suburb: 'Hampton Park', limit: 6 });

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
            }}>How to live in<br />Hampton Park</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              opacity: 0.9,
              maxWidth: '800px',
              lineHeight: '1.5'
            }}>
              Authentic suburban Melbourne living offering genuine affordability and strong community spirit in the heart of Casey
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
                  Welcome to Hampton Park
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hampton Park represents authentic suburban Melbourne living, offering genuine affordability and strong community spirit in the heart of the Casey region. Located approximately 36 kilometres southeast of Melbourne's CBD, this established suburb has evolved from its humble beginnings into a vibrant multicultural community that epitomizes the Australian suburban dream for many migrant families and first-home buyers.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  What makes Hampton Park special is its role as a stepping stone suburb – a place where new Australians establish roots, where young families buy their first homes, and where community connections transcend cultural boundaries. The suburb offers the increasingly rare combination of affordability and accessibility in Melbourne's inflated property market.
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
                  alt="Hampton Park streets"
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
                  Hampton Park sits strategically in Melbourne's southeastern suburbs, bounded by Hallam to the north, Narre Warren South to the east, Lynbrook and Lyndhurst to the south, and Dandenong South to the west. This central position within the Casey municipality provides residents with access to multiple employment centers and suburban hubs while maintaining distinct neighborhood identity.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The suburb is well-connected via the South Gippsland Highway running along its western boundary, with Pound Road and Somerville Road providing main east-west connections. While lacking its own train station, Hampton Park benefits from proximity to both Hallam and Lynbrook stations, making it accessible for commuters willing to drive short distances to rail connections.
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
                      <span>Hallam & Lynbrook Stations - 5-10 min drive</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚌</span>
                      <span>Route 894 - Connecting to Dandenong & Fountain Gate</span>
                    </li>
                    <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '12px', fontSize: '20px' }}>🚗</span>
                      <span>South Gippsland Highway & Western Port Highway access</span>
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
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>36km</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Melbourne CBD</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>10min</div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>to Dandenong Hospital</div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>5km</div>
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
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🛍️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Hampton Park Shopping Centre
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Local hub with supermarkets, fresh food, and specialty stores serving daily needs and providing social gathering space.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🍽️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Multicultural Dining
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Authentic Afghan, Indian, Sri Lankan, Middle Eastern, and African cuisine at affordable prices from family-run businesses.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '32px',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏞️</div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                  Parks & Recreation
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  Hampton Park Recreation Reserve, Robert Booth Reserve, and nearby Dandenong Valley Parklands for sports and recreation.
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#333'
            }}>
              The suburb's multicultural character shines through its food offerings. Small restaurants and takeaway shops offer authentic cuisine from numerous cultures at affordable prices. Local parks provide playground equipment and green space for families, while sporting clubs bring together families from various backgrounds through shared activities.
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
              Hampton Park's education landscape serves its diverse community with a range of options. Schools celebrate cultural diversity while focusing on English language development and academic achievement, often achieving remarkable outcomes despite socioeconomic challenges.
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
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Hampton Park Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• River Gum Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Coral Park Primary School</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• St Kevin's School (Catholic)</li>
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
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Lyndale Secondary College</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Kambrya College</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Islamic schools in nearby suburbs</li>
                  <li style={{ marginBottom: '8px', color: '#666' }}>• Strong ESL support programs</li>
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
                  Hampton Park's housing stock reflects its working-class origins and organic growth. Most homes are single-story brick veneer constructions from the 1970s-1990s, featuring practical layouts with 3-4 bedrooms, separate living areas, and decent-sized backyards. These homes prioritize functionality over style, offering solid construction and liveable spaces.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  Property prices in Hampton Park remain among Melbourne's most affordable for houses on individual blocks. This affordability attracts both owner-occupiers and investors, with typical blocks ranging from 500-700 square meters providing space for families, gardens, and often additional parking.
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
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>$600,000 - $700,000</div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '4px' }}>Property Types</div>
                  <div style={{ fontSize: '16px' }}>85% Houses • 10% Units • 5% Townhouses</div>
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
              Hampton Park's community strength emerges from its diversity, with various cultural groups maintaining distinct identities while contributing to shared suburban life. Religious facilities spanning Islam, Christianity, Hinduism, and Buddhism provide not just spiritual services but crucial community support networks.
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
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>150+ Nationalities</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>One of Melbourne's most diverse suburbs</p>
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
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Community Networks</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Strong support systems across cultures</p>
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
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Family Values</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Strong extended family presence</p>
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
                }}>✊</div>
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Resilient Spirit</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Building futures through community</p>
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
              Current Properties in Hampton Park
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px'
            }}>
              Discover affordable homes in this multicultural community
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
                  No properties currently available in Hampton Park
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
              <Link href="/buy?suburb=Hampton+Park" style={{
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
                View all Hampton Park properties
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
                      Embrace diversity - the multicultural character is the suburb's strength
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Research micro-locations - some streets have better reputations than others
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Factor in transport costs - no direct train access means car reliance
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Focus on structural quality over aesthetics in older homes
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
                      Strong rental market with diverse property options
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Join local community groups for faster integration
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Consider proximity to bus routes and shopping centers
                    </li>
                    <li style={{ marginBottom: '12px', paddingLeft: '24px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>✓</span>
                      Many landlords from same cultural backgrounds offer understanding
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
              Who will love Hampton Park?
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
                    <strong>New migrants</strong> - Affordable housing and established cultural communities
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>First-home buyers</strong> - Some of Melbourne's most affordable house-and-land options
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Working families</strong> - Practical housing and community support networks
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Cultural food lovers</strong> - Authentic, affordable cuisine from numerous cultures
                  </li>
                  <li style={{ marginBottom: '16px', fontSize: '16px', opacity: 0.9 }}>
                    <strong>Value seekers</strong> - Maximum housing for minimum cost
                  </li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  The Hampton Park advantage:
                </h3>
                <p style={{ fontSize: '16px', lineHeight: '1.8', opacity: 0.9 }}>
                  Hampton Park serves a crucial role in Melbourne's housing ecosystem – providing genuinely affordable family housing where new Australians can establish themselves and working families can achieve homeownership. While it lacks the amenities and prestige of wealthier suburbs, it offers something equally valuable: opportunity.
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
              Ready to make Hampton Park home?
            </h2>
            <p style={{
              fontSize: '20px',
              marginBottom: '40px',
              color: '#666',
              lineHeight: '1.6'
            }}>
              Our local experts understand the community and can help you find the perfect affordable home for your family.
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