import Link from 'next/link';

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
    <div className="min-h-screen bg-white" style={{ fontFamily: '"On-Regular", Helvetica, Arial, sans-serif' }}>
      {/* Hero Section - Minimal with lots of white space */}
      <section className="relative" style={{ paddingTop: '128px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '300', 
            color: '#000',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}>
            Our Offices
          </h1>
          <div style={{ 
            width: '96px', 
            height: '2px', 
            backgroundColor: '#000', 
            margin: '0 auto 32px auto' 
          }}></div>
          <p style={{ 
            fontSize: '18px', 
            color: '#666',
            maxWidth: '640px',
            margin: '0 auto',
            fontWeight: '300',
            lineHeight: '1.6'
          }}>
            Three convenient locations across Casey and Cardinia, 
            ready to help you find your perfect home
          </p>
        </div>
      </section>

      {/* Offices Grid - Minimalist cards */}
      <section style={{ paddingBottom: '128px', padding: '0 16px 128px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '64px'
          }}>
            {offices.map((office) => (
              <div key={office.id} className="office-card">
                {/* Office Image Placeholder - Minimalist style */}
                <div style={{ 
                  height: '256px', 
                  marginBottom: '32px',
                  backgroundColor: '#f5f5f5',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0'
                  }}>
                    <span style={{
                      fontSize: '96px',
                      fontWeight: '200',
                      color: '#ccc'
                    }}>
                      {office.name[0]}
                    </span>
                  </div>
                </div>

                {/* Office Details - Clean typography */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h2 style={{ 
                      fontSize: '36px', 
                      fontWeight: '300',
                      color: '#000',
                      marginBottom: '8px',
                      letterSpacing: '-0.5px'
                    }}>
                      {office.name}
                    </h2>
                    <p style={{ 
                      color: '#666',
                      fontWeight: '300',
                      fontSize: '16px',
                      lineHeight: '1.6'
                    }}>
                      {office.address}<br />
                      {office.suburb}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Contact Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <a 
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        style={{
                          color: '#000',
                          textDecoration: 'none',
                          fontSize: '18px',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
                      >
                        {office.phone}
                      </a>
                      <a 
                        href={`mailto:${office.email}`}
                        style={{
                          color: '#000',
                          textDecoration: 'none',
                          fontSize: '14px',
                          transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#666'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#000'}
                      >
                        {office.email}
                      </a>
                    </div>

                    {/* Hours - Minimal presentation */}
                    <div style={{ 
                      paddingTop: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      fontSize: '14px'
                    }}>
                      <p style={{ color: '#666' }}>
                        Mon - Fri: {office.hours.weekday}
                      </p>
                      <p style={{ color: '#666' }}>
                        Saturday: {office.hours.saturday}
                      </p>
                      <p style={{ color: '#666' }}>
                        Sunday: {office.hours.sunday}
                      </p>
                    </div>

                    {/* Manager */}
                    <div style={{ 
                      paddingTop: '16px',
                      borderTop: '1px solid #e5e5e5'
                    }}>
                      <p style={{ 
                        fontSize: '14px',
                        color: '#666',
                        marginBottom: '4px'
                      }}>
                        Office Manager
                      </p>
                      <p style={{ 
                        color: '#000',
                        fontWeight: '500',
                        fontSize: '16px'
                      }}>
                        {office.manager}
                      </p>
                    </div>
                  </div>

                  {/* Actions - Minimalist buttons */}
                  <div style={{ 
                    display: 'flex',
                    gap: '16px',
                    paddingTop: '16px'
                  }}>
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="office-button office-button-outline"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid #000',
                        color: '#000',
                        textAlign: 'center',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        display: 'block'
                      }}
                    >
                      Get Directions
                    </a>
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="office-button office-button-solid"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        backgroundColor: '#000',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'background-color 0.3s ease',
                        display: 'block'
                      }}
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

      {/* Bottom CTA Section - Minimal design */}
      <section style={{ borderTop: '1px solid #e5e5e5' }}>
        <div style={{ 
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 16px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto' }}>
            <h3 style={{ 
              fontSize: '36px',
              fontWeight: '300',
              color: '#000',
              marginBottom: '24px',
              letterSpacing: '-0.5px'
            }}>
              Ready to find your dream home?
            </h3>
            <p style={{ 
              color: '#666',
              marginBottom: '40px',
              fontWeight: '300',
              fontSize: '16px',
              lineHeight: '1.6'
            }}>
              Visit any of our offices or get in touch online. 
              Our experienced team is here to guide you every step of the way.
            </p>
            <div style={{ 
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <span
                  className="cta-button cta-button-outline"
                  style={{
                    display: 'inline-block',
                    padding: '12px 32px',
                    border: '1px solid #000',
                    color: '#000',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  Contact Us
                </span>
              </Link>
              <Link href="/agents" style={{ textDecoration: 'none' }}>
                <span
                  className="cta-button cta-button-solid"
                  style={{
                    display: 'inline-block',
                    padding: '12px 32px',
                    backgroundColor: '#000',
                    color: '#fff',
                    fontSize: '14px',
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  Meet Our Team
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for hover effects */}
      <style jsx>{`
        .office-button-outline:hover {
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .office-button-solid:hover {
          background-color: #333 !important;
        }
        
        .cta-button-outline:hover {
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .cta-button-solid:hover {
          background-color: #333 !important;
        }
        
        .office-card:hover > div:first-child {
          transform: scale(1.02);
        }
        
        @media (max-width: 768px) {
          h1 {
            font-size: 48px !important;
          }
          
          .office-card {
            margin-bottom: 32px;
          }
        }
      `}</style>
    </div>
  );
}

export const metadata = {
  title: 'Our Offices | Grant\'s Estate Agents',
  description: 'Visit our offices in Narre Warren, Berwick, and Pakenham. Find contact details, opening hours, and directions to our three convenient locations.',
};