'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';

const articles = [
  {
    slug: 'declutter-before-selling',
    category: 'Preparing to sell',
    title: 'How to declutter your home before selling',
    excerpt: 'A room-by-room guide to decluttering before your home goes to market.',
    readTime: '5 min read',
  },
  {
    slug: 'styling-your-home-for-sale',
    category: 'Preparing to sell',
    title: 'Styling your home for sale — what actually moves the needle',
    excerpt: 'Practical, budget-conscious styling tips that make a real difference in photos and inspections.',
    readTime: '6 min read',
  },
  {
    slug: 'preparing-for-photography',
    category: 'Preparing to sell',
    title: 'Preparing your home for listing photography',
    excerpt: 'A pre-photography checklist so your listing photos do your home justice from day one.',
    readTime: '4 min read',
  },
  {
    slug: 'interior-design-trends-2026',
    category: 'Home & lifestyle',
    title: 'Interior design trends shaping South East Melbourne homes in 2026',
    excerpt: 'The trends buyers are responding to this year, and which are worth investing in before you sell.',
    readTime: '5 min read',
  },
];

export default function AdvicePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <>
      <OncomHeader />
      <main style={{ paddingTop: isMobile ? '90px' : '160px', backgroundColor: '#fff' }}>
        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 20px 40px' : '0 max(2rem, 3.33vw) 60px',
        }}>
          <h1 style={{
            fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
            fontSize: isMobile ? '40px' : '64px',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            color: '#000',
          }}>
            Advice for home owners
          </h1>
          <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#666', maxWidth: '600px' }}>
            Practical guides for preparing, styling and selling your home in Melbourne's south-east.
          </p>
        </section>

        <section style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 20px 80px' : '0 max(2rem, 3.33vw) 120px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '32px' : '40px',
          }}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/advice/${article.slug}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  color: 'inherit',
                  padding: isMobile ? '24px' : '32px',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e5e5'; }}
              >
                <p style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#AF272F',
                  marginBottom: '12px',
                }}>
                  {article.category} &middot; {article.readTime}
                </p>
                <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: '#000' }}>
                  {article.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <OncomFooter />
    </>
  );
}
