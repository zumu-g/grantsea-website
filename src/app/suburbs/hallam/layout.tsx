import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Hallam');

export default function HallamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Hallam","/suburbs/hallam"]])} />
      {children}
    </>
  );
}
