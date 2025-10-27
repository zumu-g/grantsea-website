import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export default function LazyImage({ src, alt, style, placeholder }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', ...style }}>
      {!loaded && !error && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'pulse 1.5s ease-in-out infinite alternate'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#e0e0e0',
            borderRadius: '50%'
          }} />
        </div>
      )}
      
      {error && (
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f8f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '14px'
        }}>
          No image
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}