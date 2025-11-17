'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { useAuth } from '@/contexts/AuthContext';

interface Alert {
  id: string;
  name: string;
  criteria: {
    suburb?: string[];
    propertyType?: string[];
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number[];
    bathrooms?: number[];
    listingType?: 'sale' | 'lease' | 'both';
    keywords?: string;
  };
  frequency: 'instant' | 'daily' | 'weekly';
  createdAt: Date;
  active: boolean;
}

export default function PropertyAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState<Alert | null>(null);
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Load alerts from localStorage (in production, this would be from API)
  useEffect(() => {
    const savedAlerts = localStorage.getItem('propertyAlerts');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  const saveAlert = (alert: Alert) => {
    const newAlerts = editingAlert
      ? alerts.map(a => a.id === alert.id ? alert : a)
      : [...alerts, alert];

    setAlerts(newAlerts);
    localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
    setShowCreateModal(false);
    setEditingAlert(null);
  };

  const deleteAlert = (id: string) => {
    const newAlerts = alerts.filter(a => a.id !== id);
    setAlerts(newAlerts);
    localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
  };

  const toggleAlert = (id: string) => {
    const newAlerts = alerts.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    );
    setAlerts(newAlerts);
    localStorage.setItem('propertyAlerts', JSON.stringify(newAlerts));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{
        paddingTop: isMobile ? '180px' : '200px',
        paddingBottom: isMobile ? '60px' : '96px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '180px 20px 60px' : '200px 40px 96px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px'
        }}>
          <div>
            <h1 style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: '700',
              marginBottom: '8px',
              letterSpacing: '-0.02em'
            }}>
              Property Alerts
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#666'
            }}>
              Get notified when properties matching your criteria become available
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Create Alert
          </button>
        </div>

        {alerts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: '#f8f8f8',
            borderRadius: '12px'
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" style={{ margin: '0 auto 24px' }}>
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>No alerts yet</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              Create your first alert to get notified about new properties
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                padding: '12px 32px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '24px'
          }}>
            {alerts.map(alert => (
              <div
                key={alert.id}
                style={{
                  padding: '24px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '12px',
                  backgroundColor: alert.active ? '#fff' : '#f8f8f8',
                  opacity: alert.active ? 1 : 0.7
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: '16px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      marginBottom: '4px'
                    }}>
                      {alert.name}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      {alert.frequency === 'instant' && '🚀 Instant notifications'}
                      {alert.frequency === 'daily' && '📅 Daily summary'}
                      {alert.frequency === 'weekly' && '📊 Weekly digest'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: alert.active ? '#e8f5e9' : '#ffebee',
                        color: alert.active ? '#2e7d32' : '#c62828',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {alert.active ? 'Active' : 'Paused'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingAlert(alert);
                        setShowCreateModal(true);
                      }}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteAlert(alert.id)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: '1px solid #e5e5e5',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {alert.criteria.suburb && (
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '16px',
                      fontSize: '14px'
                    }}>
                      📍 {alert.criteria.suburb.join(', ')}
                    </span>
                  )}
                  {alert.criteria.propertyType && (
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '16px',
                      fontSize: '14px'
                    }}>
                      🏠 {alert.criteria.propertyType.join(', ')}
                    </span>
                  )}
                  {(alert.criteria.minPrice || alert.criteria.maxPrice) && (
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '16px',
                      fontSize: '14px'
                    }}>
                      💰 ${alert.criteria.minPrice || 0} - ${alert.criteria.maxPrice || 'Any'}
                    </span>
                  )}
                  {alert.criteria.bedrooms && (
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '16px',
                      fontSize: '14px'
                    }}>
                      🛏️ {alert.criteria.bedrooms.join('-')} beds
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create/Edit Alert Modal */}
      {showCreateModal && (
        <CreateAlertModal
          alert={editingAlert}
          onSave={saveAlert}
          onClose={() => {
            setShowCreateModal(false);
            setEditingAlert(null);
          }}
        />
      )}
    </div>
  );
}

function CreateAlertModal({
  alert,
  onSave,
  onClose
}: {
  alert: Alert | null;
  onSave: (alert: Alert) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Alert>>({
    name: alert?.name || '',
    criteria: alert?.criteria || {
      listingType: 'sale',
      suburb: [],
      propertyType: [],
      bedrooms: []
    },
    frequency: alert?.frequency || 'instant',
    active: alert?.active !== false
  });

  const suburbs = [
    'Berwick', 'Narre Warren', 'Cranbourne', 'Pakenham', 'Officer',
    'Clyde', 'Clyde North', 'Hallam', 'Hampton Park', 'Endeavour Hills'
  ];

  const propertyTypes = [
    'House', 'Unit', 'Apartment', 'Townhouse', 'Land', 'Acreage'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: Alert = {
      id: alert?.id || Date.now().toString(),
      name: formData.name || 'New Alert',
      criteria: formData.criteria || {},
      frequency: formData.frequency || 'instant',
      createdAt: alert?.createdAt || new Date(),
      active: formData.active !== false
    };
    onSave(newAlert);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
            {alert ? 'Edit Alert' : 'Create Alert'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Alert Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Family homes in Berwick"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Listing Type
            </label>
            <select
              value={formData.criteria?.listingType}
              onChange={(e) => setFormData({
                ...formData,
                criteria: { ...formData.criteria, listingType: e.target.value as any }
              })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="sale">For Sale</option>
              <option value="lease">For Rent</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Suburbs
            </label>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {suburbs.map(suburb => (
                <label
                  key={suburb}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    border: '1px solid #e5e5e5',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: formData.criteria?.suburb?.includes(suburb) ? '#000' : '#fff',
                    color: formData.criteria?.suburb?.includes(suburb) ? '#fff' : '#000'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.criteria?.suburb?.includes(suburb)}
                    onChange={(e) => {
                      const suburbs = formData.criteria?.suburb || [];
                      const newSuburbs = e.target.checked
                        ? [...suburbs, suburb]
                        : suburbs.filter(s => s !== suburb);
                      setFormData({
                        ...formData,
                        criteria: { ...formData.criteria, suburb: newSuburbs }
                      });
                    }}
                    style={{ display: 'none' }}
                  />
                  {suburb}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Notification Frequency
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            >
              <option value="instant">Instant</option>
              <option value="daily">Daily Summary</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '1px solid #e5e5e5',
                backgroundColor: '#fff',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {alert ? 'Save Changes' : 'Create Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}