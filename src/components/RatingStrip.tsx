// Server component: slim Google-rating strip shown above page content.
import React from 'react';
import Link from 'next/link';
import { Stars } from './GoogleReviewCard';

export default function RatingStrip({ rating, count }: { rating: number; count: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '10px max(2rem, 3.33vw)',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e5e5e5',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <Stars rating={rating} size={14} />
      <span style={{ fontSize: '14px', color: '#000' }}>
        <strong>{rating.toFixed(1)}</strong> from {count} Google reviews
      </span>
      <Link
        href="/reviews"
        style={{
          fontSize: '14px',
          color: '#000',
          textDecoration: 'underline',
          textUnderlineOffset: '3px',
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '44px',
        }}
      >
        Read our reviews
      </Link>
      <span style={{ fontSize: '12px', color: '#999' }}>powered by Google</span>
    </div>
  );
}
