'use client';

import React, { useState } from 'react';

// Tiny client leaf: renders the Google author photo with an onError fallback
// to an initials circle. Review text stays server-rendered in the parent.
export default function ReviewAvatar({ photoUrl, author }: { photoUrl: string | null; author: string }) {
  const [failed, setFailed] = useState(false);

  const initials = author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  if (!photoUrl || failed) {
    return (
      <div
        aria-hidden="true"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#f0f0f0',
          color: '#666',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '600',
          flexShrink: 0,
        }}
      >
        {initials || '?'}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl}
      alt={author}
      width={40}
      height={40}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
    />
  );
}
