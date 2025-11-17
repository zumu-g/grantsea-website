'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function AppraisalPageOncom() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    suburb: '',
    postcode: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    sellingTimeframe: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appraisal request submitted:', formData);
    alert('Thank you! We\'ll be in touch within 24 hours with your property appraisal.');
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      <OncomHeader />
      
      {/* Main Content */}
      <main style={{ 
        paddingTop: isMobile ? '90px' : '200px', 
        minHeight: '100vh', 
        backgroundColor: '#fff' 
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#fff',
          paddingTop: isMobile ? '60px' : '100px',
          paddingBottom: isMobile ? '60px' : '100px',
          borderBottom: '1px solid #e5e5e5'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
              fontWeight: '400',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginBottom: '24px'
            }}>
              Discover your home's value
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.4'
            }}>
              Get an instant estimate and connect with local experts who can refine your home's value and help you sell for more.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section style={{
          padding: isMobile ? '40px 20px' : '80px 40px',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Progress Bar */}
            <div style={{
              marginBottom: '48px',
              backgroundColor: '#e5e5e5',
              height: '4px',
              borderRadius: '2px'
            }}>
              <div style={{
                width: `${(currentStep / 3) * 100}%`,
                height: '100%',
                backgroundColor: '#000',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Property Details */}
              {currentStep === 1 && (
                <div>
                  <h2 style={{
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: '400',
                    marginBottom: '40px',
                    textAlign: 'center'
                  }}>
                    Tell us about your property
                  </h2>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px'
                      }}>
                        Property address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your property address"
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          backgroundColor: '#fff',
                          outline: 'none',
                          transition: 'border 0.2s ease'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                        required
                      />
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '24px'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Suburb
                        </label>
                        <input
                          type="text"
                          name="suburb"
                          value={formData.suburb}
                          onChange={handleChange}
                          placeholder="e.g. Berwick"
                          style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '16px',
                            border: '1px solid #e5e5e5',
                            backgroundColor: '#fff',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                          required
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Postcode
                        </label>
                        <input
                          type="text"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleChange}
                          placeholder="e.g. 3806"
                          pattern="[0-9]{4}"
                          style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '16px',
                            border: '1px solid #e5e5e5',
                            backgroundColor: '#fff',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '16px'
                      }}>
                        Property type
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: '12px'
                      }}>
                        {['House', 'Apartment', 'Townhouse', 'Land'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, propertyType: type })}
                            style={{
                              padding: '16px',
                              border: formData.propertyType === type ? '2px solid #000' : '1px solid #e5e5e5',
                              backgroundColor: formData.propertyType === type ? '#f8f8f8' : '#fff',
                              fontSize: '16px',
                              fontWeight: formData.propertyType === type ? '600' : '400',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginTop: '48px',
                    textAlign: 'center'
                  }}>
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{
                        padding: '16px 48px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Property Features */}
              {currentStep === 2 && (
                <div>
                  <h2 style={{
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: '400',
                    marginBottom: '40px',
                    textAlign: 'center'
                  }}>
                    Property features
                  </h2>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '32px',
                    marginBottom: '48px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '16px'
                      }}>
                        Bedrooms
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px'
                      }}>
                        {['1', '2', '3', '4', '5+'].map(beds => (
                          <button
                            key={beds}
                            type="button"
                            onClick={() => setFormData({ ...formData, bedrooms: beds })}
                            style={{
                              padding: '12px',
                              border: formData.bedrooms === beds ? '2px solid #000' : '1px solid #e5e5e5',
                              backgroundColor: formData.bedrooms === beds ? '#f8f8f8' : '#fff',
                              fontSize: '14px',
                              fontWeight: formData.bedrooms === beds ? '600' : '400',
                              cursor: 'pointer'
                            }}
                          >
                            {beds}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '16px'
                      }}>
                        Bathrooms
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px'
                      }}>
                        {['1', '2', '3', '4+'].map(baths => (
                          <button
                            key={baths}
                            type="button"
                            onClick={() => setFormData({ ...formData, bathrooms: baths })}
                            style={{
                              padding: '12px',
                              border: formData.bathrooms === baths ? '2px solid #000' : '1px solid #e5e5e5',
                              backgroundColor: formData.bathrooms === baths ? '#f8f8f8' : '#fff',
                              fontSize: '14px',
                              fontWeight: formData.bathrooms === baths ? '600' : '400',
                              cursor: 'pointer'
                            }}
                          >
                            {baths}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '16px'
                      }}>
                        Parking
                      </label>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px'
                      }}>
                        {['0', '1', '2', '3+'].map(parks => (
                          <button
                            key={parks}
                            type="button"
                            onClick={() => setFormData({ ...formData, parking: parks })}
                            style={{
                              padding: '12px',
                              border: formData.parking === parks ? '2px solid #000' : '1px solid #e5e5e5',
                              backgroundColor: formData.parking === parks ? '#f8f8f8' : '#fff',
                              fontSize: '14px',
                              fontWeight: formData.parking === parks ? '600' : '400',
                              cursor: 'pointer'
                            }}
                          >
                            {parks}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '48px'
                  }}>
                    <label style={{
                      display: 'block',
                      fontSize: '16px',
                      fontWeight: '500',
                      marginBottom: '16px'
                    }}>
                      When are you looking to sell?
                    </label>
                    <select
                      name="sellingTimeframe"
                      value={formData.sellingTimeframe}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '16px',
                        border: '1px solid #e5e5e5',
                        backgroundColor: '#fff',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">Select timeframe</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-3months">Within 1-3 months</option>
                      <option value="3-6months">Within 3-6 months</option>
                      <option value="6-12months">Within 6-12 months</option>
                      <option value="justlooking">Just curious about value</option>
                    </select>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                  }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{
                        padding: '16px 48px',
                        backgroundColor: 'transparent',
                        color: '#000',
                        border: '2px solid #000',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      style={{
                        padding: '16px 48px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {currentStep === 3 && (
                <div>
                  <h2 style={{
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: '400',
                    marginBottom: '40px',
                    textAlign: 'center'
                  }}>
                    Get your free appraisal
                  </h2>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                      gap: '24px'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          First name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '16px',
                            border: '1px solid #e5e5e5',
                            backgroundColor: '#fff',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                          required
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '16px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Last name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '16px',
                            fontSize: '16px',
                            border: '1px solid #e5e5e5',
                            backgroundColor: '#fff',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px'
                      }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          backgroundColor: '#fff',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '8px'
                      }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          backgroundColor: '#fff',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#000'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                        required
                      />
                    </div>
                  </div>

                  <div style={{
                    marginTop: '48px',
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'center'
                  }}>
                    <button
                      type="button"
                      onClick={prevStep}
                      style={{
                        padding: '16px 48px',
                        backgroundColor: 'transparent',
                        color: '#000',
                        border: '2px solid #000',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: '16px 48px',
                        backgroundColor: '#000',
                        color: '#fff',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Get My Appraisal
                    </button>
                  </div>

                  <p style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    fontSize: '14px',
                    color: '#666'
                  }}>
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Benefits Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '60px 20px' : '100px 40px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '400',
              textAlign: 'center',
              marginBottom: '60px',
              letterSpacing: '-0.02em'
            }}>
              Why get an appraisal with Grant's?
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '48px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '36px'
                }}>
                  📊
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Data-driven valuations
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Our appraisals are based on comprehensive market data and recent sales in your area.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '36px'
                }}>
                  🏡
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  Local expertise
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Our agents have deep knowledge of Casey and Cardinia property markets.
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#f8f8f8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  fontSize: '36px'
                }}>
                  ✅
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  No obligation
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  Get your free appraisal with absolutely no pressure to sell.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: isMobile ? '60px 20px' : '100px 40px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '400',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Ready to discover your home's value?
            </h2>
            <p style={{
              fontSize: '20px',
              opacity: 0.8,
              marginBottom: '40px'
            }}>
              Join thousands of homeowners who trust Grant's for accurate property valuations.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                padding: '16px 48px',
                backgroundColor: '#fff',
                color: '#000',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Get Started
            </button>
          </div>
        </section>
      </main>
    </>
  );
}