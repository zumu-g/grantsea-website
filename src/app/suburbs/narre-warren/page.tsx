'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function NarreWarrenSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Narre Warren', limit: 6 });

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
      
      <main style={{ paddingTop: isMobile ? '180px' : '200px', backgroundColor: '#fff' }}>
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
            }}>Welcome to<br />Narre Warren</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              maxWidth: '800px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              Melbourne's dynamic southeastern hub blending modern convenience with established community spirit
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
                  Welcome to Narre Warren
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  Narre Warren stands as one of Melbourne's most dynamic and rapidly growing southeastern suburbs, perfectly balancing modern suburban convenience with established community character. Located approximately 38 kilometres from Melbourne's CBD within the City of Casey, Narre Warren has evolved into a vibrant hub that attracts families, professionals, and young couples seeking contemporary amenities within a well-connected suburban setting.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  What makes Narre Warren particularly appealing is its successful integration of major metropolitan amenities within a suburban context. The suburb is renowned for its major shopping precinct, excellent transport links, diverse community, and strong focus on modern infrastructure and services.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  Home to Westfield Fountain Gate, one of Australia's largest shopping centres, and the cultural hub of Bunjil Place, Narre Warren offers residents access to comprehensive retail, entertainment, and cultural facilities that serve the entire southeastern region.
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
                  src="https://images.unsplash.com/photo-1609825488888-3a766db05542?w=800&h=600&fit=crop"
                  alt="Narre Warren streetscape"
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
                  Located 38km south-east of Melbourne CBD, Narre Warren is accessible via the Princes Highway and connections to the Monash Freeway. Journey time is approximately 45-60 minutes in normal traffic. The suburb serves as a major hub for the southeastern growth corridor.
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
                  Narre Warren railway station provides regular services on the Pakenham line to Melbourne's CBD and major employment centres. Recent infrastructure improvements have enhanced reliability and reduced travel times, with services typically taking 50-65 minutes to the CBD.
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
                  Local bus services complement train connectivity, linking residential areas to the railway station, shopping areas, and neighbouring suburbs. The established road network supports local travel while connecting to major arterials throughout the Casey region.
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
              Living the Narre Warren Life
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
              gap: isMobile ? '32px' : '60px', 
              marginBottom: isMobile ? '40px' : '60px' 
            }}>
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Shopping & Entertainment</h3>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Narre Warren offers comprehensive shopping and entertainment facilities that serve the entire southeastern growth corridor. Westfield Fountain Gate stands as one of Australia's largest shopping centres, featuring over 400 stores, cinema complex, and numerous dining options that create a destination for the entire region.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Bunjil Place serves as the cultural focal point, featuring a theatre, library, and community plaza that hosts performances, exhibitions, and community events. The Casey ARC provides state-of-the-art aquatic and recreation facilities with indoor and outdoor pools, gym, and various fitness classes.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', color: '#333' }}>
                  The suburb's dining scene reflects its diverse community with restaurants representing various cuisines, from contemporary Australian to authentic international options, creating a vibrant food culture that celebrates the area's multicultural character.
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
                    Westfield Fountain Gate
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Bunjil Place Arts Centre
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Casey ARC
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Diverse Dining Scene
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '400px',
              borderRadius: '16px',
              marginBottom: '60px'
            }} />
            
            <div>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Parks & Recreation</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Narre Warren's lifestyle appeal centres on its major recreational facilities, established parks, and modern community infrastructure. The suburb features well-maintained parks and reserves that provide venues for family activities, organized sport, and community events throughout the year.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Fountain Gate Recreational Reserve serves as a major community hub, featuring sporting facilities, clubrooms, and spaces for various recreational activities. The reserve hosts local football, cricket, and tennis clubs, providing opportunities for residents to engage in organized sport and social activities.
              </p>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Community events and festivals regularly take place in local parks and community facilities, celebrating the suburb's diversity and fostering connections among residents. The active community groups and modern infrastructure provide numerous opportunities for civic engagement and social participation.
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
                    Swimming
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Aquatic Centre</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Indoor & outdoor pools</p>
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
                    Running
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Sports Facilities</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Tennis, cricket, football & more</p>
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
                    Arts
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Arts & Culture</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Theatre, library & events</p>
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
              Comprehensive education facilities for growing families
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
                  <li>Narre Warren Primary School</li>
                  <li>Maramba Primary School</li>
                  <li>St. Kevin's Primary School</li>
                  <li>Fountain Gate Primary</li>
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
                  <li>Fountain Gate Secondary College</li>
                  <li>Maranatha Christian School</li>
                  <li>Casey Grammar School</li>
                  <li>St. Francis Xavier College</li>
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
              <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Educational Hub</h4>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Education facilities in Narre Warren are comprehensive and modern, contributing significantly to the suburb's appeal among families. The diverse community and family-oriented demographic create supportive environments for student achievement and development, with access to both public and private education options.
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
                  +12.8%
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
                  25
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
                  3.8%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Rental Yield</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Housing Styles</h3>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Narre Warren's housing market is characterized by a mix of established homes, contemporary developments, and modern townhouse complexes that cater to diverse housing needs. The housing stock primarily consists of homes built from the 1970s onwards, with significant development in recent decades creating a modern suburban landscape.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                The suburb includes established family homes on generous blocks, modern estates with contemporary design features, and townhouse developments that provide affordable entry points into the area. Many properties benefit from proximity to major amenities while maintaining suburban privacy and space.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Property values reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a regional hub. The market tends to attract buyers seeking contemporary suburban living with access to major facilities and services, creating steady demand across various property types.
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
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
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
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop"
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
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
                    alt="Established homes"
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
                Narre Warren maintains a strong community spirit that reflects its diverse population and modern suburban character. Active community groups, sporting clubs, and volunteer organizations provide extensive opportunities for social connection, civic engagement, and mutual support among residents.
              </p>
              <p style={{
                fontSize: isMobile ? '16px' : '20px',
                lineHeight: '1.8',
                textAlign: 'center',
                color: '#333'
              }}>
                The suburb's established character and modern infrastructure contribute to high levels of safety and security, with neighbourhood watch programs, community policing efforts, and natural surveillance through active street life and community involvement.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '24px' : '40px',
              marginBottom: isMobile ? '40px' : '60px'
            }}>
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '20px' }}>Annual Events</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Casey Festival</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>March - Arts, food and entertainment at Bunjil Place</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Fun Run Series</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Monthly - Community fitness events</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Christmas Carols</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>December - Community celebration in local parks</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '20px' }}>Community Groups</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Sports Clubs</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Football, netball, cricket, tennis, and swimming</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Family Groups</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Playgroups, mothers groups, and family services</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Cultural Groups</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Multicultural associations and language groups</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              padding: isMobile ? '32px 20px' : '48px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '32px', fontWeight: '400', marginBottom: '24px' }}>Who Will Love Narre Warren?</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Modern families</strong> seeking contemporary amenities</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Train commuters</strong> with excellent railway connectivity</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Shopping enthusiasts</strong> with Fountain Gate nearby</p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Young professionals</strong> wanting growth corridor opportunities</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Multicultural families</strong> appreciating diverse community</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Active lifestyles</strong> with extensive recreational facilities</p>
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
              Properties in Narre Warren
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Discover your perfect home in this dynamic southeastern hub. Property values in Narre Warren reflect the suburb's modern amenities, excellent connectivity, and growing reputation as a regional centre.
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
                  No properties currently available in Narre Warren
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
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Shopping Proximity</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Consider proximity to Fountain Gate for convenience versus traffic. Peak shopping times can create congestion, so test travel routes at various times.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Transport Planning</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Excellent train connectivity for CBD commuters, but consider peak travel times and parking availability at the station. Test your commute before committing.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>School Zones</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Research school catchment areas if education is a priority. Both public and private options are available, with some excellent schools requiring specific zoning.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Community Integration</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  The diverse multicultural community offers many opportunities for social connection. Join local groups and cultural organizations to integrate quickly.
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
                  Consider the ongoing development in the Casey corridor. Significant infrastructure investment continues, offering strong growth potential for property values.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Property Types</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Mix of established homes and modern developments provides diverse options. Consider your preference for character versus contemporary features and maintenance requirements.
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
            Ready to call Narre Warren home?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Our local experts know this thriving community inside out and can help you find your perfect property
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link
              href="/buy?suburb=narre-warren"
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