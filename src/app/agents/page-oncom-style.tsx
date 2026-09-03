'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

interface Agent {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string | null;
}

export default function AgentsPageOncom() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAgents(data.agents);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '80px' : '120px',
        minHeight: '100vh',
        backgroundColor: '#fff'
      }}>

        {/* Hero Section */}
        <section style={{
          minHeight: isMobile ? '40vh' : '50vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 20px' : '80px max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: isMobile ? '48px' : isTablet ? '72px' : '96px',
              fontWeight: '800',
              letterSpacing: '-0.03em',
              lineHeight: '0.95',
              margin: '0 0 24px 0',
              color: '#000',
              fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              Meet our<br />
              team
            </h1>
            <p style={{
              fontSize: isMobile ? '18px' : '24px',
              color: '#666',
              maxWidth: '600px',
              margin: '0',
              lineHeight: '1.4',
              fontWeight: '400'
            }}>
              Local experts serving Melbourne's south-east
            </p>
          </div>
        </section>

        {/* Agents Grid */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {loading && (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
                <p style={{ fontSize: '18px' }}>Loading our team...</p>
              </div>
            )}

            {!loading && error && (
              <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
                <p style={{ fontSize: '18px', marginBottom: '16px' }}>
                  We couldn't load the team right now.
                </p>
                <a href="tel:0397075555" style={{ color: '#000', fontWeight: 600 }}>
                  Call us on 03 9707 5555
                </a>
              </div>
            )}

            {!loading && !error && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: isMobile ? '48px' : '40px'
              }}>
                {agents.map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/agent/${agent.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={() => setHoveredAgent(agent.id)}
                    onMouseLeave={() => setHoveredAgent(null)}
                  >
                    {/* Agent Photo */}
                    <div style={{
                      aspectRatio: '4/5',
                      backgroundColor: '#f8f8f8',
                      marginBottom: '24px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      position: 'relative'
                    }}>
                      {agent.photo ? (
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            transform: hoveredAgent === agent.id ? 'scale(1.05)' : 'scale(1)'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: agent.photo ? 'none' : 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '72px',
                        fontWeight: '300',
                        color: '#ccc',
                        backgroundColor: '#f0f0f0',
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}>
                        {agent.name.charAt(0)}
                      </div>
                    </div>

                    {/* Agent Info */}
                    <div>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        margin: '0 0 8px 0',
                        color: '#000',
                        letterSpacing: '-0.01em'
                      }}>
                        {agent.name}
                      </h3>

                      {agent.position && (
                        <p style={{
                          fontSize: '14px',
                          color: '#666',
                          margin: '0 0 20px 0'
                        }}>
                          {agent.position}
                        </p>
                      )}

                      {/* Contact Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '12px'
                      }}>
                        {agent.phone && (
                          <a
                            href={`tel:${agent.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              flex: 1,
                              padding: '14px',
                              backgroundColor: '#000',
                              color: '#fff',
                              textDecoration: 'none',
                              textAlign: 'center',
                              fontSize: '14px',
                              fontWeight: '600',
                              borderRadius: '4px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#333';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#000';
                            }}
                          >
                            Call
                          </a>
                        )}
                        {agent.email && (
                          <a
                            href={`mailto:${agent.email}`}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              flex: 1,
                              padding: '14px',
                              backgroundColor: 'transparent',
                              color: '#000',
                              textDecoration: 'none',
                              textAlign: 'center',
                              fontSize: '14px',
                              fontWeight: '600',
                              border: '1px solid #e5e5e5',
                              borderRadius: '4px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#000';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e5e5e5';
                            }}
                          >
                            Email
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!loading && !error && agents.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                color: '#666'
              }}>
                <p style={{ fontSize: '18px' }}>No agents found.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: isMobile ? '60px 20px' : '96px max(2rem, 3.33vw)',
          backgroundColor: '#f8f8f8'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#000',
              letterSpacing: '-0.02em'
            }}>
              Ready to get started?
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Whether you're buying, selling, or renting, our team is here to help you navigate the market with confidence.
            </p>
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                href="/appraisal"
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
                Get a free appraisal
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#000',
                  textDecoration: 'none',
                  borderRadius: '32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: '1px solid #e5e5e5',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
