import Link from 'next/link';
import './team.css';

const teamMembers = [
  {
    id: 1,
    name: 'Grant McGrath',
    role: 'Principal & Founder',
    office: 'All Offices',
    experience: '25+ years',
    specialties: ['Residential Sales', 'Development Sites', 'Investment Properties'],
    email: 'grant@grantsea.com.au',
    phone: '0412 345 678',
    bio: 'With over 25 years in real estate, Grant founded Grant\'s Estate Agents with a vision to provide exceptional service to the Casey and Cardinia communities.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=960&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    role: 'Office Manager',
    office: 'Narre Warren',
    experience: '15 years',
    specialties: ['First Home Buyers', 'Family Homes', 'Customer Service'],
    email: 'sarah@grantsea.com.au',
    phone: '0423 456 789',
    bio: 'Sarah brings extensive knowledge of the local market and a passion for helping families find their perfect home.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=960&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Senior Sales Agent',
    office: 'Berwick',
    experience: '12 years',
    specialties: ['Luxury Properties', 'Negotiations', 'Market Analysis'],
    email: 'michael@grantsea.com.au',
    phone: '0434 567 890',
    bio: 'Michael\'s expertise in luxury properties and strong negotiation skills consistently deliver outstanding results for clients.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=960&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'Property Manager',
    office: 'Pakenham',
    experience: '8 years',
    specialties: ['Property Management', 'Tenant Relations', 'Investment Advisory'],
    email: 'emma@grantsea.com.au',
    phone: '0445 678 901',
    bio: 'Emma specializes in property management, ensuring landlords and tenants receive professional, efficient service.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=960&fit=crop&q=80'
  },
  {
    id: 5,
    name: 'David Martinez',
    role: 'Sales Agent',
    office: 'Narre Warren',
    experience: '6 years',
    specialties: ['New Developments', 'Off-Plan Sales', 'First Home Buyers'],
    email: 'david@grantsea.com.au',
    phone: '0456 789 012',
    bio: 'David\'s enthusiasm and knowledge of new developments make him the go-to agent for off-plan properties.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=960&fit=crop&q=80'
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    role: 'Marketing Manager',
    office: 'All Offices',
    experience: '10 years',
    specialties: ['Digital Marketing', 'Property Presentation', 'Brand Strategy'],
    email: 'lisa@grantsea.com.au',
    phone: '0467 890 123',
    bio: 'Lisa ensures every property receives maximum exposure through innovative marketing strategies.',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800&h=960&fit=crop&q=80'
  }
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '"On-Regular", Helvetica, Arial, sans-serif' }}>
      {/* Hero Section - Minimal with lots of white space */}
      <section className="relative" style={{ paddingTop: '128px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: '300', 
            color: '#000',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}>
            Our Team
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
            Meet the dedicated professionals who make your real estate journey seamless and successful
          </p>
        </div>
      </section>

      {/* Team Grid - Minimalist cards */}
      <section style={{ paddingLeft: 'max(2rem, 3.33vw)', paddingRight: 'max(2rem, 3.33vw)', paddingBottom: '128px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '80px 64px'
          }}>
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-card" style={{ maxWidth: '420px' }}>
                {/* Member Photo - Professional headshot */}
                <div style={{ 
                  paddingBottom: '120%',
                  marginBottom: '32px',
                  backgroundColor: '#f5f5f5',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={member.image}
                    alt={member.name}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%)';
                    }}
                  />
                </div>

                {/* Member Details - Clean typography */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Name and Role */}
                  <div>
                    <h2 style={{ 
                      fontSize: '32px', 
                      fontWeight: '400',
                      color: '#000',
                      marginBottom: '4px',
                      letterSpacing: '-0.5px'
                    }}>
                      {member.name}
                    </h2>
                    <p style={{ 
                      color: '#666',
                      fontWeight: '300',
                      fontSize: '16px',
                      marginBottom: '8px'
                    }}>
                      {member.role}
                    </p>
                    <p style={{ 
                      color: '#999',
                      fontWeight: '300',
                      fontSize: '14px'
                    }}>
                      {member.office} • {member.experience}
                    </p>
                  </div>

                  {/* Bio */}
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#666',
                    fontWeight: '300'
                  }}>
                    {member.bio}
                  </p>

                  {/* Specialties */}
                  <div>
                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                      marginBottom: '8px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Specialties
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {member.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          style={{
                            fontSize: '12px',
                            padding: '4px 12px',
                            border: '1px solid #e0e0e0',
                            color: '#666'
                          }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div style={{ 
                    paddingTop: '16px',
                    borderTop: '1px solid #e5e5e5',
                    display: 'flex',
                    gap: '16px'
                  }}>
                    <a
                      href={`mailto:${member.email}`}
                      className="contact-button"
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
                      Email
                    </a>
                    <a
                      href={`tel:${member.phone.replace(/\s/g, '')}`}
                      className="contact-button-solid"
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
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Minimalist design */}
      <section style={{ 
        borderTop: '1px solid #e5e5e5',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: 'max(2rem, 3.33vw)',
        paddingRight: 'max(2rem, 3.33vw)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h3 style={{ 
            fontSize: '36px',
            fontWeight: '300',
            color: '#000',
            marginBottom: '48px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>
            Our Values
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { title: 'Integrity', desc: 'Honest, transparent dealings in every transaction' },
              { title: 'Excellence', desc: 'Exceeding expectations with premium service' },
              { title: 'Community', desc: 'Deep roots and commitment to local areas' }
            ].map((value, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {value.title}
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section style={{ 
        backgroundColor: '#fafafa',
        paddingTop: '80px',
        paddingBottom: '80px',
        paddingLeft: 'max(2rem, 3.33vw)',
        paddingRight: 'max(2rem, 3.33vw)'
      }}>
        <div style={{ 
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '36px',
            fontWeight: '300',
            color: '#000',
            marginBottom: '24px',
            letterSpacing: '-0.5px'
          }}>
            Join Our Growing Team
          </h3>
          <p style={{ 
            color: '#666',
            marginBottom: '40px',
            fontWeight: '300',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            We're always looking for talented individuals who share our passion for real estate excellence
          </p>
          <Link href="/careers" style={{ textDecoration: 'none' }}>
            <span
              className="careers-button"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '14px',
                transition: 'background-color 0.3s ease',
                cursor: 'pointer'
              }}
            >
              View Career Opportunities
            </span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export const metadata = {
  title: 'Our Team | Grant\'s Estate Agents',
  description: 'Meet our experienced team of real estate professionals. Dedicated to providing exceptional service in Casey and Cardinia.',
};