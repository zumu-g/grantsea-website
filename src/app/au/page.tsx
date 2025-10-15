'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function CountrySelector() {
  const router = useRouter()

  const countries = [
    {
      code: 'au',
      name: 'Australia',
      flag: '🇦🇺',
      current: true,
      url: '/'
    },
    {
      code: 'nz',
      name: 'New Zealand',
      flag: '🇳🇿',
      current: false,
      url: '#'
    },
    {
      code: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      current: false,
      url: '#'
    },
    {
      code: 'us',
      name: 'United States',
      flag: '🇺🇸',
      current: false,
      url: '#'
    },
    {
      code: 'ca',
      name: 'Canada',
      flag: '🇨🇦',
      current: false,
      url: '#'
    }
  ]

  const styles = {
    container: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f8f8',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      padding: '40px 20px',
    },
    content: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '80px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      textAlign: 'center' as const,
    },
    logo: {
      fontSize: '48px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      marginBottom: '48px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '300',
      marginBottom: '16px',
      letterSpacing: '-0.01em',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '48px',
      lineHeight: '1.6',
    },
    countriesGrid: {
      display: 'grid',
      gap: '16px',
      marginBottom: '48px',
    },
    countryCard: {
      display: 'flex',
      alignItems: 'center',
      padding: '24px',
      border: '2px solid #e5e5e5',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      color: '#000',
    },
    currentCountry: {
      borderColor: '#000',
      backgroundColor: '#f8f8f8',
    },
    countryFlag: {
      fontSize: '32px',
      marginRight: '20px',
    },
    countryInfo: {
      flex: 1,
      textAlign: 'left' as const,
    },
    countryName: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '4px',
    },
    countryStatus: {
      fontSize: '14px',
      color: '#666',
    },
    currentLabel: {
      color: '#000',
      fontWeight: '500',
    },
    comingSoon: {
      color: '#999',
      fontStyle: 'italic' as const,
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '500',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: '#666',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      padding: 0,
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.logo}>GEA</div>
        <h1 style={styles.title}>Select Your Location</h1>
        <p style={styles.subtitle}>
          Choose your country to view properties and services available in your region.
        </p>

        <div style={styles.countriesGrid}>
          {countries.map((country) => (
            <div
              key={country.code}
              style={{
                ...styles.countryCard,
                ...(country.current ? styles.currentCountry : {}),
              }}
              onClick={() => {
                if (country.current || country.url !== '#') {
                  router.push(country.url)
                }
              }}
              onMouseEnter={(e) => {
                if (!country.current) {
                  e.currentTarget.style.borderColor = '#000'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!country.current) {
                  e.currentTarget.style.borderColor = '#e5e5e5'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <span style={styles.countryFlag}>{country.flag}</span>
              <div style={styles.countryInfo}>
                <div style={styles.countryName}>{country.name}</div>
                <div style={styles.countryStatus}>
                  {country.current ? (
                    <span style={styles.currentLabel}>You are here</span>
                  ) : (
                    <span style={styles.comingSoon}>Coming soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          style={styles.backButton}
          onClick={() => router.push('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666'
          }}
        >
          ← Continue to Australian site
        </button>
      </div>
    </div>
  )
}