'use client';

import React from 'react';
import { useSavedProperties } from '@/hooks/useSavedProperties';

interface SavePropertyButtonProps {
  property: {
    id: string;
    address: string;
    suburb: string;
    state: string;
    price?: number;
    priceDisplay?: string;
    bedrooms: number;
    bathrooms: number;
    carSpaces: number;
    propertyType: string;
    listingType: 'sale' | 'lease';
    leasePrice?: number;
    leasePriceDisplay?: string;
    images?: string[];
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
      className={`inline-flex items-center gap-2 transition-colors ${className}`}
      aria-label={isSaved ? 'Remove from saved properties' : 'Save property'}
      title={isSaved ? 'Remove from saved' : 'Save property'}
    >
      <svg 
        className={`h-5 w-5 transition-colors ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`} 
        fill={isSaved ? 'currentColor' : 'none'} 
        stroke={isSaved ? 'none' : 'currentColor'} 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={isSaved 
            ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          } 
        />
      </svg>
      {showLabel && (
        <span className="text-sm">
          {isSaved ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
}