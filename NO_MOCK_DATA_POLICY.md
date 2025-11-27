# 🚨 CRITICAL: NO MOCK DATA POLICY

## Established: November 26, 2025

### ABSOLUTE RULE: NEVER USE MOCK DATA

**This is a CRITICAL policy that MUST be followed without exception.**

## Policy Statement

- **NO MOCK DATA**: Never implement mock data, fallback data, or placeholder data in any feature
- **REAL API ONLY**: All features must use 100% real VaultRE API data
- **NO FALLBACKS**: Features must gracefully handle API unavailability without serving fake responses
- **AUTHENTIC EXPERIENCE**: Users must only see real property data, real market information, real calculations

## What This Means

### ✅ ALLOWED
- Real VaultRE API data only
- Error messages when API is unavailable ("Property data temporarily unavailable")
- Loading states while fetching real data
- Graceful degradation with clear messaging
- Empty states when no real data exists

### ❌ NEVER ALLOWED
- Mock property data
- Fallback calculations with fake numbers
- Sample/dummy data of any kind
- Placeholder responses that appear real
- "Demo" data that could mislead users

## Implementation Guidelines

### Error Handling
When VaultRE API is unavailable:
```typescript
// CORRECT
if (!apiData) {
  return <div>Property data temporarily unavailable. Please try again later.</div>
}

// WRONG - NEVER DO THIS
if (!apiData) {
  return <PropertyEstimate price={500000} confidence="Mock Data" />
}
```

### Feature Development
- Test with real API data only
- If API endpoint doesn't exist, request it be created
- If data is insufficient, work with real data limitations
- Never create artificial data to "complete" a feature

## Rollback History

**November 26, 2025**: Property Estimate Calculator removed due to mock data fallback violation

## Enforcement

This policy is enforced through:
- Code reviews
- Documentation requirements
- Immediate rollback of violations
- Clear marking in project documentation

## Why This Policy Exists

1. **Trust**: Users must trust our data is real and accurate
2. **Legal**: Property estimates with fake data could have legal implications
3. **Reputation**: Real estate requires absolute data integrity
4. **Business**: Decisions are made based on our data - it must be real

## Questions?

If you need to implement a feature but real data isn't available:
1. Document the limitation
2. Request the required API endpoint
3. Implement graceful error handling
4. Launch when real data is available

**NEVER compromise on this policy.**