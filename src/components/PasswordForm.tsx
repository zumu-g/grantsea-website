'use client';

import React from 'react';

const font = '"Helvetica Neue", Helvetica, Arial, sans-serif';

// Shared form, also used by the reset page.
export function PasswordForm({
  title, password, setPassword, confirm, setConfirm, error, notice, busy, submit,
}: {
  title: string;
  password: string; setPassword: (v: string) => void;
  confirm: string; setConfirm: (v: string) => void;
  error: string; notice: string; busy: boolean;
  submit: (e: React.FormEvent) => void;
}) {
  const input: React.CSSProperties = {
    width: '100%', padding: '12px 16px', fontSize: 16, border: '1px solid #e8e8e8',
    borderRadius: 2, marginBottom: 16, boxSizing: 'border-box', fontFamily: font,
  };
  return (
    <div style={{ fontFamily: font, maxWidth: 480, margin: '0 auto', padding: '160px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 24 }}>{title}</h1>
      {error && <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: 2, marginBottom: 16 }}>{error}</div>}
      {notice && <div style={{ padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', borderRadius: 2, marginBottom: 16 }}>{notice}</div>}
      <form onSubmit={submit}>
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>New password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={input} required />
        <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Confirm new password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} style={input} required />
        <button type="submit" disabled={busy} style={{ width: '100%', background: busy ? '#f5f5f5' : '#000', color: busy ? '#999' : '#fff', border: 'none', borderRadius: 2, padding: 16, fontSize: 16, fontWeight: 500, cursor: busy ? 'not-allowed' : 'pointer', minHeight: 44 }}>
          {busy ? 'Saving…' : 'Update password'}
        </button>
      </form>
    </div>
  );
}

