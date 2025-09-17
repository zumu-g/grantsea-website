'use client';

import { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';

export default function AppraisalPage() {
  const [formData, setFormData] = useState({
    email: '',
    propertyAddress: '',
    mobile: '',
    contactPreference: 'phone'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          email: '',
          propertyAddress: '',
          mobile: '',
          contactPreference: 'phone'
        });
      }, 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: '120px',
        paddingBottom: '80px',
        minHeight: 'calc(100vh - 400px)'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '300',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Free Property Appraisal
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Get an accurate market appraisal from Grant's expert team. We'll contact you within 24 hours.
          </p>

          {isSubmitted ? (
            <div style={{
              padding: '32px',
              backgroundColor: '#f0f9ff',
              borderRadius: '2px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}>
                ✓
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '8px'
              }}>
                Request Received!
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#666'
              }}>
                We'll be in touch within 24 hours to arrange your appraisal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    border: '1px solid #000',
                    borderRadius: '2px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#AF272F';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                  }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Property Address
                </label>
                <input
                  type="text"
                  name="propertyAddress"
                  required
                  value={formData.propertyAddress}
                  onChange={handleChange}
                  placeholder="123 Example Street, Suburb"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    border: '1px solid #000',
                    borderRadius: '2px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#AF272F';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                  }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="0400 000 000"
                  style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    border: '1px solid #000',
                    borderRadius: '2px',
                    backgroundColor: '#fff',
                    outline: 'none',
                    transition: 'all 0.2s'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#AF272F';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#000';
                  }}
                />
              </div>

              <div style={{ marginBottom: '48px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#333'
                }}>
                  How would you like to be contacted?
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '12px 20px',
                    border: '1px solid',
                    borderColor: formData.contactPreference === 'phone' ? '#AF272F' : '#e5e7eb',
                    borderRadius: '2px',
                    backgroundColor: formData.contactPreference === 'phone' ? 'rgba(175, 39, 47, 0.05)' : '#fff',
                    flex: '1',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="phone"
                      checked={formData.contactPreference === 'phone'}
                      onChange={handleChange}
                      style={{
                        marginRight: '8px',
                        accentColor: '#AF272F'
                      }}
                    />
                    <span style={{ fontSize: '16px' }}>Phone</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '12px 20px',
                    border: '1px solid',
                    borderColor: formData.contactPreference === 'email' ? '#AF272F' : '#e5e7eb',
                    borderRadius: '2px',
                    backgroundColor: formData.contactPreference === 'email' ? 'rgba(175, 39, 47, 0.05)' : '#fff',
                    flex: '1',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={formData.contactPreference === 'email'}
                      onChange={handleChange}
                      style={{
                        marginRight: '8px',
                        accentColor: '#AF272F'
                      }}
                    />
                    <span style={{ fontSize: '16px' }}>Email</span>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    padding: '12px 20px',
                    border: '1px solid',
                    borderColor: formData.contactPreference === 'text' ? '#AF272F' : '#e5e7eb',
                    borderRadius: '2px',
                    backgroundColor: formData.contactPreference === 'text' ? 'rgba(175, 39, 47, 0.05)' : '#fff',
                    flex: '1',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="text"
                      checked={formData.contactPreference === 'text'}
                      onChange={handleChange}
                      style={{
                        marginRight: '8px',
                        accentColor: '#AF272F'
                      }}
                    />
                    <span style={{ fontSize: '16px' }}>Text</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '20px',
                  fontSize: '18px',
                  fontWeight: '400',
                  backgroundColor: isSubmitting ? '#ccc' : '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '2px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  letterSpacing: '0.5px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#AF272F';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#000';
                  }
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Request Free Appraisal'}
              </button>
            </form>
          )}
        </div>
      </main>

      <OncomFooter />
      <AIChatWidget />
    </div>
  );
}