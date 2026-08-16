import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Endeavour Hills');

export default function EndeavourHillsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Endeavour Hills","/suburbs/endeavour-hills"]])} />
      {children}
    </>
  );
}
