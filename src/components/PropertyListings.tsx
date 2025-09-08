'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';

// Remove the local Property interface since we'll use the one from the API

const mockProperties = [
  {
    id: '1',
    title: 'Modern Family Home with Pool',
    price: '$1,250,000',
    bedrooms: 4,
    bathrooms: 2,
    carSpaces: 2,
    address: '45 Grandview Road',
    suburb: 'Narre Warren',
    type: 'House',
    status: 'For Sale',
    image: '/api/placeholder/400/300',
    featured: true,
  },
  {
    id: '2',
    title: 'Luxurious Waterfront Apartment',
    price: '$850,000',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 2,
    address: '12/88 Marine Parade',
    suburb: 'Berwick',
    type: 'Apartment',
    status: 'For Sale',
    image: '/api/placeholder/400/300',
  },
  {
    id: '3',
    title: 'Contemporary Townhouse',
    price: '$650 per week',
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    address: '7 Heritage Lane',
    suburb: 'Pakenham',
    type: 'Townhouse',
    status: 'For Lease',
    image: '/api/placeholder/400/300',
  },
  {
    id: '4',
    title: 'Executive Family Residence',
    price: '$1,850,000',
    bedrooms: 5,
    bathrooms: 3,
    carSpaces: 3,
    address: '23 Prestige Court',
    suburb: 'Officer',
    type: 'House',
    status: 'For Sale',
    image: '/api/placeholder/400/300',
    featured: true,
  },
  {
    id: '5',
    title: 'Development Opportunity',
    price: '$980,000',
    bedrooms: 0,
    bathrooms: 0,
    carSpaces: 0,
    address: '156 Main Street',
    suburb: 'Berwick',
    type: 'Land',
    status: 'For Sale',
    image: '/api/placeholder/400/300',
  },
  {
    id: '6',
    title: 'Charming Period Home',
    price: 'SOLD',
    bedrooms: 3,
    bathrooms: 1,
    carSpaces: 2,
    address: '89 Victoria Street',
    suburb: 'Narre Warren South',
    type: 'House',
    status: 'Sold',
    image: '/api/placeholder/400/300',
  },
];

export default function PropertyListings() {
  const [filter, setFilter] = useState<'all' | 'buy' | 'lease'>('all');
  const [propertyType, setPropertyType] = useState<string>('all');
  
  // Get properties from API
  const { properties, loading, error } = useProperties({ featured: true, limit: 6 });

  // Use API properties if available, otherwise fall back to mock data
  const displayProperties = properties.length > 0 ? properties : mockProperties;
  
  const filteredProperties = displayProperties.filter((property: any) => {
    const statusMatch = 
      filter === 'all' ||
      (filter === 'buy' && (property.status === 'active' || property.status === 'For Sale' || property.status === 'sold' || property.status === 'Sold')) ||
      (filter === 'lease' && (property.status === 'lease' || property.status === 'For Lease' || property.status === 'leased' || property.status === 'Leased'));
    
    const propType = property.propertyType || property.type;
    const typeMatch = propertyType === 'all' || propType === propertyType;
    
    return statusMatch && typeMatch;
  });

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-xl text-gray-600">
            Discover your dream property in Melbourne's Southeast
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex gap-2 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setFilter('buy')}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === 'buy' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setFilter('lease')}
              className={`px-6 py-2 rounded-md transition-all ${
                filter === 'lease' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Lease
            </button>
          </div>

          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <option value="all">All Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property: any) => (
            <Link
              key={property.id}
              href={`/property/${property.id}`}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer block ${
                property.featured ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {property.featured && (
                <div className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 absolute z-10">
                  FEATURED
                </div>
              )}
              
              <div className="relative h-48 bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Property Image
                </div>
                {(property.status === 'sold' || property.status === 'Sold') && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold rotate-[-15deg]">SOLD</span>
                  </div>
                )}
                {(property.status === 'leased' || property.status === 'Leased') && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold rotate-[-15deg]">LEASED</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold line-clamp-2 flex-1">
                    {property.title || property.address || 'Property'}
                  </h3>
                  <span className="bg-gray-100 text-xs px-2 py-1 rounded ml-2">
                    {property.propertyType || property.type || 'Property'}
                  </span>
                </div>
                
                <p className="text-2xl font-bold text-blue-600 mb-3">
                  {property.priceDisplay || property.price || formatPrice(property.price)}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {property.address}, {property.suburb}{property.state ? `, ${property.state}` : ''}
                </p>
                
                {(property.propertyType || property.type) !== 'Land' && (
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      🛏️ {property.bedrooms || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      🚿 {property.bathrooms || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      🚗 {property.carSpaces || 0}
                    </span>
                  </div>
                )}
                
                <div className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
                  View Details
                </div>
              </div>
            </Link>
          ))}
        </div>

        )}
        
        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}