import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.sold();

export default function SoldLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([['Home', '/'], ['Recent Sales', '/sold']])} />
      {children}
    </>
  );
}
