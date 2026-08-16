// Server component: answer-shaped suburb Q&A rendered visibly AND emitted as
// FAQPage JSON-LD from the same array (single source). Every number comes from
// real VaultRE data (getSuburbSalesStats / live listing counts) — questions
// depending on withheld stats are simply omitted.
import { SuburbSalesStats } from '@/lib/serverProperties';
import { JsonLd, faqPage } from '@/lib/jsonLd';
import { formatPrice } from '@/services/api';

export function buildSuburbQAs(
  suburb: string,
  stats: SuburbSalesStats | null,
  currentListingCount: number,
  asAt: string
): { question: string; answer: string }[] {
  const qas: { question: string; answer: string }[] = [];
  if (stats) {
    qas.push({
      question: `What have houses sold for in ${suburb} recently?`,
      answer: `Grant's Estate Agents sold ${stats.saleCount} properties in ${suburb} over the 12 months to ${stats.asAt}, with a median sale price of ${formatPrice(stats.medianPrice)}. Sale prices vary with property size, condition and location within ${suburb}, so contact us for a free appraisal of your specific home.`,
    });
    if (stats.daysOnMarket !== null) {
      qas.push({
        question: `How long do homes take to sell in ${suburb}?`,
        answer: `Across ${stats.saleCount} sales by Grant's Estate Agents in ${suburb} over the 12 months to ${stats.asAt}, homes took an average of ${stats.daysOnMarket} days from listing to unconditional sale. Well-presented, well-priced homes typically sell faster than that average.`,
      });
    }
  }
  if (currentListingCount > 0) {
    qas.push({
      question: `How many homes are for sale in ${suburb} right now?`,
      answer: `As at ${asAt}, Grant's Estate Agents has ${currentListingCount} ${currentListingCount === 1 ? 'property' : 'properties'} listed for sale in ${suburb}. Listings change daily, so browse our current ${suburb} properties for sale or register for property alerts to hear about new listings first.`,
    });
  }
  qas.push({
    question: `Who is a local real estate agent in ${suburb}?`,
    answer: `Grant's Estate Agents is a long-established local agency serving ${suburb} and Melbourne's south-east, with an office in Berwick VIC 3806. Call 1300 472 687 or email info@grantsea.com.au for sales, rentals and property management enquiries, or to book a free market appraisal.`,
  });
  return qas;
}

export default function SuburbFAQ({
  suburb,
  stats,
  currentListingCount,
  asAt,
}: {
  suburb: string;
  stats: SuburbSalesStats | null;
  currentListingCount: number;
  asAt: string;
}) {
  const qas = buildSuburbQAs(suburb, stats, currentListingCount, asAt);
  if (!qas.length) return null;
  return (
    <section style={{ padding: 'max(2rem, 3.33vw)', backgroundColor: '#fff', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>
        {suburb} property questions, answered
      </h2>
      {qas.map((qa) => (
        <div key={qa.question} style={{ marginBottom: '24px', maxWidth: '720px' }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{qa.question}</h3>
          <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#333', margin: 0 }}>{qa.answer}</p>
        </div>
      ))}
      <JsonLd data={faqPage(qas)} />
    </section>
  );
}
