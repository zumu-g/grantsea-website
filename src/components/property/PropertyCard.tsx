import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PropertyCardProps {
  property: any;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const imageUrl = property.images?.[0]?.url || '/images/placeholder-property.jpg';
  const price = property.priceText || property.price || 'Contact for price';
  const address = `${property.address?.streetNumber || ''} ${property.address?.street || ''}, ${property.address?.suburb || ''} ${property.address?.state || ''}`.trim();
  
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
            {address}
          </p>
          
          <div className="flex items-center justify-between">
            <p className="grant-body grant-body-bold text-[rgb(153,92,0)]">
              {price}
            </p>
            
            {property.bedrooms && (
              <div className="flex gap-3 text-gray-600">
                <span className="grant-small">{property.bedrooms} bed</span>
                {property.bathrooms && (
                  <span className="grant-small">{property.bathrooms} bath</span>
                )}
                {property.carSpaces && (
                  <span className="grant-small">{property.carSpaces} car</span>
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