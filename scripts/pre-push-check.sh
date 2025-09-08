#!/bin/bash

echo "🔍 Running pre-push checks..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if any checks fail
FAILED=false

# 1. Check for TypeScript errors
echo -e "\n${YELLOW}Checking TypeScript...${NC}"
if npm run typecheck 2>&1 | grep -q "error"; then
    echo -e "${RED}✗ TypeScript errors found${NC}"
    FAILED=true
else
    echo -e "${GREEN}✓ TypeScript check passed${NC}"
fi

# 2. Run linting
echo -e "\n${YELLOW}Running linter...${NC}"
if ! npm run lint; then
    echo -e "${RED}✗ Linting errors found${NC}"
    FAILED=true
else
    echo -e "${GREEN}✓ Linting passed${NC}"
fi

# 3. Try to build
echo -e "\n${YELLOW}Testing build...${NC}"
if ! npm run build; then
    echo -e "${RED}✗ Build failed${NC}"
    FAILED=true
else
    echo -e "${GREEN}✓ Build successful${NC}"
fi

# 4. Check for common issues
echo -e "\n${YELLOW}Checking for common issues...${NC}"

# Check for missing imports
MISSING_IMPORTS=$(grep -r "Module not found" .next 2>/dev/null | head -5)
if [ ! -z "$MISSING_IMPORTS" ]; then
    echo -e "${RED}✗ Missing imports detected:${NC}"
    echo "$MISSING_IMPORTS"
    FAILED=true
fi

# Check for console.logs in production code
CONSOLE_LOGS=$(grep -r "console\.log" src --include="*.ts" --include="*.tsx" --exclude-dir=test* | wc -l)
if [ $CONSOLE_LOGS -gt 10 ]; then
    echo -e "${YELLOW}⚠ Warning: Found $CONSOLE_LOGS console.log statements${NC}"
fi

# Final result
echo -e "\n================================"
if [ "$FAILED" = true ]; then
    echo -e "${RED}✗ Pre-push checks FAILED${NC}"
    echo -e "Please fix the errors before pushing to git"
    exit 1
else
    echo -e "${GREEN}✓ All pre-push checks PASSED${NC}"
    exit 0
fi