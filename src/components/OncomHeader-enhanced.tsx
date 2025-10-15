'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import LogoSVG from './LogoSVG';

export default function OncomHeaderEnhanced() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showSellDropdown, setShowSellDropdown] = useState(false);
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.sell-dropdown-container')) {
        setShowSellDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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
        transform: isHomePage && isScrolled && !isMobile ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        paddingTop: 'env(safe-area-inset-top, 0px)'
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
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            <LogoSVG 
              height={40} 
              className={`logo-svg ${isHomePage && !isScrolled ? 'logo-white' : ''}`}
            />
          </Link>

          {!isMobile && (
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
                transition: 'color 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Buy</Link>
              
              {/* Sell Dropdown */}
              <div 
                className="sell-dropdown-container"
                style={{ position: 'relative' }}
                onMouseEnter={() => setShowSellDropdown(true)}
                onMouseLeave={() => setShowSellDropdown(false)}
              >
                <Link 
                  href="/sell" 
                  style={{
                    color: isHomePage && !isScrolled ? '#fff' : '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}
                >
                  Sell
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    style={{
                      transform: showSellDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </Link>
                
                {/* Dropdown Menu */}
                {showSellDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '20px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0',
                    minWidth: '200px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                    opacity: showSellDropdown ? 1 : 0,
                    visibility: showSellDropdown ? 'visible' : 'hidden',
                    transition: 'all 0.3s ease'
                  }}>
                    <Link 
                      href="/sell" 
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Why Sell with Us
                    </Link>
                    <Link 
                      href="/appraisal" 
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Free Appraisal
                    </Link>
                    <Link 
                      href="/sold" 
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        borderBottom: '1px solid #f0f0f0',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Recent Sales
                    </Link>
                    <Link 
                      href="/calculators" 
                      style={{
                        display: 'block',
                        padding: '16px 24px',
                        color: '#000',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '400',
                        transition: 'all 0.2s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f8f8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Property Calculators
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/rent" style={{
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Rent</Link>
              <Link href="/agents" style={{
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Find Agents</Link>
              <Link href="/reviews" style={{
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Reviews</Link>
            </nav>
          )}

          <div style={{ display: 'flex', gap: isMobile ? '8px' : '24px', alignItems: 'center' }}>
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
            {!isMobile && (
              <button
                onClick={() => {
                  setShowAccountPanel(true);
                  setShowSearch(false);
                  setShowSavedPanel(false);
                }}
                style={{
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'color 0.3s ease',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                Sign in
              </button>
            )}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                color: isHomePage && !isScrolled ? '#fff' : '#000'
              }}
            >
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                transition: 'transform 0.3s ease',
                transform: showDropdown ? 'rotate(45deg) translateY(6px)' : 'none'
              }} />
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                transition: 'opacity 0.3s ease',
                opacity: showDropdown ? 0 : 1
              }} />
              <span style={{
                display: 'block',
                width: '20px',
                height: '2px',
                backgroundColor: 'currentColor',
                transition: 'transform 0.3s ease',
                transform: showDropdown ? 'rotate(-45deg) translateY(-6px)' : 'none'
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Panel */}
      {showSearch && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: showSearch ? '0' : '-400px',
          bottom: 0,
          width: '400px',
          maxWidth: '100vw',
          backgroundColor: '#fff',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 1001,
          transition: 'right 0.3s ease',
          animation: 'slideInFromRight 0.3s ease'
        }}>
          <div style={{
            padding: '40px 30px',
            height: '100%',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Search Properties</h2>
              <button
                onClick={() => setShowSearch(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Search by suburb, postcode..."
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '16px',
                border: '2px solid #e5e5e5',
                borderRadius: '0',
                marginBottom: '20px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  if (value) {
                    router.push(`/search?q=${encodeURIComponent(value)}`);
                    setShowSearch(false);
                  }
                }
              }}
            />
            
            <div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#666',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Popular Suburbs</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Berwick', 'Narre Warren', 'Cranbourne', 'Pakenham', 'Officer'].map((suburb) => (
                  <Link
                    key={suburb}
                    href={`/suburbs/${suburb.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setShowSearch(false)}
                    style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '16px',
                      padding: '8px 0',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'color 0.2s ease',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#333';
                    }}
                  >
                    {suburb}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Dropdown */}
      {showDropdown && (
        <div style={{
          position: 'fixed',
          top: '64px',
          right: 0,
          left: 0,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          zIndex: 999,
          animation: 'slideDown 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            padding: '40px max(2rem, 3.33vw)'
          }}>
            <nav style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '40px'
            }}>
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#666',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Buy</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/buy" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>All Properties</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/search" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Search Properties</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/map" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Map View</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/schools-guide" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Schools Guide</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#666',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Sell & Rent</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/sell" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Sell Your Property</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/appraisal" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Free Appraisal</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/rent" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Rental Properties</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/sold" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Recent Sales</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#666',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Resources</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/calculators" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Calculators</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/stories" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Success Stories</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/market-analytics" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Market Analytics</Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#666',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>About</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/about" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>About Us</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/agents" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Our Agents</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/contact" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Contact Us</Link>
                  </li>
                  <li style={{ marginBottom: '12px' }}>
                    <Link href="/reviews" onClick={() => setShowDropdown(false)} style={{
                      color: '#333',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Reviews</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}