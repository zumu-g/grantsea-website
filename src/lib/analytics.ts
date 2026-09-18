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

/** Property context every buyer-engagement event carries (R9). */
export interface PropertyEventContext {
  propertyId: string;
  suburb: string;
  listingType: 'sale' | 'lease' | 'both';
}

/** Generic GA4 event sender. No-ops when gtag isn't loaded, matching
 *  trackLead (R11). Every buyer-engagement helper below routes through this
 *  so the gtag boundary lives in exactly one place. */
export function trackEvent(name: string, context: PropertyEventContext, params: Record<string, unknown> = {}) {
  window.gtag?.('event', name, {
    property_id: context.propertyId,
    suburb: context.suburb,
    listing_type: context.listingType,
    page_path: window.location.pathname,
    ...params,
  });
}

export function trackGalleryDepth(context: PropertyEventContext, depth: 25 | 50 | 75 | 100, imageCount: number) {
  trackEvent('view_gallery_image', context, { depth, image_count: imageCount });
}

export function trackSaveProperty(context: PropertyEventContext, saved: boolean) {
  trackEvent(saved ? 'save_property' : 'unsave_property', context);
}

export function trackShare(context: PropertyEventContext, method: 'native' | 'copy') {
  trackEvent('share', context, { method });
}

export function trackRequestInspection(context: PropertyEventContext) {
  trackEvent('request_inspection', context);
}
