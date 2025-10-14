const API_BASE_URL = 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = 'igLctQ47aj3qYl1vvHitt8gx3S9u59dpaW2m9ixE';
const ACCESS_TOKEN = 'nzinklyrqutvcdodhyaqyizcjflohlayxezuthan';

async function checkOpenHomes() {
  console.log('Fetching open homes and looking for 10 History Lane...\n');

  const headers = {
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    'X-Api-Key': API_KEY,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    // Fetch open homes
    const url = `${API_BASE_URL}/openHomes?propertyId=31765985`;
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      console.log('Error:', response.status);
      return;
    }

    const data = await response.json();
    console.log(`Total open homes returned: ${data.totalItems}`);
    
    // Check the first few items to see if they have property data
    console.log('\nChecking first 5 open homes for property data...\n');
    
    const items = data.items || [];
    items.slice(0, 5).forEach((oh, index) => {
      console.log(`Open Home ${index + 1}:`);
      console.log('- ID:', oh.id);
      console.log('- Start:', oh.start);
      console.log('- End:', oh.end);
      console.log('- Has property field?', !!oh.property);
      
      if (oh.property) {
        console.log('- Property ID:', oh.property.id);
        console.log('- Property Address:', oh.property.address);
      }
      
      // Check for property ID in other fields
      console.log('- PropertyId field:', oh.propertyId);
      console.log('- Property_id field:', oh.property_id);
      console.log('---');
    });

    // Look for Thursday and Saturday dates in October 2024
    console.log('\nLooking for recent Thursday/Saturday open homes...\n');
    
    const recentOpenHomes = items.filter(oh => {
      const startDate = new Date(oh.start);
      const dayOfWeek = startDate.getDay();
      const isThursday = dayOfWeek === 4;
      const isSaturday = dayOfWeek === 6;
      const isRecent = startDate > new Date('2024-10-01');
      
      return (isThursday || isSaturday) && isRecent;
    });

    console.log(`Found ${recentOpenHomes.length} Thursday/Saturday open homes after Oct 1, 2024`);
    
    // Show first few
    recentOpenHomes.slice(0, 10).forEach(oh => {
      const startDate = new Date(oh.start);
      const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][startDate.getDay()];
      console.log(`- ${day} ${startDate.toLocaleDateString('en-AU')} ${startDate.toLocaleTimeString('en-AU')} - Property: ${oh.property?.address || 'Unknown'}`);
    });

    // Since the API might not be filtering, let's try the general openHomes endpoint
    console.log('\n\nTrying general openHomes endpoint without filter...');
    const generalUrl = `${API_BASE_URL}/openHomes`;
    const generalResponse = await fetch(generalUrl, { headers });
    
    if (generalResponse.ok) {
      const generalData = await generalResponse.json();
      console.log(`Total open homes (unfiltered): ${generalData.totalItems}`);
      
      // Look for 10 History Lane specifically
      const historyLaneOpenHomes = (generalData.items || []).filter(oh => {
        const address = oh.property?.address || '';
        return address.includes('History Lane') || address.includes('10 History');
      });

      if (historyLaneOpenHomes.length > 0) {
        console.log(`\n✅ FOUND ${historyLaneOpenHomes.length} open homes for History Lane!`);
        historyLaneOpenHomes.forEach(oh => {
          console.log('\nOpen Home Details:');
          console.log('- ID:', oh.id);
          console.log('- Property:', oh.property?.address);
          console.log('- Property ID:', oh.property?.id);
          console.log('- Start:', oh.start, '→', new Date(oh.start).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }));
          console.log('- End:', oh.end, '→', new Date(oh.end).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }));
        });
      } else {
        console.log('\n❌ No open homes found for History Lane in the data');
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkOpenHomes();