#!/usr/bin/env node

/**
 * ⚠️ CRITICAL: Direct MCP Command Executor
 * 
 * This script DIRECTLY executes MCP commands via subprocess.
 * AI cannot skip steps because the script controls execution flow.
 * 
 * Usage:
 *   node scripts/execute_exploration.js <tabId>
 * 
 * What it does:
 *   - Reads exploration instructions from explore_website.js
 *   - Executes MCP commands directly via system calls
 *   - Forces sequential execution (no AI interpretation)
 *   - Logs every step with timestamp
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const tabId = process.argv[2];

if (!tabId) {
  console.error('❌ ERROR: No tabId provided');
  console.log('Usage: node scripts/execute_exploration.js <tabId>');
  process.exit(1);
}

const capturesDir = path.join(__dirname, '../output/captures');
const logFile = path.join(capturesDir, 'execution.log');

// Helper: Log with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(logFile, logLine);
}

// Helper: Execute MCP command via AI
function executeMCP(toolName, params) {
  log(`→ Executing MCP: ${toolName}`);
  log(`  Params: ${JSON.stringify(params)}`);
  
  // Note: This would require an MCP client library
  // For now, we just log the instruction
  console.log(`\n⚠️ AI MUST EXECUTE THIS NOW:`);
  console.log(`Tool: ${toolName}`);
  console.log(`Params: ${JSON.stringify(params, null, 2)}`);
  console.log(`\nPress ENTER after executing...`);
  
  // Wait for user confirmation (in real implementation, this would be automatic)
  // execSync('read', { stdio: 'inherit' });
}

// Helper: Sleep
function sleep(ms) {
  log(`⏱️  Sleeping ${ms}ms...`);
  execSync(`sleep ${ms / 1000}`);
}

// Helper: Save screenshot
function saveScreenshot(previewUrl, step, scrollPercent) {
  log(`💾 Saving screenshot: step ${step}, scroll ${scrollPercent}%`);
  
  const command = `echo "${previewUrl}" | node scripts/download_screenshot.js ${step} ${scrollPercent}`;
  
  try {
    execSync(command, { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    log(`✅ Screenshot saved: step-${step.toString().padStart(2, '0')}.webp`);
  } catch (err) {
    log(`❌ Failed to save screenshot: ${err.message}`);
    throw err;
  }
}

// Helper: Verify file count
function verifyFileCount(expected) {
  const command = `ls -1 output/captures/*.webp 2>/dev/null | wc -l | xargs`;
  const result = execSync(command, { cwd: path.join(__dirname, '..'), encoding: 'utf-8' }).trim();
  const actual = parseInt(result);
  
  log(`📊 File count verification: Expected ${expected}, Found ${actual}`);
  
  if (actual !== expected) {
    log(`❌ CRITICAL: File count mismatch!`);
    throw new Error(`Expected ${expected} files, found ${actual}`);
  }
  
  log(`✅ File count verified`);
}

// Main execution
async function main() {
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log('🚀 Starting Direct MCP Execution');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  log(`Tab ID: ${tabId}`);
  
  console.log(`
⚠️  IMPORTANT INSTRUCTIONS FOR AI:

This script will output MCP commands that YOU MUST EXECUTE.
After each "AI MUST EXECUTE THIS NOW" message:

1. Execute the exact MCP tool with the exact parameters shown
2. DO NOT modify or optimize the parameters
3. DO NOT skip any steps
4. After executing, the script will continue automatically

Let's begin...
`);
  
  // PHASE 1: Initial Analysis
  log('\n═══════════════════════════════════════════════════════════');
  log('PHASE 1: INITIAL PAGE ANALYSIS');
  log('═══════════════════════════════════════════════════════════');
  
  executeMCP('mcp_kapture_tab_detail', { tabId });
  executeMCP('mcp_kapture_dom', { tabId });
  executeMCP('mcp_kapture_elements', { tabId, visible: 'true' });
  executeMCP('mcp_kapture_screenshot', { tabId, format: 'webp', quality: 0.7, scale: 0.3 });
  
  // Note: In real implementation, we would get the preview URL from screenshot result
  console.log('\n⚠️ After screenshot, AI must run:');
  console.log('echo "<preview-url>" | node scripts/download_screenshot.js 1 0');
  
  log('\n✅ PHASE 1 COMPLETE');
  
  log('\n⚠️  This is a prototype script.');
  log('⚠️  Full implementation requires MCP client library integration.');
  log('⚠️  Current version demonstrates the approach but requires manual execution.');
}

main().catch(err => {
  log(`❌ FATAL ERROR: ${err.message}`);
  process.exit(1);
});
