'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import { formatPrice } from '@/services/api';

interface SavedProperty {
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
}

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved properties from localStorage
    const loadSavedProperties = () => {
      try {
        const saved = localStorage.getItem('savedProperties');
        if (saved) {
          const propertyIds = JSON.parse(saved);
          // In a real app, you would fetch property details from the API
          // For now, we'll just store the full property objects
          const savedData = localStorage.getItem('savedPropertiesData');
          if (savedData) {
            setSavedProperties(JSON.parse(savedData));
          }
        }
      } catch (error) {
        console.error('Error loading saved properties:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedProperties();
  }, []);

  const removeProperty = (propertyId: string) => {
    // Remove from state
    setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
    
    // Update localStorage
    const savedIds = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    const updatedIds = savedIds.filter((id: string) => id !== propertyId);
    localStorage.setItem('savedProperties', JSON.stringify(updatedIds));
    
    const savedData = savedProperties.filter(p => p.id !== propertyId);
    localStorage.setItem('savedPropertiesData', JSON.stringify(savedData));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
          <p className="text-gray-600">Properties you've saved for later viewing</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : savedProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved properties yet</h3>
            <p className="text-gray-600 mb-6">Start browsing and save properties you're interested in</p>
            <Link
              href="/search"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/property/${property.id}`}>
                  <div className="relative h-48 bg-gray-200">
                    {property.images && property.images[0] ? (
                      <Image
                        src={typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                        alt={property.address}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/property/${property.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600">
                      {property.address}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">{property.suburb}, {property.state}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.carSpaces} car</span>
                    </div>
                    <span className="text-xs text-gray-500 uppercase">{property.propertyType}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      {property.listingType === 'lease' 
                        ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice}/week` : 'Contact Agent'))
                        : (property.priceDisplay || (property.price ? formatPrice(property.price) : 'Contact Agent'))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeProperty(property.id);
                      }}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove from saved"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}