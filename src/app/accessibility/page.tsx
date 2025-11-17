'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Accessibility() {
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
    subtitle: {
      fontSize: '20px',
      color: '#666',
      fontWeight: '400',
      lineHeight: '1.4',
      maxWidth: '800px',
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
    accessibilityFeature: {
      backgroundColor: '#f8f8f8',
      padding: '32px',
      borderRadius: '12px',
      marginBottom: '24px',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
    },
    featureDescription: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
    },
    keyboardShortcuts: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '24px',
    },
    shortcutCard: {
      backgroundColor: '#f8f8f8',
      padding: '24px',
      borderRadius: '8px',
    },
    shortcutKey: {
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: '4px',
      fontFamily: 'monospace',
      fontSize: '14px',
      marginRight: '8px',
    },
    shortcutDescription: {
      fontSize: '14px',
      color: '#666',
      marginTop: '8px',
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
        <h1 style={styles.title}>Accessibility Statement</h1>
        <p style={styles.subtitle}>
          Grant's Estate Agents is committed to ensuring digital accessibility for people 
          with disabilities. We are continually improving the user experience for everyone.
        </p>
      </div>

      <div style={styles.content}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Commitment</h2>
          <p style={styles.paragraph}>
            We believe that everyone should have equal access to property information and 
            services. Our website is designed to be accessible to all users, including those 
            who rely on assistive technologies such as screen readers, keyboard navigation, 
            and voice recognition software.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Accessibility Standards</h2>
          <p style={styles.paragraph}>
            We strive to meet or exceed the requirements of the Web Content Accessibility 
            Guidelines (WCAG) 2.1 Level AA. This includes:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Providing text alternatives for non-text content</li>
            <li style={styles.listItem}>Ensuring sufficient color contrast for text and images</li>
            <li style={styles.listItem}>Making all functionality available via keyboard</li>
            <li style={styles.listItem}>Providing clear navigation and page structure</li>
            <li style={styles.listItem}>Ensuring compatibility with assistive technologies</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Accessibility Features</h2>
          
          <div style={styles.accessibilityFeature}>
            <h3 style={styles.featureTitle}>Keyboard Navigation</h3>
            <p style={styles.featureDescription}>
              Our website can be navigated entirely using a keyboard. Use Tab to move forward 
              through interactive elements, Shift+Tab to move backward, and Enter to activate 
              links and buttons.
            </p>
          </div>

          <div style={styles.accessibilityFeature}>
            <h3 style={styles.featureTitle}>Screen Reader Support</h3>
            <p style={styles.featureDescription}>
              We use semantic HTML and ARIA labels to ensure our content is properly announced 
              by screen readers. All images include alternative text descriptions.
            </p>
          </div>

          <div style={styles.accessibilityFeature}>
            <h3 style={styles.featureTitle}>Responsive Design</h3>
            <p style={styles.featureDescription}>
              Our website adapts to different screen sizes and orientations, ensuring content 
              remains accessible on all devices, from mobile phones to desktop computers.
            </p>
          </div>

          <div style={styles.accessibilityFeature}>
            <h3 style={styles.featureTitle}>Clear Language</h3>
            <p style={styles.featureDescription}>
              We use plain language and clear headings to make our content easy to understand 
              and navigate for all users, including those with cognitive disabilities.
            </p>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Keyboard Shortcuts</h2>
          <p style={styles.paragraph}>
            We provide keyboard shortcuts for common actions to improve navigation efficiency:
          </p>
          <div style={styles.keyboardShortcuts}>
            <div style={styles.shortcutCard}>
              <span style={styles.shortcutKey}>Alt</span>
              <span style={styles.shortcutKey}>H</span>
              <p style={styles.shortcutDescription}>Go to homepage</p>
            </div>
            <div style={styles.shortcutCard}>
              <span style={styles.shortcutKey}>Alt</span>
              <span style={styles.shortcutKey}>S</span>
              <p style={styles.shortcutDescription}>Search properties</p>
            </div>
            <div style={styles.shortcutCard}>
              <span style={styles.shortcutKey}>Alt</span>
              <span style={styles.shortcutKey}>C</span>
              <p style={styles.shortcutDescription}>Contact us</p>
            </div>
            <div style={styles.shortcutCard}>
              <span style={styles.shortcutKey}>Alt</span>
              <span style={styles.shortcutKey}>M</span>
              <p style={styles.shortcutDescription}>Main navigation menu</p>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Known Issues</h2>
          <p style={styles.paragraph}>
            We are actively working to address the following accessibility issues:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>
              Some third-party map widgets may not be fully accessible to screen readers. 
              We provide text-based location information as an alternative.
            </li>
            <li style={styles.listItem}>
              Virtual tour features may have limited keyboard navigation. We're working 
              with our vendors to improve this functionality.
            </li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Feedback and Contact</h2>
          <p style={styles.paragraph}>
            We welcome your feedback on the accessibility of our website. If you encounter 
            any barriers or have suggestions for improvement, please contact us:
          </p>
          <div style={styles.subSection}>
            <p style={styles.paragraph}>
              <strong>Email:</strong> accessibility@grantsestateagents.com.au<br />
              <strong>Phone:</strong> 1300 123 456<br />
              <strong>Mail:</strong> Accessibility Team, Grant's Estate Agents, 
              Casey & Cardinia Region, VIC, Australia
            </p>
          </div>
          <p style={styles.paragraph}>
            We aim to respond to accessibility feedback within 5 business days and to 
            resolve identified issues as quickly as possible.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Continuous Improvement</h2>
          <p style={styles.paragraph}>
            Accessibility is an ongoing effort. We regularly review our website and conduct 
            accessibility audits to identify and fix issues. We also provide training to our 
            team to ensure new content and features maintain our accessibility standards.
          </p>
          <p style={styles.paragraph}>
            This statement was last updated in October 2025.
          </p>
        </section>
      </div>
    </div>
  )
}