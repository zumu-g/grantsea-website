import type { Metadata } from 'next';
import './globals.css';
import '@/lib/performance';

export const metadata: Metadata = {
  title: "Grant's Estate Agents | South East Melbourne Real Estate",
  description: 'Leading real estate agency in Casey and Cardinia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}