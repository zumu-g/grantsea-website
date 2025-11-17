# Vault RE API Integration Guide

## Overview
This document outlines the integration between our website and Vault RE CRM API.

## API Documentation
- Main Documentation: https://docs.api.vaultre.com.au/
- Swagger Docs: https://docs.api.vaultre.com.au/swagger
- Technical Guide: https://docs.api.vaultre.com.au/docs/technical-guide

## Authentication
Vault RE uses OAuth 2.0 authentication. We're using API key authentication with Bearer tokens.

```
Authorization: Bearer YOUR_API_KEY
```

## Key Endpoints

### Listings
- **Get All Listings**: `GET /api/v1.2/listings`
  - Parameters:
    - `suburb`: Filter by suburb
    - `price_min`: Minimum price
    - `price_max`: Maximum price
    - `bedrooms_min`: Minimum bedrooms
    - `bathrooms_min`: Minimum bathrooms
    - `property_type`: Property type filter
    - `listing_status`: Status filter (active, sold, etc.)
    - `page`: Page number
    - `per_page`: Results per page

- **Get Single Listing**: `GET /api/v1.2/listings/{id}`

- **Search Listings**: `GET /api/v1.2/listings?search={query}`

- **Featured Listings**: `GET /api/v1.2/listings?featured=true`

### Enquiries
- **Submit Enquiry**: `POST /api/v1.2/enquiries`
  - Body:
    ```json
    {
      "listing_id": "string",
      "name": "string",
      "email": "string",
      "mobile": "string",
      "message": "string"
    }
    ```

### Inspections
- **Book Inspection**: `POST /api/v1.2/inspections`
  - Body:
    ```json
    {
      "listing_id": "string",
      "inspection_time_id": "string",
      "name": "string",
      "email": "string",
      "mobile": "string",
      "notes": "string"
    }
    ```

## Data Structures

### Listing Object
```typescript
{
  id: string;
  address: {
    street_number: string;
    street_name: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  price: {
    display: string;
    value: number;
    price_from: number;
    price_to: number;
  };
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  car_spaces: number;
  land_area: number;
  building_area: number;
  description: string;
  features: string[];
  images: Array<{
    id: string;
    url: string;
    caption: string;
    order: number;
  }>;
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    mobile: string;
  };
  inspection_times: Array<{
    id: string;
    start: string;
    end: string;
  }>;
  status: string;
  created_at: string;
  updated_at: string;
}
```

## Implementation Notes

1. **API Key Storage**: Store your API key in `.env.local` as `NEXT_PUBLIC_CRM_API_KEY`

2. **Rate Limiting**: Vault RE may have rate limits. Implement appropriate caching and throttling.

3. **Error Handling**: Common error codes:
   - 401: Unauthorized (check API key)
   - 403: Forbidden (check permissions)
   - 404: Resource not found
   - 429: Rate limit exceeded

4. **Webhooks**: Vault RE supports webhooks for real-time updates. Consider implementing for:
   - New listings
   - Price changes
   - Status updates

## Testing

1. Test API connection with a simple GET request to `/listings`
2. Verify authentication is working
3. Test filtering and pagination
4. Test enquiry submission

## Support

For API issues or questions:
- Vault RE API Support: Check their documentation
- API Status: Monitor for any service interruptions

## Next Steps

1. Verify API key permissions in Vault RE dashboard
2. Test all endpoints with your specific account
3. Implement webhook listeners for real-time updates
4. Add comprehensive error handling and logging