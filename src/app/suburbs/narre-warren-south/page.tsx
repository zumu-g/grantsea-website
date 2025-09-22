'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function NarreWarrenSouthSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Narre Warren South', limit: 6 });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

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
      
      <main style={{ paddingTop: isMobile ? '90px' : '190px', backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: isMobile ? '60vh' : '80vh',
          backgroundImage: 'url("/narre_warren_south_hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)'
          }} />
          
          <div style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            padding: 'max(2rem, 3.33vw)',
            paddingBottom: isMobile ? '2rem' : '4rem'
          }}>
            <h1 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: isMobile ? '3rem' : '6rem',
              fontWeight: '400',
              lineHeight: 0.9,
              color: '#fff',
              margin: 0,
              letterSpacing: '-0.02em'
            }}>
              Narre Warren South
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              color: 'rgba(255,255,255,0.9)',
              margin: '1rem 0 0 0',
              fontWeight: '300',
              maxWidth: '600px'
            }}>
              A prestigious suburb offering luxury living with beautiful parks and top-tier amenities
            </p>
          </div>
        </section>

        {/* Content */}
        <div style={{ 
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#fff'
        }}>
          {/* Navigation */}
          {!isMobile && (
            <nav style={{
              width: '280px',
              position: 'sticky',
              top: '190px',
              height: 'fit-content',
              padding: 'max(2rem, 3.33vw)',
              borderRight: '1px solid #e8e8e8'
            }}>
              <h3 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: '1.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Guide Contents
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {sections.map((section, index) => (
                  <li key={section.id} style={{ marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => scrollToSection(index)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 0',
                        border: 'none',
                        background: 'none',
                        fontSize: '1rem',
                        color: activeSection === index ? '#000' : '#666',
                        fontWeight: activeSection === index ? '500' : '300',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderBottom: '1px solid #f0f0f0'
                      }}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Main Content */}
          <article style={{ 
            flex: 1,
            padding: 'max(2rem, 3.33vw)',
            maxWidth: isMobile ? '100%' : 'calc(100% - 280px)'
          }}>
            {/* Introduction */}
            <section id="section-0" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Welcome to Narre Warren South
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Narre Warren South stands as one of Melbourne's most rapidly growing and family-oriented southeastern suburbs, perfectly balancing modern suburban development with established community amenities. Located approximately 40 kilometres from Melbourne's CBD within the City of Casey, Narre Warren South has emerged as a vibrant residential community that attracts young families, first-home buyers, and professionals seeking contemporary living within a well-planned suburban setting.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb is renowned for its spacious properties, modern housing estates, quality schools, and strong focus on family-friendly infrastructure and services. What makes Narre Warren South particularly appealing is its successful integration of modern residential development with comprehensive amenities and excellent connectivity to Melbourne via the Pakenham railway line.
              </p>
            </section>

            {/* Location & Transport */}
            <section id="section-1" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Location & Transport
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Narre Warren South occupies a strategic position in Melbourne's southeast growth corridor, bordered by Narre Warren to the north, Cranbourne North to the south, and Clyde to the west. This location provides residents with excellent connectivity to both Melbourne's CBD and the expanding outer southeastern suburbs.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb benefits from excellent transport connectivity anchored by the Pakenham railway line, which provides regular services to Melbourne's CBD and major employment centres. Road access includes the Princes Highway and connections to the Monash Freeway, providing efficient routes to Melbourne and other destinations.
              </p>
            </section>

            {/* Lifestyle & Amenities */}
            <section id="section-2" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Lifestyle & Amenities
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Narre Warren South's lifestyle appeal centres on its modern amenities, family-friendly facilities, and well-planned community infrastructure. The suburb features contemporary shopping centres, recreational facilities, and community spaces that provide venues for family activities and community engagement throughout the year.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Local parks and reserves serve as community hubs, featuring modern playgrounds, sporting facilities, and spaces for various recreational activities. The suburb's retail scene includes local shopping centres and nearby major facilities that provide comprehensive shopping, dining, and entertainment options.
              </p>
            </section>

            {/* Schools & Education */}
            <section id="section-3" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Schools & Education
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Education facilities in Narre Warren South are comprehensive and modern, contributing significantly to the suburb's appeal among families. Narre Warren South P-12 College serves as the main educational facility, offering quality programs in modern facilities with strong community connections.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb provides access to several primary schools and educational options, with school bus services and public transport supporting various choices. The family-oriented demographic creates supportive environments for student achievement and development.
              </p>
            </section>

            {/* Housing & Market */}
            <section id="section-4" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Housing & Market
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Narre Warren South's housing market is characterized by contemporary housing estates, modern townhouse complexes, and new residential developments that cater to diverse housing needs. The housing stock primarily consists of homes built from the 2000s onwards, with significant development continuing to create a modern suburban landscape.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Contemporary developments throughout the suburb provide modern housing options with quality construction, modern amenities, and proximity to major facilities. Property values reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a family-oriented community.
              </p>
            </section>

            {/* Community & Culture */}
            <section id="section-5" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Community & Culture
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Narre Warren South maintains a strong community spirit that reflects its diverse population and modern suburban character. Active community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection and civic engagement among residents.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb's modern infrastructure and engaged community contribute to high levels of safety and security. Community facilities and modern amenities serve as focal points for neighbourhood activities, helping newcomers integrate quickly while maintaining connections among established residents.
              </p>
            </section>

            {/* Properties Section */}
            <section id="section-6" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Current Listings in Narre Warren South
              </h2>
              {properties && properties.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  gap: '2rem',
                  marginBottom: '3rem'
                }}>
                  {properties.slice(0, 6).map((property) => (
                    <Link
                      key={property.id}
                      href={`/property/${property.id}`}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'block',
                        position: 'relative',
                        backgroundColor: '#fff',
                        border: '1px solid #e8e8e8',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={property.images && property.images[0] ? 
                            (typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url) : 
                            '/placeholder-property.jpg'}
                          alt={property.address}
                          style={{
                            width: '100%',
                            height: '240px',
                            objectFit: 'cover',
                            display: 'block'
                          }}
                        />
                        <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                      
                      <div style={{ padding: '1.5rem' }}>
                        <h3 style={{
                          fontSize: '1.125rem',
                          fontWeight: '600',
                          marginBottom: '0.5rem',
                          color: '#000'
                        }}>
                          {property.address}
                        </h3>
                        <p style={{
                          fontSize: '1rem',
                          color: '#666',
                          marginBottom: '1rem'
                        }}>
                          {property.bedrooms} bed • {property.bathrooms} bath • {property.carSpaces} car
                        </p>
                        <p style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: '#000',
                          margin: 0
                        }}>
                          {formatPrice(property.price || property.priceDisplay || 'Price on Application')}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#666'
                }}>
                  <p>No properties currently available in Narre Warren South. Check back soon for new listings.</p>
                </div>
              )}
              
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link
                  href="/search?suburb=Narre Warren South"
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  View All Narre Warren South Properties
                </Link>
              </div>
            </section>

            {/* Buyer Tips */}
            <section id="section-7" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Tips for Buyers and Renters
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                When considering Narre Warren South, keep these factors in mind:
              </p>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#000'
                }}>
                  Key Considerations
                </h3>
                <ul style={{
                  fontSize: '1.125rem',
                  lineHeight: 1.6,
                  color: '#333',
                  paddingLeft: '1.5rem'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Growth opportunities:</strong> The suburb is experiencing continued growth - consider how new developments might enhance property values and community amenities.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Transport access:</strong> Excellent train connectivity to Melbourne CBD - consider your commuting needs and peak travel times.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Modern amenities:</strong> Contemporary infrastructure and facilities - perfect for families seeking modern conveniences.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Education focus:</strong> Strong schools and family-friendly environment make it ideal for growing families.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Housing variety:</strong> Predominantly modern homes and estates - great for buyers seeking contemporary living.
                  </li>
                </ul>
              </div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '2rem',
                borderRadius: '4px',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#000'
                }}>
                  Perfect For
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: '1rem'
                }}>
                  <div>
                    <strong>Young families:</strong> Modern housing estates, excellent schools, and family-friendly infrastructure.
                  </div>
                  <div>
                    <strong>First-home buyers:</strong> Affordable modern properties in a well-planned suburban environment.
                  </div>
                  <div>
                    <strong>Commuters:</strong> Reliable train services and modern amenities for Melbourne workers.
                  </div>
                  <div>
                    <strong>Growth seekers:</strong> Developing area with potential for continued value appreciation.
                  </div>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}