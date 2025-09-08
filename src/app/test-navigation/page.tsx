'use client';

import Link from 'next/link';

export default function TestNavigation() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Test Navigation</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Link href="/property/123" style={{ color: 'blue', textDecoration: 'underline' }}>
          Test Link to Property 123
        </Link>
        
        <Link href="/property/test-id" style={{ color: 'blue', textDecoration: 'underline' }}>
          Test Link to Property test-id
        </Link>
        
        <button onClick={() => window.location.href = '/property/456'}>
          Button navigation to Property 456
        </button>
        
        <a href="/property/789" style={{ color: 'green', textDecoration: 'underline' }}>
          Regular anchor to Property 789
        </a>
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p>Click any link above to test if navigation is working.</p>
        <p>Check the console and network tab to see what happens.</p>
      </div>
    </div>
  );
}