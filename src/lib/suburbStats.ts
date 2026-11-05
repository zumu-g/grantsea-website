// Server-side fetch of EveryProperty's /api/suburb-stats payload for the
// /property-values page's stock/asking-price/rental/yield cards. Mirrors
// src/lib/valuesGuide.ts's env, headers, and throw-on-failure pattern exactly
// (same server-only env pair, same reasoning: an outage must keep serving the
// last cached payload, never silently swap in an empty/wrong page — the
// Next.js data cache, not a try/catch fallback, is what protects the user).

const API_URL = process.env.EVERYPROPERTY_API_URL;
const API_TOKEN = process.env.EVERYPROPERTY_API_TOKEN;

const SCHEMA_VERSION = 1;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: 'application/json',
};

export type StatsReason = 'thin-sample' | 'no-data';

export interface DomBucketCounts {
  under30: number;
  '30to60': number;
  '60to90': number;
  '90to180': number;
  over180: number;
}

export interface StockFigure {
  count: number;
  buckets: DomBucketCounts;
  medianAskingPrice: number | null;
  reason: StatsReason | null;
}

export interface RentalFigure {
  count: number;
  medianAskingRent: number | null;
  reason: StatsReason | null;
}

export interface YieldFigure {
  grossYieldPercent: number | null;
  reason: StatsReason | null;
}

export interface SuburbTypeStats {
  stock: StockFigure;
  rental: RentalFigure;
  yield: YieldFigure;
}

export interface SuburbStats {
  name: string;
  slug: string;
  houses: SuburbTypeStats;
  units: SuburbTypeStats;
}

export interface SuburbStatsPayload {
  schemaVersion: number;
  generatedAt: string;
  attribution: { everyProperty: string };
  suburbs: SuburbStats[];
}

/**
 * Fetch the full Casey/Cardinia stock/rent/yield payload. Returns null only
 * when the server env is not configured (a deploy mistake, handled as a
 * configuration-error state, not an outage). Throws on a non-OK response or
 * an unexpected schemaVersion so the caller's cache decides what to serve
 * instead — never returns a partial/empty payload silently.
 */
export async function getSuburbStats(): Promise<SuburbStatsPayload | null> {
  if (!API_URL || !API_TOKEN) return null;

  const res = await fetch(`${API_URL}/api/suburb-stats`, {
    headers,
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`suburb-stats ${res.status}`);
  }
  const data = await res.json();
  if (data.schemaVersion !== SCHEMA_VERSION) {
    throw new Error(`suburb-stats unexpected schemaVersion ${data.schemaVersion}`);
  }
  return data as SuburbStatsPayload;
}
