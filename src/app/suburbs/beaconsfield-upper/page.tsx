'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function BeaconsfieldUpperSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Beaconsfield Upper', limit: 6 });

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

      <main style={{ paddingTop: isMobile ? '90px' : '200px', backgroundColor: '#fff' }}>
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
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/beaconsfield-upper-hero.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.7)'
          }} />

          <div style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingBottom: '80px',
            zIndex: 2
          }}>
            <div style={{ maxWidth: '800px' }}>
              <h1 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '3rem' : '4rem',
                fontWeight: '400',
                color: '#fff',
                lineHeight: '1.1',
                marginBottom: '24px'
              }}>
                Beaconsfield Upper
              </h1>
              <p style={{
                fontSize: isMobile ? '1.125rem' : '1.25rem',
                color: '#fff',
                lineHeight: '1.4',
                opacity: 0.9,
                marginBottom: '40px'
              }}>
                Picturesque semi-rural charm with suburban convenience in Melbourne's scenic southeast
              </p>
            </div>
          </div>
        </section>

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
              top: '200px',
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
                Welcome to Beaconsfield Upper
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Beaconsfield Upper stands as one of Melbourne's most picturesque and semi-rural southeastern suburbs, perfectly balancing country charm with suburban convenience. Located approximately 50 kilometres from Melbourne's CBD within the Shire of Cardinia, Beaconsfield Upper has maintained its distinctive identity as a leafy, hillside community while adapting to contemporary lifestyle needs.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb is renowned for its elevated position, scenic views, larger properties, and strong sense of community that attracts families, professionals, and retirees seeking a tranquil lifestyle without sacrificing accessibility. What makes Beaconsfield Upper particularly appealing is its successful preservation of rural atmosphere within a metropolitan context.
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
                Beaconsfield Upper occupies a strategic position in Melbourne's southeast growth corridor, bordered by Beaconsfield to the south, Officer to the north, and the Cardinia Shire to the east. This location provides residents with excellent connectivity to both Melbourne's CBD and the expanding outer southeastern suburbs.
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
                Beaconsfield Upper's lifestyle appeal centers on its semi-rural character, scenic beauty, and strong community atmosphere. The suburb features spacious properties with mature gardens, rural views, and established streetscapes that create a tranquil environment for families and professionals.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Local amenities include a charming town centre with cafes, specialty shops, and services that maintain the suburb's village atmosphere. The area's natural setting and mature trees provide opportunities for outdoor activities, while proximity to larger centres ensures access to comprehensive retail and dining options.
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
                Education facilities in Beaconsfield Upper are comprehensive and well-regarded, contributing significantly to the suburb's appeal among families. Local primary schools serve the community with quality programs in modern facilities with strong community connections and parental involvement.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb provides access to schools in nearby areas such as Beaconsfield and Officer, with school bus services and public transport supporting various choices. The community's emphasis on education and family values creates an environment that supports student achievement.
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
                Beaconsfield Upper's housing market is characterized by established homes on generous blocks, heritage properties, and quality residential developments that respect the suburb's rural character. The housing stock primarily consists of homes built from the 1960s onwards, many featuring large gardens and established trees.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Property values reflect the suburb's established reputation, rural character, and quality amenities. The market tends to attract buyers seeking long-term residence rather than short-term investment, creating a stable residential community with relatively low turnover.
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
                Beaconsfield Upper maintains a strong community spirit that reflects its semi-rural character and established residential base. Community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection and civic engagement among residents.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb's heritage character and community-led conservation efforts ensure that Beaconsfield Upper's rural identity remains intact despite suburban growth pressures. Regular community events and activities bring residents together while celebrating the area's unique character.
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
                Current Listings in Beaconsfield Upper
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
                  <p>No properties currently available in Beaconsfield Upper. Check back soon for new listings.</p>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link
                  href="/search?suburb=Beaconsfield Upper"
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
                  View All Beaconsfield Upper Properties
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
                When considering Beaconsfield Upper, keep these factors in mind:
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
                    <strong>Rural character:</strong> Properties often feature larger blocks and mature gardens - consider maintenance requirements and lifestyle preferences.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Heritage appeal:</strong> Many homes have character features - understand heritage overlays and renovation restrictions.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Community involvement:</strong> Strong local community - participation in local activities enhances the living experience.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Transport planning:</strong> Train access via nearby stations - consider commuting logistics for work and activities.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Property investment:</strong> Stable market with established appeal - suitable for long-term residence rather than quick gains.
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
                    <strong>Families seeking space:</strong> Generous blocks, quality schools, and safe community environment.
                  </div>
                  <div>
                    <strong>Rural lifestyle lovers:</strong> Semi-rural atmosphere with suburban conveniences and community spirit.
                  </div>
                  <div>
                    <strong>Commuters:</strong> Train connectivity to Melbourne while enjoying tranquil hillside living.
                  </div>
                  <div>
                    <strong>Heritage enthusiasts:</strong> Character properties and established streetscapes with historical appeal.
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