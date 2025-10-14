// Test script to verify inspection times fix
// Run with: node test-inspection-fix.js

const API_BASE_URL = 'http://localhost:3000/api';

async function testPropertyInspections() {
  console.log('Testing inspection times for 10 History Lane (Property ID: 31765985)\n');
  
  try {
    // Test 1: Fetch specific property
    console.log('1. Fetching property 31765985...');
    const propertyResponse = await fetch(`${API_BASE_URL}/properties/31765985`);
    
    if (!propertyResponse.ok) {
      console.error(`Error: ${propertyResponse.status} ${propertyResponse.statusText}`);
      return;
    }
    
    const propertyData = await propertyResponse.json();
    const property = propertyData.data;
    
    console.log(`   ✓ Property found: ${property.address}`);
    console.log(`   ✓ Inspection times: ${property.inspectionTimes ? property.inspectionTimes.length : 0}`);
    
    if (property.inspectionTimes && property.inspectionTimes.length > 0) {
      console.log('\n   Inspection Times:');
      property.inspectionTimes.forEach((inspection, index) => {
        const start = new Date(inspection.startTime);
        const end = new Date(inspection.endTime);
        console.log(`   ${index + 1}. ${start.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} - ${end.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne', hour: 'numeric', minute: '2-digit', hour12: true })}`);
        console.log(`      ID: ${inspection.id}, Type: ${inspection.type}`);
      });
    } else {
      console.log('\n   ❌ No inspection times found');
    }
    
    // Test 2: Fetch all properties and check if 10 History Lane is included
    console.log('\n2. Fetching all properties...');
    const allPropertiesResponse = await fetch(`${API_BASE_URL}/properties?listingType=sale`);
    
    if (allPropertiesResponse.ok) {
      const allPropertiesData = await allPropertiesResponse.json();
      const historyLane = allPropertiesData.data.find(p => p.id === '31765985');
      
      if (historyLane) {
        console.log(`   ✓ Found in properties list`);
        console.log(`   ✓ Has inspection times: ${historyLane.inspectionTimes && historyLane.inspectionTimes.length > 0 ? 'Yes' : 'No'}`);
      } else {
        console.log(`   ❌ Not found in properties list`);
      }
    }
    
    // Test 3: Direct VaultRE API check
    console.log('\n3. Checking VaultRE API directly...');
    const vaultHeaders = {
      'x-api-key': 'igLctQ47aj3qYl1vvHitt8gx3S9u59dpaW2m9ixE',
      'Authorization': 'Bearer nzinklyrqutvcdodhyaqyizcjflohlayxezuthan'
    };
    
    const vaultResponse = await fetch(
      'https://ap-southeast-2.api.vaultre.com.au/api/v1.3/openHomes?propertyId=31765985&limit=10',
      { headers: vaultHeaders }
    );
    
    if (vaultResponse.ok) {
      const vaultData = await vaultResponse.json();
      console.log(`   ✓ VaultRE returned ${vaultData.items?.length || 0} open homes`);
    }
    
    console.log('\n✅ Test complete!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Run the test
testPropertyInspections();