# Git Push Review Standard Operating Procedure (SOP)

## Purpose
This SOP ensures all code pushed to the repository is properly reviewed and tested before deployment, preventing build failures and runtime errors in production.

## Pre-Push Checklist

### 1. Dependency Management
- [ ] **Check platform-specific packages**: Ensure no OS-specific packages (e.g., `@next/swc-darwin-x64`) are in dependencies
- [ ] **Verify package.json**: All dependencies should be cross-platform compatible
- [ ] **Lock file sync**: Ensure `package-lock.json` is updated after any package changes
- [ ] **Optional dependencies**: Use `optionalDependencies` for platform-specific packages if needed

### 2. Build Verification
- [ ] **Local build test**: Run `npm run build` locally before committing
- [ ] **TypeScript check**: Run `npm run typecheck` to catch type errors
- [ ] **Lint check**: Run `npm run lint` to ensure code quality
- [ ] **Test suite**: Run `npm test` if tests are available

### 3. Import Path Verification
- [ ] **Check all imports**: Verify all component imports point to existing files
- [ ] **Relative vs absolute**: Ensure consistent use of import paths (@/ aliases)
- [ ] **Case sensitivity**: File names match import statements exactly (important for Linux)

### 4. Environment Variables
- [ ] **Check .env.example**: Update if new environment variables are added
- [ ] **Production readiness**: Verify all required env vars are documented
- [ ] **No secrets**: Ensure no API keys or secrets are committed

### 5. Asset Management
- [ ] **Image optimization**: Large images should be optimized before commit
- [ ] **File references**: All referenced assets (images, fonts) exist in the repository
- [ ] **Public folder**: Static assets are in the correct directories

## Automated Pre-Commit Hooks

### Current Hooks
1. **Style check**: Compares implementation against design reference
2. **Husky**: Runs pre-commit validations

### Recommended Additional Hooks
```bash
# Add to .husky/pre-push
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 Running pre-push checks..."

# 1. Build test
echo "📦 Testing build..."
npm run build || {
    echo "❌ Build failed! Please fix errors before pushing."
    exit 1
}

# 2. TypeScript check
echo "🔍 Checking TypeScript..."
npm run typecheck || {
    echo "❌ TypeScript errors found! Please fix before pushing."
    exit 1
}

# 3. Lint check
echo "🧹 Running linter..."
npm run lint || {
    echo "❌ Linting errors found! Please fix before pushing."
    exit 1
}

echo "✅ All checks passed! Pushing to remote..."
```

## CI/CD Pipeline Recommendations

### 1. GitHub Actions Workflow
Create `.github/workflows/pre-merge-checks.yml`:
```yaml
name: Pre-merge Checks

on:
  pull_request:
    branches: [ main, develop ]
  push:
    branches: [ main, develop ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run TypeScript check
      run: npm run typecheck
    
    - name: Run linter
      run: npm run lint
    
    - name: Build application
      run: npm run build
    
    - name: Run tests
      run: npm test -- --passWithNoTests
```

### 2. Vercel Preview Deployments
- Enable preview deployments for all PRs
- Review preview URLs before merging
- Check console for runtime errors

## Common Issues and Solutions

### Platform-Specific Dependencies
**Issue**: Package only works on specific OS (e.g., Darwin, Windows)
**Solution**: 
- Remove from regular dependencies
- Use `optionalDependencies` if needed
- Or use platform-agnostic alternatives

### Missing Components
**Issue**: Import points to non-existent component
**Solution**:
- Verify file exists at the specified path
- Check for typos in import statement
- Ensure proper file extensions (.tsx, .jsx)

### Environment Variables
**Issue**: Build fails due to missing environment variables
**Solution**:
- Document all required variables in `.env.example`
- Add defaults where appropriate
- Use build-time vs runtime variables correctly

## Review Process

### For Individual Developers
1. Run through the pre-push checklist
2. Execute local build and tests
3. Review changed files for common issues
4. Push only after all checks pass

### For Team Leads
1. Require PR reviews before merging to main
2. Set up branch protection rules
3. Enforce CI/CD checks before merge
4. Regular audits of dependencies

## Emergency Procedures

### If Build Fails After Push
1. **Immediate**: Revert the commit if blocking deployments
2. **Fix locally**: Pull latest, fix issues, test thoroughly
3. **Re-push**: Only after local build succeeds
4. **Document**: Add the issue to this SOP for future reference

## Maintenance

- Review this SOP monthly
- Update based on new issues encountered
- Share learnings with the team
- Keep automation scripts up to date

---

**Last Updated**: 2025-09-09
**Version**: 1.0