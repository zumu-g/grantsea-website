'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function Investors() {
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
    mainContent: {
      display: 'grid',
      gap: '80px',
    },
    section: {
      maxWidth: '1000px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: '600',
      marginBottom: '32px',
      letterSpacing: '-0.01em',
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '80px',
    },
    statCard: {
      backgroundColor: '#f8f8f8',
      padding: '40px',
      borderRadius: '12px',
      textAlign: 'center' as const,
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
      fontWeight: '400',
    },
    paragraph: {
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '1.6',
      marginBottom: '24px',
      color: '#333',
    },
    timelineSection: {
      marginBottom: '80px',
    },
    timeline: {
      position: 'relative' as const,
      paddingLeft: '40px',
    },
    timelineItem: {
      position: 'relative' as const,
      marginBottom: '48px',
      paddingBottom: '48px',
      borderLeft: '2px solid #e5e5e5',
      paddingLeft: '40px',
    },
    timelineDot: {
      position: 'absolute' as const,
      left: '-8px',
      top: '0',
      width: '16px',
      height: '16px',
      backgroundColor: '#000',
      borderRadius: '50%',
    },
    timelineYear: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '12px',
    },
    timelineContent: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
      marginBottom: '80px',
    },
    valueCard: {
      padding: '40px',
      border: '1px solid #e5e5e5',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    valueIcon: {
      width: '48px',
      height: '48px',
      backgroundColor: '#000',
      borderRadius: '8px',
      marginBottom: '24px',
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
    ctaSection: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '80px',
      borderRadius: '12px',
      textAlign: 'center' as const,
    },
    ctaTitle: {
      fontSize: '48px',
      fontWeight: '300',
      marginBottom: '24px',
      letterSpacing: '-0.02em',
    },
    ctaDescription: {
      fontSize: '20px',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.6',
    },
    ctaButton: {
      display: 'inline-block',
      padding: '18px 48px',
      fontSize: '16px',
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
        <h1 style={styles.title}>Investor Relations</h1>
        <p style={styles.subtitle}>
          Building value through strategic growth and operational excellence in the 
          Casey and Cardinia property markets.
        </p>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>$2.8B</div>
            <div style={styles.statLabel}>Annual Sales Volume</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>15,000+</div>
            <div style={styles.statLabel}>Properties Sold</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>25%</div>
            <div style={styles.statLabel}>YoY Growth</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>12</div>
            <div style={styles.statLabel}>Office Locations</div>
          </div>
        </div>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About Grant's Estate Agents</h2>
          <p style={styles.paragraph}>
            Founded in 1985, Grant's Estate Agents has grown to become the leading real estate 
            agency in Melbourne's south-east growth corridor. Our deep local knowledge, combined 
            with innovative technology and exceptional service, has positioned us as the market 
            leader in residential property sales and management.
          </p>
          <p style={styles.paragraph}>
            We operate across the high-growth Casey and Cardinia regions, areas experiencing 
            significant population growth and infrastructure development. Our strategic positioning 
            in these markets provides exceptional opportunities for continued expansion and 
            market share growth.
          </p>
        </section>

        <section style={{...styles.section, ...styles.timelineSection}}>
          <h2 style={styles.sectionTitle}>Our Journey</h2>
          <div style={styles.timeline}>
            <div style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineYear}>1985</div>
              <div style={styles.timelineContent}>
                Founded with a single office in Berwick, focusing on personalized service 
                and local expertise.
              </div>
            </div>
            <div style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineYear}>2000</div>
              <div style={styles.timelineContent}>
                Expanded to 5 offices across the region, establishing market leadership 
                in residential sales.
              </div>
            </div>
            <div style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineYear}>2015</div>
              <div style={styles.timelineContent}>
                Digital transformation initiative launched, integrating cutting-edge 
                technology into all operations.
              </div>
            </div>
            <div style={styles.timelineItem}>
              <div style={styles.timelineDot} />
              <div style={styles.timelineYear}>2025</div>
              <div style={styles.timelineContent}>
                12 offices, 200+ agents, and market leadership across Casey and Cardinia 
                with continued expansion plans.
              </div>
            </div>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Investment Highlights</h2>
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>Market Leadership</h3>
              <p style={styles.valueDescription}>
                Dominant position in high-growth corridors with 35% market share in 
                key suburbs and strong brand recognition.
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>Technology Platform</h3>
              <p style={styles.valueDescription}>
                Proprietary technology stack driving operational efficiency and 
                superior customer experience across all touchpoints.
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>Growth Strategy</h3>
              <p style={styles.valueDescription}>
                Clear expansion roadmap with identified opportunities in adjacent 
                markets and complementary service lines.
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>Talent Excellence</h3>
              <p style={styles.valueDescription}>
                Industry-leading agent retention rates and comprehensive training 
                programs ensuring consistent service quality.
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>Financial Performance</h3>
              <p style={styles.valueDescription}>
                Consistent revenue growth, strong margins, and disciplined capital 
                allocation driving shareholder returns.
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
              <div style={styles.valueIcon} />
              <h3 style={styles.valueTitle}>ESG Commitment</h3>
              <p style={styles.valueDescription}>
                Strong environmental, social, and governance practices embedded 
                throughout our operations and culture.
              </p>
            </div>
          </div>
        </section>

        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Partner With Us</h2>
          <p style={styles.ctaDescription}>
            Interested in investment opportunities or strategic partnerships? 
            We'd love to discuss how we can grow together.
          </p>
          <a
            href="mailto:investors@grantsestateagents.com.au"
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff'
            }}
          >
            Contact Investor Relations
          </a>
        </div>
      </div>
    </div>
  )
}