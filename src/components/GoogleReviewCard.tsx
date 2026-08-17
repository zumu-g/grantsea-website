// Server component: a single Google review card. Review text is
// server-rendered; only the avatar is a client leaf (onError fallback).
import React from 'react';
import ReviewAvatar from './ReviewAvatar';
import type { GoogleReview } from '@/lib/googleReviews';

export function Stars({ rating, size = 14, color = '#000' }: { rating: number; size?: number; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} width={size} height={size} viewBox="0 0 24 24" fill={star <= Math.round(rating) ? color : '#e5e5e5'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviewCard({ review }: { review: GoogleReview }) {
  const authorName = review.profileUrl ? (
    <a
      href={review.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontWeight: '700', fontSize: '16px', color: '#000', textDecoration: 'none' }}
    >
      {review.author}
    </a>
  ) : (
    <span style={{ fontWeight: '700', fontSize: '16px', color: '#000' }}>{review.author}</span>
  );

  return (
    <div
      style={{
        padding: '32px',
        backgroundColor: '#fff',
        border: '1px solid #e5e5e5',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <ReviewAvatar photoUrl={review.photoUrl} author={review.author} />
        <div style={{ minWidth: 0 }}>
          {authorName}
          {review.relativeTime && (
            <div style={{ fontSize: '13px', color: '#999', marginTop: '2px' }}>{review.relativeTime}</div>
          )}
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Stars rating={review.rating} />
      </div>
      {review.text && (
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#000', margin: 0, flex: 1 }}>{review.text}</p>
      )}
    </div>
  );
}
