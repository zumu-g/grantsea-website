'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function SchoolsGuidePage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [selectedLevels, setSelectedLevels] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
  const [selectedSize, setSelectedSize] = React.useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

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

  // Get suburbs with school counts
  const suburbsData = schools.reduce((acc, school) => {
    if (!acc[school.suburb]) {
      acc[school.suburb] = 0;
    }
    acc[school.suburb]++;
    return acc;
  }, {} as { [key: string]: number });
  
  const suburbs = Object.keys(suburbsData).sort();
  
  // Get all unique features
  const allFeatures = Array.from(new Set(schools.flatMap(school => school.features))).sort();
  
  // Common features for quick filters
  const commonFeatures = [
    'STEM Excellence',
    'Music Excellence', 
    'Arts Programs',
    'Sports Academy',
    'Small Classes',
    'Environmental Education',
    'Performing Arts',
    'Community Focus'
  ].filter(feature => allFeatures.includes(feature));

  const filteredSchools = schools.filter(school => {
    const typeMatch = selectedType === 'all' || school.type === selectedType;
    const levelsMatch = selectedLevels === 'all' ||
                        (selectedLevels === 'early-years' && school.type === 'kindergarten') ||
                        (selectedLevels === 'primary' && (school.type === 'primary' || school.type === 'combined')) ||
                        (selectedLevels === 'secondary' && (school.type === 'secondary' || school.type === 'combined'));
    const suburbMatch = selectedSuburb === 'all' || school.suburb === selectedSuburb;
    const searchMatch = searchQuery === '' || 
                       school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       school.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Feature match - school must have ALL selected features
    const featureMatch = selectedFeatures.length === 0 || 
                        selectedFeatures.every(feature => school.features.includes(feature));
    
    // Size match based on enrollment
    const sizeMatch = selectedSize === 'all' || 
                     (selectedSize === 'small' && school.enrolments && parseInt(school.enrolments) <= 300) ||
                     (selectedSize === 'medium' && school.enrolments && parseInt(school.enrolments) > 300 && parseInt(school.enrolments) <= 600) ||
                     (selectedSize === 'large' && school.enrolments && parseInt(school.enrolments) > 600) ||
                     (selectedSize === 'na' && (!school.enrolments || school.enrolments === 'N/A'));
    
    return typeMatch && levelsMatch && suburbMatch && searchMatch && featureMatch && sizeMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'suburb':
        return a.suburb.localeCompare(b.suburb);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'enrolments':
        const aEnrolments = parseInt(a.enrolments || '0');
        const bEnrolments = parseInt(b.enrolments || '0');
        return bEnrolments - aEnrolments;
      default:
        return 0;
    }
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

        {/* Search and Filter Section */}
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
              marginBottom: '32px',
              color: '#000'
            }}>
              Find Schools
            </h2>
            
            {/* Quick Filters */}
            <div style={{
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#666'
              }}>
                Quick Filters
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {[
                  { label: '🎯 Selective Entry', filter: () => { setSearchQuery('selective'); } },
                  { label: '🎵 Music Programs', filter: () => { setSelectedFeatures(['Music Excellence']); setShowAdvancedFilters(true); } },
                  { label: '⚡ STEM Focus', filter: () => { setSelectedFeatures(['STEM Excellence']); setShowAdvancedFilters(true); } },
                  { label: '🌿 Environmental', filter: () => { setSelectedFeatures(['Environmental Education']); setShowAdvancedFilters(true); } },
                  { label: '🏃 Sports Academy', filter: () => { setSelectedFeatures(['Sports Academy']); setShowAdvancedFilters(true); } },
                  { label: '👨‍👩‍👧 Small Classes', filter: () => { setSelectedFeatures(['Small Classes']); setShowAdvancedFilters(true); } },
                ].map((quick, idx) => (
                  <button
                    key={idx}
                    onClick={quick.filter}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f0f4ff',
                      color: '#002b7f',
                      border: '1px solid #e0e8ff',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#002b7f';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#002b7f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f4ff';
                      e.currentTarget.style.color = '#002b7f';
                      e.currentTarget.style.borderColor = '#e0e8ff';
                    }}
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Bar */}
            <div style={{
              marginBottom: '32px'
            }}>
              <div style={{
                position: 'relative',
                maxWidth: '600px'
              }}>
                <input
                  type="text"
                  placeholder="Search schools by name, suburb, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 24px 16px 50px',
                    fontSize: '16px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '50px',
                    backgroundColor: '#f8f8f8',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#002b7f';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.backgroundColor = '#f8f8f8';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                  color: '#666'
                }}>
                  🔍
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '20px',
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
                  <option value="all">All Suburbs ({schools.length} schools)</option>
                  {suburbs.map(suburb => (
                    <option key={suburb} value={suburb}>
                      {suburb} ({suburbsData[suburb]} {suburbsData[suburb] === 1 ? 'school' : 'schools'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333'
                }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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
                  <option value="name">School Name</option>
                  <option value="suburb">Suburb</option>
                  <option value="type">School Type</option>
                  <option value="enrolments">Enrollment Size</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle and Results Count */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '24px',
              marginBottom: showAdvancedFilters ? '24px' : '0',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: showAdvancedFilters ? '#002b7f' : '#f8f8f8',
                  color: showAdvancedFilters ? '#fff' : '#000',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#f8f8f8';
                  }
                }}
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="4" y1="21" x2="4" y2="14" />
                  <line x1="4" y1="10" x2="4" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="3" />
                  <line x1="20" y1="21" x2="20" y2="16" />
                  <line x1="20" y1="12" x2="20" y2="3" />
                  <line x1="1" y1="14" x2="7" y2="14" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                  <line x1="17" y1="16" x2="23" y2="16" />
                </svg>
                Advanced Filters
                {(selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <span style={{
                    backgroundColor: showAdvancedFilters ? '#fff' : '#002b7f',
                    color: showAdvancedFilters ? '#002b7f' : '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {selectedFeatures.length + (selectedSize !== 'all' ? 1 : 0)}
                  </span>
                )}
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#002b7f'
                }}>
                  {filteredSchools.length} schools found
                </div>
                {(selectedType !== 'all' || selectedSuburb !== 'all' || selectedLevels !== 'all' || 
                  searchQuery !== '' || selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedSuburb('all');
                      setSelectedLevels('all');
                      setSearchQuery('');
                      setSelectedFeatures([]);
                      setSelectedSize('all');
                      setShowAdvancedFilters(false);
                    }}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: 'transparent',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '12px',
                padding: '24px',
                marginTop: '0'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '32px'
                }}>
                  {/* School Size Filter */}
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#000'
                    }}>
                      School Size
                    </h4>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px'
                    }}>
                      {[
                        { value: 'all', label: 'All Sizes' },
                        { value: 'small', label: 'Small (≤300)' },
                        { value: 'medium', label: 'Medium (300-600)' },
                        { value: 'large', label: 'Large (>600)' }
                      ].map(size => (
                        <label
                          key={size.value}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            backgroundColor: selectedSize === size.value ? '#e8f4f8' : '#fff',
                            border: `1px solid ${selectedSize === size.value ? '#002b7f' : '#e5e5e5'}`,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="radio"
                            name="schoolSize"
                            value={size.value}
                            checked={selectedSize === size.value}
                            onChange={(e) => setSelectedSize(e.target.value)}
                            style={{ display: 'none' }}
                          />
                          {size.label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Features Filter */}
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#000'
                    }}>
                      Special Programs & Features
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {commonFeatures.map(feature => (
                        <label
                          key={feature}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '8px 16px',
                            backgroundColor: selectedFeatures.includes(feature) ? '#002b7f' : '#fff',
                            color: selectedFeatures.includes(feature) ? '#fff' : '#000',
                            border: `1px solid ${selectedFeatures.includes(feature) ? '#002b7f' : '#e5e5e5'}`,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFeatures([...selectedFeatures, feature]);
                              } else {
                                setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                              }
                            }}
                            style={{ display: 'none' }}
                          />
                          {feature}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedFeatures.length > 0 || selectedSize !== 'all') && (
                  <div style={{
                    textAlign: 'right',
                    marginTop: '24px'
                  }}>
                    <button
                      onClick={() => {
                        setSelectedFeatures([]);
                        setSelectedSize('all');
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: '#002b7f',
                        border: '1px solid #002b7f',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#002b7f';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#002b7f';
                      }}
                    >
                      Clear Advanced Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Suburb Indicator */}
          {selectedSuburb !== 'all' && (
            <div style={{
              backgroundColor: '#e8f4f8',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '8px'
                }}>
                  {selectedSuburb}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  margin: 0
                }}>
                  {filteredSchools.length} {filteredSchools.length === 1 ? 'school' : 'schools'} in this suburb
                </p>
              </div>
              <button
                onClick={() => setSelectedSuburb('all')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001a5c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View All Suburbs
              </button>
            </div>
          )}

          {/* Suburbs Overview - Only show when no suburb is selected */}
          {selectedSuburb === 'all' && searchQuery === '' && (
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              padding: '32px',
              marginBottom: '48px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#000'
              }}>
                Schools by Suburb
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {suburbs.map(suburb => {
                  const schoolsInSuburb = schools.filter(s => s.suburb === suburb);
                  const kindergartens = schoolsInSuburb.filter(s => s.type === 'kindergarten').length;
                  const primaries = schoolsInSuburb.filter(s => s.type === 'primary').length;
                  const secondaries = schoolsInSuburb.filter(s => s.type === 'secondary').length;
                  const combined = schoolsInSuburb.filter(s => s.type === 'combined').length;
                  
                  return (
                    <div
                      key={suburb}
                      onClick={() => setSelectedSuburb(suburb)}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#002b7f';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e5e5';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <h4 style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#000'
                      }}>
                        {suburb}
                      </h4>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#002b7f',
                        marginBottom: '12px'
                      }}>
                        {suburbsData[suburb]}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.5'
                      }}>
                        {kindergartens > 0 && <div>🧸 {kindergartens} Kindergarten{kindergartens > 1 ? 's' : ''}</div>}
                        {primaries > 0 && <div>📚 {primaries} Primary</div>}
                        {secondaries > 0 && <div>🎓 {secondaries} Secondary</div>}
                        {combined > 0 && <div>🏫 {combined} Combined</div>}
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        color: '#002b7f',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        View →
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Schools Results Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '60px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {/* Schools Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '80px'
          }}>
            {filteredSchools.map((school, idx) => (
              <Link 
                key={idx}
                href={`/school/${school.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    height: 'fit-content',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                  }}
                >
                  {/* School Image */}
                  <div style={{
                    width: '100%',
                    height: '320px',
                    backgroundColor: '#f8f8f8',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={`https://images.unsplash.com/photo-${school.type === 'kindergarten' ? '1607696421817-0e94b57e2e2e' : school.type === 'primary' ? '1580582932707-520aed937b7b' : '1523050854a4c978'}`}
                      alt={school.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      padding: '6px 12px',
                      backgroundColor: getTypeColor(school.type),
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {school.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{
                    padding: '32px',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* School Name and Location */}
                    <div style={{
                      marginBottom: '16px'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: '0 0 8px 0',
                        color: '#000',
                        lineHeight: '1.3'
                      }}>
                        {school.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        margin: '0 0 4px 0'
                      }}>
                        {school.suburb}
                      </p>
                      <p style={{
                        fontSize: '14px',
                        color: '#002b7f',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {school.levels}
                      </p>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      marginBottom: '20px',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flex: 1
                    }}>
                      {school.description}
                    </p>

                    {/* Key Stats */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px',
                      padding: '16px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '12px'
                    }}>
                      {school.enrolments && school.enrolments !== 'N/A' && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#002b7f'
                          }}>
                            {school.enrolments}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>
                            Students
                          </div>
                        </div>
                      )}
                      {school.ratio && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#002b7f'
                          }}>
                            {school.ratio}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#666'
                          }}>
                            Ratio
                          </div>
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
                      {school.features.slice(0, 3).map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: '#f0f4ff',
                            borderRadius: '12px',
                            fontSize: '11px',
                            color: '#002b7f',
                            fontWeight: '500'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                      {school.features.length > 3 && (
                        <span style={{
                          padding: '4px 8px',
                          fontSize: '11px',
                          color: '#666',
                          fontWeight: '500'
                        }}>
                          +{school.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View More Button */}
                    <div style={{
                      paddingTop: '20px',
                      borderTop: '1px solid #f0f0f0',
                      textAlign: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        color: '#002b7f',
                        fontWeight: '600'
                      }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#000'
            }}>
              Need Help Choosing a School?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Our local education experts can help you find the perfect school for your family's needs and preferences.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  padding: '14px 28px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#001a5c';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact Our Team
              </Link>
              <Link
                href="/search"
                style={{
                  display: 'inline-flex',
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #002b7f',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#002b7f';
                }}
              >
                Search Properties by School
              </Link>
            </div>
          </div>
        </section>

        {/* Enrollment Information - ON.com Layout Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '80px 20px' : '120px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '40px' : '80px',
              alignItems: 'center',
              marginBottom: '80px'
            }}>
              {/* Left Content */}
              <div>
                <h2 style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '300',
                  lineHeight: '1.1',
                  marginBottom: '32px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  School Enrollment Information
                </h2>
                <p style={{
                  fontSize: '18px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  Important enrollment dates and requirements for schools in Casey and Cardinia Shires. Understanding the enrollment process is crucial for securing your child's place in their preferred school.
                </p>
                <div style={{
                  marginBottom: '40px'
                }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Key Enrollment Dates
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {[
                      'Kindergarten: June 30 for following year',
                      'Primary School: Term 2 for following year',
                      'Secondary School: May-August enrollment period',
                      'Private Schools: Often 12+ months in advance'
                    ].map((item, idx) => (
                      <li key={idx} style={{
                        fontSize: '16px',
                        color: '#666',
                        marginBottom: '12px',
                        paddingLeft: '20px',
                        position: 'relative'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: '0',
                          color: '#002b7f',
                          fontWeight: '600'
                        }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Visual */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                backgroundColor: '#e8f4f8',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '40px'
                }}>
                  <div style={{
                    fontSize: '64px',
                    marginBottom: '24px'
                  }}>📚</div>
                  <h4 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#002b7f',
                    marginBottom: '16px'
                  }}>
                    Plan Ahead
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#004080',
                    lineHeight: '1.5'
                  }}>
                    Early enrollment ensures your child secures their place in your preferred school
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Cards Grid */}

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