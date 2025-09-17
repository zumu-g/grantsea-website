'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

const guides = {
  'first-home-buyers': {
    title: 'First Home Buyer\'s Complete Guide',
    description: 'Everything you need to know about buying your first home in Casey & Cardinia',
    features: [
      'Step-by-step buying process',
      'Government grants and schemes',
      'Budgeting and finance tips',
      'Suburb selection guide',
      'Common mistakes to avoid'
    ],
    downloadUrl: '/guides/first-home-buyers-guide.pdf'
  },
  'property-investment': {
    title: 'Property Investment Strategy Guide',
    description: 'Build wealth through strategic property investment in Melbourne\'s growth corridors',
    features: [
      'Market analysis and trends',
      'Cash flow calculations',
      'Tax benefits and deductions',
      'Portfolio building strategies',
      'Risk management'
    ],
    downloadUrl: '/guides/property-investment-guide.pdf'
  },
  'selling-guide': {
    title: 'Ultimate Property Selling Guide',
    description: 'Maximize your property\'s value and achieve the best sale price',
    features: [
      'Pre-sale preparation checklist',
      'Styling and presentation tips',
      'Marketing strategies',
      'Auction vs private sale',
      'Negotiation tactics'
    ],
    downloadUrl: '/guides/selling-guide.pdf'
  },
  'suburb-profiles': {
    title: 'Casey & Cardinia Suburb Profiles',
    description: 'In-depth analysis of every suburb in our service area',
    features: [
      'Demographics and statistics',
      'School catchment zones',
      'Transport and amenities',
      'Growth projections',
      'Investment potential'
    ],
    downloadUrl: '/guides/suburb-profiles.pdf'
  },
  'market-report': {
    title: 'Quarterly Market Report',
    description: 'Latest market data, trends, and forecasts for the local property market',
    features: [
      'Median price movements',
      'Days on market analysis',
      'Clearance rates',
      'Supply and demand metrics',
      'Expert commentary'
    ],
    downloadUrl: '/guides/market-report-q4-2024.pdf'
  }
};

export default function GuideDownloadPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guideId = searchParams.get('guide') || 'first-home-buyers';
  const guide = guides[guideId as keyof typeof guides] || guides['first-home-buyers'];

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to save lead
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, you would:
    // 1. Send data to your CRM/email service
    // 2. Send download link via email
    // 3. Track the conversion

    // Store in localStorage for demo
    const leads = JSON.parse(localStorage.getItem('guide-leads') || '[]');
    leads.push({
      email,
      name,
      phone,
      guide: guide.title,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('guide-leads', JSON.stringify(leads));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Redirect to download after 2 seconds
    setTimeout(() => {
      // In production, initiate download or redirect to PDF
      window.open(guide.downloadUrl, '_blank');
      router.push('/guides/thank-you');
    }, 2000);
  };

  return (
    <>
      <OncomHeader />

      <main style={{
        minHeight: '100vh',
        paddingTop: '64px',
        backgroundColor: '#f8f8f8'
      }}>
        {/* Hero Section */}
        <section style={{
          background: 'linear-gradient(135deg, #002b7f 0%, #0056b3 100%)',
          color: '#fff',
          padding: isMobile ? '60px 20px' : '100px 0',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '24px',
              opacity: 0.9
            }}>
              FREE PROPERTY GUIDE
            </p>
            <h1 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2'
            }}>
              {guide.title}
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              fontWeight: '300',
              maxWidth: '800px',
              margin: '0 auto',
              opacity: 0.95
            }}>
              {guide.description}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{
          padding: isMobile ? '40px 20px' : '80px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'start'
          }}>
            {/* Left Column - Guide Preview */}
            <div>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: isMobile ? '32px 24px' : '48px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: '600',
                  marginBottom: '32px',
                  color: '#000'
                }}>
                  What's Inside This Guide
                </h2>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {guide.features.map((feature, index) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '24px',
                      fontSize: '18px',
                      color: '#333'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#002b7f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4 8L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ lineHeight: '1.6' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Guide Preview Image */}
                <div style={{
                  marginTop: '40px',
                  aspectRatio: '3/4',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e5e5'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
                      <rect x="10" y="10" width="60" height="80" rx="2" fill="#fff" stroke="#ddd" strokeWidth="2"/>
                      <rect x="20" y="20" width="40" height="4" fill="#002b7f"/>
                      <rect x="20" y="30" width="40" height="2" fill="#e5e5e5"/>
                      <rect x="20" y="36" width="40" height="2" fill="#e5e5e5"/>
                      <rect x="20" y="42" width="30" height="2" fill="#e5e5e5"/>
                      <rect x="20" y="52" width="40" height="30" fill="#f0f0f0"/>
                    </svg>
                    <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>PDF Guide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Download Form */}
            <div>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: isMobile ? '32px 24px' : '48px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '24px' : '32px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Get Your Free Guide
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '32px'
                }}>
                  Enter your details below and we'll send you instant access to download the guide.
                </p>

                {!showSuccess ? (
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '8px',
                        color: '#333'
                      }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#002b7f'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                      />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '8px',
                        color: '#333'
                      }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#002b7f'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
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
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          fontSize: '16px',
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.currentTarget.style.borderColor = '#002b7f'}
                        onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '16px',
                        fontSize: '18px',
                        fontWeight: '600',
                        backgroundColor: isSubmitting ? '#666' : '#002b7f',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#001f5c';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) e.currentTarget.style.backgroundColor = '#002b7f';
                      }}
                    >
                      {isSubmitting ? 'Processing...' : 'Download Guide Now'}
                    </button>

                    <p style={{
                      marginTop: '16px',
                      fontSize: '12px',
                      color: '#999',
                      textAlign: 'center'
                    }}>
                      By downloading this guide, you agree to receive property updates from Grant's Estate Agents.
                      You can unsubscribe at any time.
                    </p>
                  </form>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 0'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      backgroundColor: '#e8f5e9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px'
                    }}>
                      <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
                        <path d="M5 15L15 25L35 5" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      color: '#000'
                    }}>
                      Success!
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      marginBottom: '24px'
                    }}>
                      Your guide is being prepared for download...
                    </p>
                    <div style={{
                      display: 'inline-block',
                      padding: '8px 24px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '24px',
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Redirecting in 2 seconds...
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div style={{
                marginTop: '32px',
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L10 5L14 6L11 9L12 13L8 11L4 13L5 9L2 6L6 5L8 1Z" fill="#ffc107"/>
                  </svg>
                  <span>4.9/5 Rating</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#4caf50" strokeWidth="2"/>
                    <path d="M5 8L7 10L11 6" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Instant Download</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="6" width="10" height="7" rx="1" stroke="#666" strokeWidth="1.5"/>
                    <path d="M6 6V4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6" stroke="#666" strokeWidth="1.5"/>
                  </svg>
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Guides Section */}
        <section style={{
          backgroundColor: '#fff',
          padding: isMobile ? '60px 20px' : '80px 0'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '40px',
              fontWeight: '600',
              marginBottom: '48px',
              textAlign: 'center',
              color: '#000'
            }}>
              More Free Guides
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px'
            }}>
              {Object.entries(guides).filter(([key]) => key !== guideId).slice(0, 3).map(([key, otherGuide]) => (
                <Link
                  key={key}
                  href={`/guides/download?guide=${key}`}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    padding: '24px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '12px',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#000'
                  }}>
                    {otherGuide.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.6'
                  }}>
                    {otherGuide.description}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#002b7f'
                  }}>
                    Download Free Guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}