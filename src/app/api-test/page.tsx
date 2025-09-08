'use client';

import { useEffect, useState } from 'react';
import { crmAPI } from '@/services/api';

export default function APITestPage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testAPI() {
      const tests: any = {};
      
      try {
        // Test 1: Get featured properties
        console.log('Testing getFeaturedProperties...');
        const featured = await crmAPI.properties.getFeaturedProperties();
        tests.featured = featured;
      } catch (error) {
        tests.featured = { error: error instanceof Error ? error.message : 'Unknown error' };
      }

      try {
        // Test 2: Get all properties
        console.log('Testing getProperties...');
        const allProps = await crmAPI.properties.getProperties({ limit: 10 });
        tests.allProperties = allProps;
      } catch (error) {
        tests.allProperties = { error: error instanceof Error ? error.message : 'Unknown error' };
      }

      try {
        // Test 3: Direct fetch to /listings endpoint
        console.log('Testing direct fetch to /listings...');
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_URL}/listings?per_page=10`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRM_API_KEY}`,
              'X-API-Key': process.env.NEXT_PUBLIC_CRM_API_KEY || '',
              'Api-Key': process.env.NEXT_PUBLIC_CRM_API_KEY || '',
            }
          }
        );
        const responseText = await response.text();
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          data = { parseError: true, rawText: responseText };
        }
        tests.directFetch = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          data: data
        };
      } catch (error) {
        tests.directFetch = { error: error instanceof Error ? error.message : 'Unknown error' };
      }

      try {
        // Test 4: Test featured endpoint specifically
        console.log('Testing featured endpoint...');
        const featuredResponse = await fetch(
          `${process.env.NEXT_PUBLIC_CRM_API_URL}/listings?featured=true&per_page=6`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRM_API_KEY}`,
              'Content-Type': 'application/json',
            }
          }
        );
        const featuredText = await featuredResponse.text();
        let featuredData;
        try {
          featuredData = JSON.parse(featuredText);
        } catch (e) {
          featuredData = { parseError: true, rawText: featuredText };
        }
        tests.featuredDirect = {
          status: featuredResponse.status,
          statusText: featuredResponse.statusText,
          data: featuredData
        };
      } catch (error) {
        tests.featuredDirect = { error: error instanceof Error ? error.message : 'Unknown error' };
      }

      setResults(tests);
      setLoading(false);
    }

    testAPI();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      {loading ? (
        <p>Testing API endpoints...</p>
      ) : (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify({
                API_URL: process.env.NEXT_PUBLIC_CRM_API_URL,
                API_KEY: process.env.NEXT_PUBLIC_CRM_API_KEY ? 'Set (hidden)' : 'Not set'
              }, null, 2)}
            </pre>
          </div>

          {Object.entries(results).map(([key, value]) => (
            <div key={key}>
              <h2 className="text-xl font-semibold mb-2">{key}</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}