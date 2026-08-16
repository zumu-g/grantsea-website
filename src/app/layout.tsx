import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import FloatingAI from '@/components/FloatingAI';
import { AuthProvider } from '@/contexts/AuthContext';
import { JsonLd, realEstateAgent } from '@/lib/jsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://grantsea.com.au'),
  title: "Grant's Estate Agents | South East Melbourne Real Estate | Berwick, Narre Warren, Cranbourne",
  description: 'Grant\'s Estate Agents - Leading real estate agency in Casey and Cardinia. Buy, sell, and rent properties in Berwick, Narre Warren, Cranbourne, Pakenham, and Officer. Expert local agents with 25+ years experience.',
  keywords: 'real estate, property, houses for sale, rental properties, Berwick real estate, Narre Warren properties, Cranbourne homes, Casey real estate, Cardinia properties, Melbourne southeast property, Grant\'s Estate Agents',
  authors: [{ name: "Grant's Estate Agents" }],
  creator: "Grant's Estate Agents",
  publisher: "Grant's Estate Agents",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Grant's Estate Agents | Your Local Property Experts",
    description: 'Find your dream home with Grant\'s Estate Agents. Trusted real estate services in Berwick, Narre Warren, Cranbourne, and surrounding areas.',
    url: 'https://grantsea.com.au',
    siteName: "Grant's Estate Agents",
    locale: 'en_AU',
    type: 'website',
    images: [{
      url: 'https://grantsea.com.au/og-image.jpg',
      width: 1200,
      height: 630,
      alt: "Grant's Estate Agents - Southeast Melbourne Real Estate"
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Grant's Estate Agents | Southeast Melbourne Real Estate",
    description: 'Your trusted local real estate experts in Casey and Cardinia',
    images: ['https://grantsea.com.au/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover',
  themeColor: '#000000',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Grant's Estate Agents",
  },
  formatDetection: {
    telephone: false,
  },
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        <meta name="geo.region" content="AU-VIC" />
        <meta name="geo.placename" content="Melbourne" />
        <meta name="geo.position" content="-38.0395;145.3464" />
        <meta name="ICBM" content="-38.0395, 145.3464" />
        
        {/* Structured Data for AI Crawlers */}
        <JsonLd data={realEstateAgent()} />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <FloatingAI />
        </AuthProvider>
        
        {/* Google Analytics 4 — rendered only when a measurement ID is configured */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        {/* Additional Schema Markup Helper */}
        <Script id="schema-website" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Grant's Estate Agents",
              "alternateName": ["Grants Real Estate", "Grants Estate Agents Melbourne"],
              "url": "https://grantsea.com.au",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://grantsea.com.au/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}