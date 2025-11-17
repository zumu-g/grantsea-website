'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  // Auth state
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Auth methods
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  
  // Saved properties
  savedProperties: SavedProperty[];
  saveProperty: (propertyId: string, notes?: string) => void;
  unsaveProperty: (propertyId: string) => void;
  isPropertySaved: (propertyId: string) => boolean;
  
  // Saved searches
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

const STORAGE_KEYS = {
  USER: 'gea_user',
  TOKEN: 'gea_token',
  SAVED_PROPERTIES: 'gea_saved_properties',
  SAVED_SEARCHES: 'gea_saved_searches',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          
          // Load user's saved data
          loadSavedData(userData.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        clearStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Load saved properties and searches for user
  const loadSavedData = (userId: string) => {
    try {
      const properties = localStorage.getItem(`${STORAGE_KEYS.SAVED_PROPERTIES}_${userId}`);
      const searches = localStorage.getItem(`${STORAGE_KEYS.SAVED_SEARCHES}_${userId}`);
      
      if (properties) {
        setSavedProperties(JSON.parse(properties));
      }
      
      if (searches) {
        setSavedSearches(JSON.parse(searches));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  // Save data to localStorage
  const saveSavedProperties = (properties: SavedProperty[], userId: string) => {
    localStorage.setItem(`${STORAGE_KEYS.SAVED_PROPERTIES}_${userId}`, JSON.stringify(properties));
  };

  const saveSavedSearches = (searches: SavedSearch[], userId: string) => {
    localStorage.setItem(`${STORAGE_KEYS.SAVED_SEARCHES}_${userId}`, JSON.stringify(searches));
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    setSavedProperties([]);
    setSavedSearches([]);
  };

  // Auth methods
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real implementation, this would come from your API
      const userData: User = {
        id: `user_${Date.now()}`,
        email: email.toLowerCase(),
        firstName: email.split('@')[0].split('.')[0] || 'User',
        lastName: email.split('@')[0].split('.')[1] || '',
        createdAt: new Date().toISOString(),
        preferences: {
          propertyTypes: [],
          priceRange: { min: 0, max: 2000000 },
          locations: [],
          notifications: true
        }
      };
      
      // Generate mock token
      const token = `token_${userData.id}_${Date.now()}`;
      
      // Store in localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      
      setUser(userData);
      loadSavedData(userData.id);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email.toLowerCase(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        createdAt: new Date().toISOString(),
        preferences: {
          propertyTypes: [],
          priceRange: { min: 0, max: 2000000 },
          locations: [],
          notifications: true
        }
      };
      
      const token = `token_${newUser.id}_${Date.now()}`;
      
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      
      setUser(newUser);
      loadSavedData(newUser.id);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearStorage();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };
    
    try {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to update profile' };
    }
  };

  // Saved properties methods
  const saveProperty = (propertyId: string, notes?: string) => {
    if (!user) return;
    
    const savedProperty: SavedProperty = {
      id: `saved_${Date.now()}`,
      propertyId,
      savedAt: new Date().toISOString(),
      notes
    };
    
    const updated = [...savedProperties, savedProperty];
    setSavedProperties(updated);
    saveSavedProperties(updated, user.id);
  };

  const unsaveProperty = (propertyId: string) => {
    if (!user) return;
    
    const updated = savedProperties.filter(p => p.propertyId !== propertyId);
    setSavedProperties(updated);
    saveSavedProperties(updated, user.id);
  };

  const isPropertySaved = (propertyId: string): boolean => {
    return savedProperties.some(p => p.propertyId === propertyId);
  };

  // Saved searches methods
  const saveSearch = (search: Omit<SavedSearch, 'id' | 'createdAt'>) => {
    if (!user) return;
    
    const savedSearch: SavedSearch = {
      ...search,
      id: `search_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedSearches, savedSearch];
    setSavedSearches(updated);
    saveSavedSearches(updated, user.id);
  };

  const updateSearch = (searchId: string, updates: Partial<SavedSearch>) => {
    if (!user) return;
    
    const updated = savedSearches.map(search => 
      search.id === searchId ? { ...search, ...updates } : search
    );
    setSavedSearches(updated);
    saveSavedSearches(updated, user.id);
  };

  const deleteSearch = (searchId: string) => {
    if (!user) return;
    
    const updated = savedSearches.filter(search => search.id !== searchId);
    setSavedSearches(updated);
    saveSavedSearches(updated, user.id);
  };

  const runSearch = (searchId: string) => {
    if (!user) return;
    
    updateSearch(searchId, { lastRun: new Date().toISOString() });
  };

  const value: AuthContextType = {
    // Auth state
    user,
    isLoading,
    isAuthenticated: !!user,
    
    // Auth methods
    login,
    register,
    logout,
    updateProfile,
    
    // Saved properties
    savedProperties,
    saveProperty,
    unsaveProperty,
    isPropertySaved,
    
    // Saved searches
    savedSearches,
    saveSearch,
    updateSearch,
    deleteSearch,
    runSearch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}