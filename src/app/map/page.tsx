'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useProperties } from '@/hooks/useProperties';
import { formatPrice } from '@/services/api';
import SavePropertyButton from '@/components/SavePropertyButton';
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function MapSearchPage() {
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-38.0369, 145.3373]); // Berwick coordinates (more accurate)
  const [L, setL] = useState<any>(null);

  const [filters, setFilters] = useState({
    listingType: 'buy',
    propertyTypes: [] as string[],
    priceMin: '',
    priceMax: '',
    bedroomsMin: '',
    bathroomsMin: '',
    suburb: 'all',
  });

  const propertyType = filters.listingType === 'rent' ? 'lease' : 'sale';
  const { properties, loading } = useProperties({ type: propertyType });

  // Load Leaflet on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((leaflet) => {
        const customIcon = new leaflet.Icon({
          iconUrl: 'data:image/svg+xml;base64,' + btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="black" stroke="white" stroke-width="2"/>
              <text x="20" y="26" font-family="Arial" font-size="18" fill="white" text-anchor="middle">$</text>
            </svg>
          `),
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });
        setL({ ...leaflet, customIcon });
      });
    }
  }, []);

  // Suburb coordinates for more realistic distribution
  const suburbCoordinates: { [key: string]: [number, number] } = {
    'Berwick': [-38.0317, 145.3461],
    'Cranbourne': [-38.0994, 145.2813],
    'Narre Warren': [-38.0266, 145.3036],
    'Pakenham': [-38.0751, 145.4874],
    'Officer': [-38.0634, 145.4097],
    'Clyde': [-38.1051, 145.3831],
    'Clyde North': [-38.0851, 145.3931],
    'Beaconsfield': [-38.0517, 145.3697],
    'Hallam': [-38.0167, 145.2697],
    'Hampton Park': [-38.0274, 145.2594],
    'Narre Warren South': [-38.0466, 145.3036]
  };

  // Filter properties with coordinates
  const mappableProperties = properties.filter(property => {
    // Mock coordinates for demo - in production, these would come from the API
    return property.address && property.suburb;
  }).map((property, index) => {
    // Get suburb coordinates or default to Berwick
    const baseCoords = suburbCoordinates[property.suburb] || suburbCoordinates['Berwick'];

    return {
      ...property,
      // Generate coordinates clustered around actual suburb locations
      lat: baseCoords[0] + (Math.random() - 0.5) * 0.015, // Smaller spread for more realistic clustering
      lng: baseCoords[1] + (Math.random() - 0.5) * 0.015,
    };
  });

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {/* Filters Sidebar */}
      <div style={{
        width: '320px',
        backgroundColor: '#fff',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto',
        zIndex: 10
      }}>
        <div style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
            Search Properties
          </h2>

          {/* Listing Type */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              I want to
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setFilters({ ...filters, listingType: 'buy' })}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: filters.listingType === 'buy' ? '#000' : '#e5e7eb',
                  backgroundColor: filters.listingType === 'buy' ? '#000' : '#fff',
                  color: filters.listingType === 'buy' ? '#fff' : '#000',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Buy
              </button>
              <button
                onClick={() => setFilters({ ...filters, listingType: 'rent' })}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: filters.listingType === 'rent' ? '#000' : '#e5e7eb',
                  backgroundColor: filters.listingType === 'rent' ? '#000' : '#fff',
                  color: filters.listingType === 'rent' ? '#fff' : '#000',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Rent
              </button>
            </div>
          </div>

          {/* Property Types */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Property type
            </label>
            {['House', 'Townhouse', 'Apartment', 'Land'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <input
                  type="checkbox"
                  checked={filters.propertyTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ ...filters, propertyTypes: [...filters.propertyTypes, type] });
                    } else {
                      setFilters({ ...filters, propertyTypes: filters.propertyTypes.filter(t => t !== type) });
                    }
                  }}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '14px' }}>{type}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Price range
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <select
                value={filters.priceMin}
                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="">Min Price</option>
                <option value="100000">$100,000</option>
                <option value="200000">$200,000</option>
                <option value="300000">$300,000</option>
                <option value="400000">$400,000</option>
                <option value="500000">$500,000</option>
                <option value="600000">$600,000</option>
                <option value="700000">$700,000</option>
                <option value="800000">$800,000</option>
                <option value="900000">$900,000</option>
                <option value="1000000">$1,000,000</option>
                <option value="1250000">$1,250,000</option>
                <option value="1500000">$1,500,000</option>
                <option value="1750000">$1,750,000</option>
                <option value="2000000">$2,000,000</option>
                <option value="2250000">$2,250,000</option>
                <option value="2500000">$2,500,000</option>
                <option value="2750000">$2,750,000</option>
                <option value="3000000">$3,000,000</option>
                <option value="3250000">$3,250,000</option>
                <option value="3500000">$3,500,000</option>
                <option value="3750000">$3,750,000</option>
                <option value="4000000">$4,000,000</option>
                <option value="4250000">$4,250,000</option>
                <option value="4500000">$4,500,000</option>
                <option value="4750000">$4,750,000</option>
                <option value="5000000">$5,000,000</option>
              </select>
              <select
                value={filters.priceMax}
                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #e5e7eb',
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <option value="">Max Price</option>
                <option value="100000">$100,000</option>
                <option value="200000">$200,000</option>
                <option value="300000">$300,000</option>
                <option value="400000">$400,000</option>
                <option value="500000">$500,000</option>
                <option value="600000">$600,000</option>
                <option value="700000">$700,000</option>
                <option value="800000">$800,000</option>
                <option value="900000">$900,000</option>
                <option value="1000000">$1,000,000</option>
                <option value="1250000">$1,250,000</option>
                <option value="1500000">$1,500,000</option>
                <option value="1750000">$1,750,000</option>
                <option value="2000000">$2,000,000</option>
                <option value="2250000">$2,250,000</option>
                <option value="2500000">$2,500,000</option>
                <option value="2750000">$2,750,000</option>
                <option value="3000000">$3,000,000</option>
                <option value="3250000">$3,250,000</option>
                <option value="3500000">$3,500,000</option>
                <option value="3750000">$3,750,000</option>
                <option value="4000000">$4,000,000</option>
                <option value="4250000">$4,250,000</option>
                <option value="4500000">$4,500,000</option>
                <option value="4750000">$4,750,000</option>
                <option value="5000000">$5,000,000</option>
              </select>
            </div>
          </div>

          {/* Bedrooms */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Bedrooms
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Any', '1+', '2+', '3+', '4+'].map(option => (
                <button
                  key={option}
                  onClick={() => setFilters({ ...filters, bedroomsMin: option === 'Any' ? '' : option.replace('+', '') })}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid',
                    borderColor: filters.bedroomsMin === option.replace('+', '') || (option === 'Any' && !filters.bedroomsMin) ? '#000' : '#e5e7eb',
                    backgroundColor: filters.bedroomsMin === option.replace('+', '') || (option === 'Any' && !filters.bedroomsMin) ? '#000' : '#fff',
                    color: filters.bedroomsMin === option.replace('+', '') || (option === 'Any' && !filters.bedroomsMin) ? '#fff' : '#000',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div style={{
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '4px',
            marginTop: '32px'
          }}>
            <p style={{ fontSize: '16px', fontWeight: '600' }}>
              {mappableProperties.length} properties found
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
              Showing on map
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Header */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 1000
        }}>
          <Link href="/" style={{
            fontSize: '24px',
            fontWeight: '800',
            color: '#000',
            textDecoration: 'none'
          }}>
            GRANT'S
          </Link>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/search" style={{
              padding: '8px 16px',
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#000',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="3" x2="9" y2="21"></line>
                <line x1="9" y1="9" x2="21" y2="9"></line>
              </svg>
              List View
            </Link>
          </div>
        </div>

        {/* Map */}
        {L && (
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {mappableProperties.map((property) => (
              <Marker
                key={property.id}
                position={[property.lat, property.lng]}
                icon={L.customIcon}
                eventHandlers={{
                  click: () => setSelectedProperty(property)
                }}
              >
                <Popup>
                  <div style={{ minWidth: '250px' }}>
                    <div style={{
                      width: '100%',
                      height: '150px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '4px 4px 0 0',
                      backgroundImage: property.images[0] ? `url(${property.images[0]})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} />
                    <div style={{ padding: '12px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                        {formatPrice(property.price)}
                      </h3>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>
                        {property.address}
                      </p>
                      <div style={{ fontSize: '14px', marginTop: '8px', display: 'flex', gap: '12px' }}>
                        {property.bedrooms && <span>{property.bedrooms} bed</span>}
                        {property.bathrooms && <span>{property.bathrooms} bath</span>}
                        {property.carSpaces && <span>{property.carSpaces} car</span>}
                      </div>
                      <Link
                        href={`/property/${property.id}`}
                        style={{
                          display: 'inline-block',
                          marginTop: '12px',
                          padding: '8px 16px',
                          backgroundColor: '#000',
                          color: '#fff',
                          borderRadius: '4px',
                          fontSize: '14px',
                          textDecoration: 'none'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Selected Property Card */}
        {selectedProperty && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            padding: '16px',
            minWidth: '350px',
            zIndex: 1000
          }}>
            <button
              onClick={() => setSelectedProperty(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              ✕
            </button>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{
                width: '120px',
                height: '80px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                backgroundImage: selectedProperty.images[0] ? `url(${selectedProperty.images[0]})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                  {formatPrice(selectedProperty.price)}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280' }}>
                  {selectedProperty.address}
                </p>
                <div style={{ fontSize: '14px', marginTop: '8px', display: 'flex', gap: '12px' }}>
                  {selectedProperty.bedrooms && <span>{selectedProperty.bedrooms} bed</span>}
                  {selectedProperty.bathrooms && <span>{selectedProperty.bathrooms} bath</span>}
                  {selectedProperty.carSpaces && <span>{selectedProperty.carSpaces} car</span>}
                </div>
              </div>
            </div>
            <Link
              href={`/property/${selectedProperty.id}`}
              style={{
                display: 'block',
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '14px',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              View Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}