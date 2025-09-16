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
      
      <main style={{ paddingTop: isMobile ? '160px' : '190px', backgroundColor: '#fff' }}>
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
                Narre Warren South is an established and highly sought-after suburb located approximately 42 kilometers south-east of Melbourne's CBD. Known for its family-friendly environment, excellent schools, and beautiful parks, it offers an ideal lifestyle for growing families.
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
          </article>
        </div>
      </main>
    </>
  );
}