# Vercel Environment Variables Setup

## Important: Add Environment Variables to Vercel

The API is not working because the environment variables are not set in Vercel. You need to add them:

### Steps to Add Environment Variables in Vercel:

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `grantsea-website`
3. Go to **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add the following variables:

### Required Environment Variables:

```
NEXT_PUBLIC_CRM_API_URL=https://api.vaultre.com.au/api/v1.2
NEXT_PUBLIC_CRM_API_KEY=nzinklyrqutvcdodhyaqyizcjflohlayxezuthan
```

### Optional Environment Variables:

```
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_ENABLE_API_CACHE=true
```

### After Adding Variables:

1. Click **Save** for each variable
2. **IMPORTANT**: You need to **redeploy** for the changes to take effect
3. Go to the **Deployments** tab
4. Click the three dots menu on the latest deployment
5. Select **Redeploy**

### Verify It's Working:

After redeployment, visit: https://grantsea-website.vercel.app/api-test

You should see:
- API URL: https://api.vaultre.com.au/api/v1.2
- API Key Set: Yes
- And hopefully a successful API response with your properties

## Property Types Supported:

The system now supports both:
- **For Sale** properties
- **For Lease** properties

Properties will automatically display the correct price based on their listing type.