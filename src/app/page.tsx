import { getGoogleReviews } from '@/lib/googleReviews';
import RatingStrip from '@/components/RatingStrip';
import HomePageOncom from './page-oncom-style';

export const revalidate = 21600; // 6h ISR — refreshes Google rating data

// Same never-throw pattern as sell/layout.tsx: a cold-cache fetch failure
// must not take down the homepage — the strip simply doesn't render for one
// ISR window.
export default async function HomePage() {
  const data = await getGoogleReviews();
  const hasRating = data !== null && data.rating !== null && data.count !== null;

  return (
    <>
      {/* OncomHeader is rendered inside HomePageOncom and is position:fixed
          (60px mobile / 64px desktop) — offset the strip below it, same as
          sell/layout.tsx, or the fixed header covers it. */}
      {hasRating && (
        <div style={{ marginTop: '64px' }}>
          <RatingStrip rating={data!.rating!} count={data!.count!} />
        </div>
      )}
      <HomePageOncom />
    </>
  );
}
