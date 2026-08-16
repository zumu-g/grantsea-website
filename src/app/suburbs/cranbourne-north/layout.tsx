import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Cranbourne North');

export default function CranbourneNorthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Cranbourne North","/suburbs/cranbourne-north"]])} />
      {children}
    </>
  );
}
