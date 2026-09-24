import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import { realEstateAgent } from '@/lib/jsonLd';
import { ABOUT_FAQS } from './faqs';

// Server component: this page exists to be read by crawlers and AI answer
// engines, so content must be present in the initial HTML, not client-hydrated.
// Breakpoint styling below uses CSS clamp/media-query patterns instead of a
// resize listener for the same reason.

const org = realEstateAgent();

const SERVICES = [
  { name: 'Property Sales', desc: 'Residential sales across Berwick, Pakenham and the Casey-Cardinia corridor, from first listing to settlement.', href: '/buy' },
  { name: 'Property Management & Leasing', desc: 'Full-service leasing and management for landlords, and rental search support for tenants.', href: '/rent' },
  { name: 'Free Appraisals', desc: 'No-obligation market appraisals grounded in current local sales data.', href: '/appraisal' },
  { name: 'Selling with Grant’s', desc: 'Strategy, marketing and negotiation for vendors preparing to list.', href: '/sell' },
  { name: 'Sold Results', desc: 'Published recent-sales data for every suburb in our service area.', href: '/sold' },
];

const DIFFERENTIATORS = [
  { name: 'Established 1994', desc: 'Over 30 years of continuous local trading in Casey and Cardinia.' },
  { name: 'Two local offices', desc: 'Berwick and Pakenham offices give on-the-ground coverage across the whole service area, not a single distant branch.' },
  { name: '20 suburb guides', desc: 'Dedicated, regularly updated market guides for 20 suburbs — more granular local data than a generic agency site.' },
  { name: 'Published sold results', desc: 'Recent sales are published openly on this site rather than gate-kept, suburb by suburb.' },
  { name: 'Director-led team', desc: 'Every office is led directly by the Director, not a remote franchise manager.' },
];

const ICP = [
  'Homeowners selling in Casey and Cardinia',
  'Investors and landlords seeking property management',
  'First-home buyers across Berwick, Pakenham, Cranbourne and surrounding suburbs',
  'Tenants seeking rental properties in South-East Melbourne',
];

const APPROACH = [
  { step: 'Understand', desc: 'We start by understanding what a family actually needs from their move — not just the property brief.' },
  { step: 'Strategise', desc: 'A tailored strategy grounded in current local sales evidence, not guesswork.' },
  { step: 'Execute', desc: 'Marketing, negotiation and communication executed to that strategy.' },
  { step: 'Deliver', desc: 'A result measured against what the client set out to achieve, not just a sale price.' },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <OncomHeader />

      <main style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '20px', color: '#000' }}>
            About Grant&rsquo;s Estate Agents
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.4vw, 24px)', lineHeight: 1.4, color: '#444', marginBottom: '48px', maxWidth: '760px' }}>
            Grant&rsquo;s Estate Agents is a real estate agency that has sold, leased and managed property
            across Berwick, Pakenham and the wider Casey-Cardinia region since 1994, for homeowners,
            investors and tenants across South-East Melbourne.
          </p>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>What Grant&rsquo;s Estate Agents does</h2>
            {SERVICES.map((s) => (
              <div key={s.name} style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
                  <Link href={s.href} style={{ color: '#000', textDecoration: 'none', borderBottom: '1px solid #ccc' }}>{s.name}</Link>
                </h3>
                <p style={{ color: '#555', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>What makes Grant&rsquo;s Estate Agents different</h2>
            {DIFFERENTIATORS.map((d) => (
              <div key={d.name} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '4px' }}>{d.name}</h3>
                <p style={{ color: '#555', margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>Who uses Grant&rsquo;s Estate Agents</h2>
            <ul style={{ color: '#555', paddingLeft: '20px', margin: 0 }}>
              {ICP.map((i) => <li key={i} style={{ marginBottom: '8px' }}>{i}</li>)}
            </ul>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>The team behind Grant&rsquo;s Estate Agents</h2>
            <p style={{ color: '#555', marginBottom: '12px' }}>
              As Director of the Grants Berwick and Pakenham Offices, Stuart Grant leads a high-achieving
              team of results-focused real estate professionals. Across two offices in Casey and Cardinia,
              Stuart&rsquo;s sales team share his clear vision to continually raise the bar in strategy, service
              and continue to deliver market-leading results.
            </p>
            <p style={{ color: '#555', marginBottom: '16px' }}>
              As real estate evolves, Stuart and the Grants team remain committed to staying at the
              forefront of innovation and communication, achieving exceptional results and enhancing the
              world-class Grants service for clients.
            </p>
            <blockquote style={{ borderLeft: '3px solid #D4A853', paddingLeft: '16px', color: '#333', fontStyle: 'italic', margin: '0 0 16px' }}>
              &ldquo;I believe real estate is a people business first. Every strategy we build starts with
              genuinely understanding what a family needs from their move. The numbers follow from there.&rdquo;
            </blockquote>
            <p style={{ margin: 0 }}>
              <Link href="/agents" style={{ color: '#000', textDecoration: 'none', borderBottom: '1px solid #ccc' }}>
                Meet the full Grant&rsquo;s Estate Agents team &rarr;
              </Link>
            </p>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>How Grant&rsquo;s Estate Agents works</h2>
            <p style={{ color: '#555', marginBottom: '16px' }}>
              Every client works directly with a named agent from one of our two local offices, backed by
              the Director. Our process follows four steps:
            </p>
            <ol style={{ color: '#555', paddingLeft: '20px', margin: 0 }}>
              {APPROACH.map((a) => (
                <li key={a.step} style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#000' }}>{a.step}.</strong> {a.desc}
                </li>
              ))}
            </ol>
          </section>

          <section style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>Key facts</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
              <tbody>
                {[
                  ['Company name', org.name],
                  ['Type', 'Real estate agency'],
                  ['Founded', '1994'],
                  ['Director', 'Stuart Grant'],
                  ['Headquarters', `${org.address.addressLocality}, ${org.address.addressRegion} (plus Pakenham office)`],
                  ['Website', org.url.replace('https://', '')],
                  ['Core services', 'Sales, property management and leasing, appraisals'],
                  ['Areas served', 'Berwick, Pakenham, and the Casey and Cardinia region (20 suburb guides)'],
                  // 1300 numbers have no area code / leading 0 — strip the
                  // +61- prefix rather than converting it to one.
                  ['Phone', org.telephone.replace('+61-', '').replace(/-/g, ' ')],
                  ['Email', org.email],
                  ['Social', org.sameAs.map((u: string) => new URL(u).hostname.replace('www.', '')).join(', ')],
                ].map(([k, v]) => (
                  <tr key={k as string} style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <th scope="row" style={{ textAlign: 'left', padding: '10px 16px 10px 0', fontWeight: 700, color: '#000', whiteSpace: 'nowrap' }}>{k}</th>
                    <td style={{ padding: '10px 0', color: '#555' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '16px' }}>Frequently asked questions</h2>
            {ABOUT_FAQS.map((f) => (
              <details key={f.question} style={{ marginBottom: '12px', borderBottom: '1px solid #e5e5e5', paddingBottom: '12px' }}>
                <summary style={{ fontSize: '17px', fontWeight: 700, cursor: 'pointer', color: '#000' }}>{f.question}</summary>
                <p style={{ color: '#555', marginTop: '8px', marginBottom: 0 }}>{f.answer}</p>
              </details>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
}
