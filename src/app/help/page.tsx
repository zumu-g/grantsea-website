'use client';

import React, { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import { motion } from 'framer-motion';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a viewing by clicking the 'Book Viewing' button on any property listing, or by contacting the listing agent directly through the contact details provided."
    },
    {
      question: "What documents do I need to buy a property?",
      answer: "Essential documents include proof of identity, proof of income, bank statements, mortgage pre-approval, and any additional documents requested by your solicitor."
    },
    {
      question: "How is property valuation calculated?",
      answer: "Property valuations consider location, size, condition, recent sales in the area, market trends, and unique features. Our experienced agents provide free market appraisals."
    },
    {
      question: "What fees are involved in selling a property?",
      answer: "Typical fees include agent commission, solicitor fees, marketing costs, and potential capital gains tax. We provide a full breakdown during your initial consultation."
    },
    {
      question: "Can I save properties to view later?",
      answer: "Yes! Click the heart icon on any property to save it to your favorites. Access your saved properties anytime from the heart icon in the navigation menu."
    }
  ];

  const categories = [
    {
      title: "Buying Property",
      description: "Everything you need to know about purchasing your dream home",
      icon: "🏠",
      links: [
        { text: "First-time buyer guide", href: "#first-time-buyer" },
        { text: "Understanding mortgages", href: "#mortgage" },
        { text: "Property inspections", href: "#inspection" },
        { text: "Making an offer", href: "#offers" }
      ]
    },
    {
      title: "Selling Property", 
      description: "Get the best value for your property with our expert guidance",
      icon: "💰",
      links: [
        { text: "Property valuation", href: "#valuation" },
        { text: "Marketing your property", href: "#marketing" },
        { text: "Managing viewings", href: "#viewings" },
        { text: "Price negotiation", href: "#negotiation" }
      ]
    },
    {
      title: "Renting & Leasing",
      description: "Find the perfect rental or lease out your property", 
      icon: "🔑",
      links: [
        { text: "Tenant guide", href: "#tenant-guide" },
        { text: "Landlord services", href: "#landlord-guide" },
        { text: "Lease agreements", href: "#lease-agreement" },
        { text: "Property maintenance", href: "#maintenance" }
      ]
    },
    {
      title: "Your Account",
      description: "Manage your saved properties and search preferences",
      icon: "👤", 
      links: [
        { text: "Saved properties", href: "#saved-properties" },
        { text: "Search alerts", href: "#search-alerts" },
        { text: "Update profile", href: "#profile" },
        { text: "Privacy settings", href: "#privacy" }
      ]
    }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '180px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '48px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}>
              Help & Support
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '20px',
                color: '#666',
                fontWeight: '300',
                letterSpacing: '0.01em',
                marginBottom: '40px'
              }}>
              We're here to help you with all your property needs
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                maxWidth: '600px',
                margin: '0 auto'
              }}>
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  fontSize: '16px',
                  border: '1px solid #F0F0F0',
                  borderRadius: '2px',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#000';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#F0F0F0';
                }}
              />
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <section style={{
          backgroundColor: '#FAFAFA',
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '32px'
            }}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F0F0F0',
                    borderRadius: '2px',
                    padding: '40px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  <div style={{
                    fontSize: '48px',
                    marginBottom: '24px'
                  }}>
                    {category.icon}
                  </div>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '400',
                    color: '#000',
                    marginBottom: '16px',
                    letterSpacing: '-0.01em'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '32px',
                    fontWeight: '300'
                  }}>
                    {category.description}
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex} style={{ marginBottom: '12px' }}>
                        <a
                          href={link.href}
                          style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '14px',
                            borderBottom: '1px solid transparent',
                            transition: 'border-color 0.3s ease',
                            fontWeight: '400'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '48px',
                textAlign: 'center',
                letterSpacing: '-0.02em'
              }}>
              Frequently Asked Questions
            </motion.h2>
            
            <div style={{
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    borderBottom: '1px solid #F0F0F0',
                    paddingTop: '32px',
                    paddingBottom: '32px'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      fontWeight: '400',
                      color: '#000',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'inherit'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: '300',
                      transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}>
                      +
                    </span>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        marginTop: '20px',
                        fontSize: '16px',
                        color: '#666',
                        lineHeight: '1.8',
                        fontWeight: '300'
                      }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          backgroundColor: '#FAFAFA',
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}>
              Still Need Help?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '48px',
                fontWeight: '300'
              }}>
              Our support team is ready to assist you
            </motion.p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0F0F0',
                  borderRadius: '2px',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  📞 Call Us
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '24px',
                  fontWeight: '300'
                }}>
                  Speak to our support team
                </p>
                <a
                  href="tel:1300123456"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    fontSize: '16px',
                    fontWeight: '400',
                    transition: 'all 0.3s ease',
                    marginBottom: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                  }}
                >
                  1300 123 456
                </a>
                <p style={{
                  fontSize: '14px',
                  color: '#999',
                  fontWeight: '300'
                }}>
                  Mon-Fri 9am-5pm, Sat 9am-12pm
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0F0F0',
                  borderRadius: '2px',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  ✉️ Email Support
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '24px',
                  fontWeight: '300'
                }}>
                  Get a response within 24 hours
                </p>
                <a
                  href="mailto:support@grantsea.com.au"
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    fontSize: '16px',
                    fontWeight: '400',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                  }}
                >
                  support@grantsea.com.au
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0F0F0',
                  borderRadius: '2px',
                  padding: '40px',
                  textAlign: 'center'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  💬 Live Chat
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '24px',
                  fontWeight: '300'
                }}>
                  Chat with an agent now
                </p>
                <button
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '2px',
                    fontSize: '16px',
                    fontWeight: '400',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                  }}
                >
                  Start Chat
                </button>
                <p style={{
                  fontSize: '14px',
                  color: '#999',
                  fontWeight: '300'
                }}>
                  Available during business hours
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '120px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '48px',
                letterSpacing: '-0.02em'
              }}>
              Helpful Resources
            </motion.h2>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '24px'
            }}>
              {[
                { text: "Buyer's Guide", href: "/buy" },
                { text: "Seller's Guide", href: "/sell" },
                { text: "Renter's Guide", href: "/rent" },
                { text: "Visit Our Offices", href: "/offices" }
              ].map((resource, index) => (
                <motion.a
                  key={resource.text}
                  href={resource.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    border: '1px solid #000',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: '400',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  {resource.text} →
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}