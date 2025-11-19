import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.CRM_API_URL || process.env.NEXT_PUBLIC_CRM_API_URL || 'https://ap-southeast-2.api.vaultre.com.au/api/v1.3';
const API_KEY = process.env.CRM_API_KEY || process.env.NEXT_PUBLIC_CRM_API_KEY || '';
const ACCESS_TOKEN = process.env.CRM_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CRM_ACCESS_TOKEN || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const maxPages = parseInt(searchParams.get('maxPages') || '20'); // Limit for testing

  if (!API_KEY || !ACCESS_TOKEN) {
    return NextResponse.json(
      { error: 'API credentials not configured' },
      { status: 500 }
    );
  }

  try {
    const headers = {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'X-Api-Key': API_KEY,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const now = new Date();
    const futureDate = new Date(now);
    futureDate.setDate(futureDate.getDate() + 30);
    
    const fromDate = now.toISOString().split('T')[0];
    const toDate = futureDate.toISOString().split('T')[0];

    let page = 1;
    let hasMorePages = true;
    let totalPagesScanned = 0;
    let totalOpenHomes = 0;
    let upcomingOpenHomes = 0;
    let scanDetails: any[] = [];
    let scanStartTime = Date.now();

    console.log(`Starting open homes scan test - max ${maxPages} pages...`);

    while (hasMorePages && page <= maxPages) {
      const pageStartTime = Date.now();
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/openHomes?limit=100&page=${page}&from=${fromDate}&to=${toDate}`,
          { headers, cache: 'no-store' }
        );
        
        const pageEndTime = Date.now();
        const pageLoadTime = pageEndTime - pageStartTime;

        if (!response.ok) {
          scanDetails.push({
            page,
            status: 'error',
            statusCode: response.status,
            loadTimeMs: pageLoadTime,
            error: `HTTP ${response.status}`,
            openHomesCount: 0,
            upcomingCount: 0
          });
          console.error(`Page ${page} failed: ${response.status}`);
          break;
        }

        const data = await response.json();
        const pageOpenHomes = data.items || data.data || [];
        
        if (pageOpenHomes.length === 0) {
          scanDetails.push({
            page,
            status: 'empty',
            statusCode: 200,
            loadTimeMs: pageLoadTime,
            openHomesCount: 0,
            upcomingCount: 0,
            message: 'No open homes found - end of data'
          });
          hasMorePages = false;
          console.log(`Page ${page}: Empty page - end of data`);
        } else {
          // Filter for upcoming only
          const upcoming = pageOpenHomes.filter((oh: any) => {
            const startTime = new Date(oh.start || oh.startTime || oh.startDateTime);
            return startTime > now;
          });
          
          scanDetails.push({
            page,
            status: 'success',
            statusCode: 200,
            loadTimeMs: pageLoadTime,
            openHomesCount: pageOpenHomes.length,
            upcomingCount: upcoming.length,
            message: `Found ${upcoming.length} upcoming of ${pageOpenHomes.length} total`
          });
          
          totalOpenHomes += pageOpenHomes.length;
          upcomingOpenHomes += upcoming.length;
          totalPagesScanned++;
          
          console.log(`Page ${page}: ${upcoming.length} upcoming of ${pageOpenHomes.length} total (${pageLoadTime}ms)`);
        }
        
        page++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        const pageEndTime = Date.now();
        const pageLoadTime = pageEndTime - pageStartTime;
        
        scanDetails.push({
          page,
          status: 'error',
          statusCode: 0,
          loadTimeMs: pageLoadTime,
          error: error instanceof Error ? error.message : 'Unknown error',
          openHomesCount: 0,
          upcomingCount: 0
        });
        
        console.error(`Page ${page} error:`, error);
        break;
      }
    }

    const totalScanTime = Date.now() - scanStartTime;

    const summary = {
      success: true,
      scanSummary: {
        totalPagesScanned,
        maxPagesSet: maxPages,
        totalScanTimeMs: totalScanTime,
        averagePageLoadMs: totalPagesScanned > 0 ? Math.round(totalScanTime / totalPagesScanned) : 0,
        totalOpenHomes,
        upcomingOpenHomes,
        dateRange: `${fromDate} to ${toDate}`,
        endReason: hasMorePages ? 'Hit max pages limit' : 'Reached end of API data'
      },
      pageDetails: scanDetails,
      recommendations: [] as string[]
    };

    // Add recommendations based on results
    if (totalScanTime > 25000) {
      summary.recommendations.push('Scan time exceeded 25 seconds - consider optimizing timeout or pagination');
    }
    
    if (hasMorePages && page > maxPages) {
      summary.recommendations.push(`More pages available - increase maxPages beyond ${maxPages} for complete scan`);
    }
    
    if (totalPagesScanned === 0) {
      summary.recommendations.push('No pages scanned successfully - check API credentials and endpoint');
    }

    console.log(`Scan complete: ${totalPagesScanned} pages, ${upcomingOpenHomes} upcoming open homes found in ${totalScanTime}ms`);

    return NextResponse.json(summary);

  } catch (error) {
    console.error('Debug scan error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to scan open homes',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}