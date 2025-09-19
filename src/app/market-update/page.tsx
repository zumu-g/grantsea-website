'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';

export default function MarketUpdatePage() {
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
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      {/* Hero Section */}
      <section style={{
        paddingTop: isMobile ? '180px' : '200px',
        paddingBottom: isMobile ? '60px' : '80px',
        paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
        paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
        backgroundColor: '#fff'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '40px' : '56px',
            fontWeight: '700',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            color: '#000'
          }}>
            Market Update
          </h1>
          <p style={{
            fontSize: isMobile ? '20px' : '24px',
            lineHeight: '1.4',
            color: '#666',
            maxWidth: '800px'
          }}>
            Latest insights and trends in the Casey and Cardinia property market
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Market analysis and reports coming soon
          </p>
        </div>
      </section>
    </div>
  );
}