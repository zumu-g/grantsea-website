'use client';

import { useState } from 'react';
import OncomHeader from './OncomHeader';
import { trackLead } from '@/lib/analytics';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  propertyInterest?: string;
}

export default function MinimalistContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    propertyInterest: '',
  });
  
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          ...formData,
          website: honeypot,
          marketingConsent: marketingConsent ? 'Yes' : 'No',
        }),
      });

      if (!res.ok) {
        throw new Error(`Lead API responded ${res.status}`);
      }

      trackLead('contact');
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your inquiry. We\'ll get back to you within 24 hours.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
        propertyInterest: '',
      });
      setMarketingConsent(false);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong sending your message. Please try again, or call us on (03) 9704 8888.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <OncomHeader />
      <div className="minimalist-contact-form" style={{ paddingTop: '180px' }}>
        {/* Hero Section */}
        <section className="contact-hero" style={{
          backgroundColor: '#fff',
          paddingTop: '120px',
          paddingBottom: '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '16px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>Contact</h1>
            <p style={{
              fontSize: '18px',
              color: '#666',
              fontFamily: '"Helvetica Neue", Arial, sans-serif'
            }}>
              Whether you're buying, selling, or just have questions, we're here to help
            </p>
          </div>
        </section>

      {/* Main Content */}
      <section className="contact-content" style={{
        backgroundColor: '#fafafa',
        paddingTop: '60px',
        paddingBottom: '120px',
        paddingLeft: 'max(2rem, 3.33vw)',
        paddingRight: 'max(2rem, 3.33vw)'
      }}>
        <div style={{
          maxWidth: '1480px',
          margin: '0 auto'
        }}>
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="info-card">
                <h3 className="info-title">Contact Information</h3>
                
                <div className="info-blocks">
                  <div className="info-block">
                    <h4 className="info-label">Office Hours</h4>
                    <p>Monday - Friday: 9:00 AM - 5:30 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: By appointment only</p>
                  </div>
                  
                  <div className="info-block">
                    <h4 className="info-label">Phone</h4>
                    <p>Office: (03) 9704 8888</p>
                    <p>Mobile: 0412 345 678</p>
                  </div>
                  
                  <div className="info-block">
                    <h4 className="info-label">Email</h4>
                    <p>info@grantsea.com.au</p>
                  </div>
                  
                  <div className="info-block">
                    <h4 className="info-label">Office Locations</h4>
                    <p>Narre Warren: 123 Main Street</p>
                    <p>Berwick: 456 High Street</p>
                    <p>Pakenham: 789 Prince Highway</p>
                  </div>
                </div>

                <div className="social-section">
                  <h4 className="info-label">Follow Us</h4>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Facebook">
                      <span className="social-icon">f</span>
                    </a>
                    <a href="#" className="social-link" aria-label="LinkedIn">
                      <span className="social-icon">in</span>
                    </a>
                    <a href="#" className="social-link" aria-label="Instagram">
                      <span className="social-icon">ig</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Honeypot — hidden from humans, bots fill it and the API drops the lead */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', height: 0, width: 0, opacity: 0 }}
                />
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="buying">Buying Property</option>
                    <option value="selling">Selling Property</option>
                    <option value="leasing">Leasing/Renting</option>
                    <option value="appraisal">Property Appraisal</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="propertyInterest" className="form-label">
                    Property of Interest (if applicable)
                  </label>
                  <input
                    type="text"
                    id="propertyInterest"
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    placeholder="e.g., 45 Grandview Road, Narre Warren"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    style={{ marginTop: '3px', minWidth: '16px', minHeight: '16px' }}
                  />
                  <label htmlFor="marketingConsent" style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                    Keep me informed with market updates, new listings and property insights
                    from Grant&apos;s Estate Agents, in line with our Privacy Policy.
                  </label>
                </div>

                {submitStatus.type && (
                  <div className={`form-alert form-alert-${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="form-submit"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <p className="form-disclaimer">
                By submitting this form, you agree to our{' '}
                <a href="#" className="form-link">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}