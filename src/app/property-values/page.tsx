import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getSuburbValues } from '@/lib/valuesGuide';
import { JsonLd, breadcrumb, realEstateAgent } from '@/lib/jsonLd';
import ValuesGuideClient from './ValuesGuideClient';

// KTD3: not statically prerendered (fetch uses next.revalidate, not build-time
// SSG), not fully dynamic either — the client component reads ?suburb= via
// useSearchParams inside <Suspense>, keeping this server component free of
// searchParams so the route stays cache-eligible.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Casey & Cardinia Property Values | Grant's Estate Agents",
  description:
    "See real median house and unit values for every suburb in the City of Casey and Shire of Cardinia, with 3-month, 12-month and 5-year change, sourced from Valuer-General Victoria data and recent sales.",
  alternates: { canonical: 'https://grantsea.com.au/property-values' },
};

export default async function PropertyValuesPage() {
  // Missing env (deploy mistake) -> null -> configuration-error state.
  // A throw (non-OK response / bad schemaVersion) propagates: Next's data
  // cache keeps serving the last good cached payload for this route while
  // the origin is down (R13), rather than rendering a broken page.
  const payload = await getSuburbValues();

  if (!payload) {
    return (
      <main style={{ padding: '80px 24px', textAlign: 'center', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <h1>Property values guide unavailable</h1>
        <p>This page is temporarily misconfigured. Please check back shortly.</p>
      </main>
    );
  }

  return (
    <>
      <JsonLd
        data={[
          realEstateAgent(),
          breadcrumb([['Property values', '/property-values']]),
        ]}
      />
      <Suspense fallback={<div style={{ padding: '80px 24px' }}>Loading…</div>}>
        <ValuesGuideClient payload={payload} />
      </Suspense>
    </>
  );
}
