import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Grant's Estate Agents | South East Melbourne Real Estate",
  description: 'Leading real estate agency in Casey and Cardinia',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
  themeColor: '#000000',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Grant's Estate Agents",
  },
  formatDetection: {
    telephone: false,
  },
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