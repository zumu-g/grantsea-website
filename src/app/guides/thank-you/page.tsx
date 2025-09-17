'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function ThankYouPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <OncomHeader />

      <main style={{
        minHeight: '100vh',
        paddingTop: '200px',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: isMobile ? '40px 20px' : '80px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: isMobile ? '40px 32px' : '60px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
          }}>
            {/* Success Icon */}
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px'
            }}>
              <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
                <path d="M5 20L17 32L45 8" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h1 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#000'
            }}>
              Thank You!
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Your guide has been downloaded successfully. We've also sent a copy to your email address.
            </p>

            <div style={{
              backgroundColor: '#f8f8f8',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '32px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#000'
              }}>
                What's Next?
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '8px', color: '#002b7f' }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    Check your email for the download link
                  </span>
                </li>
                <li style={{
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '8px', color: '#002b7f' }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    Browse our current property listings
                  </span>
                </li>
                <li style={{
                  display: 'flex',
                  alignItems: 'flex-start'
                }}>
                  <span style={{ marginRight: '8px', color: '#002b7f' }}>✓</span>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    Contact our experts for personalized advice
                  </span>
                </li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              gap: '16px',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'center'
            }}>
              <Link
                href="/buy"
                style={{
                  padding: '14px 32px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background-color 0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001f5c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002b7f'}
              >
                View Properties
              </Link>

              <Link
                href="/guides"
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'transparent',
                  color: '#002b7f',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '2px solid #002b7f',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#002b7f';
                }}
              >
                More Guides
              </Link>
            </div>
          </div>

          <p style={{
            marginTop: '32px',
            fontSize: '14px',
            color: '#999'
          }}>
            Need help? Call us on{' '}
            <a href="tel:0397044888" style={{ color: '#002b7f', textDecoration: 'none' }}>
              (03) 9704 4888
            </a>
          </p>
        </div>
      </main>
    </>
  );
}