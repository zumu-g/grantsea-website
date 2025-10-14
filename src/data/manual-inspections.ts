// Manual inspection times override
// This is a temporary solution while VaultRE API data is being resolved
// TODO: Remove this file once inspection times are properly flowing from VaultRE

export interface ManualInspection {
  propertyId: string;
  inspections: {
    id: string;
    startTime: string; // ISO format in Melbourne timezone
    endTime: string;   // ISO format in Melbourne timezone
    type: 'public' | 'private';
    agent?: string;
  }[];
}

// Manual inspection times that aren't showing in VaultRE API
export const MANUAL_INSPECTIONS: ManualInspection[] = [
  {
    propertyId: '31765985', // 10 History Lane, Narre Warren South
    inspections: [
      {
        id: 'manual-1',
        startTime: '2025-10-16T14:00:00+11:00', // Thu 16 Oct 2:00 PM
        endTime: '2025-10-16T14:20:00+11:00',   // Thu 16 Oct 2:20 PM
        type: 'public',
        agent: 'Stuart Grant'
      },
      {
        id: 'manual-2',
        startTime: '2025-10-18T12:20:00+11:00', // Sat 18 Oct 12:20 PM
        endTime: '2025-10-18T12:40:00+11:00',   // Sat 18 Oct 12:40 PM
        type: 'public',
        agent: 'Stuart Grant'
      }
    ]
  }
];

// Helper function to merge manual inspections with API data
export function mergeManualInspections(propertyId: string, apiInspections: any[] = []): any[] {
  const manual = MANUAL_INSPECTIONS.find(m => m.propertyId === propertyId);
  
  if (!manual) {
    return apiInspections;
  }
  
  // Convert manual inspections to API format
  const manualFormatted = manual.inspections.map(inspection => {
    const startDate = new Date(inspection.startTime);
    const endDate = new Date(inspection.endTime);
    
    return {
      id: inspection.id,
      propertyId: propertyId,
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
      startTimeLocal: startDate.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
      endTimeLocal: endDate.toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }),
      type: inspection.type,
      notes: `Agent: ${inspection.agent || ''}`,
    };
  });
  
  // Filter out any API inspections that might be duplicates
  const existingIds = new Set(apiInspections.map(i => i.id));
  const uniqueManual = manualFormatted.filter(m => !existingIds.has(m.id));
  
  // Combine and sort by start time
  const combined = [...apiInspections, ...uniqueManual];
  return combined.sort((a, b) => 
    new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}