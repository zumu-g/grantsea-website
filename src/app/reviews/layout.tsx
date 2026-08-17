import { JsonLd, breadcrumb } from '@/lib/jsonLd';
import { pageMetadata } from '@/lib/metadata';

// /reviews has no sub-pages, so layout-level metadata cannot cascade wrongly.
export const metadata = pageMetadata.reviews();

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([['Reviews', '/reviews']])} />
      {children}
    </>
  );
}
