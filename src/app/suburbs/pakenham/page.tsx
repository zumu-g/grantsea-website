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
      
      <main style={{ paddingTop: isMobile ? '160px' : '190px', backgroundColor: '#fff' }}>
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop")',
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
            }}>How to live in<br />Pakenham</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              maxWidth: '800px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              Modern suburban living with major shopping facilities, excellent connectivity, and family-oriented amenities
            </p>
            
            <button
              onClick={() => scrollToSection(0)}
              style={{
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: '#fff',
                color: '#000',
                border: 'none',
                borderRadius: '32px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start exploring
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            animation: 'bounce 2s infinite'
          }}>
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="#fff" strokeWidth="2">
              <rect x="6" y="6" width="12" height="20" rx="6" />
              <circle cx="12" cy="12" r="2" fill="#fff" />
            </svg>
          </div>
        </section>

        {/* Navigation Bar */}
        <nav style={{
          position: 'sticky',
          top: isMobile ? '160px' : '190px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            display: 'flex',
            gap: '32px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: activeSection === index ? '#000' : '#666',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  transition: 'color 0.2s'
                }}
              >
                {section.title}
                {activeSection === index && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: '#000'
                  }} />
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Content Sections */}
        <article style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Introduction */}
          <section id="section-0" style={{
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingTop: isMobile ? '40px' : '80px',
            paddingBottom: isMobile ? '40px' : '80px'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: isMobile ? '32px' : '80px', 
              alignItems: 'center' 
            }}>
              <div>
                <h2 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '400',
                  marginBottom: '32px',
                  lineHeight: '1.2'
                }}>
                  Welcome to Pakenham
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  Pakenham stands as one of Melbourne's most rapidly growing and strategically important southeastern suburbs, perfectly balancing urban development with community character. Located approximately 53 kilometres from Melbourne's CBD within the Shire of Cardinia, Pakenham has evolved from its rural township origins into a major regional hub.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  What makes Pakenham particularly appealing is its successful integration of major metropolitan amenities with suburban convenience and community spirit. The suburb features comprehensive shopping facilities, contemporary housing developments, and excellent recreational options, while providing excellent connectivity to Melbourne via the Pakenham railway line.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  The area offers a perfect balance of affordability, modern amenities, and family-oriented lifestyle that appeals to those seeking contemporary suburban living with access to major facilities and metropolitan connectivity.
                </p>
              </div>
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden',
                order: isMobile ? -1 : 0
              }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
                  alt="Pakenham streetscape"
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
          <section id="section-1" style={{
            backgroundColor: '#f8f8f8',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingTop: isMobile ? '40px' : '80px',
            paddingBottom: isMobile ? '40px' : '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Getting Around
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '24px' : '40px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>By Train</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Pakenham railway station provides excellent connectivity with regular services on the Pakenham line to Melbourne's CBD and major employment centres. Journey time is typically 70-85 minutes depending on service type, with modern facilities and regular frequency.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>By Road</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Located 53km southeast of Melbourne CBD, Pakenham is accessible via the Princes Highway and connections to the Monash Freeway. The suburb's modern road network supports local travel while connecting to major arterials for broader access.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Local Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Local bus services complement train connectivity, linking residential areas to the railway station, shopping areas, and neighbouring suburbs. The flat terrain makes cycling and walking viable for local trips to the station and shops.
                </p>
              </div>
            </div>
          </section>

          {/* Lifestyle & Amenities */}
          <section id="section-2" style={{
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingTop: isMobile ? '40px' : '80px',
            paddingBottom: isMobile ? '40px' : '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '48px'
            }}>
              Living the Pakenham Life
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
              gap: isMobile ? '32px' : '60px', 
              marginBottom: isMobile ? '40px' : '60px' 
            }}>
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Shopping & Dining</h3>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Pakenham's retail and dining scene is anchored by major shopping centres including Pakenham Central Marketplace and Lakeside Square Shopping Centre. These comprehensive retail hubs offer major department stores, specialty shops, and diverse dining options that serve both local residents and visitors from across the region.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  The shopping precincts feature contemporary retail spaces and diverse dining options that reflect the suburb's cultural diversity. Popular venues provide varied culinary experiences and community gathering places.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', color: '#333' }}>
                  The proximity to major shopping centres, combined with excellent transport links, ensures residents can access comprehensive retail and entertainment while enjoying the convenience of modern local amenities.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f0f0f0',
                padding: '32px',
                borderRadius: '16px'
              }}>
                <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '20px', fontWeight: '400', marginBottom: '20px' }}>Major Shopping</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🛍️</span> Pakenham Central Marketplace
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🏢</span> Lakeside Square Shopping Centre
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🍕</span> Diverse dining options
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🎬</span> Entertainment facilities
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              borderRadius: '16px',
              marginBottom: '60px'
            }} />
            
            <div>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Parks & Recreation</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Pakenham's lifestyle appeal centres on its modern amenities, recreational facilities, and family-oriented community activities. The suburb features several well-maintained parks and reserves that provide venues for family activities, organized sport, and community events throughout the year.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Cardinia Life serves as a major community hub, featuring sporting facilities, fitness centres, and spaces for various recreational activities. The modern facilities provide opportunities for residents to engage in organized sport and social activities.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Community events and festivals regularly take place in local parks and community facilities, celebrating the suburb's diversity and fostering connections among residents.
              </p>
            </div>
          </section>

          {/* Education */}
          <section id="section-3" style={{
            backgroundColor: '#002b7f',
            color: '#fff',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingTop: isMobile ? '40px' : '80px',
            paddingBottom: isMobile ? '40px' : '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Education Excellence
            </h2>
            <p style={{
              fontSize: '20px',
              textAlign: 'center',
              marginBottom: '60px',
              opacity: 0.9
            }}>
              Comprehensive education facilities serving the growing community
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '40px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Primary Schools</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li>🏫 Multiple primary schools</li>
                  <li>🏫 Modern facilities</li>
                  <li>🏫 Community connections</li>
                  <li>🏫 Growing options</li>
                </ul>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Secondary Schools</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li>🎓 Pakenham Secondary College</li>
                  <li>🎓 Beaconhills College</li>
                  <li>🎓 Quality programs</li>
                  <li>🎓 Modern facilities</li>
                </ul>
              </div>
            </div>
            
            <div style={{
              marginTop: '60px',
              padding: '40px',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Educational Community</h4>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Education facilities in Pakenham are comprehensive and well-regarded, contributing significantly to the suburb's appeal among families. The family-oriented demographic creates supportive environments for student achievement and development, with many local families actively involved in school communities.
              </p>
            </div>
          </section>

          {/* Housing & Market */}
          <section id="section-4" style={{
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '48px'
            }}>
              Property Market Insights
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '32px',
              marginBottom: '60px'
            }}>
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '36px', fontWeight: '400', color: '#002b7f', marginBottom: '8px' }}>
                  $750K
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Median House Price</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '36px', fontWeight: '400', color: '#28a745', marginBottom: '8px' }}>
                  +18.5%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>12 Month Growth</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '36px', fontWeight: '400', color: '#ff6b35', marginBottom: '8px' }}>
                  32
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Days on Market</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '36px', fontWeight: '400', color: '#6c757d', marginBottom: '8px' }}>
                  4.1%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Rental Yield</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Housing Styles</h3>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Pakenham's housing market is characterized by contemporary housing developments, modern townhouse complexes, and established homes that cater to diverse housing needs. The housing stock primarily consists of homes built from the 1980s onwards, with significant development continuing to create a modern suburban landscape.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                The suburb includes a mix of contemporary houses, modern townhouse developments, and apartment complexes designed to meet current lifestyle needs. Many properties feature modern amenities, contemporary design elements, and integration with the suburb's growing infrastructure.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Property values in Pakenham reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a family-oriented community. The market tends to attract buyers seeking contemporary suburban living with access to major facilities.
              </p>
            </div>
          </section>

          {/* Community */}
          <section id="section-5" style={{
            backgroundColor: '#f8f8f8',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingTop: isMobile ? '40px' : '80px',
            paddingBottom: isMobile ? '40px' : '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Community Spirit
            </h2>
            
            <div style={{
              maxWidth: '800px',
              margin: '0 auto',
              marginBottom: '60px'
            }}>
              <p style={{
                fontSize: isMobile ? '16px' : '20px',
                lineHeight: '1.8',
                textAlign: 'center',
                color: '#333',
                marginBottom: '24px'
              }}>
                Pakenham maintains a strong community spirit that reflects its diverse population and modern suburban character. Active community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection, civic engagement, and mutual support among residents.
              </p>
              <p style={{
                fontSize: isMobile ? '16px' : '20px',
                lineHeight: '1.8',
                textAlign: 'center',
                color: '#333'
              }}>
                The suburb's modern infrastructure and engaged community contribute to high levels of safety and security, with community policing efforts and natural surveillance through active street life and community involvement.
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              padding: isMobile ? '32px 20px' : '48px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '32px', fontWeight: '400', marginBottom: '24px' }}>Who Will Love Pakenham?</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Young families</strong> seeking modern amenities and quality schools</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>First-home buyers</strong> looking for affordable contemporary living</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Train commuters</strong> wanting excellent connectivity to Melbourne</p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Shopping enthusiasts</strong> who value major retail facilities</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Diverse community seekers</strong> who appreciate cultural richness</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Convenience seekers</strong> prioritizing modern facilities and services</p>
                </div>
              </div>
            </div>
          </section>

          {/* Current Properties */}
          <section id="section-6" style={{
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '16px'
            }}>
              Properties in Pakenham
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Discover contemporary homes in this thriving regional hub. Property values reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a family-oriented community.
            </p>
            
            {properties.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: '32px',
                marginBottom: '48px'
              }}>
                {properties.map((property: any) => (
                  <Link
                    key={property.id}
                    href={`/property/${property.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      transition: 'transform 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      height: '100%'
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '16/10'
                      }}>
                        <img
                          src={property.images?.[0]?.url || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop'}
                          alt={property.address}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                      
                      <div style={{ padding: '24px' }}>
                        <h3 style={{
                          fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                          fontSize: '24px',
                          fontWeight: '400',
                          marginBottom: '8px'
                        }}>
                          {formatPrice(property.price)}
                        </h3>
                        <p style={{
                          fontSize: '16px',
                          color: '#000',
                          marginBottom: '8px',
                          fontWeight: '500'
                        }}>
                          {property.address}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '24px',
                          fontSize: '14px',
                          color: '#666',
                          marginTop: '16px'
                        }}>
                          <span>{property.bedrooms} beds</span>
                          <span>{property.bathrooms} baths</span>
                          <span>{property.carSpaces} cars</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '80px 20px',
                textAlign: 'center',
                backgroundColor: '#f8f8f8',
                borderRadius: '16px'
              }}>
                <p style={{ fontSize: '18px', color: '#666' }}>
                  No properties currently available in Pakenham
                </p>
                <Link
                  href="/buy"
                  style={{
                    display: 'inline-block',
                    marginTop: '24px',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  View all properties
                </Link>
              </div>
            )}
          </section>

          {/* Buyer Tips */}
          <section id="section-7" style={{
            backgroundColor: '#f8f8f8',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '400',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Tips for Buyers and Renters
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🏢 Growth Considerations</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  The suburb is experiencing significant growth - consider how this affects property values and community character. Modern infrastructure supports continued development.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🚂 Transport Planning</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  While train access is excellent, consider peak travel times and specific commuting requirements. Test your commute before committing to ensure it meets your needs.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🛍️ Shopping Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Major shopping facilities are outstanding, but consider proximity to specific stores and services you use regularly. The comprehensive retail options serve most needs locally.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🤝 Community Integration</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  The diverse community and modern amenities benefit from active participation in local activities and organizations. Get involved early to make the most of community life.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🏡 Property Options</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Mix of established and contemporary properties available. Consider your preferences for modern vs. established homes and factor in the benefits of new infrastructure.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>🎓 School Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Check catchment areas and transport options if education is a priority. Quality schools are available with good community connections and modern facilities.
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* Call to Action */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '100px',
          paddingBottom: '100px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '400',
            marginBottom: '24px'
          }}>
            Ready to call Pakenham home?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Our local experts know this thriving regional hub and can help you find your perfect modern home in this growing community
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/buy?suburb=pakenham"
              style={{
                padding: '16px 32px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              View properties
            </Link>
            <Link
              href="/agents"
              style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                border: '1px solid #fff',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
              }}
            >
              Contact an agent
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(10px);
          }
        }
        
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}