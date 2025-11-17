'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function MarketTimingStory() {
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
                <span style={{ color: '#000' }}>Market Timing</span>
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
                  Market Timing
                </div>
                <h1 style={{
                  fontSize: isMobile ? '36px' : isTablet ? '48px' : '64px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  marginBottom: isMobile ? '16px' : '24px',
                  color: '#000',
                  lineHeight: '1.1'
                }}>
                  The Market Timing Masterclass
                </h1>
                <p style={{
                  fontSize: isMobile ? '16px' : '20px',
                  lineHeight: '1.6',
                  color: '#666',
                  marginBottom: '24px'
                }}>
                  How Raj and Priya Patel learned that the best time to buy is when you're ready, not when you think the market is perfect.
                </p>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop&q=80"
                  alt="Market timing and property purchase decision"
                  style={{
                    width: '100%',
                    height: '400px',
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
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#333'
            }}>
              <p>
                Raj and Priya Patel had been watching the property market for two years, waiting for the "right time" to buy their first home. They were concerned about market volatility and wanted to avoid buying at the peak of a cycle.
              </p>

              <p>
                "We were paralyzed by analysis," Raj admits. "We kept waiting for the perfect time, but the market kept moving. We were afraid of making the wrong decision."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Paralysis: Waiting for the Perfect Time
              </h2>

              <p>
                The Patels' biggest challenge was trying to time the market perfectly. "We were constantly reading about market conditions, interest rates, and economic indicators," Priya explains. "We thought we could predict the perfect time to buy, but we were always wrong."
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
                  Their Research Included:
                </h3>
                <ul style={{ marginTop: '16px' }}>
                  <li>Market reports and economic forecasts</li>
                  <li>Interest rate predictions and policy changes</li>
                  <li>Property price indices and trend analysis</li>
                  <li>Economic indicators and employment data</li>
                </ul>
                <p style={{ marginTop: '16px' }}>
                  "We were drowning in information but couldn't make a decision," Raj says. "Every time we thought we had the perfect timing, something would change."
                </p>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Breakthrough: Understanding Market Cycles
              </h2>

              <p>
                Their agent helped them understand that trying to time the market perfectly is often counterproductive. "The agent showed us that the best time to buy is when you're ready, not when you think the market is perfect," Priya explains.
              </p>

              <div style={{
                backgroundColor: '#e7f3ff',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #007bff',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#004085'
                }}>
                  Key Market Insights
                </h3>
                <ul style={{ color: '#004085' }}>
                  <li><strong>Time in the market beats timing the market:</strong> Property values generally increase over time, regardless of short-term fluctuations</li>
                  <li><strong>Focus on your needs:</strong> Find the right property for your needs, not market predictions</li>
                  <li><strong>Market conditions affect everyone:</strong> When prices are low, competition is high. When prices are high, there's less competition</li>
                  <li><strong>Long-term thinking:</strong> They were buying a home, not making a short-term investment</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Decision: Taking Action
              </h2>

              <p>
                The Patels decided to stop waiting and start looking seriously. "The agent helped us understand that waiting for the perfect time was costing us more than any potential market timing benefit," Raj says.
              </p>

              <p>
                The agent conducted a comprehensive analysis of their situation, showing them they were financially ready to buy, that current market conditions were actually favorable for buyers, and that their personal circumstances were more important than market timing.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Strategy: Focus on Value, Not Timing
              </h2>

              <p>
                The Patels developed a strategy that focused on finding value rather than timing the market. They set realistic expectations, prepared to act quickly when they found the right property, learned to negotiate from strength, and focused on value rather than just low prices.
              </p>

              <div style={{
                backgroundColor: '#fff3cd',
                padding: '24px',
                borderRadius: '8px',
                borderLeft: '4px solid #ffc107',
                margin: '32px 0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#856404'
                }}>
                  The Search Process
                </h3>
                <p>The Patels began their property search with a clear strategy:</p>
                <ul style={{ marginTop: '16px', color: '#856404' }}>
                  <li><strong>Define your criteria:</strong> Clear list of must-haves and nice-to-haves</li>
                  <li><strong>Set a realistic budget:</strong> Focus on what they could afford, not what they thought they should pay</li>
                  <li><strong>Be prepared to compromise:</strong> Find the right property, not the perfect property</li>
                </ul>
              </div>

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
                The Patels found their perfect home after looking at 12 properties over six weeks. "The agent helped us understand that this property offered excellent value," Priya says. "It wasn't the cheapest property we looked at, but it was the best value."
              </p>

              <p>
                The property featured three bedrooms with built-in wardrobes, a modern kitchen with quality appliances, a large backyard perfect for their children, proximity to schools and transport, and good growth potential due to infrastructure development.
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result: A Successful Purchase
              </h2>

              <p>
                The Patels successfully purchased their home and are thrilled with the result. "We stopped trying to time the market and focused on finding the right home," Priya says. "It was the best decision we could have made."
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
                  <li><strong>Don't try to time the market perfectly</strong> - The best time to buy is when you're ready</li>
                  <li><strong>Focus on your needs and budget</strong> - Not market predictions</li>
                  <li><strong>Work with agents who understand market conditions</strong> - Their expertise is invaluable</li>
                  <li><strong>Be prepared to act when you find the right property</strong> - Hesitation often means missing out</li>
                  <li><strong>Think long-term, not short-term</strong> - You're buying a home, not making a short-term investment</li>
                </ul>
              </div>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Future: A Home for Life
              </h2>

              <p>
                The Patels are confident they've made the right decision. "We love our home and our neighborhood," Priya says. "We're not worried about market fluctuations because we're focused on the long-term."
              </p>

              <p>
                Their home has already increased in value, but more importantly, it provides the perfect foundation for their family's future. "We're building equity while living in a home we love," Raj says. "That's what matters most."
              </p>

              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginTop: '48px',
                marginBottom: '24px',
                color: '#000'
              }}>
                The Result: Success Through Action
              </h2>

              <p>
                The Patels' story demonstrates that taking action is often more important than perfect timing. "We spent two years trying to time the market perfectly," Priya says. "In the end, we realized that the best time to buy was when we were ready, not when we thought the market was perfect."
              </p>

              <p>
                Their success came from focusing on their needs, working with the right professionals, and taking action when they found the right property. "The key was to stop overthinking and start doing," Raj concludes. "We're proof that you can succeed in any market if you focus on the right things."
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
              Ready to Stop Waiting and Start Buying?
            </h2>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#ccc',
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              Contact our team of experienced professionals who can help you navigate any market conditions.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#fff',
                color: '#000',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease'
              }}>
                Get Professional Guidance
              </Link>
              <Link href="/stories" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '8px',
                border: '1px solid #fff',
                fontSize: '16px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'transform 0.2s ease'
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