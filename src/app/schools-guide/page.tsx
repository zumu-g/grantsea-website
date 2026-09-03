'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { SCHOOLS } from '@/data/schools';

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

  const schools = SCHOOLS;

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
    // on.com style - all black badges
    return '#000';
  };

  const getTypeIcon = (type: string) => {
    // Clean on.com style - no symbols
    return '';
  };

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - on.com style */}
        <section style={{
          padding: isMobile ? '60px 20px 40px' : '80px max(2rem, 3.33vw) 60px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : '72px',
              fontWeight: '700',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              margin: '0 0 20px 0',
              color: '#000'
            }}>
              Schools Guide
            </h1>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 0 48px 0',
              lineHeight: '1.6'
            }}>
              Comprehensive guide to kindergartens, primary and secondary schools in Melbourne's south-east
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '24px' : '48px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'kindergarten').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Kindergartens</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'primary').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Primary</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.filter(s => s.type === 'secondary').length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Secondary</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>{schools.length}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: '500'
                }}>Total</div>
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
            
            {/* Quick Filters - on.com style */}
            <div style={{
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Quick Filters
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                {[
                  { label: 'Selective Entry', filter: () => { setSearchQuery('selective'); } },
                  { label: 'Music Programs', filter: () => { setSelectedFeatures(['Music Excellence']); setShowAdvancedFilters(true); } },
                  { label: 'STEM Focus', filter: () => { setSelectedFeatures(['STEM Excellence']); setShowAdvancedFilters(true); } },
                  { label: 'Environmental', filter: () => { setSelectedFeatures(['Environmental Education']); setShowAdvancedFilters(true); } },
                  { label: 'Sports Academy', filter: () => { setSelectedFeatures(['Sports Academy']); setShowAdvancedFilters(true); } },
                  { label: 'Small Classes', filter: () => { setSelectedFeatures(['Small Classes']); setShowAdvancedFilters(true); } },
                ].map((quick, idx) => (
                  <button
                    key={idx}
                    onClick={quick.filter}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '1px solid #e5e5e5',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    {quick.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search Bar - on.com style */}
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
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000';
                    e.target.style.backgroundColor = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e5e5';
                    e.target.style.backgroundColor = '#fff';
                  }}
                />
                <svg
                  style={{
                    position: 'absolute',
                    left: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#666'
                  }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {/* Filters - on.com style */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>School Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
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
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Year Levels</label>
                <select
                  value={selectedLevels}
                  onChange={(e) => setSelectedLevels(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
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
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Suburb</label>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
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
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontSize: '15px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center'
                  }}
                >
                  <option value="name">School Name</option>
                  <option value="suburb">Suburb</option>
                  <option value="type">School Type</option>
                  <option value="enrolments">Enrollment Size</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle and Results Count - on.com style */}
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
                  backgroundColor: showAdvancedFilters ? '#000' : '#fff',
                  color: showAdvancedFilters ? '#fff' : '#000',
                  border: '1px solid #e5e5e5',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showAdvancedFilters) {
                    e.currentTarget.style.backgroundColor = '#fff';
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
                    backgroundColor: showAdvancedFilters ? '#fff' : '#000',
                    color: showAdvancedFilters ? '#000' : '#fff',
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
                  color: '#000'
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
                      padding: '10px 20px',
                      backgroundColor: 'transparent',
                      color: '#666',
                      border: '1px solid #e5e5e5',
                      borderRadius: '100px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#666';
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters Panel - on.com style */}
            {showAdvancedFilters && (
              <div style={{
                backgroundColor: '#f8f8f8',
                borderRadius: '16px',
                padding: '32px',
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
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
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
                            padding: '12px 16px',
                            backgroundColor: selectedSize === size.value ? '#000' : '#fff',
                            color: selectedSize === size.value ? '#fff' : '#000',
                            border: `1px solid ${selectedSize === size.value ? '#000' : '#e5e5e5'}`,
                            borderRadius: '100px',
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
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
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
                            padding: '10px 18px',
                            backgroundColor: selectedFeatures.includes(feature) ? '#000' : '#fff',
                            color: selectedFeatures.includes(feature) ? '#fff' : '#000',
                            border: `1px solid ${selectedFeatures.includes(feature) ? '#000' : '#e5e5e5'}`,
                            borderRadius: '100px',
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
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: '1px solid #e5e5e5',
                        borderRadius: '100px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#000';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#666';
                        e.currentTarget.style.borderColor = '#e5e5e5';
                      }}
                    >
                      Clear Advanced Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Selected Suburb Indicator - on.com style */}
          {selectedSuburb !== 'all' && (
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '16px',
              padding: '24px 32px',
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
                  color: '#000',
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
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View All Suburbs
              </button>
            </div>
          )}

          {/* Suburbs Overview - on.com style */}
          {selectedSuburb === 'all' && searchQuery === '' && (
            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '48px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
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
                        e.currentTarget.style.borderColor = '#000';
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
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.02em'
                      }}>
                        {suburbsData[suburb]}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.8'
                      }}>
                        {kindergartens > 0 && <div>{kindergartens} Kindergarten{kindergartens > 1 ? 's' : ''}</div>}
                        {primaries > 0 && <div>{primaries} Primary</div>}
                        {secondaries > 0 && <div>{secondaries} Secondary</div>}
                        {combined > 0 && <div>{combined} Combined</div>}
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        right: '16px',
                        color: '#000',
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
                      src={school.image || `https://images.unsplash.com/photo-${school.type === 'kindergarten' ? '1607696421817-0e94b57e2e2e?w=800&q=80' : school.type === 'primary' ? '1580582932707-520aed937b7b?w=800&q=80' : '1523050854a4c978d-8df90110c9f1?w=800&q=80'}`}
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
                        color: '#000',
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

                    {/* Key Stats - on.com style */}
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
                            color: '#000'
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
                            color: '#000'
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

                    {/* Features - on.com style */}
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
                            padding: '6px 12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '100px',
                            fontSize: '11px',
                            color: '#000',
                            fontWeight: '500'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                      {school.features.length > 3 && (
                        <span style={{
                          padding: '6px 12px',
                          fontSize: '11px',
                          color: '#666',
                          fontWeight: '500'
                        }}>
                          +{school.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* View More Button - on.com style */}
                    <div style={{
                      paddingTop: '20px',
                      borderTop: '1px solid #f0f0f0',
                      textAlign: 'center',
                      marginTop: 'auto'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        color: '#000',
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
                          color: '#000',
                          fontWeight: '600'
                        }}>-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Visual - on.com style */}
              <div style={{
                position: 'relative',
                aspectRatio: '4/3',
                backgroundColor: '#f5f5f5',
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
                  <svg
                    style={{ width: '64px', height: '64px', marginBottom: '24px' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h4 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '16px'
                  }}>
                    Plan Ahead
                  </h4>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.5'
                  }}>
                    Early enrollment ensures your child secures their place in your preferred school
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Cards Grid */}

            {/* Enhanced Cards Grid - on.com style */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
              marginTop: '48px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>01</div>
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
                  lineHeight: '1.7',
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
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>02</div>
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
                  lineHeight: '1.7',
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
                borderRadius: '16px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{
                  fontSize: '28px',
                  marginBottom: '20px',
                  fontWeight: '700',
                  color: '#000'
                }}>03</div>
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
                  lineHeight: '1.7',
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


        {/* Property Search CTA - on.com style dark section */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: isMobile ? '80px 20px' : '100px max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '700',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Looking for Properties Near Great Schools?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.85,
              lineHeight: '1.6',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Search properties by school zone to find your perfect family home in the right catchment area.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/buy"
                style={{
                  display: 'flex',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
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
                Search by School Zone
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '100px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                }}
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SchoolsGuidePage;