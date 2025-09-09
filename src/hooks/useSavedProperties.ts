'use client';

import { useState, useEffect, useCallback } from 'react';

interface Property {
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
  listingType: 'sale' | 'lease' | 'both';
  leasePrice?: number | string;
  leasePriceDisplay?: string;
  images?: any[];
}

export const useSavedProperties = () => {
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved properties from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('savedProperties');
        if (saved) {
          setSavedPropertyIds(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved properties:', error);
      }
      setIsInitialized(true);
    }
  }, []);

  // Save property
  const saveProperty = useCallback((property: Property) => {
    if (typeof window === 'undefined') return;

    try {
      // Update saved IDs
      const updatedIds = [...savedPropertyIds, property.id];
      setSavedPropertyIds(updatedIds);
      localStorage.setItem('savedProperties', JSON.stringify(updatedIds));

      // Update saved property data
      const savedData = JSON.parse(localStorage.getItem('savedPropertiesData') || '[]');
      const updatedData = [...savedData, property];
      localStorage.setItem('savedPropertiesData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving property:', error);
    }
  }, [savedPropertyIds]);

  // Unsave property
  const unsaveProperty = useCallback((propertyId: string) => {
    if (typeof window === 'undefined') return;

    try {
      // Update saved IDs
      const updatedIds = savedPropertyIds.filter(id => id !== propertyId);
      setSavedPropertyIds(updatedIds);
      localStorage.setItem('savedProperties', JSON.stringify(updatedIds));

      // Update saved property data
      const savedData = JSON.parse(localStorage.getItem('savedPropertiesData') || '[]');
      const updatedData = savedData.filter((p: Property) => p.id !== propertyId);
      localStorage.setItem('savedPropertiesData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error unsaving property:', error);
    }
  }, [savedPropertyIds]);

  // Toggle save state
  const toggleSaveProperty = useCallback((property: Property) => {
    if (isPropertySaved(property.id)) {
      unsaveProperty(property.id);
    } else {
      saveProperty(property);
    }
  }, [savedPropertyIds, saveProperty, unsaveProperty]);

  // Check if property is saved
  const isPropertySaved = useCallback((propertyId: string) => {
    return savedPropertyIds.includes(propertyId);
  }, [savedPropertyIds]);

  return {
    savedPropertyIds,
    saveProperty,
    unsaveProperty,
    toggleSaveProperty,
    isPropertySaved,
    isInitialized
  };
};