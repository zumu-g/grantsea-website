# Deployment Setup Guide - GitHub & Vercel

## Overview
This guide covers the complete deployment setup for the Grants Estate Agents website using GitHub for version control and Vercel for hosting, including continuous deployment, environment configuration, and performance optimization.

## GitHub Repository Setup

### 1. Repository Creation and Configuration

#### Repository Structure
```
grantsea-website/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-staging.yml
│   │   └── deploy-production.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── deployment_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── deployment-guide.md
│   ├── environment-setup.md
│   └── troubleshooting.md
├── src/
├── public/
├── tests/
├── .env.example
├── .env.local.example
├── .gitignore
├── README.md
├── package.json
├── next.config.js
├── tailwind.config.js
└── vercel.json
```

#### .gitignore Configuration
```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
.next/
out/
build/
dist/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# Testing
coverage/
.nyc_output
test-results/
playwright-report/
playwright/.cache/

# IDE and Editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Storybook build outputs
storybook-static/

# Temporary folders
tmp/
temp/
```

#### Environment Variables Template
```bash
# .env.example
# Copy this file to .env.local and fill in the actual values

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/gea_website"
DATABASE_URL_STAGING="postgresql://username:password@localhost:5432/gea_website_staging"

# WordPress Headless CMS
WORDPRESS_API_URL="https://cms.grantsea.com.au/wp-json/wp/v2"
WORDPRESS_GRAPHQL_URL="https://cms.grantsea.com.au/graphql"
WORDPRESS_AUTH_REFRESH_TOKEN=""
WORDPRESS_PREVIEW_SECRET=""

# External APIs
GOOGLE_MAPS_API_KEY=""
GOOGLE_ANALYTICS_ID=""
GOOGLE_SEARCH_CONSOLE_ID=""

# Email Services
SENDGRID_API_KEY=""
SENDGRID_FROM_EMAIL="noreply@grantsea.com.au"
CONTACT_EMAIL="info@grantsea.com.au"

# Property Data APIs
REALESTATE_COM_AU_API_KEY=""
DOMAIN_COM_AU_API_KEY=""
PROPERTY_DATA_API_KEY=""

# Social Media APIs
FACEBOOK_APP_ID=""
INSTAGRAM_ACCESS_TOKEN=""
YOUTUBE_API_KEY=""

# Performance and Monitoring
SENTRY_DSN=""
HOTJAR_ID=""
GTM_ID=""

# Feature Flags
ENABLE_PROPERTY_SEARCH="true"
ENABLE_MARKET_INSIGHTS="true"
ENABLE_AI_CHAT="false"

# Security
JWT_SECRET=""
ENCRYPTION_KEY=""
CSRF_SECRET=""

# Development
NODE_ENV="development"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
PORT=3000
```

### 2. Branch Strategy

#### Git Flow Implementation
```typescript
interface BranchStrategy {
  main: {
    description: "Production-ready code";
    protection: "Require pull request reviews, status checks";
    deployment: "Auto-deploy to production via Vercel";
  };
  
  develop: {
    description: "Integration branch for features";
    protection: "Require status checks";
    deployment: "Auto-deploy to staging via Vercel";
  };
  
  feature_branches: {
    naming: "feature/ticket-number-short-description";
    example: "feature/GEA-123-property-search-filters";
    deployment: "Preview deployments via Vercel";
    lifetime: "Delete after merge to develop";
  };
  
  release_branches: {
    naming: "release/version-number";
    example: "release/v1.2.0";
    purpose: "Prepare for production release";
    merge_to: "main and develop";
  };
  
  hotfix_branches: {
    naming: "hotfix/ticket-number-issue-description";
    example: "hotfix/GEA-456-contact-form-validation";
    merge_to: "main and develop";
    deployment: "Immediate production deployment";
  };
}
```

#### Branch Protection Rules
```yaml
# GitHub branch protection configuration
main:
  required_status_checks:
    - "Continuous Integration"
    - "Type Check"
    - "Lint Check"
    - "Unit Tests"
    - "E2E Tests"
    - "Build Check"
  require_branches_to_be_up_to_date: true
  required_pull_request_reviews:
    required_approving_review_count: 2
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    restrict_pushes_that_create_files: false
  restrict_pushes: true
  allow_force_pushes: false
  allow_deletions: false

develop:
  required_status_checks:
    - "Continuous Integration"
    - "Type Check" 
    - "Lint Check"
    - "Unit Tests"
  require_branches_to_be_up_to_date: true
  required_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
```

### 3. GitHub Actions Workflows

#### Continuous Integration Workflow
```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    name: Test Suite
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-${{ matrix.node-version }}
          path: |
            test-results/
            coverage/
            playwright-report/
          retention-days: 30
  
  build:
    name: Build Check
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production
          NEXT_PUBLIC_SITE_URL: https://grantsea.com.au
      
      - name: Check build output
        run: |
          echo "Build completed successfully"
          ls -la .next/
  
  lighthouse:
    name: Lighthouse CI
    runs-on: ubuntu-latest
    needs: build
    if: github.event_name == 'pull_request'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@latest
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

#### Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=${{ github.ref == 'refs/heads/main' && 'production' || 'preview' }} --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project Artifacts
        run: vercel build ${{ github.ref == 'refs/heads/main' && '--prod' || '' }} --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy ${{ github.ref == 'refs/heads/main' && '--prod' || '--prebuilt' }} --token=${{ secrets.VERCEL_TOKEN }}
        
      - name: Comment PR with deployment URL
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const deployment = await github.rest.repos.listDeployments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              sha: context.sha,
              per_page: 1
            });
            
            if (deployment.data.length > 0) {
              const deploymentId = deployment.data[0].id;
              const statuses = await github.rest.repos.listDeploymentStatuses({
                owner: context.repo.owner,
                repo: context.repo.repo,
                deployment_id: deploymentId
              });
              
              const successStatus = statuses.data.find(status => status.state === 'success');
              if (successStatus && successStatus.target_url) {
                github.rest.issues.createComment({
                  issue_number: context.issue.number,
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  body: `🚀 Deployment successful! Preview your changes here: ${successStatus.target_url}`
                });
              }
            }
```

## Vercel Configuration

### 1. Project Setup

#### Vercel Project Configuration
```json
{
  "version": 2,
  "name": "grantsea-website",
  "alias": ["grantsea.com.au", "www.grantsea.com.au"],
  "regions": ["syd1"],
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "outputDirectory": ".next",
  "public": true,
  "github": {
    "enabled": true,
    "autoAlias": true,
    "autoJobCancelation": true,
    "silent": false
  },
  "functions": {
    "app/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/update-property-data",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/generate-sitemaps",
      "schedule": "0 2 * * *"
    }
  ]
}
```

#### Environment Variables Configuration
```typescript
interface VercelEnvironmentVariables {
  production: {
    NODE_ENV: "production";
    NEXT_PUBLIC_SITE_URL: "https://grantsea.com.au";
    DATABASE_URL: "postgresql://[production-db-connection-string]";
    WORDPRESS_API_URL: "https://cms.grantsea.com.au/wp-json/wp/v2";
    GOOGLE_MAPS_API_KEY: "[production-api-key]";
    GOOGLE_ANALYTICS_ID: "G-XXXXXXXXXX";
    SENDGRID_API_KEY: "[production-sendgrid-key]";
  };
  
  preview: {
    NODE_ENV: "development";
    NEXT_PUBLIC_SITE_URL: "https://grantsea-website-git-develop.vercel.app";
    DATABASE_URL: "postgresql://[staging-db-connection-string]";
    WORDPRESS_API_URL: "https://staging-cms.grantsea.com.au/wp-json/wp/v2";
    GOOGLE_MAPS_API_KEY: "[development-api-key]";
    GOOGLE_ANALYTICS_ID: "G-YYYYYYYYYY";
    SENDGRID_API_KEY: "[staging-sendgrid-key]";
  };
  
  development: {
    NODE_ENV: "development";
    NEXT_PUBLIC_SITE_URL: "http://localhost:3000";
    DATABASE_URL: "postgresql://localhost:5432/gea_website_dev";
    WORDPRESS_API_URL: "http://localhost:8080/wp-json/wp/v2";
    GOOGLE_MAPS_API_KEY: "[development-api-key]";
  };
}
```

### 2. Domain Configuration

#### Custom Domain Setup
```typescript
interface DomainConfiguration {
  primary_domain: "grantsea.com.au";
  www_redirect: "www.grantsea.com.au"; // Redirects to primary
  
  ssl_certificate: {
    type: "automatic";
    provider: "Let's Encrypt";
    auto_renewal: true;
  };
  
  dns_configuration: {
    type: "A";
    name: "@";
    value: "76.76.19.61"; // Vercel IP
    ttl: 3600;
  };
  
  cname_configuration: {
    type: "CNAME";
    name: "www";
    value: "cname.vercel-dns.com";
    ttl: 3600;
  };
  
  verification: {
    txt_record: {
      name: "_vercel";
      value: "[vercel-verification-token]";
    };
  };
}
```

#### Advanced Domain Settings
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/properties/:slug",
      "destination": "/buy/:slug",
      "permanent": false
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    },
    {
      "source": "/robots.txt",
      "destination": "/api/robots"
    }
  ]
}
```

### 3. Performance Optimization

#### Build Optimization
```javascript
// next.config.js
const nextConfig = {
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization
  images: {
    domains: [
      'grantsea.com.au',
      'cms.grantsea.com.au',
      'images.unsplash.com',
      'via.placeholder.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Internationalization
  i18n: {
    locales: ['en-AU'],
    defaultLocale: 'en-AU',
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Server',
            value: 'Apache' // Security through obscurity
          }
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-properties',
        destination: '/buy',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
  
  // Bundle analysis
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }
    
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          enforce: true,
        },
        common: {
          name: 'commons',
          minChunks: 2,
          priority: 5,
          enforce: true,
        },
      },
    };
    
    return config;
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    legacyBrowsers: false,
  },
};

module.exports = nextConfig;
```

## Deployment Environments

### 1. Environment Strategy

#### Multi-Environment Setup
```typescript
interface DeploymentEnvironments {
  production: {
    domain: "grantsea.com.au";
    branch: "main";
    database: "production-db";
    wordpress: "https://cms.grantsea.com.au";
    analytics: "Production GA4 property";
    error_tracking: "Production Sentry project";
    performance_budget: {
      first_contentful_paint: "1.5s";
      largest_contentful_paint: "2.5s";
      cumulative_layout_shift: "0.1";
    };
  };
  
  staging: {
    domain: "staging.grantsea.com.au";
    branch: "develop";
    database: "staging-db";
    wordpress: "https://staging-cms.grantsea.com.au";
    analytics: "Staging GA4 property";
    error_tracking: "Staging Sentry project";
    password_protection: "enabled";
    indexing: "disabled";
  };
  
  preview: {
    domain: "Dynamic Vercel URLs";
    branch: "feature/*";
    database: "preview-db";
    wordpress: "https://staging-cms.grantsea.com.au";
    analytics: "disabled";
    lifetime: "30 days";
    auto_cleanup: "enabled";
  };
  
  development: {
    domain: "localhost:3000";
    branch: "local development";
    database: "local-db";
    wordpress: "http://localhost:8080";
    hot_reload: "enabled";
    debug_mode: "enabled";
  };
}
```

### 2. Database Configuration

#### PostgreSQL Setup for Each Environment
```typescript
interface DatabaseConfiguration {
  production: {
    provider: "Vercel Postgres" | "Supabase" | "PlanetScale";
    connection_pool_size: 20;
    ssl_mode: "require";
    backup_frequency: "daily";
    retention_period: "30 days";
    monitoring: "enabled";
  };
  
  staging: {
    provider: "Same as production";
    connection_pool_size: 10;
    ssl_mode: "require";
    backup_frequency: "weekly";
    retention_period: "7 days";
    data_sync: "weekly from production";
  };
  
  development: {
    provider: "Local PostgreSQL" | "Docker container";
    connection_pool_size: 5;
    ssl_mode: "disable";
    seed_data: "enabled";
    reset_script: "npm run db:reset";
  };
}
```

#### Migration Strategy
```javascript
// Database migration workflow
const migrationStrategy = {
  // Development
  development: {
    command: "npm run db:migrate:dev",
    auto_run: true,
    rollback_support: true,
  },
  
  // Staging
  staging: {
    command: "npm run db:migrate:staging",
    approval_required: false,
    auto_run: true,
    notification: "team-slack-channel",
  },
  
  // Production
  production: {
    command: "npm run db:migrate:prod",
    approval_required: true,
    auto_run: false,
    backup_before: true,
    rollback_plan: "required",
    notification: "all-stakeholders",
    maintenance_window: "required for major changes",
  },
};
```

## Monitoring and Analytics

### 1. Application Monitoring

#### Vercel Analytics Setup
```typescript
interface VercelAnalytics {
  web_vitals: {
    enabled: true;
    sampling_rate: 1.0;
    metrics: [
      "First Contentful Paint",
      "Largest Contentful Paint",
      "Cumulative Layout Shift",
      "First Input Delay",
      "Time to First Byte"
    ];
  };
  
  audience: {
    enabled: true;
    track_unique_visitors: true;
    track_page_views: true;
    track_referrers: true;
  };
  
  speed_insights: {
    enabled: true;
    real_user_monitoring: true;
    performance_budget_alerts: true;
  };
}
```

#### Error Tracking with Sentry
```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Error filtering
  beforeSend(event, hint) {
    // Filter out known non-critical errors
    if (event.exception) {
      const error = hint.originalException;
      if (error && error.message) {
        // Ignore hydration errors in development
        if (error.message.includes('Hydration failed') && process.env.NODE_ENV === 'development') {
          return null;
        }
        
        // Ignore network errors from ad blockers
        if (error.message.includes('AdBlock') || error.message.includes('uBlock')) {
          return null;
        }
      }
    }
    
    return event;
  },
  
  // User context
  beforeSendTransaction(event) {
    // Add custom context for transactions
    event.contexts = {
      ...event.contexts,
      app: {
        name: 'GEA Website',
        version: process.env.npm_package_version,
      },
    };
    
    return event;
  },
});
```

### 2. Performance Monitoring

#### Lighthouse CI Configuration
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/buy',
        'http://localhost:3000/sell',
        'http://localhost:3000/locations/narre-warren',
        'http://localhost:3000/contact',
      ],
      startServerCommand: 'npm run start',
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
      githubAppToken: process.env.LHCI_GITHUB_APP_TOKEN,
    },
  },
};
```

#### Core Web Vitals Tracking
```javascript
// utils/web-vitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics({ name, value, id, rating }) {
  // Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      custom_map: {
        metric_id: 'dimension1',
        metric_value: 'metric1',
        metric_rating: 'dimension2',
      },
      metric_id: id,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
    });
  }
  
  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', `Web Vital: ${name}`, {
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      rating,
    });
  }
  
  // Send to custom endpoint for detailed analysis
  fetch('/api/analytics/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      value,
      id,
      rating,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    }),
  }).catch(console.error);
}

// Initialize web vitals tracking
export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

## Security Configuration

### 1. Security Headers

#### Content Security Policy
```javascript
// next.config.js security headers
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' 
    *.grantsea.com.au 
    *.google-analytics.com 
    *.googletagmanager.com
    *.google.com
    *.gstatic.com
    *.hotjar.com
    *.sentry.io
    vercel.live;
  child-src 'self' 
    *.youtube.com 
    *.google.com;
  style-src 'self' 'unsafe-inline' 
    *.grantsea.com.au
    fonts.googleapis.com
    *.hotjar.com;
  img-src 'self' 
    *.grantsea.com.au
    data: 
    blob:
    *.google.com
    *.googleusercontent.com
    *.gstatic.com
    *.hotjar.com
    *.unsplash.com;
  media-src 'self' 
    *.grantsea.com.au;
  connect-src 'self' 
    *.grantsea.com.au
    *.google-analytics.com
    *.analytics.google.com
    *.googletagmanager.com
    *.hotjar.com
    *.sentry.io
    vitals.vercel-insights.com;
  font-src 'self' 
    fonts.googleapis.com 
    fonts.gstatic.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=()',
  },
];
```

### 2. Environment Secrets Management

#### GitHub Secrets Configuration
```typescript
interface GitHubSecrets {
  repository_secrets: {
    VERCEL_TOKEN: "Vercel deployment token";
    VERCEL_ORG_ID: "Vercel organization ID";
    VERCEL_PROJECT_ID: "Vercel project ID";
    SENTRY_AUTH_TOKEN: "Sentry integration token";
    LHCI_GITHUB_APP_TOKEN: "Lighthouse CI GitHub app token";
  };
  
  environment_secrets: {
    production: {
      DATABASE_URL: "Production database connection string";
      WORDPRESS_API_URL: "Production WordPress API endpoint";
      SENDGRID_API_KEY: "Production SendGrid API key";
      GOOGLE_MAPS_API_KEY: "Production Google Maps API key";
      GOOGLE_ANALYTICS_ID: "Production GA4 measurement ID";
    };
    
    staging: {
      DATABASE_URL: "Staging database connection string";
      WORDPRESS_API_URL: "Staging WordPress API endpoint";
      SENDGRID_API_KEY: "Staging SendGrid API key";
      GOOGLE_MAPS_API_KEY: "Development Google Maps API key";
      GOOGLE_ANALYTICS_ID: "Staging GA4 measurement ID";
    };
  };
}
```

## Backup and Recovery

### 1. Automated Backups

#### Database Backup Strategy
```typescript
interface BackupStrategy {
  database: {
    frequency: "Daily at 2 AM UTC";
    retention: "30 days for daily, 12 weeks for weekly, 12 months for monthly";
    storage: "Encrypted cloud storage";
    verification: "Weekly restore test";
    monitoring: "Backup success/failure alerts";
  };
  
  code_repository: {
    primary: "GitHub with full history";
    mirror: "GitLab mirror for redundancy";
    frequency: "Real-time push replication";
    access_control: "Same as primary repository";
  };
  
  media_assets: {
    location: "Vercel blob storage + S3 backup";
    frequency: "Daily incremental, weekly full";
    cdn: "CloudFlare with origin backup";
    retention: "90 days";
  };
  
  configuration: {
    environment_variables: "Encrypted backup in secure storage";
    deployment_configs: "Version controlled in repository";
    dns_settings: "Documented and backed up monthly";
    ssl_certificates: "Auto-managed by Vercel/Let's Encrypt";
  };
}
```

#### Disaster Recovery Plan
```typescript
interface DisasterRecoveryPlan {
  rto: "4 hours"; // Recovery Time Objective
  rpo: "1 hour";  // Recovery Point Objective
  
  scenarios: {
    vercel_outage: {
      fallback: "Backup hosting on Netlify";
      automation: "DNS failover";
      preparation: "Monthly deployment test";
    };
    
    database_failure: {
      recovery: "Latest backup restoration";
      data_loss_window: "Maximum 1 hour";
      notification: "Immediate team alert";
    };
    
    github_outage: {
      access: "GitLab mirror repository";
      deployment: "Manual deployment from backup";
      duration: "Service restoration expected within 24 hours";
    };
    
    domain_hijacking: {
      protection: "Domain lock and 2FA";
      recovery: "Registrar support escalation";
      mitigation: "Backup domain ready";
    };
  };
  
  testing_schedule: {
    backup_restore: "Monthly";
    failover_procedures: "Quarterly";
    full_disaster_simulation: "Annually";
  };
}
```

## Deployment Checklist

### 1. Pre-Deployment Checklist

```markdown
# Pre-Deployment Checklist

## Code Quality
- [ ] All tests pass (unit, integration, e2e)
- [ ] TypeScript compilation successful
- [ ] ESLint checks pass with no errors
- [ ] Code review completed and approved
- [ ] Security scan completed

## Performance
- [ ] Lighthouse scores meet thresholds
- [ ] Bundle size within acceptable limits
- [ ] Core Web Vitals meet targets
- [ ] Image optimization verified
- [ ] CDN configuration tested

## SEO & Accessibility
- [ ] Meta tags properly configured
- [ ] Structured data validated
- [ ] Accessibility audit passed (axe-core)
- [ ] Sitemap generation working
- [ ] Robots.txt configured correctly

## Content & Data
- [ ] Content management system connected
- [ ] Database migrations tested
- [ ] API endpoints responding correctly
- [ ] Error handling tested
- [ ] Contact forms working

## Security
- [ ] Environment variables configured
- [ ] Security headers implemented
- [ ] SSL certificate valid
- [ ] Authentication systems tested
- [ ] Rate limiting configured

## Monitoring
- [ ] Analytics tracking verified
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring enabled
- [ ] Alert notifications tested
```

### 2. Post-Deployment Verification

```markdown
# Post-Deployment Verification

## Functional Testing
- [ ] Homepage loads correctly
- [ ] Property search functionality works
- [ ] Contact forms submit successfully
- [ ] Navigation links work
- [ ] Mobile responsiveness verified

## Performance Verification
- [ ] Page load times acceptable
- [ ] Core Web Vitals in good range
- [ ] CDN delivering assets correctly
- [ ] Database queries performing well
- [ ] API response times acceptable

## SEO & Analytics
- [ ] Google Analytics tracking events
- [ ] Search Console indexing properly
- [ ] Meta tags displaying correctly
- [ ] Schema markup validated
- [ ] Sitemap accessible

## Security Checks
- [ ] SSL certificate active
- [ ] Security headers present
- [ ] No mixed content warnings
- [ ] API endpoints secured
- [ ] Error pages don't reveal sensitive info

## Monitoring Setup
- [ ] Uptime monitoring active
- [ ] Error tracking receiving events
- [ ] Performance monitoring configured
- [ ] Alert notifications working
- [ ] Backup systems operational
```

---

*This comprehensive deployment setup guide ensures a robust, secure, and performant hosting environment for the Grants Estate Agents website using modern DevOps practices and industry best practices.*