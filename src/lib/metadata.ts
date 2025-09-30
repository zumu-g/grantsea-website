import { Metadata } from 'next';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    type?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

const defaultMetadata = {
  siteName: "Grant's Estate Agents",
  siteUrl: "https://grantsea.com.au",
  defaultTitle: "Grant's Estate Agents | Your Property Experts in Berwick & Casey",
  defaultDescription: "Find your perfect property with Grant's Estate Agents. Expert real estate services in Berwick, Casey, and surrounding areas.",
  defaultKeywords: [
    "real estate",
    "property",
    "houses for sale",
    "rental properties",
    "Berwick",
    "Casey",
    "Cardinia",
    "estate agents",
    "property management"
  ],
  defaultImage: "/og-image.jpg"
};

export function generateMetadata({
  title,
  description,
  keywords,
  openGraph,
  robots
}: GenerateMetadataProps = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${defaultMetadata.siteName}`
    : defaultMetadata.defaultTitle;

  const metaDescription = description || defaultMetadata.defaultDescription;
  const metaKeywords = keywords || defaultMetadata.defaultKeywords;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    authors: [{ name: defaultMetadata.siteName }],
    creator: defaultMetadata.siteName,
    publisher: defaultMetadata.siteName,
    metadataBase: new URL(defaultMetadata.siteUrl),
    openGraph: {
      title: openGraph?.title || metaTitle,
      description: openGraph?.description || metaDescription,
      url: defaultMetadata.siteUrl,
      siteName: defaultMetadata.siteName,
      images: openGraph?.images || [defaultMetadata.defaultImage],
      locale: 'en_AU',
      type: (openGraph?.type as any) || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraph?.title || metaTitle,
      description: openGraph?.description || metaDescription,
      images: openGraph?.images || [defaultMetadata.defaultImage],
    },
    robots: {
      index: robots?.index !== false,
      follow: robots?.follow !== false,
      googleBot: {
        index: robots?.index !== false,
        follow: robots?.follow !== false,
      },
    },
  };
}

// Page-specific metadata generators
export const pageMetadata = {
  home: (): Metadata => generateMetadata(),

  listings: (): Metadata => generateMetadata({
    title: "Property Listings",
    description: "Browse our latest properties for sale and rent in Berwick, Casey, and surrounding areas.",
    keywords: ["property listings", "houses for sale", "rental properties", "real estate listings"],
  }),

  property: (property: any): Metadata => generateMetadata({
    title: property.address,
    description: `${property.bedrooms} bed, ${property.bathrooms} bath property in ${property.suburb}. ${property.description?.substring(0, 150)}...`,
    openGraph: {
      title: property.address,
      description: property.description,
      images: property.images?.map((img: any) => img.url),
      type: 'website',
    },
  }),

  suburb: (suburbName: string): Metadata => generateMetadata({
    title: `${suburbName} Real Estate & Property`,
    description: `Discover properties for sale and rent in ${suburbName}. Local market insights, school information, and lifestyle guide.`,
    keywords: [
      `${suburbName} real estate`,
      `${suburbName} properties`,
      `${suburbName} houses for sale`,
      `${suburbName} suburb guide`
    ],
  }),

  about: (): Metadata => generateMetadata({
    title: "About Us",
    description: "Learn about Grant's Estate Agents - your trusted local property experts with years of experience in the Casey and Cardinia regions.",
    keywords: ["about us", "estate agents", "property experts", "local agents"],
  }),

  contact: (): Metadata => generateMetadata({
    title: "Contact Us",
    description: "Get in touch with Grant's Estate Agents. We're here to help with all your property needs.",
    keywords: ["contact", "get in touch", "property enquiry", "estate agent contact"],
  }),

  appraisal: (): Metadata => generateMetadata({
    title: "Free Property Appraisal",
    description: "Get a free, no-obligation property appraisal from our expert team. Discover your property's market value today.",
    keywords: ["property appraisal", "property valuation", "free appraisal", "market value"],
  }),

  sell: (): Metadata => generateMetadata({
    title: "Sell Your Property",
    description: "Sell your property with confidence. Our expert agents will guide you through every step of the selling process.",
    keywords: ["sell property", "selling guide", "property sale", "sell house"],
  }),

  buy: (): Metadata => generateMetadata({
    title: "Buy Property",
    description: "Find your dream home with our comprehensive property search. Expert guidance for property buyers.",
    keywords: ["buy property", "buying guide", "property purchase", "buy house"],
  }),

  rent: (): Metadata => generateMetadata({
    title: "Rental Properties",
    description: "Find rental properties in Berwick, Casey, and surrounding areas. Quality homes for rent.",
    keywords: ["rental properties", "houses for rent", "property rental", "lease property"],
  }),

  agents: (): Metadata => generateMetadata({
    title: "Our Agents",
    description: "Meet our team of experienced real estate agents. Local experts dedicated to your property success.",
    keywords: ["real estate agents", "property agents", "local agents", "agent team"],
  }),

  calculator: (): Metadata => generateMetadata({
    title: "Property Calculators",
    description: "Free property calculators - borrowing capacity, stamp duty, buying costs, and more.",
    keywords: ["property calculator", "borrowing capacity", "stamp duty calculator", "mortgage calculator"],
  }),

  blog: (): Metadata => generateMetadata({
    title: "Property Blog & News",
    description: "Latest property news, market updates, and expert insights from Grant's Estate Agents.",
    keywords: ["property blog", "real estate news", "market updates", "property insights"],
  }),
};