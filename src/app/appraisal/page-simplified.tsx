'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';

export default function AppraisalPageSimplified() {
  const [formData, setFormData] = useState({
    // Property details
    address: '',
    propertyType: 'house',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    
    // Contact details
    name: '',
    email: '',
    phone: '',
    preferredTime: 'morning',
    
    // Additional info
    sellingTimeframe: '3months',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store in localStorage for demo
    const appraisals = JSON.parse(localStorage.getItem('appraisalRequests') || '[]');
    appraisals.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('appraisalRequests', JSON.stringify(appraisals));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <OncomHeader />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '20px' : '40px',
          paddingTop: isMobile ? '110px' : '160px'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#000',
              margin: '0 auto 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 style={{
              fontSize: isMobile ? '36px' : '48px',
              fontWeight: '300',
              marginBottom: '24px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Thank You
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '48px',
              lineHeight: '1.6',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Your property appraisal request has been received. One of our expert agents will contact you within 24 hours to arrange your free consultation.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '16px 48px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#262626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
        <OncomFooter />
      </>
    );
  }

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '90px' : '120px',
        backgroundColor: '#fff'
      }}>
        {/* Minimalist Hero */}
        <section style={{
          padding: isMobile ? '60px 20px' : '100px 0',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '72px',
              fontWeight: '200',
              marginBottom: '24px',
              letterSpacing: '-0.02em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Free Property Appraisal
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              lineHeight: '1.5',
              fontWeight: '300',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Discover your property's true market value with our expert valuation service
            </p>
          </div>
        </section>

        {/* Simplified Form */}
        <section style={{
          padding: isMobile ? '60px 20px' : '100px 0'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {/* Property Details Section */}
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  marginBottom: '32px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Property Details
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      Property Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Example Street, Berwick VIC 3806"
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '2px solid #e5e5e5',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        transition: 'border-color 0.3s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Property Type *
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="villa">Villa</option>
                        <option value="land">Land</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Bedrooms
                      </label>
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Bathrooms
                      </label>
                      <select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Car Spaces
                      </label>
                      <select
                        name="parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="">Select</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  marginBottom: '32px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Your Details
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Smith"
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '2px solid #e5e5e5',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        transition: 'border-color 0.3s ease',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                      }}
                    />
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          transition: 'border-color 0.3s ease',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#000';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e5e5';
                        }}
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="0400 000 000"
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          transition: 'border-color 0.3s ease',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#000';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e5e5';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  marginBottom: '32px',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif'
                }}>
                  Additional Information
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        Preferred Contact Time
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="morning">Morning (9am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                        <option value="anytime">Anytime</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        marginBottom: '8px',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}>
                        When to Sell?
                      </label>
                      <select
                        name="sellingTimeframe"
                        value={formData.sellingTimeframe}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '2px solid #e5e5e5',
                          borderRadius: '0',
                          backgroundColor: '#fff',
                          cursor: 'pointer',
                          fontFamily: '"Helvetica Neue", Arial, sans-serif'
                        }}
                      >
                        <option value="asap">As soon as possible</option>
                        <option value="1month">Within 1 month</option>
                        <option value="3months">Within 3 months</option>
                        <option value="6months">Within 6 months</option>
                        <option value="curious">Just curious</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontFamily: '"Helvetica Neue", Arial, sans-serif'
                    }}>
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your property or any specific requirements..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '2px solid #e5e5e5',
                        borderRadius: '0',
                        backgroundColor: '#fff',
                        transition: 'border-color 0.3s ease',
                        resize: 'vertical',
                        fontFamily: '"Helvetica Neue", Arial, sans-serif'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '20px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: isSubmitting ? '#666' : '#000',
                    color: '#fff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: '"Helvetica Neue", Arial, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#262626';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.backgroundColor = '#000';
                    }
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Get Free Appraisal'}
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Trust Indicators */}
        <section style={{
          padding: '60px 0',
          backgroundColor: '#fafafa',
          borderTop: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '40px',
            textAlign: 'center',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '300',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>25+</h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Years Experience</p>
            </div>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '300',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>500+</h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Properties Sold</p>
            </div>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '300',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>98%</h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Client Satisfaction</p>
            </div>
            <div>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '300',
                marginBottom: '8px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>24hr</h3>
              <p style={{
                fontSize: '14px',
                color: '#666',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>Response Time</p>
            </div>
          </div>
        </section>
      </main>

      <OncomFooter />
    </>
  );
}