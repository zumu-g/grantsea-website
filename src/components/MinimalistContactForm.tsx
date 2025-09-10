'use client';

import { useState } from 'react';

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted:', formData);
      
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
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="minimalist-contact-form">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-title">Get in Touch</h1>
          <div className="contact-divider"></div>
          <p className="contact-subtitle">
            Whether you're buying, selling, or just have questions, we're here to help
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container">
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
  );
}