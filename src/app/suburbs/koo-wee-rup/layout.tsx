import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.suburb('Koo Wee Rup');

export default function KooWeeRupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Suburbs","/suburbs"],["Koo Wee Rup","/suburbs/koo-wee-rup"]])} />
      {children}
    </>
  );
}
