#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Grant\'s Estate Agents - Style Change Validator\n');

// Configuration
const DANGEROUS_PROPERTIES = [
  'position: absolute',
  'position: fixed',
  'top:',
  'left:',
  'right:',
  'bottom:',
  'transform:',
  'width: 100%',
  'height: 100vh'
];

const ANIMA_CLASSES = [
  'element-light',
  'container-',
  'component-',
  'section-',
  'wrapper-',
  'margin-'
];

const SAFE_PROPERTIES = [
  'color',
  'background-color',
  'font-',
  'text-',
  'transition',
  'opacity',
  'cursor',
  'box-shadow',
  'border-radius'
];

// Get git diff
function getChangedFiles() {
  try {
    const diff = execSync('git diff --name-only --cached', { encoding: 'utf8' });
    return diff.split('\n').filter(file => file.endsWith('.css') || file.endsWith('.scss'));
  } catch (error) {
    console.log('No staged CSS files found.');
    return [];
  }
}

// Analyze CSS changes
function analyzeCSS(filePath) {
  if (!fs.existsSync(filePath)) return { safe: true, warnings: [] };
  
  const content = fs.readFileSync(filePath, 'utf8');
  const warnings = [];
  const errors = [];
  
  // Check for dangerous properties on Anima classes
  ANIMA_CLASSES.forEach(animaClass => {
    if (content.includes(animaClass)) {
      DANGEROUS_PROPERTIES.forEach(prop => {
        const regex = new RegExp(`\\.${animaClass}[^{]*{[^}]*${prop}`, 'gi');
        if (regex.test(content)) {
          errors.push(`❌ Dangerous property "${prop}" used on Anima class "${animaClass}"`);
        }
      });
    }
  });
  
  // Check for direct modifications to container-9 (hero)
  if (content.includes('container-9') && content.includes('top:')) {
    errors.push('❌ CRITICAL: Modifying container-9 position will break hero layout!');
  }
  
  // Warn about absolute positioning
  if (content.match(/position:\s*(absolute|fixed)/gi)) {
    warnings.push('⚠️  Using absolute/fixed positioning - ensure this doesn\'t break Anima layout');
  }
  
  // Check for !important overrides
  const importantCount = (content.match(/!important/g) || []).length;
  if (importantCount > 5) {
    warnings.push(`⚠️  Excessive use of !important (${importantCount} times) - consider specificity instead`);
  }
  
  // Suggest safe alternatives
  const suggestions = [];
  if (errors.length > 0) {
    suggestions.push('💡 Consider using utility classes instead of modifying Anima components directly');
    suggestions.push('💡 Use CSS custom properties for theming');
    suggestions.push('💡 Create wrapper elements for layout changes');
  }
  
  return { 
    safe: errors.length === 0, 
    warnings, 
    errors,
    suggestions
  };
}

// Main validation
async function validateStyles() {
  const changedFiles = getChangedFiles();
  
  if (changedFiles.length === 0) {
    console.log('✅ No CSS changes to validate\n');
    return true;
  }
  
  console.log(`Analyzing ${changedFiles.length} CSS file(s)...\n`);
  
  let allSafe = true;
  
  for (const file of changedFiles) {
    console.log(`📄 ${file}`);
    const result = analyzeCSS(file);
    
    if (result.errors.length > 0) {
      allSafe = false;
      console.log('\n🚨 ERRORS:');
      result.errors.forEach(error => console.log(`   ${error}`));
    }
    
    if (result.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      result.warnings.forEach(warning => console.log(`   ${warning}`));
    }
    
    if (result.suggestions.length > 0) {
      console.log('\n💡 SUGGESTIONS:');
      result.suggestions.forEach(suggestion => console.log(`   ${suggestion}`));
    }
    
    console.log(result.safe ? '\n✅ File appears safe\n' : '\n❌ File has critical issues\n');
  }
  
  if (!allSafe) {
    console.log('❌ VALIDATION FAILED: Critical styling issues detected!');
    console.log('Please review the Brand Styling Agent guide before proceeding.\n');
    process.exit(1);
  }
  
  console.log('✅ All style changes validated successfully!\n');
  return true;
}

// Check for Anima component modifications
function checkAnimaIntegrity() {
  console.log('🔍 Checking Anima component integrity...\n');
  
  const animaPath = path.join(__dirname, '../src/components/anima-exports');
  
  try {
    const modifiedAnima = execSync(`git diff --name-only ${animaPath}`, { encoding: 'utf8' });
    if (modifiedAnima.trim()) {
      console.log('⚠️  WARNING: Anima components have been modified!');
      console.log('Modified files:', modifiedAnima);
      console.log('Consider creating wrapper components instead.\n');
      return false;
    }
  } catch (error) {
    // No changes
  }
  
  console.log('✅ Anima components unchanged\n');
  return true;
}

// Run validation
async function main() {
  const stylesSafe = await validateStyles();
  const animaSafe = checkAnimaIntegrity();
  
  if (!stylesSafe || !animaSafe) {
    console.log('🚫 Please address the issues before committing.\n');
    process.exit(1);
  }
  
  console.log('🎉 All validations passed! Safe to proceed.\n');
}

main().catch(console.error);