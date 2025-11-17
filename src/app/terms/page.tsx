'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Terms() {
  const router = useRouter()

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
      textTransform: 'uppercase' as const,
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
      marginBottom: '80px',
    },
    title: {
      fontSize: 'clamp(48px, 5vw, 96px)',
      fontWeight: '300',
      letterSpacing: '-0.02em',
      lineHeight: '0.9',
      marginBottom: '24px',
    },
    lastUpdated: {
      fontSize: '16px',
      color: '#666',
      fontWeight: '400',
    },
    content: {
      maxWidth: '800px',
      lineHeight: '1.6',
    },
    section: {
      marginBottom: '48px',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '24px',
      letterSpacing: '-0.01em',
    },
    paragraph: {
      fontSize: '16px',
      fontWeight: '400',
      marginBottom: '20px',
      color: '#333',
    },
    list: {
      paddingLeft: '24px',
      marginBottom: '20px',
    },
    listItem: {
      fontSize: '16px',
      fontWeight: '400',
      marginBottom: '12px',
      color: '#333',
    },
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
        <h1 style={styles.title}>Terms of Service</h1>
        <p style={styles.lastUpdated}>Last updated: October 2025</p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Agreement to Terms</h2>
          <p style={styles.paragraph}>
            By accessing and using the Grant's Estate Agents website and services, you agree to be bound by these Terms of Service 
            and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
            accessing this site.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Use of Service</h2>
          <p style={styles.paragraph}>
            Our service provides real estate listings, property information, and related services in the Casey and Cardinia areas. 
            You may use our service for lawful purposes only and in accordance with these Terms.
          </p>
          <p style={styles.paragraph}>You agree not to use the service:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li style={styles.listItem}>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li style={styles.listItem}>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li style={styles.listItem}>To submit false or misleading information</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Property Listings</h2>
          <p style={styles.paragraph}>
            Property listings on our website are provided for informational purposes. While we strive to keep information accurate 
            and up-to-date, we make no warranties or representations as to the accuracy of listing information. Property details, 
            prices, and availability are subject to change without notice.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. User Accounts</h2>
          <p style={styles.paragraph}>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
            You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Intellectual Property</h2>
          <p style={styles.paragraph}>
            The Service and its original content, features, and functionality are and will remain the exclusive property of 
            Grant's Estate Agents and its licensors. The Service is protected by copyright, trademark, and other laws. Our 
            trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Privacy</h2>
          <p style={styles.paragraph}>
            Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs 
            the Site and informs users of our data collection practices.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Disclaimers</h2>
          <p style={styles.paragraph}>
            The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Grant's 
            Estate Agents excludes all representations and warranties relating to this website and its contents.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Limitation of Liability</h2>
          <p style={styles.paragraph}>
            In no event shall Grant's Estate Agents, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Changes to Terms</h2>
          <p style={styles.paragraph}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
            we will provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. Contact Information</h2>
          <p style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p style={styles.paragraph}>
            Grant's Estate Agents<br />
            Email: legal@grantsestateagents.com.au<br />
            Phone: 1300 123 456
          </p>
        </section>
      </div>
    </div>
  )
}