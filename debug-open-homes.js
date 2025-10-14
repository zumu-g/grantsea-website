// Using Node.js built-in fetch (Node 18+)

const API_BASE_URL = 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = 'igLctQ47aj3qYl1vvHitt8gx3S9u59dpaW2m9ixE';
const ACCESS_TOKEN = 'nzinklyrqutvcdodhyaqyizcjflohlayxezuthan';

async function debugOpenHomes() {
  console.log('Fetching open homes from VaultRE API...\n');

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    // Try different endpoints to find open homes
    console.log('Testing different endpoints for open homes data...\n');
    
    // Test 1: Try property-specific endpoint
    const propertyId = '31765985';
    const endpoints = [
      `/properties/residential/sale/${propertyId}/openHomes`,
      `/properties/residential/sale/${propertyId}/inspections`,
      `/properties/residential/sale/${propertyId}`,
      `/properties/${propertyId}/openHomes`,
      `/properties/${propertyId}/inspections`,
      `/openHomes?propertyId=${propertyId}`,
      `/inspections?propertyId=${propertyId}`
    ];

    for (const endpoint of endpoints) {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`\nTrying: ${url}`);
      
      try {
        const response = await fetch(url, {
          headers,
          method: 'GET'
        });

        console.log('Response status:', response.status);
        
        if (response.status === 200) {
          const text = await response.text();
          const data = JSON.parse(text);
          
          // Check if data contains open homes or inspection information
          console.log('✅ Success! Checking for inspection data...');
          
          // Log the keys to understand structure
          console.log('Top-level keys:', Object.keys(data));
          
          // If it's the openHomes endpoint with items
          if (data.items !== undefined) {
            console.log(`\nFound ${data.totalItems || 0} open homes for this property`);
            console.log('Items:', JSON.stringify(data.items, null, 2));
          }
          
          // Check for various possible inspection fields
          const inspectionFields = ['openHomes', 'inspections', 'inspectionTimes', 'viewings', 'openTimes'];
          for (const field of inspectionFields) {
            if (data[field]) {
              console.log(`Found ${field}:`, JSON.stringify(data[field], null, 2));
            }
          }
          
          // For full property endpoint, check nested data
          if (data.data) {
            console.log('Checking data.* for inspection fields...');
            for (const field of inspectionFields) {
              if (data.data[field]) {
                console.log(`Found data.${field}:`, JSON.stringify(data.data[field], null, 2));
              }
            }
          }
        } else {
          const errorText = await response.text();
          console.log(`❌ Error ${response.status}: ${errorText}`);
        }
      } catch (err) {
        console.log('❌ Request failed:', err.message);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugOpenHomes();