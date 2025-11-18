'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function SellPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '180px' : '200px', 
        minHeight: '100vh', 
        backgroundColor: '#fff' 
      }}>
        {/* Hero Section - Minimalist ON.COM Style */}
        <section style={{
          minHeight: isMobile ? '60vh' : '80vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : '96px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
              color: '#000',
              lineHeight: '0.95',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              30 years of<br />
              market leadership
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              marginBottom: '48px',
              maxWidth: '600px',
              lineHeight: '1.4',
              fontWeight: '400'
            }}>
              Combining deep local knowledge with cutting-edge marketing to achieve exceptional results
            </p>
            <a
              href="#appraisal-form"
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: '#000',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#333';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Request appraisal
            </a>
          </div>
        </section>

        {/* Trust Indicators - Animated Stats */}
        <section style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
              gap: isMobile ? '40px' : '32px'
            }}>
              {[
                { value: '3,500+', label: 'Properties sold', detail: 'Since 1994' },
                { value: '98%', label: 'Satisfaction rate', detail: 'Vendor reviews' },
                { value: '12 days', label: 'Average sale time', detail: 'vs 38 day average' },
                { value: '$2.1B', label: 'Total sales value', detail: 'Market leader' }
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: hoveredStat === index ? 'translateY(-8px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div style={{
                    fontSize: isMobile ? '48px' : '56px',
                    fontWeight: '800',
                    color: '#000',
                    marginBottom: '8px',
                    transition: 'all 0.3s ease',
                    transform: hoveredStat === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#000',
                    marginBottom: '4px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    opacity: hoveredStat === index ? 1 : 0.7,
                    transition: 'opacity 0.3s ease'
                  }}>
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach - Visual Marketing */}
        <section style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '40px' : '64px',
              fontWeight: '700',
              marginBottom: '64px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Marketing that moves markets
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '24px'
            }}>
              {[
                {
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  ),
                  title: 'Premium visual content',
                  description: 'Professional photography, drone footage, and virtual tours that showcase your property\'s best features'
                },
                {
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                  ),
                  title: 'Strategic positioning',
                  description: 'Data-driven pricing and positioning that attracts qualified buyers and maximizes competition'
                },
                {
                  icon: (
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 1v6"/>
                      <path d="M12 17v6"/>
                      <path d="M4.22 4.22l4.24 4.24"/>
                      <path d="M15.54 15.54l4.24 4.24"/>
                      <path d="M1 12h6"/>
                      <path d="M17 12h6"/>
                      <path d="M4.22 19.78l4.24-4.24"/>
                      <path d="M15.54 8.46l4.24-4.24"/>
                    </svg>
                  ),
                  title: 'Targeted reach',
                  description: 'Multi-channel campaigns across digital, print, and our exclusive buyer network'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: '40px',
                    backgroundColor: '#fff',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e5e5';
                  }}
                >
                  <div style={{ marginBottom: '24px', color: '#000' }}>
                    {item.icon}
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '12px',
                    color: '#000'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.6'
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Expertise */}
        <section style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
              gap: '64px',
              alignItems: 'center'
            }}>
              <div>
                <h2 style={{
                  fontSize: isMobile ? '36px' : '48px',
                  fontWeight: '700',
                  marginBottom: '24px',
                  color: '#000',
                  letterSpacing: '-0.02em'
                }}>
                  Berwick's most trusted agents
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  With three decades of experience in the south-east corridor, we understand the nuances of every street, the potential of every property, and the dynamics of our local market.
                </p>
                <p style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  Our agents live locally, work locally, and are invested in the community's growth. This deep connection translates to better results for our clients.
                </p>
                <Link
                  href="/agents"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    color: '#000',
                    fontWeight: '600',
                    textDecoration: 'none',
                    borderBottom: '2px solid #000',
                    paddingBottom: '4px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px';
                  }}
                >
                  Meet our team
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </Link>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '24px'
              }}>
                {[
                  'Berwick', 'Narre Warren', 'Cranbourne', 'Pakenham',
                  'Officer', 'Clyde North', 'Hampton Park', 'Beaconsfield'
                ].map((suburb, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '24px',
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      border: '1px solid #e5e5e5',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#000'
                    }}>
                      {suburb}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Simple Appraisal Form */}
        <section id="appraisal-form" style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '40px' : '56px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#000',
              letterSpacing: '-0.02em',
              textAlign: 'center'
            }}>
              Start your journey
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '48px',
              textAlign: 'center'
            }}>
              Request a comprehensive property appraisal from our expert team
            </p>

            {submitSuccess ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                backgroundColor: '#f8f8f8',
                borderRadius: '4px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#000',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#000'
                }}>
                  Thank you
                </h3>
                <p style={{
                  fontSize: '18px',
                  color: '#666'
                }}>
                  We'll be in touch within 2 hours during business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '24px'
                }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: '#fff'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#000'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '4px',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      backgroundColor: '#fff'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#000'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                  />
                </div>
                
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: '#fff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
                
                <input
                  type="text"
                  placeholder="Property address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: '#fff'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
                
                <textarea
                  placeholder="Tell us about your property goals (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  style={{
                    padding: '16px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    fontSize: '16px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: '#fff',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '16px 32px',
                    backgroundColor: isSubmitting ? '#666' : '#000',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    marginTop: '16px'
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#333')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#000')}
                >
                  {isSubmitting ? 'Submitting...' : 'Request appraisal'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Final Trust Statement */}
        <section style={{
          paddingTop: isMobile ? '60px' : '96px',
          paddingBottom: isMobile ? '60px' : '96px',
          backgroundColor: '#000',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Experience makes the difference
            </h2>
            <p style={{
              fontSize: '18px',
              opacity: 0.8,
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              When you're ready to sell, choose the team that combines three decades of local expertise with the most innovative marketing in the industry.
            </p>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}