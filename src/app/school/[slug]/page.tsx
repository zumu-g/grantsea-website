'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useParams } from 'next/navigation';

export default function SchoolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isMobile, setIsMobile] = React.useState(false);
  const [school, setSchool] = React.useState<any>(null);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // All schools data (same as in schools guide)
  const schools = [
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
      features: ['Play-based Learning', 'School Readiness', 'Outdoor Play Areas', 'Experienced Educators'],
      principal: 'Sarah Mitchell',
      established: '2018',
      website: 'www.berwickfields.vic.gov.au',
      uniform: 'Optional play clothes',
      specialPrograms: ['Early Literacy', 'Nature Play', 'Music & Movement'],
      facilities: ['Large Playground', 'Art Studio', 'Kitchen Garden', 'Sensory Room']
    },
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
      features: ['Music Excellence', 'Arts Programs', 'STEM Focus', 'Strong Community'],
      principal: 'David Chen',
      established: '1962',
      website: 'www.berwickps.vic.edu.au',
      uniform: 'Navy and white uniform required',
      specialPrograms: ['Performing Arts', 'STEM Academy', 'Indonesian Language', 'Reading Recovery'],
      facilities: ['Library', 'Computer Lab', 'Music Room', 'Art Studio', 'Sports Courts', 'Vegetable Garden']
    },
    // Add more schools as needed...
  ];

  React.useEffect(() => {
    // Find school by slug
    const foundSchool = schools.find(s => 
      s.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
    );
    setSchool(foundSchool);
  }, [slug]);

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

  if (!school) {
    return (
      <>
        <OncomHeader />
        <main style={{
          paddingTop: isMobile ? '90px' : '200px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1>School Not Found</h1>
            <Link href="/schools-guide" style={{ color: '#002b7f' }}>
              Back to Schools Guide
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <OncomHeader />
      
      <main style={{
        paddingTop: isMobile ? '90px' : '200px',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: isMobile ? '50vh' : '60vh',
          minHeight: '400px',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("https://images.unsplash.com/photo-${school.type === 'kindergarten' ? '1607696421817-0e94b57e2e2e' : school.type === 'primary' ? '1580582932707-520aed937b7b' : '1523050854a4c978'}")`,
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
            alignItems: 'flex-start',
            color: '#fff',
            padding: isMobile ? '0 20px' : '0 40px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              padding: '6px 12px',
              backgroundColor: getTypeColor(school.type),
              color: '#fff',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'capitalize',
              marginBottom: '16px'
            }}>
              {school.type}
            </div>
            
            <h1 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '300',
              lineHeight: '1.1',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              {school.name}
            </h1>
            
            <p style={{
              fontSize: isMobile ? '16px' : '20px',
              marginBottom: '24px',
              opacity: 0.9,
              maxWidth: '600px'
            }}>
              {school.description}
            </p>

            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Location</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>{school.suburb}</div>
              </div>
              <div>
                <div style={{ fontSize: '14px', opacity: 0.8 }}>Year Levels</div>
                <div style={{ fontSize: '16px', fontWeight: '500' }}>{school.levels}</div>
              </div>
              {school.enrolments && school.enrolments !== 'N/A' && (
                <div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Students</div>
                  <div style={{ fontSize: '16px', fontWeight: '500' }}>{school.enrolments}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '20px' : '30px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {school.phone && (
              <a
                href={`tel:${school.phone}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                📞 Call School
              </a>
            )}
            {school.email && (
              <a
                href={`mailto:${school.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '2px solid #002b7f'
                }}
              >
                📧 Email School
              </a>
            )}
            {school.website && (
              <a
                href={`https://${school.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  backgroundColor: '#fff',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '2px solid #002b7f'
                }}
              >
                🌐 Visit Website
              </a>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section style={{
          padding: isMobile ? '60px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
            gap: isMobile ? '40px' : '60px'
          }}>
            {/* Left Column - Main Info */}
            <div>
              {/* About Section */}
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '300',
                  marginBottom: '24px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  About {school.name}
                </h2>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  {school.description}
                </p>
              </div>

              {/* Special Programs */}
              {school.specialPrograms && (
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#000'
                  }}>
                    Special Programs
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '16px'
                  }}>
                    {school.specialPrograms.map((program: string, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          padding: '16px',
                          backgroundColor: '#f8f8f8',
                          borderRadius: '8px',
                          border: '1px solid #e5e5e5'
                        }}
                      >
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#002b7f'
                        }}>
                          {program}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Facilities */}
              {school.facilities && (
                <div style={{ marginBottom: '48px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    color: '#000'
                  }}>
                    Facilities
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    {school.facilities.map((facility: string, idx: number) => (
                      <span
                        key={idx}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#f0f4ff',
                          borderRadius: '20px',
                          fontSize: '14px',
                          color: '#002b7f',
                          fontWeight: '500'
                        }}
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Quick Info */}
            <div>
              <div style={{
                backgroundColor: '#f8f8f8',
                padding: '24px',
                borderRadius: '12px',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#000'
                }}>
                  School Information
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Principal</div>
                    <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                      {school.principal || 'Contact school for details'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Established</div>
                    <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                      {school.established || 'Contact school for details'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                      {school.address}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Phone</div>
                    <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                      {school.phone}
                    </div>
                  </div>

                  {school.hours && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Hours</div>
                      <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                        {school.hours}
                      </div>
                    </div>
                  )}

                  {school.uniform && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Uniform</div>
                      <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                        {school.uniform}
                      </div>
                    </div>
                  )}

                  {school.enrolments && school.enrolments !== 'N/A' && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Enrollment</div>
                      <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                        {school.enrolments} students
                      </div>
                    </div>
                  )}

                  {school.ratio && (
                    <div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Student-Teacher Ratio</div>
                      <div style={{ fontSize: '16px', color: '#000', fontWeight: '500' }}>
                        {school.ratio}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{
                  marginTop: '24px',
                  paddingTop: '20px',
                  borderTop: '1px solid #e5e5e5'
                }}>
                  <Link
                    href="/search"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '14px 20px',
                      backgroundColor: '#002b7f',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Find Properties Near This School
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Schools Guide */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '40px 20px' : '60px 40px',
          textAlign: 'center'
        }}>
          <Link
            href="/schools-guide"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              color: '#002b7f',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            ← Back to Schools Guide
          </Link>
        </section>
      </main>
    </>
  );
}