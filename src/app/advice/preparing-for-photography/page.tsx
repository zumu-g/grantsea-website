import ArticleLayout from '@/components/ArticleLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Preparing Your Home for Listing Photography | Grant's Estate Agents",
  description: 'A pre-photography checklist to make sure your listing photos do your home justice from the very first day it goes live.',
};

export default function PhotographyArticle() {
  return (
    <ArticleLayout
      category="Preparing to sell"
      title="Preparing your home for listing photography"
      readTime="4 min read"
      intro="Your listing photos get more views in the first 48 hours than most open homes get in a month. Getting the property camera-ready before the photographer arrives is one of the highest-leverage things a vendor can do."
      sections={[
        {
          heading: 'The week before',
          body: [
            'Mow and edge the lawn, trim any overgrown hedges, and clear the driveway and street frontage of bins, cars and hoses. Kerb appeal photos set the tone for every image that follows, so this is worth doing even if the shoot is a week away and the lawn needs a second cut before then.',
          ],
        },
        {
          heading: 'The day before',
          body: [
            'Clear every kitchen bench, bathroom vanity and laundry surface completely. Remove personal items from bedside tables, put pet bowls and bedding out of sight, and do a full walkthrough putting away anything that wouldn\'t be in a display home.',
            'Open all blinds and curtains and clean every window and glass door — natural light is the single biggest factor in how bright and spacious a photo looks.',
          ],
        },
        {
          heading: 'The morning of',
          body: [
            'Make every bed, turn on all the lights (even during the day — it adds warmth to interior shots), and do a final walk-through five minutes before the photographer arrives. Put pets in the car or with a neighbour if possible; even the best-behaved pet can make a shoot take twice as long.',
          ],
        },
        {
          heading: 'Don\'t forget the small stuff',
          body: [
            'Toilet lids down, cushions plumped, toothbrushes and toiletries out of sight, and remote controls tidied away. These take two minutes and are the details buyers notice — and remember — when scrolling past dozens of other listings.',
          ],
        },
      ]}
    />
  );
}
