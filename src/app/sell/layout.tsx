import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb } from '@/lib/jsonLd';

export const metadata = pageMetadata.sell();

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["Sell","/sell"]])} />
      {children}
    </>
  );
}
