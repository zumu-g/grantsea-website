'use client';

import React, { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import Link from 'next/link';

export default function CareersApplyPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    license: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        license: '',
        linkedin: '',
        portfolio: '',
        coverLetter: '',
        resume: null,
      });
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      {/* Hero Section with Watermark */}
      <section style={{
        position: 'relative',
        paddingTop: isMobile ? '90px' : '200px',
        paddingBottom: isMobile ? '60px' : '80px',
        paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
        paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
        background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)'
      }}>
        {/* Watermark Badge */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '200px' : '220px',
          right: isMobile ? '20px' : 'max(2rem, 3.33vw)',
          width: isMobile ? '100px' : '120px',
          height: isMobile ? '100px' : '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #AF272F 0%, #8A1F26 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          padding: '15px',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(175,39,47,0.2)'
        }}>
          <div style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: '700' }}>30+</div>
          <div style={{ fontSize: isMobile ? '9px' : '10px', fontWeight: '600', marginTop: '4px' }}>YEARS OF</div>
          <div style={{ fontSize: isMobile ? '9px' : '10px', fontWeight: '600' }}>EXCELLENCE</div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h1 style={{
            fontSize: isMobile ? '36px' : '48px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#000'
          }}>
            Apply to Join Our Team
          </h1>
          <p style={{
            fontSize: isMobile ? '18px' : '20px',
            color: '#666',
            maxWidth: '600px'
          }}>
            Take the first step towards an exciting career with Grant's Estate Agents
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '40px 20px' : '60px max(2rem, 3.33vw)',
        paddingTop: 0
      }}>
        {!submitted ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '3fr 2fr',
            gap: '60px'
          }}>
            {/* Application Form */}
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '32px'
              }}>
                Application Form
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Personal Information */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Personal Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name *"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{
                        padding: '14px 16px',
                        border: '1px solid #e5e5e5',
                        borderRadius: '4px',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                    />
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Professional Information
                  </h3>
                  <select
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#fff',
                      marginBottom: '16px'
                    }}
                  >
                    <option value="">Select Position *</option>
                    <option value="senior-sales">Senior Sales Agent</option>
                    <option value="sales-consultant">Sales Consultant</option>
                    <option value="property-manager">Property Manager</option>
                    <option value="sales-associate">Sales Associate</option>
                    <option value="marketing">Marketing Coordinator</option>
                    <option value="admin">Administration</option>
                    <option value="general">General Application</option>
                  </select>

                  <select
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#fff',
                      marginBottom: '16px'
                    }}
                  >
                    <option value="">Years of Experience *</option>
                    <option value="entry">Entry Level (0-1 years)</option>
                    <option value="junior">Junior (1-3 years)</option>
                    <option value="mid">Mid-Level (3-5 years)</option>
                    <option value="senior">Senior (5-10 years)</option>
                    <option value="expert">Expert (10+ years)</option>
                  </select>

                  <input
                    type="text"
                    name="license"
                    placeholder="Real Estate License Number (if applicable)"
                    value={formData.license}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                {/* Online Presence */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Online Presence
                  </h3>
                  <input
                    type="url"
                    name="linkedin"
                    placeholder="LinkedIn Profile URL"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      marginBottom: '16px'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                  <input
                    type="url"
                    name="portfolio"
                    placeholder="Portfolio/Website URL"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                {/* Cover Letter */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Cover Letter
                  </h3>
                  <textarea
                    name="coverLetter"
                    placeholder="Tell us why you want to join Grant's Estate Agents and what makes you the ideal candidate *"
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={8}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#AF272F'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                    Resume/CV
                  </h3>
                  <div style={{
                    border: '2px dashed #e5e5e5',
                    borderRadius: '8px',
                    padding: '32px',
                    textAlign: 'center',
                    backgroundColor: '#fafafa'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#AF272F" strokeWidth="2" style={{ marginBottom: '16px' }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="12" y1="18" x2="12" y2="12"></line>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                    <label style={{ display: 'block', cursor: 'pointer' }}>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
                        style={{ display: 'none' }}
                      />
                      <span style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#AF272F',
                        color: '#fff',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: '600',
                        marginBottom: '8px'
                      }}>
                        Choose File
                      </span>
                    </label>
                    <p style={{ fontSize: '14px', color: '#666', margin: '8px 0 0' }}>
                      {formData.resume ? formData.resume.name : 'PDF or Word document (max 5MB)'}
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    padding: '18px 40px',
                    backgroundColor: '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '18px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#AF272F';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Submit Application
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{
                backgroundColor: '#f9f9f9',
                padding: '32px',
                borderRadius: '8px',
                marginBottom: '32px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
                  Why Join Grant's?
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    '30+ years of market leadership',
                    'Award-winning team culture',
                    'Industry-leading commission structure',
                    'Comprehensive training programs',
                    'Latest technology and marketing tools',
                    'Career progression opportunities',
                    'Supportive team environment'
                  ].map((item, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px'
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#AF272F">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                      </svg>
                      <span style={{ fontSize: '15px', color: '#333' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '32px',
                borderRadius: '8px'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
                  Need Help?
                </h3>
                <p style={{ fontSize: '15px', marginBottom: '20px', lineHeight: '1.6' }}>
                  Our HR team is here to answer any questions about careers at Grant's Estate Agents.
                </p>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Email:</strong><br />
                  careers@grantsea.com
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <strong>Phone:</strong><br />
                  (03) 9702 8200
                </div>
                <div>
                  <strong>Office Hours:</strong><br />
                  Monday - Friday, 9am - 5pm
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '60px 20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#fff">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px' }}>
              Application Submitted!
            </h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
              Thank you for your interest in joining Grant's Estate Agents. Our HR team will review your application and contact you within 3-5 business days.
            </p>
            <Link href="/careers" style={{
              display: 'inline-block',
              padding: '16px 32px',
              backgroundColor: '#000',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Back to Careers
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}