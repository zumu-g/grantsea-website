'use client';

// Change password while logged in.
// See docs/plans/2026-06-27-002-feat-real-auth-user-settings-plan.md (U6)

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { PasswordForm } from '@/components/PasswordForm';

const font = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const MIN_PASSWORD = 8;

export default function ChangePasswordPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) setError(updateError.message);
      else {
        setNotice('Password updated.');
        setPassword('');
        setConfirm('');
      }
    } finally {
      setBusy(false);
    }
  };

  if (!isLoading && !isAuthenticated) {
    return (
      <div style={{ fontFamily: font, maxWidth: 480, margin: '0 auto', padding: '160px 24px' }}>
        <p>Please sign in to change your password.</p>
        <button onClick={() => router.push('/')} style={{ marginTop: 16, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Go home</button>
      </div>
    );
  }

  return <PasswordForm title="Change password" {...{ password, setPassword, confirm, setConfirm, error, notice, busy, submit }} />;
}
