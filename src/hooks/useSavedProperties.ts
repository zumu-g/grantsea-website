'use client';

// Thin adapter over AuthContext so all saved-property consumers share one
// Supabase-backed source of truth. Public shape preserved for existing callers.
// See docs/plans/2026-06-27-002-feat-real-auth-user-settings-plan.md (U7)

import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface Property {
  id: string;
  address?: string;
  suburb?: string;
  state?: string;
  price?: number | string;
  priceDisplay?: string;
  bedrooms?: number;
  bathrooms?: number;
  carSpaces?: number;
  propertyType?: string;
  listingType?: 'sale' | 'lease' | 'both';
  leasePrice?: number | string;
  leasePriceDisplay?: string;
  images?: any[];
}

export const useSavedProperties = () => {
  const {
    savedProperties,
    saveProperty: ctxSave,
    unsaveProperty: ctxUnsave,
    isPropertySaved: ctxIsSaved,
    isLoading,
  } = useAuth();

  const savedPropertyIds = savedProperties.map((p) => p.propertyId);

  const saveProperty = useCallback((property: Property) => ctxSave(property.id), [ctxSave]);
  const unsaveProperty = useCallback((propertyId: string) => ctxUnsave(propertyId), [ctxUnsave]);
  const isPropertySaved = useCallback((propertyId: string) => ctxIsSaved(propertyId), [ctxIsSaved]);

  const toggleSaveProperty = useCallback(
    (property: Property) => {
      if (ctxIsSaved(property.id)) ctxUnsave(property.id);
      else ctxSave(property.id);
    },
    [ctxIsSaved, ctxSave, ctxUnsave]
  );

  return {
    savedPropertyIds,
    saveProperty,
    unsaveProperty,
    toggleSaveProperty,
    isPropertySaved,
    isInitialized: !isLoading,
  };
};
