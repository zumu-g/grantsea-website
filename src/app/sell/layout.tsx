import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb, realEstateAgent } from '@/lib/jsonLd';
import { getGoogleReviews } from '@/lib/googleReviews';
import RatingStrip from '@/components/RatingStrip';

export const metadata = pageMetadata.sell();
export const revalidate = 21600; // 6h ISR — refreshes Google rating data

export default async function SellLayout({ children }: { children: React.ReactNode }) {
  // Never-throw variant: a cold-cache fetch failure must not take down /sell
  // (the appraisal form is this page's real job) — the strip simply doesn't
  // render for one ISR window. Keep-last-good (getGoogleReviewsOrThrow) is
  // /reviews-only.
  const data = await getGoogleReviews();
  const hasRating = data !== null && data.rating !== null && data.count !== null;

  return (
    <>
      <JsonLd data={breadcrumb([["Sell", "/sell"]])} />
      {/* Root layout already emits the plain org node sitewide; only add the
          enriched variant here when live rating data exists (R5/R6). */}
      {hasRating && (
        <>
          <JsonLd
            data={realEstateAgent({
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: data!.rating,
                ratingCount: data!.count,
              },
            })}
          />
          {/* OncomHeader is position:fixed (60px mobile / 64px desktop); offset
              the strip below it so it isn't hidden behind the header. */}
          <div style={{ marginTop: '64px' }}>
            <RatingStrip rating={data!.rating!} count={data!.count!} />
          </div>
        </>
      )}
      {children}
    </>
  );
}
