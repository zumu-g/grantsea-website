import ArticleLayout from '@/components/ArticleLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How to Declutter Your Home Before Selling | Grant's Estate Agents",
  description: 'A room-by-room guide to decluttering your Casey and Cardinia home before it goes to market, so buyers see space, not stuff.',
};

export default function DeclutterArticle() {
  return (
    <ArticleLayout
      category="Preparing to sell"
      title="How to declutter your home before selling"
      readTime="5 min read"
      intro="Buyers walking through a Berwick, Pakenham or Cranbourne home for the first time decide within seconds whether they can picture themselves living there. Clutter is the number one thing that gets in the way — and it's also the cheapest, fastest fix available to any vendor."
      sections={[
        {
          heading: 'Start with what buyers see first',
          body: [
            "Entryways, kitchen benches and living room surfaces get the most visual attention in listing photos and during inspections. Clear every bench of appliances you don't use daily, remove shoes and coats from the entry, and pack away anything that doesn't earn its place on display.",
            'A good test: if you haven\'t touched an item in the last month, it belongs in a box for your next home, not on a shelf for this one.',
          ],
        },
        {
          heading: 'Depersonalise without stripping the warmth',
          body: [
            'Family photos, kids\' artwork and personal collections make a house feel like your home — which is exactly the problem when you want a buyer to imagine it as theirs. Pack most of it away, but leave a few neutral, tasteful pieces so the rooms don\'t feel clinical.',
          ],
        },
        {
          heading: 'Tackle storage, not just surfaces',
          body: [
            'Buyers open wardrobes, pantries and linen cupboards. An overstuffed wardrobe signals "not enough storage" even if the house has plenty — it\'s reading the clutter, not the cupboard. Aim for wardrobes around two-thirds full and garages with a clear walking path.',
          ],
        },
        {
          heading: 'Where to put it all',
          body: [
            'A garage sale, local buy-nothing group, or a week\'s hire of a small storage unit are all cheaper than the price reduction a cluttered listing can cost you. If you\'re not sure what to keep visible for photography and what to pack away first, ask your agent — walking the property with fresh eyes is part of what a good pre-sale consult is for.',
          ],
        },
      ]}
    />
  );
}
