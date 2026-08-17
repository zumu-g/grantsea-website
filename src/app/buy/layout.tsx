import { JsonLd, breadcrumb } from '@/lib/jsonLd';

// Metadata lives in page.tsx, not here — a layout metadata export (with its
// canonical) would cascade to every /buy/* sub-page.

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Buy","/buy"]])} />
      {children}
    </>
  );
}
