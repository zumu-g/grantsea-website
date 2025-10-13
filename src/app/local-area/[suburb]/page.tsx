'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function LocalAreaPage() {
  const params = useParams();
  const suburb = params.suburb as string;
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Format suburb name for display
  const suburbName = suburb ? suburb.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : '';

  return (
    <div>
      <OncomHeader />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: isMobile ? 'clamp(1rem, 4.2667vw, 2rem)' : 'max(2rem, 3.33vw)',
        paddingRight: isMobile ? 'clamp(1rem, 4.2667vw, 2rem)' : 'max(2rem, 3.33vw)',
        paddingTop: '200px',
        paddingBottom: '80px'
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '40px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#999' }}>/</span>
          <span style={{ color: '#000' }}>Local Area - {suburbName}</span>
        </div>

        {/* Hero Section */}
        <div style={{ marginBottom: '80px' }}>
          <h1 style={{
            fontSize: isMobile ? '48px' : '72px',
            fontWeight: '700',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            lineHeight: '1',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            Local Area Guide
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#404040',
            maxWidth: '800px',
            lineHeight: '1.6',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>
            Discover everything {suburbName} has to offer. From schools and transport to shopping, parks, and local amenities.
          </p>
        </div>

        {/* Public Transport */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Public Transport</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🚂 Train Stations
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>{suburbName} Station</strong><br />
                  Pakenham Line • 5 min walk
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Direct services to Melbourne CBD (approx. 60 min)
                </div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🚌 Bus Routes
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Route 840 - Closest stop 200m</div>
                <div style={{ marginBottom: '8px' }}>Route 841 - Closest stop 400m</div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Services to local shopping centers and train stations
                </div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🛣️ Freeway Access
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Princes Freeway (M1)</strong><br />
                  8 min drive
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  Quick access to Melbourne CBD and Gippsland
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shopping & Amenities */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Shopping & Amenities</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🛒 Shopping Centers
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Fountain Gate</strong><br />
                  10 min drive • 200+ stores
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Eden Rise Village</strong><br />
                  5 min drive • Supermarkets, cafes
                </div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏪 Supermarkets
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Coles - 3 min drive</div>
                <div style={{ marginBottom: '8px' }}>Woolworths - 4 min drive</div>
                <div style={{ marginBottom: '8px' }}>Aldi - 5 min drive</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏥 Medical Centers
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>{suburbName} Medical Centre - 2 min drive</div>
                <div style={{ marginBottom: '8px' }}>Casey Hospital - 15 min drive</div>
              </div>
            </div>
          </div>
        </section>

        {/* Parks & Recreation */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Parks & Recreation</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🌳 Parks & Playgrounds
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Wilson Botanic Park - 8 min drive</div>
                <div style={{ marginBottom: '8px' }}>Local Reserve - 5 min walk</div>
                <div style={{ marginBottom: '8px' }}>Adventure Playground - 3 min drive</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ⚽ Sports Facilities
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Aquatic & Leisure Centre - 7 min</div>
                <div style={{ marginBottom: '8px' }}>Tennis Courts - 4 min</div>
                <div style={{ marginBottom: '8px' }}>Football Oval - 5 min</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🚴 Trails & Paths
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Walking tracks throughout suburb</div>
                <div style={{ marginBottom: '8px' }}>Cycling paths to nearby areas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Schools */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Schools & Education</h2>

          <div style={{ marginBottom: '24px', padding: '32px', backgroundColor: '#000', color: '#fff' }}>
            <p style={{ fontSize: '17px', marginBottom: '16px' }}>
              {suburbName} is well-served by quality educational facilities including kindergartens, primary schools, and secondary colleges.
            </p>
            <Link
              href="/schools-guide"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'background-color 0.2s',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}
            >
              View Schools Guide →
            </Link>
          </div>
        </section>

        {/* Childcare */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Childcare Centers</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '17px', fontWeight: '600', marginBottom: '12px' }}>
                {suburbName} Early Learning Centre
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Long day care • 6 weeks - 5 years</div>
                <div style={{ fontSize: '13px', color: '#666' }}>3 min drive</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '17px', fontWeight: '600', marginBottom: '12px' }}>
                Before & After School Care
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Available at local primary schools</div>
                <div style={{ fontSize: '13px', color: '#666' }}>Convenient for working families</div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Healthcare</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                👨‍⚕️ Medical Clinics
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>{suburbName} Medical Centre - 2 min</div>
                <div style={{ marginBottom: '8px' }}>Bulk-billing available</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🦷 Dental Practices
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Family Dental - 3 min drive</div>
                <div style={{ marginBottom: '8px' }}>Specialists nearby</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                💊 Pharmacies
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Chemist Warehouse - 4 min</div>
                <div style={{ marginBottom: '8px' }}>Local Pharmacy - 2 min</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle & Entertainment */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Lifestyle & Entertainment</h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                ☕ Cafes & Restaurants
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Multiple cafes within 5 min</div>
                <div style={{ marginBottom: '8px' }}>Diverse dining options nearby</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏋️ Gyms & Fitness
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>24/7 Gym - 5 min drive</div>
                <div style={{ marginBottom: '8px' }}>Yoga studios - 6 min</div>
              </div>
            </div>

            <div style={{
              padding: '32px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #e5e5e5'
            }}>
              <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                📚 Library
              </div>
              <div style={{ fontSize: '15px', color: '#404040', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>Casey Cardinia Library - 7 min</div>
                <div style={{ marginBottom: '8px' }}>Free WiFi, study spaces, programs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Distance to Key Locations */}
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '32px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#000000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif'
          }}>Distance to Key Locations</h2>

          <div style={{
            padding: '48px',
            backgroundColor: '#000',
            color: '#fff'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '32px'
            }}>
              <div>
                <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>55km</div>
                <div style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#d4d4d4' }}>Melbourne CBD</div>
                <div style={{ fontSize: '13px', marginTop: '8px', color: '#999' }}>Approx. 60 min by train</div>
              </div>

              <div>
                <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>65km</div>
                <div style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#d4d4d4' }}>Melbourne Airport</div>
                <div style={{ fontSize: '13px', marginTop: '8px', color: '#999' }}>Approx. 50 min drive</div>
              </div>

              <div>
                <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>15km</div>
                <div style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#d4d4d4' }}>Monash University (Clayton)</div>
                <div style={{ fontSize: '13px', marginTop: '8px', color: '#999' }}>Approx. 20 min drive</div>
              </div>

              <div>
                <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>8km</div>
                <div style={{ fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#d4d4d4' }}>Fountain Gate</div>
                <div style={{ fontSize: '13px', marginTop: '8px', color: '#999' }}>Major shopping & employment hub</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
