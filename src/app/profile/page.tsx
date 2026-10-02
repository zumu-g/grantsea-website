'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './profile.css';
import OncomHeader from '@/components/OncomHeader';
import { useSavedProperties } from '@/hooks/useSavedProperties';
import { formatPrice } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

// Registration history shows past inspections too, so this can't use
// formatNextInspection (which filters to upcoming and returns null otherwise).
function formatInspectionWindow(startAt: string, endAt?: string | null): string {
  const start = new Date(startAt);
  if (Number.isNaN(start.getTime())) return 'Time to be confirmed';
  const date = start.toLocaleDateString('en-AU', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
  const time = (d: Date) =>
    d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
  const end = endAt ? new Date(endAt) : null;
  const endValid = end && !Number.isNaN(end.getTime());
  return `${date}, ${time(start)}${endValid ? `–${time(end!)}` : ''}`;
}

export default function ProfilePage() {
  const { savedPropertyIds } = useSavedProperties();
  const { user } = useAuth();
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [prefsSaved, setPrefsSaved] = useState(false);

  // useSavedProperties maps a new array each render, so depend on a stable
  // string key — passing the array itself would refetch on every render.
  const savedIdsKey = savedPropertyIds.join(',');

  // Hydrate saved properties by id from the API. The ids come from the
  // Supabase-backed saved_properties table (shared with the iOS app), so a
  // property saved on the app must resolve here too — the previous
  // localStorage read only ever saw saves made in this browser.
  useEffect(() => {
    let cancelled = false;
    const ids = savedIdsKey ? savedIdsKey.split(',') : [];

    if (ids.length === 0) {
      setSavedProperties([]);
      setSavedLoading(false);
      return;
    }

    setSavedLoading(true);
    Promise.all(
      ids.map((id) =>
        fetch(`/api/properties/${encodeURIComponent(id)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((json) => json?.data ?? null)
          // A delisted/sold property 404s — drop it rather than failing the whole list.
          .catch(() => null)
      )
    ).then((results) => {
      if (cancelled) return;
      setSavedProperties(results.filter(Boolean));
      setSavedLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [savedIdsKey]);

  // Open-home registrations — shared open_home_registrations table (same rows
  // the iOS app writes). Address/time live in open_home_snapshots, matched on
  // open_home_id. There is no FK between the two tables, so PostgREST can't
  // embed them; fetch both and join here.
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRegistrations([]);
      setRegistrationsLoading(false);
      return;
    }
    let cancelled = false;
    setRegistrationsLoading(true);
    const supabase = createClient();

    (async () => {
      const { data: regs } = await supabase
        .from('open_home_registrations')
        .select('id, property_id, open_home_id, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (cancelled) return;
      if (!regs?.length) {
        setRegistrations([]);
        setRegistrationsLoading(false);
        return;
      }

      const { data: snaps } = await supabase
        .from('open_home_snapshots')
        .select('open_home_id, address, start_at, end_at')
        .in('open_home_id', regs.map((r) => r.open_home_id));

      if (cancelled) return;
      const byId = new Map((snaps ?? []).map((s) => [String(s.open_home_id), s]));
      setRegistrations(
        regs.map((r) => ({ ...r, snapshot: byId.get(String(r.open_home_id)) ?? null }))
      );
      setRegistrationsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

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
          className={`tab-button ${activeTab === 'inspections' ? 'active' : ''}`}
          onClick={() => setActiveTab('inspections')}
        >
          Open Homes ({registrations.length})
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
            {savedLoading ? (
              <p>Loading your saved properties…</p>
            ) : savedProperties.length === 0 ? (
              <div className="empty-state">
                <p>You haven&apos;t saved any properties yet.</p>
                <Link href="/search" className="browse-link">Browse Properties</Link>
              </div>
            ) : (
              <div className="properties-grid">
                {savedProperties.map(property => (
                  <div key={property.id} className="property-card">
                    <Link href={`/property/${property.id}`}>
                      {property.images?.[0]?.url && (
                        <div className="property-image">
                          <img src={property.images[0].url} alt={property.address || 'Property'} />
                        </div>
                      )}
                      <div className="property-details">
                        <h3>{property.address || 'Address not available'}</h3>
                        <p className="property-price">
                          {property.listingType === 'lease'
                            ? property.leasePriceDisplay || property.priceDisplay
                            : property.priceDisplay}
                        </p>
                        <p className="property-features">
                          {property.bedrooms || 0} beds • {property.bathrooms || 0} baths • {property.carSpaces || 0} cars
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Open Home Registrations Tab */}
        {activeTab === 'inspections' && (
          <div className="properties-section">
            <h2>Open Homes You&apos;ve Registered For</h2>
            {registrationsLoading ? (
              <p>Loading your registrations…</p>
            ) : registrations.length === 0 ? (
              <div className="empty-state">
                <p>You haven&apos;t registered for any open homes yet.</p>
                <Link href="/buy/open-for-inspection" className="browse-link">
                  Browse Open Homes
                </Link>
              </div>
            ) : (
              <div className="searches-list">
                {registrations.map((reg) => (
                  <div key={reg.id} className="search-card">
                    <div className="search-header">
                      <h3>{reg.snapshot?.address || 'Property'}</h3>
                      {reg.status && reg.status !== 'pending' && (
                        <span className="new-badge">{reg.status}</span>
                      )}
                    </div>
                    <div className="search-criteria">
                      {reg.snapshot?.start_at ? (
                        <p>
                          <strong>Inspection:</strong> {formatInspectionWindow(reg.snapshot.start_at, reg.snapshot.end_at)}
                        </p>
                      ) : (
                        <p>Inspection time to be confirmed.</p>
                      )}
                    </div>
                    <div className="search-actions">
                      <Link href={`/property/${reg.property_id}`} className="view-button">
                        View Property
                      </Link>
                    </div>
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