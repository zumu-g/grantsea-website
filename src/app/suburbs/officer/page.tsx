'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import { suburbProfiles } from '@/data/suburbProfiles';

export default function OfficerSuburbGuide() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { properties } = useProperties({ suburb: 'Officer', limit: 6 });
  
  const suburbData = suburbProfiles['officer'];

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
            }}>How to live in<br />Officer</h1>
            
            <p style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.4',
              marginBottom: '48px',
              maxWidth: '600px',
              opacity: 0.95
            }}>{suburbData?.tagline || 'Strategic location and modern living'}</p>
            
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
                }}>Officer at a glance</h2>
                
                <div style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  <p style={{ marginBottom: '24px' }}>
                    Officer represents the perfect intersection of strategic location, contemporary living, and natural beauty in Melbourne's southeastern growth corridor. Located approximately 48 kilometres from Melbourne's CBD, Officer has rapidly transformed from a quiet rural locality into one of the most sought-after residential addresses in the outer southeast.
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    What sets Officer apart is its exceptional balance of urban convenience and semi-rural charm. The suburb features contemporary housing estates with cutting-edge design and sustainability features, while maintaining corridors of natural bushland and green space.
                  </p>
                  <p>
                    With the Cardinia Road Employment Precinct bringing thousands of jobs to the area and excellent transport links via the Officer train station, the suburb offers a rare combination of lifestyle, employment, and connectivity that appeals to families and professionals seeking value without compromise.
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
                }}>Where is Officer?</h3>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Officer occupies a prime position in the Shire of Cardinia, strategically located between the established suburb of Berwick to the west and the regional centre of Pakenham to the east. The suburb is bounded by Beaconsfield to the south and Nar Nar Goon to the east, placing it at the heart of one of Melbourne's fastest-growing regions.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  This positioning provides Officer with unique advantages – residents enjoy quick access to Berwick's established shopping, education, and healthcare facilities while benefiting from Pakenham's regional services and employment opportunities.
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
                  Officer's transport infrastructure represents a significant advantage, anchored by the Officer railway station on the Pakenham line. The station, opened in 2012, provides regular services to Melbourne via Dandenong, with typical journey times of 55-65 minutes to the CBD.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Road connectivity is excellent via the Princes Highway, which provides direct access to Pakenham and Berwick. The recent Princes Highway duplication has improved traffic flow and safety, while the O'Neil Road extension enhances local connectivity.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Bus services connect residential areas to the train station, schools, and shopping centres, though coverage varies between estates. The 926 bus route provides important connections to Fountain Gate and Pakenham.
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
                  Officer's lifestyle appeal centers on its abundant green space and modern recreational facilities integrated into residential planning. The Officer Recreation Reserve provides sporting fields, playgrounds, and pavilions supporting organized sport and casual recreation. These facilities host local football, cricket, and netball clubs fostering community connection.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Each residential estate features parks and playgrounds designed to serve local communities, with equipment catering to various age groups. These spaces often include barbecue facilities, shelters, and open areas for informal recreation, creating neighborhood focal points.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The Officer Public Hall serves as a community hub, hosting events, programs, and celebrations that bring residents together. This historic building, preserved amid modern development, provides a link to the area's rural past while serving contemporary community needs.
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
                  Officer's retail and dining scene is evolving rapidly to serve the growing population. The Officer Central Shopping Centre provides everyday essentials including supermarkets, cafes, and specialty stores. This local centre reduces the need for routine trips to larger centers while fostering local business development.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Arena Shopping Centre offers additional retail and dining options, including fresh food, restaurants, and services catering to the surrounding residential community. These centers are designed as pedestrian-friendly precincts encouraging social interaction alongside shopping.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  For more extensive shopping, residents typically travel to nearby Fountain Gate in Narre Warren or Pakenham Central, both offering major retailers, department stores, and diverse dining options.
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
              Education infrastructure in Officer has been developed in tandem with residential growth, resulting in modern facilities designed for contemporary learning. Officer Primary School, opened in 2016, exemplifies this approach with flexible learning spaces, technology integration, and sustainable design features.
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
                  Additional primary schools serve different precincts within Officer, including Bridgewood Primary School and planned future schools as development continues. These schools benefit from purpose-built facilities and the opportunity to establish positive cultures from inception.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Early learning is well-serviced with multiple childcare centres and kindergartens integrated into the estate planning. These facilities recognize the suburb's young family demographic and provide essential services supporting working parents.
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
                  Officer Secondary College, opening for Year 7 students in 2018 and progressively adding year levels, provides local secondary education with a focus on innovation, technology, and student wellbeing. The school's modern facilities and progressive curriculum attract families seeking quality education.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  The proximity to established schools in Berwick and Pakenham expands educational options, with many families accessing private schools and specialized programs in neighboring suburbs supported by good transport connections.
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
                  Officer's housing market is characterized by contemporary design and modern amenities, with most properties built within the last 15 years. The suburb features several masterplanned estates including Arena, Arcadia, and Orchard Park, each offering distinct characteristics while maintaining high design standards.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  New homes dominate the market, typically featuring 3-4 bedrooms, multiple living areas, and modern open-plan designs. These properties emphasize energy efficiency, with many including solar panels, water tanks, and high insulation standards. Block sizes generally range from 300-700 square meters.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Architectural diversity is encouraged within estate guidelines, creating streetscapes that avoid monotony while maintaining aesthetic cohesion. Popular styles include contemporary facades with rendered finishes, Hamptons-inspired designs, and modern interpretations of traditional forms.
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
                  The rental market is strong and growing, supported by the suburb's family appeal and proximity to employment areas. Rental properties typically achieve good returns, making Officer attractive to investors seeking growth areas with strong fundamentals.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333',
                  marginBottom: '24px'
                }}>
                  Future development continues with new land releases and planned precincts, though availability is becoming limited as the suburb approaches build-out. This scarcity is beginning to support price growth in established areas of Officer.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Officer attracts a predominantly young demographic, with families with children representing the largest resident group. The suburb particularly appeals to first-home buyers and young families upgrading from apartments or smaller properties.
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
                  Officer's community is characterized by its youth and energy, with new residents actively creating neighborhood connections and community culture. The predominance of young families creates natural connection points through schools, parks, and local activities, fostering a supportive community environment.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Local sporting clubs, though relatively new, are building strong membership and volunteer bases. These clubs provide important social infrastructure beyond sport, creating networks that support community cohesion and belonging.
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
                  Safety benefits from modern urban design principles including good lighting, natural surveillance, and activated public spaces. The newer streetscapes and homes incorporate security features, while the family-oriented demographic contributes to neighborhood watch and community vigilance.
                </p>
                
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#333'
                }}>
                  Community social media groups are particularly active in Officer, facilitating information sharing, recommendations, and social connections. These digital networks complement physical community spaces in building social capital within this new suburb.
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
            }}>Current Properties in Officer</h2>
            
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
                }}>No properties currently available in Officer</p>
                <p style={{
                  fontSize: '16px',
                  color: '#888'
                }}>Check back soon for new listings in this growing suburb</p>
              </div>
            )}
            
            <div style={{
              textAlign: 'center',
              marginTop: '48px'
            }}>
              <Link
                href="/properties?suburb=Officer"
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
                View All Officer Properties
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
                    <strong>Research estates carefully:</strong> Each estate has different characteristics, price points, and amenities - visit multiple options
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Consider construction timelines:</strong> New areas may have ongoing construction - understand completion timeframes
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Check school zones:</strong> Confirm school catchments as they may change with new school openings
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Understand estate requirements:</strong> Some estates have architectural guidelines and landscape requirements
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
                }}>Living in Officer</h3>
                
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
                    <strong>Factor in commute costs:</strong> While well-connected, daily commuting costs (parking, fuel, or train fares) should be budgeted
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Plan for amenity development:</strong> Some facilities and services are still developing - consider current versus future amenity
                  </li>
                  <li style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e5e5',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Join community groups:</strong> Digital and physical communities help build connections in this new suburb
                  </li>
                  <li style={{
                    padding: '16px 0',
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#333'
                  }}>
                    <strong>Explore local opportunities:</strong> Be part of shaping a new community's character and culture
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
              }}>The Officer Advantage</h3>
              
              <p style={{
                fontSize: '18px',
                lineHeight: '1.6',
                color: '#333',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
                Officer represents a new generation of Melbourne suburbs – purposefully planned, sustainably designed, and strategically located to provide residents with an optimal balance of affordability, lifestyle, and opportunity. As the Cardinia Road Employment Precinct develops and community infrastructure matures, Officer is transitioning from a residential commuter suburb to a more complete community with local employment, comprehensive services, and distinct identity.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}