# WordPress Headless Setup Guide

## Overview
This guide provides step-by-step instructions for setting up WordPress as a headless CMS for the Grants Estate Agents website, enabling content management through WordPress while delivering content via Next.js frontend.

## Why Headless WordPress for Real Estate?

### Benefits
1. **Content Management Familiarity**: Non-technical staff can manage content through WordPress admin
2. **SEO Plugin Ecosystem**: Leverage WordPress SEO plugins (Yoast, RankMath)
3. **Media Management**: WordPress excels at image and document management
4. **Custom Fields**: Advanced Custom Fields (ACF) for property data
5. **Performance**: Next.js frontend delivers superior performance
6. **Security**: Separate frontend reduces WordPress attack surface

### Use Cases
- **Property Listings Management**: Add/edit properties through WordPress admin
- **Market Reports**: Create and publish market insight articles
- **Agent Profiles**: Manage agent information and photos
- **Blog Content**: Property guides, market updates, local insights
- **Static Pages**: About us, services, contact information

## Architecture Overview

### System Components
```
WordPress (Headless CMS)
├── Custom Post Types (Properties, Agents, Market Reports)
├── Advanced Custom Fields (Property Details, Agent Info)
├── Media Library (Property Images, Documents)
├── User Management (Agents, Admin Staff)
└── REST API / GraphQL (Content Delivery)

Next.js Frontend
├── Static Generation (ISR for performance)
├── Dynamic Routes (Properties, Agents, Articles)
├── Search & Filtering (Client-side + API)
├── Contact Forms (Direct to CRM)
└── SEO Optimization (Next.js SEO features)
```

### Data Flow
```
WordPress Admin → WordPress Database → REST API/GraphQL → Next.js → Static Pages
                                    ↓
                               Real-time Updates via Webhooks
```

## WordPress Setup

### 1. WordPress Installation

#### Hosting Requirements
```
PHP: 8.0+
MySQL: 5.7+ or MariaDB 10.3+
Memory: 512MB minimum (1GB+ recommended)
SSL Certificate: Required
CDN: Recommended for media delivery
```

#### Installation Options

**Option A: WordPress.com Business Plan**
- Managed hosting with plugin support
- Built-in CDN and security
- Automatic updates
- Cost: ~$25/month

**Option B: Self-Hosted WordPress**
```bash
# Download WordPress
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz

# Upload to web server
# Configure wp-config.php with database details
# Run WordPress installation
```

**Option C: WordPress VIP or WP Engine**
- Enterprise-grade hosting
- Advanced performance optimization
- Enhanced security features

### 2. Essential Plugin Installation

#### Core Headless Plugins
```php
// Required plugins for headless setup
'advanced-custom-fields-pro' => '6.0+',    // Custom fields management
'wp-rest-api' => 'built-in',               // REST API (WordPress 4.7+)
'wp-graphql' => '1.6+',                    // GraphQL endpoint
'wp-graphql-acf' => '2.0+',                // ACF GraphQL integration
'headless-mode' => '1.0+',                 // Disable WP frontend
'jwt-authentication-for-wp-rest-api' => '1.2+', // API authentication
'wp-rest-cache' => '2.0+',                 // API response caching
```

#### Real Estate Specific Plugins
```php
// Optional but recommended
'yoast-seo' => '19.0+',                    // SEO management
'wp-rocket' => '3.10+',                    // Caching (if needed)
'wp-mail-smtp' => '3.5+',                  // Email configuration
'gravity-forms' => '2.6+',                 // Advanced forms (alternative)
'wp-migrate-db' => '2.0+',                 // Database management
```

### 3. Custom Post Types Setup

#### Properties Post Type
```php
// functions.php - Register Properties Custom Post Type
function register_property_post_type() {
    $args = array(
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'properties',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'query_var'          => true,
        'rewrite'            => array('slug' => 'property'),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-admin-home',
        'supports'           => array('title', 'editor', 'thumbnail', 'revisions'),
        'show_in_graphql'    => true,
        'graphql_single_name' => 'property',
        'graphql_plural_name' => 'properties',
    );
    
    register_post_type('property', $args);
}
add_action('init', 'register_property_post_type');
```

#### Agents Post Type
```php
// Register Agents Custom Post Type
function register_agent_post_type() {
    $args = array(
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'agents',
        'query_var'          => true,
        'rewrite'            => array('slug' => 'agent'),
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-businessperson',
        'supports'           => array('title', 'editor', 'thumbnail'),
        'show_in_graphql'    => true,
        'graphql_single_name' => 'agent',
        'graphql_plural_name' => 'agents',
    );
    
    register_post_type('agent', $args);
}
add_action('init', 'register_agent_post_type');
```

#### Market Reports Post Type
```php
// Register Market Reports Custom Post Type
function register_market_report_post_type() {
    $args = array(
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'show_in_rest'       => true,
        'rest_base'          => 'market-reports',
        'query_var'          => true,
        'capability_type'    => 'post',
        'has_archive'        => false,
        'hierarchical'       => false,
        'menu_position'      => 7,
        'menu_icon'          => 'dashicons-chart-line',
        'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_graphql'    => true,
        'graphql_single_name' => 'marketReport',
        'graphql_plural_name' => 'marketReports',
    );
    
    register_post_type('market_report', $args);
}
add_action('init', 'register_market_report_post_type');
```

### 4. Custom Taxonomies

#### Property Location Taxonomy
```php
// Register Property Locations Taxonomy
function register_property_location_taxonomy() {
    $args = array(
        'public'            => false,
        'hierarchical'      => true,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rest_base'         => 'property-locations',
        'rewrite'           => array('slug' => 'location'),
        'show_in_graphql'   => true,
        'graphql_single_name' => 'propertyLocation',
        'graphql_plural_name' => 'propertyLocations',
    );
    
    register_taxonomy('property_location', array('property'), $args);
}
add_action('init', 'register_property_location_taxonomy');
```

#### Property Type Taxonomy
```php
// Register Property Types Taxonomy
function register_property_type_taxonomy() {
    $args = array(
        'public'            => false,
        'hierarchical'      => false,
        'show_ui'           => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'show_in_rest'      => true,
        'rest_base'         => 'property-types',
        'show_in_graphql'   => true,
        'graphql_single_name' => 'propertyType',
        'graphql_plural_name' => 'propertyTypes',
    );
    
    register_taxonomy('property_type', array('property'), $args);
}
add_action('init', 'register_property_type_taxonomy');
```

### 5. Advanced Custom Fields Configuration

#### Property Fields Group
```php
// ACF Property Fields (export this as PHP and add to functions.php)
if(function_exists("acf_add_local_field_group")) {
    acf_add_local_field_group(array(
        'key' => 'group_property_details',
        'title' => 'Property Details',
        'fields' => array(
            array(
                'key' => 'field_property_price',
                'label' => 'Price',
                'name' => 'price',
                'type' => 'number',
                'required' => 1,
            ),
            array(
                'key' => 'field_property_bedrooms',
                'label' => 'Bedrooms',
                'name' => 'bedrooms',
                'type' => 'number',
                'min' => 0,
                'max' => 10,
            ),
            array(
                'key' => 'field_property_bathrooms',
                'label' => 'Bathrooms',
                'name' => 'bathrooms',
                'type' => 'number',
                'min' => 0,
                'max' => 10,
            ),
            array(
                'key' => 'field_property_car_spaces',
                'label' => 'Car Spaces',
                'name' => 'car_spaces',
                'type' => 'number',
                'min' => 0,
                'max' => 10,
            ),
            array(
                'key' => 'field_property_land_size',
                'label' => 'Land Size (m²)',
                'name' => 'land_size',
                'type' => 'number',
            ),
            array(
                'key' => 'field_property_building_size',
                'label' => 'Building Size (m²)',
                'name' => 'building_size',
                'type' => 'number',
            ),
            array(
                'key' => 'field_property_address',
                'label' => 'Full Address',
                'name' => 'address',
                'type' => 'text',
                'required' => 1,
            ),
            array(
                'key' => 'field_property_status',
                'label' => 'Property Status',
                'name' => 'status',
                'type' => 'select',
                'choices' => array(
                    'available' => 'Available',
                    'under_contract' => 'Under Contract',
                    'sold' => 'Sold',
                    'withdrawn' => 'Withdrawn',
                ),
                'default_value' => 'available',
            ),
            array(
                'key' => 'field_property_gallery',
                'label' => 'Property Gallery',
                'name' => 'gallery',
                'type' => 'gallery',
                'return_format' => 'array',
            ),
            array(
                'key' => 'field_property_agent',
                'label' => 'Listing Agent',
                'name' => 'agent',
                'type' => 'post_object',
                'post_type' => array('agent'),
                'return_format' => 'object',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'property',
                ),
            ),
        ),
        'show_in_rest' => 1,
        'show_in_graphql' => 1,
    ));
}
```

#### Agent Fields Group
```php
// ACF Agent Fields
if(function_exists("acf_add_local_field_group")) {
    acf_add_local_field_group(array(
        'key' => 'group_agent_details',
        'title' => 'Agent Details',
        'fields' => array(
            array(
                'key' => 'field_agent_position',
                'label' => 'Position/Title',
                'name' => 'position',
                'type' => 'text',
            ),
            array(
                'key' => 'field_agent_email',
                'label' => 'Email Address',
                'name' => 'email',
                'type' => 'email',
                'required' => 1,
            ),
            array(
                'key' => 'field_agent_phone',
                'label' => 'Phone Number',
                'name' => 'phone',
                'type' => 'text',
                'required' => 1,
            ),
            array(
                'key' => 'field_agent_mobile',
                'label' => 'Mobile Number',
                'name' => 'mobile',
                'type' => 'text',
            ),
            array(
                'key' => 'field_agent_office',
                'label' => 'Office Location',
                'name' => 'office',
                'type' => 'select',
                'choices' => array(
                    'narre-warren' => 'Narre Warren',
                    'berwick' => 'Berwick',
                    'pakenham' => 'Pakenham',
                ),
            ),
            array(
                'key' => 'field_agent_bio',
                'label' => 'Biography',
                'name' => 'bio',
                'type' => 'wysiwyg',
                'media_upload' => 0,
            ),
            array(
                'key' => 'field_agent_specializations',
                'label' => 'Specializations',
                'name' => 'specializations',
                'type' => 'checkbox',
                'choices' => array(
                    'first_home_buyers' => 'First Home Buyers',
                    'luxury_properties' => 'Luxury Properties',
                    'investment_properties' => 'Investment Properties',
                    'commercial' => 'Commercial',
                    'land_sales' => 'Land Sales',
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'agent',
                ),
            ),
        ),
        'show_in_rest' => 1,
        'show_in_graphql' => 1,
    ));
}
```

### 6. REST API Customization

#### Custom REST Endpoints
```php
// Add custom REST API endpoints
function register_custom_rest_routes() {
    // Featured properties endpoint
    register_rest_route('gea/v1', '/properties/featured', array(
        'methods'             => 'GET',
        'callback'            => 'get_featured_properties',
        'permission_callback' => '__return_true',
    ));
    
    // Property search endpoint
    register_rest_route('gea/v1', '/properties/search', array(
        'methods'             => 'GET',
        'callback'            => 'search_properties',
        'permission_callback' => '__return_true',
    ));
    
    // Agent properties endpoint
    register_rest_route('gea/v1', '/agents/(?P<id>\d+)/properties', array(
        'methods'             => 'GET',
        'callback'            => 'get_agent_properties',
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'register_custom_rest_routes');

// Featured properties callback
function get_featured_properties($request) {
    $args = array(
        'post_type'      => 'property',
        'posts_per_page' => 6,
        'meta_query'     => array(
            array(
                'key'   => 'featured',
                'value' => '1',
                'compare' => '='
            )
        ),
        'post_status'    => 'publish',
    );
    
    $properties = get_posts($args);
    $formatted_properties = array();
    
    foreach ($properties as $property) {
        $formatted_properties[] = format_property_for_api($property);
    }
    
    return rest_ensure_response($formatted_properties);
}

// Property search callback
function search_properties($request) {
    $params = $request->get_params();
    
    $args = array(
        'post_type'      => 'property',
        'posts_per_page' => isset($params['per_page']) ? intval($params['per_page']) : 10,
        'paged'          => isset($params['page']) ? intval($params['page']) : 1,
        'post_status'    => 'publish',
    );
    
    // Add search filters
    if (!empty($params['location'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'property_location',
            'field'    => 'slug',
            'terms'    => sanitize_text_field($params['location']),
        );
    }
    
    if (!empty($params['property_type'])) {
        $args['tax_query'][] = array(
            'taxonomy' => 'property_type',
            'field'    => 'slug',
            'terms'    => sanitize_text_field($params['property_type']),
        );
    }
    
    if (!empty($params['min_price']) || !empty($params['max_price'])) {
        $price_query = array(
            'key'     => 'price',
            'type'    => 'NUMERIC',
            'compare' => 'BETWEEN',
            'value'   => array(
                intval($params['min_price']) ?: 0,
                intval($params['max_price']) ?: 999999999
            )
        );
        $args['meta_query'][] = $price_query;
    }
    
    $properties = get_posts($args);
    $formatted_properties = array();
    
    foreach ($properties as $property) {
        $formatted_properties[] = format_property_for_api($property);
    }
    
    return rest_ensure_response($formatted_properties);
}

// Format property data for API response
function format_property_for_api($property) {
    $fields = get_fields($property->ID);
    
    return array(
        'id'          => $property->ID,
        'title'       => $property->post_title,
        'slug'        => $property->post_name,
        'description' => $property->post_content,
        'price'       => $fields['price'] ?? null,
        'bedrooms'    => $fields['bedrooms'] ?? 0,
        'bathrooms'   => $fields['bathrooms'] ?? 0,
        'car_spaces'  => $fields['car_spaces'] ?? 0,
        'land_size'   => $fields['land_size'] ?? null,
        'address'     => $fields['address'] ?? '',
        'status'      => $fields['status'] ?? 'available',
        'gallery'     => format_gallery_for_api($fields['gallery'] ?? array()),
        'agent'       => format_agent_for_api($fields['agent'] ?? null),
        'location'    => get_property_location($property->ID),
        'type'        => get_property_type($property->ID),
        'updated'     => $property->post_modified,
    );
}
```

### 7. GraphQL Configuration

#### GraphQL Schema Extensions
```php
// Extend GraphQL schema for real estate data
function add_custom_graphql_fields() {
    // Add property search to GraphQL root query
    register_graphql_field('RootQuery', 'propertySearch', [
        'type' => ['list_of' => 'Property'],
        'description' => 'Search properties with filters',
        'args' => [
            'location' => ['type' => 'String'],
            'propertyType' => ['type' => 'String'],
            'minPrice' => ['type' => 'Int'],
            'maxPrice' => ['type' => 'Int'],
            'bedrooms' => ['type' => 'Int'],
            'bathrooms' => ['type' => 'Int'],
        ],
        'resolve' => function($root, $args, $context, $info) {
            return resolve_property_search($args);
        }
    ]);
    
    // Add formatted price field
    register_graphql_field('Property', 'formattedPrice', [
        'type' => 'String',
        'description' => 'Formatted price display',
        'resolve' => function($property, $args, $context, $info) {
            $price = get_field('price', $property->ID);
            return $price ? '$' . number_format($price) : 'Contact Agent';
        }
    ]);
}
add_action('graphql_register_types', 'add_custom_graphql_fields');
```

## Next.js Integration

### 1. WordPress API Client Setup

#### REST API Client
```typescript
// lib/wordpress.ts
interface WordPressConfig {
  baseUrl: string;
  username?: string;
  applicationPassword?: string;
}

class WordPressAPI {
  private config: WordPressConfig;
  private baseApiUrl: string;

  constructor(config: WordPressConfig) {
    this.config = config;
    this.baseApiUrl = `${config.baseUrl}/wp-json`;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseApiUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authentication if credentials provided
    if (this.config.username && this.config.applicationPassword) {
      const credentials = btoa(`${this.config.username}:${this.config.applicationPassword}`);
      headers.Authorization = `Basic ${credentials}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    return response.json();
  }

  // Get all properties
  async getProperties(params: PropertySearchParams = {}): Promise<Property[]> {
    const queryString = new URLSearchParams();
    
    if (params.per_page) queryString.append('per_page', params.per_page.toString());
    if (params.page) queryString.append('page', params.page.toString());
    if (params.location) queryString.append('property_location', params.location);
    if (params.property_type) queryString.append('property_type', params.property_type);
    
    const endpoint = `/gea/v1/properties?${queryString.toString()}`;
    return this.makeRequest(endpoint);
  }

  // Get featured properties
  async getFeaturedProperties(): Promise<Property[]> {
    return this.makeRequest('/gea/v1/properties/featured');
  }

  // Get single property
  async getProperty(id: string): Promise<Property> {
    return this.makeRequest(`/wp/v2/properties/${id}`);
  }

  // Search properties
  async searchProperties(params: PropertySearchParams): Promise<Property[]> {
    const queryString = new URLSearchParams(params as any);
    return this.makeRequest(`/gea/v1/properties/search?${queryString.toString()}`);
  }

  // Get all agents
  async getAgents(): Promise<Agent[]> {
    return this.makeRequest('/wp/v2/agents?per_page=100');
  }

  // Get single agent
  async getAgent(id: string): Promise<Agent> {
    return this.makeRequest(`/wp/v2/agents/${id}`);
  }

  // Get agent properties
  async getAgentProperties(agentId: string): Promise<Property[]> {
    return this.makeRequest(`/gea/v1/agents/${agentId}/properties`);
  }

  // Get market reports
  async getMarketReports(params: { per_page?: number; page?: number } = {}): Promise<MarketReport[]> {
    const queryString = new URLSearchParams(params as any);
    return this.makeRequest(`/wp/v2/market-reports?${queryString.toString()}`);
  }
}

// Create WordPress API instance
export const wordpressAPI = new WordPressAPI({
  baseUrl: process.env.WORDPRESS_URL || 'https://cms.grantsea.com.au',
  username: process.env.WORDPRESS_USERNAME,
  applicationPassword: process.env.WORDPRESS_APP_PASSWORD,
});
```

#### GraphQL Client (Alternative)
```typescript
// lib/wordpress-graphql.ts
import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${process.env.WORDPRESS_URL}/graphql`, {
  headers: {
    authorization: `Bearer ${process.env.WORDPRESS_GRAPHQL_TOKEN}`,
  },
});

export async function getProperties(variables: PropertyQueryVariables = {}) {
  const query = `
    query GetProperties($first: Int, $after: String, $where: RootQueryToPropertyConnectionWhereArgs) {
      properties(first: $first, after: $after, where: $where) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          databaseId
          title
          slug
          content
          propertyDetails {
            price
            bedrooms
            bathrooms
            carSpaces
            landSize
            address
            status
            gallery {
              sourceUrl
              altText
              caption
            }
            agent {
              ... on Agent {
                id
                title
                agentDetails {
                  email
                  phone
                  position
                }
              }
            }
          }
          propertyLocations {
            nodes {
              name
              slug
            }
          }
          propertyTypes {
            nodes {
              name
              slug
            }
          }
          modified
        }
      }
    }
  `;

  return client.request(query, variables);
}

export async function getProperty(slug: string) {
  const query = `
    query GetProperty($id: ID!) {
      property(id: $id, idType: SLUG) {
        id
        databaseId
        title
        content
        propertyDetails {
          price
          bedrooms
          bathrooms
          carSpaces
          landSize
          buildingSize
          address
          status
          gallery {
            sourceUrl
            altText
            caption
            mediaDetails {
              width
              height
              sizes {
                name
                sourceUrl
                width
                height
              }
            }
          }
          agent {
            ... on Agent {
              id
              title
              content
              agentDetails {
                email
                phone
                mobile
                position
                office
                bio
                specializations
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
        propertyLocations {
          nodes {
            name
            slug
            description
          }
        }
        propertyTypes {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `;

  return client.request(query, { id: slug });
}
```

### 2. Static Site Generation

#### Property Pages Generation
```typescript
// pages/property/[slug].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { wordpressAPI } from '@/lib/wordpress';
import { PropertyDetailsPage } from '@/components/PropertyDetailsPage';

interface PropertyPageProps {
  property: Property;
}

export default function PropertyPage({ property }: PropertyPageProps) {
  return <PropertyDetailsPage property={property} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all published properties for pre-generation
  const properties = await wordpressAPI.getProperties({ per_page: 100 });
  
  const paths = properties.map((property) => ({
    params: { slug: property.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Enable ISR for new properties
  };
};

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
  try {
    const property = await wordpressAPI.getProperty(params?.slug as string);

    if (!property) {
      return { notFound: true };
    }

    return {
      props: {
        property,
      },
      revalidate: 300, // Revalidate every 5 minutes
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return { notFound: true };
  }
};
```

#### Properties Listing Page
```typescript
// pages/properties/index.tsx
import { GetStaticProps } from 'next';
import { useState } from 'react';
import { wordpressAPI } from '@/lib/wordpress';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFilters } from '@/components/PropertyFilters';

interface PropertiesPageProps {
  initialProperties: Property[];
  totalCount: number;
}

export default function PropertiesPage({ initialProperties, totalCount }: PropertiesPageProps) {
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters: PropertySearchParams) => {
    setLoading(true);
    try {
      const results = await wordpressAPI.searchProperties(filters);
      setProperties(results);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="properties-page">
      <PropertyFilters onSearch={handleSearch} />
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const properties = await wordpressAPI.getProperties({ per_page: 20 });

    return {
      props: {
        initialProperties: properties,
        totalCount: properties.length,
      },
      revalidate: 180, // Revalidate every 3 minutes
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    
    return {
      props: {
        initialProperties: [],
        totalCount: 0,
      },
      revalidate: 60,
    };
  }
};
```

### 3. Webhook Integration for Real-time Updates

#### WordPress Webhook Setup
```php
// Add webhook functionality to WordPress
function trigger_property_webhook($post_id, $post, $update) {
    if ($post->post_type !== 'property') return;
    if ($post->post_status !== 'publish') return;
    
    $webhook_url = get_option('nextjs_webhook_url');
    if (!$webhook_url) return;
    
    $data = array(
        'action' => $update ? 'update' : 'create',
        'type' => 'property',
        'id' => $post_id,
        'slug' => $post->post_name,
        'timestamp' => current_time('timestamp'),
    );
    
    wp_remote_post($webhook_url, array(
        'body' => json_encode($data),
        'headers' => array(
            'Content-Type' => 'application/json',
            'X-Webhook-Secret' => get_option('nextjs_webhook_secret'),
        ),
        'timeout' => 30,
    ));
}
add_action('save_post', 'trigger_property_webhook', 10, 3);

// Trigger webhook on property deletion
function trigger_property_delete_webhook($post_id) {
    $post = get_post($post_id);
    if ($post->post_type !== 'property') return;
    
    $webhook_url = get_option('nextjs_webhook_url');
    if (!$webhook_url) return;
    
    $data = array(
        'action' => 'delete',
        'type' => 'property',
        'id' => $post_id,
        'slug' => $post->post_name,
        'timestamp' => current_time('timestamp'),
    );
    
    wp_remote_post($webhook_url, array(
        'body' => json_encode($data),
        'headers' => array(
            'Content-Type' => 'application/json',
            'X-Webhook-Secret' => get_option('nextjs_webhook_secret'),
        ),
        'timeout' => 30,
    ));
}
add_action('before_delete_post', 'trigger_property_delete_webhook');
```

#### Next.js Webhook Handler
```typescript
// pages/api/webhooks/wordpress.ts
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

interface WebhookPayload {
  action: 'create' | 'update' | 'delete';
  type: string;
  id: number;
  slug: string;
  timestamp: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify webhook secret
  const secret = process.env.WORDPRESS_WEBHOOK_SECRET;
  const signature = req.headers['x-webhook-secret'] as string;
  
  if (!secret || signature !== secret) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload: WebhookPayload = req.body;

    // Handle different webhook actions
    switch (payload.action) {
      case 'create':
      case 'update':
        await handlePropertyUpdate(payload);
        break;
      case 'delete':
        await handlePropertyDelete(payload);
        break;
      default:
        console.log(`Unknown webhook action: ${payload.action}`);
    }

    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function handlePropertyUpdate(payload: WebhookPayload) {
  // Revalidate the specific property page
  await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REVALIDATION_TOKEN}`,
    },
    body: JSON.stringify({
      paths: [
        `/property/${payload.slug}`,
        '/properties',
        '/', // Homepage (if showing featured properties)
      ]
    }),
  });
}

async function handlePropertyDelete(payload: WebhookPayload) {
  // Revalidate listings pages
  await fetch(`${process.env.NEXTAUTH_URL}/api/revalidate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REVALIDATION_TOKEN}`,
    },
    body: JSON.stringify({
      paths: ['/properties', '/']
    }),
  });
}
```

## Security and Performance

### 1. WordPress Security Hardening

#### Security Plugins and Configuration
```php
// Security configurations in wp-config.php

// Disable file editing
define('DISALLOW_FILE_EDIT', true);

// Hide WP version
remove_action('wp_head', 'wp_generator');

// Disable XML-RPC if not needed
add_filter('xmlrpc_enabled', '__return_false');

// Restrict REST API access
function restrict_rest_api($result) {
    if (!is_user_logged_in()) {
        return new WP_Error('rest_not_logged_in', 'You are not currently logged in.', array('status' => 401));
    }
    return $result;
}
add_filter('rest_authentication_errors', 'restrict_rest_api');

// Security headers
function add_security_headers() {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
}
add_action('send_headers', 'add_security_headers');
```

### 2. Performance Optimization

#### Caching Strategy
```php
// WordPress caching configuration
function setup_headless_caching() {
    // Set cache headers for API responses
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        header('Cache-Control: public, max-age=300'); // 5 minutes
        header('Vary: Accept, Authorization');
    }
}
add_action('init', 'setup_headless_caching');

// CDN integration for media
function cdn_rewrite_urls($url) {
    $cdn_url = get_option('cdn_base_url');
    if ($cdn_url && strpos($url, wp_upload_dir()['baseurl']) !== false) {
        return str_replace(wp_upload_dir()['baseurl'], $cdn_url, $url);
    }
    return $url;
}
add_filter('wp_get_attachment_url', 'cdn_rewrite_urls');
```

#### Next.js Performance Configuration
```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['cms.grantsea.com.au', 'cdn.grantsea.com.au'],
    formats: ['image/webp'],
  },
  
  async rewrites() {
    return [
      // Proxy WordPress media files
      {
        source: '/wp-content/:path*',
        destination: `${process.env.WORDPRESS_URL}/wp-content/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/wp-content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Content Management Workflow

### 1. Property Management Process

#### Adding New Properties
1. **WordPress Admin Login**: Access `/wp-admin`
2. **Navigate to Properties**: Click "Properties" in admin menu
3. **Add New Property**: Click "Add New"
4. **Fill Property Details**:
   - Title (marketing headline)
   - Description (full property description)
   - Price, bedrooms, bathrooms, etc.
   - Upload property gallery images
   - Select listing agent
   - Choose location and property type
5. **SEO Optimization**: Use Yoast/RankMath for meta data
6. **Publish**: Property automatically appears on Next.js frontend
7. **Webhook Trigger**: Next.js pages revalidate automatically

#### Property Status Updates
```php
// Quick status update functionality
function add_property_status_quick_edit() {
    add_action('quick_edit_custom_box', function($column_name, $post_type) {
        if ($post_type === 'property' && $column_name === 'status') {
            ?>
            <fieldset class="inline-edit-col-left">
                <div class="inline-edit-col">
                    <label>
                        <span class="title">Status</span>
                        <select name="property_status">
                            <option value="available">Available</option>
                            <option value="under_contract">Under Contract</option>
                            <option value="sold">Sold</option>
                            <option value="withdrawn">Withdrawn</option>
                        </select>
                    </label>
                </div>
            </fieldset>
            <?php
        }
    }, 10, 2);
}
add_action('admin_init', 'add_property_status_quick_edit');
```

### 2. Agent Management

#### Agent Profile Setup
1. **Add New Agent**: Properties → Agents → Add New
2. **Profile Information**:
   - Name and position
   - Contact details (email, phone, mobile)
   - Office location
   - Professional photo
   - Biography and specializations
3. **Assign Properties**: Link properties to specific agents
4. **Performance Metrics**: Track sales and client satisfaction

### 3. Content Publishing Workflow

#### Market Reports and Blog Posts
1. **Create Content**: Posts → Add New or Market Reports → Add New
2. **Content Writing**: Use WordPress editor with media embedding
3. **SEO Optimization**: Meta descriptions, focus keywords
4. **Featured Images**: High-quality images for social sharing
5. **Publishing Schedule**: Set publish date if needed
6. **Automatic Distribution**: Content appears on Next.js frontend immediately

## Maintenance and Monitoring

### 1. Regular Maintenance Tasks

#### Weekly Tasks
- [ ] Review and approve new property listings
- [ ] Update property statuses (sold, under contract)
- [ ] Check and respond to contact form submissions
- [ ] Review website analytics and performance
- [ ] Update market report data

#### Monthly Tasks  
- [ ] WordPress core and plugin updates
- [ ] Security scan and malware check
- [ ] Database optimization and cleanup
- [ ] Review and update agent profiles
- [ ] Performance audit and optimization

#### Quarterly Tasks
- [ ] Full website backup verification
- [ ] SSL certificate renewal check
- [ ] Content audit and SEO review
- [ ] User access review and cleanup
- [ ] Server resource utilization review

### 2. Monitoring Setup

#### WordPress Monitoring
```php
// Add custom health checks
function add_custom_site_health_checks($tests) {
    $tests['direct']['headless_api'] = array(
        'label' => 'Headless API Status',
        'test'  => 'test_headless_api_connection',
    );
    
    return $tests;
}
add_filter('site_status_tests', 'add_custom_site_health_checks');

function test_headless_api_connection() {
    $result = array(
        'label' => 'Headless API Connection',
        'status' => 'good',
        'badge' => array(
            'label' => 'Headless',
            'color' => 'blue',
        ),
        'description' => 'Your headless API is functioning correctly.',
    );
    
    // Test API endpoint
    $response = wp_remote_get(site_url('/wp-json/wp/v2/properties?per_page=1'));
    
    if (is_wp_error($response) || wp_remote_retrieve_response_code($response) !== 200) {
        $result['status'] = 'critical';
        $result['description'] = 'Unable to connect to headless API endpoints.';
        $result['actions'] = 'Check REST API configuration and server connectivity.';
    }
    
    return $result;
}
```

#### Performance Monitoring
```typescript
// Monitor API response times
export async function checkWordPressHealth(): Promise<HealthCheck> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/properties?per_page=1`);
    const endTime = Date.now();
    
    return {
      status: response.ok ? 'healthy' : 'degraded',
      responseTime: endTime - startTime,
      lastChecked: new Date(),
    };
  } catch (error) {
    return {
      status: 'down',
      responseTime: null,
      lastChecked: new Date(),
      error: error.message,
    };
  }
}
```

---

*This comprehensive WordPress headless setup guide provides everything needed to implement a powerful content management system for the Grants Estate Agents website while maintaining the performance benefits of a Next.js frontend.*