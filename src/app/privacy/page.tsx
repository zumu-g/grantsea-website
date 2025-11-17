'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Privacy() {
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
    subSection: {
      marginLeft: '24px',
      marginBottom: '24px',
    },
    subSectionTitle: {
      fontSize: '20px',
      fontWeight: '500',
      marginBottom: '16px',
      letterSpacing: '-0.01em',
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
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.lastUpdated}>Last updated: October 2025</p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Introduction</h2>
          <p style={styles.paragraph}>
            Grant's Estate Agents ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          <p style={styles.paragraph}>
            By using our services, you consent to the data practices described in this policy.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Information We Collect</h2>
          
          <div style={styles.subSection}>
            <h3 style={styles.subSectionTitle}>Personal Information</h3>
            <p style={styles.paragraph}>We may collect personal information that you provide to us, including:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Name and contact details (email, phone number, address)</li>
              <li style={styles.listItem}>Property preferences and search criteria</li>
              <li style={styles.listItem}>Financial information (when relevant to property transactions)</li>
              <li style={styles.listItem}>Account credentials</li>
              <li style={styles.listItem}>Communication preferences</li>
            </ul>
          </div>

          <div style={styles.subSection}>
            <h3 style={styles.subSectionTitle}>Automatically Collected Information</h3>
            <p style={styles.paragraph}>When you visit our website, we automatically collect:</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>IP address and device information</li>
              <li style={styles.listItem}>Browser type and version</li>
              <li style={styles.listItem}>Pages visited and time spent on pages</li>
              <li style={styles.listItem}>Referring website addresses</li>
              <li style={styles.listItem}>Location data (with your permission)</li>
            </ul>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. How We Use Your Information</h2>
          <p style={styles.paragraph}>We use the information we collect to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Provide and maintain our services</li>
            <li style={styles.listItem}>Process property inquiries and transactions</li>
            <li style={styles.listItem}>Send property alerts and updates based on your preferences</li>
            <li style={styles.listItem}>Improve our website and services</li>
            <li style={styles.listItem}>Communicate with you about our services</li>
            <li style={styles.listItem}>Comply with legal obligations</li>
            <li style={styles.listItem}>Protect against fraudulent or illegal activity</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Information Sharing</h2>
          <p style={styles.paragraph}>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Property owners and sellers (when you inquire about a property)</li>
            <li style={styles.listItem}>Service providers who assist us in operating our website and services</li>
            <li style={styles.listItem}>Legal and regulatory authorities when required by law</li>
            <li style={styles.listItem}>Professional advisors and business partners</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Data Security</h2>
          <p style={styles.paragraph}>
            We implement appropriate technical and organizational security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
            is 100% secure.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Your Rights</h2>
          <p style={styles.paragraph}>You have the right to:</p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Access the personal information we hold about you</li>
            <li style={styles.listItem}>Request correction of inaccurate information</li>
            <li style={styles.listItem}>Request deletion of your personal information</li>
            <li style={styles.listItem}>Object to processing of your personal information</li>
            <li style={styles.listItem}>Request restriction of processing your personal information</li>
            <li style={styles.listItem}>Withdraw consent at any time</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Cookies</h2>
          <p style={styles.paragraph}>
            We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Third-Party Links</h2>
          <p style={styles.paragraph}>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of these 
            other sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Children's Privacy</h2>
          <p style={styles.paragraph}>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information 
            from children under 18.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. Changes to This Policy</h2>
          <p style={styles.paragraph}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy 
            Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>11. Contact Us</h2>
          <p style={styles.paragraph}>
            If you have questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p style={styles.paragraph}>
            Grant's Estate Agents<br />
            Email: privacy@grantsestateagents.com.au<br />
            Phone: 1300 123 456<br />
            Address: Casey & Cardinia Region, VIC, Australia
          </p>
        </section>
      </div>
    </div>
  )
}