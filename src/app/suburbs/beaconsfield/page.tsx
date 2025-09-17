'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function BeaconsfieldSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Beaconsfield', limit: 6 });
  
  const suburbData = suburbProfiles.beaconsfield;

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
            backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop")',
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
            }}>Welcome to<br />Beaconsfield</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              maxWidth: '800px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              {suburbData.description}
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
                  Welcome to Beaconsfield
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  Beaconsfield perfectly embodies the transition between Melbourne's established middle suburbs and the expanding southeast, offering an appealing blend of semi-rural charm and suburban convenience. Located approximately 44 kilometres southeast of Melbourne's CBD, this historic township has gracefully evolved from its 19th-century origins into a sought-after residential area.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  What distinguishes Beaconsfield is its successful preservation of township character amid suburban growth. The historic village center along Woods Street maintains its country town feel with heritage buildings and local businesses, while surrounding residential areas offer everything from contemporary estates to acreage properties.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  The suburb benefits from excellent transport infrastructure, anchored by its railway station on the Pakenham line, while maintaining the tranquil atmosphere and community spirit that define its enduring appeal.
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
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                  alt="Beaconsfield High Street"
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
                  Located 44km southeast of Melbourne CBD, Beaconsfield is accessible via the Princes Highway. Journey time is approximately 50-60 minutes in normal traffic. The suburb is strategically positioned between Berwick to the north and Pakenham to the southeast.
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
                  Beaconsfield railway station provides regular services on the Pakenham line to Melbourne's CBD. Recent infrastructure improvements have enhanced reliability and reduced travel times, with services typically taking 50-60 minutes to the CBD.
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
                  Local bus services complement train connectivity, linking residential areas to the railway station and neighbouring suburbs. The established road network supports local travel while connecting to major arterials.
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
              Living the Beaconsfield Life
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
              gap: isMobile ? '32px' : '60px', 
              marginBottom: isMobile ? '40px' : '60px' 
            }}>
              <div>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Historic Village</h3>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Beaconsfield's historic village center along Woods Street maintains its country town feel with heritage buildings, local businesses, and community gathering places. The preserved township character creates an attractive environment for shopping, dining, and social activities.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  Akoonah Park serves as a major regional attraction, featuring native gardens, monthly craft markets, and event spaces that create community connections. The park hosts regular events that celebrate the area's heritage and foster neighbourhood relationships.
                </p>
                <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', color: '#333' }}>
                  The proximity to Cardinia Reservoir offers additional recreational options just minutes away, providing walking trails, sailing, fishing, and picnic areas in natural bushland settings.
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
                    Akoonah Park Markets
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Cardinia Reservoir
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Historic Village Center
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    Recreation Reserve
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
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Recreation & Community</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Beaconsfield's lifestyle appeal centers on its blend of suburban amenities and semi-rural character. Local sporting clubs thrive with strong community support, particularly junior sports benefiting from the family demographic.
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
                    Parks
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Parks & Gardens</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Abundant green spaces</p>
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
                    Heritage
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Heritage</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Historic township character</p>
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
                    🤝
                  </div>
                  <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '18px', fontWeight: '400', marginBottom: '8px' }}>Community</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Strong village spirit</p>
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
              Quality education options for families
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
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Local Schools</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li> Beaconsfield Primary School</li>
                  <li> St Francis Xavier College (Prep-12)</li>
                  <li> Multiple kindergartens & childcare</li>
                  <li> Community-run early learning</li>
                </ul>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Nearby Options</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li> Haileybury (Berwick campus)</li>
                  <li> Other Berwick private schools</li>
                  <li> Pakenham secondary options</li>
                  <li> School bus connections</li>
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
              <h4 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Education Focus</h4>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Education is a key drawcard for Beaconsfield families, with several highly regarded schools creating strong demand from education-conscious parents. The concentration of quality education options significantly influences property values and demographic composition.
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
                  $950K
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
                  3.1%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Rental Yield</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '28px', fontWeight: '400', marginBottom: '24px' }}>Housing Styles</h3>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Beaconsfield's housing market offers exceptional diversity, from contemporary suburban homes to rural lifestyle properties. Modern estates like Beaconsfield Waters provide contemporary family homes on managed-size blocks with quality construction and estate amenities.
              </p>
              <p style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                The established areas around old Beaconsfield feature character homes on larger blocks, including renovated period properties, mid-century homes, and newer builds. Lifestyle properties on the suburb's fringes provide acreage living from 1-5 acres or more.
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
                    src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop"
                    alt="Heritage home"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
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
                    alt="New estate"
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
                Beaconsfield's community spirit reflects its village origins and stable population. Long-term residents provide continuity while welcoming newcomers who appreciate the suburb's character. Local organizations including sporting clubs, churches, service groups, and school communities provide multiple connection points.
              </p>
            </div>
            
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              padding: isMobile ? '32px 20px' : '48px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '32px', fontWeight: '400', marginBottom: '24px' }}>Who Will Love Beaconsfield?</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '20px',
                textAlign: 'left',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Heritage enthusiasts</strong> who value historical connection</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Community-minded families</strong> seeking neighbourhood connections</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Train commuters</strong> wanting village living with CBD access</p>
                </div>
                <div>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Lifestyle seekers</strong> wanting acreage within commuting distance</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Education-focused families</strong> prioritizing quality schools</p>
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>• <strong>Semi-retirees</strong> seeking tree-change without isolation</p>
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
              Properties in Beaconsfield
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Discover character homes and lifestyle properties in this historic township. Property values in Beaconsfield reflect the suburb's established reputation, heritage character, and quality amenities.
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
                  No properties currently available in Beaconsfield
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
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Heritage Considerations</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Some properties may have heritage overlays affecting renovation options. Always check planning restrictions before purchasing if you plan modifications.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Highway Impact</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Consider proximity to the Princes Highway - some properties may be affected by traffic noise. Visit at different times to assess noise levels.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Bushfire Risk</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Check bushfire risk for properties near bush areas. Understand requirements for bushfire management plans and insurance implications.
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
                  Test your commute during peak times. Factor in parking availability at the station and consider backup transport options.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}>Acreage Living</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Understand rural responsibilities for larger blocks including land management, septic systems, and higher maintenance costs.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif', fontSize: '24px', fontWeight: '400', marginBottom: '16px' }}> School Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Check catchment areas and transport options if education is a priority. Some excellent schools may require specific zoning.
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
            Ready to call Beaconsfield home?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Our local experts know every street and can help you find your perfect character home or lifestyle property
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link
              href="/buy?suburb=beaconsfield"
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