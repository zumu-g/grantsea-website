'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

// Extended agents data with more details
const agents = [
  {
    id: '1',
    name: 'Sarah Thompson',
    position: 'Senior Sales Consultant',
    email: 'sarah@grantsea.com',
    phone: '02 9123 4567',
    mobile: '0423 456 789',
    photo: '/agents/sarah-thompson.jpg',
    bio: 'With over 15 years in real estate, Sarah specializes in helping families find their perfect home. Her deep understanding of the local market and commitment to client satisfaction has earned her numerous awards.',
    specialties: ['Residential Sales', 'First Home Buyers', 'Family Homes'],
    languages: ['English', 'Mandarin'],
    achievements: [
      'Top Sales Agent 2023',
      'Customer Service Excellence Award 2022',
      'Million Dollar Club Member'
    ],
    propertiesCount: 24,
    soldCount: 142,
    avgDaysOnMarket: 21
  },
  {
    id: '2',
    name: 'Michael Chen',
    position: 'Property Investment Specialist',
    email: 'michael@grantsea.com',
    phone: '02 9123 4568',
    mobile: '0412 345 678',
    photo: '/agents/michael-chen.jpg',
    bio: 'Michael brings 20 years of investment expertise to help clients build their property portfolios. His analytical approach and market insights have helped countless investors achieve their financial goals.',
    specialties: ['Investment Properties', 'Commercial Real Estate', 'Development Sites'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    achievements: [
      'Investment Specialist of the Year 2023',
      'Top Commercial Agent 2022',
      'Licensed Real Estate Auctioneer'
    ],
    propertiesCount: 18,
    soldCount: 203,
    avgDaysOnMarket: 28
  },
  {
    id: '3',
    name: 'Emma Wilson',
    position: 'New Homes Consultant',
    email: 'emma@grantsea.com',
    phone: '02 9123 4569',
    mobile: '0434 567 890',
    photo: '/agents/emma-wilson.jpg',
    bio: 'Emma is passionate about helping buyers navigate the new home and off-the-plan market. Her expertise in new developments and strong relationships with builders ensure clients get the best opportunities.',
    specialties: ['New Home Sales', 'Off-the-Plan Developments', 'First Home Buyers'],
    languages: ['English'],
    achievements: [
      'New Development Specialist',
      'First Home Buyer Advocate',
      'Top New Homes Sales 2023'
    ],
    propertiesCount: 35,
    soldCount: 89,
    avgDaysOnMarket: 14
  },
  {
    id: '4',
    name: 'David Martinez',
    position: 'Property Manager',
    email: 'david@grantsea.com',
    phone: '02 9123 4570',
    mobile: '0445 678 901',
    photo: '/agents/david-martinez.jpg',
    bio: 'David\'s proactive approach to property management ensures both landlords and tenants have a positive experience. His attention to detail and communication skills set him apart in the industry.',
    specialties: ['Property Management', 'Tenant Relations', 'Investment Advisory'],
    languages: ['English', 'Spanish'],
    achievements: [
      'Property Manager of the Year 2023',
      'Zero Vacancy Award 2022',
      'Licensed Property Manager'
    ],
    propertiesCount: 156,
    managedProperties: 156,
    avgOccupancyRate: 98.5
  },
  {
    id: '5',
    name: 'Jessica Park',
    position: 'Luxury Property Specialist',
    email: 'jessica@grantsea.com',
    phone: '02 9123 4571',
    mobile: '0456 789 012',
    photo: '/agents/jessica-park.jpg',
    bio: 'Jessica specializes in prestige properties and delivers discrete, professional service to high-net-worth individuals. Her understanding of luxury market dynamics ensures exceptional results.',
    specialties: ['Luxury Homes', 'Waterfront Properties', 'Prestige Sales'],
    languages: ['English', 'Korean'],
    achievements: [
      'Luxury Property Specialist',
      'Record Sale Price 2023',
      'International Property Marketing'
    ],
    propertiesCount: 12,
    soldCount: 67,
    avgDaysOnMarket: 45
  },
  {
    id: '6',
    name: 'Tom Richards',
    position: 'Senior Property Consultant',
    email: 'tom@grantsea.com',
    phone: '02 9123 4572',
    mobile: '0467 890 123',
    photo: '/agents/tom-richards.jpg',
    bio: 'Tom\'s straightforward approach and extensive local knowledge make him a trusted advisor for both buyers and sellers. His negotiation skills consistently deliver outstanding results.',
    specialties: ['Residential Sales', 'Auctions', 'Market Analysis'],
    languages: ['English'],
    achievements: [
      'Licensed Auctioneer',
      'Top Negotiator 2023',
      'Community Service Award'
    ],
    propertiesCount: 28,
    soldCount: 178,
    avgDaysOnMarket: 19
  }
];

export default function AgentsPageOncom() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique specialties and languages
  const specialties = ['all', ...new Set(agents.flatMap(a => a.specialties))];
  const languages = ['all', ...new Set(agents.flatMap(a => a.languages))];

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSpecialty = selectedSpecialty === 'all' || agent.specialties.includes(selectedSpecialty);
    const matchesLanguage = selectedLanguage === 'all' || agent.languages.includes(selectedLanguage);
    const matchesSearch = searchQuery === '' || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSpecialty && matchesLanguage && matchesSearch;
  });

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#fafafa' }}>
        {/* Hero Section */}
        <div style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '120px 0',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("/office-hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              marginBottom: '24px',
              letterSpacing: '-1px'
            }}>Meet Our Team</h1>
            <p style={{
              fontSize: '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Expert agents dedicated to helping you achieve your property goals
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '24px 0',
          position: 'sticky',
          top: '64px',
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #e5e5e5',
                fontSize: '14px',
                flex: '1',
                minWidth: '200px'
              }}
            />
            
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #e5e5e5',
                backgroundColor: '#fff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Specialties</option>
              {specialties.slice(1).map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                padding: '8px 16px',
                border: '1px solid #e5e5e5',
                backgroundColor: '#fff',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Languages</option>
              {languages.slice(1).map(language => (
                <option key={language} value={language}>{language}</option>
              ))}
            </select>

            <div style={{ marginLeft: 'auto', fontSize: '14px', color: '#666' }}>
              {filteredAgents.length} agents found
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          padding: '60px 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {filteredAgents.map((agent) => (
              <Link 
                key={agent.id} 
                href={`/agent/${agent.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                  {/* Agent Photo */}
                  <div style={{
                    aspectRatio: '3/4',
                    backgroundColor: '#f5f5f5',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {agent.photo ? (
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e5e5e5'
                      }}>
                        <div style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          backgroundColor: '#d5d5d5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px',
                          fontWeight: '700',
                          color: '#999'
                        }}>
                          {agent.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Agent Info */}
                  <div style={{ padding: '32px' }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      marginBottom: '4px'
                    }}>
                      {agent.name}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '16px'
                    }}>
                      {agent.position}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '16px',
                      flexWrap: 'wrap'
                    }}>
                      {agent.languages.map(lang => (
                        <span key={lang} style={{
                          padding: '4px 12px',
                          backgroundColor: '#f5f5f5',
                          fontSize: '12px',
                          borderRadius: '20px'
                        }}>
                          {lang}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      paddingTop: '16px',
                      borderTop: '1px solid #f0f0f0'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        <span>Active Listings</span>
                        <span style={{ fontWeight: '600', color: '#000' }}>{agent.propertiesCount}</span>
                      </div>
                      {agent.soldCount && (
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '14px',
                          color: '#666',
                          marginTop: '8px'
                        }}>
                          <span>Properties Sold</span>
                          <span style={{ fontWeight: '600', color: '#000' }}>{agent.soldCount}</span>
                        </div>
                      )}
                    </div>

                    <button style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '20px',
                      backgroundColor: '#000',
                      color: '#fff',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#222'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}>
                      View Profile
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}