'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function HamptonParkSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Hampton Park', limit: 6 });
  
  const suburbData = suburbProfiles['hampton-park'];

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
            }}>Welcome to<br />Hampton Park</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.4',
              marginBottom: '48px',
              maxWidth: '600px',
              opacity: 0.95
            }}>{suburbData?.tagline || 'Authentic multicultural community'}</p>
            
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
                }}>Hampton Park at a glance</h2>
                
                <div style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  <p style={{ marginBottom: '24px' }}>
                    Hampton Park represents authentic suburban Melbourne living, offering genuine affordability and strong community spirit in the heart of the Casey region. Located approximately 36 kilometres southeast of Melbourne's CBD, this established suburb has evolved from its humble beginnings into a vibrant multicultural community that epitomizes the Australian suburban dream for many migrant families and first-home buyers.
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    What makes Hampton Park special is its role as a stepping stone suburb – a place where new Australians establish roots, where young families buy their first homes, and where community connections transcend cultural boundaries. The suburb offers the increasingly rare combination of affordability and accessibility in Melbourne's inflated property market.
                  </p>
                  <p>
                    With established infrastructure, reasonable transport connections, and the kind of authentic neighborhood character that gentrified suburbs have lost, Hampton Park provides genuine value for working families and new migrants building their Australian story.
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
                }}>Where is Hampton Park?</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hampton Park sits strategically in Melbourne's southeastern suburbs, bounded by Hallam to the north, Narre Warren South to the east, Lynbrook and Lyndhurst to the south, and Dandenong South to the west. This central position within the Casey municipality provides residents with access to multiple employment centers and suburban hubs while maintaining distinct neighborhood identity.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The suburb is well-connected via the South Gippsland Highway running along its western boundary, with Pound Road and Somerville Road providing main east-west connections. While lacking its own train station, Hampton Park benefits from proximity to both Hallam and Lynbrook stations.
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
                  Hampton Park's transport relies heavily on road networks and bus services, with no direct train access challenging car-free living. The 894 bus route provides the primary public transport spine, connecting to Dandenong and Fountain Gate via local streets.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Residents typically drive to nearby train stations, with Hallam and Lynbrook stations roughly equidistant at 5-10 minutes drive. Parking availability varies, with early arrival essential for securing spaces during weekdays.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Road connectivity via South Gippsland Highway and Pound Road enables reasonable car travel, though peak-hour congestion affects commute times. The Western Port Highway provides alternative routes to southeastern employment areas.
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
                  Hampton Park's recreational facilities reflect practical community needs rather than premium amenities. The Hampton Park Recreation Reserve provides sporting grounds supporting local cricket and football clubs, while Robert Booth Reserve offers playgrounds and open space for informal recreation. These facilities, while basic, serve as important community gathering points.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Local parks scattered throughout residential areas provide playground equipment and green space for families. The quality varies, with some recently upgraded while others await renewal. Community advocacy often drives improvements, with cultural groups organizing to enhance local facilities.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The nearby Dandenong Valley Parklands and Lysterfield Park provide more extensive recreational options within driving distance. These regional parks offer walking trails, picnic areas, and natural environments contrasting with suburban development.
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
                  Hampton Park Shopping Centre serves as the commercial heart, providing essential retail including supermarkets, fresh food, and specialty stores. While modest compared to regional centers, it meets daily needs and serves as a social hub where neighbors connect during routine shopping.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The suburb's multicultural character shines through its food offerings. Small restaurants and takeaway shops offer authentic Afghan, Indian, Sri Lankan, Middle Eastern, and African cuisine at affordable prices. These family-run businesses provide genuine cultural experiences and community gathering places.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Pound Road and other commercial strips feature practical services – mechanics, hairdressers, medical centers – interspersed with ethnic groceries stocking ingredients unavailable in mainstream supermarkets.
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
              Hampton Park's education landscape serves its diverse community with a range of options. Hampton Park Primary School anchors public education, offering programs that celebrate cultural diversity while focusing on English language development and academic achievement.
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
                  River Gum Primary School and Coral Park Primary School provide additional options, each developing distinct approaches to serve their communities. The concentration of schools creates healthy competition and choice while fostering collaboration on community issues.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  St Kevin's School offers Catholic education, while Islamic schools in nearby suburbs serve Muslim families. Early learning centers and kindergartens throughout Hampton Park recognize the crucial role of early education, particularly for families where English is a second language.
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
                  Lyndale Secondary College and Kambrya College serve local secondary students, providing comprehensive programs including strong ESL support and vocational pathways recognizing diverse student aspirations. These schools work hard to support students from various backgrounds.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  This educational diversity reflects the community's varied religious and cultural backgrounds, ensuring families can access education aligned with their values. Schools often achieve remarkable outcomes despite socioeconomic challenges.
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
                  Hampton Park's housing stock reflects its working-class origins and organic growth. Most homes are single-story brick veneer constructions from the 1970s-1990s, featuring practical layouts with 3-4 bedrooms, separate living areas, and decent-sized backyards. These homes prioritize functionality over style, offering solid construction and liveable spaces.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Property prices in Hampton Park remain among Melbourne's most affordable for houses on individual blocks. This affordability attracts both owner-occupiers and investors, with typical blocks ranging from 500-700 square meters providing space for families, gardens, and often additional parking for work vehicles or extended family.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Recent years have seen selective renovation and redevelopment, with some older homes modernized or replaced with contemporary designs. Unit developments near main roads provide even more affordable options, though houses remain the dominant dwelling type.
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
                  The rental market is consistently strong, driven by the suburb's multicultural population and proximity to employment areas. Many new migrants rent initially before purchasing, creating steady demand. Investment properties often achieve solid yields, though capital growth has historically been modest compared to premium suburbs.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Young families, often with parents working in trades, healthcare, or service industries, form the suburb's backbone. Many are first or second-generation Australians building upon their parents' migration success stories.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  A growing cohort of first-home buyers, priced out of more central locations, discovers Hampton Park's value proposition. These buyers, often young professionals or essential workers, accept longer commutes for the opportunity to enter property ownership.
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
                }}>Cultural Diversity</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hampton Park's demographic tells the story of modern multicultural Australia. The suburb attracts new migrants beginning their Australian journey, with significant communities from Afghanistan, India, Sri Lanka, Iran, and various African nations. These communities choose Hampton Park for its affordability, established cultural networks, and acceptance of diversity.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Religious facilities spanning Islam, Christianity, Hinduism, and Buddhism provide not just spiritual services but crucial community support networks. Community organizations play vital roles supporting new arrivals, providing everything from English classes to employment assistance.
                </p>
              </div>
              
              <div>
                <h3 style={{
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  fontSize: '24px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: '#000'
                }}>Safety & Community</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Safety perceptions vary, with crime statistics showing higher rates than affluent suburbs but significant improvements over past decades. Community policing initiatives and natural surveillance from extended families and cultural networks contribute to actual safety exceeding perceptions.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The community's resilience shines during challenges, with neighbors supporting each other regardless of background. This practical multiculturalism, based on shared experiences rather than ideology, creates genuine social cohesion despite economic constraints.
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
            }}>Current Properties in Hampton Park</h2>
            
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
                }}>No properties currently available in Hampton Park</p>
                <p style={{
                  fontSize: '16px',
                  color: '#888'
                }}>Check back soon for new listings in this multicultural community</p>
              </div>
            )}
            
            <div style={{
              textAlign: 'center',
              marginTop: '48px'
            }}>
              <Link
                href="/properties?suburb=Hampton Park"
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
                View All Hampton Park Properties
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
                    <strong>Embrace diversity:</strong> The suburb's multicultural character is its strength – be open to different cultures
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Research micro-locations:</strong> Some streets and areas have better reputations and amenities than others
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Consider transport carefully:</strong> Factor in costs and time for commuting without direct train access
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Look beyond aesthetics:</strong> Focus on structural quality and potential rather than current presentation
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
                }}>Living in Hampton Park</h3>
                
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
                    <strong>Engage with community:</strong> Join local groups to build networks and understand neighborhood dynamics
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Understand the context:</strong> Hampton Park serves specific community needs – ensure these align with your situation
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Explore cultural offerings:</strong> Take advantage of authentic dining and cultural experiences
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Build community connections:</strong> Support local businesses and participate in community events
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
              }}>The Hampton Park Advantage</h3>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Hampton Park serves a crucial role in Melbourne's housing ecosystem – providing genuinely affordable family housing where new Australians can establish themselves and working families can achieve homeownership. For those who value community over convenience, diversity over homogeneity, and affordability over amenity, Hampton Park provides a genuine option in Melbourne's increasingly unaffordable housing market.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}