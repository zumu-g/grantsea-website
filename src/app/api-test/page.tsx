'use client';

import { useState, useEffect } from 'react';

export default function APITestPage() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    
    const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
    
    console.log('Testing API with:', {
      url: apiUrl,
      keySet: !!apiKey,
      keyLength: apiKey?.length
    });

    try {
      // Test 1: Try different endpoints
      const endpoints = [
        '/properties',
        '/listings',
        '/api/properties',
        '/api/listings',
        ''
      ];

      for (const endpoint of endpoints) {
        console.log(`Testing endpoint: ${endpoint}`);
        
        try {
          const response = await fetch(`${apiUrl}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'X-API-Key': apiKey || '',
              'Api-Key': apiKey || '',
              'Accept': 'application/json',
            },
          });

          const text = await response.text();
          let data;
          
          try {
            data = JSON.parse(text);
          } catch {
            data = { raw: text };
          }

          setApiResponse({
            endpoint,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data
          });

          if (response.ok) {
            console.log(`Success with endpoint ${endpoint}!`);
            break;
          }
        } catch (err) {
          console.error(`Error with endpoint ${endpoint}:`, err);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('API Test Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium">API URL:</dt>
              <dd className="text-gray-600">{process.env.NEXT_PUBLIC_CRM_API_URL || 'Not set'}</dd>
            </div>
            <div>
              <dt className="font-medium">API Key Set:</dt>
              <dd className="text-gray-600">{process.env.NEXT_PUBLIC_CRM_API_KEY ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">API Response</h2>
            <button 
              onClick={testAPI}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Again'}
            </button>
          </div>
          
          {loading && <p>Loading...</p>}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
              Error: {error}
            </div>
          )}
          
          {apiResponse && (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-xs">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}