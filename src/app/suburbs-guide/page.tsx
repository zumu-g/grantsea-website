'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function SuburbsGuidePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const suburbs = [
    {
      name: 'Berwick',
      slug: 'berwick',
      description: 'Family-friendly suburb with excellent schools, shopping centres, and parks. Close to Fountain Gate and Casey Central.',
      features: ['Train Station', 'Shopping Centres', 'Great Schools', 'Parks & Recreation'],
      type: 'established',
      population: '45,000',
      distanceToCbd: '42km'
    },
    {
      name: 'Narre Warren',
      slug: 'narre-warren',
      description: 'Well-established suburb with mature infrastructure, close to Westfield Fountain Gate and excellent transport links.',
      features: ['Shopping Centre', 'Train Station', 'Schools', 'Medical Facilities'],
      type: 'established',
      population: '26,000',
      distanceToCbd: '39km'
    },
    {
      name: 'Narre Warren South',
      slug: 'narre-warren-south',
      description: 'Premium residential area with larger blocks, quality homes, and proximity to top schools and amenities.',
      features: ['Large Blocks', 'Quality Homes', 'Schools', 'Quiet Streets'],
      type: 'established',
      population: '18,000',
      distanceToCbd: '41km'
    },
    {
      name: 'Cranbourne',
      slug: 'cranbourne',
      description: 'Growing suburb with new developments, shopping precincts, and excellent connectivity to Melbourne.',
      features: ['New Developments', 'Train Station', 'Shopping', 'Growth Area'],
      type: 'growth',
      population: '22,000',
      distanceToCbd: '48km'
    },
    {
      name: 'Cranbourne North',
      slug: 'cranbourne-north',
      description: 'Established residential area with family homes, parks, and close proximity to amenities and transport.',
      features: ['Family Homes', 'Parks', 'Schools', 'Transport Links'],
      type: 'established',
      population: '20,000',
      distanceToCbd: '46km'
    },
    {
      name: 'Pakenham',
      slug: 'pakenham',
      description: 'Fast-growing suburb with new estates, shopping centres, and excellent train connections to the city.',
      features: ['New Estates', 'Train Station', 'Shopping Centre', 'Growth Corridor'],
      type: 'growth',
      population: '35,000',
      distanceToCbd: '56km'
    },
    {
      name: 'Officer',
      slug: 'officer',
      description: 'Modern suburb with contemporary housing, parks, and growing amenities. Perfect for families and professionals.',
      features: ['Modern Homes', 'Train Station', 'Parks', 'New Amenities'],
      type: 'growth',
      population: '15,000',
      distanceToCbd: '53km'
    },
    {
      name: 'Clyde',
      slug: 'clyde',
      description: 'Emerging suburb with new housing developments, planned infrastructure, and future growth potential.',
      features: ['New Developments', 'Planned Infrastructure', 'Investment Potential', 'Family Friendly'],
      type: 'emerging',
      population: '8,000',
      distanceToCbd: '58km'
    },
    {
      name: 'Clyde North',
      slug: 'clyde-north',
      description: 'Premium new estates with modern amenities, parks, and planned community facilities in a growing corridor.',
      features: ['Premium Estates', 'Modern Amenities', 'Parks', 'Planned Growth'],
      type: 'emerging',
      population: '12,000',
      distanceToCbd: '55km'
    },
    {
      name: 'Beaconsfield',
      slug: 'beaconsfield',
      description: 'Charming suburb with heritage character, excellent schools, and beautiful natural surroundings.',
      features: ['Heritage Character', 'Top Schools', 'Natural Beauty', 'Train Station'],
      type: 'established',
      population: '7,000',
      distanceToCbd: '46km'
    },
    {
      name: 'Beaconsfield Upper',
      slug: 'beaconsfield-upper',
      description: 'Semi-rural lifestyle with large properties, stunning views, and close to quality schools and amenities.',
      features: ['Large Properties', 'Stunning Views', 'Semi-Rural', 'Quality Schools'],
      type: 'premium',
      population: '3,000',
      distanceToCbd: '50km'
    },
    {
      name: 'Hallam',
      slug: 'hallam',
      description: 'Established suburb with good transport links, shopping centres, and a strong sense of community.',
      features: ['Transport Links', 'Shopping Centres', 'Community Feel', 'Established Area'],
      type: 'established',
      population: '14,000',
      distanceToCbd: '35km'
    },
    {
      name: 'Hampton Park',
      slug: 'hampton-park',
      description: 'Family-oriented suburb with parks, schools, and shopping facilities. Great value for families.',
      features: ['Family Oriented', 'Parks', 'Schools', 'Value for Money'],
      type: 'established',
      population: '25,000',
      distanceToCbd: '37km'
    },
    {
      name: 'Endeavour Hills',
      slug: 'endeavour-hills',
      description: 'Well-planned suburb with excellent facilities, parks, and proximity to Monash University.',
      features: ['Well Planned', 'Excellent Facilities', 'Near University', 'Parks'],
      type: 'established',
      population: '15,000',
      distanceToCbd: '32km'
    },
    {
      name: 'Garfield',
      slug: 'garfield',
      description: 'Rural township with acreage properties, peaceful lifestyle, and growing community amenities.',
      features: ['Acreage Properties', 'Rural Lifestyle', 'Peaceful', 'Growing Community'],
      type: 'rural',
      population: '2,000',
      distanceToCbd: '65km'
    },
    {
      name: 'Harkaway',
      slug: 'harkaway',
      description: 'Rural suburb with large properties, horse facilities, and a country lifestyle close to the city.',
      features: ['Large Properties', 'Horse Facilities', 'Country Lifestyle', 'Close to City'],
      type: 'rural',
      population: '1,500',
      distanceToCbd: '48km'
    },
    {
      name: 'Koo Wee Rup',
      slug: 'koo-wee-rup',
      description: 'Agricultural town with heritage charm, growing residential areas, and excellent community spirit.',
      features: ['Agricultural Town', 'Heritage Charm', 'Growing Areas', 'Community Spirit'],
      type: 'rural',
      population: '3,500',
      distanceToCbd: '72km'
    },
    {
      name: 'Narre Warren East',
      slug: 'narre-warren-east',
      description: 'Established residential area with quality homes, parks, and proximity to excellent schools.',
      features: ['Quality Homes', 'Parks', 'Excellent Schools', 'Established'],
      type: 'established',
      population: '6,000',
      distanceToCbd: '43km'
    },
    {
      name: 'Tynong',
      slug: 'tynong',
      description: 'Semi-rural community with larger blocks, peaceful environment, and growing local amenities.',
      features: ['Larger Blocks', 'Peaceful Environment', 'Semi-Rural', 'Growing Amenities'],
      type: 'rural',
      population: '1,800',
      distanceToCbd: '62km'
    },
    {
      name: 'Bunyip',
      slug: 'bunyip',
      description: 'Country town with rural charm, acreage lifestyle, and strong community connections.',
      features: ['Rural Charm', 'Acreage Lifestyle', 'Country Town', 'Community Connections'],
      type: 'rural',
      population: '2,200',
      distanceToCbd: '78km'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'established': return '#3498db';
      case 'growth': return '#27ae60';
      case 'emerging': return '#f39c12';
      case 'premium': return '#9b59b6';
      case 'rural': return '#e67e22';
      default: return '#002b7f';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'established': return 'Established';
      case 'growth': return 'Growth Area';
      case 'emerging': return 'Emerging';
      case 'premium': return 'Premium';
      case 'rural': return 'Rural';
      default: return type;
    }
  };

  const filteredSuburbs = suburbs
    .filter(suburb => 
      suburb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suburb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suburb.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          return parseInt(a.distanceToCbd) - parseInt(b.distanceToCbd);
        case 'population':
          return parseInt(b.population.replace(/,/g, '')) - parseInt(a.population.replace(/,/g, ''));
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <>
      <OncomHeader />
      
      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '80px 40px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '64px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              margin: '0 0 24px 0',
              color: '#000'
            }}>
              Suburbs Guide
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Discover the perfect suburb for your lifestyle. Explore our comprehensive guide to Melbourne's south-east communities.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '20px',
              marginBottom: '30px',
              alignItems: isMobile ? 'stretch' : 'center'
            }}>
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Search suburbs by name, features, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#002b7f'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '16px 20px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  minWidth: isMobile ? 'auto' : '200px',
                  fontFamily: 'inherit'
                }}
              >
                <option value="name">Sort by Name</option>
                <option value="distance">Distance to CBD</option>
                <option value="population">Population</option>
              </select>
            </div>

            {/* Results Count */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              Showing {filteredSuburbs.length} suburb{filteredSuburbs.length !== 1 ? 's' : ''}
            </div>
          </div>
        </section>

        {/* Suburbs Grid */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '32px'
            }}>
              {filteredSuburbs.map((suburb, index) => (
                <Link
                  key={index}
                  href={`/suburbs/${suburb.slug}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    height: '100%'
                  }}
                >
                  <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #e5e5e5',
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}>
                    {/* Image */}
                    <div style={{
                      width: '100%',
                      height: '320px',
                      backgroundColor: '#f8f8f8',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1564013799919-ab600027ffc6' : '1582407947304-fd86f734eddc'}?auto=format&fit=crop&w=800&q=80`}
                        alt={suburb.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      
                      {/* Type Badge */}
                      <div style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        padding: '6px 12px',
                        backgroundColor: getTypeColor(suburb.type),
                        color: '#fff',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {getTypeLabel(suburb.type)}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{
                      padding: '32px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* Header */}
                      <div style={{ marginBottom: '16px' }}>
                        <h3 style={{
                          fontSize: '24px',
                          fontWeight: '600',
                          margin: '0 0 8px 0',
                          color: '#000'
                        }}>
                          {suburb.name}
                        </h3>
                        <div style={{
                          fontSize: '14px',
                          color: '#666',
                          marginBottom: '12px'
                        }}>
                          {suburb.distanceToCbd} from CBD
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        color: '#666',
                        margin: '0 0 20px 0',
                        flex: 1
                      }}>
                        {suburb.description}
                      </p>

                      {/* Key Stats */}
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        marginBottom: '20px'
                      }}>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '12px',
                          fontSize: '14px'
                        }}>
                          <div>
                            <span style={{ color: '#666' }}>Population:</span>
                            <br />
                            <span style={{ fontWeight: '600', color: '#000' }}>{suburb.population}</span>
                          </div>
                          <div>
                            <span style={{ color: '#666' }}>Distance:</span>
                            <br />
                            <span style={{ fontWeight: '600', color: '#000' }}>{suburb.distanceToCbd}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '20px'
                      }}>
                        {suburb.features.slice(0, 4).map((feature, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#f0f4ff',
                              borderRadius: '16px',
                              fontSize: '12px',
                              color: '#002b7f',
                              fontWeight: '500'
                            }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* View Details Button */}
                      <div style={{
                        marginTop: 'auto',
                        padding: '14px 0',
                        borderTop: '1px solid #e5e5e5',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          color: '#002b7f',
                          fontWeight: '600',
                          fontSize: '14px'
                        }}>
                          View Suburb Guide →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredSuburbs.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#666'
              }}>
                <p style={{ fontSize: '18px', marginBottom: '20px' }}>No suburbs found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#002b7f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    cursor: 'pointer'
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default SuburbsGuidePage;