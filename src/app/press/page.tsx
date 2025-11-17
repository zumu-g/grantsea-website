'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

interface PressRelease {
  date: string
  title: string
  summary: string
  type: 'release' | 'media' | 'award'
}

export default function Press() {
  const router = useRouter()

  const pressReleases: PressRelease[] = [
    {
      date: 'October 12, 2025',
      title: 'Grant\'s Estate Agents Wins Agency of the Year Award',
      summary: 'Recognition for excellence in customer service and innovation in the real estate sector.',
      type: 'award'
    },
    {
      date: 'September 28, 2025',
      title: 'Record Breaking Quarter for Casey Property Market',
      summary: 'Grant\'s Estate Agents reports strongest sales figures in company history.',
      type: 'release'
    },
    {
      date: 'September 15, 2025',
      title: 'New Technology Platform Launch',
      summary: 'Revolutionary AI-powered property matching system enhances buyer experience.',
      type: 'release'
    },
    {
      date: 'August 20, 2025',
      title: 'CEO Interview: The Future of Real Estate',
      summary: 'Stuart Grant discusses market trends and company vision with Property Weekly.',
      type: 'media'
    },
    {
      date: 'July 30, 2025',
      title: 'Community Partnership Announcement',
      summary: 'Grant\'s Estate Agents pledges $500,000 to local schools and community programs.',
      type: 'release'
    }
  ]

  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'award':
        return { backgroundColor: '#f0fdf4', color: '#166534' }
      case 'media':
        return { backgroundColor: '#fef3c7', color: '#92400e' }
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' }
    }
  }

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
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: '80px',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr',
      },
    },
    pressSection: {
      minWidth: 0,
    },
    sidebarSection: {
      position: 'sticky' as const,
      top: '140px',
      height: 'fit-content',
    },
    releasesList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
    },
    releaseCard: {
      padding: '32px',
      border: '1px solid #e5e5e5',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    releaseDate: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '8px',
      fontWeight: '500',
    },
    releaseTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '12px',
      letterSpacing: '-0.01em',
      lineHeight: '1.2',
    },
    releaseSummary: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '16px',
    },
    releaseType: {
      display: 'inline-block',
      padding: '6px 16px',
      fontSize: '12px',
      fontWeight: '600',
      borderRadius: '32px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
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
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#333',
    },
    contactName: {
      fontWeight: '600',
      marginBottom: '4px',
    },
    contactDetail: {
      color: '#666',
      marginBottom: '12px',
    },
    brandCard: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '40px',
      borderRadius: '12px',
    },
    brandTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '20px',
      letterSpacing: '-0.01em',
    },
    brandText: {
      fontSize: '14px',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    downloadButton: {
      display: 'inline-block',
      padding: '14px 28px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#000',
      backgroundColor: '#fff',
      border: 'none',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
      textDecoration: 'none',
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
        <h1 style={styles.title}>Press Center</h1>
        <p style={styles.subtitle}>
          Latest news, press releases, and media resources from Grant's Estate Agents. 
          For media inquiries, please contact our press team.
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.pressSection}>
          <div style={styles.releasesList}>
            {pressReleases.map((release, index) => (
              <div
                key={index}
                style={styles.releaseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#000'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e5e5'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <p style={styles.releaseDate}>{release.date}</p>
                <h3 style={styles.releaseTitle}>{release.title}</h3>
                <p style={styles.releaseSummary}>{release.summary}</p>
                <span 
                  style={{
                    ...styles.releaseType,
                    ...getTypeStyle(release.type),
                  }}
                >
                  {release.type === 'release' ? 'Press Release' : 
                   release.type === 'media' ? 'Media Coverage' : 'Award'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.contactCard}>
            <h2 style={styles.contactTitle}>Media Contact</h2>
            <div style={styles.contactInfo}>
              <div style={styles.contactName}>Sarah Mitchell</div>
              <div style={styles.contactDetail}>Head of Communications</div>
              <div style={styles.contactDetail}>press@grantsestateagents.com.au</div>
              <div style={styles.contactDetail}>+61 3 9000 1234</div>
              <div style={styles.contactDetail}>Mobile: +61 412 345 678</div>
            </div>
          </div>

          <div style={styles.brandCard}>
            <h2 style={styles.brandTitle}>Brand Resources</h2>
            <p style={styles.brandText}>
              Download our brand guidelines, logos, and high-resolution images for media use.
            </p>
            <a
              href="#"
              style={styles.downloadButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff'
              }}
            >
              Download Kit
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}