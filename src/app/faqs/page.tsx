'use client';

import React, { useState } from 'react';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Buying Property',
      questions: [
        {
          q: 'How do I start my property search?',
          a: 'Start by browsing our property listings or using our advanced search filters. You can also speak with one of our expert agents who can help identify properties that match your specific requirements and budget.'
        },
        {
          q: 'What costs are involved in buying a property?',
          a: 'Beyond the purchase price, you\'ll need to budget for stamp duty, legal/conveyancing fees, building and pest inspections, loan application fees (if borrowing), and potentially lenders mortgage insurance. Our agents can provide a detailed breakdown specific to your situation.'
        },
        {
          q: 'How long does the buying process take?',
          a: 'The typical buying process takes 30-90 days from making an offer to settlement. This includes time for inspections, finance approval, and legal processes. Auction purchases often have a 30-day settlement period.'
        },
        {
          q: 'Do I need pre-approval before making an offer?',
          a: 'While not mandatory, we strongly recommend getting pre-approval before making offers. It shows vendors you\'re a serious buyer and helps you understand your exact budget. Our agents can recommend trusted mortgage brokers.'
        }
      ]
    },
    {
      category: 'Selling Property',
      questions: [
        {
          q: 'How do I know what my property is worth?',
          a: 'Request a free property appraisal from our experienced agents. We\'ll analyze recent sales in your area, current market conditions, and your property\'s unique features to provide an accurate market value assessment.'
        },
        {
          q: 'Should I sell by auction or private sale?',
          a: 'Both methods have advantages. Auctions create competition and set a deadline, ideal for properties with strong demand. Private sales offer more flexibility and control. Our agents will recommend the best approach based on your property and local market conditions.'
        },
        {
          q: 'What preparation is needed before listing?',
          a: 'Consider repairs, decluttering, and styling to maximize appeal. Professional photography is essential. We provide a comprehensive pre-sale checklist and can connect you with trusted tradespeople and stylists.'
        },
        {
          q: 'How much are agent commissions?',
          a: 'Commission rates vary but typically range from 1.5-3% of the sale price. Our rates are competitive and transparent. We\'ll discuss our fee structure during your appraisal appointment.'
        }
      ]
    },
    {
      category: 'Renting & Leasing',
      questions: [
        {
          q: 'What documents do I need for a rental application?',
          a: 'You\'ll typically need proof of identity, income verification (payslips or bank statements), rental history, and references. Having these ready speeds up your application process.'
        },
        {
          q: 'How much bond is required?',
          a: 'In Victoria, the maximum bond is equivalent to one month\'s rent for properties under $900 per week. For properties over $900 per week, there\'s no maximum limit, though it\'s typically 4-6 weeks\' rent.'
        },
        {
          q: 'Can I break my lease early?',
          a: 'Yes, but you may be liable for costs including advertising fees, rent until a new tenant is found, and potentially a lease break fee. Always review your lease agreement and discuss with your property manager first.'
        },
        {
          q: 'How often are rental inspections conducted?',
          a: 'Routine inspections typically occur every 3-6 months, with proper notice given. These ensure the property is being maintained and identify any maintenance issues early.'
        }
      ]
    },
    {
      category: 'Property Investment',
      questions: [
        {
          q: 'What makes a good investment property?',
          a: 'Key factors include location, rental yield, capital growth potential, tenant demand, and maintenance requirements. Properties near transport, schools, and amenities typically perform well. Our agents can help identify high-potential investments.'
        },
        {
          q: 'What is negative gearing?',
          a: 'Negative gearing occurs when your property expenses (including loan interest) exceed rental income, creating a tax-deductible loss. Consult with a financial advisor to understand if this strategy suits your situation.'
        },
        {
          q: 'Should I use a property manager?',
          a: 'Professional property management saves time, ensures compliance with regulations, and typically achieves better rental returns. Our property management team handles everything from tenant screening to maintenance coordination.'
        },
        {
          q: 'What rental yield should I target?',
          a: 'A good rental yield varies by location and property type. In Melbourne\'s outer suburbs, 3-5% is typical. Consider both yield and capital growth potential when evaluating investments.'
        }
      ]
    },
    {
      category: 'Market & Local Area',
      questions: [
        {
          q: 'What areas does Grant\'s Estate Agents service?',
          a: 'We specialize in Casey and Cardinia regions, including Berwick, Cranbourne, Narre Warren, Pakenham, Officer, Clyde, and surrounding suburbs. Our local expertise gives our clients a significant advantage.'
        },
        {
          q: 'How is the current property market?',
          a: 'Market conditions vary by suburb and property type. Request our latest market report for detailed insights on prices, days on market, and trends in your area of interest.'
        },
        {
          q: 'Which suburbs offer the best value?',
          a: 'Emerging suburbs like Clyde, Officer, and Clyde North offer excellent value with new infrastructure and amenities. Established areas like Berwick and Narre Warren provide proven growth. Our agents can guide you based on your priorities.'
        },
        {
          q: 'What\'s driving growth in the southeast?',
          a: 'Major infrastructure projects, population growth, improved transport links, new schools and shopping centers, and relative affordability compared to inner Melbourne are key growth drivers.'
        }
      ]
    },
    {
      category: 'General Questions',
      questions: [
        {
          q: 'How do I contact Grant\'s Estate Agents?',
          a: 'Call us on 03 9799 3888, visit our Berwick office, or contact us through our website. Our team is available 7 days a week to assist with your property needs.'
        },
        {
          q: 'Do you offer property management services?',
          a: 'Yes, we provide comprehensive property management services including tenant screening, rent collection, maintenance coordination, and regular inspections. Our experienced team manages hundreds of properties across the region.'
        },
        {
          q: 'Can I get market updates for my suburb?',
          a: 'Absolutely! Subscribe to our newsletter for regular market updates, or request a specific suburb report from our agents. We also provide quarterly market reports for all our service areas.'
        },
        {
          q: 'What makes Grant\'s different from other agencies?',
          a: 'With over 15 years of local expertise, we combine deep market knowledge with innovative technology and personalized service. Our team lives and works in the area, giving us unmatched local insights.'
        }
      ]
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const pageContent = (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: '120px',
        paddingBottom: '80px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {/* Hero Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '300',
              marginBottom: '16px',
              letterSpacing: '-1px'
            }}>
              Frequently Asked Questions
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Find answers to common questions about buying, selling, renting, and investing in property.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {faqs.map((category, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const element = document.getElementById(`category-${idx}`);
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f8f8f8',
                  border: '1px solid #e0e0e0',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f8f8';
                  e.currentTarget.style.color = '#000';
                }}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* FAQ Sections */}
          {faqs.map((category, categoryIdx) => (
            <div
              key={categoryIdx}
              id={`category-${categoryIdx}`}
              style={{
                marginBottom: '64px',
                scrollMarginTop: '100px'
              }}
            >
              <h2 style={{
                fontSize: '32px',
                fontWeight: '400',
                marginBottom: '32px',
                paddingBottom: '16px',
                borderBottom: '2px solid #f0f0f0'
              }}>
                {category.category}
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {category.questions.map((faq, questionIdx) => {
                  const globalIndex = categoryIdx * 100 + questionIdx;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIdx}
                      style={{
                        backgroundColor: '#fff',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transition: 'all 0.2s'
                      }}
                    >
                      <button
                        onClick={() => toggleQuestion(globalIndex)}
                        style={{
                          width: '100%',
                          padding: '24px',
                          backgroundColor: isOpen ? '#f8f8f8' : '#fff',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.backgroundColor = '#f8f8f8';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isOpen) {
                            e.currentTarget.style.backgroundColor = '#fff';
                          }
                        }}
                      >
                        <span style={{
                          fontSize: '18px',
                          fontWeight: '500',
                          color: '#000',
                          paddingRight: '24px'
                        }}>
                          {faq.q}
                        </span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{
                            flexShrink: 0,
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s'
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 24px 24px',
                          borderTop: '1px solid #f0f0f0',
                          animation: 'slideDown 0.2s ease'
                        }}>
                          <p style={{
                            fontSize: '16px',
                            lineHeight: '1.6',
                            color: '#666',
                            marginTop: '16px'
                          }}>
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Contact Section */}
          <div style={{
            backgroundColor: '#f8f8f8',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            marginTop: '64px'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '400',
              marginBottom: '16px'
            }}>
              Still have questions?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Our expert team is here to help with any property-related queries you may have.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="tel:0397993888"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#AF272F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call 03 9799 3888
              </a>
              <button
                onClick={() => {
                  const aiButton = document.querySelector('[data-ai-chat-button]') as HTMLButtonElement;
                  if (aiButton) aiButton.click();
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  border: '2px solid #000',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.color = '#000';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
      </main>

      <OncomFooter />
      <AIChatWidget />

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );

  return pageContent;
}