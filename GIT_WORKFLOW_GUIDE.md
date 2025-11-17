# Git Workflow Guide - Preventing Build Errors

## Quick Commands

### Before Committing - Run All Checks
```bash
npm run check-all
```

This runs:
1. TypeScript type checking
2. Linting
3. Build test

### Alternative: Manual Pre-Push Check
```bash
npm run pre-push
```

## Recommended Workflow

### 1. Before Making Changes
```bash
# Always pull latest changes
git pull origin main

# Create a feature branch (optional but recommended)
git checkout -b feature/your-feature-name
```

### 2. After Making Changes
```bash
# Check what files changed
git status

# Run validation checks
npm run check-all

# If all passes, stage changes
git add -A

# Commit with descriptive message
git commit -m "feat: Add new feature

- Detailed change 1
- Detailed change 2"
```

### 3. Before Pushing
```bash
# Run final pre-push check
npm run pre-push

# If successful, push
git push origin main
```

## Common Issues and Solutions

### TypeScript Errors
```bash
# Check TypeScript errors
npm run typecheck

# Common fixes:
# - Add type assertions: (e.target as HTMLElement)
# - Add proper types to function parameters
# - Check imports are correct
```

### Missing Imports
```bash
# If you see "Module not found" errors:
1. Check if the file exists
2. Check the import path is correct
3. Check if component was renamed/moved
```

### Build Errors
```bash
# Test build locally
npm run build

# If it fails, check:
1. Console for specific error
2. Missing dependencies
3. Syntax errors
4. Import/export mismatches
```

## Quick Fix Commands

### If You Already Committed But Build Fails
```bash
# Amend the last commit after fixing
git add -A
git commit --amend --no-edit
git push --force-with-lease origin main
```

### If Push Was Rejected
```bash
# Pull latest changes first
git pull origin main --rebase

# Resolve conflicts if any
# Then push again
git push origin main
```

## CI/CD Integration Ideas

### 1. GitHub Actions (Future Enhancement)
Create `.github/workflows/pre-merge.yml`:
```yaml
name: Pre-merge Checks
on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run check-all
```

### 2. Husky Git Hooks (Already Partially Implemented)
Enhanced `.husky/pre-push`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run pre-push
```

## Best Practices

1. **Always run checks locally** before pushing
2. **Use descriptive commit messages** 
3. **Fix one thing at a time** - easier to debug
4. **Pull before push** - avoid merge conflicts
5. **Check Vercel preview** deployments before merging

## Emergency Commands

### Revert Last Commit (Not Pushed)
```bash
git reset --soft HEAD~1
```

### Revert Last Push
```bash
git revert HEAD
git push origin main
```

### Check What Changed
```bash
# See file changes
git diff

# See staged changes
git diff --staged

# See commit history
git log --oneline -10
```

## Tools Integration

### VS Code Extensions
- GitLens - See git blame inline
- Error Lens - See errors as you type
- ESLint - Catch issues early

### Terminal Aliases (Add to ~/.zshrc or ~/.bashrc)
```bash
alias gcheck="npm run check-all"
alias gpush="npm run pre-push && git push origin main"
alias gstatus="git status"
alias gcommit="git add -A && git commit"
```

Remember: **It's always better to catch errors locally than in production!**