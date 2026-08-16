import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Beaconsfield');

export default function BeaconsfieldLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Beaconsfield","/suburbs/beaconsfield"]])} />
      {children}
    </>
  );
}
