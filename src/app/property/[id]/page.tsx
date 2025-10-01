'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import AskAI from '@/components/AskAI';

interface Property {
  id: string;
  address?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  price?: string;
  priceDisplay?: string;
  leasePrice?: string;
  leasePriceDisplay?: string;
  listingType?: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  landSize?: number;
  buildingSize?: number;
  propertyType?: string;
  saleMethod?: string;
  auctionDate?: string;
  auctionVenue?: string;
  description?: string;
  features?: string[];
  images?: Array<{ id?: string; url: string; order?: number; type?: string }>;
  floorPlans?: Array<{ id?: string; url: string; caption?: string; order?: number; type?: string }>;
  documents?: Array<{ id: string; name: string; url: string; type: string; format?: string }>;
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  inspectionTimes?: Array<{
    id: string;
    startTime: string;
    endTime: string;
    type: string;
  }>;
  agent?: {
    id?: string;
    name?: string;
    phone?: string;
    email?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentFloorPlanIndex, setCurrentFloorPlanIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showFullscreenCarousel, setShowFullscreenCarousel] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: "I'm interested in this property..."
  });

  // Fetch property data
  useEffect(() => {
    if (!params.id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/properties/${params.id}`);
        const data = await response.json();

        if (response.ok && data.success && data.data) {
          setProperty(data.data);

          // Fetch similar properties
          if (data.data.suburb) {
            try {
              const similarResponse = await fetch(`/api/properties?suburb=${data.data.suburb}&limit=4&type=${data.data.listingType || 'all'}`);
              const similarData = await similarResponse.json();
              if (similarData.success && similarData.data) {
                setSimilarProperties(similarData.data.filter((p: Property) => p.id !== data.data.id).slice(0, 3));
              }
            } catch {
              // Silently fail for similar properties
            }
          }
        } else {
          setError(data.error || 'Failed to load property');
        }
      } catch (err) {
        setError('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!property?.images) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showFullscreenCarousel) return;

      if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < property.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else if (e.key === 'Escape') {
        setShowFullscreenCarousel(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFullscreenCarousel, currentImageIndex, property?.images]);

  const handleShare = () => {
    if (navigator.share && property) {
      navigator.share({
        title: property.address,
        text: `Check out this property: ${property.address}, ${property.suburb}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry sent:', enquiryForm);
    setEnquirySent(true);
    setTimeout(() => setEnquirySent(false), 3000);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
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
          <p style={{ color: '#666', marginBottom: '24px' }}>{error || 'The property you are looking for does not exist.'}</p>
          <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images || [];
  const displayImages = showAllPhotos ? images : images.slice(0, 5);

  return (
    <div>
      {/* Virtual Tour Modal */}
      {showVirtualTour && (
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
          <button
            onClick={() => setShowVirtualTour(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 2001
            }}
          >
            ×
          </button>
          <div style={{
            width: '90%',
            maxWidth: '1200px',
            height: '80vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '20px' }}>360° Virtual Tour</h2>
              <p style={{ color: '#666' }}>Virtual tour functionality would be integrated here</p>
              <p style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
                This would typically embed a Matterport or similar 3D tour
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floor Plan Modal */}
      {showFloorPlan && property.floorPlans && property.floorPlans.length > 0 && (
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
          <button
            onClick={() => setShowFloorPlan(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 2001
            }}
          >
            ×
          </button>
          <div style={{
            width: '90%',
            maxWidth: '1200px',
            height: '85vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Floor Plan {property.floorPlans.length > 1 ? `${currentFloorPlanIndex + 1} of ${property.floorPlans.length}` : ''}</h2>
              <a
                href={property.floorPlans[currentFloorPlanIndex].url}
                download={`floor-plan-${currentFloorPlanIndex + 1}.jpg`}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#000',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                </svg>
                Download
              </a>
            </div>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <img
                src={property.floorPlans[currentFloorPlanIndex].url}
                alt={property.floorPlans[currentFloorPlanIndex].caption || `Floor Plan ${currentFloorPlanIndex + 1}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
              {property.floorPlans.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentFloorPlanIndex(Math.max(0, currentFloorPlanIndex - 1))}
                    disabled={currentFloorPlanIndex === 0}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      fontSize: '24px',
                      cursor: currentFloorPlanIndex === 0 ? 'not-allowed' : 'pointer',
                      opacity: currentFloorPlanIndex === 0 ? 0.3 : 1
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setCurrentFloorPlanIndex(Math.min(property.floorPlans!.length - 1, currentFloorPlanIndex + 1))}
                    disabled={currentFloorPlanIndex === property.floorPlans.length - 1}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      fontSize: '24px',
                      cursor: currentFloorPlanIndex === property.floorPlans.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: currentFloorPlanIndex === property.floorPlans.length - 1 ? 0.3 : 1
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocuments && property.documents && property.documents.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setShowDocuments(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '20px',
              cursor: 'pointer',
              zIndex: 2001
            }}
          >
            ×
          </button>
          <div style={{
            width: '90%',
            maxWidth: '600px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '40px'
          }}>
            <h2 style={{ marginBottom: '24px', fontSize: '28px' }}>Property Documents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {property.documents.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: '#000',
                    transition: 'background-color 0.2s',
                    border: '1px solid #e5e5e5'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e5e5e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '16px' }}>{doc.name}</div>
                      {doc.format && (
                        <div style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase' }}>
                          {doc.format} Document
                        </div>
                      )}
                    </div>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                  </svg>
                </a>
              ))}
            </div>
            {property.documents.some(doc => doc.type === 'soi') && (
              <p style={{ marginTop: '20px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                📄 Statement of Information (SOI) includes property details, comparable sales, and vendor information as required by Victorian law.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Image Carousel */}
      {showFullscreenCarousel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setShowFullscreenCarousel(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              color: 'white',
              background: 'none',
              border: 'none',
              fontSize: '36px',
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            ×
          </button>

          <button
            onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
            disabled={currentImageIndex === 0}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentImageIndex === 0 ? 0.3 : 1
            }}
          >
            ‹
          </button>

          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            {images[currentImageIndex] && (
              <img
                src={images[currentImageIndex].url}
                alt={`Property image ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '90vh',
                  objectFit: 'contain'
                }}
              />
            )}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '18px'
            }}>
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          <button
            onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
            disabled={currentImageIndex === images.length - 1}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '24px',
              cursor: currentImageIndex === images.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentImageIndex === images.length - 1 ? 0.3 : 1
            }}
          >
            ›
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#999' }}>/</span>
          <Link href="/listings" style={{ color: '#666', textDecoration: 'none' }}>Properties</Link>
          <span style={{ margin: '0 8px', color: '#999' }}>/</span>
          <span style={{ color: '#000' }}>{property.address}</span>
        </div>

        {/* Image Grid */}
        {images.length > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: images.length > 1 ? '2fr 1fr 1fr' : '1fr',
              gridTemplateRows: '400px 200px',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    gridRow: index === 0 ? 'span 2' : 'span 1',
                    gridColumn: index === 0 && images.length > 1 ? 'span 1' : 'span 1',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#f5f5f5'
                  }}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowFullscreenCarousel(true);
                  }}
                >
                  <img
                    src={image.url}
                    alt={`Property image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  {index === displayImages.length - 1 && !showAllPhotos && images.length > 5 && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}>
                      +{images.length - 5} more
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Show all photos button */}
            {images.length > 5 && (
              <button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'white',
                  border: '1px solid #000',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {showAllPhotos ? 'Show less' : `Show all ${images.length} photos`}
              </button>
            )}
          </div>
        )}

        {/* Property Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Left Column */}
          <div>
            {/* Property Header */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h1 style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em'
                  }}>
                    {property.address || 'Property Address'}
                  </h1>
                  <p style={{
                    fontSize: '18px',
                    color: '#666'
                  }}>
                    {property.suburb}, {property.state} {property.postcode}
                  </p>
                </div>
                <SavePropertyButton propertyId={property.id} size="large" />
              </div>

              {/* Quick Features */}
              <div style={{
                display: 'flex',
                gap: '32px',
                padding: '24px 0',
                borderTop: '1px solid #e5e5e5',
                borderBottom: '1px solid #e5e5e5'
              }}>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>
                    {property.listingType === 'lease'
                      ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent'))
                      : (property.priceDisplay || formatPrice(property.price || 0))
                    }
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {property.listingType === 'lease' ? 'Rent' : 'Price'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.bedrooms || '–'}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Bedrooms</div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.bathrooms || '–'}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Bathrooms</div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontWeight: '700' }}>{property.carSpaces || '–'}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Parking</div>
                </div>
              </div>
            </div>

            {/* Inspection Times / Auction Details */}
            {(property.auctionDate || (property.inspectionTimes && property.inspectionTimes.length > 0)) && (
              <div style={{
                padding: '20px',
                backgroundColor: '#fff4e6',
                borderRadius: '8px',
                marginBottom: '32px',
                border: '1px solid #ffc107'
              }}>
                {property.saleMethod === 'auction' && property.auctionDate && (
                  <div style={{ marginBottom: property.inspectionTimes?.length ? '16px' : 0 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#ff6b00' }}>
                      🔨 Auction
                    </h3>
                    <p style={{ fontSize: '16px', color: '#333' }}>
                      {new Date(property.auctionDate).toLocaleDateString('en-AU', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                      })}
                    </p>
                    {property.auctionVenue && (
                      <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
                        {property.auctionVenue}
                      </p>
                    )}
                  </div>
                )}

                {property.inspectionTimes && property.inspectionTimes.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                      🏠 Open for Inspection
                    </h3>
                    {property.inspectionTimes.map((inspection) => (
                      <div key={inspection.id} style={{ marginBottom: '8px' }}>
                        <p style={{ fontSize: '16px', color: '#333' }}>
                          {new Date(inspection.startTime).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                          {' '}
                          {new Date(inspection.startTime).toLocaleTimeString('en-AU', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                          {' - '}
                          {new Date(inspection.endTime).toLocaleTimeString('en-AU', {
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Interactive Features */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setShowVirtualTour(true)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Virtual Tour
                </button>
                {property.floorPlans && property.floorPlans.length > 0 && (
                  <button
                    onClick={() => {
                      setCurrentFloorPlanIndex(0);
                      setShowFloorPlan(true);
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: 'white',
                      color: '#000',
                      border: '1px solid #000',
                      borderRadius: '4px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                      <line x1="9" y1="3" x2="9" y2="21" strokeWidth="2"/>
                      <line x1="9" y1="12" x2="21" y2="12" strokeWidth="2"/>
                    </svg>
                    Floor Plan{property.floorPlans.length > 1 ? 's' : ''}
                  </button>
                )}
                <button
                  onClick={handleShare}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'white',
                    color: '#000',
                    border: '1px solid #000',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
                <AskAI
                  propertyId={property.id}
                  propertyAddress={`${(property.address || '').replace(/ VIC$/, '')}, ${property.suburb || ''} ${property.postcode || ''}`}
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

            {/* Description */}
            {property.description && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Description</h2>
                <p style={{ lineHeight: '1.8', color: '#333', fontSize: '16px' }}>
                  {property.description}
                </p>
              </div>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Features</h2>
                <ul style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '12px',
                  listStyle: 'none',
                  padding: 0
                }}>
                  {property.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ color: '#4CAF50', fontSize: '20px' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Property Details Grid */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Property Details</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '24px',
                padding: '24px',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Property Type</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.propertyType || 'House'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Bedrooms</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.bedrooms || '–'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Bathrooms</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.bathrooms || '–'}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Car Spaces</div>
                  <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.carSpaces || '–'}</div>
                </div>
                {property.landSize && property.landSize > 0 && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Land Size</div>
                    <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.landSize} m²</div>
                  </div>
                )}
                {property.buildingSize && property.buildingSize > 0 && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Building Size</div>
                    <div style={{ fontSize: '16px', fontWeight: '600' }}>{property.buildingSize} m²</div>
                  </div>
                )}
                {property.saleMethod && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Sale Method</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>{property.saleMethod}</div>
                  </div>
                )}
                {property.listingType && (
                  <div>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Listing Type</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
                      {property.listingType === 'sale' ? 'For Sale' : property.listingType === 'lease' ? 'For Lease' : 'Sale & Lease'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Agent Contact */}
          <div>
            <div style={{
              position: 'sticky',
              top: '20px'
            }}>
              {/* Agent Contact Card */}
              <div style={{
                padding: '24px',
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Contact Agent</h3>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px' }}>
                    {property.agent?.name || 'Grant\'s Estate Agents'}
                  </div>
                  <div style={{ color: '#666', marginBottom: '4px' }}>
                    {property.agent?.phone || '1300 000 000'}
                  </div>
                  <div style={{ color: '#666' }}>
                    {property.agent?.email || 'info@grantsea.com.au'}
                  </div>
                </div>

                {/* Enquiry Form */}
                <form onSubmit={handleEnquiry}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <textarea
                    placeholder="Your Message"
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '14px',
                      minHeight: '100px',
                      resize: 'vertical'
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: enquirySent ? '#4CAF50' : '#000',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    {enquirySent ? 'Enquiry Sent!' : 'Send Enquiry'}
                  </button>
                </form>
              </div>

              {/* Request Inspection Button */}
              <button
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: 'white',
                  color: '#000',
                  border: '2px solid #000',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}
              >
                Request Inspection
              </button>

              {/* Download Documents */}
              {property.documents && property.documents.length > 0 && (
                <button
                  onClick={() => setShowDocuments(true)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: 'white',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3 3m0 0l-3-3m3 3V8" />
                  </svg>
                  Download Documents ({property.documents.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Similar Properties in {property.suburb}
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {similarProperties.map((similarProperty) => (
                <Link
                  key={similarProperty.id}
                  href={`/property/${similarProperty.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    {similarProperty.images && similarProperty.images[0] ? (
                      <div style={{
                        height: '200px',
                        backgroundColor: '#f5f5f5',
                        position: 'relative'
                      }}>
                        <img
                          src={similarProperty.images[0].url}
                          alt={similarProperty.address}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{
                        height: '200px',
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: '#999' }}>No image available</span>
                      </div>
                    )}
                    <div style={{ padding: '20px' }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em'
                      }}>
                        {similarProperty.listingType === 'lease'
                          ? (similarProperty.leasePriceDisplay || (similarProperty.leasePrice ? `$${similarProperty.leasePrice} per week` : 'Contact Agent'))
                          : (similarProperty.priceDisplay || formatPrice(similarProperty.price || 0))
                        }
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
                        gap: '16px',
                        fontSize: '14px',
                        color: '#333'
                      }}>
                        {similarProperty.bedrooms && (
                          <span>{similarProperty.bedrooms} bed</span>
                        )}
                        {similarProperty.bathrooms && (
                          <span>{similarProperty.bathrooms} bath</span>
                        )}
                        {similarProperty.carSpaces !== undefined && (
                          <span>{similarProperty.carSpaces} car</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}