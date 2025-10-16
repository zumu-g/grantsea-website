'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { motion } from 'framer-motion';

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
    mapUrl: 'https://maps.google.com/?q=123+Main+Street+Narre+Warren+VIC+3805',
    description: 'Our flagship office in the heart of Narre Warren, serving the local community for over 15 years.'
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
    mapUrl: 'https://maps.google.com/?q=456+High+Street+Berwick+VIC+3806',
    description: 'Located on bustling High Street, perfectly positioned to serve the growing Berwick community.'
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
    mapUrl: 'https://maps.google.com/?q=789+Prince+Highway+Pakenham+VIC+3810',
    description: 'Our newest location serving the rapidly expanding Pakenham and surrounding areas.'
  }
];

export default function OfficesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <OncomHeader />
      
      <main style={{ paddingTop: '180px', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        {/* Hero Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '60px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: isMobile ? '32px' : '48px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
                lineHeight: '1.1'
              }}>
              Our Offices
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '20px',
                color: '#666',
                fontWeight: '300',
                letterSpacing: '0.01em',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
              Three convenient locations across Casey and Cardinia, ready to help you find your perfect home
            </motion.p>
          </div>
        </section>

        {/* Offices Grid */}
        <section style={{
          backgroundColor: '#FAFAFA',
          paddingTop: '80px',
          paddingBottom: '80px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '40px'
            }}>
              {offices.map((office, index) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #F0F0F0',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                >
                  {/* Office Header */}
                  <div style={{
                    backgroundColor: '#000',
                    color: '#FFFFFF',
                    padding: '40px',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      fontSize: '32px',
                      fontWeight: '300',
                      color: '#000'
                    }}>
                      {office.name[0]}
                    </div>
                    <h2 style={{
                      fontSize: '28px',
                      fontWeight: '300',
                      fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                      marginBottom: '12px',
                      letterSpacing: '-0.01em'
                    }}>
                      {office.name}
                    </h2>
                    <p style={{
                      fontSize: '16px',
                      fontWeight: '300',
                      opacity: 0.8,
                      lineHeight: '1.4'
                    }}>
                      {office.description}
                    </p>
                  </div>

                  {/* Office Details */}
                  <div style={{ padding: '40px' }}>
                    {/* Address */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.01em'
                      }}>
                        Address
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666',
                        lineHeight: '1.6',
                        fontWeight: '300'
                      }}>
                        {office.address}<br />
                        {office.suburb}
                      </p>
                    </div>

                    {/* Contact */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.01em'
                      }}>
                        Contact
                      </h3>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          style={{
                            fontSize: '16px',
                            color: '#000',
                            textDecoration: 'none',
                            fontWeight: '400',
                            borderBottom: '1px solid transparent',
                            transition: 'border-color 0.3s ease',
                            width: 'fit-content'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          {office.phone}
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          style={{
                            fontSize: '16px',
                            color: '#000',
                            textDecoration: 'none',
                            fontWeight: '400',
                            borderBottom: '1px solid transparent',
                            transition: 'border-color 0.3s ease',
                            width: 'fit-content'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#000';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                          }}
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>

                    {/* Hours */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.01em'
                      }}>
                        Opening Hours
                      </h3>
                      <div style={{
                        fontSize: '16px',
                        color: '#666',
                        lineHeight: '1.6',
                        fontWeight: '300'
                      }}>
                        <p>Monday - Friday: {office.hours.weekday}</p>
                        <p>Saturday: {office.hours.saturday}</p>
                        <p>Sunday: {office.hours.sunday}</p>
                      </div>
                    </div>

                    {/* Manager */}
                    <div style={{ marginBottom: '32px' }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '500',
                        color: '#000',
                        marginBottom: '12px',
                        letterSpacing: '-0.01em'
                      }}>
                        Office Manager
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666',
                        fontWeight: '300'
                      }}>
                        {office.manager}
                      </p>
                    </div>

                    {/* Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      flexDirection: isMobile ? 'column' : 'row'
                    }}>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          padding: '16px 24px',
                          border: '1px solid #000',
                          borderRadius: '2px',
                          textDecoration: 'none',
                          color: '#000',
                          fontSize: '16px',
                          fontWeight: '400',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#000';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#000';
                        }}
                      >
                        Get Directions
                      </a>
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        style={{
                          flex: 1,
                          padding: '16px 24px',
                          backgroundColor: '#000',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '2px',
                          fontSize: '16px',
                          fontWeight: '400',
                          textAlign: 'center',
                          transition: 'all 0.3s ease',
                          border: '1px solid #000'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#333';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#000';
                        }}
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #F0F0F0',
          paddingTop: '80px',
          paddingBottom: '120px',
          paddingLeft: 'max(2rem, 3.33vw)',
          paddingRight: 'max(2rem, 3.33vw)'
        }}>
          <div style={{
            maxWidth: '1480px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: '36px',
                fontWeight: '300',
                fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
                color: '#000',
                marginBottom: '20px',
                letterSpacing: '-0.02em'
              }}>
              Ready to find your dream home?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: '18px',
                color: '#666',
                marginBottom: '48px',
                fontWeight: '300',
                maxWidth: '600px',
                margin: '0 auto 48px'
              }}>
              Visit any of our offices or get in touch online. Our experienced team is here to guide you every step of the way.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                display: 'flex',
                gap: '24px',
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center'
              }}
            >
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  border: '1px solid #000',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  color: '#000',
                  fontSize: '16px',
                  fontWeight: '400',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#000';
                }}
              >
                Contact Us
              </Link>
              <Link
                href="/agents"
                style={{
                  display: 'inline-block',
                  padding: '16px 32px',
                  backgroundColor: '#000',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '16px',
                  fontWeight: '400',
                  transition: 'all 0.3s ease',
                  border: '1px solid #000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#333';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                }}
              >
                Meet Our Team
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export const metadata = {
  title: 'Our Offices | Grant\'s Estate Agents',
  description: 'Visit our offices in Narre Warren, Berwick, and Pakenham. Find contact details, opening hours, and directions to our three convenient locations.',
};