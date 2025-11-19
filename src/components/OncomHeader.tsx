'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import LogoSVG from './LogoSVG';

export default function OncomHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [showRentDropdown, setShowRentDropdown] = useState(false);
  const [showResearchDropdown, setShowResearchDropdown] = useState(false);
  const [showGrantsGuidesDropdown, setShowGrantsGuidesDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showBurgerPanel, setShowBurgerPanel] = useState(false);
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

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: isMobile ? '60px' : '64px',
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
              height={isMobile ? 40 : 48} 
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
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '8px 12px',
                  position: 'relative',
                  outline: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = isHomePage && !isScrolled ? '#fff' : '#000';
                  setShowBuyDropdown(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Buy
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: showBuyDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {showBuyDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    borderRadius: '8px',
                    minWidth: '200px',
                    zIndex: 1001,
                    opacity: 1,
                    animation: 'dropdownFadeIn 0.2s ease-out'
                  }}
                  onMouseEnter={() => setShowBuyDropdown(true)}
                  onMouseLeave={() => setShowBuyDropdown(false)}
                >
                  <Link href="/buy" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Search properties
                  </Link>
                  <Link href="/buy/open-for-inspection" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Open for inspection
                  </Link>
                  <Link href="/buy/forthcoming-auctions" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Forthcoming auctions
                  </Link>
                  <Link href="/buy/livestream-auctions" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Livestream auctions
                  </Link>
                  <Link href="/buy/coming-soon" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Coming soon
                  </Link>
                  <Link href="/suburbs-guide" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    transition: 'background 0.15s ease',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Suburb guides
                  </Link>
                </div>
              )}
            </div>
            <Link href="/sell" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              padding: '8px 12px',
              position: 'relative',
              outline: 'none',
              borderBottom: '2px solid transparent',
              transition: 'border-color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderBottomColor = isHomePage && !isScrolled ? '#fff' : '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderBottomColor = 'transparent';
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}>Sell</Link>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '8px 12px',
                  position: 'relative',
                  outline: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = isHomePage && !isScrolled ? '#fff' : '#000';
                  setShowRentDropdown(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Rent
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: showRentDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {showRentDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    borderRadius: '8px',
                    minWidth: '200px',
                    zIndex: 1001,
                    opacity: 1,
                    animation: 'dropdownFadeIn 0.2s ease-out'
                  }}
                  onMouseEnter={() => setShowRentDropdown(true)}
                  onMouseLeave={() => setShowRentDropdown(false)}
                >
                  <Link href="/rent" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Search properties
                  </Link>
                  <Link href="/rent/open-for-inspection" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Open for inspections
                  </Link>
                  <Link href="/appraisal" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Rental appraisal
                  </Link>
                  <Link href="/landlord-insights" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    transition: 'background 0.15s ease',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Landlord insights
                  </Link>
                </div>
              )}
            </div>
            {/* Research Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onMouseEnter={() => setShowResearchDropdown(true)}
                onMouseLeave={() => setShowResearchDropdown(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  fontSize: '14px',
                  fontWeight: '500',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  outline: 'none',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.3s ease'
                }}
              >
                Research
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  style={{
                    transform: showResearchDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {showResearchDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    borderRadius: '8px',
                    minWidth: '200px',
                    zIndex: 1001,
                    opacity: 1,
                    animation: 'dropdownFadeIn 0.2s ease-out'
                  }}
                  onMouseEnter={() => setShowResearchDropdown(true)}
                  onMouseLeave={() => setShowResearchDropdown(false)}
                >
                  <Link href="/reviews" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Reviews page
                  </Link>
                  <Link href="/grants-report" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Grants Report
                  </Link>
                  <Link href="/market-update" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.15s ease'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Market Updates
                  </Link>
                  <Link href="/agents" style={{
                    display: 'block',
                    padding: '14px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '400',
                    transition: 'background 0.15s ease',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Find Agents
                  </Link>
                </div>
              )}
            </div>

            </nav>
          )}

          <div style={{ display: 'flex', gap: isMobile ? '8px' : '24px', alignItems: 'center' }}>
            <button 
              onClick={() => {
                setShowSearch(true);
                setShowSavedPanel(false);
                setShowAccountPanel(false);
                setShowBurgerPanel(false);
                setShowBuyDropdown(false);
                setShowRentDropdown(false);
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
                setShowBurgerPanel(false);
                setShowBuyDropdown(false);
                setShowRentDropdown(false);
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
                  setShowBurgerPanel(false);
                  setShowBuyDropdown(false);
                  setShowRentDropdown(false);
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
            )}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Burger menu clicked!');
                  setShowBurgerPanel(true);
                  setShowDropdown(false);
                  setShowSearch(false);
                  setShowSavedPanel(false);
                  setShowAccountPanel(false);
                  setShowBuyDropdown(false);
                  setShowRentDropdown(false);
                }}
                onTouchStart={(e) => {
                  console.log('Burger menu touched!');
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Burger menu touch ended!');
                  setShowBurgerPanel(true);
                  setShowDropdown(false);
                  setShowSearch(false);
                  setShowSavedPanel(false);
                  setShowAccountPanel(false);
                  setShowBuyDropdown(false);
                  setShowRentDropdown(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: isMobile ? '12px' : '8px',
                  color: isHomePage && !isScrolled ? '#fff' : '#000',
                  transition: 'color 0.3s ease',
                  minWidth: '44px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  WebkitTapHighlightColor: 'transparent',
                  touchAction: 'manipulation'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sliding Panel Overlay */}
      {(showSearch || showSavedPanel || showAccountPanel || showBurgerPanel) && (
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
            setShowBurgerPanel(false);
          }}
        />
      )}

      {/* Search Panel - Slides from Right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: showSearch ? 0 : (isMobile ? '-100%' : '-480px'),
        bottom: 0,
        width: isMobile ? '100%' : '480px',
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
        right: showSavedPanel ? 0 : (isMobile ? '-100%' : '-480px'),
        bottom: 0,
        width: isMobile ? '100%' : '480px',
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
        right: showAccountPanel ? 0 : (isMobile ? '-100%' : '-400px'),
        bottom: 0,
        width: isMobile ? '100%' : '400px',
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

      {/* Burger Menu Panel - Slides from Right */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: showBurgerPanel ? 0 : (isMobile ? '-100%' : '-400px'),
          bottom: 0,
          width: isMobile ? '100%' : '400px',
          backgroundColor: '#fff',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.1)',
          transition: 'right 0.3s ease',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
          paddingTop: isMobile ? 'env(safe-area-inset-top, 0px)' : '0'
        }}
        data-testid="burger-panel"
        data-visible={showBurgerPanel}
      >
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Menu</h2>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowBurgerPanel(false);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '16px',
          WebkitOverflowScrolling: 'touch'
        }}>
          <nav style={{ 
            display: 'flex', 
            flexDirection: 'column',
            minHeight: '100%'
          }}>
            <Link href="/" onClick={(e) => {
              e.preventDefault();
              setShowBurgerPanel(false);
              window.location.href = '/';
            }} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s',
              WebkitTapHighlightColor: 'rgba(0,0,0,0.1)',
              touchAction: 'manipulation'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
               onTouchStart={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onTouchEnd={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Home
            </Link>
            <Link href="/buy" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Buy
            </Link>
            <Link href="/rent" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Rent
            </Link>
            <Link href="/sell" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Sell
            </Link>
            <Link href="/agents" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Find Agents
            </Link>
            {/* Research Section in Mobile Menu */}
            <div style={{
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000',
                borderBottom: '1px solid #f8f8f8'
              }}>
                Research
              </div>
              <Link href="/reviews" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                Reviews page
              </Link>
              <Link href="/grants-report" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                Grants Report
              </Link>
              <Link href="/market-update" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                borderBottom: '1px solid #f8f8f8',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                Market Updates
              </Link>
            </div>
            
            {/* Grants Guides Section in Mobile Menu */}
            <div style={{
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{
                padding: '16px 20px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#000',
                borderBottom: '1px solid #f8f8f8'
              }}>
                Grants Guides
              </div>
              <Link href="/guides" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                All Guides
              </Link>
              <Link href="/guides/first-time-buyer" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                First Time Buyer
              </Link>
              <Link href="/guides/investment" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                Investment Guide
              </Link>
              <Link href="/guides/selling" onClick={() => setShowBurgerPanel(false)} style={{
                display: 'block',
                padding: '12px 20px 12px 40px',
                color: '#666',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '400',
                borderBottom: '1px solid #f8f8f8',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                Selling Guide
              </Link>
            </div>
            <Link href="/appraisal" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Free Appraisal
            </Link>
            <Link href="/suburbs-guide" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Suburb Guides
            </Link>
            <Link href="/schools-guide" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              School Guides
            </Link>
            <Link href="/childcare-guide" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Child care guide
            </Link>
            <Link href="/calculators" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Calculators
            </Link>
            <Link href="/contact" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              borderBottom: '1px solid #f0f0f0',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Contact
            </Link>
            <Link href="/help" onClick={() => setShowBurgerPanel(false)} style={{
              display: 'block',
              padding: '16px 20px',
              color: '#000',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
              Help & Support
            </Link>
          </nav>
        </div>
      </div>

      {/* CSS Animation for dropdown fade-in */}
      <style jsx>{`
        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </>
  );
}