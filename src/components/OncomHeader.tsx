'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function OncomHeader() {
  const [showMenuPanel, setShowMenuPanel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const [showAccountPanel, setShowAccountPanel] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showBuyDropdown, setShowBuyDropdown] = useState(false);
  const [buyDropdownTimeout, setBuyDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showDiscoverDropdown, setShowDiscoverDropdown] = useState(false);
  const [discoverDropdownTimeout, setDiscoverDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, savedProperties, savedSearches, logout } = useAuth();
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  // Saved properties data is now managed by AuthContext

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
        height: isMobile ? '160px' : '190px',
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
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            <Image
              src="/gea_website_logov4_svg.svg"
              alt="Grant's Estate Agents"
              width={isMobile ? 195 : 244}
              height={isMobile ? 120 : 150}
              priority
              style={{
                height: isMobile ? 120 : 150,
                width: 'auto',
                maxWidth: '100%'
              }}
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
            <div style={{ position: 'relative' }}
              onMouseEnter={() => {
                if (buyDropdownTimeout) {
                  clearTimeout(buyDropdownTimeout);
                  setBuyDropdownTimeout(null);
                }
                setShowBuyDropdown(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setShowBuyDropdown(false);
                }, 150); // 150ms delay before closing
                setBuyDropdownTimeout(timeout);
              }}>
              <Link href="/buy" style={{
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Buy
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {showBuyDropdown && (
                <>
                  {/* Invisible bridge to prevent gap */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '8px',
                    background: 'transparent',
                    zIndex: 1001
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  minWidth: '200px',
                  zIndex: 1002,
                  overflow: 'hidden'
                }}>
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
                    Search Properties
                  </Link>
                  <Link href="/buy/calculator" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Buy/Sell Calculator
                  </Link>
                  <Link href="/buy/loan-approval" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Get Loan Pre-approval
                  </Link>
                  <Link href="/buy/find-broker" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Need a Broker
                  </Link>
                  <Link href="/buy/rates" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s',
                    borderRadius: '0 0 8px 8px'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Check Our Rates
                  </Link>
                  </div>
                </>
              )}
            </div>
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
            <Link href="/map" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Map
            </Link>
            <div style={{ position: 'relative' }}
              onMouseEnter={() => {
                if (discoverDropdownTimeout) {
                  clearTimeout(discoverDropdownTimeout);
                  setDiscoverDropdownTimeout(null);
                }
                setShowDiscoverDropdown(true);
              }}
              onMouseLeave={() => {
                const timeout = setTimeout(() => {
                  setShowDiscoverDropdown(false);
                }, 150);
                setDiscoverDropdownTimeout(timeout);
              }}>
              <Link href="/agents" style={{
                color: isHomePage && !isScrolled ? '#fff' : '#000',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Discover
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {showDiscoverDropdown && (
                <>
                  {/* Invisible bridge to prevent gap */}
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '8px',
                    background: 'transparent',
                    zIndex: 1001
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    minWidth: '200px',
                    zIndex: 1002,
                    overflow: 'hidden'
                  }}>
                    <Link href="/market-update" style={{
                      display: 'block',
                      padding: '12px 20px',
                      color: '#000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                      Market Update
                    </Link>
                    <Link href="/grants-report" style={{
                      display: 'block',
                      padding: '12px 20px',
                      color: '#000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                      Grants Report
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
                      Our Agents
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
                      Our Offices
                    </Link>
                    <Link href="/faqs" style={{
                      display: 'block',
                      padding: '12px 20px',
                      color: '#000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                      FAQs
                    </Link>
                    <Link href="/schools-guide" style={{
                      display: 'block',
                      padding: '12px 20px',
                      color: '#000',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'background 0.2s',
                      borderRadius: '0 0 8px 8px'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                       onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                      Grant's Schools Guide
                    </Link>
                  </div>
                </>
              )}
            </div>
            <Link href="/reviews" style={{
              color: isHomePage && !isScrolled ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.3s ease'
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
                const aiButton = document.querySelector('[data-ai-chat-button]') as HTMLButtonElement;
                if (aiButton) aiButton.click();
              }}
              style={{
                background: 'linear-gradient(135deg, #AF272F 0%, #D4838F 100%)',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '20px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                marginRight: '12px',
                boxShadow: '0 2px 8px rgba(175, 39, 47, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(175, 39, 47, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(175, 39, 47, 0.2)';
              }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="8" cy="10" r="1" fill="currentColor"/>
                <circle cx="12" cy="10" r="1" fill="currentColor"/>
                <circle cx="16" cy="10" r="1" fill="currentColor"/>
              </svg>
              AI Help
            </button>
            <button
              onClick={() => {
                setShowSavedPanel(true);
                setShowSearch(false);
                setShowAccountPanel(false);
              }}
              data-heart-icon
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
              {savedProperties.length > 0 && (
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
                  {savedProperties.length}
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
            <button
              onClick={() => {
                setShowMenuPanel(true);
                setShowSearch(false);
                setShowSavedPanel(false);
                setShowAccountPanel(false);
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
                  justifyContent: 'center'
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              </button>
          </div>
        </div>
      </header>

      {/* TEMPORARY FIX - REMOVING BROKEN DROPDOWN CONTENT */}
      {false && (
        <div>
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
                    Discover
                  </Link>
                  <Link href="/reviews" style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#000',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f0f0f0',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                     onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    Reviews
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

      {/* Sliding Panel Overlay */}
      {(showSearch || showSavedPanel || showAccountPanel || showMenuPanel) && (
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
            setShowMenuPanel(false);
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
              data-search-bar
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
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '12px'
                  }}>
                    No Image
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      Property {property.propertyId}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Saved on {new Date(property.savedAt).toLocaleDateString()}
                    </p>
                    {property.notes && (
                      <p style={{ fontSize: '14px', color: '#999' }}>
                        {property.notes}
                      </p>
                    )}
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
          {isAuthenticated ? (
            // Authenticated user content
            <>
              <div style={{ 
                textAlign: 'center',
                marginBottom: '32px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                  {user?.firstName} {user?.lastName}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{user?.email}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#000' }}>
                      {savedProperties.length}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Saved Properties</div>
                  </div>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#000' }}>
                      {savedSearches.length}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Saved Searches</div>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    logout();
                    setShowAccountPanel(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #000',
                    backgroundColor: 'transparent',
                    color: '#000',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            // Non-authenticated user content
            <>
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
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowAccountPanel(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setShowAccountPanel(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '1px solid #000',
                    backgroundColor: 'transparent',
                    color: '#000',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  Create Account
                </button>
              </div>
            </>
          )}

          <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e5e5' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h4>
            {[
              { label: 'Saved Properties', href: '/saved' },
              { label: 'Property Alerts', href: '/alerts' },
              { label: 'Recent Searches', href: '/saved' },
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

      {/* Menu Panel - Slides from Right */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: showMenuPanel ? 0 : (isMobile ? '-100%' : '-480px'),
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
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Menu</h2>
          <button
            onClick={() => setShowMenuPanel(false)}
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
          {[
            { href: '/', label: 'Home' },
            { href: '/buy', label: 'Buy' },
            { href: '/rent', label: 'Rent' },
            { href: '/sell', label: 'Sell' },
            { href: '/agents', label: 'Discover' },
            { href: '/property-management', label: 'Property Management' },
            { href: '/suburbs', label: 'Suburb Guides' },
            { href: '/saved', label: 'Saved Properties' },
            { href: '/stories', label: 'Stories' },
            { href: '/reviews', label: 'Reviews' },
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact' },
            { href: '/news', label: 'News & Media' },
            { href: '/listings', label: 'All Listings' },
            { href: '/search', label: 'Search Properties' },
            { href: '/help', label: 'Help & Support' },
            { href: '/careers', label: 'Careers' }
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setShowMenuPanel(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              {item.label}
            </Link>
          ))}

          <div style={{
            borderTop: '2px solid #e5e5e5',
            marginTop: '16px',
            paddingTop: '16px'
          }}>
            <Link
              href="/profile"
              onClick={() => setShowMenuPanel(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                borderBottom: '1px solid #f0f0f0',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              My Profile
            </Link>
            <Link
              href="/signup"
              onClick={() => setShowMenuPanel(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                color: '#000',
                textDecoration: 'none',
                fontSize: '16px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
}