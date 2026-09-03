'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './profile.css';
import OncomHeader from '@/components/OncomHeader';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import { formatPrice } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function ProfilePage() {
  const { savedPropertyIds } = useSavedProperties();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [prefsSaved, setPrefsSaved] = useState(false);

  // Load full saved property data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('savedPropertiesData');
        if (savedData) {
          setSavedProperties(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading saved properties data:', error);
      }
    }
  }, [savedPropertyIds]);

  // Real user data (from Supabase auth + profiles). notificationsEnabled is the
  // master "stop notifications" toggle.
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // Notification preferences — shared notification_prefs table (drives the
  // hourly push/email pipeline used by web and the iOS app).
  const [prefs, setPrefs] = useState({ push_enabled: true, open_home: true });

  // Populate identity from auth + notification prefs from the profiles row.
  useEffect(() => {
    if (!user) return;
    setUserData((prev) => ({
      ...prev,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? '',
    }));
    const supabase = createClient();
    supabase
      .from('notification_prefs')
      .select('push_enabled, open_home')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return;
        setPrefs({
          push_enabled: data.push_enabled ?? true,
          open_home: data.open_home ?? true,
        });
      });
  }, [user]);

  const savePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrefsSaved(false);
    if (!user) return;
    const supabase = createClient();
    // Upsert only the columns this UI owns — other pipeline prefs stay untouched.
    const { error } = await supabase
      .from('notification_prefs')
      .upsert(
        { user_id: user.id, push_enabled: prefs.push_enabled, open_home: prefs.open_home },
        { onConflict: 'user_id' }
      );
    if (!error) setPrefsSaved(true);
  };

  // Mock saved searches
  const [savedSearches] = useState([
    {
      id: 1,
      name: 'Family homes in Sydney',
      criteria: {
        location: 'Sydney, NSW',
        propertyType: 'House',
        minPrice: 800000,
        maxPrice: 1200000,
        bedrooms: '3+',
        bathrooms: '2+'
      },
      createdAt: '2025-09-01',
      newMatches: 3
    },
    {
      id: 2,
      name: 'Investment properties',
      criteria: {
        location: 'Melbourne, VIC',
        propertyType: 'Apartment',
        minPrice: 400000,
        maxPrice: 600000,
        bedrooms: '2',
        bathrooms: '1+'
      },
      createdAt: '2025-08-15',
      newMatches: 5
    }
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', userData);
    alert('Profile updated successfully!');
  };

  const handleDeleteSearch = (searchId: number) => {
    console.log('Delete search:', searchId);
    // In production, this would delete from the backend
  };

  return (
    <>
      <OncomHeader />
      <main className="profile-container" style={{ paddingTop: '180px' }}>
        <div className="profile-header">
          <h1>My Account</h1>
          <p className="profile-subtitle">Manage your profile, saved properties, and search alerts</p>
        </div>

      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab-button ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Saved Properties ({savedProperties.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'searches' ? 'active' : ''}`}
          onClick={() => setActiveTab('searches')}
        >
          Saved Searches ({savedSearches.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="profile-content">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Personal Information</h2>
            <form onSubmit={handleProfileUpdate} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          </div>
        )}

        {/* Saved Properties Tab */}
        {activeTab === 'properties' && (
          <div className="properties-section">
            <h2>Saved Properties</h2>
            {savedProperties.length === 0 ? (
              <div className="empty-state">
                <p>You haven't saved any properties yet.</p>
                <Link href="/search" className="browse-link">Browse Properties</Link>
              </div>
            ) : (
              <div className="properties-grid">
                {savedProperties.map(property => (
                  <div key={property.id} className="property-card">
                    <Link href={`/property/${property.id}`}>
                      <div className="property-image">
                        <img 
                          src={property.images?.[0]?.url || 'https://via.placeholder.com/400x300'} 
                          alt={property.address?.display || 'Property'}
                        />
                      </div>
                      <div className="property-details">
                        <h3>{property.address?.display || 'Address not available'}</h3>
                        <p className="property-price">
                          {property.listingType === 'Lease' 
                            ? `${formatPrice(property.price || 0)} per week`
                            : formatPrice(property.price || 0)
                          }
                        </p>
                        <p className="property-features">
                          {property.bedrooms || 0} beds • {property.bathrooms || 0} baths • {property.parking || 0} cars
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Searches Tab */}
        {activeTab === 'searches' && (
          <div className="searches-section">
            <h2>Saved Searches</h2>
            <div className="searches-list">
              {savedSearches.map(search => (
                <div key={search.id} className="search-card">
                  <div className="search-header">
                    <h3>{search.name}</h3>
                    {search.newMatches > 0 && (
                      <span className="new-badge">{search.newMatches} new</span>
                    )}
                  </div>
                  <div className="search-criteria">
                    <p><strong>Location:</strong> {search.criteria.location}</p>
                    <p><strong>Type:</strong> {search.criteria.propertyType}</p>
                    <p><strong>Price:</strong> {formatPrice(search.criteria.minPrice)} - {formatPrice(search.criteria.maxPrice)}</p>
                    <p><strong>Beds:</strong> {search.criteria.bedrooms} • <strong>Baths:</strong> {search.criteria.bathrooms}</p>
                  </div>
                  <div className="search-actions">
                    <Link href="/search" className="view-button">View Results</Link>
                    <button 
                      onClick={() => handleDeleteSearch(search.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="search-date">Created {search.createdAt}</p>
                </div>
              ))}
            </div>
            <Link href="/search" className="create-search-link">
              + Create New Search
            </Link>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Notification Preferences</h2>
            <form className="settings-form" onSubmit={savePreferences}>
              <div className="setting-item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={prefs.push_enabled}
                    onChange={(e) => setPrefs({ ...prefs, push_enabled: e.target.checked })}
                  />
                  <span><strong>Push notifications</strong></span>
                </label>
                <p className="setting-description">Master switch for notifications from Grant&apos;s Estate Agents (applies on web and in the app)</p>
              </div>
              <div className="setting-item" style={{ opacity: prefs.push_enabled ? 1 : 0.5 }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    disabled={!prefs.push_enabled}
                    checked={prefs.push_enabled && prefs.open_home}
                    onChange={(e) => setPrefs({ ...prefs, open_home: e.target.checked })}
                  />
                  <span>Open home alerts for saved properties</span>
                </label>
                <p className="setting-description">Get notified when an open home is scheduled for a property you&apos;ve saved</p>
              </div>
              {prefsSaved && <p style={{ color: '#15803d' }}>Preferences saved.</p>}
              <button type="submit" className="save-button">Save Preferences</button>
            </form>

            <div className="danger-zone">
              <h3>Account Management</h3>
              <button className="danger-button">Delete Account</button>
              <p className="danger-text">This action cannot be undone</p>
            </div>
          </div>
        )}
      </div>

      {!userData && (
        <div className="login-prompt">
          <p>Please <Link href="/signup">sign up</Link> or log in to access your profile.</p>
        </div>
      )}
      </main>
    </>
  );
}