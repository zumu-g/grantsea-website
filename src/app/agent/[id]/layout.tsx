import { JsonLd, breadcrumb, realEstateAgent } from '@/lib/jsonLd';

// Server shim: the agent bio page is a client component, so the org-level
// RealEstateAgent node and breadcrumb are rendered here server-side.
export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[realEstateAgent(), breadcrumb([['Our Agents', '/agents']])]} />
      {children}
    </>
  );
}
