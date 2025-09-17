'use client';

import React, { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';

export default function AppraisalPage() {
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
    additionalInfo: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend API
    console.log('Appraisal request submitted:', formData);

    // Store in localStorage for demo
    const appraisals = JSON.parse(localStorage.getItem('appraisalRequests') || '[]');
    appraisals.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('appraisalRequests', JSON.stringify(appraisals));

    setSubmitted(true);

    // Scroll to top to show success message
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <>
        <OncomHeader />
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: 'white'
            }}>
              ✓
            </div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '300',
              color: '#111111',
              marginBottom: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Thank You!
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#4b5563',
              marginBottom: '32px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              lineHeight: '1.6'
            }}>
              Your free property appraisal request has been received. One of our experienced agents will contact you within 24 hours to arrange a convenient time for your appraisal.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '14px 32px',
                backgroundColor: '#002b7f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
        <OncomFooter />
        <AIChatWidget />
      </>
    );
  }

  return (
    <>
      <OncomHeader />

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #002b7f 0%, #001d5c 100%)',
        color: 'white',
        padding: '100px 20px 80px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '300',
            marginBottom: '24px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Get Your Free Property Appraisal
          </h1>
          <p style={{
            fontSize: '20px',
            opacity: 0.9,
            lineHeight: '1.6',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            Discover your property's true market value with a comprehensive appraisal from Grant's Estate Agents' experienced team.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#111111',
            textAlign: 'center',
            marginBottom: '48px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            Why Choose Grant's Estate Agents?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
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
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  color: '#002b7f',
                  marginBottom: '12px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  lineHeight: '1.6',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div style={{
        padding: '80px 20px',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#111111',
            textAlign: 'center',
            marginBottom: '48px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            Request Your Appraisal
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Property Details Section */}
            <div style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#111111',
                marginBottom: '24px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                Property Details
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
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
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
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
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
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
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
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
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6+">6+</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Bathrooms
                  </label>
                  <select
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Car Spaces
                  </label>
                  <select
                    name="parking"
                    value={formData.parking}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <option value="">Select</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Property Condition
                  </label>
                  <select
                    name="propertyCondition"
                    value={formData.propertyCondition}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="needs-work">Needs Work</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Selling Timeframe
                  </label>
                  <select
                    name="sellingTimeframe"
                    value={formData.sellingTimeframe}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  >
                    <option value="immediately">Immediately</option>
                    <option value="1-3-months">1-3 Months</option>
                    <option value="3-6-months">3-6 Months</option>
                    <option value="6-12-months">6-12 Months</option>
                    <option value="just-curious">Just Curious</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Details Section */}
            <div style={{
              marginBottom: '48px',
              paddingBottom: '48px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#111111',
                marginBottom: '24px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                Your Details
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    color: '#4b5563',
                    marginBottom: '8px',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    Preferred Contact Method
                  </label>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleInputChange}
                        style={{ marginRight: '8px' }}
                      />
                      Phone
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                    }}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleInputChange}
                        style={{ marginRight: '8px' }}
                      />
                      Email
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '400',
                color: '#111111',
                marginBottom: '24px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                Additional Information
              </h3>

              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={5}
                placeholder="Tell us anything else about your property or requirements..."
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '16px 48px',
                  backgroundColor: '#002b7f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '18px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001d5c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002b7f'}
              >
                Get My Free Appraisal
              </button>
              <p style={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#6b7280',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Trust Indicators */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          <div>
            <p style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#002b7f',
              marginBottom: '8px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              500+
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Properties Sold
            </p>
          </div>
          <div>
            <p style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#002b7f',
              marginBottom: '8px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              20+
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Years Experience
            </p>
          </div>
          <div>
            <p style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#002b7f',
              marginBottom: '8px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              98%
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Client Satisfaction
            </p>
          </div>
          <div>
            <p style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#002b7f',
              marginBottom: '8px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              24hrs
            </p>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Response Time
            </p>
          </div>
        </div>
      </div>

      <OncomFooter />
      <AIChatWidget />
    </>
  );
}