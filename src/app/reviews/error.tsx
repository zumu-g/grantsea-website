'use client';

// Segment error boundary for /reviews: catches a cold-cache Google reviews
// fetch failure (getGoogleReviewsOrThrow) so the route degrades gracefully.
import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';

export default function ReviewsError() {
  return (
    <>
      <OncomHeader />
      <main
        style={{
          paddingTop: '200px',
          minHeight: '100vh',
          backgroundColor: '#fff',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <section style={{ padding: '0 max(2rem, 3.33vw) 96px' }}>
          <h1
            style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 24px 0',
              color: '#000',
            }}
          >
            Reviews are temporarily unavailable
          </h1>
          <p style={{ fontSize: '18px', color: '#666', margin: '0 0 32px 0', maxWidth: '600px' }}>
            We couldn&apos;t load our reviews right now. Please try again shortly.
          </p>
          <Link
            href="/"
            style={{
              fontSize: '16px',
              color: '#000',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Back to home
          </Link>
        </section>
      </main>
    </>
  );
}
