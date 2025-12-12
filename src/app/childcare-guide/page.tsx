'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

function ChildcareGuidePage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState('name');
  const [isMobile, setIsMobile] = React.useState(false);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState(false);

  React.useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const childcareCentres = [
    {
      name: 'KingKids Early Learning Berwick',
      type: 'long-day-care',
      suburb: 'Berwick',
      address: '13-15 Langmore Lane, Berwick 3806',
      phone: '(03) 9707 1234',
      email: 'berwick@kingkids.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '80',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators'],
      image: 'https://kingkids.com.au/wp-content/uploads/2022/10/800x498-Img04.jpg'
    },
    {
      name: 'KingKids Early Learning Narre Warren',
      type: 'long-day-care',
      suburb: 'Narre Warren',
      address: '159-167 Fleetwood Drive, Narre Warren 3805',
      phone: '(03) 9704 5678',
      email: 'narrewarren@kingkids.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '75',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators'],
      image: 'https://kingkids.com.au/wp-content/uploads/2022/11/NarreWarren800x498-Img05.jpg'
    },
    {
      name: 'Inspire Early Learning Cranbourne',
      type: 'long-day-care',
      suburb: 'Cranbourne',
      address: '14 Stringybark Place, Cranbourne 3977',
      phone: '(03) 5996 2345',
      email: 'cranbourne@inspire.edu.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 months - 6 years',
      capacity: '120',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Montessori Program', 'Nature Play', 'Meals Provided', 'Qualified Educators'],
      image: 'https://inspire.edu.au/wp-content/uploads/2023/09/Front-Face-820x490.jpg'
    },
    {
      name: 'YMCA Pakenham Early Learning',
      type: 'long-day-care',
      suburb: 'Pakenham',
      address: '8 Henry Street, Pakenham 3810',
      phone: '(03) 5941 3456',
      email: 'pakenham@ymca.org.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '90',
      services: ['Long Day Care', 'Free Kinder', 'Before School Care', 'After School Care'],
      features: ['Community Focused', 'Nature Play', 'Meals Provided', 'Qualified Educators'],
      image: 'https://inspire.edu.au/wp-content/uploads/2022/05/CB_220517_02-820x490.png'
    },
    {
      name: 'Aspire Early Education Officer',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '3 Niki Place, Officer 3809',
      phone: '(03) 5943 2800',
      email: 'officer@aspireearlyeducation.vic.edu.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '70',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Outdoor Play', 'Meals Provided', 'Qualified Educators'],
      image: 'https://www.aspireearlyeducation.vic.edu.au/wp-content/uploads/2023/06/Facade-1024x683.jpg'
    },
    {
      name: 'Community Kids Hampton Park',
      type: 'long-day-care',
      suburb: 'Hampton Park',
      address: '47-53 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 4567',
      email: 'hamptonpark@communitykids.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '85',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Vegetable Garden', 'Outdoor Play Areas', 'Meals Provided', 'Multicultural Programs'],
      image: 'https://api.g8education.edu.au/uploads/Hampton_Park_outdoor_play_area_212017db33.jpg'
    },
    {
      name: 'First Early Learning Endeavour Hills',
      type: 'long-day-care',
      suburb: 'Endeavour Hills',
      address: '25-27 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 5678',
      email: 'endeavourhills@firstearlylearning.vic.edu.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '80',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Nature Play', 'Meals Provided', 'Qualified Educators'],
      image: 'https://firstearlylearning.vic.edu.au/wp-content/uploads/2020/01/IMG_6639-scaled.jpg'
    },
    {
      name: 'KingKids Early Learning Hallam',
      type: 'long-day-care',
      suburb: 'Hallam',
      address: '28-30 Dobell Court, Hallam 3803',
      phone: '(03) 9703 6789',
      email: 'hallam@kingkids.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '75',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators'],
      image: 'https://kingkids.com.au/wp-content/uploads/2022/10/Berwick-400x400-Img05.jpg'
    },
    {
      name: 'Aspire Early Education Clyde North',
      type: 'long-day-care',
      suburb: 'Clyde North',
      address: '40-42 Rix Road, Clyde North 3978',
      phone: '(03) 5998 7890',
      email: 'clydenorth@aspireearlyeducation.vic.edu.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '70',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Outdoor Environment', 'Meals Provided', 'Qualified Educators'],
      image: 'https://www.aspireearlyeducation.vic.edu.au/wp-content/uploads/2023/06/Outdoor-Environment-6.jpg'
    },
    {
      name: 'Great Beginnings Cranbourne North',
      type: 'long-day-care',
      suburb: 'Cranbourne North',
      address: '2-50 Siding Avenue, Cranbourne North 3977',
      phone: '(03) 5991 8901',
      email: 'cranbournenorth@greatbeginnings.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '85',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators'],
      image: 'https://api.g8education.edu.au/uploads/child_care_near_me_cranbourne_north_5f3a3b123f.jpg'
    },
    {
      name: 'Arena Child and Family Centre',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '22 Curran Drive, Officer 3809',
      phone: '(03) 9005 1430',
      email: 'arena@bestchance.org.au',
      hours: '8:30 AM - 1:30 PM',
      ageGroups: '3 - 5 years',
      capacity: '66',
      services: ['Kindergarten', 'Preschool', 'Family Support'],
      features: ['Integrated Services', 'Play-Based Learning', 'SunSmart Program', 'Family Support Services'],
      image: 'https://www.aspireearlyeducation.vic.edu.au/wp-content/uploads/2023/06/Kindergarten-1024x683.jpg'
    },
    {
      name: 'Bridgewood Integrated Child and Family Centre',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '115 Bridge Road, Officer 3809',
      phone: '(03) 8766 9400',
      email: 'bridgewood@ecms.org.au',
      hours: '8:00 AM - 5:00 PM',
      ageGroups: '3 - 5 years',
      capacity: '99',
      services: ['Kindergarten', 'Before School Care', 'After School Care', 'Family Support'],
      features: ['Exceeding NQS', 'Integrated Services', 'Meals Provided', 'Family Support Services'],
      image: 'https://www.ecms.org.au/wp-content/uploads/2024/05/bridgewood_integrated_child_and_family_centre_banner.jpg'
    },
    {
      name: 'Where We Grow Early Learning Emerald',
      type: 'long-day-care',
      suburb: 'Emerald',
      address: '392 Belgrave-Gembrook Road, Emerald 3782',
      phone: '(03) 5968 1030',
      email: 'emerald@wherewegrow.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '60',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Nature Play', 'Outdoor Areas', 'Meals Provided', 'Extra Activities'],
      image: 'https://wherewegrow.com.au/wp-content/uploads/2024/08/wwg_emerald_01.jpg'
    },
    {
      name: 'Explorers Early Learning Beaconsfield',
      type: 'long-day-care',
      suburb: 'Beaconsfield',
      address: '2 Pink Hill Boulevard, Beaconsfield 3807',
      phone: '(03) 8768 4400',
      email: 'beaconsfield@explorers.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '65',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Reggio Emilia Approach', 'Outdoor Play Areas', 'Meals Provided', 'Qualified Educators'],
      image: 'https://explorers.com.au/wp-content/uploads/2023/03/2022beaconsfield_centre_indoor_014_HR-1.jpg'
    },
    {
      name: 'Community Kids Narre Warren South',
      type: 'long-day-care',
      suburb: 'Narre Warren South',
      address: '100-150 Ernst Wanke Road, Narre Warren South 3805',
      phone: '(03) 9704 0123',
      email: 'narrewarrensouth@communitykids.com.au',
      hours: '6:30 AM - 6:30 PM',
      ageGroups: '6 weeks - 6 years',
      capacity: '80',
      services: ['Long Day Care', 'Kindergarten', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Playground Areas', 'Meals Provided', 'Qualified Educators'],
      image: 'https://api.g8education.edu.au/uploads/child_care_narre_warren_south_fabacc2f5c.jpg'
    }
  ];

  // Get suburbs with centre counts
  const suburbsData = childcareCentres.reduce((acc, centre) => {
    if (!acc[centre.suburb]) {
      acc[centre.suburb] = 0;
    }
    acc[centre.suburb]++;
    return acc;
  }, {} as { [key: string]: number });
  
  const suburbs = Object.keys(suburbsData).sort();
  
  // Get all unique services
  const allServices = Array.from(new Set(childcareCentres.flatMap(centre => centre.services))).sort();
  
  // Common services for quick filters
  const commonServices = [
    'Long Day Care',
    'Before School Care',
    'After School Care',
    'Vacation Care',
    'Family Day Care'
  ].filter(service => allServices.includes(service));

  const filteredCentres = childcareCentres.filter(centre => {
    const typeMatch = selectedType === 'all' || centre.type === selectedType;
    const suburbMatch = selectedSuburb === 'all' || centre.suburb === selectedSuburb;
    const searchMatch = searchQuery === '' || 
                       centre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       centre.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       centre.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Service match - centre must have ALL selected services
    const serviceMatch = selectedServices.length === 0 || 
                        selectedServices.every(service => centre.services.includes(service));
    
    return typeMatch && suburbMatch && searchMatch && serviceMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'suburb':
        return a.suburb.localeCompare(b.suburb);
      case 'type':
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  const getTypeColor = (type: string) => {
    // on.com style - all black badges
    return '#000';
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'long-day-care': return 'Long Day Care';
      case 'family-day-care': return 'Family Day Care';
      case 'occasional-care': return 'Occasional Care';
      default: return type;
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
        {/* Hero Section - on.com style */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '60px 20px' : `100px max(2rem, 3.33vw)`,
          textAlign: 'left'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: isMobile ? '42px' : '72px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              lineHeight: '1.05',
              letterSpacing: '-0.03em',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Childcare Guide
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '400',
              maxWidth: '700px',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '48px',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Comprehensive guide to childcare centres, long day care, and family day care services across Casey and Cardinia regions.
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '32px' : '60px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>{childcareCentres.length}+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '400'
                }}>Centres</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>6 weeks+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '400'
                }}>Age Groups</div>
              </div>
              <div>
                <div style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#000',
                  lineHeight: '1',
                  marginBottom: '4px'
                }}>7am-6pm</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '400'
                }}>Operating Hours</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : `60px max(2rem, 3.33vw)`,
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
              color: '#000',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Find Childcare
            </h2>

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
                  placeholder="Search childcare centres by name or suburb..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 24px 16px 50px',
                    fontSize: '16px',
                    border: '2px solid #e5e5e5',
                    borderRadius: '100px',
                    backgroundColor: '#f8f8f8',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000';
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
                  color: '#666',
                  width: '20px',
                  height: '20px'
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>Care Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 40px 14px 20px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}
                >
                  <option value="all">All Types</option>
                  <option value="long-day-care">Long Day Care</option>
                  <option value="family-day-care">Family Day Care</option>
                  <option value="occasional-care">Occasional Care</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#333',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>Suburb</label>
                <select
                  value={selectedSuburb}
                  onChange={(e) => setSelectedSuburb(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 40px 14px 20px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}
                >
                  <option value="all">All Suburbs ({childcareCentres.length} centres)</option>
                  {suburbs.map(suburb => (
                    <option key={suburb} value={suburb}>
                      {suburb} ({suburbsData[suburb]} {suburbsData[suburb] === 1 ? 'centre' : 'centres'})
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
                  color: '#333',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px 40px 14px 20px',
                    fontSize: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '100px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}
                >
                  <option value="name">Centre Name</option>
                  <option value="suburb">Suburb</option>
                  <option value="type">Care Type</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
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
                  backgroundColor: showAdvancedFilters ? '#000' : '#f8f8f8',
                  color: showAdvancedFilters ? '#fff' : '#000',
                  border: '1px solid #e5e5e5',
                  borderRadius: '100px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
              >
                Advanced Filters
                {selectedServices.length > 0 && (
                  <span style={{
                    backgroundColor: showAdvancedFilters ? '#fff' : '#000',
                    color: showAdvancedFilters ? '#000' : '#fff',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {selectedServices.length}
                  </span>
                )}
              </button>

              <div style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#000',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
              }}>
                {filteredCentres.length} centres found
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
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}>
                  Services Offered
                </h4>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {commonServices.map(service => (
                    <label
                      key={service}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        backgroundColor: selectedServices.includes(service) ? '#000' : '#fff',
                        color: selectedServices.includes(service) ? '#fff' : '#000',
                        border: `1px solid ${selectedServices.includes(service) ? '#000' : '#e5e5e5'}`,
                        borderRadius: '100px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedServices([...selectedServices, service]);
                          } else {
                            setSelectedServices(selectedServices.filter(s => s !== service));
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                      {service}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Centres Results Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : `60px max(2rem, 3.33vw)`,
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '24px',
            marginBottom: '80px'
          }}>
            {filteredCentres.map((centre, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  height: 'fit-content',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e5e5'
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
                {/* Centre Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#f8f8f8',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={centre.image || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80'}
                    alt={centre.name}
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
                    backgroundColor: getTypeColor(centre.type),
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize' as const
                  }}>
                    {getTypeLabel(centre.type)}
                  </div>
                </div>

                <div style={{
                  padding: '32px',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
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
                      {centre.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 4px 0'
                    }}>
                      {centre.suburb}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#000',
                      margin: 0,
                      fontWeight: '500',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}>
                      {centre.ageGroups}
                    </p>
                  </div>

                  <div style={{
                    fontSize: '15px',
                    color: '#666',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Hours:</strong> {centre.hours}
                    </div>
                    {centre.capacity && centre.capacity !== 'N/A' && (
                      <div style={{ marginBottom: '8px' }}>
                        <strong>Capacity:</strong> {centre.capacity} children
                      </div>
                    )}
                  </div>

                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#000'
                    }}>
                      Services:
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {centre.services.map((service, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '100px',
                            fontSize: '11px',
                            color: '#000',
                            fontWeight: '500',
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                          }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      color: '#000'
                    }}>
                      Features:
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      {centre.features.slice(0, 3).map((feature, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '100px',
                            fontSize: '11px',
                            color: '#666',
                            fontWeight: '500',
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid #f0f0f0',
                    marginTop: 'auto'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: '#666',
                      marginBottom: '8px'
                    }}>
                      <strong>Phone:</strong> {centre.phone}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#666'
                    }}>
                      <strong>Email:</strong> {centre.email}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - on.com style */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: isMobile ? '80px 20px' : `100px max(2rem, 3.33vw)`,
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
              Looking at Local Schools?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.85,
              lineHeight: '1.6',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              Explore our comprehensive guide to primary and secondary schools across Casey and Cardinia regions.
            </p>
            <Link
              href="/schools-guide"
              style={{
                display: 'inline-flex',
                padding: isMobile ? '18px 32px' : '16px 32px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '100px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                minHeight: '48px',
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
              View Schools Guide
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChildcareGuidePage;

