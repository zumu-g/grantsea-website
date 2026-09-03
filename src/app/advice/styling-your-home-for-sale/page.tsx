import ArticleLayout from '@/components/ArticleLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Styling Your Home for Sale | Grant's Estate Agents",
  description: 'Practical, budget-conscious styling tips to help your South East Melbourne home present its best in photos and inspections.',
};

export default function StylingArticle() {
  return (
    <ArticleLayout
      category="Preparing to sell"
      title="Styling your home for sale — what actually moves the needle"
      readTime="6 min read"
      intro="Professional styling can lift a sale price, but full-service staging isn't the only path there. Most of what makes a listing photograph and show well comes down to light, flow and a handful of low-cost changes any vendor can make themselves."
      sections={[
        {
          heading: 'Light is the biggest lever you have',
          body: [
            'Open every blind and curtain before photography and every inspection. Swap any dim or mismatched globes for bright, warm-white bulbs throughout the house — it\'s a five-dollar fix that shows up in every photo.',
            'If a room has one genuinely dark corner, a single well-placed lamp does more work than any styling accessory.',
          ],
        },
        {
          heading: 'Furniture placement over furniture buying',
          body: [
            'Before spending on new pieces, try pulling furniture away from walls to create breathing room, and removing one piece from any room that feels crowded — most Australian project homes are furnished for daily living, not for photography, and a lounge room with 20% less furniture almost always photographs larger.',
          ],
        },
        {
          heading: 'Neutral doesn\'t mean boring',
          body: [
            'A few plants, a neutral throw, and fresh linen on beds go a long way without needing a full styling package. Save any bolder colour or pattern for a single accent piece per room — anything more competes with the buyer\'s own imagination for the space.',
          ],
        },
        {
          heading: 'When professional staging is worth it',
          body: [
            'Vacant properties, or homes where the furniture genuinely works against the layout, are where paid staging earns its cost back most reliably. For an occupied family home in good order, targeted styling advice from your agent — informed by what\'s working in current Berwick, Officer and Cranbourne listings — is usually enough.',
          ],
        },
      ]}
      ctaHeadline="Want a second opinion on your home's presentation?"
      ctaSubtext="Book a free appraisal and we'll walk the property with you before it goes to market."
    />
  );
}
