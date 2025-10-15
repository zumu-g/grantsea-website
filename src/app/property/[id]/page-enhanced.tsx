'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import AskAI from '@/components/AskAI';
import VirtualTourEmbed from '@/components/VirtualTourEmbed';
import { fetchPropertyOpenHomes } from '@/services/openHomes';

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
  virtualTourType?: 'matterport' | 'youtube' | 'vimeo' | 'other';
  videoUrl?: string;
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
    photo?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  yearBuilt?: number;
  ensuites?: number;
  toilets?: number;
  receptionRooms?: number;
  energyRating?: number;
  zoning?: string;
  isNewHome?: boolean;
  tenanted?: boolean;
  rates?: {
    water?: number;
    council?: number;
    strata?: number;
  };
  daysOnMarket?: number;
  listingDate?: string;
}

// Mock schools data - in production this would come from an API
const mockSchools = [
  { name: 'Berwick Primary School', type: 'Primary', distance: '0.8km', rating: 4.5 },
  { name: 'Nossal High School', type: 'Secondary', distance: '1.2km', rating: 4.8 },
  { name: 'St Margaret\'s School', type: 'Primary', distance: '1.5km', rating: 4.3 },
  { name: 'Berwick College', type: 'Secondary', distance: '2.1km', rating: 4.2 },
  { name: 'Berwick Fields Primary School', type: 'Primary', distance: '2.3km', rating: 4.4 }
];

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
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  const [aiInput, setAiInput] = useState('');
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: "I'm interested in this property..."
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch property data
  useEffect(() => {
    if (!params.id) {
      console.error('[PropertyPage] No property ID in params');
      setError('No property ID provided');
      setLoading(false);
      return;
    }

    console.log('[PropertyPage] Fetching property:', params.id);

    const fetchData = async () => {
      try {
        console.log('[PropertyPage] Starting fetch for:', `/api/properties/${params.id}`);
        const response = await fetch(`/api/properties/${params.id}`);
        console.log('[PropertyPage] Response status:', response.status);
        const data = await response.json();
        console.log('[PropertyPage] Response data:', data);

        if (response.ok && data.success && data.data) {
          console.log('[PropertyPage] Property loaded successfully');
          
          // Fetch open homes for this property
          const openHomes = await fetchPropertyOpenHomes(params.id as string);
          console.log('[PropertyPage] Open homes fetched:', openHomes);
          
          // Merge open homes into property data
          const propertyWithOpenHomes = {
            ...data.data,
            inspectionTimes: openHomes.length > 0 ? openHomes : data.data.inspectionTimes || []
          };
          
          setProperty(propertyWithOpenHomes);

          // Fetch similar properties
          if (data.data.suburb) {
            try {
              const similarResponse = await fetch(`/api/properties?suburb=${data.data.suburb}&limit=4&type=${data.data.listingType || 'all'}`);
              const similarData = await similarResponse.json();
              if (similarData.success && similarData.data) {
                setSimilarProperties(similarData.data.filter((p: Property) => p.id !== data.data.id).slice(0, 3));
              }
            } catch (err) {
              console.error('[PropertyPage] Failed to load similar properties:', err);
            }
          }
        } else {
          console.error('[PropertyPage] Failed to load property:', data.error);
          setError(data.error || 'Failed to load property');
        }
      } catch (err) {
        console.error('[PropertyPage] Fetch error:', err);
        setError('Failed to load property: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        console.log('[PropertyPage] Setting loading to false');
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  // Keyboard navigation for carousel
  useEffect(() => {
    if (!property?.images) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showFullscreenCarousel || !property?.images) return;

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
    setShowShareMenu(!showShareMenu);
  };
  
  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this property: ${property?.address}, ${property?.suburb}`);
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'instagram':
        // Instagram doesn't have direct share URL, so we copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied! Share it on Instagram');
        setShowShareMenu(false);
        return;
      case 'email':
        shareUrl = `mailto:?subject=${text}&body=${text}%20${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
    }
  };

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enquiry sent:', enquiryForm);
    setEnquirySent(true);
    setTimeout(() => setEnquirySent(false), 3000);
  };

  const handleAISend = () => {
    if (!aiInput.trim()) return;
    
    setAiMessages([...aiMessages, { role: 'user', content: aiInput }]);
    setAiInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setAiMessages(prev => [...prev, {
        role: 'ai',
        content: `I can help you with information about this property at ${property?.address}. The property features ${property?.bedrooms} bedrooms and ${property?.bathrooms} bathrooms. What specific information would you like to know?`
      }]);
    }, 1000);
  };

  const addToCalendar = () => {
    if (!property?.inspectionTimes || property.inspectionTimes.length === 0) return;
    
    const inspection = property.inspectionTimes[0];
    const startDate = new Date(inspection.startTime);
    const endDate = new Date(inspection.endTime);
    
    // Format dates for calendar
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const title = encodeURIComponent(`Property Inspection: ${property.address}`);
    const details = encodeURIComponent(`Viewing property at ${property.address}, ${property.suburb}`);
    const location = encodeURIComponent(`${property.address}, ${property.suburb} ${property.state} ${property.postcode}`);
    
    // Google Calendar URL
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}&location=${location}`;
    
    window.open(googleUrl, '_blank');
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
            maxWidth: '1400px',
            height: '85vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: property.virtualTourUrl ? '0' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {property.virtualTourUrl && property.virtualTourType ? (
              <VirtualTourEmbed
                url={property.virtualTourUrl}
                type={property.virtualTourType}
                title={`Virtual Tour - ${property.address}`}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '28px' }}>360° Virtual Tour</h2>
                <p style={{ color: '#666', fontSize: '16px' }}>
                  Virtual tour not available for this property
                </p>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#999' }}>
                  Contact the agent to arrange an in-person inspection
                </p>
              </div>
            )}
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
                    color: '#333',
                    transition: 'background-color 0.2s'
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>{doc.name}</span>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Carousel */}
      {showFullscreenCarousel && images.length > 0 && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          zIndex: 2000,
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

          <button
            onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
            disabled={currentImageIndex === 0}
            style={{
              position: 'absolute',
              left: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '30px',
              cursor: currentImageIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentImageIndex === 0 ? 0.3 : 1,
              zIndex: 2001
            }}
          >
            ‹
          </button>

          <img
            src={images[currentImageIndex].url}
            alt={`Property image ${currentImageIndex + 1}`}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />

          <button
            onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
            disabled={currentImageIndex === images.length - 1}
            style={{
              position: 'absolute',
              right: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              fontSize: '30px',
              cursor: currentImageIndex === images.length - 1 ? 'not-allowed' : 'pointer',
              opacity: currentImageIndex === images.length - 1 ? 0.3 : 1,
              zIndex: 2001
            }}
          >
            ›
          </button>

          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '8px 16px',
            borderRadius: '20px'
          }}>
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ padding: isMobile ? '0' : '0' }}>
        {/* Image Gallery */}
        {images.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            {images.length === 1 ? (
              <div 
                style={{ 
                  position: 'relative', 
                  height: isMobile ? '300px' : '600px', 
                  overflow: 'hidden',
                  cursor: 'pointer' 
                }}
                onClick={() => {
                  setCurrentImageIndex(0);
                  setShowFullscreenCarousel(true);
                }}
              >
                <img
                  src={images[0].url}
                  alt={property.address}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <SavePropertyButton
                  propertyId={property.id}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    zIndex: 10
                  }}
                />
              </div>
            ) : (
              <div>
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: images.length === 2 ? '1fr 1fr' : images.length === 3 ? '2fr 1fr' : '2fr 1fr 1fr',
                    gap: '8px',
                    height: isMobile ? '300px' : '600px',
                    overflow: 'hidden'
                  }}
                >
                  {displayImages.map((image, index) => (
                    <div 
                      key={index}
                      style={{
                        position: 'relative',
                        gridColumn: index === 0 ? (images.length === 3 ? 'span 1' : 'span 1') : undefined,
                        gridRow: index === 0 && images.length > 3 ? 'span 2' : undefined,
                        height: '100%',
                        overflow: 'hidden',
                        cursor: 'pointer'
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
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                      {index === 0 && (
                        <SavePropertyButton
                          propertyId={property.id}
                          style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            zIndex: 10
                          }}
                        />
                      )}
                      {index === displayImages.length - 1 && images.length > 5 && !showAllPhotos && (
                        <div 
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '600'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowAllPhotos(true);
                          }}
                        >
                          +{images.length - 5} more
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {showAllPhotos && images.length > 5 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '8px',
                    marginTop: '8px'
                  }}>
                    {images.slice(5).map((image, index) => (
                      <div
                        key={index + 5}
                        style={{
                          aspectRatio: '4/3',
                          overflow: 'hidden',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setCurrentImageIndex(index + 5);
                          setShowFullscreenCarousel(true);
                        }}
                      >
                        <img
                          src={image.url}
                          alt={`Property image ${index + 6}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Property Details and Agent Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '20px' : '40px'
        }}>
          {/* Left Column - Property Details */}
          <div>
            {/* Property Header - ON RUNNING STYLE */}
            <div style={{ marginBottom: '48px' }}>
              <h1 style={{
                fontSize: isMobile ? '36px' : '48px',
                fontWeight: '700',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                lineHeight: '1.1',
                color: '#000000'
              }}>
                {property.listingType === 'lease' 
                  ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent'))
                  : (property.priceDisplay || formatPrice(property.price || 0))
                }
              </h1>
              <p style={{
                fontSize: '24px',
                color: '#000000',
                marginBottom: '8px',
                fontWeight: '500',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>
                {(property.address || '').replace(/ VIC$/, '')}, {property.suburb}
              </p>
              <div style={{
                display: 'flex',
                gap: '32px',
                fontSize: '17px',
                color: '#525252',
                marginBottom: '24px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontWeight: '500'
              }}>
                {property.bedrooms !== undefined && property.bedrooms !== null && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <strong>{property.bedrooms}</strong> Bedrooms
                  </span>
                )}
                {property.bathrooms !== undefined && property.bathrooms !== null && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0a1 1 0 011 1v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a1 1 0 011-1h4m12 0V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v3m-9 5v6" />
                    </svg>
                    <strong>{property.bathrooms}</strong> Bathrooms
                  </span>
                )}
                {property.carSpaces !== undefined && property.carSpaces !== null && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <strong>{property.carSpaces}</strong> Cars
                  </span>
                )}
              </div>
            </div>

            {/* Open for Inspection & Auction - ON RUNNING STYLE */}
            {(property.inspectionTimes?.length || property.auctionDate) && (
              <div style={{
                padding: '32px',
                backgroundColor: '#000000',
                borderRadius: '0',
                marginBottom: '48px',
                border: '2px solid #000000'
              }}>
                {property.saleMethod === 'auction' && property.auctionDate && (
                  <div style={{ marginBottom: property.inspectionTimes?.length ? '24px' : 0 }}>
                    <h3 style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      AUCTION
                    </h3>
                    <p style={{
                      fontSize: '17px',
                      color: '#ffffff',
                      fontWeight: '500',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      {new Date(property.auctionDate).toLocaleDateString('en-AU', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Australia/Melbourne'
                      })}
                    </p>
                    {property.auctionVenue && (
                      <p style={{
                        fontSize: '13px',
                        color: '#d4d4d4',
                        marginTop: '8px',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        {property.auctionVenue}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <h3 style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    OPEN FOR INSPECTION
                  </h3>
                  {property.inspectionTimes && property.inspectionTimes.length > 0 ? (
                    property.inspectionTimes.map((inspection) => (
                      <div key={inspection.id} style={{ marginBottom: '12px' }}>
                        <p style={{
                          fontSize: '17px',
                          color: '#ffffff',
                          fontWeight: '500',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}>
                          {new Date(inspection.startTime).toLocaleDateString('en-AU', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            timeZone: 'Australia/Melbourne'
                          })}
                          {' '}
                          {new Date(inspection.startTime).toLocaleTimeString('en-AU', {
                            hour: 'numeric',
                            minute: 'numeric',
                            timeZone: 'Australia/Melbourne'
                          })}
                          {' - '}
                          {new Date(inspection.endTime).toLocaleTimeString('en-AU', {
                            hour: 'numeric',
                            minute: 'numeric',
                            timeZone: 'Australia/Melbourne'
                          })}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p style={{
                      fontSize: '17px',
                      color: '#ffffff',
                      fontWeight: '500',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      Contact agent to arrange an inspection
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Interactive Features - ON RUNNING STYLE */}
            <div style={{ marginBottom: '64px' }}>
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                {property.virtualTourUrl && (
                  <button
                    onClick={() => setShowVirtualTour(true)}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      transition: 'all 300ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#262626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {property.virtualTourType === 'matterport' ? '3D Virtual Tour' : 'Virtual Tour'}
                  </button>
                )}
                
                {property.floorPlans && property.floorPlans.length > 0 && (
                  <button
                    onClick={() => {
                      setCurrentFloorPlanIndex(0);
                      setShowFloorPlan(true);
                    }}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      transition: 'all 300ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#262626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000000';
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
                
                {/* Share Button with Dropdown */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={handleShare}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      transition: 'all 300ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                  
                  {/* Share Menu Dropdown */}
                  {showShareMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      backgroundColor: '#ffffff',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      minWidth: '200px',
                      zIndex: 100,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}>
                      {[
                        { name: 'Facebook', icon: 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z', platform: 'facebook' },
                        { name: 'X (Twitter)', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', platform: 'twitter' },
                        { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z', platform: 'linkedin' },
                        { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', platform: 'whatsapp' },
                        { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z', platform: 'instagram' },
                        { name: 'Email', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z', platform: 'email' },
                        { name: 'Copy Link', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244', platform: 'copy' }
                      ].map((social) => (
                        <button
                          key={social.platform}
                          onClick={() => shareToSocial(social.platform)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            fontFamily: '"Helvetica Neue", Arial, sans-serif'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d={social.icon} />
                          </svg>
                          {social.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Add to Calendar Button */}
                {property.inspectionTimes && property.inspectionTimes.length > 0 && (
                  <button
                    onClick={addToCalendar}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: '2px solid #000000',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      transition: 'all 300ms ease-out'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                    </svg>
                    Add to Calendar
                  </button>
                )}
                
                <AskAI
                  propertyId={property.id}
                  propertyAddress={`${(property.address || '').replace(/ VIC$/, '')}, ${property.suburb || ''} ${property.postcode || ''}`}
                  propertyData={{
                    price: property.price,
                    priceDisplay: property.priceDisplay,
                    leasePrice: property.leasePrice,
                    leasePriceDisplay: property.leasePriceDisplay,
                    listingType: (property.listingType as 'sale' | 'lease' | 'both') || 'sale',
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

            {/* AI Assistant Box - Styled like reviews page */}
            <div style={{
              marginBottom: '64px',
              backgroundColor: '#000',
              padding: '40px',
              borderRadius: '0',
              border: '2px solid #000'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#fff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Grant's AI Property Assistant
                </h3>
                <span style={{
                  backgroundColor: '#FFD700',
                  color: '#000',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: '700',
                  textTransform: 'uppercase'
                }}>
                  NEW
                </span>
              </div>
              
              {!showAIChat ? (
                <div style={{ textAlign: 'center' }}>
                  <p style={{
                    color: '#fff',
                    fontSize: '16px',
                    marginBottom: '24px',
                    opacity: 0.9,
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    Get instant answers about this property, the area, schools, and more
                  </p>
                  <button
                    onClick={() => setShowAIChat(true)}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#fff',
                      color: '#000',
                      border: 'none',
                      borderRadius: '0',
                      fontSize: '14px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
                  >
                    Start Conversation
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                    backgroundColor: '#111',
                    padding: '20px',
                    borderRadius: '0'
                  }}>
                    {aiMessages.length === 0 && (
                      <div style={{
                        color: '#fff',
                        opacity: 0.7,
                        textAlign: 'center',
                        marginTop: '40px',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Hi! I'm here to help answer any questions about {property.address}. What would you like to know?
                      </div>
                    )}
                    {aiMessages.map((msg, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: '16px',
                          display: 'flex',
                          justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                        }}
                      >
                        <div
                          style={{
                            maxWidth: '70%',
                            padding: '12px 16px',
                            backgroundColor: msg.role === 'user' ? '#fff' : '#222',
                            color: msg.role === 'user' ? '#000' : '#fff',
                            borderRadius: '0',
                            fontSize: '14px',
                            fontFamily: '"Helvetica Neue", Arial, sans-serif'
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <input
                      type="text"
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleAISend();
                      }}
                      placeholder="Ask about price, features, schools, area..."
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        backgroundColor: '#222',
                        border: '2px solid #444',
                        borderRadius: '0',
                        color: '#fff',
                        fontSize: '14px',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                    />
                    <button
                      onClick={handleAISend}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: '#fff',
                        color: '#000',
                        border: 'none',
                        borderRadius: '0',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description - ON RUNNING STYLE */}
            {property.description && (
              <div style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>About this property</h2>
                <div style={{
                  lineHeight: '1.8',
                  color: '#404040',
                  fontSize: '17px',
                  maxWidth: '750px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontWeight: '400'
                }}>
                  {property.description
                    .replace(/&#x2022;/g, '→')
                    .replace(/&bull;/g, '→')
                    .replace(/•/g, '→')
                    .split('\n')
                    .map((line, index) => (
                      <div key={index} style={{ marginBottom: line.trim().startsWith('→') ? '8px' : '0' }}>
                        {line}
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            {/* Features - ON RUNNING STYLE */}
            {property.features && property.features.length > 0 && (
              <div style={{
                marginBottom: '64px',
                paddingTop: '48px',
                paddingBottom: '48px',
                borderTop: '2px solid #000000',
                borderBottom: '2px solid #000000'
              }}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1.1'
                }}>Key Features</h1>
                <ul style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '24px',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {property.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '16px',
                      fontSize: '15px',
                      lineHeight: '1.6',
                      color: '#404040',
                      padding: 0,
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontWeight: '500'
                    }}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        style={{
                          marginTop: '2px',
                          flexShrink: 0
                        }}
                      >
                        <path
                          d="M7 10L9.5 12.5L13 9"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="10"
                          cy="10"
                          r="9"
                          stroke="#000000"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <span style={{ flex: 1 }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Nearby Schools Section */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '32px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#000000',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Nearby Schools</h2>
              
              <div style={{
                display: 'grid',
                gap: '16px'
              }}>
                {mockSchools.map((school, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '0',
                      border: '1px solid #e5e5e5',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e5e5e5';
                    }}
                  >
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '4px',
                        color: '#000',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        {school.name}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#666',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        {school.type} • {school.distance}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        display: 'flex',
                        gap: '2px'
                      }}>
                        {[...Array(5)].map((_, starIndex) => (
                          <svg
                            key={starIndex}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={starIndex < Math.floor(school.rating) ? '#FFD700' : 'none'}
                            stroke={starIndex < Math.floor(school.rating) ? '#FFD700' : '#ccc'}
                            strokeWidth="2"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#333',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        {school.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <a
                href="/schools-guide"
                style={{
                  display: 'inline-block',
                  marginTop: '24px',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'background-color 0.2s',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#262626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                View Full Schools Guide →
              </a>
            </div>

            {/* Property Details Grid - ON RUNNING STYLE */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '32px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#000000',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Property Information</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                padding: '48px',
                backgroundColor: '#ffffff',
                borderRadius: '0',
                border: '2px solid #000000'
              }}>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#525252',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: '700',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Property Type</div>
                  <div style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>{property.propertyType || 'House'}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#525252',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: '700',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Bedrooms</div>
                  <div style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>{property.bedrooms !== undefined && property.bedrooms !== null ? property.bedrooms : '–'}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#525252',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: '700',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Bathrooms</div>
                  <div style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>{property.bathrooms !== undefined && property.bathrooms !== null ? property.bathrooms : '–'}</div>
                </div>
                <div>
                  <div style={{
                    fontSize: '11px',
                    color: '#525252',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: '700',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>Car Spaces</div>
                  <div style={{
                    fontSize: '17px',
                    fontWeight: '700',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>{property.carSpaces !== undefined && property.carSpaces !== null ? property.carSpaces : '–'}</div>
                </div>
                {property.landSize && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Land Size</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.landSize} m²</div>
                  </div>
                )}
                {property.buildingSize && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Building Size</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.buildingSize} m²</div>
                  </div>
                )}
                {property.yearBuilt && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Year Built</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.yearBuilt}</div>
                  </div>
                )}
                {property.energyRating && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Energy Rating</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.energyRating} stars</div>
                  </div>
                )}
              </div>
            </div>

            {/* Local Area Guide - ON RUNNING STYLE */}
            {property.suburb && (
              <div style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Local Area</h2>

                <div style={{
                  padding: '48px',
                  backgroundColor: '#000',
                  color: '#fff'
                }}>
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
                      Discover {property.suburb}
                    </div>
                    <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#d4d4d4' }}>
                      Explore schools, transport, shopping, parks, healthcare, and everything else this area has to offer.
                    </p>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: '24px',
                    marginBottom: '32px',
                    paddingTop: '24px',
                    borderTop: '1px solid #333'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transport</div>
                      <div style={{ fontSize: '15px' }}>Train • Bus • Freeway</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shopping</div>
                      <div style={{ fontSize: '15px' }}>Malls • Supermarkets</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Education</div>
                      <div style={{ fontSize: '15px' }}>Schools • Childcare</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lifestyle</div>
                      <div style={{ fontSize: '15px' }}>Parks • Healthcare</div>
                    </div>
                  </div>

                  <a
                    href={`/suburbs/${property.suburb.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      display: 'inline-block',
                      padding: '16px 32px',
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e5e5e5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fff';
                    }}
                  >
                    View Local Area Guide →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Agent Contact */}
          <div>
            <div style={{
              position: 'sticky',
              top: '20px'
            }}>
              {/* Agent Photo Box */}
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                marginBottom: '24px',
                overflow: 'hidden'
              }}>
                {property.agent?.photo && !property.agent.photo.includes('default-agent') && property.agent.photo.startsWith('http') ? (
                  <>
                    <img
                      src={property.agent.photo}
                      alt={property.agent.name}
                      style={{
                        width: '100%',
                        height: '780px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div style="width: 100%; height: 780px; background-color: #f5f5f5; display: flex; align-items: center; justify-content: center; padding: 40px;">
                              <div style="text-align: center;">
                                <div style="width: 140px; height: 140px; border-radius: 50%; background-color: #e5e5e5; display: flex; align-items: center; justify-content: center; font-size: 56px; font-weight: 700; margin: 0 auto 20px;">${(property.agent?.name?.charAt(0) || 'G')}</div>
                                <div style="font-size: 28px; font-weight: 600; margin-bottom: 12px; color: #2c2c2c;">${property.agent?.name || "Grant's Agent"}</div>
                                <div style="font-size: 17px; color: #666; margin-bottom: 6px;">Grant's Estate Agents</div>
                                <div style="font-size: 17px; color: #666;">${property.agent?.phone || '1300 000 000'}</div>
                                ${property.agent?.email ? `<div style="font-size: 17px; color: #666; margin-top: 6px;">${property.agent.email}</div>` : ''}
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
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
                      <div style={{ fontSize: '14px', color: '#d4d4d4', marginBottom: '4px' }}>
                        Sales Agent
                      </div>
                      <div style={{ fontSize: '16px' }}>Grant's Estate Agents</div>
                    </div>
                  </>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '780px',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                        backgroundColor: '#e5e5e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '56px',
                        fontWeight: '700',
                        margin: '0 auto 20px'
                      }}>
                        {property.agent?.name?.charAt(0) || 'G'}
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px', color: '#2c2c2c' }}>
                        {property.agent?.name || 'Grant\'s Agent'}
                      </div>
                      <div style={{ fontSize: '17px', color: '#666', marginBottom: '6px' }}>
                        Grant\'s Estate Agents
                      </div>
                      <div style={{ fontSize: '17px', color: '#666' }}>
                        {property.agent?.phone || '1300 000 000'}
                      </div>
                      {property.agent?.email && (
                        <div style={{ fontSize: '17px', color: '#666', marginTop: '6px' }}>
                          {property.agent.email}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* What's Your Home Worth Box */}
              <div style={{
                padding: '32px',
                backgroundColor: '#f5f5f5',
                border: '2px solid #e5e5e5',
                borderRadius: '0',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Like to know what your home is worth?
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '24px',
                  lineHeight: '1.6',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Get a free market appraisal from our expert team
                </p>
                <a
                  href="/appraisal"
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    transition: 'background-color 0.2s',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#262626';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                  }}
                >
                  Get Free Appraisal
                </a>
              </div>

              {/* Agent Contact Card - ON RUNNING STYLE */}
              <div style={{
                padding: '32px',
                backgroundColor: '#000000',
                border: '2px solid #000000',
                borderRadius: '0',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '17px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Contact Agent</h3>

                {/* Enquiry Form - ON RUNNING STYLE */}
                <form onSubmit={handleEnquiry}>
                  <input
                    type="text"
                    placeholder="YOUR NAME"
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      marginBottom: '16px',
                      border: '2px solid #ffffff',
                      borderRadius: '0',
                      fontSize: '13px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontWeight: '500',
                      letterSpacing: '0.05em'
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="YOUR EMAIL"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      marginBottom: '16px',
                      border: '2px solid #ffffff',
                      borderRadius: '0',
                      fontSize: '13px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontWeight: '500',
                      letterSpacing: '0.05em'
                    }}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="YOUR PHONE"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      marginBottom: '16px',
                      border: '2px solid #ffffff',
                      borderRadius: '0',
                      fontSize: '13px',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontWeight: '500',
                      letterSpacing: '0.05em'
                    }}
                    required
                  />
                  <textarea
                    placeholder="YOUR MESSAGE"
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      marginBottom: '24px',
                      border: '2px solid #ffffff',
                      borderRadius: '0',
                      fontSize: '13px',
                      minHeight: '120px',
                      resize: 'vertical',
                      backgroundColor: '#000000',
                      color: '#ffffff',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      fontWeight: '500',
                      letterSpacing: '0.05em'
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '18px',
                      backgroundColor: enquirySent ? '#ffffff' : '#ffffff',
                      color: '#000000',
                      border: '2px solid #ffffff',
                      borderRadius: '0',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 300ms ease-out',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      if (!enquirySent) {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
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