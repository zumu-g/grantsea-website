'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

export default function PropertyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { properties, loading, error } = useProperties({ limit: 12 });

  const nextProperty = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const prevProperty = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const getVisibleProperties = () => {
    if (properties.length === 0) return [];
    
    const visible = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % properties.length;
      if (properties[index]) {
        visible.push(properties[index]);
      }
    }
    return visible;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load properties at this time.</p>
        <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {getVisibleProperties().map((property) => (
          <Link
            key={property.id}
            href={`/property/${property.id}`}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform group-hover:scale-105">
              {/* Property Image */}
              <div className="relative h-64 bg-gray-200">
                {property.images && property.images.length > 0 ? (
                  <img
                    src={property.images[0].url}
                    alt={property.address}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Property Image
                  </div>
                )}
                {/* Status Tag */}
                {property.status === 'new' && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                    NEW
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">
                  {property.address}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {property.suburb}, {property.state} {property.postcode}
                </p>
                <p className="text-gray-700 mb-3">
                  {property.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{property.bedrooms} bed</span>
                  <span>{property.bathrooms} bath</span>
                  <span>{property.carSpaces} car</span>
                </div>
                <p className="text-xl font-bold text-blue-600">
                  {property.priceDisplay || formatPrice(property.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      {properties.length > 4 && (
        <>
          <button
            onClick={prevProperty}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={nextProperty}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
    </div>
  );
}