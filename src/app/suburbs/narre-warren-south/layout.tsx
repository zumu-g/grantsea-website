import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Narre Warren South');

export default function NarreWarrenSouthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Narre Warren South","/suburbs/narre-warren-south"]])} />
      {children}
    </>
  );
}
