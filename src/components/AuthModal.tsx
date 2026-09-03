'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

type Mode = 'login' | 'register' | 'reset';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { login, register, isLoading } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const resetForm = () =>
    setFormData({ email: '', password: '', firstName: '', lastName: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (mode === 'login') {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        onClose();
        resetForm();
      } else {
        setError(result.error || 'Login failed');
      }
    } else if (mode === 'reset') {
      if (!formData.email) {
        setError('Enter your email address');
        return;
      }
      setBusy(true);
      try {
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          formData.email.toLowerCase(),
          { redirectTo: `${window.location.origin}/auth/reset` }
        );
        if (resetError) setError(resetError.message);
        else setNotice('Check your email for a link to reset your password.');
      } finally {
        setBusy(false);
      }
    } else {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill in all required fields');
        return;
      }

      const result = await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      if (result.success) {
        setNotice('Account created. Check your email to verify your address before signing in.');
        resetForm();
      } else {
        setError(result.error || 'Registration failed');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const goToMode = (next: Mode) => {
    setMode(next);
    setError('');
    setNotice('');
    resetForm();
  };

  const switchMode = () => goToMode(mode === 'login' ? 'register' : 'login');

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3000,
        padding: 'max(2rem, 3.33vw)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '2px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        border: '1px solid #e8e8e8'
      }}>
        {/* Header */}
        <div style={{
          padding: 'max(2rem, 3.33vw)',
          borderBottom: '1px solid #e8e8e8',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '400',
              fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
              color: '#000',
              letterSpacing: '-0.01em',
              lineHeight: '1.2'
            }}>
              {mode === 'login' ? 'Welcome back' : mode === 'reset' ? 'Reset password' : 'Create account'}
            </h2>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '16px',
              color: '#666',
              fontWeight: '300',
              lineHeight: '1.4'
            }}>
              {mode === 'login'
                ? 'Sign in to access your saved properties and searches'
                : mode === 'reset'
                ? 'Enter your email and we\'ll send you a reset link'
                : 'Join Grant\'s Estate Agents to save properties and searches'
              }
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              transition: 'all 0.2s ease',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5f5f5';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#666';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          padding: 'max(2rem, 3.33vw)'
        }}>
          {error && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '2px',
              marginBottom: '1.5rem',
              color: '#dc2626',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {notice && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '2px',
              marginBottom: '1.5rem',
              color: '#15803d',
              fontSize: '14px'
            }}>
              {notice}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {mode === 'register' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #e8e8e8',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      fontWeight: '300',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#000'}
                    onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#000',
                    marginBottom: '8px'
                  }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      border: '1px solid #e8e8e8',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      fontWeight: '300',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#000'}
                    onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000',
                marginBottom: '8px'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  border: '1px solid #e8e8e8',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontWeight: '300',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>

            {mode === 'register' && (
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#000',
                  marginBottom: '8px'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    border: '1px solid #e8e8e8',
                    borderRadius: '2px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: '300',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#000'}
                  onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
                />
              </div>
            )}

            {mode !== 'reset' && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#000',
                marginBottom: '8px'
              }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  border: '1px solid #e8e8e8',
                  borderRadius: '2px',
                  padding: '12px 16px',
                  fontSize: '16px',
                  fontWeight: '300',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#000'}
                onBlur={(e) => e.target.style.borderColor = '#e8e8e8'}
              />
            </div>
            )}

            {mode === 'login' && (
              <button
                type="button"
                onClick={() => goToMode('reset')}
                style={{
                  alignSelf: 'flex-start',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '14px',
                  padding: 0,
                  marginTop: '-0.5rem'
                }}
              >
                Forgot password?
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || busy}
              style={{
                width: '100%',
                backgroundColor: (isLoading || busy) ? '#f5f5f5' : '#000',
                color: (isLoading || busy) ? '#999' : '#fff',
                border: '1px solid #e8e8e8',
                borderRadius: '2px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: (isLoading || busy) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#000';
                }
              }}
            >
              {(isLoading || busy) ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #e0e0e0',
                    borderTop: '2px solid #999',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  {mode === 'login' ? 'Signing in...' : mode === 'reset' ? 'Sending...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : mode === 'reset' ? 'Send reset link' : 'Create Account'
              )}
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            {mode === 'reset' ? (
              <>
                Remembered it?{' '}
                <button
                  type="button"
                  onClick={() => goToMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Back to sign in
                </button>
              </>
            ) : mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={switchMode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#000',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}