'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProperty } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import './anima-property.css';

export default function PropertyDetailPageAnima() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  const propertyId = params.id as string;
  const { property, loading, error } = useProperty(propertyId);
  
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '"On", Helvetica'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e5e5e5',
            borderTopColor: '#000',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px'
          }} />
          <p style={{ fontSize: '16px', color: '#797971' }}>Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: '"On", Helvetica'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '42px', 
            fontWeight: '700',
            marginBottom: '16px' 
          }}>Property not found</h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#797971',
            marginBottom: '32px' 
          }}>
            {error || 'The property you are looking for does not exist.'}
          </p>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            height: '48px',
            backgroundColor: '#000',
            color: '#fff',
            borderRadius: '40px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="property-detail-anima">
      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        height: '90px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1001,
        display: 'flex',
        alignItems: 'center',
        padding: '0 48px'
      }}>
        <Link href="/" style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#000',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          Grant's Estate Agents
        </Link>
        
        <nav style={{
          display: 'flex',
          gap: '48px',
          marginLeft: '80px'
        }}>
          <Link href="/search" style={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#000',
            textDecoration: 'none'
          }}>Properties</Link>
          <Link href="/agents" style={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#000',
            textDecoration: 'none'
          }}>Agents</Link>
          <Link href="/about" style={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#000',
            textDecoration: 'none'
          }}>About</Link>
        </nav>

        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '24px'
        }}>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: '1fr 520px',
        maxWidth: '1920px',
        margin: '0 auto',
        backgroundColor: '#fff'
      }}>
        {/* Left Column - Images */}
        <div style={{
          position: 'sticky',
          top: '90px',
          height: 'calc(100vh - 90px)',
          overflowY: 'auto'
        }}>
          {/* Main Image */}
          <div style={{
            position: 'relative',
            width: '100%',
            paddingTop: '66.67%',
            backgroundColor: '#f5f5f5',
            overflow: 'hidden'
          }}>
            {property.images && property.images.length > 0 ? (
              <img
                src={property.images[currentImageIndex].url}
                alt={`${property.address} - Image ${currentImageIndex + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#797971',
                fontSize: '16px'
              }}>
                No images available
              </div>
            )}

            {/* Navigation Arrows */}
            {property.images && property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {property.images && property.images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                padding: '8px 16px',
                backgroundColor: 'rgba(0,0,0,0.8)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {currentImageIndex + 1} / {property.images.length}
              </div>
            )}
          </div>

          {/* Virtual Tour Button */}
          <button style={{
            width: '100%',
            padding: '24px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            VIRTUAL TOUR
          </button>
        </div>

        {/* Right Column - Details */}
        <div style={{
          padding: '48px',
          overflowY: 'auto',
          height: 'calc(100vh - 90px)'
        }}>
          {/* Breadcrumbs */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '32px',
            fontSize: '14px',
            color: '#797971'
          }}>
            <Link href="/search" style={{ color: '#797971', textDecoration: 'none' }}>
              PROPERTIES
            </Link>
            <span>/</span>
            <span style={{ textTransform: 'uppercase' }}>{property.suburb}</span>
          </div>

          {/* Title and Price */}
          <div style={{ marginBottom: '48px' }}>
            <h1 style={{
              fontSize: 'clamp(42px, 4vw, 68px)',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '16px'
            }}>
              {property.address}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: property.listingType === 'lease' ? '#000' : '#666',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {property.listingType === 'lease' ? 'FOR RENT' : 'FOR SALE'}
              </span>
            </div>

            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '32px'
            }}>
              {property.listingType === 'lease' 
                ? (property.leasePriceDisplay || `$${property.leasePrice} per week`)
                : (property.priceDisplay || formatPrice(property.price))}
            </div>
          </div>

          {/* Property Summary */}
          <div style={{
            padding: '32px',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px',
            marginBottom: '48px'
          }}>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#000',
              marginBottom: '24px'
            }}>
              {property.description || 'Exceptional property in the heart of ' + property.suburb}
            </p>

            <div style={{
              display: 'flex',
              gap: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #e5e5e5'
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{property.bedrooms}</div>
                <div style={{ fontSize: '14px', color: '#797971' }}>Bedrooms</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{property.bathrooms}</div>
                <div style={{ fontSize: '14px', color: '#797971' }}>Bathrooms</div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{property.carSpaces}</div>
                <div style={{ fontSize: '14px', color: '#797971' }}>Car Spaces</div>
              </div>
              {property.landSize && (
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '700' }}>{property.landSize}</div>
                  <div style={{ fontSize: '14px', color: '#797971' }}>Land (sqm)</div>
                </div>
              )}
            </div>
          </div>

          {/* Property Type Tabs */}
          <div style={{ marginBottom: '48px' }}>
            <div style={{
              display: 'flex',
              gap: '0',
              borderBottom: '1px solid #e5e5e5',
              marginBottom: '32px'
            }}>
              <button
                onClick={() => setActiveTab('details')}
                style={{
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'details' ? '2px solid #000' : '2px solid transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  color: activeTab === 'details' ? '#000' : '#797971'
                }}
              >
                Property Details
              </button>
              <button
                onClick={() => setActiveTab('features')}
                style={{
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'features' ? '2px solid #000' : '2px solid transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  color: activeTab === 'features' ? '#000' : '#797971'
                }}
              >
                Features & Amenities
              </button>
              <button
                onClick={() => setActiveTab('location')}
                style={{
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'location' ? '2px solid #000' : '2px solid transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  color: activeTab === 'location' ? '#000' : '#797971'
                }}
              >
                Location
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'details' && (
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '24px'
                }}>Key features</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {property.features && property.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      fontSize: '16px',
                      lineHeight: '1.5'
                    }}>
                      <span style={{ marginRight: '12px', color: '#000' }}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '24px'
                }}>Property Features</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Interior</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '8px' }}>• Modern kitchen with stone benchtops</li>
                      <li style={{ marginBottom: '8px' }}>• Open plan living and dining</li>
                      <li style={{ marginBottom: '8px' }}>• Master bedroom with ensuite</li>
                      <li style={{ marginBottom: '8px' }}>• Built-in wardrobes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Exterior</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ marginBottom: '8px' }}>• Landscaped gardens</li>
                      <li style={{ marginBottom: '8px' }}>• Outdoor entertainment area</li>
                      <li style={{ marginBottom: '8px' }}>• Double garage with internal access</li>
                      <li style={{ marginBottom: '8px' }}>• Fully fenced yard</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '24px'
                }}>Location & Surroundings</h3>
                <p style={{
                  fontSize: '16px',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Located in the sought-after suburb of {property.suburb}, this property offers 
                  convenient access to local amenities, schools, and public transport. 
                  Just minutes from shopping centers and parks.
                </p>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  height: '300px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#797971'
                }}>
                  Map View
                </div>
              </div>
            )}
          </div>

          {/* Large Agent Photo Box */}
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e5e5',
            marginBottom: '48px',
            overflow: 'hidden',
            borderRadius: '8px'
          }}>
            {property.agent?.photo ? (
              <img
                src={property.agent.photo}
                alt={property.agent.name}
                style={{
                  width: '100%',
                  height: '1000px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '1000px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '250px',
                    height: '250px',
                    borderRadius: '50%',
                    backgroundColor: '#e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '100px',
                    fontWeight: '700',
                    margin: '0 auto 40px',
                    color: '#797971'
                  }}>
                    {property.agent?.name?.charAt(0) || 'G'}
                  </div>
                  <div style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
                    {property.agent?.name || 'Grant\'s Agent'}
                  </div>
                  <div style={{ fontSize: '32px', color: '#797971', marginBottom: '8px' }}>
                    Grant\'s Estate Agents
                  </div>
                  <div style={{ fontSize: '28px', color: '#797971' }}>
                    {property.agent?.phone || '1300 GRANTS'}
                  </div>
                  {property.agent?.email && (
                    <div style={{ fontSize: '24px', color: '#797971', marginTop: '8px' }}>
                      {property.agent.email}
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Agent Name Overlay (if photo exists) */}
            {property.agent?.photo && (
              <div style={{
                padding: '32px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                marginTop: '-100px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }}>
                  {property.agent?.name || 'Grant\'s Agent'}
                </div>
                <div style={{ fontSize: '20px' }}>Grant\'s Estate Agents</div>
              </div>
            )}
          </div>

          {/* Contact Agent Section */}
          <div style={{
            position: 'sticky',
            bottom: '0',
            backgroundColor: 'white',
            padding: '32px 0',
            borderTop: '1px solid #e5e5e5'
          }}>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => setShowInquiryForm(true)}
                style={{
                  flex: 1,
                  padding: '0 24px',
                  height: '56px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '40px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact Agent
              </button>
              <button style={{
                flex: 1,
                padding: '0 24px',
                height: '56px',
                backgroundColor: 'transparent',
                color: '#000',
                border: '1px solid #000',
                borderRadius: '40px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Book Inspection
              </button>
            </div>

            {/* Agent Info */}
            {property.agent && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e5e5'
                }} />
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{property.agent.name}</div>
                  <div style={{ fontSize: '14px', color: '#797971' }}>{property.agent.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Similar Properties Section */}
      <section style={{
        maxWidth: '1920px',
        margin: '0 auto',
        padding: '96px 48px',
        backgroundColor: '#f8f8f8'
      }}>
        <h2 style={{
          fontSize: '42px',
          fontWeight: '700',
          marginBottom: '48px'
        }}>Similar Properties</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '32px'
        }}>
          {/* Similar property cards would go here */}
        </div>
      </section>

      {/* Inquiry Form Modal */}
      {showInquiryForm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '48px',
            maxWidth: '600px',
            width: '100%',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowInquiryForm(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
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

            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '32px'
            }}>Property Inquiry</h3>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
              <input
                type="tel"
                placeholder="Your Phone"
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
                defaultValue={`I'm interested in ${property.address}, ${property.suburb}`}
              />
              <button
                type="submit"
                style={{
                  padding: '0 24px',
                  height: '56px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '40px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}