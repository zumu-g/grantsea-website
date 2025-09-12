'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSavedProperties } from '@/hooks/useSavedProperties';

export default function OncomHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { savedPropertyIds } = useSavedProperties();
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  // Load saved properties data when panel opens
  useEffect(() => {
    if (showSavedPanel && typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('savedPropertiesData');
        if (savedData) {
          setSavedProperties(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading saved properties data:', error);
      }
    }
  }, [showSavedPanel]);

  // Handle scroll for homepage transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: isHomePage && !isScrolled ? 'transparent' : '#fff',
        borderBottom: isHomePage && !isScrolled ? 'none' : '1px solid #e5e5e5',
        zIndex: 1000,
        transform: isHomePage && isScrolled ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto',
          height: '100%',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link href="/" style={{
            fontSize: '24px',
            fontWeight: '800',
            color: isHomePage && !isScrolled ? '#fff' : '#000',
            textDecoration: 'none',
            letterSpacing: '-0.5px',
            transition: 'color 0.3s ease'
          }}>
            GRANT'S
          </Link>

          <nav style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            <Link href="/buy" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>Buy</Link>
            <Link href="/sell" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>Sell</Link>
            <Link href="/rent" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>Rent</Link>
            <Link href="/agents" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease'
            }}>Find Agents</Link>
          </nav>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <button 
              onClick={() => {
                setShowSearch(true);
                setShowSavedPanel(false);
                setShowAccountPanel(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                transition: 'color 0.3s ease'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => {
                setShowSavedPanel(true);
                setShowSearch(false);
                setShowAccountPanel(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                position: 'relative',
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                transition: 'color 0.3s ease'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {savedPropertyIds.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#FF385C',
                  color: 'white',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {savedPropertyIds.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => {
                setShowAccountPanel(true);
                setShowSearch(false);
                setShowSavedPanel(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                transition: 'color 0.3s ease'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  transition: 'color 0.3s ease'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
              
              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  minWidth: '220px',
                  zIndex: 1001
                }}>
                  <Link href="/" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Home
                  </Link>
                  <Link href="/buy" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Buy
                  </Link>
                  <Link href="/rent" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Rent
                  </Link>
                  <Link href="/sell" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Sell
                  </Link>
                  <Link href="/properties" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    All Properties
                  </Link>
                  <Link href="/listings" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Listings
                  </Link>
                  <Link href="/agents" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Find Agents
                  </Link>
                  <Link href="/team" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Our Team
                  </Link>
                  <Link href="/appraisal" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Appraisal
                  </Link>
                  <Link href="/offices" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Offices
                  </Link>
                  <Link href="/contact" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Contact
                  </Link>
                  <Link href="/saved-properties" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Saved Properties
                  </Link>
                  <Link href="/search" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Search Properties
                  </Link>
                  <Link href="/help" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Help & Support
                  </Link>
                  <Link href="/careers" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Careers
                  </Link>
                  
                  {/* Divider */}
                  <div style={{
                    borderTop: '1px solid #e5e5e5',
                    margin: '8px 0'
                  }} />
                  
                  <Link href="/profile" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    My Profile
                  </Link>
                  <Link href="/signup" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sliding Panel Overlay */}
      {(showSearch || showSavedPanel || showAccountPanel) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9998,
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => {
            setShowSearch(false);
            setShowSavedPanel(false);
            setShowAccountPanel(false);
          }}
        />
      )}

      {/* Search Panel - Slides from Right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: showSearch ? 0 : '-480px',
        bottom: 0,
        width: '480px',
        backgroundColor: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Search Properties</h2>
          <button
            onClick={() => setShowSearch(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = formData.get('search') as string;
            if (query && query.trim()) {
              router.push(`/search?suburb=${encodeURIComponent(query.trim())}`);
              setShowSearch(false);
            }
          }}>
            <input
              name="search"
              type="text"
              placeholder="Search suburbs, addresses, or property IDs..."
              autoFocus
              style={{
                width: '100%',
                padding: '16px 20px',
                fontSize: '16px',
                border: '2px solid #e5e5e5',
                borderRadius: '8px',
                outline: 'none',
                marginBottom: '24px'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </form>

          <div style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Popular Searches</h3>
            {['Berwick', 'Narre Warren', 'Pakenham', 'Cranbourne', 'Officer'].map((suburb) => (
              <Link
                key={suburb}
                href={`/search?suburb=${encodeURIComponent(suburb)}`}
                onClick={() => setShowSearch(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  color: '#000',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
              >
                {suburb}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Saved Properties Panel - Slides from Right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: showSavedPanel ? 0 : '-480px',
        bottom: 0,
        width: '480px',
        backgroundColor: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Saved Properties ({savedProperties.length})</h2>
          <button
            onClick={() => setShowSavedPanel(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {savedProperties.length === 0 ? (
            <div style={{ 
              padding: '48px 24px',
              textAlign: 'center'
            }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1.5" style={{ margin: '0 auto 24px' }}>
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>No saved properties</h3>
              <p style={{ color: '#666' }}>Properties you save will appear here</p>
              <Link
                href="/buy"
                onClick={() => setShowSavedPanel(false)}
                style={{
                  display: 'inline-block',
                  marginTop: '24px',
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                Browse Properties
              </Link>
            </div>
          ) : (
            <div style={{ padding: '16px' }}>
              {savedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}`}
                  onClick={() => setShowSavedPanel(false)}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    marginBottom: '12px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '120px',
                    height: '90px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    {property.images?.[0] && (
                      <img 
                        src={property.images[0].url || property.images[0]}
                        alt={property.address}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      {property.priceDisplay || `$${property.price?.toLocaleString()}`}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {property.address}
                    </p>
                    <p style={{ fontSize: '14px', color: '#999' }}>
                      {property.bedrooms} bed • {property.bathrooms} bath • {property.carSpaces} car
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href="/saved-properties"
                onClick={() => setShowSavedPanel(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '16px',
                  marginTop: '16px',
                  color: '#000',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '1px solid #000',
                  borderRadius: '8px'
                }}
              >
                View All Saved Properties
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Account Panel - Slides from Right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: showAccountPanel ? 0 : '-400px',
        bottom: 0,
        width: '400px',
        backgroundColor: '#fff',
        boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Account</h2>
          <button
            onClick={() => setShowAccountPanel(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ 
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>Welcome</h3>
            <p style={{ color: '#666' }}>Sign in to access your account</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Link
              href="/signin"
              onClick={() => setShowAccountPanel(false)}
              style={{
                display: 'block',
                padding: '16px',
                backgroundColor: '#000',
                color: '#fff',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                marginBottom: '12px'
              }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setShowAccountPanel(false)}
              style={{
                display: 'block',
                padding: '16px',
                border: '1px solid #000',
                color: '#000',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              Create Account
            </Link>
          </div>

          <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h4>
            {[
              { label: 'Saved Properties', href: '/saved-properties' },
              { label: 'Property Alerts', href: '/alerts' },
              { label: 'Recent Searches', href: '/searches' },
              { label: 'Contact Preferences', href: '/preferences' },
              { label: 'Help & Support', href: '/help' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setShowAccountPanel(false)}
                style={{
                  display: 'block',
                  padding: '12px 0',
                  color: '#000',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f0f0f0',
                  fontSize: '14px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}