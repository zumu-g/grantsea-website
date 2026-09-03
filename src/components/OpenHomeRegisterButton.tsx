'use client';

// One-tap open-home registration, shared backend with the iOS app.
// Calls the register-open-home edge function (JWT), which resolves the open
// home server-side, writes a CRM enquiry and upserts a CRM contact.
// openHomeId MUST be the raw VaultRE open-home id (e.g. "32089198").

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import AuthModal from './AuthModal';

interface OpenHomeRegisterButtonProps {
  propertyId: string;
  openHomeId: string;
}

// Registrations for the current user, fetched once per page load and shared
// across every button instance. Keyed by user id so a sign-in mid-session refetches.
let registrationsCache: { userId: string; promise: Promise<Set<string>> } | null = null;

function fetchRegisteredIds(userId: string): Promise<Set<string>> {
  if (registrationsCache && registrationsCache.userId === userId) {
    return registrationsCache.promise;
  }
  const supabase = createClient();
  const promise = Promise.resolve(
    supabase
      .from('open_home_registrations')
      .select('open_home_id')
      .eq('user_id', userId)
  ).then(({ data }) => new Set<string>((data ?? []).map((r: any) => String(r.open_home_id))));
  registrationsCache = { userId, promise };
  return promise;
}

export default function OpenHomeRegisterButton({ propertyId, openHomeId }: OpenHomeRegisterButtonProps) {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [inFlight, setInFlight] = useState(false);
  const [error, setError] = useState('');
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!user) {
      setRegistered(false);
      return;
    }
    let cancelled = false;
    fetchRegisteredIds(user.id).then((ids) => {
      if (!cancelled && ids.has(openHomeId)) setRegistered(true);
    });
    return () => {
      cancelled = true;
    };
  }, [user, openHomeId]);

  const doRegister = async () => {
    if (!user) return;
    setInFlight(true);
    setError('');
    try {
      const supabase = createClient();
      const { data, error: fnError } = await supabase.functions.invoke('register-open-home', {
        body: { propertyId, openHomeId, source: 'GEA website' },
      });
      if (fnError) {
        // Supabase surfaces non-2xx as FunctionsHttpError; read the body for detail.
        let detail = '';
        try {
          const body = await (fnError as any).context?.json?.();
          detail = body?.error ?? '';
        } catch {
          /* ignore */
        }
        throw new Error(detail || 'Registration failed. Please try again.');
      }
      if (data?.error) throw new Error(data.error);
      setRegistered(true);
      registrationsCache = null; // next page load refetches fresh state
    } catch (e: any) {
      setError(e?.message || 'Registration failed. Please try again.');
    } finally {
      setInFlight(false);
    }
  };

  const handleClick = async () => {
    if (registered || inFlight) return;
    if (!isAuthenticated || !user) {
      setShowAuthModal(true);
      return;
    }
    // Mirror-not-block: offer to add a phone number once, but never require it.
    if (!user.phone && !showPhonePrompt) {
      setShowPhonePrompt(true);
      return;
    }
    await doRegister();
  };

  const savePhoneAndRegister = async () => {
    setShowPhonePrompt(false);
    const trimmed = phone.trim();
    if (trimmed) {
      await updateProfile({ phone: trimmed });
    }
    await doRegister();
  };

  if (registered) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'gea-register-in 300ms ease-out',
        }}
      >
        <style>{`@keyframes gea-register-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <span
          style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#000',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
          }}
        >
          You&apos;re registered — the agent has been notified
        </span>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '8px' }}>
        {showPhonePrompt ? (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile (optional)"
              autoFocus
              style={{
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '13px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                width: '160px',
              }}
            />
            <button
              onClick={savePhoneAndRegister}
              disabled={inFlight}
              style={{
                padding: '10px 16px',
                minHeight: '44px',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
              }}
            >
              Register
            </button>
            <button
              onClick={() => {
                setShowPhonePrompt(false);
                doRegister();
              }}
              disabled={inFlight}
              style={{
                padding: '10px 8px',
                background: 'none',
                border: 'none',
                fontSize: '13px',
                color: '#666',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
              }}
            >
              Skip
            </button>
          </div>
        ) : (
          <button
            onClick={handleClick}
            disabled={inFlight}
            style={{
              padding: '10px 20px',
              minHeight: '44px',
              backgroundColor: inFlight ? '#f5f5f5' : '#fff',
              color: '#000',
              border: '2px solid #000',
              borderRadius: '0',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: inFlight ? 'wait' : 'pointer',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              transition: 'all 200ms ease-out',
            }}
          >
            {inFlight ? 'Registering…' : 'Register'}
          </button>
        )}
        {error && (
          <span
            style={{
              fontSize: '12px',
              color: '#c0392b',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}
          >
            {error}
          </span>
        )}
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
