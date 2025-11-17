'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';

export default function HarkawaySuburbPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { properties, loading } = useProperties();

  const suburbProperties = properties.filter(p =>
    p.address?.toLowerCase().includes('harkaway')
  ).slice(0, 3);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / scrollHeight) * 100;
      setScrollProgress(progress);

      const sections = ['overview', 'location', 'lifestyle', 'education', 'transport', 'housing', 'investment'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: '🏘️' },
    { id: 'location', label: 'Location', icon: '📍' },
    { id: 'lifestyle', label: 'Lifestyle', icon: '🎭' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'transport', label: 'Transport', icon: '🚉' },
    { id: 'housing', label: 'Housing', icon: '🏡' },
    { id: 'investment', label: 'Investment', icon: '📈' },
  ];

  const stats = [
    { label: 'Median House Price', value: '$850,000' },
    { label: 'Distance to CBD', value: '50km' },
    { label: 'Population', value: '4,200+' },
    { label: 'Train Line', value: 'Pakenham Line' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <OncomHeader />

      {/* Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        backgroundColor: '#f0f0f0',
        zIndex: 999
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          backgroundColor: '#002b7f',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: isMobile ? '160px' : '190px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5
        }} />
        <div style={{
          position: 'relative',
          textAlign: 'center',
          color: '#fff',
          padding: '0 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '48px' : '80px',
            fontWeight: '700',
            marginBottom: '24px',
            lineHeight: '1.1'
          }}>
            Harkaway
          </h1>
          <p style={{
            fontSize: isMobile ? '20px' : '28px',
            fontWeight: '300',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.9
          }}>
            Picturesque Semi-Rural Living with Country Charm
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{
        backgroundColor: '#002b7f',
        color: '#fff',
        padding: '40px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: '32px',
          textAlign: 'center'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '8px'
              }}>{stat.value}</div>
              <div style={{
                fontSize: '14px',
                opacity: 0.8,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main style={{
        display: 'flex',
        gap: '48px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        {/* Navigation Sidebar */}
        {!isMobile && (
          <aside style={{
            position: 'sticky',
            top: '240px',
            height: 'fit-content',
            width: '250px',
            flexShrink: 0
          }}>
            <nav>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: activeSection === item.id ? '#f8f8f8' : 'transparent',
                    border: 'none',
                    borderLeft: activeSection === item.id ? '3px solid #002b7f' : '3px solid transparent',
                    fontSize: '16px',
                    fontWeight: activeSection === item.id ? '600' : '400',
                    color: activeSection === item.id ? '#002b7f' : '#666',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = '#fafafa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Content */}
        <div style={{ flex: 1 }}>
          {/* Overview Section */}
          <section id="overview" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Welcome to Harkaway
            </h2>
            <p style={{
              fontSize: '20px',
              lineHeight: '1.8',
              color: '#333',
              marginBottom: '24px'
            }}>
              Harkaway stands as one of Melbourne's most picturesque and semi-rural southeastern suburbs, perfectly
              balancing country charm with suburban convenience. Located approximately 50 kilometres from Melbourne's
              CBD within the City of Casey, Harkaway has maintained its distinctive identity as a leafy, rural-urban
              fringe community while adapting to contemporary lifestyle needs.
            </p>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666'
            }}>
              The suburb is renowned for its scenic views, larger properties, established gardens, and strong sense
              of community that attracts families, professionals, and retirees seeking a quieter pace without
              sacrificing accessibility. What makes Harkaway particularly appealing is its successful preservation
              of rural atmosphere within a metropolitan context.
            </p>
          </section>

          {/* Location Section */}
          <section id="location" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Strategic Location
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Harkaway occupies a strategic position in Melbourne's southeast growth corridor, bordered by Berwick
              to the west, Narre Warren to the north, and the Cardinia Shire to the east. This location provides
              residents with excellent connectivity to both Melbourne's CBD and the expanding outer southeastern
              suburbs, while maintaining separation from higher-density development.
            </p>
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#002b7f'
              }}>
                Neighboring Suburbs
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                {['Berwick', 'Narre Warren', 'Doveton', 'Hallam'].map(suburb => (
                  <div key={suburb} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    color: '#666'
                  }}>
                    <span style={{ color: '#002b7f' }}>→</span>
                    {suburb}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Lifestyle Section */}
          <section id="lifestyle" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Lifestyle & Community
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Harkaway's lifestyle appeal centres on its rural atmosphere, established parks, and strong community
              connections. The suburb features several well-maintained parks and reserves that provide venues for
              family activities, organized sport, and community events throughout the year.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#002b7f'
                }}>
                  Scenic Rural Views
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  The rural setting provides opportunities for residents to engage in outdoor activities
                  and enjoy the natural environment, with scenic views and established gardens creating
                  a tranquil atmosphere.
                </p>
              </div>
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#002b7f'
                }}>
                  Spacious Properties
                </h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#666'
                }}>
                  The suburb features spacious properties with mature gardens, rural views, and established
                  streetscapes that provide plenty of room for families to grow and enjoy outdoor living.
                </p>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Education Excellence
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Education facilities in Harkaway are comprehensive and well-regarded, contributing significantly to
              the suburb's appeal among families. Local primary schools serve the community with quality programs
              in modern facilities with strong community connections and parental involvement.
            </p>
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px'
              }}>
                Educational Opportunities
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  'Quality local primary schools with modern facilities',
                  'Access to schools in nearby Berwick and Narre Warren',
                  'School bus services and public transport support',
                  'Strong community support for education',
                  'Active parent involvement in school communities',
                  'Family-oriented educational environment'
                ].map((item, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px',
                    fontSize: '16px'
                  }}>
                    <span style={{ color: '#4ade80' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Transport Section */}
          <section id="transport" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Transport & Connectivity
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Harkaway benefits from excellent transport connectivity anchored by the Pakenham railway line, which
              provides regular services to Melbourne's CBD and major employment centres. The train service has been
              enhanced through recent infrastructure improvements, improving reliability and reducing travel times.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>🚉</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000'
                }}>Train Service</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Pakenham Line to Melbourne CBD
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>🚗</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000'
                }}>Road Access</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Princes Highway & Monash Freeway
                </p>
              </div>
              <div style={{
                textAlign: 'center',
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>🚌</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#000'
                }}>Bus Network</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>
                  Local services to station and centres
                </p>
              </div>
            </div>
          </section>

          {/* Housing Section */}
          <section id="housing" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Housing & Property
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Harkaway's housing market is characterized by established homes on generous blocks, heritage properties,
              and quality residential developments that respect the suburb's rural character. The housing stock
              primarily consists of homes built from the 1960s onwards, many featuring large gardens, established
              trees, and spacious layouts that appeal to families.
            </p>

            {/* Property Listings */}
            {suburbProperties.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#002b7f'
                }}>
                  Current Properties in Harkaway
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: '24px'
                }}>
                  {suburbProperties.map((property, idx) => (
                    <Link
                      key={idx}
                      href={`/property/${property.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        backgroundColor: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        backgroundImage: property.images?.[0] ? `url(${property.images[0]})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }} />
                      <div style={{ padding: '20px' }}>
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '8px'
                        }}>
                          {property.address}
                        </p>
                        <p style={{
                          fontSize: '20px',
                          fontWeight: '600',
                          color: '#000'
                        }}>
                          {property.price || 'Contact Agent'}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Investment Section */}
          <section id="investment" style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              Investment Potential
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '32px'
            }}>
              Harkaway's future development is carefully managed to preserve rural character while accommodating
              appropriate growth and infrastructure enhancement. Heritage overlays and community planning processes
              ensure that development respects established character while providing necessary services and amenities.
            </p>
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              padding: '32px'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#002b7f'
              }}>
                Growth Factors
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px'
              }}>
                {[
                  'Semi-rural character with scenic views',
                  'Excellent Pakenham line railway connectivity',
                  'Strong demand for larger family properties',
                  'Heritage overlays protecting character',
                  'Growing appeal for rural lifestyle seekers',
                  'Proximity to established amenities'
                ].map((factor, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                    color: '#666'
                  }}>
                    <span style={{ color: '#002b7f', fontSize: '20px' }}>📈</span>
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            backgroundColor: '#002b7f',
            color: '#fff',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              marginBottom: '16px'
            }}>
              Discover Your Future in Harkaway
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '32px',
              opacity: 0.9
            }}>
              Let our local experts help you find the perfect property in this picturesque rural community.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/search?suburb=harkaway"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                View Properties
              </Link>
              <Link
                href="/appraisal"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '2px solid #fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#002b7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Get Free Appraisal
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}