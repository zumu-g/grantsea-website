// Server-side fetch of EveryProperty's /api/suburb-values payload for the
// /property-values page. Mirrors src/lib/serverProperties.ts's env and
// headers pattern (server-only env, one shared headers object, direct
// external call) but deliberately does NOT copy its catch-and-return-empty
// behaviour: an outage must keep serving the last cached payload (KTD3),
// never silently swap in an empty/wrong page. So this throws on failure and
// the Next.js data cache (see the server page's `next: { revalidate }`)
// is what actually protects the user from the outage.

const API_URL = process.env.EVERYPROPERTY_API_URL;
const API_TOKEN = process.env.EVERYPROPERTY_API_TOKEN;

const SCHEMA_VERSION = 1;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: 'application/json',
};

export type ValuesReason = 'suppressed' | 'unmatched' | 'no-data' | 'thin-sample' | 'low-agreement';

export interface ValuesPeriod {
  type: 'quarter' | 'year' | 'computed';
  periodStart: string;
  periodEnd?: string;
  median: number | null;
  sales: number | null;
  source: string;
  label?: string;
}

export interface ValuesChange {
  value: number | null;
  priorPeriod?: string | null;
  reason?: ValuesReason | null;
}

export interface ValuesTypeSeries {
  latest: ValuesPeriod | null;
  change3m: ValuesChange;
  change12m: ValuesChange;
  change5y: ValuesChange;
  series: ValuesPeriod[];
  reason?: ValuesReason | null;
}

export interface SuburbValues {
  name: string;
  slug: string;
  houses: ValuesTypeSeries;
  units: ValuesTypeSeries;
}

export interface SuburbValuesPayload {
  schemaVersion: number;
  generatedAt: string;
  attribution: { valuerGeneral: string; everyProperty: string };
  suburbs: SuburbValues[];
}

/**
 * Fetch the full Casey/Cardinia values payload. Returns null only when the
 * server env is not configured (a deploy mistake, handled as a
 * configuration-error state, not an outage). Throws on a non-OK response or
 * an unexpected schemaVersion so the caller's cache (or callsite) decides
 * what to serve instead — never returns a partial/empty payload silently.
 */
export async function getSuburbValues(): Promise<SuburbValuesPayload | null> {
  if (!API_URL || !API_TOKEN) return null;

  const res = await fetch(`${API_URL}/api/suburb-values`, {
    headers,
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`suburb-values ${res.status}`);
  }
  const data = await res.json();
  if (data.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(`suburb-values unexpected schemaVersion ${data.schemaVersion}`);
  }
  return data as SuburbValuesPayload;
}
