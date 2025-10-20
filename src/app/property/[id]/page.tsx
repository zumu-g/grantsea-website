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
  status?: string;
}

// Helper function to get default features for properties without feature data
const getDefaultFeatures = (property: Property): string[] => {
  const features: string[] = [];
  
  // Add basic property features based on property data
  if (property.propertyType === 'House') {
    features.push('Spacious family home');
    if (property.landSize && property.landSize > 600) {
      features.push('Large land size');
    }
    if (property.bedrooms && property.bedrooms >= 4) {
      features.push('Multiple living areas');
    }
    if (property.carSpaces && property.carSpaces >= 2) {
      features.push('Secure parking');
    }
  } else if (property.propertyType === 'Apartment' || property.propertyType === 'Unit') {
    features.push('Modern apartment living');
    features.push('Low maintenance lifestyle');
    if (property.bathrooms && property.bathrooms >= 2) {
      features.push('Multiple bathrooms');
    }
  } else if (property.propertyType === 'Townhouse') {
    features.push('Contemporary townhouse');
    features.push('Private courtyard');
    features.push('Modern fixtures');
  }
  
  // Add listing-type specific features
  if (property.listingType === 'sale') {
    features.push('Excellent investment opportunity');
    features.push('Prime location');
    if (property.suburb) {
      features.push(`Sought-after ${property.suburb} location`);
    }
  } else if (property.listingType === 'lease') {
    features.push('Available now');
    features.push('Well-maintained property');
  }
  
  // Add general features
  features.push('Close to schools and transport');
  features.push('Near shopping and amenities');
  
  return features.slice(0, 8); // Limit to 8 features
};

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
  const [showInspectionRequest, setShowInspectionRequest] = useState(false);
  const [enquirySent, setEnquirySent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: "I'm interested in this property..."
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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

      {/* Inspection Request Modal */}
      {showInspectionRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'max(2rem, 3.33vw)'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowInspectionRequest(false);
          }
        }}
        >
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '2px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e8e8e8'
          }}>
            {/* Header */}
            <div style={{
              padding: 'max(2rem, 3.33vw)',
              borderBottom: '1px solid #e8e8e8',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: '400',
                  fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                  color: '#000',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.2'
                }}>
                  Request Inspection
                </h2>
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: '16px',
                  color: '#666',
                  fontWeight: '300',
                  lineHeight: '1.4'
                }}>
                  Schedule a viewing for {property?.address}
                </p>
              </div>
              <button
                onClick={() => setShowInspectionRequest(false)}
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  transition: 'all 0.2s ease',
                  borderRadius: '2px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#666';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: 'max(2rem, 3.33vw)' }}>
              <p style={{
                fontSize: '16px',
                color: '#333',
                marginBottom: '24px',
                lineHeight: '1.5'
              }}>
                {property?.inspectionTimes && property.inspectionTimes.length > 0 ? (
                  <>You can attend one of our scheduled open inspections or request a private viewing at a time that suits you.</>
                ) : (
                  <>No open inspections are currently scheduled. Please contact our agent to arrange a private viewing.</>
                )}
              </p>

              {/* Scheduled Inspections */}
              {property?.inspectionTimes && property.inspectionTimes.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#000'
                  }}>
                    Scheduled Open Inspections
                  </h3>
                  {property.inspectionTimes.map((inspection) => (
                    <div key={inspection.id} style={{
                      padding: '16px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '4px',
                      marginBottom: '12px',
                      border: '1px solid #e8e8e8'
                    }}>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#000',
                        marginBottom: '4px'
                      }}>
                        {new Date(inspection.startTime).toLocaleDateString('en-AU', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div style={{ fontSize: '14px', color: '#666' }}>
                        {new Date(inspection.startTime).toLocaleTimeString('en-AU', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })} - {new Date(inspection.endTime).toLocaleTimeString('en-AU', {
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Contact Agent Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {property?.agent?.phone && (
                  <a
                    href={`tel:${property.agent.phone}`}
                    style={{
                      display: 'block',
                      padding: '16px',
                      backgroundColor: '#000',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                    }}
                  >
                    Call {property.agent.name || 'Agent'}: {property.agent.phone}
                  </a>
                )}
                
                {property?.agent?.email && (
                  <a
                    href={`mailto:${property.agent.email}?subject=Inspection Request - ${property.address}&body=Hi, I would like to schedule an inspection for ${property.address}. Please let me know your available times.`}
                    style={{
                      display: 'block',
                      padding: '16px',
                      backgroundColor: 'white',
                      color: '#000',
                      textDecoration: 'none',
                      border: '2px solid #000',
                      borderRadius: '4px',
                      fontSize: '16px',
                      fontWeight: '600',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#000';
                      e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#000';
                    }}
                  >
                    Email {property.agent.name || 'Agent'}
                  </a>
                )}
              </div>
            </div>
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
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        paddingLeft: isMobile ? 'clamp(1rem, 4.2667vw, 2rem)' : 'max(2rem, 3.33vw)',
        paddingRight: isMobile ? 'clamp(1rem, 4.2667vw, 2rem)' : 'max(2rem, 3.33vw)',
        paddingTop: '20px',
        paddingBottom: '60px'
      }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px', color: '#999' }}>/</span>
          <Link href="/listings" style={{ color: '#666', textDecoration: 'none' }}>Properties</Link>
          <span style={{ margin: '0 8px', color: '#999' }}>/</span>
          <span style={{ color: '#000' }}>{property.address}</span>
        </div>

        {/* Image Grid - Enhanced Designer Layout */}
        {images.length > 0 && (
          <div style={{ marginBottom: '60px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : (images.length > 1 ? '2fr 1fr 1fr' : '1fr'),
              gridTemplateRows: isMobile ? 'repeat(auto-fit, 400px)' : '500px 240px',
              gap: '12px',
              marginBottom: '24px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  style={{
                    gridRow: !isMobile && index === 0 ? 'span 2' : 'span 1',
                    gridColumn: !isMobile && index === 0 && images.length > 1 ? 'span 1' : 'span 1',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: '#f5f5f5',
                    transition: 'transform 0.2s ease'
                  }}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowFullscreenCarousel(true);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
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
                      fontSize: '20px',
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
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  border: '1px solid #000',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#000';
                }}
              >
                {showAllPhotos ? 'Show less' : `Show all ${images.length} photos`}
              </button>
            )}
          </div>
        )}

        {/* Property Details Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'calc(66.666% - 27px) calc(33.333% - 13px)',
          gap: isMobile ? '32px' : '60px',
          width: '100%'
        }}>
          {/* Left Column */}
          <div>
            {/* Property Header - ON RUNNING STYLE */}
            <div style={{ marginBottom: '64px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div>
                  {/* Property Type Label */}
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#525252',
                    marginBottom: '16px',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {property.propertyType || 'HOUSE'} FOR {property.listingType === 'lease' ? 'LEASE' : 'SALE'}
                  </div>

                  {/* Address - UPPERCASE BOLD */}
                  <h1 style={{
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {property.address ? property.address.replace(/, VIC$/, '').replace(/VIC$/, '').split(',')[0].trim() : 'PROPERTY ADDRESS'}
                  </h1>

                  {/* Suburb - Uppercase */}
                  <p style={{
                    fontSize: '17px',
                    color: '#404040',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {property.suburb}{property.state && property.state !== 'VIC' ? `, ${property.state}` : ''} {property.postcode}
                  </p>
                </div>
                <SavePropertyButton property={{
                  id: property.id,
                  address: property.address || 'Address not available',
                  suburb: property.suburb || '',
                  state: property.state || 'VIC',
                  price: property.price,
                  priceDisplay: property.priceDisplay,
                  bedrooms: property.bedrooms || 0,
                  bathrooms: property.bathrooms || 0,
                  carSpaces: property.carSpaces || 0,
                  propertyType: property.propertyType || 'House',
                  listingType: (property.listingType as 'sale' | 'lease' | 'both') || 'sale',
                  leasePrice: property.leasePrice,
                  leasePriceDisplay: property.leasePriceDisplay,
                  images: property.images || []
                }} />
              </div>

              {/* Specs Grid - Swiss Precision */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: isMobile ? '16px' : '24px',
                padding: '24px 0',
                borderTop: '2px solid #000000',
                borderBottom: '2px solid #000000'
              }}>
                <div>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#000000',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif',
                    lineHeight: '1'
                  }}>
                    {property.listingType === 'lease'
                      ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice}` : 'TBA'))
                      : (property.priceDisplay || formatPrice(property.price || 0))}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#525252',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: '600',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    {property.listingType === 'lease' ? 'PER WEEK' : 'PRICE'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#000000', fontFamily: '"Helvetica Neue", Arial, sans-serif', lineHeight: '1' }}>
                    {property.bedrooms || '–'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#525252', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                    BEDROOMS
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#000000', fontFamily: '"Helvetica Neue", Arial, sans-serif', lineHeight: '1' }}>
                    {property.bathrooms || '–'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#525252', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                    BATHROOMS
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#000000', fontFamily: '"Helvetica Neue", Arial, sans-serif', lineHeight: '1' }}>
                    {property.carSpaces || '–'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#525252', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                    PARKING
                  </div>
                </div>
                {property.landSize && property.landSize > 0 && (
                  <div>
                    <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px', color: '#000000', fontFamily: '"Helvetica Neue", Arial, sans-serif', lineHeight: '1' }}>
                      {property.landSize >= 4047 ? `${(property.landSize / 4047).toFixed(1)}` : property.landSize}
                    </div>
                    <div style={{ fontSize: '11px', color: '#525252', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                      {property.landSize >= 4047 ? 'ACRES' : 'LAND M²'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inspection Times / Auction Details - Minimalist Style */}
            <div style={{
              marginBottom: '48px'
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
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#D4A853',
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}>
                    Open for inspection
                  </h3>
                  {property.inspectionTimes && property.inspectionTimes.length > 0 ? (
                    property.inspectionTimes.map((inspection) => (
                      <div key={inspection.id} style={{ marginBottom: '12px' }}>
                        <p style={{
                          fontSize: '16px',
                          color: '#D4A853',
                          fontWeight: '400',
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
                      fontSize: '16px',
                      color: '#D4A853',
                      fontWeight: '400',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      Contact agent to arrange an inspection
                    </p>
                  )}
                </div>
              </div>

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

            {/* Description - ON RUNNING STYLE */}
            {property.description && (
              <div style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: 'normal',
                  textTransform: 'none',
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

            {/* Key Features - Always show for all properties */}
            {(() => {
              // Get features from property data or provide defaults based on property type
              const features = property.features && property.features.length > 0 
                ? property.features 
                : getDefaultFeatures(property);
              
              return features && features.length > 0;
            })() && (
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
                  {(() => {
                    const features = property.features && property.features.length > 0 
                      ? property.features 
                      : getDefaultFeatures(property);
                    return features;
                  })().map((feature, index) => (
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

            {/* Property Details Grid - ON RUNNING STYLE */}
            <div style={{ marginBottom: '64px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                marginBottom: '32px',
                letterSpacing: 'normal',
                textTransform: 'none',
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
                {property.ensuites !== undefined && property.ensuites > 0 && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Ensuites</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.ensuites}</div>
                  </div>
                )}
                {property.toilets !== undefined && property.toilets > 0 && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Toilets</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.toilets}</div>
                  </div>
                )}
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
                {property.landSize && property.landSize > 0 && (
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
                    }}>
                      {property.landSize >= 4047 ? `${(property.landSize / 4047).toFixed(2)} acres` : `${property.landSize} m²`}
                    </div>
                  </div>
                )}
                {property.buildingSize && property.buildingSize > 0 && (
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
                {property.zoning && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Zoning</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.zoning}</div>
                  </div>
                )}
                {property.saleMethod && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Sale Method</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      textTransform: 'capitalize'
                    }}>{property.saleMethod}</div>
                  </div>
                )}
                {property.listingType && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Listing Type</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif',
                      textTransform: 'capitalize'
                    }}>
                      {property.listingType === 'sale' ? 'For Sale' : property.listingType === 'lease' ? 'For Lease' : 'Sale & Lease'}
                    </div>
                  </div>
                )}
                {property.isNewHome && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Condition</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>New Home</div>
                  </div>
                )}
                {property.tenanted && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Status</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Currently Tenanted</div>
                  </div>
                )}
                {property.daysOnMarket !== undefined && (
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#525252',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: '700',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>Days on Market</div>
                    <div style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#000000',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>{property.daysOnMarket} days</div>
                  </div>
                )}
              </div>
            </div>

            {/* Rates and Fees - ON RUNNING STYLE */}
            {property.rates && (property.rates.council || property.rates.water || property.rates.strata) && (
              <div style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#000000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Rates & Fees</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '24px',
                  padding: '48px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '0',
                  border: '2px solid #d4d4d4'
                }}>
                  {property.rates.council !== undefined && property.rates.council > 0 && (
                    <div>
                      <div style={{
                        fontSize: '11px',
                        color: '#525252',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: '700',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>Council Rates</div>
                      <div style={{
                        fontSize: '17px',
                        fontWeight: '700',
                        color: '#000000',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>${property.rates.council.toLocaleString()} p.a.</div>
                    </div>
                  )}
                  {property.rates.water !== undefined && property.rates.water > 0 && (
                    <div>
                      <div style={{
                        fontSize: '11px',
                        color: '#525252',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: '700',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>Water Rates</div>
                      <div style={{
                        fontSize: '17px',
                        fontWeight: '700',
                        color: '#000000',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>${property.rates.water.toLocaleString()} p.a.</div>
                    </div>
                  )}
                  {property.rates.strata !== undefined && property.rates.strata > 0 && (
                    <div>
                      <div style={{
                        fontSize: '11px',
                        color: '#525252',
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontWeight: '700',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>Strata Fees</div>
                      <div style={{
                        fontSize: '17px',
                        fontWeight: '700',
                        color: '#000000',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>${property.rates.strata.toLocaleString()} p.a.</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Local Area Guide - ON RUNNING STYLE */}
            {property.suburb && (
              <div style={{ marginBottom: '64px' }}>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '32px',
                  letterSpacing: 'normal',
                  textTransform: 'none',
                  color: '#000000',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>Local Area</h2>

                <div style={{
                  padding: '48px',
                  backgroundColor: '#6B7280',
                  color: '#fff'
                }}>
                  {/* Show rich lifestyle content based on property suburb */}
                  {property.suburb?.toLowerCase().includes('narre warren') ? (
                    <>
                      <div style={{ marginBottom: '32px' }}>
                        <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                          </svg>
                          We Love {property.suburb}!
                        </div>
                        <p style={{ fontSize: '17px', lineHeight: '1.6', color: '#d4d4d4' }}>
                          Discover why Narre Warren is more than just a place to live - it's a place to belong! From award-winning playgrounds to community cafés, this vibrant suburb has everything your family needs.
                        </p>
                      </div>

                      {/* Featured Categories */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: '24px',
                        marginBottom: '32px',
                        paddingTop: '24px',
                        borderTop: '1px solid #333'
                      }}>
                        <div>
                          <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                              <path d="M8 21l4-7h3l3 3v4l-4 4z"/>
                              <path d="M3 14h3l2-5 2 5h3"/>
                            </svg>
                            Family Fun
                          </div>
                          <div style={{ fontSize: '15px', lineHeight: '1.4' }}>
                            Narre Warren Adventure Playground • Fountain Gate Entertainment • Swimming Pool
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                              <path d="M5 11h14l-5-5m5 5l-5 5"/>
                            </svg>
                            Local Favourites
                          </div>
                          <div style={{ fontSize: '15px', lineHeight: '1.4' }}>
                            Narre Warren Coffee Co. • The Local Bean • Thai Spice Restaurant
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                              <circle cx="8" cy="21" r="1"/>
                              <circle cx="19" cy="21" r="1"/>
                              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                            </svg>
                            Shopping & Lifestyle
                          </div>
                          <div style={{ fontSize: '15px', lineHeight: '1.4' }}>
                            Fountain Gate Shopping Centre • Local Markets • Boutique Stores
                          </div>
                        </div>
                      </div>

                      {/* Quick Highlights */}
                      <div style={{
                        backgroundColor: '#111',
                        padding: '24px',
                        borderRadius: '8px',
                        marginBottom: '32px'
                      }}>
                        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
                          Local Highlights
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                          gap: '16px',
                          fontSize: '14px',
                          lineHeight: '1.5'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Narre Warren Adventure Playground - Ultimate family destination
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Award-winning local coffee roasters and cafés
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Narre Warren Park - 50+ hectares of natural beauty
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Community Centre with programs for all ages
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Fountain Gate - Everything you need in one place
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="#D4A853">
                              <circle cx="12" cy="12" r="10"/>
                            </svg>
                            Modern library with community programs
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Default content for other suburbs */
                    <>
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
                    </>
                  )}

                  <a
                    href={`/local-area/${property.suburb?.toLowerCase().replace(/\s+/g, '-')}`}
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
                    {property.suburb?.toLowerCase().includes('narre warren') 
                      ? 'Explore Full Lifestyle Guide →' 
                      : 'View Local Area Guide →'
                    }
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
              <Link 
                href={`/agent/${property.agent?.id || property.agent?.name?.toLowerCase().replace(/\s+/g, '-') || 'grant'}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  marginBottom: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
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
              </Link>

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
                onClick={() => setShowInspectionRequest(true)}
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
                  marginBottom: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#000';
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

        {/* Similar Properties - Homepage Style */}
        {similarProperties.length > 0 && (
          <div style={{ marginTop: '96px' }}>
            <h2 style={{
              fontSize: isMobile ? '36px' : '56px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '32px' : '48px',
              color: '#000',
              lineHeight: '1.1'
            }}>
              Similar Properties in {property.suburb}
            </h2>

            <div style={{
              display: 'flex',
              gap: isMobile ? '16px' : '24px',
              flexWrap: 'wrap'
            }}>
              {similarProperties.slice(0, 3).map((similarProperty) => (
                <div key={similarProperty.id} style={{
                  position: 'relative',
                  flex: isMobile ? '0 0 85%' : '0 0 calc(33.333% - 16px)',
                  minWidth: isMobile ? '320px' : '380px',
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                  if (addressElement) {
                    addressElement.style.color = '#AF272F'; // Grant's red PMS187c
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const addressElement = e.currentTarget.querySelector('[data-property-address]') as HTMLElement;
                  if (addressElement) {
                    addressElement.style.color = '#000';
                  }
                }}>
                  <Link href={`/property/${similarProperty.id}`} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <div style={{
                      position: 'relative',
                      paddingTop: '100%', // 1:1 square aspect ratio
                      backgroundColor: '#fff',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {similarProperty.images && similarProperty.images[0] ? (
                          <img
                            src={typeof similarProperty.images[0] === 'string' ? similarProperty.images[0] : similarProperty.images[0].url}
                            alt={similarProperty.address}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '4px'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        ) : (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999',
                            fontSize: '12px'
                          }}>
                            No image
                          </div>
                        )}
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        zIndex: 1
                      }}>
                        <SavePropertyButton property={{
                          id: similarProperty.id,
                          address: similarProperty.address || '',
                          suburb: similarProperty.suburb || '',
                          state: similarProperty.state || 'VIC',
                          price: similarProperty.price,
                          priceDisplay: similarProperty.priceDisplay,
                          bedrooms: similarProperty.bedrooms || 0,
                          bathrooms: similarProperty.bathrooms || 0,
                          carSpaces: similarProperty.carSpaces || 0,
                          propertyType: similarProperty.propertyType || 'House',
                          listingType: similarProperty.listingType as 'sale' | 'lease' | 'both',
                          leasePrice: similarProperty.leasePrice,
                          leasePriceDisplay: similarProperty.leasePriceDisplay,
                          images: similarProperty.images
                        }} />
                      </div>
                      {similarProperty.listingType === 'lease' && (
                        <div style={{
                          position: 'absolute',
                          top: '2rem',
                          left: '2rem',
                          backgroundColor: '#AF272F',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          zIndex: 1
                        }}>
                          For Lease
                        </div>
                      )}
                      {similarProperty.status === 'unconditional' && (
                        <div style={{
                          position: 'absolute',
                          top: '2rem',
                          left: '2rem',
                          backgroundColor: '#FFA500',
                          color: '#fff',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          zIndex: 1
                        }}>
                          Under Contract
                        </div>
                      )}
                    </div>
                    
                    <div style={{ 
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      flex: '1'
                    }}>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: '500',
                        marginBottom: '0.25rem'
                      }}>
                        {similarProperty.suburb}
                      </p>
                      <h3
                        data-property-address="true"
                        style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#000',
                          letterSpacing: '-0.01em',
                          lineHeight: '1.3',
                          marginBottom: '0.5rem',
                          transition: 'color 0.2s ease'
                        }}>
                        {similarProperty.address?.replace(', VIC', '')}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '0.75rem',
                        color: '#666',
                        marginBottom: '0.5rem'
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
                      <p style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#000',
                        letterSpacing: '-0.01em'
                      }}>
                        {similarProperty.listingType === 'lease'
                          ? (similarProperty.leasePriceDisplay || (similarProperty.leasePrice ? `$${similarProperty.leasePrice} per week` : 'Contact Agent'))
                          : (similarProperty.priceDisplay || formatPrice(similarProperty.price || 0))
                        }
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}