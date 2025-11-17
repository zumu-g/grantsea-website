'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { motion } from 'framer-motion';

export default function ReportMaintenancePage() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const contactOptions = [
    {
      id: 'text',
      title: 'Text',
      icon: '💬',
      description: 'Send a text message to report maintenance',
      action: 'sms:0438100545',
      buttonText: 'Send Text Message',
      details: '0438 100 545'
    },
    {
      id: 'call',
      title: 'Call',
      icon: '📞',
      description: 'Call our maintenance team directly',
      action: 'tel:0438100545',
      buttonText: 'Call Now',
      details: '0438 100 545'
    },
    {
      id: 'email',
      title: 'Email',
      icon: '✉️',
      description: 'Send an email with maintenance details',
      action: 'mailto:maintenance@grantsea.com.au?subject=Maintenance Request',
      buttonText: 'Send Email',
      details: 'maintenance@grantsea.com.au'
    }
  ];

  return (
    <>
      <OncomHeader />
      
      <main style={{ 
        paddingTop: isMobile ? '90px' : '200px',
        minHeight: '100vh',
        backgroundColor: '#FAFAFA'
      }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: isMobile ? '40px' : '80px',
          paddingBottom: isMobile ? '40px' : '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '36px' : '56px',
                fontWeight: '300',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif'
              }}>
              Report Maintenance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: isMobile ? '16px' : '20px',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
              Choose how you'd like to report your maintenance issue. Our team is here to help resolve your concerns quickly.
            </motion.p>
          </div>
        </section>

        {/* Contact Options */}
        <section style={{
          paddingTop: isMobile ? '40px' : '80px',
          paddingBottom: isMobile ? '60px' : '120px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '24px' : '32px'
          }}>
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #F0F0F0',
                  borderRadius: '8px',
                  padding: isMobile ? '32px 24px' : '48px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  fontSize: '64px',
                  marginBottom: '24px'
                }}>
                  {option.icon}
                </div>
                
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000',
                  letterSpacing: '-0.01em'
                }}>
                  {option.title}
                </h2>
                
                <p style={{
                  fontSize: '16px',
                  color: '#666',
                  marginBottom: '24px',
                  lineHeight: '1.5'
                }}>
                  {option.description}
                </p>
                
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#002b7f',
                  marginBottom: '32px'
                }}>
                  {option.details}
                </div>
                
                <a
                  href={option.action}
                  style={{
                    display: 'inline-block',
                    padding: '16px 32px',
                    backgroundColor: '#002b7f',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#001d5c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#002b7f';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {option.buttonText}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0',
          paddingTop: isMobile ? '60px' : '80px',
          paddingBottom: isMobile ? '60px' : '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h3 style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '600',
              marginBottom: '32px',
              textAlign: 'center',
              color: '#000'
            }}>
              What to Include in Your Maintenance Request
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '24px'
            }}>
              <div style={{
                padding: '24px',
                backgroundColor: '#F8F8F8',
                borderRadius: '8px'
              }}>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Essential Information
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  lineHeight: '1.8',
                  color: '#666'
                }}>
                  <li>✓ Your full name and contact details</li>
                  <li>✓ Property address</li>
                  <li>✓ Description of the issue</li>
                  <li>✓ How long the issue has been occurring</li>
                  <li>✓ Any safety concerns</li>
                </ul>
              </div>
              
              <div style={{
                padding: '24px',
                backgroundColor: '#F8F8F8',
                borderRadius: '8px'
              }}>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#000'
                }}>
                  Helpful Additions
                </h4>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  lineHeight: '1.8',
                  color: '#666'
                }}>
                  <li>✓ Photos of the issue</li>
                  <li>✓ Best times for inspection</li>
                  <li>✓ Access instructions if needed</li>
                  <li>✓ Previous repair attempts</li>
                  <li>✓ Urgency level of the repair</li>
                </ul>
              </div>
            </div>
            
            <div style={{
              marginTop: '48px',
              padding: '32px',
              backgroundColor: '#FFF5F5',
              borderRadius: '8px',
              border: '1px solid #FFE0E0'
            }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#D32F2F'
              }}>
                Emergency Maintenance
              </h4>
              <p style={{
                fontSize: '16px',
                color: '#666',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>
                For urgent issues that pose immediate risk to health, safety, or property damage (such as gas leaks, electrical hazards, or major water leaks), please:
              </p>
              <ol style={{
                marginLeft: '24px',
                lineHeight: '1.8',
                color: '#666'
              }}>
                <li>Call emergency services if there's immediate danger</li>
                <li>Contact us immediately on <strong>0438 100 545</strong></li>
                <li>Take steps to minimize damage if safe to do so</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Back to Properties */}
        <section style={{
          textAlign: 'center',
          paddingBottom: isMobile ? '60px' : '80px'
        }}>
          <Link
            href="/rent"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              backgroundColor: '#FFFFFF',
              color: '#002b7f',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              border: '2px solid #002b7f',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#002b7f';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#002b7f';
            }}
          >
            Back to Rental Properties
          </Link>
        </section>
      </main>
    </>
  );
}