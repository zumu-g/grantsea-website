'use client';

import React, { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import Link from 'next/link';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a viewing by clicking the 'Book Inspection' button on any property listing, or by contacting the listing agent directly through the contact details provided on the property page."
    },
    {
      question: "What documents do I need to buy a property?",
      answer: "Essential documents include proof of identity (passport or driver's licence), proof of income (payslips or tax returns), bank statements, mortgage pre-approval letter, and any additional documents requested by your solicitor or conveyancer."
    },
    {
      question: "How is property valuation calculated?",
      answer: "Property valuations consider multiple factors including location, land size, dwelling size, number of bedrooms and bathrooms, property condition, recent comparable sales in the area, current market trends, and unique features. Our experienced agents provide complimentary market appraisals."
    },
    {
      question: "What fees are involved in selling a property?",
      answer: "Typical fees include agent commission (usually 1.5-2.5% of sale price), conveyancing/legal fees ($800-$2,000), marketing costs ($2,000-$10,000), and potential capital gains tax. We provide a complete fee breakdown during your initial consultation."
    },
    {
      question: "How do I save properties to view later?",
      answer: "Click the heart icon on any property listing to save it to your favourites. Access your saved properties anytime by clicking the heart icon in the top navigation. Your saved properties are stored locally and will persist between visits."
    },
    {
      question: "What areas do you service?",
      answer: "We specialise in Melbourne's South-East, including Berwick, Narre Warren, Cranbourne, Pakenham, Officer, Clyde, and surrounding suburbs in the Casey and Cardinia regions. Our local expertise spans over 20 suburbs."
    }
  ];

  const categories = [
    {
      title: "Buying",
      description: "Everything you need to know about purchasing property",
      links: [
        { text: "Properties for sale", href: "/buy" },
        { text: "Open for inspection", href: "/buy/open-for-inspection" },
        { text: "Forthcoming auctions", href: "/buy/forthcoming-auctions" },
        { text: "Stamp duty calculator", href: "/calculators/stamp-duty" }
      ]
    },
    {
      title: "Selling",
      description: "Maximise your property's value with expert guidance",
      links: [
        { text: "Request an appraisal", href: "/appraisal" },
        { text: "Why sell with us", href: "/sell" },
        { text: "Buy & sell calculator", href: "/calculators/buy-sell" },
        { text: "Recent sales", href: "/search?type=sold" }
      ]
    },
    {
      title: "Renting",
      description: "Find your perfect rental or manage your investment",
      links: [
        { text: "Properties for rent", href: "/rent" },
        { text: "Rental inspections", href: "/rent/open-for-inspection" },
        { text: "Tenant information", href: "/rent" },
        { text: "Report maintenance", href: "/rent/report-maintenance" }
      ]
    },
    {
      title: "Resources",
      description: "Guides, calculators and local information",
      links: [
        { text: "Suburb guides", href: "/suburbs-guide" },
        { text: "Schools guide", href: "/schools-guide" },
        { text: "Borrowing calculator", href: "/calculators/borrowing-capacity" },
        { text: "Market insights", href: "/market-analytics" }
      ]
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <>
      <OncomHeader />

      <main style={{ paddingTop: '200px', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        {/* Hero Section */}
        <section style={{
          paddingTop: '60px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          borderBottom: '1px solid #F0F0F0'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(42px, 5vw, 72px)',
              fontWeight: '700',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: '#000',
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              lineHeight: '1.05'
            }}>
              Help & Support
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontWeight: '400',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              maxWidth: '600px',
              lineHeight: '1.6',
              marginBottom: '48px'
            }}>
              Find answers to common questions or get in touch with our team
            </p>

            {/* Search Bar */}
            <div style={{ maxWidth: '560px' }}>
              <div style={{ position: 'relative' }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="2"
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '18px 24px 18px 56px',
                    fontSize: '16px',
                    border: '1px solid #E0E0E0',
                    borderRadius: '100px',
                    backgroundColor: '#FAFAFA',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#000';
                    e.target.style.backgroundColor = '#FFFFFF';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0E0E0';
                    e.target.style.backgroundColor = '#FAFAFA';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Categories */}
        <section style={{
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          backgroundColor: '#FAFAFA'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: '#999',
              marginBottom: '40px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const
            }}>
              Browse by topic
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {categories.map((category) => (
                <div
                  key={category.title}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F0F0F0',
                    borderRadius: '2px',
                    padding: '40px',
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    color: '#000',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em'
                  }}>
                    {category.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.6',
                    marginBottom: '28px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    {category.description}
                  </p>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex} style={{ marginBottom: '14px' }}>
                        <Link
                          href={link.href}
                          style={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '15px',
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#D4A853';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#000';
                          }}
                        >
                          {link.text}
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '700',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: '#000',
              marginBottom: '16px',
              letterSpacing: '-0.03em'
            }}>
              Frequently asked questions
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '60px',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
            }}>
              {searchQuery ? `${filteredFaqs.length} result${filteredFaqs.length !== 1 ? 's' : ''} found` : 'Quick answers to common questions'}
            </p>

            <div>
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  style={{
                    borderTop: index === 0 ? '1px solid #E0E0E0' : 'none',
                    borderBottom: '1px solid #E0E0E0'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      fontSize: '17px',
                      fontWeight: '500',
                      color: '#000',
                      cursor: 'pointer',
                      padding: '28px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    <span style={{ paddingRight: '24px' }}>{faq.question}</span>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: '300',
                      transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      flexShrink: 0,
                      color: openFaq === index ? '#D4A853' : '#000'
                    }}>
                      +
                    </span>
                  </button>
                  <div style={{
                    maxHeight: openFaq === index ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease',
                    opacity: openFaq === index ? 1 : 0
                  }}>
                    <p style={{
                      paddingBottom: '28px',
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '1.8',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {searchQuery && filteredFaqs.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 0',
                color: '#666'
              }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>No results found for "{searchQuery}"</p>
                <p style={{ fontSize: '14px' }}>Try a different search term or browse the topics above</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section style={{
          paddingTop: '100px',
          paddingBottom: '120px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          backgroundColor: '#000',
          color: '#FFFFFF'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '60px',
              alignItems: 'start'
            }}>
              {/* Left Column - Header */}
              <div>
                <h2 style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: '700',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                  letterSpacing: '-0.03em'
                }}>
                  Still need help?
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.6',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  maxWidth: '400px'
                }}>
                  Our team is here to assist you with any questions about buying, selling, or renting property.
                </p>
              </div>

              {/* Right Column - Contact Options */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px'
              }}>
                {/* Phone */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    Call us
                  </h3>
                  <a
                    href="tel:0397071400"
                    style={{
                      fontSize: '15px',
                      color: 'rgba(245, 245, 245, 1)',
                      textDecoration: 'none',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      display: 'block',
                      marginBottom: '8px'
                    }}
                  >
                    (03) 9707 1400
                  </a>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    Mon-Fri 9am-5:30pm<br />
                    Sat 9am-1pm
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    Email us
                  </h3>
                  <a
                    href="mailto:info@grantsestateagents.com.au"
                    style={{
                      fontSize: '15px',
                      color: '#D4A853',
                      textDecoration: 'none',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                      display: 'block',
                      marginBottom: '8px',
                      wordBreak: 'break-word'
                    }}
                  >
                    info@grantsestateagents.com.au
                  </a>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    Response within 24 hours
                  </p>
                </div>

                {/* Visit */}
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: '8px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                  }}>
                    Visit us
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    marginBottom: '8px',
                    lineHeight: '1.5'
                  }}>
                    89 High Street<br />
                    Berwick VIC 3806
                  </p>
                  <Link
                    href="/offices"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(250, 250, 249, 1)',
                      textDecoration: 'none',
                      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                    }}
                  >
                    View all offices
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links Footer */}
        <section style={{
          paddingTop: '80px',
          paddingBottom: '100px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '14px',
              fontWeight: '500',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: '#999',
              marginBottom: '32px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const
            }}>
              Popular resources
            </h2>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px'
            }}>
              {[
                { text: "Properties for sale", href: "/buy" },
                { text: "Free appraisal", href: "/appraisal" },
                { text: "Suburb guides", href: "/suburbs-guide" },
                { text: "Calculators", href: "/calculators" },
                { text: "Contact us", href: "/contact" }
              ].map((resource) => (
                <Link
                  key={resource.text}
                  href={resource.href}
                  style={{
                    display: 'inline-block',
                    padding: '14px 28px',
                    border: '1px solid #E0E0E0',
                    borderRadius: '100px',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.borderColor = '#000';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = '#E0E0E0';
                    e.currentTarget.style.color = '#000';
                  }}
                >
                  {resource.text}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
