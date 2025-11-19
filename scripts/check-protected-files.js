#!/usr/bin/env node

// Protection script for Open Homes files
// Checks for unauthorized changes to protected files

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROTECTED_FILES = [
  'src/services/openHomesCache.ts',
  'src/app/api/open-homes/route.ts',
  'src/app/buy/open-for-inspection/page.tsx',
  'src/app/rent/open-for-inspection/page.tsx',
  'OPEN_HOMES_PROTECTION_PROTOCOL.md',
  'OPEN_HOMES_IMPLEMENTATION_GUIDE.md'
];

const PROTECTION_MARKERS = [
  '🚨 CRITICAL: PROTECTED FUNCTIONALITY',
  'OPEN HOMES SYSTEM IS LIVE AND PROTECTED',
  'DO NOT ALTER without explicit approval'
];

function checkProtectedFiles() {
  console.log('🛡️ Checking protected Open Homes files...');
  
  let violations = [];
  
  // Check if files have protection markers
  PROTECTED_FILES.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    
    if (!fs.existsSync(fullPath)) {
      violations.push(`❌ Protected file missing: ${file}`);
      return;
    }
    
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for protection markers in documentation files
    if (file.includes('.md')) {
      const hasProtectionMarker = PROTECTION_MARKERS.some(marker => 
        content.includes(marker)
      );
      
      if (!hasProtectionMarker) {
        violations.push(`❌ Protection marker missing in: ${file}`);
      }
    }
    
    // Check for specific critical functions in code files
    if (file.includes('openHomesCache.ts')) {
      if (!content.includes('fetchUpcomingOpenHomesWithCache')) {
        violations.push(`❌ Critical function missing in: ${file}`);
      }
      if (!content.includes('120000')) { // 2 minute timeout
        violations.push(`❌ Timeout configuration changed in: ${file}`);
      }
    }
  });
  
  // Check git history for recent changes to protected files
  try {
    const gitDiff = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' });
    const changedFiles = gitDiff.trim().split('\n').filter(Boolean);
    
    const protectedChanges = changedFiles.filter(file => 
      PROTECTED_FILES.includes(file)
    );
    
    if (protectedChanges.length > 0) {
      console.log('⚠️ Protected files modified in last commit:');
      protectedChanges.forEach(file => {
        console.log(`  - ${file}`);
      });
      
      // Check if changes include approval marker
      const commitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' });
      
      if (!commitMessage.includes('[PROTECTED-APPROVED]')) {
        violations.push('❌ Protected file changes require [PROTECTED-APPROVED] in commit message');
      }
    }
  } catch (error) {
    // Git commands might fail in some environments, skip this check
  }
  
  return violations;
}

function main() {
  const violations = checkProtectedFiles();
  
  if (violations.length === 0) {
    console.log('✅ All protected files integrity verified');
    process.exit(0);
  } else {
    console.log('\n🚨 PROTECTION VIOLATIONS DETECTED:\n');
    violations.forEach(violation => {
      console.log(violation);
    });
    console.log('\n📞 Contact Stuart Grant before proceeding with changes to protected files.');
    console.log('📋 See OPEN_HOMES_PROTECTION_PROTOCOL.md for approval process.\n');
    
    // Don't fail the build, just warn
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkProtectedFiles };