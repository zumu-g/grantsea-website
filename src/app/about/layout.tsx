import { pageMetadata } from '@/lib/metadata';
import { JsonLd, breadcrumb, faqPage } from '@/lib/jsonLd';
import { ABOUT_FAQS } from './faqs';

export const metadata = pageMetadata.about();

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb([["About", "/about"]])} />
      {/* Root layout already emits the sitewide RealEstateAgent org node. */}
      <JsonLd data={faqPage(ABOUT_FAQS)} />
      {children}
    </>
  );
}
