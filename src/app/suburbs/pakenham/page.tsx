'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function PakenhamSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Pakenham', limit: 6 });

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
          backgroundImage: 'url("/pakenham_hero.jpg")',
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
              Pakenham
            </h1>
            <p style={{
              fontSize: isMobile ? '1rem' : '1.25rem',
              color: 'rgba(255,255,255,0.9)',
              margin: '1rem 0 0 0',
              fontWeight: '300',
              maxWidth: '600px'
            }}>
              Melbourne's rapidly growing southeastern hub with modern amenities and excellent connectivity
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
                Welcome to Pakenham
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham stands as one of Melbourne's most rapidly growing and strategically important southeastern suburbs, perfectly balancing urban development with community character. Located approximately 53 kilometres from Melbourne's CBD within the Shire of Cardinia, Pakenham has evolved from its rural township origins into a major regional hub that attracts families, professionals, and businesses seeking modern amenities within a well-connected suburban setting.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb is renowned for its major shopping centres, diverse housing options, quality schools, and strong focus on infrastructure development and community services. What makes Pakenham particularly appealing is its successful integration of major metropolitan amenities with suburban convenience and community spirit.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb features comprehensive shopping facilities, contemporary housing developments, and excellent recreational options, while providing excellent connectivity to Melbourne via the Pakenham railway line. The area offers a perfect balance of affordability, modern amenities, and family-oriented lifestyle that appeals to those seeking contemporary suburban living with access to major facilities.
              </p>
            </section>

            {/* Location & Transport */}
            <section id="section-1" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Where is Pakenham?
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham occupies a strategic position in Melbourne's southeast growth corridor, bordered by Officer to the west, Koo Wee Rup to the east, and the Cardinia Shire to the north. This location provides residents with excellent connectivity to both Melbourne's CBD and the expanding outer southeastern suburbs, while serving as a key residential and commercial area within the broader Cardinia region.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb sits along the Princes Highway corridor and benefits from established transport infrastructure including the Pakenham railway station on the Pakenham line. The positioning between established suburban areas and rural areas creates a dynamic setting that supports both residential development and community infrastructure.
              </p>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#000',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}>
                Getting around: transport and connectivity
              </h3>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham benefits from excellent transport connectivity anchored by the Pakenham railway station, which provides regular services on the Pakenham line to Melbourne's CBD and major employment centres. The train service offers reliable connectivity with modern facilities and regular service frequency.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Road access includes the Princes Highway and connections to the Monash Freeway, providing efficient routes to Melbourne and other destinations. The suburb's modern road network supports local travel while connecting to major arterials for broader access.
              </p>
            </section>

            {/* Lifestyle & Amenities */}
            <section id="section-2" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Lifestyle, parks, and recreation
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham's lifestyle appeal centres on its modern amenities, recreational facilities, and family-oriented community activities. The suburb provides numerous parks and reserves that serve as community hubs, featuring playgrounds, sporting facilities, and spaces for various recreational activities.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The natural setting provides opportunities for residents to engage in outdoor activities and enjoy the environment, while major sporting facilities provide opportunities for residents to engage in organized sport and social activities.
              </p>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#000',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}>
                Shopping, dining, and entertainment
              </h3>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham's retail and dining scene is anchored by major shopping centres and local businesses that serve the growing community. The shopping precincts feature contemporary retail spaces, major department stores, specialty shops, and a diverse range of dining options that cater to various tastes and budgets.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Local dining options include a variety of restaurants, cafes, and takeaway outlets that reflect the suburb's cultural diversity. The proximity to major shopping centres in neighbouring areas, combined with excellent transport links, ensures residents can access diverse recreational and cultural activities.
              </p>
            </section>

            {/* Education */}
            <section id="section-3" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Education and schools
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Education facilities in Pakenham are comprehensive and well-regarded, contributing significantly to the suburb's appeal among families. The suburb provides access to several primary and secondary schools, with modern facilities and strong community connections.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Tertiary education options include TAFE facilities providing vocational and further education opportunities for local residents. The excellent transport links make various educational institutions accessible, expanding educational opportunities for local families.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The community's emphasis on education and modern infrastructure creates an environment that supports student achievement, with many local families actively involved in school communities and educational support activities.
              </p>
            </section>

            {/* Housing & Market */}
            <section id="section-4" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Housing and property
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham's housing market is characterized by contemporary housing developments, modern townhouse complexes, and established homes that cater to diverse housing needs. The housing stock primarily consists of homes built from the 1980s onwards, with significant development continuing to create a modern suburban landscape.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb includes a mix of contemporary houses, modern townhouse developments, and apartment complexes designed to meet current lifestyle needs. Many properties feature modern amenities, contemporary design elements, and integration with the suburb's growing infrastructure and services.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Property values in Pakenham reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a family-oriented community. The market tends to attract buyers seeking contemporary suburban living with access to major facilities and services at competitive prices.
              </p>
            </section>

            {/* Community & Culture */}
            <section id="section-5" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Community and safety
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham maintains a strong community spirit that reflects its diverse population and modern suburban character. Active community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection, civic engagement, and mutual support among residents.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The suburb's modern infrastructure and engaged community contribute to high levels of safety and security, with community policing efforts and natural surveillance through active street life and community involvement.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Community facilities and modern infrastructure serve as focal points for neighbourhood activities, helping newcomers integrate quickly while maintaining connections among established residents. Regular community events, cultural celebrations, and seasonal activities bring residents together while celebrating the suburb's diversity and modern character.
              </p>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#000',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}>
                Who will love Pakenham?
              </h3>
              <ul style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                paddingLeft: '1.5rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Young families:</strong> Modern amenities, quality schools, and contemporary housing make it ideal for families seeking modern suburban living.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>First-home buyers:</strong> Affordable housing options and modern facilities appeal to those entering the property market.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Train commuters:</strong> Excellent railway connectivity supports Melbourne commuting while providing modern suburban lifestyle experience.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Shopping enthusiasts:</strong> Major retail facilities and comprehensive services appeal to residents who value convenience.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Diverse community seekers:</strong> Multicultural population and inclusive community atmosphere attract residents who value diversity.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Convenience seekers:</strong> Major amenities, excellent transport links, and comprehensive services appeal to residents who prioritize accessibility.</li>
              </ul>
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
                Current Listings in Pakenham
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
                          {(property.address || '').replace(/ VIC$/, '')}
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
                  <p>No properties currently available in Pakenham. Check back soon for new listings.</p>
                </div>
              )}

              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <Link
                  href="/search?suburb=Pakenham"
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
                  View All Pakenham Properties
                </Link>
              </div>
            </section>

            {/* Buyer Tips */}
            <section id="section-7" style={{ marginBottom: '4rem' }}>
              <h2 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: isMobile ? '2rem' : '3rem',
                fontWeight: '400',
                marginBottom: '2rem',
                color: '#000'
              }}>
                Tips for buyers and renters
              </h2>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                When considering Pakenham, keep these factors in mind:
              </p>
              <ul style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                paddingLeft: '1.5rem'
              }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>Growth considerations:</strong> The suburb is experiencing significant growth - consider how this affects property values and community character.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Transport planning:</strong> While train access is excellent, consider peak travel times and specific commuting requirements.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Shopping access:</strong> Major shopping facilities are excellent, but consider proximity to specific stores and services you use regularly.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Community integration:</strong> The diverse community and modern amenities benefit from active participation in local activities and organizations.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>Property options:</strong> Mix of established and contemporary properties - consider your preferences for modern vs. established homes.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>School access:</strong> Check catchment areas and transport options if education is a priority for your family.</li>
              </ul>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '500',
                color: '#000',
                marginTop: '2rem',
                marginBottom: '1rem'
              }}>
                The Pakenham advantage
              </h3>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                Pakenham offers a compelling combination of modern suburban amenities, excellent connectivity, and family-oriented community life that's increasingly sought after in Melbourne's suburban landscape. The suburb successfully provides contemporary infrastructure and major facilities while maintaining community character and accessibility.
              </p>
              <p style={{
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#333',
                marginBottom: '1.5rem'
              }}>
                The established infrastructure, major shopping facilities, and excellent transport links create a lifestyle destination that balances contemporary suburban living with metropolitan connectivity, making Pakenham an attractive choice for families and professionals seeking modern amenities within a well-connected community setting.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}