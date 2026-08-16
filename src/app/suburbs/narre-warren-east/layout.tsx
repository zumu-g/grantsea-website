import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Narre Warren East');

export default function NarreWarrenEastLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Narre Warren East","/suburbs/narre-warren-east"]])} />
      {children}
    </>
  );
}
