'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function SuburbsGuidePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [filterType, setFilterType] = React.useState('all');
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Curated images for each suburb - using high-quality Unsplash photos that represent each area
  const suburbImages: Record<string, string> = {
    // Established suburbs - family homes, parks, established streetscapes
    'berwick': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80', // Modern Australian home
    'narre-warren': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', // Suburban family home
    'narre-warren-south': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', // Quality residential home
    'cranbourne-north': 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80', // Family home with garden
    'beaconsfield': 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80', // Charming heritage home
    'hallam': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', // Established suburb home
    'hampton-park': 'https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&w=800&q=80', // Family-oriented home
    'endeavour-hills': 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&q=80', // Well-planned residential area
    'narre-warren-east': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', // Quality established home

    // Growth areas - modern developments, new estates
    'cranbourne': 'https://images.unsplash.com/photo-1582407947304-fd86f734eddc?auto=format&fit=crop&w=800&q=80', // Modern development
    'pakenham': 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80', // New estate home
    'officer': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', // Contemporary housing

    // Emerging suburbs - brand new modern homes
    'clyde': 'https://images.unsplash.com/photo-1600573472591-ee6981cf35b6?auto=format&fit=crop&w=800&q=80', // New development home
    'clyde-north': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', // Premium new estate

    // Premium - luxury homes with views
    'beaconsfield-upper': 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80', // Large property with views

    // Rural - countryside, acreage, farmland
    'garfield': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80', // Rural farmland
    'harkaway': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', // Rural landscape
    'koo-wee-rup': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80', // Agricultural land
    'tynong': 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80', // Semi-rural setting
    'bunyip': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80', // Country landscape
  };

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
    .filter(suburb => {
      // Search filter
      const matchesSearch = suburb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suburb.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suburb.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filter
      const matchesType = filterType === 'all' || suburb.type === filterType;

      return matchesSearch && matchesType;
    })
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
        paddingTop: isMobile ? '80px' : '120px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section */}
        <section style={{
          padding: isMobile ? '60px 20px 40px' : '80px max(2rem, 3.33vw) 60px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : isTablet ? '56px' : '72px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              color: '#000'
            }}>
              Suburb Guides
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: 0,
              lineHeight: '1.6'
            }}>
              Discover the perfect suburb for your lifestyle in Melbourne's south-east
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section style={{
          padding: isMobile ? '0 20px 32px' : '0 max(2rem, 3.33vw) 48px',
          backgroundColor: '#fff',
          position: 'sticky',
          top: isMobile ? '60px' : '80px',
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingTop: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e5e5e5',
            backgroundColor: '#fff'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '12px' : '16px',
              alignItems: isMobile ? 'stretch' : 'center',
              flexWrap: 'wrap'
            }}>
              {/* Search Input */}
              <div style={{ position: 'relative', flex: isMobile ? '1' : '0 0 280px' }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="2"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search suburbs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    fontFamily: 'inherit',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    color: '#000'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
              </div>

              {/* Type Filter */}
              <div style={{ position: 'relative', flex: isMobile ? '1' : '0 0 auto' }}>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    minWidth: '160px',
                    color: '#000'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="established">Established</option>
                  <option value="growth">Growth Areas</option>
                  <option value="emerging">Emerging</option>
                  <option value="premium">Premium</option>
                  <option value="rural">Rural</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Sort Filter */}
              <div style={{ position: 'relative', flex: isMobile ? '1' : '0 0 auto' }}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    appearance: 'none',
                    minWidth: '160px',
                    color: '#000'
                  }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="distance">Distance to CBD</option>
                  <option value="population">Population</option>
                </select>
                <svg style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>

              {/* Results Count */}
              <div style={{
                marginLeft: isMobile ? '0' : 'auto',
                fontSize: '14px',
                color: '#666',
                fontWeight: '500'
              }}>
                {filteredSuburbs.length} suburb{filteredSuburbs.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </section>

        {/* Suburbs Grid */}
        <section style={{
          padding: isMobile ? '20px 20px 60px' : '20px max(2rem, 3.33vw) 80px'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            {filteredSuburbs.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '100px 20px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  No suburbs found
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px',
                  lineHeight: '1.6'
                }}>
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('all');
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '14px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '100px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: '24px'
              }}>
                {filteredSuburbs.map((suburb, index) => (
                  <Link
                    key={index}
                    href={`/suburbs/${suburb.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    <article
                      style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                        const nameEl = e.currentTarget.querySelector('[data-name]') as HTMLElement;
                        if (nameEl) nameEl.style.color = '#AF272F';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                        const nameEl = e.currentTarget.querySelector('[data-name]') as HTMLElement;
                        if (nameEl) nameEl.style.color = '#000';
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        position: 'relative',
                        aspectRatio: '16/10',
                        backgroundColor: '#f8f8f8',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={suburbImages[suburb.slug] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'}
                          alt={`${suburb.name} - Melbourne's south-east suburb`}
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
                          padding: '8px 14px',
                          backgroundColor: '#000',
                          color: '#fff',
                          borderRadius: '100px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {getTypeLabel(suburb.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{
                        padding: '24px',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        {/* Distance Tag */}
                        <p style={{
                          fontSize: '12px',
                          color: '#666',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          fontWeight: '500',
                          margin: '0 0 6px 0'
                        }}>
                          {suburb.distanceToCbd} from CBD
                        </p>

                        {/* Name */}
                        <h3
                          data-name="true"
                          style={{
                            fontSize: '22px',
                            fontWeight: '600',
                            margin: '0 0 12px 0',
                            color: '#000',
                            lineHeight: '1.2',
                            transition: 'color 0.2s ease',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {suburb.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#666',
                          margin: '0 0 20px 0',
                          flex: 1
                        }}>
                          {suburb.description}
                        </p>

                        {/* Stats */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          paddingTop: '16px',
                          borderTop: '1px solid #f0f0f0',
                          marginBottom: '16px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span style={{ fontSize: '13px', color: '#666' }}>{suburb.population}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span style={{ fontSize: '13px', color: '#666' }}>{suburb.distanceToCbd}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}>
                          {suburb.features.slice(0, 3).map((feature, idx) => (
                            <span
                              key={idx}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#f8f8f8',
                                borderRadius: '100px',
                                fontSize: '12px',
                                color: '#666',
                                fontWeight: '500'
                              }}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#000',
          padding: isMobile ? '60px 20px' : '100px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '40px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#fff',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Need help finding your suburb?
            </h2>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Our local experts know every corner of Melbourne's south-east. Let us help you find the perfect location for your lifestyle.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 36px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'opacity 0.2s'
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/buy"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 36px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '15px',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'border-color 0.2s'
                }}
              >
                Browse Properties
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SuburbsGuidePage;
