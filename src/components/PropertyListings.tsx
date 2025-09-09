'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import PropertyCard from '@/components/property/PropertyCard';

export default function PropertyListings() {
  const { properties, loading, error } = useProperties();
  const [displayedProperties, setDisplayedProperties] = useState<any[]>([]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Display first 6 properties
      setDisplayedProperties(properties.slice(0, 6));
    }
  }, [properties]);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Featured Properties</h2>
            <p className="text-gray-600">
              Discover our hand-picked selection of premium properties
            </p>
          </div>
          <Link 
            href="/properties" 
            className="hidden md:inline-flex bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View All Properties
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">
              Unable to load properties at this time. Please try again later.
            </p>
          </div>
        )}

        {!loading && !error && displayedProperties.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <div className="text-center mt-12 md:hidden">
              <Link 
                href="/properties" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                View All Properties
              </Link>
            </div>
          </>
        )}

        {!loading && !error && displayedProperties.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              No properties available at the moment.
            </p>
            <p className="text-gray-500 mt-2">
              Please check back soon or contact us for more information.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}