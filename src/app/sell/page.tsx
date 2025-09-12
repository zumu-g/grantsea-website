'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { motion } from 'framer-motion';

export default function SellPage() {
  const [showAppraisalForm, setShowAppraisalForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Appraisal request:', formData);
    alert('Thank you for your appraisal request. Our team will contact you within 24 hours.');
    setShowAppraisalForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      suburb: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      message: ''
    });
  };

  return (
    <div>
      <OncomHeader />
      
      <main style={{ paddingTop: '64px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.5
          }} />
          
          <div style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: '#FFF',
            maxWidth: '900px',
            paddingLeft: 'max(2rem, 3.33vw)',
            paddingRight: 'max(2rem, 3.33vw)'
          }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '32px',
                letterSpacing: '-0.03em',
                lineHeight: '0.9'
              }}
            >
              Sell with Confidence
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: '300',
                marginBottom: '48px',
                lineHeight: '1.5',
                opacity: 0.9
              }}
            >
              Melbourne's South East property experts delivering exceptional results for over 20 years
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button
                onClick={() => setShowAppraisalForm(true)}
                style={{
                  padding: '20px 48px',
                  backgroundColor: '#FFF',
                  color: '#000',
                  border: 'none',
                  borderRadius: '40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Free Appraisal
              </button>
              
              <Link
                href="#our-process"
                style={{
                  padding: '20px 48px',
                  backgroundColor: 'transparent',
                  color: '#FFF',
                  border: '2px solid #FFF',
                  borderRadius: '40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFF';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFF';
                }}
              >
                Our Process
              </Link>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ cursor: 'pointer' }}
              onClick={() => document.getElementById('why-choose-us')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        {/* Why Choose Us */}
        <section id="why-choose-us" style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <h2 style={{
                fontSize: '56px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Why Sell with Grant's?
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Our proven track record and local expertise deliver outstanding results for our clients
              </p>
            </motion.div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '48px'
            }}>
              {[
                {
                  icon: '📊',
                  title: 'Market Leaders',
                  description: 'Average sale price 8% above suburb median through strategic marketing and expert negotiation'
                },
                {
                  icon: '⏱️',
                  title: 'Faster Sales',
                  description: 'Properties sell 40% faster than market average with our comprehensive marketing approach'
                },
                {
                  icon: '🏆',
                  title: 'Award Winning',
                  description: 'Recognised as the leading agency in Melbourne's South East for customer satisfaction'
                },
                {
                  icon: '🤝',
                  title: 'Personal Service',
                  description: 'Dedicated agent support from listing to settlement with regular communication'
                },
                {
                  icon: '📱',
                  title: 'Digital Excellence',
                  description: 'Premium online presence across major property portals and social media'
                },
                {
                  icon: '🎯',
                  title: 'Targeted Marketing',
                  description: 'Customised campaigns that reach qualified buyers actively searching in your area'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    textAlign: 'center',
                    padding: '40px',
                    backgroundColor: '#F8F8F8',
                    borderRadius: '16px',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '24px'
                  }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em'
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.6'
                  }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section id="our-process" style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: '#F8F8F8'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <h2 style={{
                fontSize: '56px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Our Proven Process
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#666'
              }}>
                A simple, transparent approach that maximises your property's value
              </p>
            </motion.div>
            
            {[
              {
                step: '01',
                title: 'Free Property Appraisal',
                description: 'Our expert agents provide a comprehensive market analysis and accurate property valuation based on recent sales data and current market conditions.'
              },
              {
                step: '02',
                title: 'Tailored Marketing Strategy',
                description: 'We develop a customised marketing plan featuring professional photography, virtual tours, and targeted advertising to reach qualified buyers.'
              },
              {
                step: '03',
                title: 'Premium Listing Exposure',
                description: 'Your property is showcased across major portals, our website, social media channels, and through our extensive buyer database.'
              },
              {
                step: '04',
                title: 'Open Homes & Private Inspections',
                description: 'Professionally managed viewings that create competition among buyers while maintaining the security and presentation of your property.'
              },
              {
                step: '05',
                title: 'Expert Negotiation',
                description: 'Our skilled negotiators work to achieve the best possible price, managing offers and guiding you through the decision-making process.'
              },
              {
                step: '06',
                title: 'Seamless Settlement',
                description: 'We coordinate with all parties to ensure a smooth settlement process, keeping you informed every step of the way until keys are exchanged.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  gap: '48px',
                  marginBottom: '64px',
                  alignItems: 'center',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                }}
              >
                <div style={{
                  flex: '0 0 120px',
                  height: '120px',
                  backgroundColor: '#000',
                  color: '#FFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '600',
                  fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif"
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em'
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: '18px',
                    color: '#666',
                    lineHeight: '1.6'
                  }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: '80px' }}
            >
              <h2 style={{
                fontSize: '56px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Recent Success Stories
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#666'
              }}>
                Real results for real people in your local area
              </p>
            </motion.div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '32px'
            }}>
              {[
                {
                  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
                  suburb: 'Berwick',
                  result: 'Sold for $1,285,000',
                  detail: '$85,000 above reserve',
                  days: '14 days on market'
                },
                {
                  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
                  suburb: 'Officer',
                  result: 'Sold for $875,000',
                  detail: '12 registered bidders',
                  days: '21 days on market'
                },
                {
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
                  suburb: 'Pakenham',
                  result: 'Sold for $695,000',
                  detail: '8% above suburb average',
                  days: '18 days on market'
                }
              ].map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    backgroundColor: '#F8F8F8',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    aspectRatio: '4/3',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={story.image}
                      alt={`Success story in ${story.suburb}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </div>
                  <div style={{ padding: '32px' }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '600',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em'
                    }}>{story.suburb}</h3>
                    <p style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#22C55E',
                      marginBottom: '8px'
                    }}>{story.result}</p>
                    <p style={{
                      fontSize: '18px',
                      color: '#666',
                      marginBottom: '4px'
                    }}>{story.detail}</p>
                    <p style={{
                      fontSize: '16px',
                      color: '#999'
                    }}>{story.days}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Services */}
        <section style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: '#000',
          color: '#FFF'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ marginBottom: '80px' }}
            >
              <h2 style={{
                fontSize: '56px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '24px',
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}>
                Premium Marketing Package
              </h2>
              <p style={{
                fontSize: '20px',
                opacity: 0.8,
                textAlign: 'center',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Every listing receives our comprehensive marketing treatment at no extra cost
              </p>
            </motion.div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '64px',
              alignItems: 'center'
            }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ul style={{
                  listStyle: 'none',
                  fontSize: '18px',
                  lineHeight: '2'
                }}>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Professional photography and videography
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ 3D virtual tours and floor plans
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Premium listings on realestate.com.au & Domain
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Social media advertising campaigns
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Email marketing to 10,000+ subscribers
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Professional signage and print advertising
                  </li>
                  <li style={{ marginBottom: '24px' }}>
                    ✓ Dedicated property website
                  </li>
                  <li>
                    ✓ Weekly reporting and market feedback
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
                  alt="Marketing services"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '32px'
                }}>
                  <p style={{
                    fontSize: '24px',
                    fontWeight: '600'
                  }}>
                    Showcasing your property at its absolute best
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          paddingTop: '120px',
          paddingBottom: '120px',
          backgroundColor: '#F8F8F8'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            <h2 style={{
              fontSize: '56px',
              fontWeight: '300',
              fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              Ready to achieve an outstanding result?
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#666',
              marginBottom: '48px'
            }}>
              Get a free property appraisal and discover what your property could be worth in today's market
            </p>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowAppraisalForm(true)}
                style={{
                  padding: '20px 48px',
                  backgroundColor: '#000',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Get Free Appraisal
              </button>
              
              <Link
                href="/contact"
                style={{
                  padding: '20px 48px',
                  backgroundColor: 'transparent',
                  color: '#000',
                  border: '2px solid #000',
                  borderRadius: '40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#FFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000';
                }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Appraisal Form Modal */}
      {showAppraisalForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowAppraisalForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: '#FFF',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '48px' }}>
              <button
                onClick={() => setShowAppraisalForm(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                ×
              </button>
              
              <h3 style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: "'Essonnes Display', 'On', Helvetica, sans-serif",
                marginBottom: '16px',
                letterSpacing: '-0.02em'
              }}>
                Free Property Appraisal
              </h3>
              <p style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '32px'
              }}>
                Get an accurate market valuation from our local experts
              </p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
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
                  
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
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
                
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '16px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '16px',
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
                
                <input
                  type="text"
                  placeholder="Property address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    padding: '16px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '16px',
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
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <input
                    type="text"
                    placeholder="Suburb"
                    required
                    value={formData.suburb}
                    onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
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
                  
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    required
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Property type</option>
                    <option value="House">House</option>
                    <option value="Unit">Unit</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Bedrooms</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+ Bedrooms</option>
                  </select>
                  
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    style={{
                      padding: '16px 20px',
                      border: '1px solid #F0F0F0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none',
                      backgroundColor: '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Bathrooms</option>
                    <option value="1">1 Bathroom</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4+">4+ Bathrooms</option>
                  </select>
                </div>
                
                <textarea
                  placeholder="Additional information (optional)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  style={{
                    padding: '16px 20px',
                    border: '1px solid #F0F0F0',
                    borderRadius: '8px',
                    fontSize: '16px',
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
                />
                
                <button
                  type="submit"
                  style={{
                    padding: '20px',
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
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Request Free Appraisal
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}