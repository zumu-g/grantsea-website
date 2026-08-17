import { JsonLd, breadcrumb } from '@/lib/jsonLd';

// No metadata export here — a layout canonical would cascade to every /rent/*
// sub-page. /rent/page.tsx is a client component, so it carries no page-level
// metadata for now.

export default function RentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Rent","/rent"]])} />
      {children}
    </>
  );
}
