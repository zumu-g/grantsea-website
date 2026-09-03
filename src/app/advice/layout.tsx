import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Advice for Home Owners | Grant's Estate Agents",
  description: 'Practical guides for preparing, styling and selling your home in Melbourne\'s south-east — decluttering, styling, photography prep and interior design trends.',
};

export default function AdviceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
