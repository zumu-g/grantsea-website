'use client';

import Link from 'next/link';

interface SellerCTAProps {
  headline?: string;
  subtext?: string;
  isMobile?: boolean;
}

// Reusable "book a free appraisal" prompt for pages that currently have no
// seller-facing call to action (calculators, guides, etc). Links to the
// existing /appraisal page, which already delivers via /api/lead.
export default function SellerCTA({
  headline = 'Thinking about selling?',
  subtext = 'Get a free, no-obligation appraisal from a local agent.',
  isMobile = false,
}: SellerCTAProps) {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      padding: isMobile ? '40px 24px' : '60px',
      borderRadius: '16px',
      textAlign: 'center',
    }}>
      <h3 style={{
        fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: 400,
        marginBottom: '16px',
      }}>
        {headline}
      </h3>
      <p style={{
        fontSize: isMobile ? '16px' : '18px',
        marginBottom: '32px',
        opacity: 0.9,
      }}>
        {subtext}
      </p>
      <Link
        href="/appraisal"
        style={{
          display: 'inline-block',
          backgroundColor: '#fff',
          color: '#000',
          padding: '16px 40px',
          fontSize: '18px',
          fontWeight: 500,
          borderRadius: '32px',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        Book a Free Appraisal
      </Link>
    </div>
  );
}
