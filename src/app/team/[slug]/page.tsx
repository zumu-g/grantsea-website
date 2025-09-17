'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import OncomHeader from '@/components/OncomHeader';
import Link from 'next/link';

// Agent data - in production this would come from a database or CMS
const agents = {
  'grant-smith': {
    name: 'Grant Smith',
    title: 'Principal & Licensed Estate Agent',
    phone: '0412 345 678',
    email: 'grant@grantsea.com.au',
    image: '/agents/grant-smith.jpg',
    bio: [
      "With over 20 years of experience in Melbourne's southeast property market, Grant Smith has built a reputation for exceptional service and outstanding results.",
      "As Principal of Grant's Estate Agents, Grant brings a wealth of knowledge and a personal approach to every transaction. His deep understanding of the local market, combined with innovative marketing strategies, ensures optimal outcomes for both buyers and sellers.",
      "Grant's commitment to transparency, integrity, and client satisfaction has earned him numerous industry awards and, more importantly, the trust of countless families throughout the southeast corridor."
    ],
    qualifications: [
      'Licensed Estate Agent',
      'REIV Member',
      'Certified Auctioneer',
      'Graduate of Real Estate Practice'
    ],
    specialties: [
      'Residential Sales',
      'Property Auctions',
      'Investment Properties',
      'Development Sites'
    ],
    areas: [
      'Berwick',
      'Narre Warren',
      'Hampton Park',
      'Pakenham',
      'Officer',
      'Clyde North'
    ],
    testimonials: [
      {
        text: "Grant's expertise and dedication made selling our home a seamless experience. His market knowledge is unmatched.",
        author: "Sarah & Michael P.",
        suburb: "Berwick"
      },
      {
        text: "Professional, honest, and results-driven. Grant exceeded our expectations and achieved an outstanding sale price.",
        author: "David L.",
        suburb: "Narre Warren"
      }
    ],
    stats: {
      soldProperties: '500+',
      averageDays: '21',
      clientSatisfaction: '98%',
      repeatClients: '85%'
    }
  }
};

export default function AgentBioPage() {
  const params = useParams();
  const slug = params.slug as string;
  const agent = agents[slug] || agents['grant-smith']; // Default to Grant if agent not found

  return (
    <>
      <OncomHeader />

      {/* Hero Section */}
      <div style={{
        padding: '120px 20px 60px',
        background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '60px',
          alignItems: 'start'
        }}>
          {/* Agent Photo */}
          <div style={{
            width: '320px',
            height: '400px',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            backgroundImage: agent.image ? `url(${agent.image})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: '#9ca3af',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
          }}>
            {!agent.image && agent.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* Agent Info */}
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '300',
              color: '#111111',
              marginBottom: '8px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.02em'
            }}>
              {agent.name}
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              marginBottom: '32px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              {agent.title}
            </p>

            {/* Contact Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <a
                href={`tel:${agent.phone}`}
                style={{
                  padding: '14px 32px',
                  backgroundColor: '#002b7f',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001d5c'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002b7f'}
              >
                Call {agent.phone}
              </a>
              <a
                href={`mailto:${agent.email}`}
                style={{
                  padding: '14px 32px',
                  backgroundColor: 'white',
                  color: '#002b7f',
                  border: '2px solid #002b7f',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#002b7f';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#002b7f';
                }}
              >
                Email {agent.name.split(' ')[0]}
              </a>
            </div>

            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px'
            }}>
              <div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '4px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {agent.stats.soldProperties}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  Properties Sold
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '4px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {agent.stats.averageDays}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  Average Days on Market
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '4px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {agent.stats.clientSatisfaction}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  Client Satisfaction
                </p>
              </div>
              <div>
                <p style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '4px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {agent.stats.repeatClients}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  Repeat Clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '60px'
      }}>
        {/* Left Column */}
        <div>
          {/* About Section */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '300',
              color: '#111111',
              marginBottom: '24px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              About {agent.name.split(' ')[0]}
            </h2>
            {agent.bio.map((paragraph, index) => (
              <p key={index} style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#4b5563',
                marginBottom: '20px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                {paragraph}
              </p>
            ))}
          </section>

          {/* Testimonials */}
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '300',
              color: '#111111',
              marginBottom: '24px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Client Testimonials
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {agent.testimonials.map((testimonial, index) => (
                <div key={index} style={{
                  padding: '24px',
                  backgroundColor: '#f9fafb',
                  borderLeft: '3px solid #002b7f',
                  borderRadius: '4px'
                }}>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.8',
                    color: '#4b5563',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                  }}>
                    — {testimonial.author}, {testimonial.suburb}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Qualifications */}
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#111111',
              marginBottom: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Qualifications
            </h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {agent.qualifications.map((qual, index) => (
                <li key={index} style={{
                  fontSize: '15px',
                  color: '#4b5563',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    color: '#002b7f'
                  }}>✓</span>
                  {qual}
                </li>
              ))}
            </ul>
          </section>

          {/* Specialties */}
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#111111',
              marginBottom: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Specialties
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {agent.specialties.map((specialty, index) => (
                <span key={index} style={{
                  padding: '6px 12px',
                  backgroundColor: '#eff6ff',
                  color: '#002b7f',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                }}>
                  {specialty}
                </span>
              ))}
            </div>
          </section>

          {/* Service Areas */}
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#111111',
              marginBottom: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Service Areas
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {agent.areas.map((area, index) => (
                <Link
                  key={index}
                  href={`/suburbs/${area.toLowerCase().replace(' ', '-')}`}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                    borderRadius: '4px',
                    fontSize: '14px',
                    textDecoration: 'none',
                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#002b7f';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                    e.currentTarget.style.color = '#4b5563';
                  }}
                >
                  {area}
                </Link>
              ))}
            </div>
          </section>

          {/* Contact Card */}
          <div style={{
            padding: '24px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              color: '#111111',
              marginBottom: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}>
              Get in Touch
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '4px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                Phone
              </p>
              <a href={`tel:${agent.phone}`} style={{
                fontSize: '16px',
                color: '#002b7f',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                {agent.phone}
              </a>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '4px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                Email
              </p>
              <a href={`mailto:${agent.email}`} style={{
                fontSize: '16px',
                color: '#002b7f',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                {agent.email}
              </a>
            </div>
            <button
              onClick={() => window.location.href = '/contact'}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#002b7f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#001d5c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#002b7f'}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{
        backgroundColor: '#002b7f',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        marginTop: '80px'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '300',
          marginBottom: '16px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
          Ready to achieve your property goals?
        </h2>
        <p style={{
          fontSize: '18px',
          marginBottom: '32px',
          opacity: 0.9,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}>
          Contact {agent.name.split(' ')[0]} today for expert advice and exceptional service.
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <a
            href={`tel:${agent.phone}`}
            style={{
              padding: '14px 32px',
              backgroundColor: 'white',
              color: '#002b7f',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '500'
            }}
          >
            Call Now
          </a>
          <Link
            href="/appraisal"
            style={{
              padding: '14px 32px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid white',
              borderRadius: '4px',
              textDecoration: 'none',
              fontSize: '16px',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              fontWeight: '500'
            }}
          >
            Book Free Appraisal
          </Link>
        </div>
      </div>
    </>
  );
}