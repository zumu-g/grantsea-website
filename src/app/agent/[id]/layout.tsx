import { JsonLd, breadcrumb, realEstateAgent, faqPage } from '@/lib/jsonLd';
import { APPRAISAL_FAQ } from '@/data/agentProfiles';

// Server shim: the agent bio page is a client component, so the org-level
// RealEstateAgent node, breadcrumb, and appraisal FAQ schema render here server-side.
export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          realEstateAgent(),
          breadcrumb([['Our Agents', '/agents']]),
          faqPage(APPRAISAL_FAQ),
        ]}
      />
      {children}
    </>
  );
}
