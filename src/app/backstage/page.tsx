'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Backstage() {
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
    heroSection: {
      position: 'relative' as const,
      height: '500px',
      backgroundColor: '#f5f5f5',
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '80px',
    },
    heroImage: {
      position: 'absolute' as const,
      inset: 0,
      objectFit: 'cover',
    },
    heroOverlay: {
      position: 'absolute' as const,
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
    },
    heroContent: {
      position: 'absolute' as const,
      bottom: '60px',
      left: '60px',
      color: '#fff',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '-0.02em',
    },
    heroText: {
      fontSize: '20px',
      fontWeight: '400',
      maxWidth: '600px',
      lineHeight: '1.4',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '80px',
    },
    statCard: {
      textAlign: 'center' as const,
      padding: '40px',
      backgroundColor: '#f8f8f8',
      borderRadius: '12px',
    },
    statNumber: {
      fontSize: '48px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      marginBottom: '8px',
    },
    statLabel: {
      fontSize: '16px',
      color: '#666',
    },
    cultureSection: {
      marginBottom: '80px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: '600',
      marginBottom: '48px',
      letterSpacing: '-0.01em',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '32px',
      marginBottom: '80px',
    },
    valueCard: {
      padding: '40px',
      border: '1px solid #e5e5e5',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    valueNumber: {
      fontSize: '72px',
      fontWeight: '200',
      color: '#000',
      marginBottom: '16px',
      letterSpacing: '-0.02em',
    },
    valueTitle: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '-0.01em',
    },
    valueDescription: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
    },
    benefitsSection: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '80px',
      borderRadius: '12px',
      marginBottom: '80px',
    },
    benefitsTitle: {
      fontSize: '48px',
      fontWeight: '300',
      marginBottom: '48px',
      letterSpacing: '-0.02em',
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '40px',
    },
    benefitItem: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    },
    benefitIcon: {
      width: '24px',
      height: '24px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      flexShrink: 0,
      marginTop: '4px',
    },
    benefitContent: {
      flex: 1,
    },
    benefitTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    benefitText: {
      fontSize: '16px',
      lineHeight: '1.6',
      opacity: 0.9,
    },
    ctaSection: {
      textAlign: 'center' as const,
      padding: '80px 40px',
      backgroundColor: '#f8f8f8',
      borderRadius: '12px',
    },
    ctaTitle: {
      fontSize: '48px',
      fontWeight: '300',
      marginBottom: '24px',
      letterSpacing: '-0.02em',
    },
    ctaText: {
      fontSize: '20px',
      color: '#666',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.4',
    },
    ctaButton: {
      display: 'inline-block',
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
        <h1 style={styles.title}>Backstage at GEA</h1>
        <p style={styles.subtitle}>
          Discover what it's like to be part of the Grant's Estate Agents family. 
          Meet our team, explore our culture, and see why we're the employer of choice 
          in real estate.
        </p>
      </div>

      <div style={styles.heroSection}>
        <Image
          src="/api/placeholder/1200/500"
          alt="GEA Team"
          fill
          style={styles.heroImage}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Where Careers Flourish</h2>
          <p style={styles.heroText}>
            Join a team that celebrates success, fosters growth, and creates 
            opportunities for extraordinary careers in real estate.
          </p>
        </div>
      </div>

      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>200+</div>
          <div style={styles.statLabel}>Team Members</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>4.8</div>
          <div style={styles.statLabel}>Employee Rating</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>8 Years</div>
          <div style={styles.statLabel}>Average Tenure</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>92%</div>
          <div style={styles.statLabel}>Would Recommend</div>
        </div>
      </div>

      <section style={styles.cultureSection}>
        <h2 style={styles.sectionTitle}>Our Values in Action</h2>
        <div style={styles.valuesGrid}>
          <div 
            style={styles.valueCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e5e5'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={styles.valueNumber}>01</div>
            <h3 style={styles.valueTitle}>Excellence</h3>
            <p style={styles.valueDescription}>
              We strive for excellence in everything we do, setting the standard 
              for professionalism and service in real estate.
            </p>
          </div>
          <div 
            style={styles.valueCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e5e5'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={styles.valueNumber}>02</div>
            <h3 style={styles.valueTitle}>Collaboration</h3>
            <p style={styles.valueDescription}>
              Success is a team sport. We support each other, share knowledge, 
              and celebrate wins together.
            </p>
          </div>
          <div 
            style={styles.valueCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#000'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e5e5'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <div style={styles.valueNumber}>03</div>
            <h3 style={styles.valueTitle}>Innovation</h3>
            <p style={styles.valueDescription}>
              We embrace new ideas and technologies, constantly evolving to stay 
              ahead in a changing market.
            </p>
          </div>
        </div>
      </section>

      <div style={styles.benefitsSection}>
        <h2 style={styles.benefitsTitle}>Why Join GEA?</h2>
        <div style={styles.benefitsGrid}>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Career Development</h3>
              <p style={styles.benefitText}>
                Comprehensive training programs and clear pathways for advancement
              </p>
            </div>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Competitive Rewards</h3>
              <p style={styles.benefitText}>
                Industry-leading commission structure and performance incentives
              </p>
            </div>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Work-Life Balance</h3>
              <p style={styles.benefitText}>
                Flexible working arrangements and generous leave policies
              </p>
            </div>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Cutting-Edge Tools</h3>
              <p style={styles.benefitText}>
                Latest technology and marketing resources at your fingertips
              </p>
            </div>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Supportive Culture</h3>
              <p style={styles.benefitText}>
                Mentorship programs and a collaborative team environment
              </p>
            </div>
          </div>
          <div style={styles.benefitItem}>
            <div style={styles.benefitIcon} />
            <div style={styles.benefitContent}>
              <h3 style={styles.benefitTitle}>Community Impact</h3>
              <p style={styles.benefitText}>
                Make a difference in people's lives and contribute to local communities
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Join Us?</h2>
        <p style={styles.ctaText}>
          Explore current opportunities and take the first step toward an 
          extraordinary career with Grant's Estate Agents.
        </p>
        <a
          href="/careers"
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#262626'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000'
          }}
        >
          View Open Positions
        </a>
      </div>
    </div>
  )
}