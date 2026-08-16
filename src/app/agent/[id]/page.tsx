'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import SavePropertyButton from '@/components/SavePropertyButton';
import { useProperties } from '@/hooks/useProperties';
import { trackLead } from '@/lib/analytics';

interface Agent {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string | null;
}

export default function AgentDetailPage() {
  const params = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { properties } = useProperties({ type: 'sale', limit: 20 });
  const agentProperties = properties.filter((p: any) => p.agent?.id === params.id);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        const found = data.success ? data.agents.find((a: Agent) => a.id === params.id) : null;
        if (found) {
          setAgent(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agent) return;
    setSubmitState('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          agentName: agent.name,
          agentEmail: agent.email,
        }),
      });
      if (!res.ok) throw new Error('Delivery failed');
      trackLead('contact');
      setSubmitState('sent');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitState('error');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <OncomHeader />
        <main style={{ paddingTop: '160px', textAlign: 'center', color: '#666' }}>
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  if (notFound || !agent) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        <OncomHeader />
        <main style={{ paddingTop: '160px', textAlign: 'center', paddingBottom: '120px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '16px' }}>Agent not found</h1>
          <Link href="/agents" style={{ color: '#000', textDecoration: 'underline' }}>
            View our team
          </Link>
        </main>
        <OncomFooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{ paddingTop: isMobile ? '60px' : '80px' }}>

        {/* Hero Section */}
        <section style={{
          padding: isMobile ? '40px 24px 60px' : '60px max(2rem, 3.33vw) 100px',
          backgroundColor: '#fff'
        }}>
          <div style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '500px 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'start'
          }}>
            <div style={{
              position: 'relative',
              aspectRatio: isMobile ? '3/4' : '2/3',
              backgroundColor: '#f5f5f5',
              overflow: 'hidden',
              maxHeight: isMobile ? '500px' : '750px'
            }}>
              {agent.photo ? (
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority
                  unoptimized
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '96px', fontWeight: 300, color: '#ccc'
                }}>
                  {agent.name.charAt(0)}
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: isMobile ? '0' : '40px'
            }}>
              <p style={{
                fontSize: '12px', fontWeight: 500, color: '#666',
                textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px'
              }}>
                Property Partner
              </p>

              <h1 style={{
                fontSize: isMobile ? '42px' : '72px',
                fontWeight: 300,
                letterSpacing: '-0.03em',
                lineHeight: '1.05',
                marginBottom: '16px',
                color: '#000'
              }}>
                {agent.name}
              </h1>

              {agent.position && (
                <p style={{
                  fontSize: isMobile ? '18px' : '22px',
                  fontWeight: 300,
                  color: '#444',
                  marginBottom: '40px',
                  lineHeight: '1.4'
                }}>
                  {agent.position}
                </p>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {agent.phone && (
                  <a href={`tel:${agent.phone}`} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    color: '#000', textDecoration: 'none', fontSize: '16px'
                  }}>
                    {agent.phone}
                  </a>
                )}
                {agent.email && (
                  <a href={`mailto:${agent.email}`} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    color: '#000', textDecoration: 'none', fontSize: '16px'
                  }}>
                    {agent.email}
                  </a>
                )}
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '16px 32px', backgroundColor: '#000', color: '#fff',
                  border: 'none', fontSize: '15px', fontWeight: 500,
                  borderRadius: '500px', cursor: 'pointer', width: isMobile ? '100%' : 'auto'
                }}
              >
                Get in touch
              </button>
            </div>
          </div>
        </section>

        {/* Current Listings */}
        {agentProperties.length > 0 && (
          <section style={{ padding: isMobile ? '60px 0 60px 20px' : '100px 0 100px max(2rem, 3.33vw)' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)' }}>
              <h2 style={{ fontSize: isMobile ? '36px' : '48px', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: isMobile ? '32px' : '48px', color: '#000' }}>
                Current listings
              </h2>
            </div>
            <div style={{
              overflowX: 'auto', scrollSnapType: 'x mandatory', scrollBehavior: 'smooth',
              paddingLeft: isMobile ? '20px' : 'max(2rem, 3.33vw)', paddingRight: isMobile ? '20px' : 'max(2rem, 3.33vw)'
            }}>
              <div style={{ display: 'flex', gap: isMobile ? '16px' : '24px', paddingBottom: '16px' }}>
                {agentProperties.map((property: any) => (
                  <div key={property.id} style={{
                    position: 'relative',
                    flex: isMobile ? '0 0 85%' : '0 0 calc(33.333% - 16px)',
                    minWidth: isMobile ? '320px' : '380px',
                    backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden',
                    scrollSnapAlign: 'start', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}>
                    <Link href={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div style={{ position: 'relative', paddingTop: '100%', backgroundColor: '#fff', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: '1.5rem' }}>
                          {property.images?.[0] ? (
                            <img
                              src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                              alt={property.address}
                              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                            />
                          ) : (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '12px' }}>
                              No image
                            </div>
                          )}
                        </div>
                        <div style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
                          <SavePropertyButton property={property} />
                        </div>
                      </div>
                      <div style={{ padding: '20px' }}>
                        <p style={{ fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                          {property.suburb}
                        </p>
                        <h3 style={{ fontSize: '16px', fontWeight: 400, marginBottom: '12px', lineHeight: '1.3', color: '#000' }}>
                          {property.address?.replace(', VIC', '').replace(' VIC', '')}
                        </h3>
                        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#666', marginBottom: '12px' }}>
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.carSpaces} car</span>
                        </div>
                        <p style={{ fontSize: '16px', fontWeight: 500, color: '#000' }}>
                          {property.priceDisplay || 'Contact Agent'}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section style={{ padding: isMobile ? '80px 20px' : '120px max(2rem, 3.33vw)', textAlign: 'center' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '20px', lineHeight: '1.1' }}>
              Ready to get started?
            </h2>
            <p style={{ fontSize: '17px', color: '#666', marginBottom: '40px', lineHeight: '1.6' }}>
              Whether you're buying, selling, or curious about your property's value, {agent.name.split(' ')[0]} is here to help.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setShowContactForm(true)}
                style={{
                  padding: '18px 40px', backgroundColor: '#000', color: '#fff',
                  border: 'none', fontSize: '15px', fontWeight: 500, borderRadius: '500px', cursor: 'pointer'
                }}
              >
                Request an appraisal
              </button>
              {agent.phone && (
                <a
                  href={`tel:${agent.phone}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', padding: '18px 40px',
                    backgroundColor: '#fff', color: '#000', border: '1.5px solid #000',
                    fontSize: '15px', fontWeight: 500, borderRadius: '500px', textDecoration: 'none'
                  }}
                >
                  Call {agent.phone}
                </a>
              )}
            </div>
          </div>
        </section>

      </main>

      <OncomFooter />

      {/* Contact Form Modal */}
      {showContactForm && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px'
        }} onClick={() => setShowContactForm(false)}>
          <div style={{
            backgroundColor: '#fff', padding: isMobile ? '32px 24px' : '48px',
            maxWidth: '520px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowContactForm(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h3 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Contact {agent.name.split(' ')[0]}
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
              We'll get back to you as soon as possible
            </p>

            {submitState === 'sent' ? (
              <p style={{ fontSize: '16px', color: '#000' }}>
                Thanks — your message has been sent to {agent.name.split(' ')[0]}.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text" placeholder="Your name" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '16px', border: '1px solid #e5e5e5', fontSize: '15px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="email" placeholder="Email address" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={{ width: '100%', padding: '16px', border: '1px solid #e5e5e5', fontSize: '15px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="tel" placeholder="Phone number" value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '16px', border: '1px solid #e5e5e5', fontSize: '15px', outline: 'none' }}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <textarea
                    placeholder="Your message..." value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    style={{ width: '100%', padding: '16px', border: '1px solid #e5e5e5', fontSize: '15px', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
                  />
                </div>
                {submitState === 'error' && (
                  <p style={{ color: '#AF272F', fontSize: '14px', marginBottom: '16px' }}>
                    Something went wrong — please call {agent.phone || 'us'} instead.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitState === 'sending'}
                  style={{
                    width: '100%', padding: '18px', backgroundColor: '#000', color: '#fff',
                    border: 'none', fontSize: '15px', fontWeight: 500, cursor: 'pointer', borderRadius: '500px',
                    opacity: submitState === 'sending' ? 0.6 : 1
                  }}
                >
                  {submitState === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
