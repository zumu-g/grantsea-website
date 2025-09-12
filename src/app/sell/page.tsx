'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellPage() {
  const [showAppraisalModal, setShowAppraisalModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    preferredContact: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => {
      setShowAppraisalModal(false);
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        propertyType: '',
        preferredContact: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <React.Fragment>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: '120px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '96px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '32px',
                letterSpacing: '-0.03em',
                lineHeight: '0.95'
              }}>
              Your Property Journey<br />Starts Here
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: '24px',
                color: '#666',
                fontWeight: '400',
                letterSpacing: '0.01em',
                marginBottom: '48px',
                maxWidth: '700px',
                margin: '0 auto 48px'
              }}>
              Experience a seamless property sale with Melbourne's trusted real estate experts
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setShowAppraisalModal(true)}
              style={{
                padding: '20px 48px',
                backgroundColor: '#000',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em'
              }}
              whileHover={{
                y: -2,
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Request Free Appraisal
            </motion.button>
          </div>
        </section>

        {/* Why Choose Grant's Estate Agents */}
        <section style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '64px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '80px',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
              Why Choose Grant's Estate Agents
            </motion.h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px'
            }}>
              {[
                {
                  title: 'Local Market Expertise',
                  description: "Deep understanding of Melbourne's South East property market with proven results in your area",
                  icon: '📊'
                },
                {
                  title: 'Premium Marketing',
                  description: 'Professional photography, virtual tours, and targeted campaigns to showcase your property',
                  icon: '📸'
                },
                {
                  title: 'Trusted Network',
                  description: 'Access to our extensive database of qualified buyers actively looking in your area',
                  icon: '🤝'
                },
                {
                  title: 'Transparent Process',
                  description: 'Clear communication and regular updates throughout your entire selling journey',
                  icon: '💎'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F0F0F0',
                    borderRadius: '16px',
                    padding: '48px 40px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '24px'
                  }}>
                    {feature.icon}
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.6',
                    fontWeight: '400'
                  }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Proven Selling Process */}
        <section style={{
          backgroundColor: '#FFFFFF',
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          borderTop: '1px solid #F0F0F0',
          borderBottom: '1px solid #F0F0F0'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '64px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '80px',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
              Our Proven Selling Process
            </motion.h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {[
                { step: '01', title: 'Free Appraisal', desc: 'Comprehensive market analysis and property valuation' },
                { step: '02', title: 'Tailored Strategy', desc: 'Custom marketing plan designed for your property' },
                { step: '03', title: 'Property Preparation', desc: 'Styling advice and professional photography' },
                { step: '04', title: 'Marketing Campaign', desc: 'Multi-channel exposure to qualified buyers' },
                { step: '05', title: 'Negotiation', desc: 'Expert negotiation to achieve the best price' },
                { step: '06', title: 'Settlement', desc: 'Smooth transaction management to completion' }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '24px'
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    fontWeight: '200',
                    fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                    color: '#000',
                    lineHeight: '1',
                    minWidth: '80px'
                  }}>
                    {process.step}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {process.title}
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#666',
                      lineHeight: '1.5'
                    }}>
                      {process.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Success Stories */}
        <section style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '64px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '80px',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
              Recent Success Stories
            </motion.h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '40px'
            }}>
              {[
                {
                  address: '42 Wellington Road, Clayton',
                  soldPrice: '$1,285,000',
                  result: 'Sold $135k above reserve',
                  days: '14 days on market',
                  type: '4 bed family home'
                },
                {
                  address: '18 Park Avenue, Glen Waverley',
                  soldPrice: '$2,150,000',
                  result: 'Multiple offers received',
                  days: '8 days on market',
                  type: '5 bed luxury residence'
                },
                {
                  address: '7/25 Station Street, Oakleigh',
                  soldPrice: '$780,000',
                  result: 'Record price for complex',
                  days: '21 days on market',
                  type: '2 bed modern unit'
                }
              ].map((property, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F0F0F0',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{
                    aspectRatio: '16/10',
                    backgroundColor: '#F0F0F0',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      backgroundColor: '#000',
                      color: '#FFF',
                      padding: '8px 20px',
                      fontSize: '14px',
                      fontWeight: '600',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>
                      SOLD
                    </div>
                  </div>
                  <div style={{ padding: '40px' }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em'
                    }}>
                      {property.address}
                    </h3>
                    <p style={{
                      fontSize: '36px',
                      fontWeight: '300',
                      fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                      marginBottom: '20px',
                      letterSpacing: '-0.02em'
                    }}>
                      {property.soldPrice}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      paddingTop: '20px',
                      borderTop: '1px solid #F0F0F0'
                    }}>
                      <p style={{ fontSize: '15px', color: '#666' }}>✓ {property.result}</p>
                      <p style={{ fontSize: '15px', color: '#666' }}>✓ {property.days}</p>
                      <p style={{ fontSize: '15px', color: '#666' }}>✓ {property.type}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Marketing Package */}
        <section style={{
          backgroundColor: '#FFFFFF',
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          borderTop: '1px solid #F0F0F0',
          borderBottom: '1px solid #F0F0F0'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '64px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
              Premium Marketing Package
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '20px',
                color: '#666',
                textAlign: 'center',
                marginBottom: '80px',
                maxWidth: '800px',
                margin: '0 auto 80px'
              }}>
              Every property deserves exceptional presentation. Our comprehensive marketing package ensures maximum exposure and buyer engagement.
            </motion.p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '60px',
              alignItems: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 style={{
                  fontSize: '36px',
                  fontWeight: '300',
                  fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                  marginBottom: '40px',
                  letterSpacing: '-0.02em'
                }}>
                  What's Included
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}>
                  {[
                    'Professional photography & videography',
                    'Virtual 3D tours and floor plans',
                    'Premium listings on major portals',
                    'Social media advertising campaigns',
                    'Email marketing to buyer database',
                    'Professional signage and brochures',
                    'Open house management',
                    'Weekly performance reports'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                    >
                      <div style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span style={{
                        fontSize: '18px',
                        color: '#333',
                        fontWeight: '400'
                      }}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                  aspectRatio: '4/3',
                  backgroundColor: '#F0F0F0',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: '#999',
                  fontWeight: '500'
                }}
              >
                Marketing Preview
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          paddingTop: '120px',
          paddingBottom: '120px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '72px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '32px',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}>
              Ready to Achieve<br />Your Property Goals?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '20px',
                color: '#666',
                marginBottom: '48px',
                fontWeight: '400'
              }}>
              Get a free, no-obligation property appraisal from our expert team
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => setShowAppraisalModal(true)}
              style={{
                padding: '20px 48px',
                backgroundColor: '#000',
                color: '#FFF',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.02em'
              }}
              whileHover={{
                y: -2,
                boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Free Appraisal
            </motion.button>
          </div>
        </section>
      </main>

      {/* Appraisal Modal */}
      <AnimatePresence>
        {showAppraisalModal && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
              onClick={() => setShowAppraisalModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  maxWidth: '600px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflow: 'auto',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowAppraisalModal(false)}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    transition: 'background-color 0.3s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F0F0F0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {submitSuccess ? (
                  <div style={{
                    padding: '80px 60px',
                    textAlign: 'center'
                  }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                      style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px'
                      }}
                    >
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                    <h3 style={{
                      fontSize: '36px',
                      fontWeight: '300',
                      fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                      marginBottom: '16px',
                      letterSpacing: '-0.02em'
                    }}>
                      Thank You!
                    </h3>
                    <p style={{
                      fontSize: '18px',
                      color: '#666',
                      lineHeight: '1.6'
                    }}>
                      We've received your appraisal request.<br />
                      Our team will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ padding: '60px' }}>
                    <h2 style={{
                      fontSize: '48px',
                      fontWeight: '300',
                      fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                      marginBottom: '16px',
                      letterSpacing: '-0.02em'
                    }}>
                      Free Property Appraisal
                    </h2>
                    <p style={{
                      fontSize: '18px',
                      color: '#666',
                      marginBottom: '40px'
                    }}>
                      Complete the form below and our expert team will provide a comprehensive market appraisal.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {/* Name */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        />
                      </div>

                      {/* Property Address */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Property Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        />
                      </div>

                      {/* Property Type */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Property Type *
                        </label>
                        <select
                          required
                          value={formData.propertyType}
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        >
                          <option value="">Select property type</option>
                          <option value="house">House</option>
                          <option value="unit">Unit</option>
                          <option value="apartment">Apartment</option>
                          <option value="townhouse">Townhouse</option>
                          <option value="villa">Villa</option>
                          <option value="land">Land</option>
                        </select>
                      </div>

                      {/* Preferred Contact */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Preferred Contact Time
                        </label>
                        <select
                          value={formData.preferredContact}
                          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                        >
                          <option value="">Any time</option>
                          <option value="morning">Morning (9am-12pm)</option>
                          <option value="afternoon">Afternoon (12pm-5pm)</option>
                          <option value="evening">Evening (5pm-8pm)</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          marginBottom: '8px',
                          color: '#333'
                        }}>
                          Additional Information
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '14px 20px',
                            border: '1px solid #F0F0F0',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '400',
                            outline: 'none',
                            resize: 'vertical',
                            transition: 'border-color 0.3s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#000';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#F0F0F0';
                          }}
                          placeholder="Tell us about your property goals, timeline, or any special requirements..."
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                          padding: '18px 40px',
                          backgroundColor: isSubmitting ? '#666' : '#000',
                          color: '#FFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          marginTop: '20px',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px'
                        }}
                      >
                        {isSubmitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              border: '2px solid #FFF',
                              borderTop: '2px solid transparent',
                              borderRadius: '50%'
                            }} className="spinner" />
                            Submitting...
                          </span>
                        ) : (
                          'Submit Request'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}