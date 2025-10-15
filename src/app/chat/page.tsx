'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Chat() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'chat' | 'callback'>('chat')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [preferredTime, setPreferredTime] = useState('')

  const styles = {
    container: {
      width: 'calc(100% - 15px)',
      paddingTop: '120px',
      paddingLeft: 'max(2rem, 3.33vw)',
      paddingRight: 'max(2rem, 3.33vw)',
      paddingBottom: '80px',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#fff',
      minHeight: '100vh',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#000',
      textDecoration: 'none',
      marginBottom: '48px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
    },
    header: {
      marginBottom: '60px',
    },
    title: {
      fontSize: 'clamp(48px, 5vw, 96px)',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      lineHeight: '0.9',
      marginBottom: '24px',
    },
    subtitle: {
      fontSize: '20px',
      color: '#666',
      fontWeight: '400',
      lineHeight: '1.4',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '80px',
      marginBottom: '80px',
    },
    formSection: {
      maxWidth: '600px',
    },
    infoSection: {
      maxWidth: '500px',
    },
    tabContainer: {
      display: 'flex',
      gap: '24px',
      marginBottom: '40px',
      borderBottom: '1px solid #e5e5e5',
    },
    tab: {
      fontSize: '16px',
      fontWeight: '500',
      padding: '16px 0',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
    },
    activeTab: {
      color: '#000',
    },
    inactiveTab: {
      color: '#999',
    },
    tabIndicator: {
      position: 'absolute' as const,
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#000',
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333',
      letterSpacing: '0.03em',
    },
    input: {
      padding: '16px',
      fontSize: '16px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
    },
    textarea: {
      padding: '16px',
      fontSize: '16px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      minHeight: '120px',
      resize: 'vertical' as const,
    },
    submitButton: {
      padding: '18px 48px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: '#000',
      border: 'none',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      alignSelf: 'flex-start',
    },
    contactCard: {
      backgroundColor: '#f8f8f8',
      padding: '40px',
      borderRadius: '12px',
      marginBottom: '32px',
    },
    contactTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '24px',
      letterSpacing: '-0.01em',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    },
    contactItem: {
      fontSize: '16px',
      color: '#333',
      lineHeight: '1.6',
    },
    contactLabel: {
      fontWeight: '500',
      marginRight: '8px',
    },
    hours: {
      display: 'grid',
      gap: '8px',
      marginTop: '8px',
    },
    hourItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#666',
    },
    features: {
      display: 'grid',
      gap: '24px',
    },
    featureItem: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    },
    featureIcon: {
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: '#000',
      flexShrink: 0,
      marginTop: '2px',
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    featureDescription: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', activeTab === 'chat' ? { message, email } : { name, phone, email, preferredTime })
  }

  return (
    <div style={styles.container}>
      <button 
        onClick={() => router.back()}
        style={styles.backButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.7'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
      >
        ← BACK
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>Get in Touch</h1>
        <p style={styles.subtitle}>
          We're here to help with all your real estate needs. Choose how you'd like to connect with us.
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.formSection}>
          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'chat' ? styles.activeTab : styles.inactiveTab),
              }}
              onClick={() => setActiveTab('chat')}
            >
              Live Chat
              {activeTab === 'chat' && <div style={styles.tabIndicator} />}
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'callback' ? styles.activeTab : styles.inactiveTab),
              }}
              onClick={() => setActiveTab('callback')}
            >
              Request Callback
              {activeTab === 'callback' && <div style={styles.tabIndicator} />}
            </button>
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            {activeTab === 'chat' ? (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Your Message</label>
                  <textarea
                    style={styles.textarea}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you today?"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email (optional)</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </>
            ) : (
              <>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0400 000 000"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Preferred Call Time</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g., Weekdays after 5pm"
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              style={styles.submitButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#262626'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000'
              }}
            >
              {activeTab === 'chat' ? 'Start Chat' : 'Request Callback'}
            </button>
          </form>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.contactCard}>
            <h2 style={styles.contactTitle}>Contact Information</h2>
            <div style={styles.contactInfo}>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Phone:</span>
                1300 123 456
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Email:</span>
                info@grantsestateagents.com.au
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactLabel}>Office Hours:</span>
                <div style={styles.hours}>
                  <div style={styles.hourItem}>
                    <span>Monday - Friday</span>
                    <span>9:00am - 5:30pm</span>
                  </div>
                  <div style={styles.hourItem}>
                    <span>Saturday</span>
                    <span>9:00am - 4:00pm</span>
                  </div>
                  <div style={styles.hourItem}>
                    <span>Sunday</span>
                    <span>10:00am - 3:00pm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.features}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Instant Response</h3>
                <p style={styles.featureDescription}>
                  Get immediate assistance from our team during business hours
                </p>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>Expert Advice</h3>
                <p style={styles.featureDescription}>
                  Connect with experienced agents who know the local market
                </p>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon} />
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>24/7 Support</h3>
                <p style={styles.featureDescription}>
                  Leave a message anytime and we'll respond within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}