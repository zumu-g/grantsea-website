'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import AIChatWidget from '@/components/AIChatWidget';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

export default function PropertiesPage() {
  const [filter, setFilter] = useState<'all' | 'sale' | 'lease'>('all');
  const [propertyType, setPropertyType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  
  // Use the filter in the API call for more accurate results
  const { properties, loading, error } = useProperties({ 
    type: filter === 'sale' ? 'sale' : filter === 'lease' ? 'lease' : 'all',
    limit: 50 
  });

  // Filter properties by property type (House, Townhouse, etc.)
  const filteredProperties = properties.filter((property) => {
    const typeMatch = propertyType === 'all' || property.propertyType?.toLowerCase() === propertyType.toLowerCase();
    return typeMatch;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return parseInt(a.price) - parseInt(b.price);
      case 'price-desc':
        return parseInt(b.price) - parseInt(a.price);
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Properties for Sale & Rent</h1>
          <p className="text-xl text-gray-600">Find your perfect property in Melbourne's Southeast</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Buy/Rent Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Looking to</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`flex-1 py-2 px-4 rounded-lg transition ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('sale')}
                  className={`flex-1 py-2 px-4 rounded-lg transition ${
                    filter === 'sale' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setFilter('lease')}
                  className={`flex-1 py-2 px-4 rounded-lg transition ${
                    filter === 'lease' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Rent
                </button>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Types</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="text-gray-600">
                <span className="text-2xl font-bold text-gray-900">{sortedProperties.length}</span>
                <span className="ml-2">properties found</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading properties. Please try again later.</p>
          </div>
        ) : sortedProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProperties.map((property) => (
              <Link
                key={property.id}
                href={`/property/${property.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-[1.02] block"
              >
                {/* Property Image */}
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Property Image
                  </div>
                  {property.status === 'sold' && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                      <span className="text-white text-3xl font-bold rotate-[-15deg]">SOLD</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {property.propertyType}
                    </span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                    {property.address}
                  </h3>
                  <p className="text-gray-600 mb-3">{property.suburb}, {property.state} {property.postcode}</p>
                  
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {property.listingType === 'lease' 
                      ? (property.leasePriceDisplay || (property.leasePrice ? `$${property.leasePrice} per week` : 'Contact Agent'))
                      : (property.priceDisplay || formatPrice(property.price))}
                  </p>
                  
                  <div className="flex gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0a3 3 0 110 6m0-6a3 3 0 100 6m0 0H8m0 0a3 3 0 110-6m0 6a3 3 0 100-6" />
                      </svg>
                      {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {property.carSpaces} Cars
                    </span>
                  </div>

                  {property.landSize && (
                    <p className="text-sm text-gray-500">Land: {property.landSize} sqm</p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Listed by {property.agent.name}
                    </div>
                    <span className="text-blue-600">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <AIChatWidget />
    </div>
  );
}