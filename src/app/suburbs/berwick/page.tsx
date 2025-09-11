'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';

export default function BerwickSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const { properties } = useProperties({ suburb: 'Berwick', limit: 6 });

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
    { id: 'properties', title: 'Current Listings' }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', backgroundColor: '#fff' }}>
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
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px',
              opacity: 0.9
            }}>Suburb Guide</p>
            
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '900',
              lineHeight: '1',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>How to live in<br />Berwick</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              fontWeight: '300',
              maxWidth: '800px',
              marginBottom: '48px',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              Discover the perfect blend of heritage charm and modern living in one of Melbourne's most sought-after family suburbs
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
          top: '64px',
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
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: activeSection === index ? '700' : '500',
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
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
              <div>
                <h2 style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '800',
                  marginBottom: '32px',
                  lineHeight: '1.2'
                }}>
                  Welcome to Berwick
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  color: '#333'
                }}>
                  Berwick perfectly balances heritage charm with modern convenience. This thriving suburb in Melbourne's 
                  south-east has transformed from a quiet country town into one of the region's most desirable residential areas.
                </p>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#333'
                }}>
                  With its tree-lined streets, historic architecture, and strong sense of community, Berwick offers 
                  residents the best of both worlds: a village atmosphere with all the amenities of modern suburban living.
                </p>
              </div>
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                  alt="Berwick High Street"
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
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Getting Around
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>By Car</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  45km south-east of Melbourne CBD via the Monash Freeway (M1) and Princes Highway. 
                  Journey time approximately 50 minutes in normal traffic.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Public Transport</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Regular bus services connect to Berwick Station on the Pakenham line. 
                  Express trains reach the CBD in under an hour.
                </p>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Local Access</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#666' }}>
                  Well-connected to Fountain Gate, Cranbourne, and Officer. 
                  Easy access to Peninsula Link for Mornington Peninsula trips.
                </p>
              </div>
            </div>
          </section>

          {/* Lifestyle & Amenities */}
          <section id="section-2" style={{
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '48px'
            }}>
              Living the Berwick Life
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px', marginBottom: '60px' }}>
              <div>
                <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Shopping & Dining</h3>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                  The famous Berwick Village offers a unique shopping experience with boutique stores, 
                  artisan cafes, and the monthly farmers' market. Modern shopping needs are met at 
                  Eden Rise Village and Casey Central, while Fountain Gate is just minutes away.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333' }}>
                  High Street's dining scene ranges from award-winning restaurants to cozy cafes, 
                  with cuisines from around the world represented alongside modern Australian fare.
                </p>
              </div>
              <div style={{
                backgroundColor: '#f0f0f0',
                padding: '32px',
                borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '20px', marginBottom: '20px' }}>Local Favorites</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>☕</span> The General Food Store
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🍕</span> La Porchetta Berwick
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🥘</span> Shanikas
                  </li>
                  <li style={{ marginBottom: '12px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0 }}>🍰</span> Elements Cafe
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
              <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Parks & Recreation</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px', color: '#333' }}>
                Wilson Botanic Park spans 39 hectares of stunning landscapes, walking trails, and lakes. 
                The park hosts events throughout the year and features the popular Quarry amphitheatre.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px',
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
                    🌳
                  </div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>15+ Parks</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Green spaces for every occasion</p>
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
                    🏃‍♀️
                  </div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Sports Facilities</h4>
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
                    🎭
                  </div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Arts & Culture</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Gallery, events & festivals</p>
                </div>
              </div>
            </div>
          </section>

          {/* Education */}
          <section id="section-3" style={{
            backgroundColor: '#002b7f',
            color: '#fff',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
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
              One of Victoria's premier education hubs
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Private Schools</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li>🎓 Haileybury (Berwick Campus)</li>
                  <li>🎓 Beaconhills College</li>
                  <li>🎓 St Margaret's School</li>
                  <li>🎓 St Francis Xavier College</li>
                </ul>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '40px',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)'
              }}>
                <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Public Schools</h3>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '18px', lineHeight: '2' }}>
                  <li>🏫 Berwick College</li>
                  <li>🏫 Kambrya College</li>
                  <li>🏫 Berwick Primary School</li>
                  <li>🏫 Berwick Fields Primary</li>
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
              <h4 style={{ fontSize: '24px', marginBottom: '16px' }}>Tertiary Education</h4>
              <p style={{ fontSize: '18px', opacity: 0.9 }}>
                Chisholm Institute Berwick campus offers TAFE courses, while Federation University 
                and Monash University campuses are within 30 minutes.
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
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
                <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#002b7f', marginBottom: '8px' }}>
                  $1.1M
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Median House Price</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#28a745', marginBottom: '8px' }}>
                  +15.2%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>12 Month Growth</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#ff6b35', marginBottom: '8px' }}>
                  28
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Days on Market</p>
              </div>
              
              <div style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{ fontSize: '36px', fontWeight: '800', color: '#6c757d', marginBottom: '8px' }}>
                  3.2%
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>Rental Yield</p>
              </div>
            </div>
            
            <div style={{ marginBottom: '60px' }}>
              <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Housing Styles</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '32px', color: '#333' }}>
                Berwick offers diverse housing options from heritage homes on generous blocks to modern estates. 
                The Old Town features character properties, while newer developments provide contemporary family homes.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
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
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)',
            paddingTop: '80px',
            paddingBottom: '80px'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
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
                fontSize: '20px',
                lineHeight: '1.8',
                textAlign: 'center',
                color: '#333'
              }}>
                Berwick's strong community spirit is evident in its many clubs, organizations, 
                and annual events that bring residents together throughout the year.
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '40px',
              marginBottom: '60px'
            }}>
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Annual Events</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🎪 Berwick Show</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>February - Agricultural show with rides and exhibits</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🎄 Christmas Festival</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>December - Street parade and community celebrations</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🎺 Winter Music Festival</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>July - Live performances at Wilson Botanic Park</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Community Groups</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>⚽ Sports Clubs</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Football, netball, cricket, tennis, and more</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🎨 Arts & Crafts</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Berwick Arts Society and craft groups</p>
                  </div>
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>🌱 Garden Clubs</h4>
                    <p style={{ fontSize: '14px', color: '#666' }}>Horticultural society and community gardens</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              backgroundColor: '#002b7f',
              color: '#fff',
              padding: '48px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <blockquote style={{
                fontSize: '24px',
                fontWeight: '300',
                lineHeight: '1.6',
                marginBottom: '24px',
                fontStyle: 'italic'
              }}>
                "Berwick has that rare combination of country charm and city convenience. 
                It's a place where neighbors know each other and community still matters."
              </blockquote>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>
                - Long-time Berwick resident
              </p>
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '800',
              marginBottom: '16px'
            }}>
              Properties in Berwick
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Discover your perfect home in this sought-after suburb
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
                          fontSize: '24px',
                          fontWeight: '700',
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
                  No properties currently available in Berwick
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
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: '800',
            marginBottom: '24px'
          }}>
            Ready to call Berwick home?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '48px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>
            Our local experts are here to help you find your perfect property in this wonderful community
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link
              href="/buy?suburb=berwick"
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