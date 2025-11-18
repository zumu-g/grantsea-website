'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function ReportMaintenancePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const contactOptions = [
    {
      id: 'call',
      title: 'Call',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      description: 'Speak directly to our maintenance team',
      action: 'tel:0438100545',
      buttonText: 'Call 0438 100 545',
      details: '0438 100 545'
    },
    {
      id: 'text',
      title: 'Text',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      description: 'Send a text with photos and details',
      action: 'sms:0438100545',
      buttonText: 'Send text message',
      details: '0438 100 545'
    },
    {
      id: 'email',
      title: 'Email',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m22 7-10 5L2 7"/>
        </svg>
      ),
      description: 'Email with all the details',
      action: 'mailto:maintenance@grantsea.com.au?subject=Maintenance Request',
      buttonText: 'Send email',
      details: 'maintenance@grantsea.com.au'
    }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '180px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>
        {/* Hero Section - ON.COM Style */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
              fontWeight: '800',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              color: '#000',
              lineHeight: '1.1',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Report maintenance
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '20px',
              color: '#666',
              maxWidth: '600px',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              Choose how you'd like to report your maintenance issue. We'll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* Contact Options - Card Grid */}
        <section style={{
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: isMobile ? '24px' : '32px'
            }}>
              {contactOptions.map((option) => (
                <div
                  key={option.id}
                  style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    padding: isMobile ? '32px 24px' : '48px',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{
                    color: '#002b7f',
                    marginBottom: '24px'
                  }}>
                    {option.icon}
                  </div>
                  
                  <h2 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#000',
                    letterSpacing: '-0.01em'
                  }}>
                    {option.title}
                  </h2>
                  
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '24px',
                    lineHeight: '1.5'
                  }}>
                    {option.description}
                  </p>
                  
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#002b7f',
                    marginBottom: '32px'
                  }}>
                    {option.details}
                  </div>
                  
                  <a
                    href={option.action}
                    style={{
                      display: 'inline-block',
                      padding: '16px 32px',
                      backgroundColor: '#002b7f',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#001d5c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#002b7f';
                    }}
                  >
                    {option.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Information Grid */}
        <section style={{
          backgroundColor: '#f8f8f8',
          paddingTop: isMobile ? '60px' : isTablet ? '80px' : '96px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : isTablet ? '44px' : '48px',
              fontWeight: '700',
              marginBottom: '48px',
              textAlign: 'left',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              What to include
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '32px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '4px',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#000'
                }}>
                  Essential information
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '2',
                  color: '#666'
                }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Your full name and contact details
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Property address
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Clear description of the issue
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    How long it's been happening
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Any safety concerns
                  </li>
                </ul>
              </div>
              
              <div style={{
                backgroundColor: '#fff',
                padding: '32px',
                borderRadius: '4px',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#000'
                }}>
                  Helpful additions
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '2',
                  color: '#666'
                }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Photos of the issue
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Best times for inspection
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Access instructions if needed
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Previous repair attempts
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ color: '#002b7f', marginRight: '12px' }}>•</span>
                    Urgency level of repair
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Emergency Notice */}
            <div style={{
              marginTop: '48px',
              padding: '32px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '2px solid #AF272F'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#AF272F'
              }}>
                Emergency maintenance
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                For urgent issues that pose immediate risk to health, safety, or property damage:
              </p>
              <ol style={{
                marginLeft: '24px',
                fontSize: '16px',
                lineHeight: '2',
                color: '#666'
              }}>
                <li>Call emergency services if there's immediate danger (000)</li>
                <li>Contact us immediately on <strong style={{ color: '#AF272F' }}>0438 100 545</strong></li>
                <li>Take steps to minimize damage if safe to do so</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Back Button */}
        <section style={{
          paddingTop: '48px',
          paddingBottom: isMobile ? '60px' : isTablet ? '80px' : '96px',
          textAlign: 'center'
        }}>
          <Link
            href="/rent"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#002b7f',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back to rental properties
          </Link>
        </section>
      </main>
    </>
  );
}