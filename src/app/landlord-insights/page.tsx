'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function LandlordInsights() {
  return (
    <>
      <OncomHeader />
      <main style={{
        paddingTop: '120px',
        backgroundColor: '#fff',
        minHeight: '100vh'
      }}>
        {/* Hero Section */}
        <section style={{
          padding: '80px 40px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '64px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              lineHeight: '1.1',
              margin: '0 0 24px 0',
              color: '#000'
            }}>
              Landlord Insights
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: '1.6'
            }}>
              Expert insights, market data, and resources to help you maximise your rental property investment.
            </p>
          </div>
        </section>

        {/* Market Insights */}
        <section style={{
          padding: '80px 40px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '60px',
              textAlign: 'center',
              color: '#000'
            }}>
              Market Insights
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '40px',
              marginBottom: '80px'
            }}>
              {/* Rental Market Update */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#000'
                }}>
                  Rental Market Update
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Southeast Melbourne continues to show strong rental demand with low vacancy rates across Berwick, Narre Warren, and surrounding suburbs.
                </p>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Average Weekly Rent</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>$580</div>
                  <div style={{ fontSize: '12px', color: '#28a745' }}>↗ 8.5% from last year</div>
                </div>
              </div>

              {/* Vacancy Rates */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#000'
                }}>
                  Vacancy Rates
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Low vacancy rates indicate strong tenant demand and minimal rental downtime for investment properties.
                </p>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Current Vacancy Rate</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>1.2%</div>
                  <div style={{ fontSize: '12px', color: '#28a745' }}>Well below state average</div>
                </div>
              </div>

              {/* Investment Performance */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '40px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#000'
                }}>
                  Investment Performance
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  Strong capital growth combined with solid rental yields make our area attractive for investors.
                </p>
                <div style={{
                  padding: '20px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Average Rental Yield</div>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#000' }}>4.2%</div>
                  <div style={{ fontSize: '12px', color: '#28a745' }}>Above regional average</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section style={{
          padding: '80px 40px',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '60px',
              textAlign: 'center',
              color: '#000'
            }}>
              Landlord Resources
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Rental Market Report
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Quarterly analysis of rental trends, vacancy rates, and market forecasts for the southeast region.
                </p>
                <Link href="/contact" style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Download Report
                </Link>
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Landlord Guide
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Essential information on tenancy laws, property maintenance, tax considerations, and investment strategies.
                </p>
                <Link href="/contact" style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Get Guide
                </Link>
              </div>

              <div style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Property Valuation
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '20px',
                  lineHeight: '1.5'
                }}>
                  Get an accurate assessment of your property's current market value and rental potential.
                </p>
                <Link href="/appraisal" style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#002b7f',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Book Appraisal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{
          padding: '80px 40px',
          backgroundColor: '#fff',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '300',
              letterSpacing: '-0.02em',
              marginBottom: '24px',
              color: '#000'
            }}>
              Ready to Maximise Your Investment?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Our property management team is here to help you achieve the best returns from your investment property.
            </p>
            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/contact" style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: '#002b7f',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Contact Our Team
              </Link>
              <Link href="/appraisal" style={{
                display: 'inline-block',
                padding: '16px 32px',
                backgroundColor: '#fff',
                color: '#002b7f',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                border: '2px solid #002b7f'
              }}>
                Get Property Appraisal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}