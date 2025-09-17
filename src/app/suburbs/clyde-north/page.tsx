'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function ClydeNorthSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Clyde North', limit: 6 });
  
  const suburbData = suburbProfiles['clyde-north'];

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
            backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop")',
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
            }}>How to live in<br />Clyde North</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              maxWidth: '800px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              {suburbData?.description || 'Discover modern family living in one of Melbourne\'s fastest-growing and most vibrant communities'}
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
          top: isMobile ? '60px' : '64px',
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
                  Welcome to Clyde North
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  Clyde North stands as one of Melbourne's most rapidly emerging and family-oriented southeastern suburbs, perfectly balancing contemporary suburban development with established community planning. Located approximately 50 kilometres from Melbourne's CBD within the City of Casey, Clyde North has emerged as a vibrant new community that attracts young families, first-home buyers, and professionals seeking modern living within a well-planned suburban setting.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  What makes Clyde North particularly appealing is its successful integration of modern residential development with comprehensive planning and community infrastructure. The suburb features contemporary housing estates with modern design principles, while providing excellent connectivity to Melbourne via the Pakenham railway line.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  The area offers a perfect balance of affordability, modern amenities, and family-oriented lifestyle that appeals to those seeking contemporary suburban living in a well-planned environment.
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
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt="Clyde North residential area"
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
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>By Car</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Located 50km south-east of Melbourne CBD, Clyde North is accessible via the Princes Highway and connections to the Monash Freeway. Journey time is approximately 60-70 minutes in normal traffic. The suburb is strategically positioned within the southeastern growth corridor.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Public Transport</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Clyde North benefits from excellent transport connectivity anchored by the Pakenham railway line, which provides regular services to Melbourne's CBD and major employment centres. The train service offers reliable connectivity with regular service frequency.
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
                  The suburb's modern road network supports local travel while connecting to major arterials. Local bus services connect residential areas to railway stations and shopping centres. The relatively flat terrain makes cycling and walking viable for local trips.
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
              Living the Clyde North Life
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
              gap: isMobile ? '32px' : '60px', 
              marginBottom: isMobile ? '40px' : '60px' 
            }}>
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Modern Community</h3>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Clyde North's retail and dining scene reflects its modern development, with contemporary shopping centres providing comprehensive retail and service options. The suburb features major shopping destinations that cater to all daily needs while offering dining and entertainment experiences.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Local parks and reserves serve as community hubs, featuring playgrounds, sporting facilities, and spaces for various recreational activities. These facilities provide opportunities for residents to engage in organized sport and social activities.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', color: '#333' }}>
                  Community events and festivals regularly take place in local parks and community facilities, celebrating the suburb's diversity and fostering connections among residents.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f0f0f0',
                padding: '32px',
                borderRadius: '16px'
              }}>
                <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '20px', fontWeight: '400', marginBottom: '20px' }}>Local Highlights</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>
                    Shopping on Clyde
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Local Cafes
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Sports Facilities
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Modern Parks
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1567449303183-ae0d6ed1498e?w=1200&h=600&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              borderRadius: '16px',
              marginBottom: '60px'
            }} />
            
            <div>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Recreation & Community</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Clyde North's lifestyle appeal centres on its modern amenities, contemporary parks, and strong community connections. The suburb features several well-designed parks and reserves that provide venues for family activities and community events throughout the year.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '32px' : '24px',
                marginTop: '40px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#e8f4f8',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '32px'
                  }}>
                                      </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Modern Parks</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Contemporary green spaces</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#fef3e8',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '32px'
                  }}>
                    Sports
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Sports Facilities</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Modern sporting venues</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#f0e8fe',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '32px'
                  }}>
                    Family
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Family Areas</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Playgrounds & BBQ areas</p>
                </div>
              </div>
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
              Quality schools serving a growing community
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
                  <li> Clyde Primary School</li>
                  <li> Clyde North Primary School</li>
                  <li> Casey Grammar School</li>
                  <li> Hillcrest Christian College</li>
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
                  <li> Casey Grammar School</li>
                  <li> Hillcrest Christian College</li>
                  <li> Nearby Secondary Options</li>
                  <li> Specialist Programs Available</li>
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
              <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Educational Environment</h4>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Education facilities in Clyde North are comprehensive and modern, contributing significantly to the suburb's appeal among families. The suburb is home to several primary and secondary schools that offer quality programs in modern facilities with strong community connections.
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
              gridTemplateColumns: 'repeat(4, 1fr)',
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
                  $800K
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
                  +12.5%
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
                  21
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
                  4.2%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Rental Yield</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Housing Styles</h3>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Clyde North's housing market is characterized by contemporary housing estates, modern townhouse complexes, and new residential developments that cater to diverse housing needs. The housing stock primarily consists of homes built from the 2010s onwards, with significant development continuing to create a modern suburban landscape.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                The suburb includes a mix of contemporary houses, modern townhouse developments, and apartment complexes designed to meet current lifestyle needs. Many properties feature modern amenities, contemporary design elements, and integration with the suburb's growing infrastructure and services.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '16px' : '24px'
              }}>
                <div style={{
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
                    alt="Modern family home"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=400&h=300&fit=crop"
                    alt="Contemporary townhouses"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  aspectRatio: '4/3',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop"
                    alt="New estate development"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
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
                Clyde North maintains a strong community spirit that reflects its planned development and diverse residential base. Active community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection, civic engagement, and mutual support among residents.
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              padding: isMobile ? '32px 20px' : '48px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '32px', fontWeight: '400', marginBottom: '24px' }}>Who Will Love Clyde North?</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Young families</strong> seeking modern amenities</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>First-home buyers</strong> entering the market</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Growing families</strong> needing space and facilities</p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Train commuters</strong> wanting modern lifestyle</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Investors</strong> focused on growth areas</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Community seekers</strong> wanting connections</p>
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
              Properties in Clyde North
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Discover your perfect home in this thriving modern suburb. Property values in Clyde North reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a family-oriented community.
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
                  No properties currently available in Clyde North
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
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>New Development</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Check builder reputation and warranties when buying new construction. Research estate facilities and future development plans.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Transport Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Consider proximity to train stations and bus routes. Test your commute during peak hours before committing.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}> School Zones</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Verify school catchment areas if education is a priority. Check enrolment availability at preferred schools.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Estate Features</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Review body corporate fees and estate rules. Consider future infrastructure and amenity development.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Growth Potential</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Research planned infrastructure and commercial developments. Consider long-term growth prospects.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Sustainability</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Look for energy-efficient features in new homes. Consider solar panels and water-saving systems.
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
            Ready to call Clyde North home?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Our local experts are here to help you find your perfect property in this growing community
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link
              href="/buy?suburb=clyde%20north"
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