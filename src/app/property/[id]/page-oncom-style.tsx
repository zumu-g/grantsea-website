'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useProperty, useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import AskAI from '@/components/AskAI';

export default function PropertyDetailPageOncom() {
  const params = useParams();
  const { property, loading, error } = useProperty(params.id as string);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showFullscreenCarousel, setShowFullscreenCarousel] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: "I'm interested in this property..."
  });
  
  // Fetch similar properties from the same suburb
  const { properties: similarProperties } = useProperties({
    suburb: property?.suburb,
    limit: 4,
    type: property?.listingType === 'sale' ? 'sale' : 'lease'
  });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid #e0e0e0', 
            borderTop: '3px solid #000', 
            borderRadius: '50%', 
            margin: '0 auto',
            animation: 'spin 1s linear infinite' 
          }} />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Property not found</h1>
          <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const displayImages = showAllPhotos ? images : images.slice(0, 5);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showFullscreenCarousel) return;

      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else if (e.key === 'Escape') {
        setShowFullscreenCarousel(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreenCarousel, currentImageIndex, images.length]);

  return (
    <>
      {/* Fullscreen Image Carousel */}
      {showFullscreenCarousel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Close Button */}
          <button
            onClick={() => setShowFullscreenCarousel(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',
              zIndex: 2001
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image Counter */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '8px 16px',
            borderRadius: '20px'
          }}>
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          {currentImageIndex > 0 && (
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '50%',
                zIndex: 2001
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Main Image */}
          <div style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {images[currentImageIndex] && (
              <img
                src={typeof images[currentImageIndex] === 'string' ? images[currentImageIndex] : images[currentImageIndex].url}
                alt={`Property image ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
            )}
          </div>

          {/* Next Button */}
          {currentImageIndex < images.length - 1 && (
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                border: 'none',
                cursor: 'pointer',
                padding: '16px',
                borderRadius: '50%',
                zIndex: 2001
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Thumbnail Strip */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            maxWidth: '90vw',
            overflowX: 'auto',
            padding: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '8px'
          }}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: '80px',
                  height: '60px',
                  border: currentImageIndex === index ? '2px solid white' : '2px solid transparent',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  background: 'none',
                  flexShrink: 0
                }}
              >
                <img
                  src={typeof image === 'string' ? image : image.url}
                  alt={`Thumbnail ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clean Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 'max(2rem, 3.33vw)',
        paddingRight: 'max(2rem, 3.33vw)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', fontWeight: '900' }}>GRANT'S</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Link href="/buy" style={{ color: '#000', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Buy</Link>
          <Link href="/sell" style={{ color: '#000', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Sell</Link>
          <Link href="/rent" style={{ color: '#000', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Rent</Link>
          <Link href="/agents" style={{ color: '#000', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Agents</Link>
        </nav>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/saved-properties" style={{ padding: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#fff' }}>
        {/* Breadcrumb */}
        <div style={{ paddingTop: '24px', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
            <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/buy" style={{ color: '#666', textDecoration: 'none' }}>Buy</Link>
            <span>/</span>
            <Link href={`/buy/${property.state?.toLowerCase()}`} style={{ color: '#666', textDecoration: 'none' }}>
              {property.state}
            </Link>
            <span>/</span>
            <Link href={`/buy/${property.state?.toLowerCase()}/${property.suburb?.toLowerCase()}`} style={{ color: '#666', textDecoration: 'none' }}>
              {property.suburb}
            </Link>
            <span>/</span>
            <span>{property.address}</span>
          </div>
        </div>

        {/* Property Header */}
        <div style={{ paddingTop: '32px', paddingBottom: '24px', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                {property.address}
              </h1>
              <p style={{ fontSize: '18px', color: '#666' }}>
                {property.suburb}, {property.state} {property.postcode}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <SavePropertyButton property={property} showLabel={false} />
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: property.address,
                      text: `Check out this property: ${property.address}, ${property.suburb}`,
                      url: window.location.href,
                    }).catch(() => {
                      // Fallback to clipboard copy
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    });
                  } else {
                    // Fallback to clipboard copy
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
              <AskAI 
                propertyId={property.id}
                propertyAddress={`${property.address}, ${property.suburb}, ${property.state} ${property.postcode}`}
                propertyData={{
                  price: property.price,
                  priceDisplay: property.priceDisplay,
                  leasePrice: property.leasePrice,
                  leasePriceDisplay: property.leasePriceDisplay,
                  listingType: property.listingType,
                  bedrooms: property.bedrooms,
                  bathrooms: property.bathrooms,
                  carSpaces: property.carSpaces,
                  propertyType: property.propertyType,
                  suburb: property.suburb,
                  features: property.features,
                  description: property.description,
                  landSize: property.landSize
                }}
                propertyType="details"
                size="large"
              />
            </div>
          </div>

          {/* Document Downloads - Discreet placement */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '16px',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => {
                // Mock download - in production, this would download the actual document
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'statement-of-information.pdf';
                alert('Statement of Information would download here');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e5e5e5',
                borderRadius: '4px',
                fontSize: '13px',
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ebebeb';
                e.currentTarget.style.borderColor = '#d0d0d0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Statement of Information
            </button>

            <button
              onClick={() => {
                // Mock download - in production, this would download the actual document
                const link = document.createElement('a');
                link.href = '#';
                link.download = 'section-32.pdf';
                alert('Section 32 would download here');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e5e5e5',
                borderRadius: '4px',
                fontSize: '13px',
                color: '#666',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ebebeb';
                e.currentTarget.style.borderColor = '#d0d0d0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
                e.currentTarget.style.borderColor = '#e5e5e5';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Section 32
            </button>
          </div>

          {/* Key Details Bar */}
          <div style={{
            display: 'flex',
            gap: '48px',
            padding: '24px 0',
            borderTop: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5'
          }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>
                {property.listingType === 'lease'
                  ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent'))
                  : (property.priceDisplay || formatPrice(property.price))
                }
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {property.listingType === 'lease' ? 'Rent' : 'Price'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.bedrooms}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Bedrooms</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.bathrooms}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Bathrooms</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.carSpaces}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Parking</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.propertyType}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Property Type</div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: displayImages.length === 1 ? '1fr' : 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 400px)',
            gap: '8px',
            marginBottom: '32px'
          }}>
            {displayImages.slice(0, 5).map((image, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden',
                  gridColumn: index === 0 ? 'span 1' : undefined,
                  gridRow: index === 0 ? 'span 2' : undefined,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setShowFullscreenCarousel(true);
                }}
              >
                {image ? (
                  <img
                    src={typeof image === 'string' ? image : image.url}
                    alt={`Property image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    No image
                  </div>
                )}
                {index === 4 && images.length > 5 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllPhotos(true);
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      padding: '8px 16px',
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      color: '#fff',
                      border: 'none',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Show all {images.length} photos
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Property Details Section */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', paddingBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '80px' }}>
            {/* Left Column - Details */}
            <div>
              {/* Description */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>About this property</h2>
                <div style={{ fontSize: '16px', lineHeight: '1.7', color: '#333' }}>
                  {property.description ? (
                    <div>
                      {property.description.split('\n').map((paragraph, index) => {
                        // Check if this line contains bullet points
                        if (paragraph.includes('&#x2022;')) {
                          // Split by bullet points and create a list
                          const items = paragraph.split('&#x2022;').filter(item => item.trim());
                          return (
                            <ul key={index} style={{ 
                              listStyle: 'none', 
                              padding: 0, 
                              margin: '16px 0',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '12px'
                            }}>
                              {items.map((item, itemIndex) => (
                                <li key={itemIndex} style={{ 
                                  display: 'flex', 
                                  alignItems: 'flex-start', 
                                  gap: '12px' 
                                }}>
                                  <span style={{ 
                                    color: '#000',
                                    fontSize: '20px',
                                    lineHeight: '20px',
                                    marginTop: '2px',
                                    flexShrink: 0
                                  }}>•</span>
                                  <span>{item.trim()}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        } else if (paragraph.trim()) {
                          // Regular paragraph
                          return <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>;
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    'No description available.'
                  )}
                </div>
              </section>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <section style={{ marginBottom: '48px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Features</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    {property.features.map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00a651" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ fontSize: '16px' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Floor Plan */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Floor plan</h2>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  Floor plan not available
                </div>
              </section>

              {/* Map */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Location</h2>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  Map view
                </div>
              </section>

              {/* Nearby Schools and Childcare */}
              <section style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Nearby Schools & Childcare</h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  {/* Primary Schools */}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>Primary Schools</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Berwick Primary School</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Public School • 450 students</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>1.2 km</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>5 min drive</div>
                        </div>
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>St Margaret's School</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Catholic School • 320 students</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>2.1 km</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>7 min drive</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Schools */}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>Secondary Schools</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Berwick College</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Public School • 1,200 students</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>1.8 km</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>6 min drive</div>
                        </div>
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Nossal High School</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Selective Entry • 850 students</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>3.5 km</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>10 min drive</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Childcare Centers */}
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#333' }}>Childcare Centers</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Berwick Early Learning Centre</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Ages 0-5 • 120 places</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>800 m</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>3 min drive</div>
                        </div>
                      </div>
                      <div style={{
                        padding: '16px',
                        backgroundColor: '#f8f8f8',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>Goodstart Early Learning</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>Ages 6 weeks-5 years • 90 places</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: '600', color: '#000' }}>1.5 km</div>
                          <div style={{ fontSize: '14px', color: '#666' }}>5 min drive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - Agent & Inquiry */}
            <div>
              {/* Large Agent Photo Box */}
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                marginBottom: '24px',
                overflow: 'hidden'
              }}>
                {property.agent?.photo ? (
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    style={{
                      width: '100%',
                      height: '800px',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '800px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        backgroundColor: '#e5e5e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '80px',
                        fontWeight: '700',
                        margin: '0 auto 32px'
                      }}>
                        {property.agent?.name?.charAt(0) || 'G'}
                      </div>
                      <div style={{ fontSize: '36px', fontWeight: '600', marginBottom: '12px' }}>
                        {property.agent?.name || 'Grant\'s Agent'}
                      </div>
                      <div style={{ fontSize: '24px', color: '#666', marginBottom: '8px' }}>
                        Grant\'s Estate Agents
                      </div>
                      <div style={{ fontSize: '24px', color: '#666' }}>
                        {property.agent?.phone || '1300 GRANTS'}
                      </div>
                      {property.agent?.email && (
                        <div style={{ fontSize: '20px', color: '#666', marginTop: '8px' }}>
                          {property.agent.email}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Agent Name Overlay (if photo exists) */}
                {property.agent?.photo && (
                  <div style={{
                    padding: '24px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    marginTop: '-80px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                      {property.agent?.name || 'Grant\'s Agent'}
                    </div>
                    <div style={{ fontSize: '16px' }}>Grant\'s Estate Agents</div>
                  </div>
                )}
              </div>

              <div style={{
                position: 'sticky',
                top: '88px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                padding: '32px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>Contact agent</h3>
                
                {/* Agent Info */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}>
                    {property.agent?.name?.charAt(0) || 'G'}
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: '600' }}>{property.agent?.name || 'Grant\'s Agent'}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Grant\'s Estate Agents</div>
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                      {property.agent?.phone || '1300 GRANTS'}
                    </div>
                  </div>
                </div>

                {/* Inquiry Form */}
                <form>
                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="text"
                      placeholder="Your name"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e5e5',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="email"
                      placeholder="Email address"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e5e5',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e5e5',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <textarea
                      placeholder="I'm interested in this property..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e5e5e5',
                        fontSize: '16px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#000',
                      color: '#fff',
                      border: 'none',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                      }}
                    >
                      Send inquiry
                    </button>
                  </form>
                )}

                {/* Schedule Inspection */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid #e5e5e5',
                  textAlign: 'center'
                }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: '2px solid #000',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Schedule an inspection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You might also like Section */}
        {similarProperties && similarProperties.length > 0 && (
          <div style={{
            marginTop: '80px',
            paddingTop: '80px',
            borderTop: '1px solid #e5e5e5'
          }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '48px',
                letterSpacing: '-0.02em'
              }}>
                You might also like
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '32px'
              }}>
                {similarProperties
                  .filter(p => p.id !== property.id) // Exclude current property
                  .slice(0, 3) // Show max 3 properties
                  .map((similarProperty) => (
                    <Link
                      key={similarProperty.id}
                      href={`/property/${similarProperty.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #e5e5e5',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        <div style={{
                          position: 'relative',
                          paddingTop: '66.67%',
                          backgroundColor: '#f5f5f5'
                        }}>
                          {similarProperty.images?.[0] && (
                            <img 
                              src={similarProperty.images[0].url} 
                              alt={similarProperty.address}
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          )}
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            zIndex: 10
                          }}>
                            <SavePropertyButton property={similarProperty} />
                          </div>
                        </div>
                        <div style={{ padding: '24px' }}>
                          <h3 style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            letterSpacing: '-0.01em'
                          }}>
                            {formatPrice(similarProperty.priceDetails?.display || similarProperty.price || 'Contact Agent')}
                          </h3>
                          <p style={{
                            fontSize: '16px',
                            color: '#666',
                            marginBottom: '16px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {similarProperty.address}
                          </p>
                          <div style={{
                            display: 'flex',
                            gap: '24px',
                            fontSize: '15px',
                            color: '#333'
                          }}>
                            {similarProperty.bedrooms && <span>{similarProperty.bedrooms} beds</span>}
                            {similarProperty.bathrooms && <span>{similarProperty.bathrooms} baths</span>}
                            {similarProperty.carSpaces && <span>{similarProperty.carSpaces} cars</span>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* View More Button */}
              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <Link href={`/search?suburb=${encodeURIComponent(property.suburb)}`} style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  View all properties in {property.suburb}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}