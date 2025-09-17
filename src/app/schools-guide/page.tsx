'use client';

import { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';

export default function SchoolsGuidePage() {
  const [selectedType, setSelectedType] = useState<'all' | 'primary' | 'secondary' | 'private'>('all');
  const [selectedSuburb, setSelectedSuburb] = useState<string>('all');

  const schools = [
    {
      name: 'Berwick Grammar School',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Officer',
      address: '80 Tivendale Road, Officer',
      phone: '(03) 8102 6400',
      website: 'berwickgrammar.vic.edu.au',
      description: 'Independent boys school offering exceptional academic programs and extensive co-curricular opportunities.',
      features: ['IB Program', 'Elite Sports', 'STEM Excellence', 'Performing Arts'],
      enrolments: '900+'
    },
    {
      name: 'Nossal High School',
      type: 'secondary',
      levels: 'Year 9 - 12',
      suburb: 'Berwick',
      address: '100 Cloverdale Road, Berwick',
      phone: '(03) 8762 6000',
      website: 'nossalhs.vic.edu.au',
      description: 'Selective-entry state school for high-achieving students, consistently ranking among Victoria\'s top schools.',
      features: ['Selective Entry', 'Academic Excellence', 'Science Specialization', 'University Partnerships'],
      enrolments: '850+'
    },
    {
      name: 'Haileybury College',
      type: 'private',
      levels: 'ELC - Year 12',
      suburb: 'Berwick',
      address: '39 Gloucester Avenue, Berwick',
      phone: '(03) 9904 6000',
      website: 'haileybury.com.au',
      description: 'Leading independent co-educational school with strong academic results and comprehensive programs.',
      features: ['IB & VCE', 'Boarding Options', 'International Programs', 'Elite Facilities'],
      enrolments: '1200+'
    },
    {
      name: 'St Margaret\'s School',
      type: 'private',
      levels: 'ELC - Year 12',
      suburb: 'Berwick',
      address: '27-47 Gloucester Avenue, Berwick',
      phone: '(03) 9703 8111',
      website: 'stmargarets.vic.edu.au',
      description: 'Independent girls school focused on empowering young women through education and leadership.',
      features: ['Girls Education', 'Leadership Programs', 'Creative Arts', 'Global Connections'],
      enrolments: '700+'
    },
    {
      name: 'Berwick College',
      type: 'secondary',
      levels: 'Year 7 - 12',
      suburb: 'Berwick',
      address: '30 Manuka Road, Berwick',
      phone: '(03) 8768 1000',
      website: 'berwickcollege.vic.edu.au',
      description: 'Government secondary school with strong STEM programs and vocational pathways.',
      features: ['SEAL Program', 'VET Options', 'Sports Academy', 'Dance Academy'],
      enrolments: '1400+'
    },
    {
      name: 'Berwick Fields Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '90 Parkhill Drive, Berwick',
      phone: '(03) 9707 1510',
      website: 'berwickfieldsprimary.vic.edu.au',
      description: 'Modern primary school with innovative learning spaces and strong community engagement.',
      features: ['STEM Focus', 'Japanese Program', 'Kitchen Garden', 'Performing Arts'],
      enrolments: '750+'
    },
    {
      name: 'Kambrya College',
      type: 'secondary',
      levels: 'Year 7 - 12',
      suburb: 'Berwick',
      address: '68-74 Bemersyde Drive, Berwick',
      phone: '(03) 9707 7600',
      website: 'kambrya.vic.edu.au',
      description: 'Progressive government school with excellent facilities and diverse educational programs.',
      features: ['Basketball Academy', 'Performing Arts', 'STEAM Programs', 'International Students'],
      enrolments: '1100+'
    },
    {
      name: 'Cranbourne East Secondary College',
      type: 'secondary',
      levels: 'Year 7 - 12',
      suburb: 'Cranbourne East',
      address: '230 Hall Road, Cranbourne East',
      phone: '(03) 5991 0400',
      website: 'cranbourneeastsc.vic.edu.au',
      description: 'New state-of-the-art secondary college with modern facilities and innovative programs.',
      features: ['New Facilities', 'STEM Center', 'Sports Excellence', 'Music Program'],
      enrolments: '1300+'
    },
    {
      name: 'St Peter\'s College',
      type: 'private',
      levels: 'Year 7 - 12',
      suburb: 'Cranbourne East',
      address: '15 Horswood Road, Cranbourne East',
      phone: '(03) 5995 5000',
      website: 'stpeterscranbourne.catholic.edu.au',
      description: 'Catholic co-educational college with strong pastoral care and academic programs.',
      features: ['Catholic Education', 'VET Pathways', 'Sports Program', 'Community Service'],
      enrolments: '1500+'
    },
    {
      name: 'Casey Grammar School',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Cranbourne East',
      address: '70 Linsell Boulevard, Cranbourne East',
      phone: '(03) 5991 1800',
      website: 'caseygrammar.vic.edu.au',
      description: 'Independent co-educational school with small class sizes and personalized learning.',
      features: ['Small Classes', 'Individual Focus', 'Modern Campus', 'Technology Integration'],
      enrolments: '600+'
    },
    {
      name: 'Narre Warren South P-12 College',
      type: 'combined',
      levels: 'Prep - Year 12',
      suburb: 'Narre Warren South',
      address: '260 Ormond Road, Narre Warren South',
      phone: '(03) 9704 3333',
      website: 'nwsc.vic.edu.au',
      description: 'Comprehensive P-12 college offering continuous education from prep to VCE.',
      features: ['P-12 Continuity', 'Language Programs', 'Arts Focus', 'Community Hub'],
      enrolments: '2000+'
    },
    {
      name: 'Alkira Secondary College',
      type: 'secondary',
      levels: 'Year 7 - 12',
      suburb: 'Cranbourne North',
      address: '1 Alkira Avenue, Cranbourne North',
      phone: '(03) 5991 3500',
      website: 'alkirasc.vic.edu.au',
      description: 'Government secondary college with strong academic and vocational programs.',
      features: ['Select Entry', 'Music Excellence', 'Sports Programs', 'Technology Focus'],
      enrolments: '1600+'
    },
    {
      name: 'Clyde Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde',
      address: '190 Grices Road, Clyde',
      phone: '(03) 5998 1184',
      website: 'clydeps.vic.edu.au',
      description: 'Growing primary school serving the rapidly developing Clyde community.',
      features: ['Community Focus', 'Environmental Programs', 'Digital Learning', 'Before/After Care'],
      enrolments: '500+'
    },
    {
      name: 'Hillcrest Christian College',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Clyde North',
      address: '1159 Berwick-Cranbourne Road, Clyde North',
      phone: '(03) 9547 5000',
      website: 'hillcrest.vic.edu.au',
      description: 'Christian college offering values-based education with strong academic outcomes.',
      features: ['Christian Values', 'Academic Excellence', 'Pastoral Care', 'Co-curricular Programs'],
      enrolments: '1100+'
    },
    {
      name: 'Rivercrest Christian College',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Clyde North',
      address: '180 Grices Road, Clyde North',
      phone: '(03) 5330 4600',
      website: 'rivercrest.vic.edu.au',
      description: 'New Christian college with modern facilities and innovative learning approaches.',
      features: ['New Campus', 'Small Classes', 'STEM Programs', 'Outdoor Education'],
      enrolments: '400+'
    }
  ];

  const suburbs = ['all', ...new Set(schools.map(s => s.suburb))].sort();

  const filteredSchools = schools.filter(school => {
    const typeMatch = selectedType === 'all' ||
                      (selectedType === 'primary' && school.type === 'primary') ||
                      (selectedType === 'secondary' && (school.type === 'secondary' || school.type === 'combined')) ||
                      (selectedType === 'private' && school.type === 'private');
    const suburbMatch = selectedSuburb === 'all' || school.suburb === selectedSuburb;
    return typeMatch && suburbMatch;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
        {/* Hero Section */}
        <div style={{
          backgroundColor: '#f8f8f8',
          padding: '80px 20px',
          marginBottom: '48px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '300',
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              Grant's Schools Guide
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Comprehensive guide to primary and secondary schools in Casey and Cardinia.
              Find the perfect school for your family in Melbourne's southeast.
            </p>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap'
          }}>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                border: '1px solid #000',
                borderRadius: '2px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                minWidth: '180px'
              }}
            >
              <option value="all">All School Types</option>
              <option value="primary">Primary Schools</option>
              <option value="secondary">Secondary Schools</option>
              <option value="private">Private Schools</option>
            </select>

            <select
              value={selectedSuburb}
              onChange={(e) => setSelectedSuburb(e.target.value)}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                border: '1px solid #000',
                borderRadius: '2px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                minWidth: '180px'
              }}
            >
              <option value="all">All Suburbs</option>
              {suburbs.slice(1).map(suburb => (
                <option key={suburb} value={suburb}>{suburb}</option>
              ))}
            </select>

            <div style={{
              marginLeft: 'auto',
              color: '#666',
              fontSize: '16px',
              padding: '12px 0'
            }}>
              {filteredSchools.length} schools found
            </div>
          </div>

          {/* School Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '64px'
          }}>
            {filteredSchools.map((school, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '32px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '16px'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    margin: 0,
                    color: '#000'
                  }}>
                    {school.name}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: school.type === 'private' ? '#AF272F' : '#000',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {school.type}
                  </span>
                </div>

                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  {school.description}
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginBottom: '16px',
                  fontSize: '14px',
                  color: '#333'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{school.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>{school.levels}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{school.enrolments} students</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '20px'
                }}>
                  {school.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#666'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <a
                    href={`tel:${school.phone}`}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#000',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '2px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#AF272F';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Call School
                  </a>
                  <a
                    href={`https://${school.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#fff',
                      color: '#000',
                      textDecoration: 'none',
                      border: '1px solid #000',
                      borderRadius: '2px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor: '#f8f8f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* School Zones Info */}
          <div style={{
            backgroundColor: '#f8f8f8',
            borderRadius: '12px',
            padding: '48px',
            marginBottom: '48px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '400',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Understanding School Zones
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              marginTop: '32px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  Government Schools
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Enrollment is based on your residential address. Use the Victorian Government's
                  Find My School tool to identify your designated school zone.
                </p>
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  Private Schools
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  No zone restrictions apply. Applications are typically required years in advance.
                  Contact schools directly for enrollment procedures and waiting lists.
                </p>
              </div>
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  marginBottom: '12px'
                }}>
                  Special Entry Schools
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Schools like Nossal High School require entrance exams. Applications typically
                  open in Year 8 for Year 9 entry. Check individual school requirements.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div style={{
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '400',
              marginBottom: '16px'
            }}>
              Looking for Properties Near Top Schools?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '32px',
              opacity: 0.9,
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Our local experts can help you find the perfect home in your preferred school zone.
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
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#AF272F';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
              >
                Browse Properties
              </Link>
              <Link
                href="/appraisal"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  border: '2px solid #fff',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
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
                Get Property Appraisal
              </Link>
            </div>
          </div>
        </div>
      </main>

      <OncomFooter />
      <AIChatWidget />
    </div>
  );
}