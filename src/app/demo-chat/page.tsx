'use client';

import React from 'react';
import AIChatBoxBlue from '@/components/AIChatBoxBlue';

export default function DemoChatPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F1F5F9',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          color: '#1E293B',
          marginBottom: '16px',
          fontFamily: '"Helvetica Neue", Arial, sans-serif'
        }}>
          AI Chat Box Demo
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#64748B',
          marginBottom: '48px',
          lineHeight: '1.6'
        }}>
          Blue and white themed AI chat assistant with stroke border. Click the chat button in the bottom right corner to try it out!
        </p>

        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '16px',
          border: '2px solid #3B82F6',
          marginBottom: '40px',
          textAlign: 'left'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#1E293B',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#3B82F6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            Features
          </h2>
          
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {[
              'Blue gradient header with white text',
              '2px solid blue stroke border',
              'Clean white background for messages',
              'Smooth hover animations',
              'Responsive message bubbles',
              'Professional AI assistant icon'
            ].map((feature, index) => (
              <li key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                color: '#475569'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#3B82F6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3B82F6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
              Modern Design
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Clean blue and white theme with professional styling
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3B82F6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
              Interactive Chat
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Real-time messaging with smooth animations
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#3B82F6',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
              Secure Border
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              2px solid blue stroke for clear definition
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#F8FAFC',
          padding: '32px',
          borderRadius: '16px',
          border: '2px dashed #CBD5E1'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1E293B',
            marginBottom: '16px'
          }}>
            Usage Instructions
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#64748B',
            lineHeight: '1.6'
          }}>
            The AI chat box appears as a floating button in the bottom right corner. Click it to open the chat interface. 
            The design features a blue gradient header, white message area with light gray background, and a clean input field 
            with a blue send button. All elements have a 2px blue stroke border for clear visual definition.
          </p>
        </div>
      </div>

      {/* AI Chat Box Component */}
      <AIChatBoxBlue />
    </div>
  );
}