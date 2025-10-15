// Test the updated open homes functionality
const API_BASE_URL = 'http://localhost:3000/api';

async function testUpdatedOpenHomes() {
  console.log('Testing updated open homes functionality...\n');
  
  try {
    // Test 1: Check specific property 31765985 (10 History Lane)
    console.log('1️⃣ Testing property 31765985 (10 History Lane)...');
    const propertyResponse = await fetch(`${API_BASE_URL}/properties/31765985`);
    
    if (propertyResponse.ok) {
      const propertyData = await propertyResponse.json();
      const property = propertyData.data;
      
      console.log(`   ✓ Property: ${property.address}`);
      console.log(`   ✓ Inspection times: ${property.inspectionTimes?.length || 0}`);
      
      if (property.inspectionTimes && property.inspectionTimes.length > 0) {
        console.log('\n   📅 Open Home Times:');
        property.inspectionTimes.forEach((inspection, index) => {
          const start = new Date(inspection.startTime);
          const end = new Date(inspection.endTime);
          console.log(`   ${index + 1}. ${start.toLocaleString('en-AU', { 
            weekday: 'long',
            day: 'numeric', 
            month: 'long',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Australia/Melbourne' 
          })} - ${end.toLocaleTimeString('en-AU', { 
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Australia/Melbourne' 
          })}`);
        });
      }
    } else {
      console.log(`   ✗ Failed: ${propertyResponse.status}`);
    }
    
    // Test 2: Check general open homes endpoint
    console.log('\n\n2️⃣ Testing general open homes endpoint...');
    const openHomesResponse = await fetch(`${API_BASE_URL}/open-homes`);
    
    if (openHomesResponse.ok) {
      const openHomesData = await openHomesResponse.json();
      const openHomes = openHomesData.data || [];
      
      console.log(`   ✓ Total upcoming open homes: ${openHomes.length}`);
      
      // Group by property
      const byProperty = {};
      openHomes.forEach(oh => {
        const propId = oh.propertyId;
        if (!byProperty[propId]) {
          byProperty[propId] = [];
        }
        byProperty[propId].push(oh);
      });
      
      console.log(`   ✓ Properties with open homes: ${Object.keys(byProperty).length}`);
      
      // Show first few properties
      console.log('\n   📅 Sample Properties with Open Homes:');
      Object.entries(byProperty).slice(0, 3).forEach(([propId, inspections]) => {
        console.log(`\n   Property ${propId}: ${inspections.length} inspection(s)`);
        inspections.forEach(inspection => {
          const start = new Date(inspection.startTime);
          console.log(`   - ${start.toLocaleString('en-AU', { 
            weekday: 'short',
            day: 'numeric', 
            month: 'short',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'Australia/Melbourne' 
          })}`);
        });
      });
    } else {
      console.log(`   ✗ Failed: ${openHomesResponse.status}`);
    }
    
    // Test 3: Check if properties listing includes open homes
    console.log('\n\n3️⃣ Testing properties listing with open homes...');
    const propertiesResponse = await fetch(`${API_BASE_URL}/properties?listingType=sale&limit=10`);
    
    if (propertiesResponse.ok) {
      const propertiesData = await propertiesResponse.json();
      const properties = propertiesData.data || [];
      
      const propertiesWithOpenHomes = properties.filter(p => p.inspectionTimes && p.inspectionTimes.length > 0);
      
      console.log(`   ✓ Properties fetched: ${properties.length}`);
      console.log(`   ✓ Properties with open homes: ${propertiesWithOpenHomes.length}`);
      
      if (propertiesWithOpenHomes.length > 0) {
        console.log('\n   📅 Properties with inspections:');
        propertiesWithOpenHomes.forEach(prop => {
          console.log(`   - ${prop.address} (${prop.inspectionTimes.length} inspection${prop.inspectionTimes.length > 1 ? 's' : ''})`);
        });
      }
    } else {
      console.log(`   ✗ Failed: ${propertiesResponse.status}`);
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// Note: Make sure the dev server is running on http://localhost:3000
console.log('Note: This test requires the dev server to be running on http://localhost:3000\n');
testUpdatedOpenHomes();