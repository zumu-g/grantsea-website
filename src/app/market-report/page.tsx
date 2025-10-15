'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SuburbData {
  name: string
  medianPrice: string
  priceChange: string
  medianRent: string
  rentYield: string
  daysOnMarket: number
  salesVolume: number
  trend: 'up' | 'down' | 'stable'
}

export default function MarketReport() {
  const router = useRouter()
  const [selectedSuburb, setSelectedSuburb] = useState('berwick')
  const [email, setEmail] = useState('')
  const [showDownloadForm, setShowDownloadForm] = useState(false)

  // Mock market data
  const suburbData: Record<string, SuburbData> = {
    berwick: {
      name: 'Berwick',
      medianPrice: '$895,000',
      priceChange: '+12.4%',
      medianRent: '$550/week',
      rentYield: '3.2%',
      daysOnMarket: 32,
      salesVolume: 287,
      trend: 'up'
    },
    officer: {
      name: 'Officer',
      medianPrice: '$720,000',
      priceChange: '+18.2%',
      medianRent: '$480/week',
      rentYield: '3.5%',
      daysOnMarket: 28,
      salesVolume: 412,
      trend: 'up'
    },
    pakenham: {
      name: 'Pakenham',
      medianPrice: '$650,000',
      priceChange: '+15.6%',
      medianRent: '$450/week',
      rentYield: '3.6%',
      daysOnMarket: 25,
      salesVolume: 523,
      trend: 'up'
    },
    cranbourne: {
      name: 'Cranbourne',
      medianPrice: '$680,000',
      priceChange: '+14.1%',
      medianRent: '$460/week',
      rentYield: '3.5%',
      daysOnMarket: 30,
      salesVolume: 628,
      trend: 'up'
    }
  }

  const currentData = suburbData[selectedSuburb]

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle download request
    console.log('Download request:', { email, suburb: selectedSuburb })
    setShowDownloadForm(false)
    setEmail('')
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
    suburbSelector: {
      display: 'flex',
      gap: '16px',
      marginBottom: '60px',
      flexWrap: 'wrap' as const,
    },
    suburbButton: {
      padding: '14px 32px',
      fontSize: '16px',
      fontWeight: '500',
      border: '2px solid #e5e5e5',
      backgroundColor: '#fff',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'capitalize',
    },
    activeSuburb: {
      backgroundColor: '#000',
      color: '#fff',
      borderColor: '#000',
    },
    mainContent: {
      display: 'grid',
      gap: '80px',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginBottom: '60px',
    },
    statCard: {
      backgroundColor: '#f8f8f8',
      padding: '32px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    statLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#666',
      marginBottom: '12px',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    statValue: {
      fontSize: '36px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      marginBottom: '8px',
    },
    statChange: {
      fontSize: '16px',
      fontWeight: '500',
    },
    positiveChange: {
      color: '#22c55e',
    },
    negativeChange: {
      color: '#ef4444',
    },
    neutralChange: {
      color: '#666',
    },
    insightsSection: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '60px',
      borderRadius: '12px',
      marginBottom: '60px',
    },
    insightsTitle: {
      fontSize: '36px',
      fontWeight: '600',
      marginBottom: '32px',
      letterSpacing: '-0.01em',
    },
    insightsList: {
      display: 'grid',
      gap: '24px',
    },
    insightItem: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    },
    insightBullet: {
      width: '8px',
      height: '8px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      marginTop: '8px',
      flexShrink: 0,
    },
    insightText: {
      fontSize: '18px',
      lineHeight: '1.6',
      fontWeight: '400',
    },
    trendsSection: {
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: '600',
      marginBottom: '32px',
      letterSpacing: '-0.01em',
    },
    trendGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    trendCard: {
      padding: '32px',
      border: '1px solid #e5e5e5',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
    },
    trendTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    trendDescription: {
      fontSize: '16px',
      color: '#666',
      lineHeight: '1.6',
    },
    ctaSection: {
      backgroundColor: '#f8f8f8',
      padding: '60px',
      borderRadius: '12px',
      textAlign: 'center' as const,
    },
    ctaTitle: {
      fontSize: '36px',
      fontWeight: '600',
      marginBottom: '20px',
      letterSpacing: '-0.01em',
    },
    ctaDescription: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.6',
    },
    downloadButton: {
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
      textTransform: 'uppercase' as const,
    },
    modal: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '48px',
      maxWidth: '500px',
      width: '100%',
    },
    modalTitle: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '-0.01em',
    },
    modalDescription: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '32px',
      lineHeight: '1.6',
    },
    modalForm: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    },
    modalInput: {
      padding: '16px',
      fontSize: '16px',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s ease',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
    },
    modalButtons: {
      display: 'flex',
      gap: '16px',
      marginTop: '16px',
    },
    modalSubmit: {
      flex: 1,
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: '#000',
      border: 'none',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    modalCancel: {
      flex: 1,
      padding: '16px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#000',
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
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
        <h1 style={styles.title}>Market Report</h1>
        <p style={styles.subtitle}>
          Get the latest insights and trends for the Casey and Cardinia property market. 
          Updated monthly with comprehensive data and expert analysis.
        </p>
      </div>

      <div style={styles.suburbSelector}>
        {Object.keys(suburbData).map(suburb => (
          <button
            key={suburb}
            style={{
              ...styles.suburbButton,
              ...(selectedSuburb === suburb ? styles.activeSuburb : {}),
            }}
            onClick={() => setSelectedSuburb(suburb)}
          >
            {suburbData[suburb].name}
          </button>
        ))}
      </div>

      <div style={styles.mainContent}>
        <div style={styles.statsSection}>
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={styles.statLabel}>Median House Price</div>
            <div style={styles.statValue}>{currentData.medianPrice}</div>
            <div style={{...styles.statChange, ...styles.positiveChange}}>
              {currentData.priceChange} year on year
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={styles.statLabel}>Median Rent</div>
            <div style={styles.statValue}>{currentData.medianRent}</div>
            <div style={{...styles.statChange, ...styles.neutralChange}}>
              {currentData.rentYield} yield
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={styles.statLabel}>Days on Market</div>
            <div style={styles.statValue}>{currentData.daysOnMarket}</div>
            <div style={{...styles.statChange, ...styles.neutralChange}}>
              Average listing period
            </div>
          </div>
          
          <div 
            style={styles.statCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={styles.statLabel}>Sales Volume</div>
            <div style={styles.statValue}>{currentData.salesVolume}</div>
            <div style={{...styles.statChange, ...styles.neutralChange}}>
              Properties sold last year
            </div>
          </div>
        </div>

        <div style={styles.insightsSection}>
          <h2 style={styles.insightsTitle}>Key Insights for {currentData.name}</h2>
          <div style={styles.insightsList}>
            <div style={styles.insightItem}>
              <div style={styles.insightBullet} />
              <p style={styles.insightText}>
                Strong buyer demand continues to drive price growth, with properties selling 
                {currentData.daysOnMarket < 30 ? ' quickly' : ' at a steady pace'}
              </p>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightBullet} />
              <p style={styles.insightText}>
                First home buyers remain active in the market, taking advantage of new developments 
                and infrastructure improvements
              </p>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightBullet} />
              <p style={styles.insightText}>
                Limited stock levels are creating competitive conditions, with quality properties 
                attracting multiple offers
              </p>
            </div>
            <div style={styles.insightItem}>
              <div style={styles.insightBullet} />
              <p style={styles.insightText}>
                Investment activity remains strong with rental yields providing attractive returns 
                for property investors
              </p>
            </div>
          </div>
        </div>

        <div style={styles.trendsSection}>
          <h2 style={styles.sectionTitle}>Market Trends</h2>
          <div style={styles.trendGrid}>
            <div 
              style={styles.trendCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3 style={styles.trendTitle}>Infrastructure Growth</h3>
              <p style={styles.trendDescription}>
                Major road upgrades and new shopping precincts are driving increased demand 
                and supporting strong capital growth prospects.
              </p>
            </div>
            <div 
              style={styles.trendCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3 style={styles.trendTitle}>Population Growth</h3>
              <p style={styles.trendDescription}>
                The area continues to attract young families seeking affordable housing options 
                with excellent amenities and schools nearby.
              </p>
            </div>
            <div 
              style={styles.trendCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#000'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e5e5'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3 style={styles.trendTitle}>Development Pipeline</h3>
              <p style={styles.trendDescription}>
                New residential estates and apartment complexes are providing diverse housing 
                options to meet growing demand in the region.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Get Your Free Detailed Report</h2>
          <p style={styles.ctaDescription}>
            Download our comprehensive market report with detailed suburb analysis, 
            price trends, and expert forecasts for the year ahead.
          </p>
          <button
            style={styles.downloadButton}
            onClick={() => setShowDownloadForm(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#262626'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000'
            }}
          >
            Download Full Report
          </button>
        </div>
      </div>

      {showDownloadForm && (
        <div 
          style={styles.modal}
          onClick={() => setShowDownloadForm(false)}
        >
          <div 
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>Download Market Report</h2>
            <p style={styles.modalDescription}>
              Enter your email to receive the full {currentData.name} market report 
              with detailed analysis and forecasts.
            </p>
            <form style={styles.modalForm} onSubmit={handleDownloadSubmit}>
              <input
                type="email"
                style={styles.modalInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              <div style={styles.modalButtons}>
                <button
                  type="submit"
                  style={styles.modalSubmit}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#262626'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000'
                  }}
                >
                  Download Report
                </button>
                <button
                  type="button"
                  style={styles.modalCancel}
                  onClick={() => setShowDownloadForm(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}