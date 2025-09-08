'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TestSimpleNavPage() {
  const router = useRouter();
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].substring(0, 8);
    setLog(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  return (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Simple Navigation Test</h1>
      
      <div style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
        <div 
          onClick={() => {
            addLog('Simple div clicked - attempting navigation to /property/test');
            router.push('/property/test');
          }}
          style={{
            padding: '20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          Click me to navigate to /property/test
        </div>

        <a 
          href="/property/test"
          onClick={(e) => {
            addLog('Anchor tag clicked');
          }}
          style={{
            padding: '20px',
            backgroundColor: '#10b981',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '8px',
            textAlign: 'center',
            display: 'block',
            textDecoration: 'none'
          }}
        >
          Regular anchor tag to /property/test
        </a>

        <button
          onClick={() => {
            addLog('Button clicked - using window.location');
            window.location.pathname = '/property/test';
          }}
          style={{
            padding: '20px',
            backgroundColor: '#f59e0b',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px'
          }}
        >
          Button with window.location.pathname
        </button>

        <div 
          onClick={() => {
            addLog('Testing router.push to home');
            router.push('/');
          }}
          style={{
            padding: '20px',
            backgroundColor: '#8b5cf6',
            color: 'white',
            cursor: 'pointer',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          Navigate to Home (/)
        </div>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '8px',
        maxHeight: '300px',
        overflow: 'auto'
      }}>
        <h3>Event Log:</h3>
        <pre style={{ fontFamily: 'monospace', fontSize: '14px' }}>
          {log.length === 0 ? 'No events yet...' : log.join('\n')}
        </pre>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>Current URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
      </div>
    </div>
  );
}