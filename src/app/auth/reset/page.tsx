'use client';

// Landing page from the password-reset email. Supabase establishes a recovery
// session from the link; we let the user set a new password.
// See docs/plans/2026-06-27-002-feat-real-auth-user-settings-plan.md (U6)

import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { PasswordForm } from '@/components/PasswordForm';

const font = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const MIN_PASSWORD = 8;

export default function ResetPasswordPage() {
  const [ready, setReady] = React.useState<'checking' | 'ok' | 'invalid'>('checking');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [error, setError] = React.useState('');
  const [notice, setNotice] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  React.useEffect(() => {
    const supabase = createClient();
    // The recovery session arrives via the URL; getSession resolves once it's set.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady('ok');
    });
    supabase.auth.getSession().then(({ data }) => {
      setReady((prev) => (prev === 'ok' ? prev : data.session ? 'ok' : 'invalid'));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

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
      else setNotice('Password reset. You can now sign in with your new password.');
    } finally {
      setBusy(false);
    }
  };

  if (ready === 'checking') {
    return <div style={{ fontFamily: font, maxWidth: 480, margin: '0 auto', padding: '160px 24px' }}>Checking your reset link…</div>;
  }
  if (ready === 'invalid') {
    return (
      <div style={{ fontFamily: font, maxWidth: 480, margin: '0 auto', padding: '160px 24px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Link invalid or expired</h1>
        <p style={{ color: '#666' }}>Request a new password reset from the sign-in screen.</p>
      </div>
    );
  }

  return <PasswordForm title="Set a new password" {...{ password, setPassword, confirm, setConfirm, error, notice, busy, submit }} />;
}
