'use client';

import React, { useReducer } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { animaAssets } from '@/lib/anima-integration';
import { PROPERTY_STATUS_COLORS, COMPONENT_COLORS } from '@/lib/anima-colors';

interface PropertyCardProps {
  id: number;
  title: string;
  address: string;
  suburb: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  status: 'new' | 'for_sale' | 'sold';
  image: string;
  features: string[];
  className?: string;
  hover?: boolean;
}

interface PropertyCardState {
  hover: boolean;
}

type PropertyCardAction = "mouse_enter" | "mouse_leave";

function reducer(state: PropertyCardState, action: PropertyCardAction): PropertyCardState {
  switch (action) {
    case "mouse_enter":
      return { hover: true };
    case "mouse_leave":
      return { hover: false };
    default:
      return state;
  }
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  address,
  suburb,
  price,
  bedrooms,
  bathrooms,
  carSpaces,
  status,
  image,
  features,
  className,
  hover = false
}) => {
  const [state, dispatch] = useReducer(reducer, { hover });

  const optimizedImage = animaAssets.createOptimizedImage(
    image,
    `${title} - ${address}, ${suburb}`,
    800,
    600
  );

  const cardClasses = clsx(
    'group rounded-xl shadow-lg overflow-hidden transition-all duration-300',
    {
      'hover:shadow-2xl hover:-translate-y-1': true,
      'scale-105': state.hover,
    },
    className
  );

  const cardStyle = {
    backgroundColor: COMPONENT_COLORS.card.background,
    borderColor: COMPONENT_COLORS.card.border,
    '--shadow-color': COMPONENT_COLORS.card.shadow
  } as React.CSSProperties;

  const getStatusStyles = (status: 'new' | 'for_sale' | 'sold') => {
    const statusMap = {
      'new': PROPERTY_STATUS_COLORS.new_listing,
      'for_sale': PROPERTY_STATUS_COLORS.for_sale,
      'sold': PROPERTY_STATUS_COLORS.sold
    };
    return statusMap[status];
  };

  const statusStyles = getStatusStyles(status);

  return (
    <Link href={`/property/${id}`}>
      <div
        className={cardClasses}
        style={cardStyle}
        onMouseEnter={() => dispatch("mouse_enter")}
        onMouseLeave={() => dispatch("mouse_leave")}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={optimizedImage.src}
            alt={optimizedImage.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: statusStyles.background,
                color: statusStyles.text,
                borderColor: statusStyles.border
              }}
            >
              {status === 'new' ? 'NEW' : 
               status === 'for_sale' ? 'FOR SALE' : 'SOLD'}
            </span>
          </div>
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                backgroundColor: COMPONENT_COLORS.card.background + 'CC', // 80% opacity
                color: COMPONENT_COLORS.input.placeholder
              }}
            >
              <svg className="w-5 h-5 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          {/* Property Features Overlay */}
          {state.hover && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end transition-all duration-300">
              <div className="p-4 w-full">
                <div className="flex flex-wrap gap-2">
                  {features.slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: COMPONENT_COLORS.card.background + 'E6', // 90% opacity
                        color: COMPONENT_COLORS.input.text
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 
            className="text-xl font-semibold mb-2 group-hover:transition-colors"
            style={{
              color: COMPONENT_COLORS.input.text
            }}
          >
            {address}, {suburb}
          </h3>
          
          <p 
            className="mb-4 line-clamp-2"
            style={{
              color: COMPONENT_COLORS.input.placeholder
            }}
          >
            {title}
          </p>
          
          {/* Property Details */}
          <div className="flex items-center justify-between mb-4">
            <div 
              className="flex items-center space-x-4 text-sm"
              style={{
                color: COMPONENT_COLORS.input.placeholder
              }}
            >
              {bedrooms && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0" />
                  </svg>
                  {bedrooms} bed
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                  </svg>
                  {bathrooms} bath
                </div>
              )}
              {carSpaces && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  {carSpaces} car
                </div>
              )}
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div 
              className="text-2xl font-bold"
              style={{
                color: PROPERTY_STATUS_COLORS.new_listing.background
              }}
            >
              {price}
            </div>
            <div 
              className="text-sm"
              style={{
                color: COMPONENT_COLORS.input.placeholder
              }}
            >
              {status === 'new' ? 'Just Listed' : 
               status === 'for_sale' ? 'Available Now' : 'Recently Sold'}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-4">
            <button 
              className="w-full py-2 px-4 rounded-lg transition-colors"
              style={{
                backgroundColor: COMPONENT_COLORS.button.primary.background,
                color: COMPONENT_COLORS.button.primary.text
              }}
            >
              {status === 'sold' ? 'View Details' : 'Enquire Now'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};