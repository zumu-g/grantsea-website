'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import SellerCTA from '@/components/SellerCTA';

interface ArticleSection {
  heading: string;
  body: string[];
}

interface ArticleLayoutProps {
  category: string;
  title: string;
  intro: string;
  readTime: string;
  sections: ArticleSection[];
  ctaHeadline?: string;
  ctaSubtext?: string;
}

export default function ArticleLayout({
  category,
  title,
  intro,
  readTime,
  sections,
  ctaHeadline,
  ctaSubtext,
}: ArticleLayoutProps) {
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
        <article style={{
          maxWidth: '760px',
          margin: '0 auto',
          padding: isMobile ? '0 20px 80px' : '0 max(2rem, 3.33vw) 120px',
        }}>
          <nav style={{ marginBottom: '32px', fontSize: '14px', color: '#666' }}>
            <Link href="/advice" style={{ color: '#666', textDecoration: 'none' }}>Advice</Link>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#000' }}>{category}</span>
          </nav>

          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#AF272F',
            marginBottom: '16px',
          }}>
            {category} &middot; {readTime}
          </p>

          <h1 style={{
            fontFamily: '"Essonnes Display", "On", Helvetica, sans-serif',
            fontSize: isMobile ? '36px' : '52px',
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '24px',
            color: '#000',
          }}>
            {title}
          </h1>

          <p style={{
            fontSize: isMobile ? '18px' : '20px',
            lineHeight: 1.6,
            color: '#444',
            marginBottom: '48px',
          }}>
            {intro}
          </p>

          {sections.map((section, i) => (
            <section key={i} style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: isMobile ? '22px' : '26px',
                fontWeight: 700,
                marginBottom: '16px',
                color: '#000',
              }}>
                {section.heading}
              </h2>
              {section.body.map((paragraph, j) => (
                <p key={j} style={{
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#333',
                  marginBottom: '16px',
                }}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div style={{ marginTop: '64px' }}>
            <SellerCTA
              headline={ctaHeadline || 'Ready to find out what your home is worth?'}
              subtext={ctaSubtext || 'Get a free, no-obligation appraisal from a local agent.'}
              isMobile={isMobile}
            />
          </div>
        </article>
      </main>

      <OncomFooter />
    </>
  );
}
