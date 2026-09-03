import ArticleLayout from '@/components/ArticleLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Interior Design Trends 2026 | Grant's Estate Agents",
  description: 'The interior design trends buyers are responding to in South East Melbourne in 2026, and which ones are worth investing in before you sell.',
};

export default function TrendsArticle() {
  return (
    <ArticleLayout
      category="Home & lifestyle"
      title="Interior design trends shaping South East Melbourne homes in 2026"
      readTime="5 min read"
      intro="Not every trend is worth chasing before a sale — but a few genuinely change how buyers respond when they walk through the door. Here's what's showing up in the best-presented listings across Berwick, Clyde North and Officer this year."
      sections={[
        {
          heading: 'Warm, earthy palettes over cool greys',
          body: [
            'The cool grey-on-grey look that dominated the last decade is giving way to warmer neutrals — think terracotta, oatmeal, and soft olive tones. If you\'re repainting before selling, a warm white or soft greige reads as more current than a cold grey and appeals to a wider range of buyers.',
          ],
        },
        {
          heading: 'Textured, natural materials',
          body: [
            'Timber, rattan, linen and stone finishes are replacing high-gloss and heavily lacquered surfaces. You don\'t need a renovation to benefit — swapping out a few accessories (a rattan pendant light, linen cushions, a timber side table) can visually update a room for well under a few hundred dollars.',
          ],
        },
        {
          heading: 'Indoor-outdoor flow',
          body: [
            'With Casey and Cardinia\'s larger blocks and alfresco living, buyers are paying close attention to how a home connects to its outdoor space. Clearing sliding door tracks, cleaning glass, and staging the alfresco area with simple outdoor furniture makes that connection obvious in both photos and inspections.',
          ],
        },
        {
          heading: 'What\'s worth spending on before you sell',
          body: [
            'Cosmetic, reversible changes — paint, lighting, soft furnishings — consistently return more than they cost. Structural renovations rarely pay for themselves in the short window before a sale. If you\'re weighing up a bigger spend, it\'s worth getting an agent\'s read on what buyers in your specific suburb are actually responding to first.',
          ],
        },
      ]}
    />
  );
}
