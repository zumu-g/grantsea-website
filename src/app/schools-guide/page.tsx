'use client';

import React from 'react';
import Link from 'next/link';
import OncomHeader from '@/components/OncomHeader';
import OncomFooter from '@/components/OncomFooter';
import AIChatWidget from '@/components/AIChatWidget';

function SchoolsGuidePage() {
  const [selectedType, setSelectedType] = React.useState('all');
  const [selectedSuburb, setSelectedSuburb] = React.useState('all');

  const schools = [
    {
      name: 'Berwick Grammar School',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Officer',
      address: 'Officer Campus, 80 Tivendale Road',
      enrolments: '650',
      description: 'Independent co-educational school offering comprehensive education with strong academic and co-curricular programs.',
      features: ['IB Program', 'STEM Focus', 'Arts Excellence', 'Sports Academy']
    },
    {
      name: 'St Francis Xavier College',
      type: 'private',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '4 Beaconsfield-Emerald Road',
      enrolments: '1850',
      description: 'Catholic secondary college with two campuses, known for academic excellence and values-based education.',
      features: ['VCE & VCAL', 'Music Program', 'Leadership Development']
    },
    {
      name: 'Berwick Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '92 High Street',
      enrolments: '420',
      description: 'Historic state primary school established in 1867, offering quality education in a supportive environment.',
      features: ['STEM Program', 'School Band', 'Kitchen Garden']
    },
    {
      name: 'Harkaway Hills College',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Berwick',
      address: '92-112 Harkaway Road',
      enrolments: '320',
      description: 'Boutique independent school focused on individualized learning and small class sizes.',
      features: ['Small Classes', 'Personalized Learning', 'Outdoor Education']
    },
    {
      name: 'Kambrya College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Berwick',
      address: '68-74 Bemersyde Drive',
      enrolments: '1100',
      description: 'Government secondary college with strong pathways programs and modern facilities.',
      features: ['VET Programs', 'Arts Centre', 'Sports Excellence']
    },
    {
      name: 'Nossal High School',
      type: 'secondary',
      levels: 'Year 9 - Year 12',
      suburb: 'Berwick',
      address: '100 Cloverdale Road',
      enrolments: '880',
      description: 'Selective-entry state school for high-achieving students, with focus on academic excellence.',
      features: ['Select Entry', 'STEM Excellence', 'Research Programs']
    },
    {
      name: 'Brentwood Park Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Berwick',
      address: '21 Damon Road',
      enrolments: '680',
      description: 'Modern primary school with innovative learning spaces and technology integration.',
      features: ['Digital Learning', 'Languages Program', 'Environmental Focus']
    },
    {
      name: 'Fountain Gate Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Narre Warren',
      address: '11 Overland Drive',
      enrolments: '550',
      description: 'Diverse and inclusive school community with strong literacy and numeracy programs.',
      features: ['Multicultural Programs', 'Reading Recovery', 'School Garden']
    },
    {
      name: 'Narre Warren South P-12 College',
      type: 'combined',
      levels: 'Prep - Year 12',
      suburb: 'Narre Warren South',
      address: '1 Memorial Drive',
      enrolments: '1600',
      description: 'Comprehensive P-12 college offering continuous learning pathways from prep to VCE.',
      features: ['P-12 Pathways', 'VET Options', 'Performing Arts']
    },
    {
      name: 'Heritage College',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Officer',
      address: '8-24 Heritage Drive',
      enrolments: '1200',
      description: 'Christian college providing holistic education with strong academic and pastoral care.',
      features: ['Values Education', 'Chapel Program', 'Community Service']
    },
    {
      name: 'Pakenham Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Pakenham',
      address: '1020 Princes Highway',
      enrolments: '950',
      description: 'Regional secondary college with agricultural studies and trade training facilities.',
      features: ['Agriculture Program', 'Trade Training', 'VCAL Pathways']
    },
    {
      name: 'Beaconhills College',
      type: 'private',
      levels: 'Prep - Year 12',
      suburb: 'Pakenham',
      address: '30-34 Toomuc Valley Road',
      enrolments: '3200',
      description: 'Multi-campus independent school known for innovation and student wellbeing programs.',
      features: ['Innovation Hub', 'Wellbeing Program', 'Global Learning']
    },
    {
      name: 'Clyde Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Clyde',
      address: '130 Ballarto Road',
      enrolments: '720',
      description: 'Growing primary school serving new estates with modern facilities and programs.',
      features: ['New Facilities', 'STEM Lab', 'Community Hub']
    },
    {
      name: 'Officer Primary School',
      type: 'primary',
      levels: 'Prep - Year 6',
      suburb: 'Officer',
      address: '30 Tivendale Road',
      enrolments: '450',
      description: 'Community-focused school with strong partnerships and inclusive programs.',
      features: ['Inclusive Education', 'Parent Partnerships', 'Sustainability']
    },
    {
      name: 'Cranbourne East Secondary College',
      type: 'secondary',
      levels: 'Year 7 - Year 12',
      suburb: 'Cranbourne East',
      address: '80 Stawell Street',
      enrolments: '1300',
      description: 'New secondary college with state-of-the-art facilities and innovative curriculum.',
      features: ['New Campus', 'Technology Focus', 'Sports Academy']
    }
  ];

  const suburbs = ['all', ...new Set(schools.map(s => s.suburb))].sort();

  const filteredSchools = schools.filter(school => {
    const typeMatch = selectedType === 'all' ||
                      (selectedType === 'primary' && school.type === 'primary') ||
                      (selectedType === 'secondary' && (school.type === 'secondary' || school.type === 'combined')) ||
                      (selectedType === 'private' && school.type === 'private');
    const suburbMatch = selectedSuburb === 'all' || school.suburb === selectedSuburb;
    return typeMatch && suburbMatch;
  });

  if (!React) return null;

  return React.createElement(
    'div',
    { style: { minHeight: '100vh', backgroundColor: '#fff' } },
    React.createElement(OncomHeader, null),
    React.createElement(
      'div',
      { style: { paddingTop: '120px', paddingBottom: '80px' } },
      React.createElement(
        'div',
        { style: { backgroundColor: '#f8f8f8', padding: '80px 20px', marginBottom: '48px' } },
        React.createElement(
          'div',
          { style: { maxWidth: '1200px', margin: '0 auto', textAlign: 'center' } },
          React.createElement(
            'h1',
            { style: { fontSize: '48px', fontWeight: '300', marginBottom: '16px', letterSpacing: '-1px' } },
            "Grant's Schools Guide"
          ),
          React.createElement(
            'p',
            { style: { fontSize: '20px', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' } },
            "Comprehensive guide to primary and secondary schools in Casey and Cardinia. Find the perfect school for your family in Melbourne's southeast."
          )
        )
      ),
      React.createElement(
        'div',
        { style: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' } },
        React.createElement(
          'div',
          { style: { display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' } },
          React.createElement(
            'select',
            {
              value: selectedType,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedType(e.target.value),
              style: { padding: '12px 24px', fontSize: '16px', border: '1px solid #000', borderRadius: '2px', backgroundColor: '#fff', cursor: 'pointer', minWidth: '180px' }
            },
            React.createElement('option', { value: 'all' }, 'All School Types'),
            React.createElement('option', { value: 'primary' }, 'Primary Schools'),
            React.createElement('option', { value: 'secondary' }, 'Secondary Schools'),
            React.createElement('option', { value: 'private' }, 'Private Schools')
          ),
          React.createElement(
            'select',
            {
              value: selectedSuburb,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSuburb(e.target.value),
              style: { padding: '12px 24px', fontSize: '16px', border: '1px solid #000', borderRadius: '2px', backgroundColor: '#fff', cursor: 'pointer', minWidth: '180px' }
            },
            React.createElement('option', { value: 'all' }, 'All Suburbs'),
            ...suburbs.slice(1).map(suburb =>
              React.createElement('option', { key: suburb, value: suburb }, suburb)
            )
          ),
          React.createElement(
            'div',
            { style: { marginLeft: 'auto', color: '#666', fontSize: '16px', padding: '12px 0' } },
            `${filteredSchools.length} schools found`
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px', marginBottom: '64px' } },
          ...filteredSchools.map((school, idx) =>
            React.createElement(
              'div',
              {
                key: idx,
                style: { backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '32px', transition: 'all 0.2s', cursor: 'pointer' },
                onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                },
                onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              },
              React.createElement(
                'div',
                { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' } },
                React.createElement('h3', { style: { fontSize: '24px', fontWeight: '600', margin: 0, color: '#000' } }, school.name),
                React.createElement(
                  'span',
                  { style: { padding: '4px 12px', backgroundColor: school.type === 'private' ? '#AF272F' : '#000', color: '#fff', borderRadius: '4px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' } },
                  school.type
                )
              ),
              React.createElement('p', { style: { fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.5' } }, school.description),
              React.createElement(
                'div',
                { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '14px', color: '#333' } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, '📍 ', school.address),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, '📚 ', school.levels),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, '👥 ', `${school.enrolments} students`)
              ),
              React.createElement(
                'div',
                { style: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' } },
                ...school.features.map((feature, fIdx) =>
                  React.createElement(
                    'span',
                    { key: fIdx, style: { padding: '4px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '12px', color: '#666' } },
                    feature
                  )
                )
              ),
              React.createElement(
                'a',
                {
                  href: '#',
                  style: { fontSize: '14px', fontWeight: '600', color: '#AF272F', textDecoration: 'none' },
                  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.textDecoration = 'underline'; },
                  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.textDecoration = 'none'; }
                },
                'Learn More →'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { style: { backgroundColor: '#AF272F', color: '#fff', borderRadius: '12px', padding: '48px', textAlign: 'center', marginTop: '64px' } },
          React.createElement('h2', { style: { fontSize: '32px', fontWeight: '400', marginBottom: '16px' } }, 'Looking for Properties Near Great Schools?'),
          React.createElement(
            'p',
            { style: { fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' } },
            'Our local experts can help you find the perfect home in your preferred school catchment area.'
          ),
          React.createElement(
            'div',
            { style: { display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' } },
            React.createElement(
              Link,
              {
                href: '/search',
                style: { display: 'inline-block', padding: '16px 32px', backgroundColor: '#fff', color: '#AF272F', textDecoration: 'none', borderRadius: '2px', fontSize: '16px', fontWeight: '600', transition: 'all 0.2s' }
              },
              'Search Properties'
            ),
            React.createElement(
              Link,
              {
                href: '/appraisal',
                style: { display: 'inline-block', padding: '16px 32px', backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff', textDecoration: 'none', borderRadius: '2px', fontSize: '16px', fontWeight: '600', transition: 'all 0.2s' }
              },
              'Get Property Appraisal'
            )
          )
        )
      )
    ),
    React.createElement(OncomFooter, null),
    React.createElement(AIChatWidget, null)
  );
}

export default SchoolsGuidePage;