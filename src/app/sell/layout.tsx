import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb, realEstateAgent } from '@/lib/jsonLd';
import { getGoogleReviewsOrThrow } from '@/lib/googleReviews';
import RatingStrip from '@/components/RatingStrip';

export const metadata = pageMetadata.sell();
export const revalidate = 21600; // 6h ISR — refreshes Google rating data

export default async function SellLayout({ children }: { children: React.ReactNode }) {
  const data = await getGoogleReviewsOrThrow();
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
                reviewCount: data!.count,
              },
            })}
          />
          <RatingStrip rating={data!.rating!} count={data!.count!} />
        </>
      )}
      {children}
    </>
  );
}
