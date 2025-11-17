#!/bin/bash

echo "🎯 Visual Regression Testing Setup"
echo "================================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Not in project root directory${NC}"
    exit 1
fi

# Create necessary directories
echo -e "${YELLOW}Creating test directories...${NC}"
mkdir -p tests/baselines
mkdir -p tests/screenshots
mkdir -p tests/reports

# Step 1: Capture baselines (optional)
if [ "$1" == "--capture-baselines" ]; then
    echo -e "${YELLOW}Capturing baseline screenshots from on.com...${NC}"
    npx playwright test capture-baselines.spec.ts --project=chromium
    echo -e "${GREEN}✓ Baselines captured${NC}"
fi

# Step 2: Run padding debug
if [ "$1" == "--debug-padding" ] || [ "$2" == "--debug-padding" ]; then
    echo -e "${YELLOW}Running padding debug tests...${NC}"
    npx playwright test debug-padding.spec.ts --project=chromium
    echo -e "${GREEN}✓ Padding debug complete${NC}"
    echo -e "${GREEN}Check tests/padding-debug-report.json for results${NC}"
fi

# Step 3: Run visual regression tests
echo -e "${YELLOW}Running visual regression tests...${NC}"
npx playwright test visual-regression.spec.ts --project=chromium

# Check if report exists
if [ -f "tests/visual-regression-report.json" ]; then
    echo -e "${GREEN}✓ Visual regression complete${NC}"
    echo -e "${GREEN}Check tests/visual-regression-report.json for differences${NC}"
fi

# Open HTML report
if [ -d "playwright-report" ]; then
    echo -e "${YELLOW}Opening test report...${NC}"
    npx playwright show-report
fi

echo -e "${GREEN}✓ All tests complete${NC}"