#!/usr/bin/env node
/**
 * Page Speed Agent
 * Uses Google PageSpeed Insights API to audit a URL and write JSON reports.
 */
const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');

function parseArgs(argv) {
  const args = {};
  for (const arg of argv.slice(2)) {
    const [key, value] = arg.split('=');
    const normalizedKey = key.replace(/^--/, '');
    args[normalizedKey] = value === undefined ? true : value;
  }
  return args;
}

async function run() {
  const args = parseArgs(process.argv);
  const url = args.url || process.env.PSI_URL || 'http://localhost:3000/';
  const strategy = (args.strategy || 'mobile').toLowerCase();
  const categories = (args.categories || 'performance,accessibility,best-practices,seo')
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean);
  const key = process.env.PSI_API_KEY || args.key || '';

  if (!/^https?:\/\//.test(url)) {
    console.error('Please provide a valid --url (including http/https).');
    process.exit(1);
  }

  const endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const params = { url, strategy };
  for (const cat of categories) params.category = cat; // last one wins; use array approach instead

  // Correctly include multiple category params
  const searchParams = new URLSearchParams({ url, strategy });
  for (const cat of categories) searchParams.append('category', cat);
  if (key) searchParams.set('key', key);

  const outDir = path.join(process.cwd(), 'test-results', 'psi');
  fs.mkdirSync(outDir, { recursive: true });

  try {
    const { data } = await axios.get(`${endpoint}?${searchParams.toString()}`, {
      timeout: 120000,
    });

    const lighthouse = data.lighthouseResult || {};
    const categoriesObj = lighthouse.categories || {};
    const perfScore = categoriesObj.performance ? Math.round((categoriesObj.performance.score || 0) * 100) : null;

    const audits = lighthouse.audits || {};
    const metrics = {
      performanceScore: perfScore,
      FCP: audits['first-contentful-paint']?.displayValue || null,
      LCP: audits['largest-contentful-paint']?.displayValue || null,
      TBT: audits['total-blocking-time']?.displayValue || null,
      TTI: audits['interactive']?.displayValue || null,
      CLS: audits['cumulative-layout-shift']?.displayValue || null,
      SpeedIndex: audits['speed-index']?.displayValue || null,
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const safeHost = (() => {
      try { return new URL(url).hostname.replace(/[^a-z0-9.-]/gi, '_'); } catch { return 'site'; }
    })();

    const jsonPath = path.join(outDir, `psi-${safeHost}-${strategy}-${timestamp}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    const summaryLines = [
      `PageSpeed Insights (${strategy}) for ${url}`,
      `Performance: ${metrics.performanceScore ?? 'n/a'}`,
      `FCP: ${metrics.FCP} | LCP: ${metrics.LCP} | TBT: ${metrics.TBT} | CLS: ${metrics.CLS}`,
      `TTI: ${metrics.TTI} | Speed Index: ${metrics.SpeedIndex}`,
      `Saved report: ${jsonPath}`,
    ];
    console.log(summaryLines.join('\n'));

    // Optional quick hints
    const hints = [];
    const unusedJs = audits['unused-javascript'];
    if (unusedJs && unusedJs.score < 1) hints.push('Reduce unused JavaScript');
    const renderBlocking = audits['render-blocking-resources'];
    if (renderBlocking && renderBlocking.score < 1) hints.push('Eliminate render-blocking resources');
    const images = audits['efficient-animated-content'];
    if (images && images.score < 1) hints.push('Optimize animated content or replace with video');
    if (hints.length) {
      console.log('Quick hints:', hints.join('; '));
    }
  } catch (err) {
    console.error('PSI request failed:', err?.response?.data || err.message);
    process.exit(2);
  }
}

run();

