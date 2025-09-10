'use client';

import { useState } from 'react';
import Link from 'next/link';
import './careers.css';

const positions = [
  {
    id: 1,
    title: 'Senior Sales Agent',
    location: 'Berwick Office',
    type: 'Full Time',
    description: 'We are seeking an experienced sales agent to join our growing Berwick team. The ideal candidate will have 5+ years in residential sales.'
  },
  {
    id: 2,
    title: 'Property Manager',
    location: 'Narre Warren Office',
    type: 'Full Time',
    description: 'Manage a portfolio of residential properties with our supportive team. Experience in property management systems required.'
  },
  {
    id: 3,
    title: 'Marketing Coordinator',
    location: 'All Offices',
    type: 'Part Time',
    description: 'Support our marketing team with digital campaigns, property presentations, and brand initiatives. Creative mindset essential.'
  }
];

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null
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
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your application. We will be in touch soon.'
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
        resume: null
      });
    }, 1500);
  };

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
            Careers
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
            Join Melbourne\'s most innovative real estate team and build your career with industry leaders
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section style={{ paddingBottom: '80px', padding: '0 16px 80px 16px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '300',
            color: '#000',
            marginBottom: '64px',
            textAlign: 'center',
            letterSpacing: '-1px'
          }}>
            Why Grants?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { 
                title: 'Growth', 
                desc: 'Continuous professional development with industry-leading training programs',
                icon: '📈'
              },
              { 
                title: 'Culture', 
                desc: 'Supportive team environment that celebrates success and innovation',
                icon: '🤝'
              },
              { 
                title: 'Rewards', 
                desc: 'Competitive commission structure and performance-based incentives',
                icon: '💎'
              },
              { 
                title: 'Technology', 
                desc: 'Cutting-edge tools and systems to maximize your productivity',
                icon: '💻'
              }
            ].map((benefit, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '24px',
                  opacity: 0.8
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '400',
                  color: '#000',
                  marginBottom: '16px'
                }}>
                  {benefit.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section style={{ 
        backgroundColor: '#fafafa',
        padding: '80px 16px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#000',
            marginBottom: '48px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>
            Current Opportunities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {positions.map((position) => (
              <div
                key={position.id}
                className="position-card"
                style={{
                  backgroundColor: '#fff',
                  padding: '32px',
                  borderLeft: '2px solid #000',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '400',
                      color: '#000',
                      marginBottom: '8px'
                    }}>
                      {position.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '300'
                    }}>
                      {position.location} • {position.type}
                    </p>
                  </div>
                  <a
                    href="#apply"
                    className="apply-link"
                    style={{
                      padding: '8px 24px',
                      border: '1px solid #000',
                      color: '#000',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Apply Now
                  </a>
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '300',
                  lineHeight: '1.6'
                }}>
                  {position.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" style={{ padding: '80px 16px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '300',
            color: '#000',
            marginBottom: '16px',
            textAlign: 'center',
            letterSpacing: '-0.5px'
          }}>
            Start Your Journey
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666',
            fontWeight: '300',
            textAlign: 'center',
            marginBottom: '48px',
            lineHeight: '1.6'
          }}>
            Submit your application and we will be in touch within 48 hours
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px',
                  fontWeight: '300'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderBottom: '1px solid #e0e0e0',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: 'transparent'
                  }}
                  className="form-input"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px',
                  fontWeight: '300'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderBottom: '1px solid #e0e0e0',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: 'transparent'
                  }}
                  className="form-input"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px',
                  fontWeight: '300'
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderBottom: '1px solid #e0e0e0',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: 'transparent'
                  }}
                  className="form-input"
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '8px',
                  fontWeight: '300'
                }}>
                  Position of Interest *
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderBottom: '1px solid #e0e0e0',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    backgroundColor: 'transparent',
                    cursor: 'pointer'
                  }}
                  className="form-input"
                >
                  <option value="">Select Position</option>
                  {positions.map(pos => (
                    <option key={pos.id} value={pos.title}>
                      {pos.title}
                    </option>
                  ))}
                  <option value="general">General Application</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#666',
                marginBottom: '8px',
                fontWeight: '300'
              }}>
                Years of Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderBottom: '1px solid #e0e0e0',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
                className="form-input"
              >
                <option value="">Select Experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                color: '#666',
                marginBottom: '8px',
                fontWeight: '300'
              }}>
                Tell us about yourself *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderBottom: '1px solid #e0e0e0',
                  border: 'none',
                  borderBottom: '1px solid #e0e0e0',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s ease',
                  backgroundColor: 'transparent',
                  resize: 'vertical',
                  minHeight: '100px'
                }}
                placeholder="Why do you want to join Grants Estate Agents?"
                className="form-input"
              />
            </div>

            <div style={{
              padding: '24px',
              border: '1px dashed #e0e0e0',
              textAlign: 'center',
              marginTop: '16px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '8px'
              }}>
                Upload Resume (PDF or DOCX)
              </p>
              <input
                type="file"
                accept=".pdf,.docx"
                style={{
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer'
                }}
              />
            </div>

            {submitStatus.type && (
              <div style={{
                padding: '16px',
                backgroundColor: submitStatus.type === 'success' ? '#f0f9ff' : '#fef2f2',
                color: submitStatus.type === 'success' ? '#0369a1' : '#dc2626',
                fontSize: '14px',
                textAlign: 'center'
              }}>
                {submitStatus.message}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '16px',
              marginTop: '32px'
            }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
                style={{
                  flex: 1,
                  padding: '14px 32px',
                  backgroundColor: isSubmitting ? '#666' : '#000',
                  color: '#fff',
                  fontSize: '14px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

            <p style={{
              fontSize: '12px',
              color: '#999',
              textAlign: 'center',
              marginTop: '16px'
            }}>
              By submitting this form, you agree to our privacy policy and consent to be contacted regarding employment opportunities.
            </p>
          </form>
        </div>
      </section>

    </div>
  );
}

export const metadata = {
  title: 'Careers | Grants Estate Agents',
  description: 'Join our growing team of real estate professionals. Explore career opportunities at Grants Estate Agents.',
};