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
      name: 'Berwick Early Learning Centre',
      type: 'long-day-care',
      suburb: 'Berwick',
      address: '15-17 High Street, Berwick 3806',
      phone: '(03) 9707 1234',
      email: 'info@berwickelc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '80',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Narre Warren Childcare Centre',
      type: 'long-day-care',
      suburb: 'Narre Warren',
      address: '25-27 Fountain Gate Drive, Narre Warren 3805',
      phone: '(03) 9704 5678',
      email: 'info@narrewarrencc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '75',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Cranbourne Family Day Care',
      type: 'family-day-care',
      suburb: 'Cranbourne',
      address: 'Various locations, Cranbourne 3977',
      phone: '(03) 5996 2345',
      email: 'info@cranbournefdc.com.au',
      hours: 'Flexible',
      ageGroups: '6 weeks - 12 years',
      capacity: 'N/A',
      services: ['Family Day Care', 'Before School Care', 'After School Care'],
      features: ['Home-based Care', 'Small Groups', 'Flexible Hours', 'Qualified Educators']
    },
    {
      name: 'Pakenham Early Learning Centre',
      type: 'long-day-care',
      suburb: 'Pakenham',
      address: '30-34 Main Street, Pakenham 3810',
      phone: '(03) 5941 3456',
      email: 'info@pakenhamelc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '90',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Officer Childcare Centre',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '3 Niki Place, Officer 3809',
      phone: '(03) 5943 2800',
      email: 'info@officercc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '70',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Hampton Park Early Learning',
      type: 'long-day-care',
      suburb: 'Hampton Park',
      address: '15-17 Somerville Road, Hampton Park 3976',
      phone: '(03) 5995 4567',
      email: 'info@hamptonparkel.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '85',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Multicultural Programs', 'Qualified Educators']
    },
    {
      name: 'Endeavour Hills Childcare',
      type: 'long-day-care',
      suburb: 'Endeavour Hills',
      address: '25-27 Matthew Flinders Avenue, Endeavour Hills 3802',
      phone: '(03) 9700 5678',
      email: 'info@endeavourhillscc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '80',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Hallam Early Learning Centre',
      type: 'long-day-care',
      suburb: 'Hallam',
      address: '15-17 Hallam Road, Hallam 3803',
      phone: '(03) 9703 6789',
      email: 'info@hallamelc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '75',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Clyde North Childcare Centre',
      type: 'long-day-care',
      suburb: 'Clyde North',
      address: '25-27 Evans Road, Clyde North 3978',
      phone: '(03) 5998 7890',
      email: 'info@clydenorthcc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '70',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Cranbourne North Early Learning',
      type: 'long-day-care',
      suburb: 'Cranbourne North',
      address: '2-50 Siding Avenue, Cranbourne North 3977',
      phone: '(03) 5991 8901',
      email: 'info@cranbournenorthel.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '85',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Arena Child and Family Centre',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '22 Curran Drive, Officer 3809',
      phone: '(03) 9132 6060',
      email: 'info@arenacfc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '90',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Family Support'],
      features: ['Integrated Services', 'Meals Provided', 'Educational Programs', 'Family Support Services']
    },
    {
      name: 'Bridgewood Integrated Child and Family Centre',
      type: 'long-day-care',
      suburb: 'Officer',
      address: '115 Bridge Road, Officer 3809',
      phone: '(03) 8481 1117',
      email: 'info@bridgewoodcfc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '85',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Family Support'],
      features: ['Integrated Services', 'Meals Provided', 'Educational Programs', 'Family Support Services']
    },
    {
      name: 'Emerald Childcare Centre',
      type: 'long-day-care',
      suburb: 'Emerald',
      address: '15-17 Kilvington Drive, Emerald 3782',
      phone: '(03) 5968 9012',
      email: 'info@emeraldcc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '60',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Rural Setting', 'Outdoor Play Areas', 'Meals Provided', 'Educational Programs']
    },
    {
      name: 'Beaconsfield Early Learning',
      type: 'long-day-care',
      suburb: 'Beaconsfield',
      address: '6-10 Woods Street, Beaconsfield 3807',
      phone: '(03) 8768 4400',
      email: 'info@beaconsfieldel.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '65',
      services: ['Long Day Care', 'Before School Care', 'After School Care'],
      features: ['Outdoor Play Areas', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
    },
    {
      name: 'Narre Warren South Childcare',
      type: 'long-day-care',
      suburb: 'Narre Warren South',
      address: '100-150 Fox Road, Narre Warren South 3805',
      phone: '(03) 9704 0123',
      email: 'info@narrewarrensouthcc.com.au',
      hours: '7:00 AM - 6:00 PM',
      ageGroups: '6 weeks - 5 years',
      capacity: '80',
      services: ['Long Day Care', 'Before School Care', 'After School Care', 'Vacation Care'],
      features: ['Modern Facilities', 'Meals Provided', 'Educational Programs', 'Qualified Educators']
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
    switch (type) {
      case 'long-day-care': return '#3498db';
      case 'family-day-care': return '#9b59b6';
      case 'occasional-care': return '#e67e22';
      default: return '#002b7f';
    }
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
              Childcare Guide: Casey & Cardinia
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#666',
              lineHeight: '1.5'
            }}>
              Comprehensive guide to childcare centres, long day care, and family day care services in Melbourne's southeast.
              Find the perfect childcare for your family.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px',
              marginTop: '48px',
              maxWidth: '800px',
              margin: '48px auto 0'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>🏢</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>{childcareCentres.length}+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Childcare Centres</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>👶</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>6 weeks+</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Age Groups</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px'
                }}>⏰</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#000'
                }}>7am-6pm</div>
                <div style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Operating Hours</div>
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
                  color: '#333'
                }}>Care Type</label>
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
                  backgroundColor: showAdvancedFilters ? '#002b7f' : '#f8f8f8',
                  color: showAdvancedFilters ? '#fff' : '#000',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Advanced Filters
                {selectedServices.length > 0 && (
                  <span style={{
                    backgroundColor: showAdvancedFilters ? '#fff' : '#002b7f',
                    color: showAdvancedFilters ? '#002b7f' : '#fff',
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
                color: '#002b7f'
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
                  color: '#000'
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
                        backgroundColor: selectedServices.includes(service) ? '#002b7f' : '#fff',
                        color: selectedServices.includes(service) ? '#fff' : '#000',
                        border: `1px solid ${selectedServices.includes(service) ? '#002b7f' : '#e5e5e5'}`,
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
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
          padding: isMobile ? '40px 20px' : '60px 40px',
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
                <div style={{
                  padding: '32px',
                  minHeight: '280px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        margin: '0',
                        color: '#000',
                        lineHeight: '1.3',
                        flex: 1
                      }}>
                        {centre.name}
                      </h3>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: getTypeColor(centre.type),
                        color: '#fff',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {getTypeLabel(centre.type)}
                      </span>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      margin: '0 0 4px 0'
                    }}>
                      {centre.suburb}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      color: '#002b7f',
                      margin: 0,
                      fontWeight: '500'
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
                            padding: '4px 8px',
                            backgroundColor: '#f0f4ff',
                            borderRadius: '12px',
                            fontSize: '11px',
                            color: '#002b7f',
                            fontWeight: '500'
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
                            padding: '4px 8px',
                            backgroundColor: '#f8f8f8',
                            borderRadius: '12px',
                            fontSize: '11px',
                            color: '#666',
                            fontWeight: '500'
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

        {/* CTA Section */}
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
              Need Help Finding Childcare?
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '40px',
              opacity: 0.9,
              lineHeight: '1.6'
            }}>
              Our local experts can help you find the perfect childcare centre for your family's needs.
            </p>
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
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
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ChildcareGuidePage;

