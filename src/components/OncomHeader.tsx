'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function OncomHeader() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000
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
            fontSize: '28px',
            fontWeight: '900',
            color: '#000',
            textDecoration: 'none',
            letterSpacing: '-0.5px'
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
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Buy</Link>
            <Link href="/sell" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Sell</Link>
            <Link href="/rent" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Rent</Link>
            <Link href="/agents" style={{
              color: '#000',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}>Find Agents</Link>
          </nav>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowSearch(!showSearch)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link href="/saved-properties" style={{ padding: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px'
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

      {/* Search Modal */}
      {showSearch && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderBottom: '1px solid #e5e5e5',
          padding: '20px',
          zIndex: 999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
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
                  fontSize: '18px',
                  border: '2px solid #e5e5e5',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
              />
            </form>
            <button
              onClick={() => setShowSearch(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
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
        </div>
      )}
    </>
  );
}