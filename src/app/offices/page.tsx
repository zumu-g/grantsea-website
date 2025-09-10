import Link from 'next/link';
import './offices.css';

const offices = [
  {
    id: 1,
    name: 'Narre Warren',
    address: '123 Main Street',
    suburb: 'Narre Warren VIC 3805',
    phone: '(03) 9704 8888',
    email: 'narrewarren@grantsea.com.au',
    hours: {
      weekday: '9:00 AM - 5:30 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'By appointment'
    },
    manager: 'Sarah Thompson',
    mapUrl: 'https://maps.google.com/?q=123+Main+Street+Narre+Warren+VIC+3805'
  },
  {
    id: 2,
    name: 'Berwick',
    address: '456 High Street',
    suburb: 'Berwick VIC 3806',
    phone: '(03) 9704 9999',
    email: 'berwick@grantsea.com.au',
    hours: {
      weekday: '9:00 AM - 5:30 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'By appointment'
    },
    manager: 'Michael Chen',
    mapUrl: 'https://maps.google.com/?q=456+High+Street+Berwick+VIC+3806'
  },
  {
    id: 3,
    name: 'Pakenham',
    address: '789 Prince Highway',
    suburb: 'Pakenham VIC 3810',
    phone: '(03) 9704 7777',
    email: 'pakenham@grantsea.com.au',
    hours: {
      weekday: '9:00 AM - 5:30 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'By appointment'
    },
    manager: 'Emma Wilson',
    mapUrl: 'https://maps.google.com/?q=789+Prince+Highway+Pakenham+VIC+3810'
  }
];

export default function OfficesPage() {
  return (
    <div className="offices-page">
      {/* Hero Section */}
      <section className="offices-hero">
        <div className="container">
          <h1 className="offices-title">Our Offices</h1>
          <div className="offices-divider"></div>
          <p className="offices-subtitle">
            Three convenient locations across Casey and Cardinia, 
            ready to help you find your perfect home
          </p>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="offices-grid-section">
        <div className="container">
          <div className="offices-grid">
            {offices.map((office) => (
              <div key={office.id} className="office-card">
                {/* Office Image Placeholder */}
                <div className="office-image">
                  <div className="office-image-placeholder">
                    <span className="office-initial">
                      {office.name[0]}
                    </span>
                  </div>
                </div>

                {/* Office Details */}
                <div className="office-details">
                  <div className="office-header">
                    <h2 className="office-name">{office.name}</h2>
                    <p className="office-address">
                      {office.address}<br />
                      {office.suburb}
                    </p>
                  </div>

                  <div className="office-info">
                    {/* Contact Info */}
                    <div className="office-contact">
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="office-phone">
                        {office.phone}
                      </a>
                      <a href={`mailto:${office.email}`} className="office-email">
                        {office.email}
                      </a>
                    </div>

                    {/* Hours */}
                    <div className="office-hours">
                      <p>Mon - Fri: {office.hours.weekday}</p>
                      <p>Saturday: {office.hours.saturday}</p>
                      <p>Sunday: {office.hours.sunday}</p>
                    </div>

                    {/* Manager */}
                    <div className="office-manager">
                      <p className="manager-label">Office Manager</p>
                      <p className="manager-name">{office.manager}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="office-actions">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="office-button office-button-outline"
                    >
                      Get Directions
                    </a>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="office-button office-button-solid"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="offices-cta">
        <div className="container">
          <div className="cta-content">
            <h3 className="cta-title">Ready to find your dream home?</h3>
            <p className="cta-text">
              Visit any of our offices or get in touch online. 
              Our experienced team is here to guide you every step of the way.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="cta-button cta-button-outline">
                Contact Us
              </Link>
              <Link href="/agents" className="cta-button cta-button-solid">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Our Offices | Grant\'s Estate Agents',
  description: 'Visit our offices in Narre Warren, Berwick, and Pakenham. Find contact details, opening hours, and directions to our three convenient locations.',
};