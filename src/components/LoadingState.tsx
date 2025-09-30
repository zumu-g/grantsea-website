import React from 'react';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export default function LoadingState({
  message = 'Loading...',
  size = 'medium',
  fullScreen = false
}: LoadingStateProps) {
  const sizes = {
    small: { spinner: '24px', text: '14px' },
    medium: { spinner: '40px', text: '16px' },
    large: { spinner: '60px', text: '18px' }
  };

  const currentSize = sizes[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '32px',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999
    })
  };

  const spinnerStyle: React.CSSProperties = {
    width: currentSize.spinner,
    height: currentSize.spinner,
    border: '3px solid #e5e5e5',
    borderTopColor: '#000',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  };

  const textStyle: React.CSSProperties = {
    fontSize: currentSize.text,
    color: '#666',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={containerStyle}>
        <div style={spinnerStyle} />
        <p style={textStyle}>{message}</p>
      </div>
    </>
  );
}

// Skeleton loader for content placeholders
export function SkeletonLoader({
  height = '20px',
  width = '100%',
  borderRadius = '4px'
}: {
  height?: string;
  width?: string;
  borderRadius?: string;
}) {
  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
      <div
        style={{
          height,
          width,
          borderRadius,
          backgroundColor: '#f0f0f0',
          backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '1000px 100%',
          animation: 'shimmer 2s infinite'
        }}
      />
    </>
  );
}

// Property card skeleton
export function PropertyCardSkeleton() {
  return (
    <div style={{
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      <SkeletonLoader height="200px" borderRadius="0" />
      <div style={{ padding: '16px' }}>
        <SkeletonLoader height="24px" width="70%" />
        <div style={{ marginTop: '8px' }}>
          <SkeletonLoader height="16px" width="90%" />
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '16px' }}>
          <SkeletonLoader height="16px" width="60px" />
          <SkeletonLoader height="16px" width="60px" />
          <SkeletonLoader height="16px" width="60px" />
        </div>
      </div>
    </div>
  );
}