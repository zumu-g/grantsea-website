import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Beaconsfield Upper');

export default function BeaconsfieldUpperLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Beaconsfield Upper","/suburbs/beaconsfield-upper"]])} />
      {children}
    </>
  );
}
