'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function ClydeSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Clyde', limit: 6 });
  
  const suburbData = suburbProfiles['clyde'];

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
            }}>Welcome to<br />Clyde</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.4',
              marginBottom: '48px',
              maxWidth: '600px',
              opacity: 0.95
            }}>{suburbData?.tagline || 'Pioneering suburban development'}</p>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => scrollToSection(0)}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Start Reading
              </button>
              <button
                onClick={() => scrollToSection(6)}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.6)',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                View Properties
              </button>
            </div>
          </div>
        </section>

        {/* Navigation Bar */}
        <section style={{
          position: 'sticky',
          top: isMobile ? '60px' : '64px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 100,
          padding: '0 max(2rem, 3.33vw)'
        }}>
          <div style={{
            display: 'flex',
            gap: '0',
            overflowX: 'auto',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(index)}
                style={{
                  padding: '16px 24px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: '14px',
                  fontWeight: activeSection === index ? '600' : '400',
                  color: activeSection === index ? '#000' : '#666',
                  borderBottom: activeSection === index ? '2px solid #000' : '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  transition: 'all 0.3s ease'
                }}
              >
                {section.title}
              </button>
            ))}
          </div>
        </section>

        {/* Content Sections */}
        <div style={{
          padding: '0 max(2rem, 3.33vw)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Introduction Section */}
          <section 
            id="section-0" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '80px',
              alignItems: 'start'
            }}>
              <div>
                <h2 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  fontWeight: '400',
                  lineHeight: '1.1',
                  marginBottom: '32px',
                  color: '#000'
                }}>Clyde at a glance</h2>
                
                <div style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  <p style={{ marginBottom: '24px' }}>
                    Clyde represents Melbourne's newest frontier in suburban development, a rapidly transforming area that's evolving from rural farmland into a modern residential community before our eyes. Located approximately 48 kilometres southeast of Melbourne's CBD in the City of Casey, Clyde offers a unique opportunity to be part of a suburb's birth and growth.
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    What makes Clyde special is its blank-canvas approach to suburban development. Here, planners have learned from decades of suburban growth to create communities with integrated parks, walkable neighborhoods, and future transport connections from day one. The suburb attracts pioneers – young families and professionals who want to be part of building a new community while securing brand-new homes at competitive prices.
                  </p>
                  <p>
                    With the future Clyde railway station planned and major shopping centres under development, Clyde represents both immediate livability and long-term potential.
                  </p>
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '40px',
                borderRadius: '8px'
              }}>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Key Highlights</h3>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {suburbData?.highlights?.map((highlight, index) => (
                    <li key={index} style={{
                      padding: '12px 0',
                      borderBottom: index < suburbData.highlights.length - 1 ? '1px solid #e5e5e5' : 'none',
                      fontSize: '16px',
                      lineHeight: '1.5',
                      color: '#333',
                      position: 'relative',
                      paddingLeft: '20px'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '16px',
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#000',
                        borderRadius: '50%'
                      }} />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Location & Transport Section */}
          <section 
            id="section-1" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Location & Transport</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Where is Clyde?</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde sits at the southeastern edge of Melbourne's urban growth boundary, positioned between Clyde North to the north, Cranbourne South to the west, and rural areas extending toward Koo Wee Rup to the southeast. This location places Clyde at the current frontier of Melbourne's expansion, where urban meets rural in a carefully planned transition.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The suburb is bounded by major roads including Thompsons Road to the north and Ballarto Road to the south, with Berwick-Cranbourne Road providing a central spine. While currently relying on road transport, Clyde's position along the future rail corridor to Cranbourne East promises enhanced connectivity as infrastructure catches up with residential development.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Getting around</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde's current transport relies heavily on private vehicles, with road networks designed to handle this reality. Wide streets, extensive pathway networks, and carefully planned intersections create a car-friendly environment while maintaining walkability within neighborhoods.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The future Clyde railway station, planned as part of the Cranbourne line extension, will transform connectivity. While construction timelines remain uncertain, the reserved corridor and station location provide confidence in eventual delivery.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Current public transport consists of bus routes connecting to Cranbourne station and local destinations, with the 897 and 898 routes providing links to shopping centers and train stations.
                </p>
              </div>
            </div>
          </section>

          {/* Lifestyle & Amenities Section */}
          <section 
            id="section-2" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Lifestyle, Parks & Recreation</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde's lifestyle revolves around new community infrastructure designed to foster connection and wellbeing. Each estate features parks and playgrounds strategically distributed to ensure all homes are within walking distance of green space. These aren't just token reserves but thoughtfully designed spaces with modern equipment, natural play elements, and gathering areas.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The planned Clyde Regional Park will provide a major recreational asset, with sporting fields, playgrounds, and community facilities creating a focal point for the broader area. This significant investment demonstrates government commitment to ensuring new communities have equivalent amenities to established suburbs.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Walking and cycling paths wind throughout Clyde, connecting neighborhoods and providing recreational routes. These paths often follow drainage reserves and green corridors, creating linear parks that provide both transport and recreation functions.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Shopping & Dining</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde's retail landscape is evolving rapidly, with neighborhood shopping centers opening as population milestones are reached. Current facilities include convenience stores and cafes within estates, providing basic needs without requiring trips to established centers.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The future Clyde Town Centre, planned as a major activity hub, will transform shopping options. This center will include supermarkets, specialty retail, dining, and entertainment options, creating a focal point for the growing community.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Currently, residents travel to Cranbourne Park Shopping Centre or Casey Central for major shopping, typically 10-15 minutes by car.
                </p>
              </div>
            </div>
          </section>

          {/* Schools & Education Section */}
          <section 
            id="section-3" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Schools & Education</h2>
            
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#333',
              marginBottom: '32px'
            }}>
              Education infrastructure in Clyde is developing in parallel with residential growth, with new schools opening as population thresholds are reached. Clyde Primary School serves as the foundation, offering modern facilities and contemporary teaching approaches in purpose-built environments designed for 21st-century learning.
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Primary Schools</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Planning provisions ensure sites are reserved for future schools as each precinct develops. This forward planning means families can be confident that educational facilities will be available as their children reach school age, though specific opening dates depend on enrollment projections and government funding.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Early learning centers and kindergartens are opening progressively within estates, recognizing the young family demographic. These facilities often feature extended hours and integrated programs supporting working parents.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Secondary Schools</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  For secondary education, students currently travel to schools in Cranbourne, Berwick, or Casey, with school buses providing connections. However, plans for new secondary schools within Clyde are progressing, with sites identified and construction timelines linked to population growth.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Private school options require travel to established suburbs, though several schools operate bus services to Clyde. As the population grows, private education providers are likely to establish campuses locally.
                </p>
              </div>
            </div>
          </section>

          {/* Housing & Market Section */}
          <section 
            id="section-4" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Housing & Property Market</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde's housing market consists almost entirely of new construction, with estates offering contemporary homes designed for modern family living. Properties typically feature 3-5 bedrooms, open-plan living areas, and alfresco spaces that blur indoor-outdoor boundaries.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Land sizes in Clyde vary by estate and price point, typically ranging from 300-600 square meters. While smaller than traditional quarter-acre blocks, these lots are designed efficiently, with homes positioned to maximize private outdoor space and minimize unused side setbacks.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The building process in Clyde often involves purchasing house-and-land packages, where buyers select from builder ranges and customize finishes. This approach provides certainty around pricing while allowing personalization.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Market Characteristics</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Sustainability features are increasingly standard, with many homes including solar panels, rainwater tanks, and high energy ratings. These features reflect both buyer preferences and developer requirements, positioning Clyde as a more sustainable suburban model.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The investment market focuses on long-term growth potential rather than immediate returns. While rental yields may be modest initially, the suburb's infrastructure development and population growth support capital appreciation projections.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  First-home buyers dominate the market, taking advantage of government incentives and developer promotions to enter property ownership.
                </p>
              </div>
            </div>
          </section>

          {/* Community & Culture Section */}
          <section 
            id="section-5" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Community & Culture</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Building Community</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Clyde's community is actively forming, with residents consciously building connections in their new neighborhood. Social media groups play crucial roles, facilitating introductions, sharing information, and organizing gatherings. These digital communities complement physical interactions in creating belonging.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Local sporting clubs are forming as facilities become available, with residents establishing cricket, football, soccer, and netball teams. These clubs, built from scratch by community members, create strong bonds among founding members and provide crucial social infrastructure for newcomers.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Safety & Environment</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Safety benefits from modern urban design incorporating Crime Prevention Through Environmental Design (CPTED) principles. Well-lit streets, activated frontages, and natural surveillance create safer environments.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  As a new suburb, Clyde has opportunities to establish positive community culture from inception. Residents actively participating in this process often develop strong attachment to place, having helped shape their suburb's character.
                </p>
              </div>
            </div>
          </section>

          {/* Properties Section */}
          <section 
            id="section-6" 
            style={{
              paddingTop: '80px',
              paddingBottom: '80px',
              borderBottom: '1px solid #e5e5e5'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Current Properties in Clyde</h2>
            
            {properties && properties.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr',
                gap: '32px'
              }}>
                {properties.slice(0, 6).map((property) => (
                  <div key={property.id} style={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}>
                    {property.images && property.images[0] && (
                      <div style={{
                        width: '100%',
                        height: '200px',
                        backgroundImage: `url(${typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px'
                        }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                    )}
                    
                    <div style={{ padding: '24px' }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#000'
                      }}>
                        {formatPrice(property.price)}
                      </div>
                      
                      <div style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '16px'
                      }}>
                        {property.address}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '14px',
                        color: '#888',
                        marginBottom: '16px'
                      }}>
                        {property.bedrooms && (
                          <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                        )}
                        {property.bathrooms && (
                          <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                        )}
                        {property.carSpaces && (
                          <span>{property.carSpaces} car{property.carSpaces !== 1 ? 's' : ''}</span>
                        )}
                      </div>
                      
                      <Link
                        href={`/properties/${property.id}`}
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          backgroundColor: '#000',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  marginBottom: '16px'
                }}>No properties currently available in Clyde</p>
                <p style={{
                  fontSize: '16px',
                  color: '#888'
                }}>Check back soon for new listings in this developing suburb</p>
              </div>
            )}
            
            <div style={{
              textAlign: 'center',
              marginTop: '48px'
            }}>
              <Link
                href="/properties?suburb=Clyde"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#000',
                  textDecoration: 'none',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                View All Clyde Properties
              </Link>
            </div>
          </section>

          {/* Buyer Tips Section */}
          <section 
            id="section-7" 
            style={{
              paddingTop: '80px',
              paddingBottom: '120px'
            }}
          >
            <h2 style={{
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '400',
              lineHeight: '1.1',
              marginBottom: '48px',
              color: '#000'
            }}>Tips for Buyers & Renters</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '60px'
            }}>
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Before You Buy</h3>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Research estate differences:</strong> Each development has distinct characteristics, price points, and timelines
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Understand infrastructure timing:</strong> Know when schools, shops, and transport will be delivered
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Budget for two cars:</strong> Current transport realities mean most households need multiple vehicles
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Check builder reputation:</strong> Research builders thoroughly when buying house-and-land packages
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Living in Clyde</h3>
                
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Consider construction impacts:</strong> Living in a developing area means ongoing construction activity
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Join community groups early:</strong> Digital communities provide valuable local knowledge and connections
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Factor in travel time:</strong> Current commutes may be longer until local employment and services develop
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Be patient with amenities:</strong> Services and facilities will develop as the population grows
                  </li>
                </ul>
              </div>
            </div>
            
            <div style={{
              marginTop: '60px',
              padding: '40px',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                fontSize: '24px',
                fontWeight: '500',
                marginBottom: '16px',
                color: '#000'
              }}>The Clyde Advantage</h3>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Clyde offers a unique opportunity in Melbourne's property market – the chance to be part of a suburb's creation story. For those who see beyond current limitations to future potential, Clyde provides new homes at accessible prices in masterplanned communities designed for contemporary living.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
