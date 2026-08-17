import ReviewsPageClient from './ReviewsPageClient';
import GoogleReviewCard, { Stars } from '@/components/GoogleReviewCard';
import { getGoogleReviewsOrThrow, GoogleReviewsData } from '@/lib/googleReviews';

// Segment-level ISR owns caching for the Google reviews fetch (6 hours).
export const revalidate = 21600;

function GoogleReviewsSection({ data }: { data: GoogleReviewsData }) {
  return (
    <section style={{ padding: '96px max(2rem, 3.33vw)', backgroundColor: '#f8f8f8' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '48px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            margin: '0 0 32px 0',
            color: '#000',
            fontFamily: '"Helvetica Neue", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          Google reviews
        </h2>

        {data.rating !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '64px', fontWeight: '800', lineHeight: '1', color: '#000' }}>
              {data.rating.toFixed(1)}
            </span>
            <div>
              <Stars rating={data.rating} size={18} />
              {data.count !== null && (
                <div style={{ fontSize: '14px', color: '#666', marginTop: '6px' }}>
                  from {data.count.toLocaleString('en-AU')} Google reviews
                </div>
              )}
            </div>
          </div>
        )}

        {data.reviews.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {data.reviews.map((review, i) => (
              <GoogleReviewCard key={i} review={review} />
            ))}
          </div>
        )}

        <div style={{ marginTop: '40px', fontSize: '13px', color: '#666' }}>
          powered by <span style={{ fontWeight: '700', color: '#000' }}>Google</span>
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const data = await getGoogleReviewsOrThrow();
  const hasReviews = data !== null && (data.reviews.length > 0 || data.rating !== null);
  return (
    <ReviewsPageClient
      googleReviewsSection={hasReviews ? <GoogleReviewsSection data={data} /> : undefined}
    />
  );
}
