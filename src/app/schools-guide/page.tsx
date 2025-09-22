'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function SchoolsGuidePage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [selectedLevels, setSelectedLevels] = React.useState('all');
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const schools = [
    // KINDERGARTENS
    {
      name: 'Berwick Fields Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Berwick',
      address: '15-17 Berwick Fields Drive, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickfields.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Modern facility with large outdoor play areas and experienced educators. Focus on play-based learning and school readiness.',
      features: ['Play-based Learning', 'School Readiness', 'Outdoor Play Areas', 'Experienced Educators']
    },
    {
      name: 'Harkaway Kindergarten',
      type: 'kindergarten',
      levels: '4-year program',
      suburb: 'Harkaway',
      address: '25 Harkaway Road, Harkaway 3806',
      phone: '(03) 9707 0000',
      email: 'harkaway.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 2:00 PM',
      enrolments: 'N/A',
      description: 'Small, community-focused kindergarten with strong parent involvement and individual attention.',
      features: ['Small Groups', 'Parent Involvement', 'Individual Attention', 'Community Focus']
    },
    {
      name: 'Cranbourne East Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Large, well-equipped facility with dedicated art and music rooms. Strong focus on STEM activities.',
      features: ['Art Room', 'Music Room', 'STEM Activities', 'Well-equipped Facility']
    },
    {
      name: 'Pakenham Kindergarten',
      type: 'kindergarten',
      levels: '3-year & 4-year programs',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.kin@kindergarten.vic.gov.au',
      hours: '9:00 AM - 3:00 PM',
      enrolments: 'N/A',
      description: 'Long-established kindergarten with experienced educators and strong community ties.',
      features: ['Established History', 'Experienced Educators', 'Community Ties', 'Quality Programs']
    },
    // PRIMARY SCHOOLS
    {
      name: 'Berwick Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '25-27 Berwick Primary Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwick.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:15',
      description: 'Established school with strong academic results and comprehensive extracurricular programs. Traditional values combined with innovative teaching methods.',
      features: ['Music Excellence', 'Arts Programs', 'STEM Focus', 'Strong Community']
    },
    {
      name: 'Harkaway Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Harkaway',
      address: '12-14 Harkaway Road, Harkaway 3806',
      phone: '(03) 9707 0000',
      email: 'harkaway.ps@education.vic.gov.au',
      enrolments: '280',
      ratio: '1:12',
      description: 'Small, community-focused school with emphasis on environmental education and individual attention. Intimate, family-like atmosphere.',
      features: ['Environmental Education', 'Outdoor Learning', 'Small Classes', 'Community Focus']
    },
    {
      name: 'Berwick Fields Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '15-17 Berwick Fields Drive, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwickfields.ps@education.vic.gov.au',
      enrolments: '650',
      ratio: '1:16',
      description: 'Modern school with state-of-the-art facilities including performing arts center and science laboratories. Strong technology integration.',
      features: ['Performing Arts', 'Sports Academy', 'STEM Excellence', 'Modern Facilities']
    },
    {
      name: 'Cranbourne Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne',
      address: '25-27 Cranbourne Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourne.ps@education.vic.gov.au',
      enrolments: '520',
      ratio: '1:14',
      description: 'Long-established school with strong community connections and comprehensive curriculum. Rich history and deep community roots.',
      features: ['Music Excellence', 'Art Programs', 'Community Connections', 'Established History']
    },
    {
      name: 'Cranbourne East Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.ps@education.vic.gov.au',
      enrolments: '480',
      ratio: '1:15',
      description: 'Modern facility with excellent resources and focus on science and technology education. Outstanding STEM and environmental programs.',
      features: ['STEM Excellence', 'Environmental Education', 'Modern Facilities', 'Science Labs']
    },
    {
      name: 'Fountain Gate Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '15-17 Fountain Gate Drive, Narre Warren 3805',
      phone: '(03) 9704 0000',
      email: 'fountaingate.ps@education.vic.gov.au',
      enrolments: '450',
      ratio: '1:14',
      description: 'Conveniently located school with strong community connections. Diverse and inclusive community near shopping center.',
      features: ['Multicultural Programs', 'Community Connections', 'Convenient Location', 'Inclusive Environment']
    },
    {
      name: 'Pakenham Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.ps@education.vic.gov.au',
      enrolments: '380',
      ratio: '1:13',
      description: 'Long-established school with strong community ties and comprehensive programs. Rich history serving Pakenham for decades.',
      features: ['Music Excellence', 'Art Programs', 'Community Ties', 'Established History']
    },
    {
      name: 'John Henry Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Pakenham',
      address: '8-10 John Henry Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'johnhenry.ps@education.vic.gov.au',
      enrolments: '1,003',
      ratio: '1:15',
      description: 'Large school with comprehensive programs and excellent facilities. Strong focus on student achievement and holistic development.',
      features: ['Performing Arts', 'Sports Programs', 'STEM Focus', 'Wellbeing Support']
    },
    {
      name: 'Emerald Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Emerald',
      address: '8-10 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emerald.ps@education.vic.gov.au',
      enrolments: '476',
      ratio: '1:12',
      description: 'Rural school with emphasis on nature-based learning and environmental education. Unique rural setting with outdoor focus.',
      features: ['Environmental Education', 'Outdoor Learning', 'Nature-based Learning', 'Rural Setting']
    },
    {
      name: 'Officer Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '15-17 Officer Road, Officer 3809',
      phone: '(03) 5941 0000',
      email: 'officer.ps@education.vic.gov.au',
      enrolments: '420',
      ratio: '1:14',
      description: 'Growing community school with modern facilities and comprehensive programs. Dynamic growth and modern approach.',
      features: ['Modern Facilities', 'Community Focus', 'Arts Programs', 'Growing School']
    },
    // SECONDARY SCHOOLS
    {
      name: 'Berwick Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '25-27 Berwick Secondary Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'berwick.sc@education.vic.gov.au',
      enrolments: '1,200',
      ratio: '1:12',
      description: 'Large, comprehensive secondary school with excellent academic results and extensive extracurricular programs. Outstanding VCE results.',
      features: ['VCE Excellence', 'Music Academy', 'Sports Academy', 'Wellbeing Support']
    },
    {
      name: 'Nossal High School',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '12-14 Nossal Road, Berwick 3806',
      phone: '(03) 9707 0000',
      email: 'nossal.hs@education.vic.gov.au',
      enrolments: '800',
      ratio: '1:11',
      description: 'Selective entry school with focus on academic excellence and STEM education. Strong university pathways for gifted students.',
      features: ['Selective Entry', 'STEM Academy', 'University Pathways', 'Academic Excellence']
    },
    {
      name: 'Cranbourne Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne',
      address: '25-27 Cranbourne Secondary Road, Cranbourne 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourne.sc@education.vic.gov.au',
      enrolments: '1,100',
      ratio: '1:13',
      description: 'Comprehensive secondary school with strong community connections and diverse programs. Well-rounded VCE, VCAL and VET programs.',
      features: ['VCE Programs', 'Music Excellence', 'Arts Programs', 'Community Connections']
    },
    {
      name: 'Cranbourne East Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne East',
      address: '45-47 Berwick-Cranbourne Road, Cranbourne East 3977',
      phone: '(03) 5996 0000',
      email: 'cranbourneeast.sc@education.vic.gov.au',
      enrolments: '900',
      ratio: '1:12',
      description: 'Modern school with excellent facilities and comprehensive programs. Strong focus on technology integration and STEM learning.',
      features: ['STEM Excellence', 'Performing Arts', 'Modern Facilities', 'Technology Focus']
    },
    {
      name: 'Pakenham Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Pakenham',
      address: '25-27 Main Street, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'pakenham.sc@education.vic.gov.au',
      enrolments: '1,200',
      ratio: '1:12',
      description: 'Large, comprehensive secondary school with excellent academic results and extensive programs. Outstanding VCE results and music program.',
      features: ['VCE Excellence', 'Music Programs', 'Arts Excellence', 'Wellbeing Support']
    },
    {
      name: 'Lakeside College',
      type: 'combined',
      levels: 'Prep - Year 12',
      suburb: 'Pakenham',
      address: '12-14 Lakeside Drive, Pakenham 3810',
      phone: '(03) 5941 0000',
      email: 'lakeside.college@education.vic.gov.au',
      enrolments: '620',
      ratio: '1:12',
      description: 'Combined primary and secondary school with comprehensive programs. Unique Prep-12 approach providing educational continuity.',
      features: ['P-12 Continuity', 'VCE Programs', 'Music Excellence', 'Community Focus']
    },
    {
      name: 'Emerald Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Emerald',
      address: '8-10 Emerald-Monbulk Road, Emerald 3782',
      phone: '(03) 5968 0000',
      email: 'emerald.sc@education.vic.gov.au',
      enrolments: '650',
      ratio: '1:11',
      description: 'Rural school with emphasis on environmental education and community connections. Unique rural setting with environmental focus.',
      features: ['Environmental Education', 'Community Connections', 'Rural Setting', 'Sustainability Focus']
    },
    {
      name: 'Koo Wee Rup Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Koo Wee Rup',
      address: '15-17 Koo Wee Rup Road, Koo Wee Rup 3981',
      phone: '(03) 5997 0000',
      email: 'kooweerup.sc@education.vic.gov.au',
      enrolments: '950',
      ratio: '1:12',
      description: 'Comprehensive secondary school with strong community connections and diverse programs. Well-rounded education with community focus.',
      features: ['VCE Programs', 'Music Excellence', 'Arts Programs', 'Community Focus']
    }
  ];

  const suburbs = ['all', ...new Set(schools.map(s => s.suburb))].sort();

  const filteredSchools = schools.filter(school => {
    const typeMatch = selectedType === 'all' || school.type === selectedType;
    const levelsMatch = selectedLevels === 'all' ||
                        (selectedLevels === 'early-years' && school.type === 'kindergarten') ||
                        (selectedLevels === 'primary' && (school.type === 'primary' || school.type === 'combined')) ||
                        (selectedLevels === 'secondary' && (school.type === 'secondary' || school.type === 'combined'));
    const suburbMatch = selectedSuburb === 'all' || school.suburb === selectedSuburb;
    return typeMatch && levelsMatch && suburbMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'kindergarten': return '#e74c3c';
      case 'primary': return '#3498db';
      case 'secondary': return '#9b59b6';
      case 'combined': return '#e67e22';
      default: return '#002b7f';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kindergarten': return '🧸';
      case 'primary': return '📚';
      case 'secondary': return '🎓';
      case 'combined': return '🏫';
      default: return '🏛️';
    }
  };

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '100px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              Schools Guide: Casey & Cardinia
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Comprehensive guide to kindergartens, primary and secondary schools in Melbourne's southeast.
              Find the perfect education for your family.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '24px',
              marginTop: '48px',
              maxWidth: '800px',
              margin: '48px auto 0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🧸</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>30+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Kindergartens</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>📚</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>70+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Primary Schools</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🎓</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>28+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Secondary Schools</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🏫</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>125+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Total Schools</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '24px',
              color: '#000'
            }}>
              Filter Schools
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>School Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="kindergarten">Kindergartens</option>
                  <option value="primary">Primary Schools</option>
                  <option value="secondary">Secondary Schools</option>
                  <option value="combined">Combined Schools</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>Year Levels</label>
                <select
                  value={selectedLevels}
                  onChange={(e) => setSelectedLevels(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Levels</option>
                  <option value="early-years">Early Years (3-4)</option>
                  <option value="primary">Primary (Prep-6)</option>
                  <option value="secondary">Secondary (7-12)</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>Suburb</label>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Suburbs</option>
                  {suburbs.slice(1).map(suburb => (
                    <option key={suburb} value={suburb}>{suburb}</option>
                  ))}
                </select>
              </div>

              <div style={{
                textAlign: isMobile ? 'left' : 'right',
                marginTop: isMobile ? '16px' : '0'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#002b7f'
                }}>
                  {filteredSchools.length} schools found
                </div>
              </div>
            </div>
          </div>
          {/* Schools Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '32px',
            marginBottom: '80px'
          }}>
            {filteredSchools.map((school, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  padding: '32px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#002b7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e5e5';
                }}
              >
                {/* Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      fontSize: '24px'
                    }}>
                      {getTypeIcon(school.type)}
                    </div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      margin: 0,
                      color: '#000',
                      lineHeight: '1.2'
                    }}>
                      {school.name}
                    </h3>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    backgroundColor: getTypeColor(school.type),
                    color: '#fff',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap'
                  }}>
                    {school.type}
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {school.description}
                </p>

                {/* Details */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '20px',
                  fontSize: '14px',
                  color: '#333'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <span>📍</span>
                    <span>{school.address}</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>📚</span>
                    <span>{school.levels}</span>
                  </div>

                  {school.enrolments && school.enrolments !== 'N/A' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>👥</span>
                      <span>{school.enrolments} students</span>
                    </div>
                  )}

                  {school.ratio && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>🎯</span>
                      <span>Student-Teacher Ratio: {school.ratio}</span>
                    </div>
                  )}

                  {school.phone && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>📞</span>
                      <span>{school.phone}</span>
                    </div>
                  )}

                  {school.hours && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>🕰️</span>
                      <span>{school.hours}</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '24px'
                }}>
                  {school.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: '#666',
                        fontWeight: '500',
                        border: '1px solid #e5e5e5'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Contact Button */}
                <div style={{
                  borderTop: '1px solid #f0f0f0',
                  paddingTop: '20px'
                }}>
                  <a
                    href={school.email ? `mailto:${school.email}` : '#'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#002b7f',
                      textDecoration: 'none',
                      padding: '8px 0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    <span>📧</span>
                    Contact School
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enrollment Information */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000'
            }}>
              School Enrollment Information
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '48px',
              maxWidth: '800px',
              margin: '0 auto 48px auto',
              lineHeight: '1.6'
            }}>
              Important enrollment dates and requirements for schools in Casey and Cardinia Shires.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '32px',
              marginTop: '48px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>🧸</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Kindergarten Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  <p><strong>Deadline:</strong> 30 June for following year</p>
                  <p><strong>Registration:</strong> Online through Council websites</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records</p>
                  <p><strong>Casey:</strong> (03) 9705 5200</p>
                  <p><strong>Cardinia:</strong> (03) 5941 0000</p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>📚</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Primary School Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  <p><strong>Enrollment Period:</strong> Usually Term 2 for following year</p>
                  <p><strong>Contact:</strong> Direct contact with school</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records</p>
                  <p><strong>School Zones:</strong> Check with individual schools for catchment areas</p>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '12px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>🎓</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Secondary School Enrollment
                </h3>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.6',
                  textAlign: 'left'
                }}>
                  <p><strong>Enrollment Period:</strong> Usually Term 2 for following year</p>
                  <p><strong>Contact:</strong> Direct contact with school</p>
                  <p><strong>Required:</strong> Birth certificate, proof of address, immunization records, previous school reports</p>
                  <p><strong>Special Entry:</strong> Some schools have selective entry requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Search CTA */}
        <section style={{
          backgroundColor: '#002b7f',
          color: '#fff',
          padding: isMobile ? '60px 20px' : '80px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              Looking for Properties Near Great Schools?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Our local experts can help you find the perfect home in your preferred school catchment area.
              Search properties by school zones and discover your ideal family home.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/search"
                style={{
                  display: 'flex',
                  padding: isMobile ? '18px 32px' : '16px 32px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  minHeight: '48px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Search Properties by School Zone
              </Link>
              <Link
                href="/appraisal"
                style={{
                  display: 'flex',
                  padding: isMobile ? '18px 32px' : '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #fff',
                  transition: 'all 0.3s ease',
                  minHeight: '48px',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#002b7f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                Get Free Property Appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SchoolsGuidePage;