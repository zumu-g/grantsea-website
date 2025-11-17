'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import OncomHeader from '@/components/OncomHeader';
import './signup.css';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    accountType: 'buyer',
    agreeToTerms: false,
    receiveNewsletter: false
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Sign up form submitted:', formData);
      // In production, this would create the account via API
      localStorage.setItem('user', JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        accountType: formData.accountType
      }));
      alert('Account created successfully!');
      router.push('/profile');
    }
  };

  return (
    <>
      <OncomHeader />
      <main className="signup-container" style={{ paddingTop: '180px' }}>
      <div className="signup-box">
        <div className="signup-header">
          <h1>Create Your Account</h1>
          <p className="signup-subtitle">Join thousands finding their dream property</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* Account Type Selection */}
          <div className="account-type-section">
            <h3>I am a...</h3>
            <div className="account-type-grid">
              <label className={`account-type-card ${formData.accountType === 'buyer' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="buyer"
                  checked={formData.accountType === 'buyer'}
                  onChange={handleChange}
                />
                <div className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <span>Buyer</span>
              </label>
              <label className={`account-type-card ${formData.accountType === 'seller' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="seller"
                  checked={formData.accountType === 'seller'}
                  onChange={handleChange}
                />
                <div className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <span>Seller</span>
              </label>
              <label className={`account-type-card ${formData.accountType === 'renter' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="renter"
                  checked={formData.accountType === 'renter'}
                  onChange={handleChange}
                />
                <div className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6"/>
                    <path d="M18.09 10.37a6 6 0 1 1-10.37 0"/>
                    <path d="m15 15 6 6"/>
                    <path d="m20 15-4 4"/>
                  </svg>
                </div>
                <span>Renter</span>
              </label>
              <label className={`account-type-card ${formData.accountType === 'agent' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="accountType"
                  value="agent"
                  checked={formData.accountType === 'agent'}
                  onChange={handleChange}
                />
                <div className="type-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span>Agent</span>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0400 000 000"
                />
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="form-section">
            <h3>Create Password</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
                <p className="password-hint">Must be at least 8 characters</p>
              </div>
              <div className="form-group full-width">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h3>Your account includes:</h3>
            <ul className="benefits-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Save your favorite properties
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Create and save custom searches
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Get instant alerts for new listings
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Track property price changes
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Contact agents directly
              </li>
            </ul>
          </div>

          {/* Terms and Newsletter */}
          <div className="checkbox-section">
            <label className={`checkbox-label ${errors.agreeToTerms ? 'error' : ''}`}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link></span>
            </label>
            {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="receiveNewsletter"
                checked={formData.receiveNewsletter}
                onChange={handleChange}
              />
              <span>Send me property insights and market updates</span>
            </label>
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>

        <div className="signin-prompt">
          <p>Already have an account? <Link href="/login">Sign in</Link></p>
        </div>

        {/* Social Sign Up Options */}
        <div className="social-signup">
          <div className="divider">
            <span>Or sign up with</span>
          </div>
          <div className="social-buttons">
            <button type="button" className="social-button google">
              <span>G</span> Google
            </button>
            <button type="button" className="social-button facebook">
              <span>f</span> Facebook
            </button>
            <button type="button" className="social-button apple">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
      </main>
    </>
  );
}