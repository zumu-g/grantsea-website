// Client-side GA4 lead conversion tracking. No-ops when gtag isn't loaded
// (e.g. NEXT_PUBLIC_GA_MEASUREMENT_ID unset).

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackLead(leadType: string) {
  window.gtag?.('event', 'generate_lead', {
    lead_type: leadType,
    page_path: window.location.pathname,
  });
}
