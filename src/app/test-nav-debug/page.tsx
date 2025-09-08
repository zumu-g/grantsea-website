'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TestNavDebugPage() {
  const router = useRouter();

  const testNavigation = (method: string, url: string) => {
    console.log(`Testing navigation with ${method} to ${url}`);
    
    try {
      if (method === 'router.push') {
        router.push(url);
      } else if (method === 'router.replace') {
        router.replace(url);
      } else if (method === 'window.location.href') {
        window.location.href = url;
      } else if (method === 'window.location.assign') {
        window.location.assign(url);
      }
    } catch (error) {
      console.error(`Navigation error with ${method}:`, error);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Navigation Debug Page</h1>
      <p>Open the browser console to see navigation attempts</p>

      <div style={{ marginTop: '30px' }}>
        <h2>Test Property Routes</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => testNavigation('router.push', '/property/test')}
            style={{
              padding: '10px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            router.push(/property/test)
          </button>

          <button
            onClick={() => testNavigation('window.location.href', '/property/test')}
            style={{
              padding: '10px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            window.location.href(/property/test)
          </button>

          <Link href="/property/test" style={{
            padding: '10px',
            backgroundColor: '#f59e0b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Link Component(/property/test)
          </Link>

          <button
            onClick={() => {
              console.log('Direct onClick test');
              window.location.pathname = '/property/test';
            }}
            style={{
              padding: '10px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            window.location.pathname
          </button>
        </div>

        <h2 style={{ marginTop: '30px' }}>Test Other Routes</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => testNavigation('router.push', '/')}
            style={{
              padding: '10px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Home (/)
          </button>

          <button
            onClick={() => testNavigation('router.push', '/listings')}
            style={{
              padding: '10px',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Go to Listings (/listings)
          </button>
        </div>

        <h2 style={{ marginTop: '30px' }}>Navigation State</h2>
        <div style={{ marginTop: '10px', padding: '20px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <p>Current pathname: <code>{typeof window !== 'undefined' ? window.location.pathname : 'SSR'}</code></p>
          <p>Current href: <code>{typeof window !== 'undefined' ? window.location.href : 'SSR'}</code></p>
        </div>
      </div>
    </div>
  );
}