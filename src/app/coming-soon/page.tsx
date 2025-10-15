'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ComingSoonProperty {
  id: string
  address: string
  suburb: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  carSpaces: number
  expectedDate: string
  agentName: string
  agentPhone: string
  description: string
  imageUrl: string
}

export default function ComingSoon() {
  const router = useRouter()
  const [properties, setProperties] = useState<ComingSoonProperty[]>([])
  const [selectedSuburb, setSelectedSuburb] = useState('all')
  const [email, setEmail] = useState('')
  const [showNotificationForm, setShowNotificationForm] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)

  useEffect(() => {
    // Mock data - in production this would come from your API
    const mockProperties: ComingSoonProperty[] = [
      {
        id: '1',
        address: '42 Oakwood Avenue',
        suburb: 'Berwick',
        propertyType: 'House',
        bedrooms: 4,
        bathrooms: 2,
        carSpaces: 2,
        expectedDate: 'Early November 2025',
        agentName: 'Sarah Mitchell',
        agentPhone: '0412 345 678',
        description: 'Stunning family home on a generous block with landscaped gardens',
        imageUrl: '/api/placeholder/800/600'
      },
      {
        id: '2',
        address: '15 Parkside Drive',
        suburb: 'Officer',
        propertyType: 'Townhouse',
        bedrooms: 3,
        bathrooms: 2,
        carSpaces: 2,
        expectedDate: 'Mid November 2025',
        agentName: 'James Chen',
        agentPhone: '0423 456 789',
        description: 'Modern townhouse in prime location close to shops and schools',
        imageUrl: '/api/placeholder/800/600'
      },
      {
        id: '3',
        address: '88 Heritage Way',
        suburb: 'Pakenham',
        propertyType: 'House',
        bedrooms: 5,
        bathrooms: 3,
        carSpaces: 2,
        expectedDate: 'Late November 2025',
        agentName: 'Emma Thompson',
        agentPhone: '0434 567 890',
        description: 'Executive family home with multiple living areas and pool',
        imageUrl: '/api/placeholder/800/600'
      }
    ]
    setProperties(mockProperties)
  }, [])

  const suburbs = ['all', ...Array.from(new Set(properties.map(p => p.suburb)))]
  const filteredProperties = selectedSuburb === 'all' 
    ? properties 
    : properties.filter(p => p.suburb === selectedSuburb)

  const handleNotifyMe = (propertyId: string) => {
    setSelectedProperty(propertyId)
    setShowNotificationForm(true)
  }

  const handleSubmitNotification = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle notification signup
    console.log('Notification signup:', { email, propertyId: selectedProperty })
    setShowNotificationForm(false)
    setEmail('')
    setSelectedProperty(null)
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
    filterSection: {
      marginBottom: '60px',
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
      marginBottom: '16px',
      display: 'block',
    },
    filterButtons: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap' as const,
    },
    filterButton: {
      padding: '12px 24px',
      fontSize: '14px',
      fontWeight: '500',
      border: '1px solid #e5e5e5',
      backgroundColor: '#fff',
      borderRadius: '32px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textTransform: 'capitalize' as const,
    },
    activeFilter: {
      backgroundColor: '#000',
      color: '#fff',
      borderColor: '#000',
    },
    propertiesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
      gap: '40px',
      marginBottom: '80px',
    },
    propertyCard: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
    },
    propertyImage: {
      position: 'relative' as const,
      width: '100%',
      height: '280px',
      backgroundColor: '#f5f5f5',
    },
    comingSoonBadge: {
      position: 'absolute' as const,
      top: '20px',
      left: '20px',
      backgroundColor: '#000',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '32px',
      fontSize: '12px',
      fontWeight: '600',
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },
    propertyContent: {
      padding: '32px',
    },
    propertyAddress: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '8px',
      letterSpacing: '-0.01em',
    },
    propertySuburb: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '20px',
    },
    propertyFeatures: {
      display: 'flex',
      gap: '24px',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#666',
    },
    propertyDescription: {
      fontSize: '16px',
      color: '#333',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    expectedDate: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#000',
      marginBottom: '24px',
    },
    propertyAgent: {
      borderTop: '1px solid #e5e5e5',
      paddingTop: '24px',
      marginBottom: '24px',
    },
    agentName: {
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '4px',
    },
    agentPhone: {
      fontSize: '14px',
      color: '#666',
    },
    notifyButton: {
      width: '100%',
      padding: '16px',
      fontSize: '14px',
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
    notificationModal: {
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
        <h1 style={styles.title}>Coming Soon</h1>
        <p style={styles.subtitle}>
          Be the first to know about our exclusive new listings before they hit the market. 
          Register your interest and get priority access to view these properties.
        </p>
      </div>

      <div style={styles.filterSection}>
        <label style={styles.filterLabel}>Filter by Suburb</label>
        <div style={styles.filterButtons}>
          {suburbs.map(suburb => (
            <button
              key={suburb}
              style={{
                ...styles.filterButton,
                ...(selectedSuburb === suburb ? styles.activeFilter : {}),
              }}
              onClick={() => setSelectedSuburb(suburb)}
            >
              {suburb === 'all' ? 'All Suburbs' : suburb}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.propertiesGrid}>
        {filteredProperties.map(property => (
          <div 
            key={property.id} 
            style={styles.propertyCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={styles.propertyImage}>
              <Image
                src={property.imageUrl}
                alt={property.address}
                fill
                style={{ objectFit: 'cover' as const }}
              />
              <div style={styles.comingSoonBadge}>Coming Soon</div>
            </div>
            <div style={styles.propertyContent}>
              <h3 style={styles.propertyAddress}>{property.address}</h3>
              <p style={styles.propertySuburb}>{property.suburb}</p>
              <div style={styles.propertyFeatures}>
                <span>{property.bedrooms} beds</span>
                <span>{property.bathrooms} baths</span>
                <span>{property.carSpaces} cars</span>
                <span>{property.propertyType}</span>
              </div>
              <p style={styles.propertyDescription}>{property.description}</p>
              <p style={styles.expectedDate}>Expected: {property.expectedDate}</p>
              <div style={styles.propertyAgent}>
                <p style={styles.agentName}>{property.agentName}</p>
                <p style={styles.agentPhone}>{property.agentPhone}</p>
              </div>
              <button
                style={styles.notifyButton}
                onClick={(e) => {
                  e.stopPropagation()
                  handleNotifyMe(property.id)
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#262626'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000'
                }}
              >
                Notify Me
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNotificationForm && (
        <div 
          style={styles.notificationModal}
          onClick={() => setShowNotificationForm(false)}
        >
          <div 
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.modalTitle}>Get Notified</h2>
            <p style={styles.modalDescription}>
              Enter your email address and we'll notify you as soon as this property becomes available for viewing.
            </p>
            <form style={styles.modalForm} onSubmit={handleSubmitNotification}>
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
                  Notify Me
                </button>
                <button
                  type="button"
                  style={styles.modalCancel}
                  onClick={() => setShowNotificationForm(false)}
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