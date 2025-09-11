import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
  property: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const imageUrl = property.images?.[0]?.url || '/images/placeholder-property.jpg';
  const price = property.priceText || property.price || 'Contact for price';
  const address = `${property.address?.streetNumber || ''} ${property.address?.street || ''}`.trim();
  const suburb = property.address?.suburb || '';
  
  return (
    <Link href={`/property/${property.id}`} className="block">
      <article className="grant-card hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={property.headline || 'Property image'}
            fill
            className="object-cover"
          />
          {property.propertyType && (
            <span className="grant-badge grant-badge-accent absolute top-4 left-4">
              {property.propertyType}
            </span>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="grant-h4 mb-2 line-clamp-1">
            {property.headline || address}
          </h3>
          
          <p className="grant-body text-gray-600 mb-4 line-clamp-2">
            {suburb}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="grant-body grant-body-bold text-[rgb(153,92,0)]">
              {price}
            </p>
            
            {property.bedrooms && (
              <div className="flex gap-3 text-gray-600">
                <span className="grant-small flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6c0 .55.45 1 1 1s1-.45 1-1v-1h16v1c0 .55.45 1 1 1s1-.45 1-1v-6c0-.88-.39-1.67-1-2.22zM14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1zM5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5V8zm-1 7v-2c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v2H4z"/>
                  </svg>
                  {property.bedrooms}
                </span>
                {property.bathrooms && (
                  <span className="grant-small flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18c0 .01-.01 0 0 0H8v-2h8v2zm2-4H6V4h12v12z"/>
                      <circle cx="8" cy="6" r="1"/>
                      <circle cx="16" cy="6" r="1"/>
                      <path d="M8 9h8v5H8z"/>
                    </svg>
                    {property.bathrooms}
                  </span>
                )}
                {property.carSpaces && (
                  <span className="grant-small flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                    {property.carSpaces}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;