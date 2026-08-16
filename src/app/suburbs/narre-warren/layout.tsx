import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Narre Warren');

export default function NarreWarrenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Narre Warren","/suburbs/narre-warren"]])} />
      {children}
    </>
  );
}
