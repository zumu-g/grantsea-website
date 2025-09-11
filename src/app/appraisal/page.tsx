'use client';

import React, { useState } from 'react';
import './appraisal.css';

export default function AppraisalPage() {
  const [formData, setFormData] = useState({
    propertyType: '',
    address: '',
    suburb: '',
    postcode: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    landSize: '',
    propertyCondition: '',
    sellingTimeframe: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredContact: 'email',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Appraisal request submitted:', formData);
    // TODO: Implement API submission
    alert('Thank you for your appraisal request. Our team will contact you within 24 hours.');
  };

  return (
    <main style={{ width: '100%', minHeight: '100vh' }}>
      <div className="appraisal-container">
      <div className="appraisal-header">
        <h1>Request a Free Property Appraisal</h1>
        <p className="appraisal-subtitle">Get an accurate market valuation from our expert agents</p>
      </div>

      <div className="appraisal-benefits">
        <div className="benefit-grid">
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="7" y1="13" x2="7" y2="18"></line>
                <line x1="12" y1="9" x2="12" y2="18"></line>
                <line x1="17" y1="11" x2="17" y2="18"></line>
              </svg>
            </div>
            <h3>Market Analysis</h3>
            <p>Comprehensive analysis of recent sales in your area</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15l-8 5V5a2 2 0 012-2h12a2 2 0 012 2v15l-8-5z"></path>
                <path d="M12 4v11"></path>
              </svg>
            </div>
            <h3>Expert Agents</h3>
            <p>Local knowledge from experienced professionals</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21h6"></path>
                <path d="M9 18h6"></path>
                <path d="M10 2v4"></path>
                <path d="M14 2v4"></path>
                <path d="M12 18v-7"></path>
                <path d="M12 11V6a4 4 0 10-8 0c0 3 2.5 5.5 5.5 6.5"></path>
                <path d="M12 6a4 4 0 118 0c0 3-2.5 5.5-5.5 6.5"></path>
              </svg>
            </div>
            <h3>Selling Strategy</h3>
            <p>Tailored advice to maximize your property value</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3>Free Service</h3>
            <p>No cost, no obligation property appraisal</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="appraisal-form">
        <div className="form-section">
          <h2>Property Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="propertyType">Property Type</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="townhouse">Townhouse</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="address">Property Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="suburb">Suburb</label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                value={formData.suburb}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                pattern="[0-9]{4}"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms</label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="studio">Studio</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="parking">Parking Spaces</label>
              <select
                id="parking"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="0">None</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3+">3+</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="landSize">Land Size (m²)</label>
              <input
                type="text"
                id="landSize"
                name="landSize"
                value={formData.landSize}
                onChange={handleChange}
                placeholder="e.g. 450"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="propertyCondition">Property Condition</label>
              <select
                id="propertyCondition"
                name="propertyCondition"
                value={formData.propertyCondition}
                onChange={handleChange}
                required
              >
                <option value="">Select condition</option>
                <option value="excellent">Excellent - Recently renovated</option>
                <option value="good">Good - Well maintained</option>
                <option value="fair">Fair - Some updates needed</option>
                <option value="poor">Poor - Requires renovation</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="sellingTimeframe">When are you looking to sell?</label>
              <select
                id="sellingTimeframe"
                name="sellingTimeframe"
                value={formData.sellingTimeframe}
                onChange={handleChange}
                required
              >
                <option value="">Select timeframe</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3months">Within 1-3 months</option>
                <option value="3-6months">Within 3-6 months</option>
                <option value="6-12months">Within 6-12 months</option>
                <option value="justlooking">Just exploring options</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Your Contact Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Preferred Contact Method</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                  />
                  Email
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                  />
                  Phone
                </label>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="additionalInfo">Additional Information (Optional)</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about any special features, recent renovations, or specific questions you have..."
              />
            </div>
          </div>
        </div>

        <div className="form-submit">
          <button type="submit" className="submit-button">
            Request Free Appraisal
          </button>
          <p className="form-disclaimer">
            By submitting this form, you agree to our privacy policy and consent to being contacted by our agents.
          </p>
        </div>
      </form>

      <div className="appraisal-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>How accurate are property appraisals?</summary>
            <p>Our appraisals are based on comprehensive market data, recent sales in your area, and our agents' local expertise. While market conditions can change, we provide realistic valuations to help you make informed decisions.</p>
          </details>
          
          <details className="faq-item">
            <summary>Is the appraisal really free?</summary>
            <p>Yes, our property appraisals are completely free with no obligation. We provide this service to help property owners understand their property's market value.</p>
          </details>
          
          <details className="faq-item">
            <summary>How long does an appraisal take?</summary>
            <p>The property inspection typically takes 20-30 minutes. You'll receive your detailed appraisal report within 24-48 hours.</p>
          </details>
          
          <details className="faq-item">
            <summary>What if I'm not ready to sell yet?</summary>
            <p>No problem! Many property owners get appraisals to understand their property value for financial planning. There's no pressure to sell.</p>
          </details>
        </div>
      </div>

      <div className="appraisal-testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>"The appraisal was thorough and professional. It helped us understand our property's true market value."</p>
            <cite>- Sarah M., Homeowner</cite>
          </div>
          <div className="testimonial-card">
            <p>"Grant's agents provided valuable insights about the local market that we hadn't considered."</p>
            <cite>- Michael T., Property Investor</cite>
          </div>
          <div className="testimonial-card">
            <p>"Free, fast, and no pressure. Exactly what we needed to plan our next move."</p>
            <cite>- Lisa & John R., Sellers</cite>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}