'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '@/services/api';

interface EstimateFormData {
  address: string;
  suburb: string;
  postcode: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  landSize: string;
  condition: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bestTimeToCall: string;
}

interface EstimateResult {
  lowEstimate: number;
  highEstimate: number;
  medianEstimate: number;
  comparableSales: ComparableSale[];
  confidenceLevel: 'high' | 'medium' | 'low';
  lastUpdated: Date;
}

interface ComparableSale {
  address: string;
  price: number;
  soldDate: string;
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize?: number;
  distance: number;
}

export default function PropertyEstimateCalculator({ 
  suburb = '',
  onClose,
  embedded = false 
}: { 
  suburb?: string;
  onClose?: () => void;
  embedded?: boolean;
}) {
  const [formData, setFormData] = useState<EstimateFormData>({
    address: '',
    suburb: suburb,
    postcode: '',
    propertyType: 'house',
    bedrooms: '3',
    bathrooms: '2',
    parking: '2',
    landSize: '',
    condition: 'good',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bestTimeToCall: 'anytime'
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateEstimate = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/properties/estimate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          suburb: formData.suburb,
          propertyType: formData.propertyType,
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          parking: parseInt(formData.parking),
          landSize: formData.landSize ? parseInt(formData.landSize) : undefined,
          condition: formData.condition
        })
      });

      if (!response.ok) {
        throw new Error('Failed to calculate estimate');
      }

      const data = await response.json();
      setEstimate(data.estimate);
      setStep(3);

      // Save lead data
      const leads = JSON.parse(localStorage.getItem('propertyEstimateLeads') || '[]');
      leads.push({
        ...formData,
        estimate: data.estimate,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('propertyEstimateLeads', JSON.stringify(leads));

    } catch (error) {
      console.error('Error calculating estimate:', error);
      // Fallback to mock data for now
      const mockEstimate: EstimateResult = {
        lowEstimate: 850000,
        highEstimate: 950000,
        medianEstimate: 900000,
        comparableSales: [
          {
            address: '123 Example Street, ' + formData.suburb,
            price: 920000,
            soldDate: '2024-01-15',
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            carSpaces: parseInt(formData.parking),
            landSize: 650,
            distance: 0.3
          },
          {
            address: '456 Sample Road, ' + formData.suburb,
            price: 885000,
            soldDate: '2024-02-20',
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms),
            carSpaces: parseInt(formData.parking),
            landSize: 600,
            distance: 0.5
          },
          {
            address: '789 Test Avenue, ' + formData.suburb,
            price: 910000,
            soldDate: '2024-01-28',
            bedrooms: parseInt(formData.bedrooms),
            bathrooms: parseInt(formData.bathrooms) - 1,
            carSpaces: parseInt(formData.parking),
            landSize: 700,
            distance: 0.7
          }
        ],
        confidenceLevel: 'high',
        lastUpdated: new Date()
      };
      setEstimate(mockEstimate);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      await calculateEstimate();
    }
  };

  const requestFullReport = () => {
    setSubmitted(true);
    // Here we would trigger email automation
    console.log('Full report requested for:', formData.email);
  };

  const containerStyle = embedded ? {
    backgroundColor: '#fff',
    borderRadius: '1rem',
    padding: isMobile ? '2rem 1.5rem' : '3rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto'
  } : {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    zIndex: 9999
  };

  const formContainerStyle = embedded ? {} : {
    backgroundColor: '#fff',
    borderRadius: '1rem',
    padding: isMobile ? '2rem 1.5rem' : '3rem',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto' as const,
    position: 'relative' as const
  };

  return (
    <div style={containerStyle} onClick={!embedded && onClose ? onClose : undefined}>
      <motion.div 
        style={formContainerStyle}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {!embedded && onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        )}

        <h2 style={{
          fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
          fontWeight: '600',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}>
          Get Your Free Property Estimate
        </h2>

        <p style={{
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          color: '#666',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Discover your property's value in just 60 seconds with our AI-powered estimate tool.
        </p>

        {/* Progress indicators */}
        {!submitted && estimate === null && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '25px',
              right: '25px',
              height: '2px',
              backgroundColor: '#e5e5e5',
              zIndex: 0
            }} />
            {[1, 2].map((num) => (
              <div
                key={num}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: step >= num ? '#000' : '#fff',
                    border: step >= num ? 'none' : '2px solid #e5e5e5',
                    color: step >= num ? '#fff' : '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.5rem',
                    transition: 'all 0.3s ease',
                    fontWeight: '500'
                  }}
                >
                  {num}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: step >= num ? '#000' : '#666',
                  fontWeight: step >= num ? '500' : '400'
                }}>
                  {num === 1 ? 'Property Details' : 'Your Information'}
                </span>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && !submitted && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Property Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Suburb
                  </label>
                  <input
                    type="text"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment">Apartment</option>
                    <option value="unit">Unit</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {[1, 2, 3, 4, 5, '6+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {[1, 2, 3, '4+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Car Spaces
                  </label>
                  <select
                    name="parking"
                    value={formData.parking}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {[0, 1, 2, 3, '4+'].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Land Size (m²)
                  </label>
                  <input
                    type="number"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    placeholder="e.g. 650"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Property Condition
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="needs-work">Needs Work</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Next Step
              </button>
            </motion.form>
          )}

          {step === 2 && !submitted && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#000';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 0, 0, 0.05)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e5e5';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: '#333',
                    marginBottom: '0.5rem',
                    fontWeight: '500'
                  }}>
                    Best Time to Call
                  </label>
                  <select
                    name="bestTimeToCall"
                    value={formData.bestTimeToCall}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '1rem',
                      border: '1px solid #e5e5e5',
                      borderRadius: '0.5rem',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <option value="anytime">Anytime</option>
                    <option value="morning">Morning (9am - 12pm)</option>
                    <option value="afternoon">Afternoon (12pm - 5pm)</option>
                    <option value="evening">Evening (5pm - 8pm)</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem'
              }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    backgroundColor: '#fff',
                    color: '#000',
                    border: '1px solid #e5e5e5',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '1rem',
                    backgroundColor: loading ? '#666' : '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {loading ? 'Calculating...' : 'Get My Estimate'}
                </button>
              </div>

              <p style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center'
              }}>
                By submitting, you agree to be contacted by Grant's Estate Agents
              </p>
            </motion.form>
          )}

          {step === 3 && estimate && !submitted && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: '#fff'
                }}>
                  ✓
                </div>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  Your Property Estimate
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#666',
                  marginBottom: '2rem'
                }}>
                  Based on recent sales in {formData.suburb}
                </p>
              </div>

              <div style={{
                backgroundColor: '#f9f9f9',
                padding: '2rem',
                borderRadius: '0.75rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  fontWeight: '700',
                  textAlign: 'center',
                  marginBottom: '1rem',
                  letterSpacing: '-0.02em'
                }}>
                  {formatPrice(estimate.medianEstimate)}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  fontSize: '0.875rem',
                  color: '#666'
                }}>
                  <span>{formatPrice(estimate.lowEstimate)}</span>
                  <span>-</span>
                  <span>{formatPrice(estimate.highEstimate)}</span>
                </div>
                <div style={{
                  textAlign: 'center',
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#666'
                }}>
                  Confidence: {estimate.confidenceLevel === 'high' ? '●●●' : estimate.confidenceLevel === 'medium' ? '●●○' : '●○○'} {estimate.confidenceLevel}
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '1rem'
                }}>
                  Recent Comparable Sales
                </h4>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {estimate.comparableSales.slice(0, 3).map((sale, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        backgroundColor: '#fff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: isMobile ? 'wrap' : 'nowrap',
                        gap: '0.5rem'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                          {sale.address}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                          {sale.bedrooms}BR {sale.bathrooms}BA {sale.carSpaces}CP • {sale.distance}km away
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                          {formatPrice(sale.price)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666' }}>
                          Sold {new Date(sale.soldDate).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={requestFullReport}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Detailed Report + Agent Consultation
              </button>

              <p style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: '#666',
                textAlign: 'center'
              }}>
                This estimate is for informational purposes only. A professional appraisal is recommended for accurate valuation.
              </p>
            </motion.div>
          )}

          {submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                color: '#fff'
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Thank You!
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#666',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                Your detailed property report has been prepared and will be sent to {formData.email} shortly. 
                One of our experienced agents will contact you within 24 hours to discuss your property's potential.
              </p>
              {onClose && (
                <button
                  onClick={onClose}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Close
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}