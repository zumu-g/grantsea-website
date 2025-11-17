'use client';

import { useEffect, useState } from 'react';
import { useProperties } from '@/hooks/useProperties';

export default function DebugPropertiesPage() {
  const { properties, loading, error, refetch } = useProperties({ 
    featured: true, 
    limit: 6 
  });
  
  const [rawApiCall, setRawApiCall] = useState<any>(null);
  
  useEffect(() => {
    // Make a raw API call to see what we're getting
    async function debugAPI() {
      try {
        const response = await fetch('/api/debug-vault');
        const data = await response.json();
        setRawApiCall(data);
      } catch (err) {
        setRawApiCall({ error: err instanceof Error ? err.message : 'Unknown error' });
      }
    }
    debugAPI();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Debug Properties Page</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">useProperties Hook Result</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
            <p><strong>Error:</strong> {error || 'None'}</p>
            <p><strong>Properties Count:</strong> {properties.length}</p>
            {properties.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">First Property Sample:</h3>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(properties[0], null, 2)}
                </pre>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Raw API Debug Call</h2>
          <div className="bg-gray-100 p-4 rounded">
            {rawApiCall ? (
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(rawApiCall, null, 2)}
              </pre>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-gray-100 p-4 rounded">
            <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_CRM_API_URL || 'Not set'}</p>
            <p><strong>API Key:</strong> {process.env.NEXT_PUBLIC_CRM_API_KEY ? 'Set (hidden)' : 'Not set'}</p>
          </div>
        </section>

        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Refetch Properties
        </button>
      </div>
    </div>
  );
}