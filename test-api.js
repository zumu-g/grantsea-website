// Test script to fetch a property from VaultRE API
const fetch = require('node-fetch');

const API_URL = 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = 'nzinklyrqutvcdodhyaqyizcjflohlayxezuthan';

async function testAPI() {
  console.log('Testing VaultRE API...\n');
  
  const endpoints = [
    '/properties/residential/sale',
    '/properties',
    '/listings',
    '/properties/residential',
  ];

  for (const endpoint of endpoints) {
    console.log(`\nTrying endpoint: ${API_URL}${endpoint}`);
    
    try {
      const response = await fetch(`${API_URL}${endpoint}?limit=1`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'X-API-Key': API_KEY,
          'Api-Key': API_KEY,
          'Accept': 'application/json',
        },
      });

      console.log(`Status: ${response.status} ${response.statusText}`);
      
      const text = await response.text();
      
      try {
        const data = JSON.parse(text);
        console.log('Response:', JSON.stringify(data, null, 2));
        
        if (response.ok && data) {
          console.log('\n✅ Success! Found working endpoint.');
          break;
        }
      } catch (e) {
        console.log('Response (not JSON):', text.substring(0, 200));
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
}

testAPI();