'use client';

// Real authentication backed by Supabase Auth (replaces the previous mock).
// Public interface is unchanged so existing call sites keep working.
// Saved properties persist in Supabase; saved searches remain local (deferred).
// See docs/plans/2026-06-27-002-feat-real-auth-user-settings-plan.md (U4)

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences?: {
    propertyTypes: string[];
    priceRange: { min: number; max: number };
    locations: string[];
    notifications: boolean;
  };
  createdAt: string;
}

interface SavedProperty {
  id: string;
  propertyId: string;
  savedAt: string;
  // Nullable in the shared table — iOS-app saves don't set it; the
  // /api/properties/[id] route resolves type by trying sale then lease.
  listingType?: 'sale' | 'lease' | null;
  notes?: string;
}

interface SavedSearch {
  id: string;
  name: string;
  filters: {
    suburb?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    listingType?: 'sale' | 'lease';
  };
  createdAt: string;
  lastRun?: string;
  alertsEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;

  savedProperties: SavedProperty[];
  saveProperty: (propertyId: string, listingType?: 'sale' | 'lease') => void;
  unsaveProperty: (propertyId: string) => void;
  isPropertySaved: (propertyId: string) => boolean;

  savedSearches: SavedSearch[];
  saveSearch: (search: Omit<SavedSearch, 'id' | 'createdAt'>) => void;
  updateSearch: (searchId: string, updates: Partial<SavedSearch>) => void;
  deleteSearch: (searchId: string) => void;
  runSearch: (searchId: string) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Saved searches remain client-only for now (deferred to follow-up).
const SAVED_SEARCHES_KEY = 'gea_saved_searches';

// Build the app User shape from a Supabase user + its profile row.
function toUser(authUser: any, profile: any): User {
  return {
    id: authUser.id,
    email: authUser.email ?? '',
    firstName: profile?.first_name ?? authUser.user_metadata?.first_name ?? '',
    lastName: profile?.last_name ?? authUser.user_metadata?.last_name ?? '',
    phone: profile?.phone ?? authUser.user_metadata?.phone ?? undefined,
    createdAt: authUser.created_at ?? new Date(0).toISOString(),
    preferences: {
      propertyTypes: [],
      priceRange: { min: 0, max: 2000000 },
      locations: [],
      notifications: profile?.notifications_enabled ?? true,
    },
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabase] = useState<SupabaseClient>(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load profile + saved properties for the current auth user.
  const hydrateUser = useCallback(
    async (authUser: any | null) => {
      if (!authUser) {
        setUser(null);
        setSavedProperties([]);
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      setUser(toUser(authUser, profile));

      const { data: saved } = await supabase
        .from('saved_properties')
        .select('id, property_id, listing_type, saved_at')
        .eq('user_id', authUser.id);

      setSavedProperties(
        (saved ?? []).map((row: any) => ({
          id: row.id,
          propertyId: row.property_id,
          savedAt: row.saved_at,
          listingType: row.listing_type ?? null,
        }))
      );
    },
    [supabase]
  );

  // Initial session + auth state subscription.
  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      hydrateUser(data.user).finally(() => setIsLoading(false));
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      hydrateUser(session?.user ?? null);
    });

    // Saved searches (local, deferred).
    try {
      const raw = localStorage.getItem(SAVED_SEARCHES_KEY);
      if (raw) setSavedSearches(JSON.parse(raw));
    } catch {
      /* ignore */
    }

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase, hydrateUser]);

  // Auth methods.
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const register = async (userData: RegisterData) => {
    const { error } = await supabase.auth.signUp({
      email: userData.email.toLowerCase(),
      password: userData.password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone,
        },
        emailRedirectTo:
          typeof window !== 'undefined' ? `${window.location.origin}/` : undefined,
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setSavedProperties([]);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: updates.firstName ?? user.firstName,
        last_name: updates.lastName ?? user.lastName,
        phone: updates.phone ?? user.phone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);
    if (error) return { success: false, error: error.message };
    setUser({ ...user, ...updates });
    return { success: true };
  };

  // Saved properties (Supabase-backed, shared with the iOS app).
  const saveProperty = (propertyId: string, listingType?: 'sale' | 'lease') => {
    if (!user) return;
    setSavedProperties((prev) =>
      prev.some((p) => p.propertyId === propertyId)
        ? prev
        : [...prev, { id: `tmp_${propertyId}`, propertyId, savedAt: new Date().toISOString(), listingType: listingType ?? null }]
    );
    supabase
      .from('saved_properties')
      .upsert(
        { user_id: user.id, property_id: propertyId, listing_type: listingType ?? null },
        { onConflict: 'user_id,property_id' }
      )
      .then(() =>
        hydrateUser({ id: user.id, email: user.email, created_at: user.createdAt })
      );
  };

  const unsaveProperty = (propertyId: string) => {
    if (!user) return;
    setSavedProperties((prev) => prev.filter((p) => p.propertyId !== propertyId));
    supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', propertyId);
  };

  const isPropertySaved = (propertyId: string) =>
    savedProperties.some((p) => p.propertyId === propertyId);

  // Saved searches (local, deferred).
  const persistSearches = (next: SavedSearch[]) => {
    setSavedSearches(next);
    try {
      localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const saveSearch = (search: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    if (!user) return;
    persistSearches([
      ...savedSearches,
      {
        ...search,
        id: `search_${savedSearches.length + 1}_${user.id}`,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const updateSearch = (searchId: string, updates: Partial<SavedSearch>) => {
    persistSearches(savedSearches.map((s) => (s.id === searchId ? { ...s, ...updates } : s)));
  };

  const deleteSearch = (searchId: string) => {
    persistSearches(savedSearches.filter((s) => s.id !== searchId));
  };

  const runSearch = (searchId: string) => {
    updateSearch(searchId, { lastRun: new Date().toISOString() });
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    savedProperties,
    saveProperty,
    unsaveProperty,
    isPropertySaved,
    savedSearches,
    saveSearch,
    updateSearch,
    deleteSearch,
    runSearch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
