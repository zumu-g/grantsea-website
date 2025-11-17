import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: '500',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    border: 'none',
    textDecoration: 'none',
  };

  const sizeStyles = {
    small: {
      padding: '8px 16px',
      fontSize: '14px',
      height: '32px',
    },
    medium: {
      padding: '12px 24px',
      fontSize: '16px',
      height: '40px',
    },
    large: {
      padding: '16px 32px',
      fontSize: '18px',
      height: '48px',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: '#000',
      color: '#fff',
      '&:hover': { backgroundColor: '#333' },
    },
    secondary: {
      backgroundColor: '#f7f7f7',
      color: '#000',
      '&:hover': { backgroundColor: '#e5e5e5' },
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#000',
      border: '1px solid #000',
      '&:hover': { backgroundColor: '#f7f7f7' },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#000',
      '&:hover': { backgroundColor: '#f7f7f7' },
    },
  };

  const styles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  const content = (
    <>
      {loading && (
        <svg
          style={{
            animation: 'spin 1s linear infinite',
            marginRight: '8px',
            width: '16px',
            height: '16px',
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link href={href} style={styles} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      style={styles}
      className={className}
    >
      {content}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}