'use client';

import React from 'react';
import { useSavedProperties } from '@/hooks/useSavedProperties';

interface SavePropertyButtonProps {
  property: {
    id: string;
    address: string;
    suburb: string;
    state: string;
    price?: number | string;
    priceDisplay?: string;
    bedrooms: number;
    bathrooms: number;
    carSpaces: number;
    propertyType: string;
    listingType?: 'sale' | 'lease' | 'both';
    leasePrice?: number | string;
    leasePriceDisplay?: string;
    images?: any[];
  };
  className?: string;
  showLabel?: boolean;
}

export default function SavePropertyButton({ property, className = '', showLabel = false }: SavePropertyButtonProps) {
  const { toggleSaveProperty, isPropertySaved } = useSavedProperties();
  const isSaved = isPropertySaved(property.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProperty(property);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px',
        backgroundColor: isSaved ? '#000' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isSaved ? '#000' : '#F0F0F0'}`,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        width: '44px',
        height: '44px',
        justifyContent: 'center',
        boxShadow: isSaved ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
        ...(!showLabel && { borderRadius: '50%' }),
        ...(showLabel && { 
          borderRadius: '24px', 
          width: 'auto',
          paddingLeft: '20px',
          paddingRight: '20px'
        })
      }}
      className={className}
      aria-label={isSaved ? 'Remove from saved properties' : 'Save property'}
      title={isSaved ? 'Remove from saved' : 'Save property'}
      onMouseEnter={(e) => {
        if (!isSaved) {
          e.currentTarget.style.backgroundColor = '#000';
          e.currentTarget.style.borderColor = '#000';
          const svg = e.currentTarget.querySelector('svg') as SVGElement;
          if (svg) {
            svg.style.stroke = '#FFF';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isSaved) {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          e.currentTarget.style.borderColor = '#F0F0F0';
          const svg = e.currentTarget.querySelector('svg') as SVGElement;
          if (svg) {
            svg.style.stroke = '#000';
          }
        }
      }}
    >
      <svg 
        style={{
          width: '20px',
          height: '20px',
          transition: 'all 0.3s ease',
          fill: isSaved ? '#FFF' : 'none',
          stroke: isSaved ? 'none' : '#000',
          strokeWidth: isSaved ? 0 : 1.5
        }}
        viewBox="0 0 24 24"
      >
        <path 
          d={isSaved 
            ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          } 
        />
      </svg>
      {showLabel && (
        <span style={{
          fontSize: '14px',
          fontWeight: '500',
          color: isSaved ? '#FFF' : '#000',
          letterSpacing: '0.02em',
          transition: 'color 0.3s ease'
        }}>
          {isSaved ? 'SAVED' : 'SAVE'}
        </span>
      )}
    </button>
  );
}