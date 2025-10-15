'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Portal() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState<'agent' | 'supplier'>('agent')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login
    console.log('Portal login:', { email, password, userType })
  }

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
    loginBox: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '60px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    logo: {
      fontSize: '32px',
      fontWeight: '700',
      letterSpacing: '-0.02em',
      marginBottom: '48px',
      textAlign: 'center' as const,
    },
    title: {
      fontSize: '28px',
      fontWeight: '600',
      marginBottom: '12px',
      letterSpacing: '-0.01em',
      textAlign: 'center' as const,
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
      marginBottom: '40px',
      textAlign: 'center' as const,
    },
    tabContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '32px',
      borderBottom: '1px solid #e5e5e5',
    },
    tab: {
      flex: 1,
      padding: '16px',
      fontSize: '16px',
      fontWeight: '500',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      position: 'relative' as const,
      textAlign: 'center' as const,
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
    loginButton: {
      padding: '18px',
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
      marginTop: '16px',
    },
    forgotPassword: {
      fontSize: '14px',
      color: '#666',
      textAlign: 'center' as const,
      marginTop: '24px',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
    },
    backLink: {
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: '500',
      color: '#666',
      textDecoration: 'none',
      marginTop: '32px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      justifyContent: 'center',
      width: '100%',
    },
    info: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      borderRadius: '8px',
      marginTop: '32px',
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.logo}>GEA</div>
        <h1 style={styles.title}>Portal Access</h1>
        <p style={styles.subtitle}>
          Secure login for agents and business partners
        </p>

        <div style={styles.tabContainer}>
          <button
            style={{
              ...styles.tab,
              ...(userType === 'agent' ? styles.activeTab : styles.inactiveTab),
            }}
            onClick={() => setUserType('agent')}
          >
            Agent Portal
            {userType === 'agent' && <div style={styles.tabIndicator} />}
          </button>
          <button
            style={{
              ...styles.tab,
              ...(userType === 'supplier' ? styles.activeTab : styles.inactiveTab),
            }}
            onClick={() => setUserType('supplier')}
          >
            Supplier Portal
            {userType === 'supplier' && <div style={styles.tabIndicator} />}
          </button>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
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
            <label style={styles.label}>Password</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            style={styles.loginButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#262626'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#000'
            }}
          >
            Sign In
          </button>
        </form>

        <a
          style={styles.forgotPassword}
          href="#"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666'
          }}
        >
          Forgot your password?
        </a>

        <div style={styles.info}>
          {userType === 'agent' ? (
            <p>
              Access your listings, client inquiries, and performance dashboards. 
              Contact your office manager if you need assistance with your login.
            </p>
          ) : (
            <p>
              Manage invoices, purchase orders, and service requests. 
              New suppliers should contact procurement@grantsestateagents.com.au
            </p>
          )}
        </div>

        <a
          style={styles.backLink}
          onClick={() => router.push('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#000'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666'
          }}
        >
          ← Back to main site
        </a>
      </div>
    </div>
  )
}