'use client';

import { useState, useEffect } from 'react';
import { crmAPI } from '@/services/api';

export default function APITestPage() {
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setTestResults([]);
    
    const apiKey = process.env.NEXT_PUBLIC_CRM_API_KEY;
    const apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
    
    console.log('Testing API with:', {
      url: apiUrl,
      keySet: !!apiKey,
      keyLength: apiKey?.length,
      key: apiKey ? `${apiKey.substring(0, 10)}...` : 'Not set'
    });

    const results: any[] = [];

    try {
      // Test 1: Try the crmAPI service directly
      console.log('Testing crmAPI.properties.getProperties()...');
      try {
        const properties = await crmAPI.properties.getProperties({ type: 'all' });
        results.push({
          test: 'crmAPI.properties.getProperties()',
          success: true,
          data: properties
        });
      } catch (err) {
        results.push({
          test: 'crmAPI.properties.getProperties()',
          success: false,
          error: err instanceof Error ? err.message : String(err)
        });
      }

      // Test 2: Try different endpoints directly
      const endpoints = [
        '/properties',
        '/listings',
        '/listing',
        '/property',
        '/api/properties',
        '/api/listings',
        '/v1/properties',
        '/v1/listings',
        ''
      ];

      for (const endpoint of endpoints) {
        console.log(`Testing endpoint: ${apiUrl}${endpoint}`);
        
        try {
          const response = await fetch(`${apiUrl}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'X-API-Key': apiKey || '',
              'Api-Key': apiKey || '',
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors',
          });

          const text = await response.text();
          let data;
          
          try {
            data = JSON.parse(text);
          } catch {
            data = { raw: text.substring(0, 500) + (text.length > 500 ? '...' : '') };
          }

          const result = {
            endpoint: `${apiUrl}${endpoint}`,
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
            data
          };

          results.push(result);

          if (response.ok) {
            console.log(`Success with endpoint ${endpoint}!`);
            setApiResponse(result);
          }
        } catch (err) {
          results.push({
            endpoint: `${apiUrl}${endpoint}`,
            error: err instanceof Error ? err.message : String(err),
            type: err instanceof Error ? err.name : 'Unknown'
          });
          console.error(`Error with endpoint ${endpoint}:`, err);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('API Test Error:', err);
    } finally {
      setTestResults(results);
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
            <h2 className="text-xl font-semibold">API Test Results</h2>
            <button 
              onClick={testAPI}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Again'}
            </button>
          </div>
          
          {loading && <p className="text-gray-600">Running comprehensive API tests...</p>}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded mb-4">
              Error: {error}
            </div>
          )}
          
          {testResults.length > 0 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Note:</strong> Check the browser console (F12) for detailed logs.
                </p>
                <p className="text-sm text-blue-800">
                  Total tests run: {testResults.length}
                </p>
              </div>
              
              {testResults.map((result, index) => (
                <div key={index} className={`border rounded p-4 ${
                  result.success || result.ok || result.status === 200 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <h3 className="font-semibold mb-2">
                    {result.test || result.endpoint || `Test ${index + 1}`}
                  </h3>
                  
                  {result.status && (
                    <p className="text-sm mb-1">
                      Status: <span className={result.ok ? 'text-green-600' : 'text-red-600'}>
                        {result.status} {result.statusText}
                      </span>
                    </p>
                  )}
                  
                  {result.error && (
                    <p className="text-sm text-red-600 mb-2">
                      Error: {result.error}
                    </p>
                  )}
                  
                  {result.data && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                        View Response Data
                      </summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                  
                  {result.headers && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                        View Headers
                      </summary>
                      <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto text-xs">
                        {JSON.stringify(result.headers, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!loading && testResults.length === 0 && (
            <p className="text-gray-500">Click "Test Again" to run API tests</p>
          )}
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Debugging Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Check that environment variables are set in Vercel dashboard</li>
            <li>Verify the API key is valid with Vault RE</li>
            <li>Check browser console for CORS errors</li>
            <li>Try accessing the API URL directly in your browser</li>
            <li>Contact Vault RE support if authentication fails</li>
          </ol>
        </div>
      </div>
    </div>
  );
}