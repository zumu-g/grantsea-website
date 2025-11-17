#!/usr/bin/env node

const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function runFullValidation() {
  console.log('🔍 Running full style validation suite...\n');
  
  try {
    // Run the original comprehensive style check
    console.log('1. Running comprehensive style validation...');
    await execAsync('node scripts/pre-commit-style-check.js');
    
    // Run brand styling validation
    console.log('2. Running brand styling validation...');
    await execAsync('node scripts/validate-style-changes.js');
    
    console.log('✅ All style validations passed!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Style validation failed:', error.message);
    process.exit(1);
  }
}

runFullValidation().catch(console.error);