'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';

interface VirtualTour {
  id: string;
  propertyId: string;
  title: string;
  address: string;
  suburb: string;
  price: string;
  type: '360' | 'video' | '3d';
  thumbnail: string;
  tourUrl: string;
  duration?: string;
  views: number;
  agent: {
    name: string;
    phone: string;
  };
  features: string[];
  floorPlanUrl?: string;
}

export default function VirtualToursPage() {
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [filterType, setFilterType] = useState<'all' | '360' | 'video' | '3d'>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Sample virtual tours data
  const tours: VirtualTour[] = [
    {
      id: '1',
      propertyId: 'prop1',
      title: 'Luxury Family Home',
      address: '45 Heritage Drive',
      suburb: 'Berwick',
      price: '$1,250,000',
      type: '360',
      thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      tourUrl: 'https://example.com/tour/1',
      views: 1234,
      agent: { name: 'Stuart Grant', phone: '0400 123 456' },
      features: ['4 Bedrooms', '3 Bathrooms', 'Pool', 'Double Garage'],
      floorPlanUrl: '/floorplan1.jpg'
    },
    {
      id: '2',
      propertyId: 'prop2',
      title: 'Modern Townhouse',
      address: '12 Station Street',
      suburb: 'Narre Warren',
      price: '$680,000',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      tourUrl: 'https://example.com/tour/2',
      duration: '3:45',
      views: 892,
      agent: { name: 'Emily Chen', phone: '0400 234 567' },
      features: ['3 Bedrooms', '2 Bathrooms', 'Courtyard', 'Single Garage']
    },
    {
      id: '3',
      propertyId: 'prop3',
      title: 'Executive Estate',
      address: '88 Grandview Court',
      suburb: 'Beaconsfield Upper',
      price: '$2,450,000',
      type: '3d',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      tourUrl: 'https://example.com/tour/3',
      views: 2156,
      agent: { name: 'Michael Davidson', phone: '0400 345 678' },
      features: ['5 Bedrooms', '4 Bathrooms', 'Tennis Court', 'Triple Garage'],
      floorPlanUrl: '/floorplan3.jpg'
    }
  ];

  const filteredTours = filterType === 'all'
    ? tours
    : tours.filter(tour => tour.type === filterType);

  const getTourIcon = (type: string) => {
    switch(type) {
      case '360': return '🔄';
      case 'video': return '📹';
      case '3d': return '🏠';
      default: return '👁️';
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        paddingBottom: '96px'
      }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: isMobile ? '40px 20px' : '80px 40px',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: isMobile ? '32px' : '48px',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Virtual Property Tours
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Experience properties from the comfort of your home with immersive 360° tours, video walkthroughs, and 3D experiences
          </p>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {(['all', '360', 'video', '3d'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: filterType === type ? '#fff' : 'rgba(255,255,255,0.2)',
                  color: filterType === type ? '#764ba2' : '#fff',
                  border: '2px solid #fff',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {type === 'all' ? 'All Tours' :
                 type === '360' ? '🔄 360° Tours' :
                 type === 'video' ? '📹 Video Tours' :
                 '🏠 3D Tours'}
              </button>
            ))}
          </div>
        </section>

        {/* Tours Grid */}
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '40px 20px' : '60px 40px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredTours.map(tour => (
              <div
                key={tour.id}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  backgroundColor: '#fff'
                }}
                onClick={() => setSelectedTour(tour)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  position: 'relative',
                  height: '240px',
                  backgroundColor: '#f5f5f5'
                }}>
                  <Image
                    src={tour.thumbnail}
                    alt={tour.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)'
                  }} />

                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {getTourIcon(tour.type)}
                  </div>

                  {/* Tour Type Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    padding: '6px 12px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {tour.type === '360' ? '360° Tour' :
                     tour.type === 'video' ? 'Video Tour' :
                     '3D Walkthrough'}
                  </div>

                  {/* View Count */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '4px 8px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    👁️ {tour.views.toLocaleString()} views
                  </div>

                  {tour.duration && (
                    <div style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      padding: '4px 8px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: '#fff',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      ⏱️ {tour.duration}
                    </div>
                  )}
                </div>

                {/* Property Info */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    marginBottom: '4px'
                  }}>
                    {tour.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    {tour.address}, {tour.suburb}
                  </p>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#002b7f',
                    marginBottom: '16px'
                  }}>
                    {tour.price}
                  </p>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {tour.features.map((feature, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '4px',
                          fontSize: '12px'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          backgroundColor: '#f8f8f8',
          padding: isMobile ? '60px 20px' : '80px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '48px',
              letterSpacing: '-0.02em'
            }}>
              Tour Features
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: '32px'
            }}>
              {[
                { icon: '🔄', title: '360° Views', desc: 'Look around every room' },
                { icon: '📐', title: 'Floor Plans', desc: 'Interactive layout views' },
                { icon: '📏', title: 'Measurements', desc: 'Accurate room dimensions' },
                { icon: '🎮', title: 'VR Ready', desc: 'Use with VR headset' }
              ].map((feature, index) => (
                <div key={index}>
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '16px'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Virtual Tour Modal */}
      {selectedTour && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Modal Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#000',
            color: '#fff'
          }}>
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{selectedTour.title}</h2>
              <p style={{ fontSize: '14px', opacity: 0.8 }}>
                {selectedTour.address}, {selectedTour.suburb}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {isFullscreen ? '⤦ Exit Fullscreen' : '⤢ Fullscreen'}
              </button>
              <button
                onClick={() => setSelectedTour(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tour Viewer */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '1400px',
              height: '80vh',
              backgroundColor: '#000',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '24px'
            }}>
              {/* Placeholder for actual tour embed */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>
                  {getTourIcon(selectedTour.type)}
                </div>
                <p>Virtual Tour Player Would Load Here</p>
                <p style={{ fontSize: '16px', opacity: 0.6, marginTop: '8px' }}>
                  {selectedTour.type === '360' ? 'Drag to look around' :
                   selectedTour.type === 'video' ? 'Click to play video' :
                   'Click and drag to explore in 3D'}
                </p>
              </div>
            </div>
          </div>

          {/* Tour Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            padding: '20px',
            backgroundColor: '#000'
          }}>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#002b7f',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📐 Floor Plan
            </button>
            <button
              style={{
                padding: '12px 24px',
                backgroundColor: '#002b7f',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📞 Contact Agent
            </button>
            <Link
              href={`/property/${selectedTour.propertyId}`}
              style={{
                padding: '12px 24px',
                backgroundColor: '#002b7f',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              🏠 View Property
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}