async function testOpenHomesAPI() {
  console.log('Testing filtered open homes API...\n');

  try {
    // Test the API endpoint
    const propertyId = '31765985'; // 10 History Lane
    const response = await fetch(`https://grantsea-website.vercel.app/api/open-homes?propertyId=${propertyId}`);
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('\nAPI Response:');
      console.log('Success:', data.success);
      console.log('Total open homes:', data.total);
      
      if (data.data && data.data.length > 0) {
        console.log('\nOpen homes for property', propertyId, ':');
        data.data.forEach((oh, index) => {
          console.log(`\nOpen Home ${index + 1}:`);
          console.log('- Property ID:', oh.propertyId);
          console.log('- Start:', oh.startTime);
          console.log('- Start (Local):', oh.startTimeLocal);
          console.log('- End:', oh.endTime);
          console.log('- End (Local):', oh.endTimeLocal);
          console.log('- Type:', oh.type);
        });
      } else {
        console.log('\n❌ No upcoming open homes found for this property');
      }
    } else {
      const error = await response.text();
      console.log('Error:', error);
    }

    // Also test the property endpoint to see if open homes are included
    console.log('\n\nTesting property endpoint with open homes...');
    const propResponse = await fetch(`https://grantsea-website.vercel.app/api/properties/${propertyId}`);
    
    if (propResponse.ok) {
      const propData = await propResponse.json();
      console.log('\nProperty has inspection times?', propData.data?.inspectionTimes?.length > 0);
      
      if (propData.data?.inspectionTimes?.length > 0) {
        console.log('Inspection times:');
        propData.data.inspectionTimes.forEach((it, index) => {
          const start = new Date(it.startTime);
          const end = new Date(it.endTime);
          console.log(`${index + 1}. ${start.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })} - ${end.toLocaleTimeString('en-AU', { timeZone: 'Australia/Melbourne' })}`);
        });
      }
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

// For local testing, we need to check directly against VaultRE
async function testDirectVaultRE() {
  console.log('\n\nTesting direct VaultRE API...');
  
  const API_BASE_URL = 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
  const API_KEY = 'igLctQ47aj3qYl1vvHitt8gx3S9u59dpaW2m9ixE';
  const ACCESS_TOKEN = 'nzinklyrqutvcdodhyaqyizcjflohlayxezuthan';

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
  };

  try {
    const response = await fetch(`${API_BASE_URL}/openHomes`, { headers });
    
    if (response.ok) {
      const data = await response.json();
      const items = data.items || [];
      
      // Look for property 31765985
      const targetProperty = items.filter(oh => {
        const propId = oh.property?.id?.toString();
        return propId === '31765985';
      });

      console.log(`\nFound ${targetProperty.length} total open homes for property 31765985`);
      
      // Filter for upcoming only
      const now = new Date();
      const upcoming = targetProperty.filter(oh => new Date(oh.start) > now);
      
      console.log(`Found ${upcoming.length} UPCOMING open homes for property 31765985`);
      
      if (upcoming.length > 0) {
        upcoming.forEach(oh => {
          const start = new Date(oh.start);
          console.log(`- ${start.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' })}`);
        });
      }
    }
  } catch (error) {
    console.error('Direct test failed:', error.message);
  }
}

// Run both tests
testOpenHomesAPI().then(() => testDirectVaultRE());