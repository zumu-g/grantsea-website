import React from 'react';
import './help.css';

export const metadata = {
  title: 'Help & Support - Grants Estate Agents',
  description: 'Get help with buying, selling, or renting properties. Find answers to common questions and contact our support team.',
};

export default function HelpPage() {
  return (
    <main className="help-container">
      <div className="help-header">
        <h1>Help & Support</h1>
        <p className="help-subtitle">We're here to help you with all your property needs</p>
      </div>

      <div className="help-search">
        <input 
          type="text" 
          placeholder="Search for help..." 
          className="help-search-input"
        />
      </div>

      <div className="help-categories">
        <div className="help-category-grid">
          <div className="help-category-card">
            <div className="help-icon">🏠</div>
            <h3>Buying Property</h3>
            <p>Everything you need to know about purchasing your dream home</p>
            <ul>
              <li><a href="#first-time-buyer">First-time buyer guide</a></li>
              <li><a href="#mortgage">Understanding mortgages</a></li>
              <li><a href="#inspection">Property inspections</a></li>
              <li><a href="#offers">Making an offer</a></li>
            </ul>
          </div>

          <div className="help-category-card">
            <div className="help-icon">💰</div>
            <h3>Selling Property</h3>
            <p>Get the best value for your property with our expert guidance</p>
            <ul>
              <li><a href="#valuation">Property valuation</a></li>
              <li><a href="#marketing">Marketing your property</a></li>
              <li><a href="#viewings">Managing viewings</a></li>
              <li><a href="#negotiation">Price negotiation</a></li>
            </ul>
          </div>

          <div className="help-category-card">
            <div className="help-icon">🔑</div>
            <h3>Renting & Leasing</h3>
            <p>Find the perfect rental or lease out your property</p>
            <ul>
              <li><a href="#tenant-guide">Tenant guide</a></li>
              <li><a href="#landlord-guide">Landlord services</a></li>
              <li><a href="#lease-agreement">Lease agreements</a></li>
              <li><a href="#maintenance">Property maintenance</a></li>
            </ul>
          </div>

          <div className="help-category-card">
            <div className="help-icon">👤</div>
            <h3>Your Account</h3>
            <p>Manage your saved properties and search preferences</p>
            <ul>
              <li><a href="#saved-properties">Saved properties</a></li>
              <li><a href="#search-alerts">Search alerts</a></li>
              <li><a href="#profile">Update profile</a></li>
              <li><a href="#privacy">Privacy settings</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="help-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>How do I schedule a property viewing?</summary>
            <p>You can schedule a viewing by clicking the "Book Viewing" button on any property listing, or by contacting the listing agent directly through the contact details provided.</p>
          </details>
          
          <details className="faq-item">
            <summary>What documents do I need to buy a property?</summary>
            <p>Essential documents include proof of identity, proof of income, bank statements, mortgage pre-approval, and any additional documents requested by your solicitor.</p>
          </details>
          
          <details className="faq-item">
            <summary>How is property valuation calculated?</summary>
            <p>Property valuations consider location, size, condition, recent sales in the area, market trends, and unique features. Our experienced agents provide free market appraisals.</p>
          </details>
          
          <details className="faq-item">
            <summary>What fees are involved in selling a property?</summary>
            <p>Typical fees include agent commission, solicitor fees, marketing costs, and potential capital gains tax. We provide a full breakdown during your initial consultation.</p>
          </details>
          
          <details className="faq-item">
            <summary>Can I save properties to view later?</summary>
            <p>Yes! Click the heart icon on any property to save it to your favorites. Access your saved properties anytime from the heart icon in the navigation menu.</p>
          </details>
        </div>
      </div>

      <div className="help-contact">
        <h2>Still Need Help?</h2>
        <p>Our support team is ready to assist you</p>
        
        <div className="contact-options">
          <div className="contact-card">
            <h3>📞 Call Us</h3>
            <p>Speak to our support team</p>
            <a href="tel:1300123456" className="contact-button">1300 123 456</a>
            <p className="contact-hours">Mon-Fri 9am-5pm, Sat 9am-12pm</p>
          </div>
          
          <div className="contact-card">
            <h3>✉️ Email Support</h3>
            <p>Get a response within 24 hours</p>
            <a href="mailto:support@grantsea.com.au" className="contact-button">support@grantsea.com.au</a>
          </div>
          
          <div className="contact-card">
            <h3>💬 Live Chat</h3>
            <p>Chat with an agent now</p>
            <button className="contact-button">Start Chat</button>
            <p className="contact-hours">Available during business hours</p>
          </div>
        </div>
      </div>

      <div className="help-resources">
        <h2>Helpful Resources</h2>
        <div className="resource-links">
          <a href="/buy" className="resource-link">
            <span>Buyer's Guide →</span>
          </a>
          <a href="/sell" className="resource-link">
            <span>Seller's Guide →</span>
          </a>
          <a href="/rent" className="resource-link">
            <span>Renter's Guide →</span>
          </a>
          <a href="/offices" className="resource-link">
            <span>Visit Our Offices →</span>
          </a>
        </div>
      </div>
    </main>
  );
}