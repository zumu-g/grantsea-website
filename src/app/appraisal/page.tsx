'use client';

import React, { useState, useEffect } from 'react';
import OncomHeader from '@/components/OncomHeader';
import { motion } from 'framer-motion';

export default function AppraisalPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: 'house',
    address: '',
    suburb: '',
    postcode: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    propertyCondition: 'excellent',
    sellingTimeframe: 'immediately',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    appraisalType: 'in-person',
    preferredTime: '',
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appraisal request submitted:', formData);

    const appraisals = JSON.parse(localStorage.getItem('appraisalRequests') || '[]');
    appraisals.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('appraisalRequests', JSON.stringify(appraisals));

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <>
        <OncomHeader />
        <main style={{ 
          paddingTop: '180px', 
          minHeight: '100vh', 
          backgroundColor: '#FFFFFF',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            paddingTop: '80px',
            paddingBottom: '120px'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#000',
                margin: '0 auto 40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                color: '#FFFFFF'
              }}>
              ✓
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(2.625rem, 2.46rem + 0.71vw, 3.3125rem)',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '24px',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}>
              Thank You
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontSize: 'clamp(1rem, 0.94rem + 0.26vw, 1.25rem)',
                color: '#666',
                marginBottom: '48px',
                lineHeight: '1.6',
                fontWeight: '300',
                letterSpacing: '-0.005em'
              }}>
              Your free property appraisal request has been received. One of our experienced agents will contact you within 24 hours to arrange a convenient time for your appraisal.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => window.location.href = '/'}
              style={{
                padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                backgroundColor: '#000',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2rem',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit'
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
              Back to Home
            </motion.button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '180px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          paddingTop: '80px',
          paddingBottom: '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 'clamp(2.625rem, 2.46rem + 0.71vw, 3.3125rem)',
                fontWeight: '700',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}>
              Get Your Free Property Appraisal
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(1rem, 0.94rem + 0.26vw, 1.25rem)',
                color: '#666',
                fontWeight: '400',
                lineHeight: '1.5',
                letterSpacing: '-0.005em',
                maxWidth: '800px',
                margin: '0 auto'
              }}>
              Discover your property's true market value with a comprehensive appraisal from Grant's Estate Agents' experienced team.
            </motion.p>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{
          backgroundColor: '#faf7f6',
          paddingTop: 'clamp(3rem, 8vw, 6rem)',
          paddingBottom: 'clamp(3rem, 8vw, 6rem)',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 'clamp(2.0625rem, 1.93rem + 0.58vw, 2.625rem)',
                fontWeight: '500',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                letterSpacing: '-0.015em',
                lineHeight: '1.15'
              }}>
              Why Choose Grant's Estate Agents?
            </motion.h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 'clamp(1rem, 2.5vw, 2rem)'
            }}>
              {[
                {
                  title: 'Local Market Expertise',
                  description: '20+ years of experience in Melbourne\'s southeast property market'
                },
                {
                  title: 'Accurate Valuations',
                  description: 'Data-driven analysis combined with local knowledge for precise appraisals'
                },
                {
                  title: 'No Obligation',
                  description: 'Free, comprehensive appraisal with absolutely no obligation to sell'
                },
                {
                  title: 'Detailed Report',
                  description: 'Receive a complete market analysis and property valuation report'
                },
                {
                  title: 'Sales Strategy',
                  description: 'Personalized recommendations to maximize your property\'s value'
                },
                {
                  title: 'Fast Response',
                  description: 'We\'ll contact you within 24 hours to arrange your appraisal'
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <h3 style={{
                    fontSize: 'clamp(1.625rem, 1.52rem + 0.45vw, 2.0625rem)',
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: 'clamp(0.5rem, 1.5vw, 1rem)',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.2'
                  }}>
                    {benefit.title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(1rem, 0.94rem + 0.26vw, 1.25rem)',
                    color: '#666',
                    lineHeight: '1.5',
                    fontWeight: '400',
                    letterSpacing: '-0.005em'
                  }}>
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 'clamp(3rem, 8vw, 6rem)',
          paddingBottom: 'clamp(3rem, 8vw, 6rem)',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: 'clamp(2.0625rem, 1.93rem + 0.58vw, 2.625rem)',
                fontWeight: '500',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                textAlign: 'center',
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                letterSpacing: '-0.015em',
                lineHeight: '1.15'
              }}>
              Request Your Appraisal
            </motion.h2>

            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Property Details Section */}
              <div style={{
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                paddingBottom: 'clamp(1.5rem, 4vw, 3rem)',
                borderBottom: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.625rem, 1.52rem + 0.45vw, 2.0625rem)',
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.2'
                }}>
                  Property Details
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 'clamp(1rem, 2.5vw, 2rem)'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px',
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
                        padding: '16px',
                        fontSize: '16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.5rem',
                        backgroundColor: '#FFFFFF',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                        e.target.style.outline = '2px solid #2f7efe';
                        e.target.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                        e.target.style.outline = 'none';
                      }}
                    >
                      <option value="house">House</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="apartment">Apartment</option>
                      <option value="unit">Unit</option>
                      <option value="land">Vacant Land</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px',
                      fontWeight: '500'
                    }}>
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                        e.target.style.outline = '2px solid #2f7efe';
                        e.target.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                        e.target.style.outline = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px',
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
                        padding: '16px',
                        fontSize: '16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                        e.target.style.outline = '2px solid #2f7efe';
                        e.target.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                        e.target.style.outline = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      color: '#666',
                      marginBottom: '8px',
                      fontWeight: '500'
                    }}>
                      Postcode
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{4}"
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        fontFamily: 'inherit'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#000';
                        e.target.style.outline = '2px solid #2f7efe';
                        e.target.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e5e5';
                        e.target.style.outline = 'none';
                      }}
                    />
                  </div>

                  {['bedrooms', 'bathrooms', 'parking'].map((field) => (
                    <div key={field}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {field === 'parking' ? 'Car Spaces' : field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <select
                        name={field}
                        value={formData[field as keyof typeof formData]}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.5rem',
                          backgroundColor: '#FFFFFF',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#000';
                          e.target.style.outline = '2px solid #2f7efe';
                          e.target.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e5e5';
                          e.target.style.outline = 'none';
                        }}
                      >
                        <option value="">Select</option>
                        {field === 'bedrooms' && ['1', '2', '3', '4', '5', '6+'].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                        {field === 'bathrooms' && ['1', '2', '3', '4+'].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                        {field === 'parking' && ['0', '1', '2', '3', '4+'].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details Section */}
              <div style={{
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
                paddingBottom: 'clamp(1.5rem, 4vw, 3rem)',
                borderBottom: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: 'clamp(1.625rem, 1.52rem + 0.45vw, 2.0625rem)',
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: 'clamp(1rem, 2.5vw, 2rem)',
                  letterSpacing: '-0.01em',
                  lineHeight: '1.2'
                }}>
                  Your Details
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 'clamp(1rem, 2.5vw, 2rem)'
                }}>
                  {[
                    { name: 'firstName', label: 'First Name *', type: 'text', required: true },
                    { name: 'lastName', label: 'Last Name *', type: 'text', required: true },
                    { name: 'email', label: 'Email *', type: 'email', required: true },
                    { name: 'phone', label: 'Phone *', type: 'tel', required: true }
                  ].map((field) => (
                    <div key={field.name}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '8px',
                        fontWeight: '500'
                      }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleInputChange}
                        required={field.required}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '0.5rem',
                          outline: 'none',
                          transition: 'all 0.3s ease',
                          fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#000';
                          e.target.style.outline = '2px solid #2f7efe';
                          e.target.style.outlineOffset = '2px';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e5e5e5';
                          e.target.style.outline = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    padding: 'clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                    backgroundColor: '#000',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2rem',
                    fontSize: '18px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
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
                  Get My Free Appraisal
                </button>
                <p style={{
                  marginTop: 'clamp(0.5rem, 1.5vw, 1rem)',
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '400'
                }}>
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </div>
            </motion.form>
          </div>
        </section>

        {/* Trust Indicators */}
        <section style={{
          backgroundColor: '#faf7f6',
          paddingTop: 'clamp(2rem, 5vw, 4rem)',
          paddingBottom: 'clamp(2rem, 5vw, 4rem)',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: 'clamp(1rem, 2.5vw, 2rem)'
          }}>
            {[
              { number: '500+', label: 'Properties Sold' },
              { number: '20+', label: 'Years Experience' },
              { number: '98%', label: 'Client Satisfaction' },
              { number: '24hrs', label: 'Response Time' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p style={{
                  fontSize: 'clamp(2.0625rem, 1.93rem + 0.58vw, 2.625rem)',
                  fontWeight: '700',
                  color: '#000',
                  marginBottom: '8px',
                  letterSpacing: '-0.015em'
                }}>
                  {stat.number}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '400'
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}