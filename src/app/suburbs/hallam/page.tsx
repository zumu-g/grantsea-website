'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function HallamSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Hallam', limit: 6 });
  
  const suburbData = suburbProfiles['hallam'];

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
            }}>How to live in<br />Hallam</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.4',
              marginBottom: '48px',
              maxWidth: '600px',
              opacity: 0.95
            }}>{suburbData?.tagline || 'Affordable family living with exceptional transport links'}</p>
            
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
                }}>Hallam at a glance</h2>
                
                <div style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  <p style={{ marginBottom: '24px' }}>
                    Hallam embodies the essence of affordable family living in Melbourne's southeast, offering a mature suburban environment that has evolved gracefully from industrial roots to become a diverse residential community. Located approximately 35 kilometres from Melbourne's CBD in the City of Casey, Hallam presents an attractive proposition for families and investors seeking established infrastructure, convenient transport links, and genuine value in the property market.
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    What distinguishes Hallam is its strategic positioning at the intersection of major transport corridors, providing exceptional connectivity while maintaining affordable housing options. The suburb features a mix of original homes from the 1970s and 80s alongside newer developments, creating diverse housing choices.
                  </p>
                  <p>
                    With the Hallam railway station on both the Pakenham and Cranbourne lines, extensive bus networks, and proximity to major employment centres, Hallam offers practical suburban living without the premium price tags of neighboring suburbs.
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
                }}>Where is Hallam?</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Hallam occupies a central position in Melbourne's southeastern suburbs, strategically located between the major centres of Dandenong and Narre Warren. The suburb is bounded by Endeavour Hills to the north, Hampton Park to the east, Lynbrook to the south, and Noble Park to the west.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The suburb's location along the railway corridor and proximity to the Princes Highway and South Gippsland Highway creates exceptional connectivity options. Hallam serves as a natural transit point, making it attractive to commuters who need flexibility in their travel directions.
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
                  Hallam boasts exceptional public transport connectivity that sets it apart from many outer suburbs. The Hallam railway station is uniquely positioned on both the Pakenham and Cranbourne lines, providing frequent services and flexibility in travel directions. Trains run regularly to Melbourne CBD via Dandenong, with typical journey times of 45-50 minutes.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The extensive bus network includes routes connecting to Fountain Gate, Dandenong, and surrounding suburbs. The 901 SmartBus orbital route passes through Hallam, providing connections to major activity centres and other train lines without needing to travel through the CBD.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Road connectivity is excellent with easy access to the Princes Highway, South Gippsland Highway, and the Monash Freeway via nearby interchanges.
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
                  Hallam offers practical recreational facilities that serve the community's needs without pretense. The Hallam Recreation Reserve provides sporting grounds for cricket and football, along with playgrounds and open space for informal recreation. These facilities host local sporting clubs that form important social networks within the community.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Local parks scattered throughout residential areas provide playground equipment and green space for families. While not extensive, these parks offer sufficient space for children's play and neighborhood gatherings. The nearby Endeavour Hills Leisure Centre and Noble Park Aquatic Centre provide swimming and fitness facilities within easy reach.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The Spring Valley Golf Club offers golf enthusiasts a quality course, while also serving as a green lung for the area. Walking tracks through the suburb and connections to broader trail networks provide opportunities for exercise and dog walking.
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
                  Hallam's retail scene is functional and increasingly diverse, reflecting the practical needs and cultural diversity of residents. The Hallam Square Shopping Centre provides everyday essentials including supermarkets, fresh food, and specialty stores.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The proximity to Fountain Gate Shopping Centre, one of Melbourne's largest suburban retail complexes, means residents have access to comprehensive shopping just minutes away. This includes department stores, fashion retailers, entertainment, and extensive dining options.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Local dining increasingly reflects Hallam's multicultural population, with authentic restaurants and takeaway options spanning Vietnamese, Chinese, Indian, Middle Eastern, and Islander cuisines. These often family-run businesses provide genuine cultural dining experiences at affordable prices.
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
              Education facilities in Hallam cater comprehensively to the local community, with several primary schools serving different parts of the suburb. These schools often feature specialist programs including languages that reflect the community's diversity.
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
                  Hallam Primary School, Hallam Valley Primary School, and St Elizabeth's Catholic Primary School provide quality education with strong community connections. These schools often feature specialist programs including languages that reflect the community's diversity.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Early childhood education is well-served through multiple childcare centres and kindergartens, supporting working families with quality care and education programs. The diversity of providers ensures options for different cultural preferences and educational philosophies.
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
                  Secondary education is accessible through nearby schools in surrounding suburbs, with Fountain Gate Secondary College, Lyndale Secondary College, and various other options within easy reach. The proximity to multiple secondary schools allows families to choose based on specific programs, teaching approaches, or cultural fit.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The Hallam Senior Learning Centre provides alternative pathways for senior students and adult learners, offering VCE, VCAL, and vocational programs in a supportive environment.
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
                  Hallam's housing stock primarily consists of established homes built during the suburb's major growth phase from the 1970s to 1990s. These properties typically feature practical designs with three to four bedrooms, formal and informal living areas, and good-sized backyards that appeal to families. Brick veneer construction dominates, offering solid, low-maintenance homes that have stood the test of time.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  The suburb offers exceptional value for money, with house prices significantly below Melbourne's median while providing similar amenities to more expensive areas. Typical blocks range from 600-800 square meters, providing space for outdoor living, children's play areas, and often room for additional vehicles or trailers.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Recent years have seen selective redevelopment with older homes on larger blocks being replaced by modern townhouses or dual occupancies. This trend provides newer housing options while maintaining the suburb's affordable character.
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
                  The rental market remains robust, supported by proximity to employment areas and transport infrastructure. Rental yields often exceed those in more expensive suburbs, making Hallam attractive to investors seeking positive returns and steady tenant demand.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Working families form the backbone of Hallam's community, attracted by affordable housing and proximity to employment in industrial and commercial sectors. The suburb particularly appeals to established migrant families who have built strong community networks.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  First-home buyers find Hallam attractive for its competitive property prices and established amenities, while investors recognize the steady rental demand from workers in nearby employment precincts.
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
                  Hallam's population reflects Melbourne's multicultural character, with a particularly diverse community that includes significant populations from Southeast Asian, Middle Eastern, and Pacific Islander backgrounds. This diversity creates a rich cultural environment with varied dining options, religious facilities, and community celebrations throughout the year.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Religious facilities spanning various faiths provide not just spiritual services but community support and social connection. These include churches, mosques, temples, and community halls that host regular gatherings.
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
                  Community safety benefits from active neighborhood networks and the working-family character of the suburb. While historically facing some challenges, community policing initiatives and resident engagement have improved safety outcomes. Well-lit main roads and active streets during commute times contribute to natural surveillance.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Local community groups, often organized around cultural backgrounds or interests, provide support networks for new arrivals and established residents alike. The Hallam Community Centre serves as a focal point for services and activities.
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
            }}>Current Properties in Hallam</h2>
            
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
                }}>No properties currently available in Hallam</p>
                <p style={{
                  fontSize: '16px',
                  color: '#888'
                }}>Check back soon for new listings in this affordable suburb</p>
              </div>
            )}
            
            <div style={{
              textAlign: 'center',
              marginTop: '48px'
            }}>
              <Link
                href="/properties?suburb=Hallam"
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
                View All Hallam Properties
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
                    <strong>Inspect infrastructure condition:</strong> Older homes may need updates – factor renovation costs into budgets
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Research specific locations:</strong> Different parts of Hallam have varying characteristics and amenities
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Consider transport proximity:</strong> Properties near the station command premiums but offer convenience
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Understand cultural diversity:</strong> Embrace the multicultural character as a community strength
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
                }}>Living in Hallam</h3>
                
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
                    <strong>Check development applications:</strong> Some areas see more redevelopment activity than others
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Evaluate school options:</strong> Research both local and nearby schools to find the best fit
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Explore local amenities:</strong> Take advantage of multicultural dining and shopping options
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Connect with community:</strong> Join local groups to build support networks and friendships
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
              }}>The Hallam Advantage</h3>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Hallam represents authentic suburban Melbourne – unpretentious, multicultural, and focused on providing affordable family housing with good connectivity. While it may lack the polish of premium suburbs, it offers genuine value through established infrastructure, exceptional transport links, and strong community networks.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}