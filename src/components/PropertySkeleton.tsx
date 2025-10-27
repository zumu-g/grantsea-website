import React from 'react';

interface PropertySkeletonProps {
  count?: number;
  isMobile?: boolean;
}

export default function PropertySkeleton({ count = 6, isMobile = false }: PropertySkeletonProps) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? '16px' : '24px'
    }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            flex: isMobile ? '0 0 85%' : '0 0 calc(33.333% - 16px)',
            minWidth: isMobile ? '320px' : '380px',
            display: 'flex',
            flexDirection: 'column',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}
        >
          {/* Image skeleton */}
          <div style={{
            position: 'relative',
            paddingTop: '100%',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0'
          }}>
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              bottom: '1.5rem',
              borderRadius: '8px',
              backgroundColor: '#e0e0e0'
            }} />
          </div>

          {/* Content skeleton */}
          <div style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {/* Suburb */}
            <div style={{
              height: '12px',
              width: '60px',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px'
            }} />

            {/* Address */}
            <div style={{
              height: '20px',
              width: '80%',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px'
            }} />

            {/* Features */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '4px'
            }}>
              <div style={{
                height: '12px',
                width: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px'
              }} />
              <div style={{
                height: '12px',
                width: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px'
              }} />
              <div style={{
                height: '12px',
                width: '40px',
                backgroundColor: '#e0e0e0',
                borderRadius: '4px'
              }} />
            </div>

            {/* Price */}
            <div style={{
              height: '24px',
              width: '50%',
              backgroundColor: '#e0e0e0',
              borderRadius: '4px',
              marginTop: '8px'
            }} />
          </div>

          <style jsx>{`
            @keyframes pulse {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0.7;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}