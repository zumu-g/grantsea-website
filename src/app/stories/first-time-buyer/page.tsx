'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function FirstTimeBuyerStory() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <OncomHeader />

      <main style={{ paddingTop: isMobile ? '90px' : '190px', backgroundColor: '#fff' }}>
        {/* Hero Section */}
        <section style={{
          paddingTop: isMobile ? '40px' : isTablet ? '60px' : '80px',
          paddingBottom: isMobile ? '40px' : isTablet ? '60px' : '80px',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#666'
              }}>
                <Link href="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
                <span>/</span>
                <Link href="/stories" style={{ color: '#666', textDecoration: 'none' }}>Stories</Link>
                <span>/</span>
                <span style={{ color: '#000' }}>First-Time Buyer Success</span>
              </div>
            </nav>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? '32px' : '80px',
              alignItems: 'center'
            }}>
              <div>
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#000',
                  color: '#fff',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  marginBottom: '16px'
                }}>
                  First Home Success
                </div>
                <h1 style={{
                  fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  marginBottom: isMobile ? '16px' : '24px',
                  color: '#000',
                  lineHeight: '1.1'
                }}>
                  Sarah's Journey: From Renter to Homeowner in 6 Months
                </h1>
                <p style={{
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  How Sarah Thompson navigated the property market as a first-time buyer and found her perfect home with professional guidance.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&q=80"
                  alt="First home buyer success story"
                  style={{
                    width: '100%',
                    height: isMobile ? '250px' : isTablet ? '350px' : '400px',
                    objectFit: 'cover',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Content */}
        <section style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)'
          }}>
            <div style={{
              fontSize: isMobile ? '16px' : '18px',
              lineHeight: '1.7',
              color: '#333'
            }}>
              <p>
                Sarah Thompson had been renting in Melbourne's inner suburbs for five years when she decided it was time to buy her first home. At 28, she had a stable job in marketing and had saved a modest deposit, but the property market felt overwhelming and intimidating.
              </p>

              <p>
                "I had no idea where to start," Sarah recalls. "I was looking at properties online, but I didn't understand the process, the costs, or what I should be looking for. I almost gave up before I started."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Turning Point: Getting Professional Help
              </h2>

              <p>
                Sarah's breakthrough came when she contacted a local real estate agent who specialized in first-home buyers. "The agent sat down with me and explained everything - from pre-approval to settlement. They helped me understand my borrowing capacity, the additional costs I'd need to budget for, and what areas would work within my budget."
              </p>

              <p>
                The agent's first piece of advice was to get pre-approved for a loan before even looking at properties. "I had no idea this was so important," Sarah says. "Knowing exactly how much I could borrow gave me confidence and helped me focus my search on properties I could actually afford."
              </p>

              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '24px',
                borderRadius: '8px',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Understanding the Hidden Costs
                </h3>
                <p>
                  One of Sarah's biggest surprises was discovering all the additional costs involved in buying a property. The agent provided Sarah with a comprehensive cost breakdown:
                </p>
                <ul style={{ marginTop: '16px' }}>
                  <li><strong>Stamp duty:</strong> $15,000 (first-home buyer concession applied)</li>
                  <li><strong>Legal fees:</strong> $1,500</li>
                  <li><strong>Building inspection:</strong> $600</li>
                  <li><strong>Loan application fees:</strong> $800</li>
                  <li><strong>Insurance:</strong> $400</li>
                  <li><strong>Moving costs:</strong> $1,200</li>
                </ul>
                <p style={{ marginTop: '16px' }}>
                  "Total additional costs were around $20,000," Sarah explains. "Without the agent's help, I would have been caught short and might have had to pull out of a purchase."
                </p>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Location vs. Property Dilemma
              </h2>

              <p>
                Sarah quickly learned that she had to compromise on some features to get the location she wanted. "I had my heart set on a modern apartment with a balcony, but the agent helped me understand what I could realistically afford in my preferred areas."
              </p>

              <p>
                The agent showed Sarah properties in different price ranges and locations, helping her understand the trade-offs. "We looked at older properties in better locations versus newer properties further out. The agent helped me see that location was more important than having the latest fixtures."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Perfect Property
              </h2>

              <p>
                Sarah's dream home was a two-bedroom unit in Berwick, built in the 1990s but well-maintained. "It had everything I needed: two bedrooms, a small courtyard, and it was close to the train station. The price was right at $580,000."
              </p>

              <p>
                The agent helped Sarah negotiate the purchase price and navigate the contract process. "I had no idea about cooling-off periods, settlement dates, or what to look for in a contract. The agent guided me through every step."
              </p>

              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #28a745',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#155724'
                }}>
                  Key Lessons Learned
                </h3>
                <ul style={{ color: '#155724' }}>
                  <li><strong>Get pre-approved first</strong> - "Knowing exactly how much I could borrow gave me confidence and helped me focus my search."</li>
                  <li><strong>Budget for hidden costs</strong> - "I had no idea about stamp duty, legal fees, building inspections, and other costs."</li>
                  <li><strong>Location vs. Property</strong> - "I had to compromise on the property to get the location I wanted."</li>
                  <li><strong>Don't fall in love too quickly</strong> - "I learned to keep my emotions in check and always get a building inspection."</li>
                  <li><strong>Professional guidance is essential</strong> - "I couldn't have done this without the agent's help."</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result
              </h2>

              <p>
                Sarah successfully purchased her first home and has been living there for two years. "I love my home and my neighborhood. The property has increased in value, and I'm building equity every month. Most importantly, I have the security and stability that comes with homeownership."
              </p>

              <p>
                Sarah's journey demonstrates that with the right guidance and preparation, first-time buyers can successfully navigate the property market and find their perfect home. The key is to work with professionals who understand the process and can provide the support and advice needed to make informed decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          backgroundColor: '#000',
          color: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            paddingLeft: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            paddingRight: isMobile ? '20px' : isTablet ? '40px' : 'max(2rem, 3.33vw)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#fff',
              lineHeight: '1.2'
            }}>
              Ready to Start Your Property Journey?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Contact our team of experienced professionals who can guide you through every step of the process, from initial planning to successful settlement.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                color: '#000',
                padding: isMobile ? '18px 32px' : '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                minHeight: '44px',
                justifyContent: 'center'
              }}>
                Get Professional Guidance
              </Link>
              <Link href="/stories" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#fff',
                padding: isMobile ? '18px 32px' : '16px 32px',
                borderRadius: '8px',
                border: '1px solid #fff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
                minHeight: '44px',
                justifyContent: 'center'
              }}>
                Read More Stories
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}