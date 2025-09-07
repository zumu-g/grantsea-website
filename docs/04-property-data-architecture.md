# Property Data Architecture

## Overview
This document defines the complete data architecture for handling property listings, client information, market data, and integrations across the Grants Estate Agents platform.

## Data Models and Schemas

### 1. Property Data Model

#### Core Property Schema
```typescript
interface Property {
  // Identifiers
  id: string;                    // Unique internal ID
  mlsId?: string;               // MLS/external system ID
  slug: string;                 // URL-friendly identifier
  
  // Basic Information
  title: string;                // Marketing headline
  description: string;          // Full property description
  type: PropertyType;           // house, apartment, townhouse, land
  status: PropertyStatus;       // available, under-contract, sold, withdrawn
  
  // Location
  address: PropertyAddress;
  coordinates?: Coordinates;
  suburb: string;
  postcode: string;
  state: string;
  council: string;
  
  // Property Details
  features: PropertyFeatures;
  pricing: PropertyPricing;
  dates: PropertyDates;
  
  // Media
  images: PropertyImage[];
  floorPlans?: PropertyDocument[];
  videos?: PropertyVideo[];
  virtualTours?: VirtualTour[];
  
  // Marketing
  seo: PropertySEO;
  marketing: MarketingDetails;
  
  // Internal
  agent: AgentReference;
  office: OfficeReference;
  metadata: PropertyMetadata;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
```

#### Supporting Interfaces
```typescript
interface PropertyAddress {
  streetNumber: string;
  streetName: string;
  streetType: string;           // Street, Avenue, Court, etc.
  unitNumber?: string;
  displayAddress: string;       // Formatted for display
  exactAddress: string;         // Full precise address
  hideExactAddress: boolean;    // Privacy setting
}

interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;            // GPS accuracy in meters
}

interface PropertyFeatures {
  // Core counts
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  
  // Size information
  landSize?: number;            // Square meters
  buildingSize?: number;        // Square meters
  livingAreas?: number;
  
  // Property characteristics
  yearBuilt?: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'renovated';
  
  // Features and amenities
  indoorFeatures: string[];     // Air conditioning, dishwasher, etc.
  outdoorFeatures: string[];    // Pool, garden, entertaining area
  parkingFeatures: string[];    // Garage, carport, secure parking
  
  // Energy and utilities
  energyRating?: string;        // Energy efficiency rating
  heating?: string[];           // Heating types
  cooling?: string[];           // Cooling types
}

interface PropertyPricing {
  // Sale properties
  askingPrice?: number;
  priceRange?: PriceRange;
  priceText?: string;           // "Contact Agent", "Auction", etc.
  auctionDate?: Date;
  
  // Rental properties
  rentPrice?: number;
  rentPeriod?: 'week' | 'month';
  bond?: number;
  availableDate?: Date;
  
  // Additional costs
  councilRates?: number;
  waterRates?: number;
  bodyCorpFees?: number;       // Strata/body corporate fees
  
  // Price history
  priceHistory: PriceHistoryEntry[];
}

interface PriceRange {
  min: number;
  max: number;
}

interface PriceHistoryEntry {
  price: number;
  date: Date;
  reason: string;              // Initial listing, price reduction, etc.
}

interface PropertyDates {
  listedDate: Date;
  availableDate?: Date;
  auctionDate?: Date;
  contractDate?: Date;
  settlementDate?: Date;
  inspectionTimes: InspectionTime[];
}

interface InspectionTime {
  id: string;
  startTime: Date;
  endTime: Date;
  type: 'open' | 'private' | 'auction';
  bookingRequired: boolean;
  cancelled: boolean;
}
```

### 2. Agent and Office Data Models

#### Agent Schema
```typescript
interface Agent {
  id: string;
  employeeId: string;
  
  // Personal Information
  profile: AgentProfile;
  contact: AgentContact;
  
  // Professional Details
  license: AgentLicense;
  specializations: string[];
  languages: string[];
  
  // Performance Metrics
  metrics: AgentMetrics;
  
  // Marketing
  bio: string;
  profileImage?: string;
  socialMedia?: SocialMediaLinks;
  
  // Internal
  office: OfficeReference;
  role: AgentRole;
  status: 'active' | 'inactive' | 'on-leave';
  
  createdAt: Date;
  updatedAt: Date;
}

interface AgentProfile {
  firstName: string;
  lastName: string;
  displayName: string;
  title: string;               // Sales Executive, Principal, etc.
  pronouns?: string;
}

interface AgentContact {
  email: string;
  phone: string;
  mobile: string;
  whatsapp?: string;
}

interface AgentLicense {
  licenseNumber: string;
  licenseType: string;
  issuedDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
}

interface AgentMetrics {
  totalSales: number;
  salesVolume: number;         // Total dollar value
  averagePrice: number;
  averageDaysOnMarket: number;
  clientSatisfactionRating: number;
  reviewCount: number;
  lastUpdated: Date;
}
```

#### Office Schema
```typescript
interface Office {
  id: string;
  
  // Basic Information
  name: string;
  displayName: string;
  
  // Location
  address: OfficeAddress;
  coordinates: Coordinates;
  
  // Contact Information
  contact: OfficeContact;
  
  // Service Areas
  serviceAreas: ServiceArea[];
  
  // Staff
  agents: AgentReference[];
  manager: AgentReference;
  
  // Business Details
  abn: string;
  licenseNumber: string;
  
  // Marketing
  description: string;
  images: string[];
  
  // Hours
  openingHours: OpeningHours;
  
  createdAt: Date;
  updatedAt: Date;
}

interface ServiceArea {
  suburb: string;
  postcode: string;
  state: string;
  isPrimary: boolean;
}

interface OpeningHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface DayHours {
  open?: string;               // "09:00"
  close?: string;              // "17:00"
  closed: boolean;
  notes?: string;              // "By appointment only"
}
```

### 3. Client and Lead Management

#### Client Schema
```typescript
interface Client {
  id: string;
  
  // Personal Information
  type: 'individual' | 'couple' | 'family' | 'company' | 'trust';
  primaryContact: ContactPerson;
  secondaryContact?: ContactPerson;
  
  // Preferences
  propertyPreferences: PropertyPreferences;
  communicationPreferences: CommunicationPreferences;
  
  // Relationship
  relationship: ClientRelationship;
  
  // Privacy and Consent
  privacyConsent: PrivacyConsent;
  marketingConsent: boolean;
  
  // Internal
  assignedAgent: AgentReference;
  leadSource: string;
  tags: string[];
  notes: ClientNote[];
  
  // Status
  status: ClientStatus;
  
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
}

interface ContactPerson {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  mobile?: string;
  preferredName?: string;
}

interface PropertyPreferences {
  intent: 'buy' | 'sell' | 'rent' | 'rent-out';
  propertyTypes: PropertyType[];
  
  // Budget
  minPrice?: number;
  maxPrice?: number;
  preApprovalAmount?: number;
  
  // Location preferences
  preferredSuburbs: string[];
  avoidSuburbs: string[];
  maxDistanceFromWork?: number;
  
  // Property features
  minBedrooms?: number;
  minBathrooms?: number;
  minCarSpaces?: number;
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  
  // Timing
  timeframe: string;           // "ASAP", "3-6 months", "12+ months"
  moveInDate?: Date;
  settlementPreference?: string;
}

interface ClientRelationship {
  stage: ClientStage;
  interactions: ClientInteraction[];
  properties: PropertyInteraction[];
  transactions: TransactionReference[];
}

interface ClientInteraction {
  id: string;
  date: Date;
  type: InteractionType;
  channel: CommunicationChannel;
  agent: AgentReference;
  subject: string;
  notes: string;
  followUpRequired: boolean;
  followUpDate?: Date;
}
```

### 4. Market Data and Analytics

#### Market Data Schema
```typescript
interface MarketData {
  id: string;
  
  // Geographic scope
  geography: MarketGeography;
  
  // Time period
  period: TimePeriod;
  dataDate: Date;
  
  // Sales metrics
  salesMetrics: SalesMetrics;
  
  // Rental metrics
  rentalMetrics?: RentalMetrics;
  
  // Inventory metrics
  inventoryMetrics: InventoryMetrics;
  
  // Demographic data
  demographics?: Demographics;
  
  // Data sources
  sources: DataSource[];
  
  updatedAt: Date;
}

interface SalesMetrics {
  // Volume
  totalSales: number;
  salesVolume: number;         // Total dollar value
  
  // Pricing
  medianPrice: number;
  averagePrice: number;
  pricePerSqm?: number;
  
  // Performance
  averageDaysOnMarket: number;
  clearanceRate: number;       // Percentage of listings sold
  
  // Growth
  priceGrowth: GrowthMetrics;
  volumeGrowth: GrowthMetrics;
}

interface RentalMetrics {
  // Pricing
  medianRent: number;
  averageRent: number;
  rentPerSqm?: number;
  
  // Performance
  vacancyRate: number;
  averageTenancyLength: number;
  
  // Growth
  rentGrowth: GrowthMetrics;
}

interface GrowthMetrics {
  month: number;               // Percentage change from previous month
  quarter: number;             // Percentage change from previous quarter
  year: number;                // Percentage change from previous year
}
```

## Database Architecture

### 1. Primary Database (PostgreSQL)

#### Table Structure
```sql
-- Properties table (main entity)
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mls_id VARCHAR(255) UNIQUE,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type property_type NOT NULL,
    status property_status NOT NULL,
    
    -- Location (normalized)
    address_id UUID REFERENCES addresses(id),
    suburb VARCHAR(255) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    state VARCHAR(50) NOT NULL,
    
    -- Features (JSONB for flexibility)
    features JSONB NOT NULL,
    pricing JSONB NOT NULL,
    
    -- References
    agent_id UUID REFERENCES agents(id),
    office_id UUID REFERENCES offices(id),
    
    -- Metadata
    metadata JSONB,
    seo JSONB,
    
    -- Search
    search_vector tsvector,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Addresses table (normalized for efficiency)
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    street_number VARCHAR(10),
    street_name VARCHAR(255) NOT NULL,
    street_type VARCHAR(50),
    unit_number VARCHAR(10),
    display_address TEXT NOT NULL,
    exact_address TEXT NOT NULL,
    hide_exact_address BOOLEAN DEFAULT FALSE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property images table
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Indexes for Performance
```sql
-- Property search indexes
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_suburb ON properties(suburb);
CREATE INDEX idx_properties_postcode ON properties(postcode);
CREATE INDEX idx_properties_published ON properties(published_at) WHERE status = 'available';

-- Full-text search
CREATE INDEX idx_properties_search ON properties USING GIN(search_vector);

-- Geographic search
CREATE INDEX idx_addresses_location ON addresses USING GIST(
    POINT(longitude, latitude)
);

-- Price range queries (using functional index)
CREATE INDEX idx_properties_price_range ON properties 
    USING BTREE(((pricing->>'askingPrice')::numeric)) 
    WHERE pricing->>'askingPrice' IS NOT NULL;
```

### 2. Cache Layer (Redis)

#### Caching Strategy
```typescript
interface CacheStrategy {
  // Property listings (frequently accessed)
  propertyListings: {
    key: 'properties:list:{filters-hash}';
    ttl: 300; // 5 minutes
    data: PropertySummary[];
  };
  
  // Individual properties
  propertyDetails: {
    key: 'property:{id}';
    ttl: 600; // 10 minutes
    data: Property;
  };
  
  // Search results
  searchResults: {
    key: 'search:{query-hash}';
    ttl: 300; // 5 minutes
    data: SearchResult[];
  };
  
  // Market data (less frequently updated)
  marketData: {
    key: 'market:{suburb}:{period}';
    ttl: 3600; // 1 hour
    data: MarketData;
  };
  
  // User sessions
  userSessions: {
    key: 'session:{session-id}';
    ttl: 1800; // 30 minutes
    data: UserSession;
  };
}
```

### 3. Search Engine (Elasticsearch)

#### Property Index Mapping
```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "title": { 
        "type": "text",
        "analyzer": "standard",
        "fields": {
          "keyword": { "type": "keyword" }
        }
      },
      "description": { 
        "type": "text",
        "analyzer": "standard" 
      },
      "location": {
        "properties": {
          "address": { "type": "text" },
          "suburb": { "type": "keyword" },
          "postcode": { "type": "keyword" },
          "coordinates": { "type": "geo_point" }
        }
      },
      "features": {
        "properties": {
          "bedrooms": { "type": "integer" },
          "bathrooms": { "type": "integer" },
          "carSpaces": { "type": "integer" },
          "landSize": { "type": "integer" },
          "buildingSize": { "type": "integer" }
        }
      },
      "pricing": {
        "properties": {
          "askingPrice": { "type": "integer" },
          "rentPrice": { "type": "integer" }
        }
      },
      "status": { "type": "keyword" },
      "type": { "type": "keyword" },
      "agent": {
        "properties": {
          "id": { "type": "keyword" },
          "name": { "type": "text" }
        }
      },
      "publishedAt": { "type": "date" },
      "updatedAt": { "type": "date" }
    }
  }
}
```

## API Architecture

### 1. REST API Endpoints

#### Property Endpoints
```typescript
// Public property endpoints
GET    /api/properties              // List properties with filtering
GET    /api/properties/featured     // Featured properties
GET    /api/properties/search       // Search properties
GET    /api/properties/:id          // Get property details
GET    /api/properties/similar/:id  // Similar properties

// Geographic endpoints
GET    /api/suburbs                 // List all suburbs
GET    /api/suburbs/:slug           // Suburb details and statistics
GET    /api/suburbs/:slug/properties // Properties in suburb

// Agent/Office endpoints
GET    /api/agents                  // List agents
GET    /api/agents/:id              // Agent details
GET    /api/agents/:id/properties   // Agent's properties
GET    /api/offices                 // List offices
GET    /api/offices/:id             // Office details

// Market data endpoints
GET    /api/market/suburbs/:slug    // Market data for suburb
GET    /api/market/trends           // Market trends
GET    /api/valuations/estimate     // Property valuation estimate

// Contact and lead endpoints
POST   /api/contact                 // General contact form
POST   /api/leads/property-inquiry  // Property inquiry
POST   /api/leads/appraisal         // Appraisal request
POST   /api/leads/callback          // Callback request
```

### 2. GraphQL Schema

#### Query Types
```graphql
type Query {
  # Property queries
  properties(
    filters: PropertyFilters
    pagination: PaginationInput
    sort: PropertySort
  ): PropertyConnection!
  
  property(id: ID!): Property
  propertyBySlug(slug: String!): Property
  
  # Geographic queries
  suburbs(state: String = "VIC"): [Suburb!]!
  suburb(slug: String!): Suburb
  
  # Agent queries
  agents(officeId: ID): [Agent!]!
  agent(id: ID!): Agent
  
  # Market data queries
  marketData(
    suburb: String!
    period: TimePeriod!
    propertyType: PropertyType
  ): MarketData
}

type Mutation {
  # Lead management
  createPropertyInquiry(input: PropertyInquiryInput!): InquiryResponse!
  createAppraisalRequest(input: AppraisalRequestInput!): InquiryResponse!
  subscribeToNewsletter(input: NewsletterSubscriptionInput!): SubscriptionResponse!
}

type Subscription {
  # Real-time updates
  newPropertyAlert(filters: PropertyFilters!): Property!
  priceUpdate(propertyId: ID!): Property!
}
```

## Data Integration and External APIs

### 1. Real Estate Data Sources

#### MLS/Data Feed Integration
```typescript
interface DataFeedConfig {
  provider: 'REAXML' | 'PropertyData' | 'Custom';
  endpoint: string;
  authentication: {
    type: 'API_KEY' | 'OAUTH' | 'BASIC';
    credentials: Record<string, string>;
  };
  updateFrequency: number; // Minutes
  mappings: FieldMapping[];
}

interface FieldMapping {
  source: string;      // External field name
  target: string;      // Internal field name
  transform?: string;  // Transformation function name
  required: boolean;
}
```

#### Data Synchronization Process
```typescript
class PropertyDataSync {
  async syncProperties(config: DataFeedConfig): Promise<SyncResult> {
    // 1. Fetch data from external source
    const externalData = await this.fetchExternalData(config);
    
    // 2. Transform data to internal format
    const transformedData = await this.transformData(externalData, config.mappings);
    
    // 3. Validate data integrity
    const validatedData = await this.validateData(transformedData);
    
    // 4. Update database
    const result = await this.updateDatabase(validatedData);
    
    // 5. Invalidate caches
    await this.invalidateRelevantCaches(result.updatedProperties);
    
    // 6. Index in search engine
    await this.indexInElasticsearch(result.updatedProperties);
    
    return result;
  }
}
```

### 2. Third-Party Integrations

#### Google Maps API
```typescript
interface GoogleMapsIntegration {
  // Geocoding for addresses
  geocodeAddress(address: string): Promise<Coordinates>;
  
  // Reverse geocoding
  reverseGeocode(coordinates: Coordinates): Promise<AddressComponents>;
  
  // Places API for nearby amenities
  getNearbyPlaces(
    coordinates: Coordinates, 
    types: PlaceType[]
  ): Promise<Place[]>;
  
  // Distance matrix for commute calculations
  calculateDistance(
    origin: Coordinates, 
    destinations: Coordinates[]
  ): Promise<DistanceResult[]>;
}
```

#### Email Marketing Integration
```typescript
interface EmailMarketingIntegration {
  // Add contact to mailing list
  addContact(contact: ContactInfo, lists: string[]): Promise<void>;
  
  // Send property alerts
  sendPropertyAlert(
    contact: ContactInfo, 
    properties: Property[]
  ): Promise<void>;
  
  // Market reports
  sendMarketReport(
    contact: ContactInfo, 
    reportData: MarketReport
  ): Promise<void>;
}
```

## Data Privacy and Security

### 1. Personal Information Protection

#### Data Classification
```typescript
enum DataSensitivity {
  PUBLIC = 'public',           // Property listings, market data
  INTERNAL = 'internal',       // Agent notes, internal metrics
  CONFIDENTIAL = 'confidential', // Client financial information
  RESTRICTED = 'restricted'    // Authentication data, licenses
}

interface DataField {
  name: string;
  sensitivity: DataSensitivity;
  retention: RetentionPolicy;
  encryption: EncryptionRequirement;
}
```

#### Privacy Compliance
```typescript
interface PrivacyCompliance {
  // GDPR/Privacy Act compliance
  rightToAccess: (clientId: string) => Promise<PersonalDataExport>;
  rightToRectification: (clientId: string, updates: any) => Promise<void>;
  rightToErasure: (clientId: string) => Promise<DeletionConfirmation>;
  rightToPortability: (clientId: string) => Promise<DataExport>;
  
  // Consent management
  recordConsent: (clientId: string, purposes: string[]) => Promise<void>;
  withdrawConsent: (clientId: string, purposes: string[]) => Promise<void>;
  checkConsent: (clientId: string, purpose: string) => Promise<boolean>;
}
```

### 2. Data Security Measures

#### Encryption Standards
- **At Rest**: AES-256 encryption for sensitive data
- **In Transit**: TLS 1.3 for all API communications
- **Database**: Transparent data encryption (TDE)
- **Backups**: Encrypted backup storage with key rotation

#### Access Controls
```typescript
interface AccessControl {
  roles: {
    admin: string[];           // Full system access
    manager: string[];         // Office-level access
    agent: string[];           // Agent-level access
    assistant: string[];       // Limited assistant access
    readonly: string[];        // Read-only access
  };
  
  permissions: {
    'properties.read': RolePermission;
    'properties.write': RolePermission;
    'clients.read': RolePermission;
    'clients.write': RolePermission;
    'reports.read': RolePermission;
    'system.admin': RolePermission;
  };
}
```

## Performance Optimization

### 1. Database Optimization

#### Query Optimization Strategies
```sql
-- Use materialized views for complex aggregations
CREATE MATERIALIZED VIEW property_market_summary AS
SELECT 
    suburb,
    postcode,
    COUNT(*) as total_properties,
    AVG((pricing->>'askingPrice')::numeric) as avg_price,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (pricing->>'askingPrice')::numeric) as median_price
FROM properties 
WHERE status = 'available' 
  AND pricing->>'askingPrice' IS NOT NULL
GROUP BY suburb, postcode;

-- Refresh materialized view periodically
CREATE OR REPLACE FUNCTION refresh_market_summary()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY property_market_summary;
END;
$$ LANGUAGE plpgsql;
```

#### Connection Pooling
```typescript
interface DatabaseConfig {
  connectionPool: {
    min: 5;
    max: 20;
    acquireTimeoutMillis: 60000;
    createTimeoutMillis: 30000;
    destroyTimeoutMillis: 5000;
    idleTimeoutMillis: 30000;
    reapIntervalMillis: 1000;
    createRetryIntervalMillis: 200;
  };
  
  readReplicas: DatabaseConnection[];
  writeConnection: DatabaseConnection;
}
```

### 2. Caching Strategies

#### Multi-Level Caching
```typescript
class CacheManager {
  private l1Cache: Map<string, any> = new Map(); // In-memory
  private l2Cache: RedisClient;                    // Redis
  private l3Cache: DatabaseClient;                 // Database
  
  async get<T>(key: string): Promise<T | null> {
    // Try L1 cache first
    if (this.l1Cache.has(key)) {
      return this.l1Cache.get(key);
    }
    
    // Try L2 cache
    const l2Result = await this.l2Cache.get(key);
    if (l2Result) {
      this.l1Cache.set(key, l2Result);
      return l2Result;
    }
    
    // Fall back to database
    const dbResult = await this.l3Cache.get(key);
    if (dbResult) {
      await this.l2Cache.set(key, dbResult, 600); // 10 min TTL
      this.l1Cache.set(key, dbResult);
    }
    
    return dbResult;
  }
}
```

---

*This data architecture provides a robust foundation for managing complex real estate data while ensuring performance, security, and scalability for the Grants Estate Agents platform.*