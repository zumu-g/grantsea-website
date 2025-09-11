'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    <main className="signup-container">
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
                <div className="type-icon">🏠</div>
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
                <div className="type-icon">💰</div>
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
                <div className="type-icon">🔑</div>
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
                <div className="type-icon">👔</div>
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
              <li>✓ Save your favorite properties</li>
              <li>✓ Create and save custom searches</li>
              <li>✓ Get instant alerts for new listings</li>
              <li>✓ Track property price changes</li>
              <li>✓ Contact agents directly</li>
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
              <span>🍎</span> Apple
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}