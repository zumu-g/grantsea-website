'use client';

export default function DebugAPIStatus({ 
  properties, 
  loading, 
  error, 
  source 
}: { 
  properties: any[]; 
  loading: boolean; 
  error: string | null; 
  source: string;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_CRM_API_URL;
  const apiKeySet = !!process.env.NEXT_PUBLIC_CRM_API_KEY;
  
  // Only show in development
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg max-w-sm z-50 text-xs">
      <h3 className="font-bold mb-2">🔍 API Debug ({source})</h3>
      <div className="space-y-1">
        <p>API URL: {apiUrl || 'NOT SET'}</p>
        <p>API Key: {apiKeySet ? 'SET' : 'NOT SET'}</p>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Properties: {properties.length} items</p>
        <p>Data Source: {properties.length > 0 ? 'API' : error ? 'MOCK (due to error)' : 'EMPTY'}</p>
      </div>
    </div>
  );
}